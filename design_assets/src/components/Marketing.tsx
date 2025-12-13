import { useState, useEffect, useRef, memo, useMemo, useCallback } from 'react';
import { ArrowLeft, Camera, Phone, MapPin, Eye, TrendingUp, Calendar, User, Plus, ChevronRight, Search, X } from 'lucide-react';
import MapTilerComponent from './MapTilerComponent';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from './ui/alert-dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { toast } from 'sonner@2.0.3';
import CameraCapture from './CameraCapture';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { STORAGE_KEYS, Z_INDEX } from '../utils/constants';
import { sessionStorage } from '../utils/storage/capacitor-storage';

interface ResultCase {
  id: string;
  type: 'antes-depois' | 'resultado'; // ✅ Tipo de case
  cardSize: 'small' | 'medium' | 'large'; // ✅ NOVO: Tamanho do card (para monetização)
  lat: number;
  lng: number;
  photoBefore?: string; // Opcional para tipo 'resultado'
  photoAfter?: string; // Opcional para tipo 'resultado'
  photoResult?: string; // ✅ Foto para tipo 'resultado'
  producer: string;
  location: string;
  product: string;
  productDetail?: string; // ✅ NOVO: Detalhes do produto (ex: "material olimpo", "com coach regulador")
  seller: {
    name: string;
    phone: string;
    company: string;
  };
  results: {
    productivity?: string; // Ex: "+35% de produtividade"
    productivityValue?: string; // ✅ NOVO: Valor numérico (ex: "80")
    productivityUnit?: string; // ✅ NOVO: Unidade (ex: "sc/ha")
    economy?: string; // Ex: "R$ 15.000 economizados"
    period?: string; // Ex: "90 dias"
    // ✅ CAMPOS para tipo 'resultado':
    quantity?: string; // Ex: "100 sacas"
    unit?: string; // Ex: "sacas", "toneladas", "hectares"
    metric?: string; // Ex: "produção", "rendimento", "área plantada"
  };
  description: string;
  date: string;
  views: number;
  campaign: string;
  createdBy?: string; // ✅ ID do usuário criador (permissão de edição/exclusão)
}

interface PublicacaoProps {
  navigate: (path: string) => void;
}

export default function Publicacao({ navigate }: PublicacaoProps) {
  const [showAddCase, setShowAddCase] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [cameraMode, setCameraMode] = useState<'before' | 'after'>('before');
  const [selectedCase, setSelectedCase] = useState<ResultCase | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const mapInstanceRef = useRef<any>(null);
  
  // ✅ Estado para tipo de case
  const [caseType, setCaseType] = useState<'antes-depois' | 'resultado'>('antes-depois');
  
  // ✅ NOVO: Estado para tamanho de card (monetização)
  const [cardSize, setCardSize] = useState<'small' | 'medium' | 'large'>('medium');
  
  // Estados para edição e exclusão
  const [editingCase, setEditingCase] = useState<ResultCase | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [caseToDelete, setCaseToDelete] = useState<ResultCase | null>(null);
  
  // ✅ Estado do usuário atual
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  
  // ✅ NOVO: Estado para busca/filtro
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showSearch, setShowSearch] = useState<boolean>(false);
  
  // Form states
  const [formData, setFormData] = useState({
    producer: '',
    location: '',
    product: '',
    productDetail: '', // ✅ NOVO: Detalhes do produto
    sellerName: '',
    sellerPhone: '',
    sellerCompany: '',
    productivity: '',
    productivityValue: '', // ✅ NOVO: Valor numérico (ex: "80")
    productivityUnit: 'sc/ha', // ✅ NOVO: Unidade (sc/ha, ton/ha, etc)
    economy: '',
    period: '',
    description: '',
    campaign: '',
    // ✅ CAMPOS para tipo 'resultado':
    quantity: '',
    unit: 'sacas',
    metric: 'produção'
  });
  const [photoBefore, setPhotoBefore] = useState<string | null>(null);
  const [photoAfter, setPhotoAfter] = useState<string | null>(null);
  const [photoResult, setPhotoResult] = useState<string | null>(null); // ✅ NOVO

  // Dados demo - Cases de sucesso
  const [cases, setCases] = useState<ResultCase[]>([
    {
      id: '1',
      type: 'antes-depois',
      cardSize: 'large', // ✅ Card grande (plano premium)
      lat: -23.2105,
      lng: -50.6333,
      photoBefore: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&auto=format&fit=crop',
      photoAfter: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&auto=format&fit=crop',
      producer: 'Fazenda Santa Rita',
      location: 'Jataizinho - PR',
      product: 'Soja Olimpo',
      productDetail: 'material olimpo',
      seller: {
        name: 'Carlos Silva',
        phone: '(43) 99876-5432',
        company: 'AgroTech Solutions'
      },
      results: {
        productivity: '+38% produtividade',
        productivityValue: '80',
        productivityUnit: 'sc/ha',
        economy: 'R$ 22.000 economizados',
        period: '120 dias'
      },
      description: 'Aplicação de fertilizante de liberação controlada resultou em aumento significativo na produtividade da safra de soja.',
      date: '2025-10-15',
      views: 3421,
      campaign: 'Safra Verão 2025'
    },
    {
      id: '2',
      type: 'resultado',
      cardSize: 'medium', // ✅ Card médio (plano padrão)
      lat: -23.3250,
      lng: -50.7100,
      photoResult: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&auto=format&fit=crop',
      producer: 'Fazenda Primavera',
      location: 'Cornélio Procópio - PR',
      product: 'Soja Coach',
      productDetail: 'com coach regulador de crescimento',
      seller: {
        name: 'Ana Rodrigues',
        phone: '(43) 99123-4567',
        company: 'Campo Verde Insumos'
      },
      results: {
        quantity: '75',
        unit: 'sc/ha',
        metric: 'produção',
        productivityValue: '75',
        productivityUnit: 'sc/ha',
        economy: 'R$ 18.500 economizados',
        period: '90 dias'
      },
      description: 'Utilizando sementes premium com regulador de crescimento alcançamos excelente produtividade de 75 sc/ha na safra de soja.',
      date: '2025-10-18',
      views: 2891,
      campaign: 'Safra Soja 2025'
    },
    {
      id: '2b',
      type: 'antes-depois',
      cardSize: 'small', // ✅ Card pequeno (plano básico)
      lat: -23.2800,
      lng: -50.6500,
      photoBefore: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&auto=format&fit=crop',
      photoAfter: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&auto=format&fit=crop',
      producer: 'Sítio Boa Esperança',
      location: 'Assaí - PR',
      product: 'BioDefense Pro',
      productDetail: 'defensivo biológico',
      seller: {
        name: 'Ana Rodrigues',
        phone: '(43) 99123-4567',
        company: 'Campo Verde Insumos'
      },
      results: {
        productivity: '+42% qualidade',
        productivityValue: '65',
        productivityUnit: 'sc/ha',
        economy: 'R$ 18.500 economizados',
        period: '90 dias'
      },
      description: 'Controle biológico de pragas eliminou uso de defensivos químicos, melhorando qualidade e reduzindo custos.',
      date: '2025-10-18',
      views: 2891,
      campaign: 'Orgânicos 2025'
    },
    {
      id: '3',
      type: 'antes-depois',
      cardSize: 'medium', // ✅ Card médio
      lat: -23.1800,
      lng: -50.5500,
      photoBefore: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=800&auto=format&fit=crop',
      photoAfter: 'https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?w=800&auto=format&fit=crop',
      producer: 'Granja São Pedro',
      location: 'Bandeirantes - PR',
      product: 'IrrigaSmart System',
      productDetail: 'sistema de irrigação inteligente',
      seller: {
        name: 'Roberto Mendes',
        phone: '(43) 99234-5678',
        company: 'Tech Agro Brasil'
      },
      results: {
        productivity: '-65% consumo água',
        productivityValue: '70',
        productivityUnit: 'sc/ha',
        economy: 'R$ 35.000 economizados',
        period: '6 meses'
      },
      description: 'Sistema de irrigação inteligente com sensores IoT reduziu drasticamente consumo de água mantendo produtividade.',
      date: '2025-10-20',
      views: 5234,
      campaign: 'Irrigação Inteligente'
    }
  ]);

  // ✅ NOVO: Carregar dados do usuário atual (Capacitor Storage)
  useEffect(() => {
    const loadUserData = async () => {
      const session = await sessionStorage.get();
      if (session) {
        try {
          setCurrentUserId(session.userId || null);
        } catch (error) {
          console.error('Erro ao carregar sessão:', error);
        }
      }
    };
    
    loadUserData();
  }, []);

  // Obter localização do usuário
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        () => {
          // Localização padrão (Jataizinho - PR)
          setUserLocation({ lat: -23.2105, lng: -50.6333 });
        }
      );
    } else {
      setUserLocation({ lat: -23.2105, lng: -50.6333 });
    }
  }, []);

  // ✅ PERFORMANCE: Memorizar cases filtrados (evita re-computação a cada render)
  const filteredCases = useMemo(() => {
    if (!searchQuery.trim()) return cases;
    
    const query = searchQuery.toLowerCase();
    return cases.filter(caseItem => 
      caseItem.product.toLowerCase().includes(query) ||
      caseItem.productDetail?.toLowerCase().includes(query) ||
      caseItem.producer.toLowerCase().includes(query) ||
      caseItem.location.toLowerCase().includes(query) ||
      caseItem.description.toLowerCase().includes(query) ||
      caseItem.seller.company.toLowerCase().includes(query)
    );
  }, [cases, searchQuery]);

  // Renderizar pins no mapa
  useEffect(() => {
    // Verificação completa antes de renderizar pins
    if (!mapReady || !mapInstanceRef.current || !(window as any).L) {
      console.log('⏳ Publicação: Aguardando mapa estar pronto...');
      return;
    }

    const mapInstance = mapInstanceRef.current;
    const L = (window as any).L;
    
    // ✅ Verificação COMPLETA: incluir overlayPane onde markers são adicionados
    const hasValidMapStructure = mapInstance && 
                                  mapInstance._container && 
                                  mapInstance._panes && 
                                  mapInstance._panes.overlayPane &&
                                  typeof mapInstance.setView === 'function';
    
    if (!hasValidMapStructure) {
      console.warn('⚠️ Publicação: Mapa não tem estrutura DOM completa (_panes.overlayPane)');
      return;
    }

    // ✅ CORREÇÃO: Aguardar um tick para garantir que o DOM do mapa está pronto
    const timeoutId = setTimeout(() => {
      console.log('🗺️ Publicação: Renderizando pins no mapa...');
    
    try {
      // Remover markers antigos
      if ((mapInstance as any)._caseMarkers) {
        (mapInstance as any)._caseMarkers.forEach((marker: any) => {
          try {
            mapInstance.removeLayer(marker);
          } catch (err) {
            // Ignorar erro se marker já foi removido
          }
        });
      }

      // Criar novos markers (usando cases filtrados)
      const markers: any[] = [];
      
      filteredCases.forEach(caseItem => {
        // ✅ TAMANHO DO PIN baseado no plano (monetização)
        const sizes = {
          small: { width: 90, height: 90, iconWidth: 98, iconHeight: 110, fontSize: 11, titleSize: 7 },
          medium: { width: 120, height: 120, iconWidth: 128, iconHeight: 140, fontSize: 14, titleSize: 8 },
          large: { width: 150, height: 150, iconWidth: 158, iconHeight: 170, fontSize: 18, titleSize: 10 }
        };
        const size = sizes[caseItem.cardSize];
        
        // ✅ Badge premium para cards LARGE
        const premiumBadge = caseItem.cardSize === 'large' 
          ? `<div style="position: absolute; top: 2px; right: 2px; background: linear-gradient(135deg, #FFD700, #FFA500); color: #000; font-size: 7px; font-weight: 900; padding: 2px 4px; border-radius: 4px; z-index: 10; text-transform: uppercase; letter-spacing: 0.5px; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">★ Premium</div>`
          : '';
        
        // ✅ Determinar cor do badge e texto baseado no tipo de case
        let badgeColor = 'rgba(16, 185, 129, 0.95)'; // Verde padrão
        let resultText = '';
        let badgeIcon = '📊'; // Ícone padrão
        
        if (caseItem.type === 'resultado') {
          // Tipo RESULTADO: mostrar quantidade
          badgeColor = 'rgba(99, 102, 241, 0.95)'; // Roxo/Indigo
          resultText = `${caseItem.results.quantity} ${caseItem.results.unit}`;
          badgeIcon = '🎯';
        } else {
          // Tipo ANTES/DEPOIS: lógica antiga
          resultText = caseItem.results.productivity?.split(' ')[0] || '';
          badgeIcon = '📈';
          
          // Se for economia, usar dourado
          if (caseItem.results.economy && caseItem.results.economy.includes('R$')) {
            badgeColor = 'rgba(245, 158, 11, 0.95)'; // Âmbar/Dourado
            const economyValue = caseItem.results.economy.split(' ')[0] + ' ' + caseItem.results.economy.split(' ')[1];
            resultText = economyValue;
            badgeIcon = '💰';
          }
          
          // Se for redução (negativo), usar azul
          if (resultText.startsWith('-')) {
            badgeColor = 'rgba(59, 130, 246, 0.95)'; // Azul
            badgeIcon = '💧';
          }
        }
        
        const marker = L.marker([caseItem.lat, caseItem.lng], {
          icon: L.divIcon({
            className: 'case-pin-marker',
            html: `
              <div style="
                position: relative; 
                cursor: pointer;
                filter: drop-shadow(0 6px 12px rgba(0,0,0,0.4));
                transition: transform 0.2s;
              ">
                <!-- Pin Balão com tamanho variável -->
                <div style="
                  width: ${size.width}px;
                  height: ${size.height}px;
                  background: white;
                  border-radius: ${caseItem.cardSize === 'large' ? '20px' : '16px'};
                  overflow: hidden;
                  border: ${caseItem.cardSize === 'large' ? '5px' : '4px'} solid white;
                  box-shadow: 0 4px 16px rgba(0,0,0,0.3);
                  position: relative;
                ">
                  <!-- Foto de fundo -->
                  <img 
                    src="${caseItem.type === 'resultado' ? caseItem.photoResult : caseItem.photoAfter}" 
                    style="
                      width: 100%; 
                      height: 100%; 
                      object-fit: cover;
                    "
                    alt="${caseItem.producer}"
                  />
                  
                  <!-- Badge Premium (apenas para LARGE) -->
                  ${premiumBadge}
                  
                  <!-- Overlay escuro sutil -->
                  <div style="
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to bottom, rgba(0,0,0,0.15), rgba(0,0,0,0.6));
                  "></div>
                  
                  <!-- Texto resultado (grande e legível) -->
                  <div style="
                    position: absolute;
                    bottom: ${caseItem.cardSize === 'small' ? '3px' : '6px'};
                    left: ${caseItem.cardSize === 'small' ? '3px' : '6px'};
                    right: ${caseItem.cardSize === 'small' ? '3px' : '6px'};
                    background: ${badgeColor};
                    backdrop-filter: blur(8px);
                    color: white;
                    font-size: ${size.fontSize}px;
                    font-weight: 900;
                    padding: ${caseItem.cardSize === 'large' ? '8px 10px' : '6px 8px'};
                    border-radius: ${caseItem.cardSize === 'large' ? '10px' : '8px'};
                    text-align: center;
                    line-height: 1.1;
                    text-shadow: 0 2px 4px rgba(0,0,0,0.6);
                    letter-spacing: ${caseItem.cardSize === 'large' ? '-0.8px' : '-0.5px'};
                    box-shadow: 0 2px 8px rgba(0,0,0,0.3);
                  ">
                    ${resultText}
                  </div>
                  
                  <!-- Nome do produtor (topo) -->
                  <div style="
                    position: absolute;
                    top: ${caseItem.cardSize === 'small' ? '3px' : '6px'};
                    left: ${caseItem.cardSize === 'small' ? '3px' : '6px'};
                    right: ${caseItem.cardSize === 'large' ? '50px' : (caseItem.cardSize === 'small' ? '3px' : '6px')};
                    background: rgba(0, 0, 0, 0.75);
                    backdrop-filter: blur(8px);
                    color: white;
                    font-size: ${size.titleSize}px;
                    font-weight: 700;
                    padding: ${caseItem.cardSize === 'large' ? '4px 6px' : '3px 5px'};
                    border-radius: ${caseItem.cardSize === 'large' ? '6px' : '5px'};
                    text-align: center;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    text-shadow: 0 1px 2px rgba(0,0,0,0.4);
                  ">
                    ${caseItem.producer.length > (caseItem.cardSize === 'large' ? 20 : 15) 
                      ? caseItem.producer.substring(0, caseItem.cardSize === 'large' ? 18 : 12) + '...' 
                      : caseItem.producer}
                  </div>
                </div>
                
                <!-- Pontinha do pin (balão) -->
                <div style="
                  position: absolute;
                  bottom: -${caseItem.cardSize === 'large' ? '14px' : '12px'};
                  left: 50%;
                  transform: translateX(-50%);
                  width: 0;
                  height: 0;
                  border-left: ${caseItem.cardSize === 'large' ? '16px' : '14px'} solid transparent;
                  border-right: ${caseItem.cardSize === 'large' ? '16px' : '14px'} solid transparent;
                  border-top: ${caseItem.cardSize === 'large' ? '16px' : '14px'} solid white;
                  filter: drop-shadow(0 3px 4px rgba(0,0,0,0.2));
                "></div>
              </div>
            `,
            iconSize: [size.iconWidth, size.iconHeight],
            iconAnchor: [size.iconWidth / 2, size.iconHeight]
          })
        });

        marker.on('click', () => {
          setSelectedCase(caseItem);
        });

        markers.push(marker);
        
        // ✅ Verificar se mapInstance ainda está válido antes de adicionar (incluir overlayPane)
        try {
          const canAddMarker = mapInstance && 
                               mapInstance._container && 
                               mapInstance._panes && 
                               mapInstance._panes.overlayPane;
          
          if (canAddMarker) {
            marker.addTo(mapInstance);
          } else {
            console.warn('⚠️ MapInstance não tem estrutura DOM completa para adicionar marker');
          }
        } catch (markerErr) {
          console.error('❌ Erro ao adicionar marker individual:', markerErr);
        }
      });

      (mapInstance as any)._caseMarkers = markers;
      console.log(`✅ Publicação: ${markers.length} pins renderizados com sucesso (filtrados de ${cases.length} total)`);
      
    } catch (err) {
      console.error('❌ Publicação: Erro ao renderizar pins:', err);
    }
    }, 100); // Aguardar 100ms para garantir que o DOM está pronto
    
    return () => clearTimeout(timeoutId);
  }, [filteredCases, mapReady]);

  const handleCameraCapture = (imageDataUrl: string) => {
    if (caseType === 'resultado') {
      // Tipo RESULTADO: uma foto única
      setPhotoResult(imageDataUrl);
      toast.success('Foto do resultado capturada!');
    } else {
      // Tipo ANTES/DEPOIS: duas fotos
      if (cameraMode === 'before') {
        setPhotoBefore(imageDataUrl);
        toast.success('Foto ANTES capturada!');
      } else {
        setPhotoAfter(imageDataUrl);
        toast.success('Foto DEPOIS capturada!');
      }
    }
    setShowCamera(false);
  };

  // ✅ NOVO: Função para verificar se usuário pode editar/excluir
  const canEditCase = (caseItem: ResultCase): boolean => {
    // Se não há createdBy, é um case demo (todos podem editar em demo)
    if (!caseItem.createdBy) return true;
    // Verifica se o usuário atual é o criador
    return caseItem.createdBy === currentUserId;
  };

  const handleSaveCase = () => {
    // Se estiver editando, chamar função de edição
    if (editingCase) {
      handleSaveEdit();
      return;
    }

    // ✅ Validação baseada no tipo
    if (caseType === 'resultado') {
      if (!photoResult) {
        toast.error('Adicione foto do resultado');
        return;
      }
      if (!formData.quantity) {
        toast.error('Preencha a quantidade produzida');
        return;
      }
    } else {
      if (!photoBefore || !photoAfter) {
        toast.error('Adicione foto ANTES e DEPOIS');
        return;
      }
    }

    if (!formData.producer || !formData.product || !formData.sellerName) {
      toast.error('Preencha os campos obrigatórios');
      return;
    }

    // ✅ Criar case baseado no tipo e tamanho
    const newCase: ResultCase = {
      id: Date.now().toString(),
      type: caseType,
      cardSize: cardSize, // ✅ Tamanho do card (monetização)
      lat: userLocation?.lat || -23.2105,
      lng: userLocation?.lng || -50.6333,
      ...(caseType === 'resultado' 
        ? { photoResult }
        : { photoBefore, photoAfter }
      ),
      producer: formData.producer,
      location: formData.location || 'Localização GPS',
      product: formData.product,
      productDetail: formData.productDetail, // ✅ NOVO
      createdBy: currentUserId || undefined, // ✅ Associar ao usuário criador
      seller: {
        name: formData.sellerName,
        phone: formData.sellerPhone,
        company: formData.sellerCompany
      },
      results: caseType === 'resultado' 
        ? {
            quantity: formData.quantity,
            unit: formData.unit,
            metric: formData.metric,
            productivityValue: formData.productivityValue, // ✅ NOVO
            productivityUnit: formData.productivityUnit, // ✅ NOVO
            economy: formData.economy,
            period: formData.period
          }
        : {
            productivity: formData.productivity,
            productivityValue: formData.productivityValue, // ✅ NOVO
            productivityUnit: formData.productivityUnit, // ✅ NOVO
            economy: formData.economy,
            period: formData.period
          },
      description: formData.description,
      date: new Date().toISOString().split('T')[0],
      views: 0,
      campaign: formData.campaign || `Campanha ${new Date().getFullYear()}`
    };

    setCases([newCase, ...cases]);
    setShowAddCase(false);
    resetForm();
    toast.success('Case de sucesso publicado!');
  };

  const resetForm = () => {
    setCaseType('antes-depois');
    setCardSize('medium'); // ✅ Reset para tamanho médio (padrão)
    setFormData({
      producer: '',
      location: '',
      product: '',
      productDetail: '', // ✅ NOVO
      sellerName: '',
      sellerPhone: '',
      sellerCompany: '',
      productivity: '',
      productivityValue: '', // ✅ NOVO
      productivityUnit: 'sc/ha', // ✅ NOVO
      economy: '',
      period: '',
      description: '',
      campaign: '',
      quantity: '',
      unit: 'sacas',
      metric: 'produção'
    });
    setPhotoBefore(null);
    setPhotoAfter(null);
    setPhotoResult(null);
    setEditingCase(null);
  };

  // ✅ PERFORMANCE: Memorizar função de edição
  const handleEdit = useCallback((caseItem: ResultCase) => {
    // Verificar permissão
    if (!canEditCase(caseItem)) {
      toast.error('Você não tem permissão para editar este case', {
        description: 'Apenas o criador pode editar',
      });
      return;
    }

    setEditingCase(caseItem);
    setCaseType(caseItem.type);
    setCardSize(caseItem.cardSize);
    setFormData({
      producer: caseItem.producer,
      location: caseItem.location,
      product: caseItem.product,
      productDetail: caseItem.productDetail || '',
      sellerName: caseItem.seller.name,
      sellerPhone: caseItem.seller.phone,
      sellerCompany: caseItem.seller.company,
      productivity: caseItem.results.productivity || '',
      productivityValue: caseItem.results.productivityValue || '',
      productivityUnit: caseItem.results.productivityUnit || 'sc/ha',
      economy: caseItem.results.economy || '',
      period: caseItem.results.period || '',
      description: caseItem.description,
      campaign: caseItem.campaign,
      quantity: caseItem.results.quantity || '',
      unit: caseItem.results.unit || 'sacas',
      metric: caseItem.results.metric || 'produção'
    });
    
    if (caseItem.type === 'resultado') {
      setPhotoResult(caseItem.photoResult || null);
    } else {
      setPhotoBefore(caseItem.photoBefore || null);
      setPhotoAfter(caseItem.photoAfter || null);
    }
    
    setSelectedCase(null);
    setShowAddCase(true);
  }, [currentUserId]); // Dependência: currentUserId usado em canEditCase

  // Função para salvar edição
  const handleSaveEdit = () => {
    if (!editingCase) return;

    const updatedCase: ResultCase = {
      ...editingCase,
      type: caseType,
      cardSize: cardSize, // ✅ Atualizar tamanho do card
      producer: formData.producer,
      location: formData.location,
      product: formData.product,
      seller: {
        name: formData.sellerName,
        phone: formData.sellerPhone,
        company: formData.sellerCompany
      },
      ...(caseType === 'resultado'
        ? { photoResult: photoResult || '' }
        : { 
            photoBefore: photoBefore || '', 
            photoAfter: photoAfter || '' 
          }),
      results:
        caseType === 'resultado'
          ? {
              quantity: formData.quantity,
              unit: formData.unit,
              metric: formData.metric,
              economy: formData.economy,
              period: formData.period
            }
          : {
              productivity: formData.productivity,
              economy: formData.economy,
              period: formData.period
            },
      description: formData.description,
      campaign: formData.campaign
    };

    setCases(cases.map(c => c.id === editingCase.id ? updatedCase : c));
    setShowAddCase(false);
    resetForm();
    toast.success('Case atualizado com sucesso!');
  };

  // ✅ PERFORMANCE: Memorizar função de exclusão
  const handleDelete = useCallback((caseItem: ResultCase) => {
    // Verificar permissão
    if (!canEditCase(caseItem)) {
      toast.error('Você não tem permissão para excluir este case', {
        description: 'Apenas o criador pode excluir',
      });
      return;
    }

    setCaseToDelete(caseItem);
    setShowDeleteConfirm(true);
  }, [currentUserId]);

  // ✅ PERFORMANCE: Memorizar confirmação de exclusão
  const confirmDelete = useCallback(() => {
    if (!caseToDelete) return;
    
    setCases(cases.filter(c => c.id !== caseToDelete.id));
    setShowDeleteConfirm(false);
    setSelectedCase(null);
    setCaseToDelete(null);
    toast.success('Case excluído com sucesso!');
  }, [caseToDelete, cases]);

  // ✅ PERFORMANCE: Memorizar cálculo de distância
  const calculateDistance = useCallback((lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Raio da Terra em km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    return distance < 1 ? `${Math.round(distance * 1000)}m` : `${distance.toFixed(1)}km`;
  }, []);

  return (
    <div className="h-screen flex flex-col bg-white dark:bg-gray-950">
      {/* Mapa Fullscreen - Sem header, navegação via menu inferior */}
      <div className="flex-1 relative">
        <MapTilerComponent
          onMapReady={(mapInstance) => {
            if (!mapInstance) {
              console.error('❌ MapInstance inválido na Publicação');
              return;
            }
            
            // ✅ Verificar se o mapa tem container e panes (DOM está pronto)
            if (!mapInstance._container || !mapInstance._panes) {
              console.warn('⚠️ Publicação: Mapa ainda não tem DOM pronto');
              return;
            }
            
            console.log('✅ Publicação: Mapa pronto, salvando referência');
            mapInstanceRef.current = mapInstance;
            
            // ✅ Aguardar um pouco antes de marcar como pronto
            setTimeout(() => {
              setMapReady(true);
              
              if (userLocation) {
                try {
                  mapInstance.setView([userLocation.lat, userLocation.lng], 11);
                  console.log(`✅ Publicação: Mapa centralizado em [${userLocation.lat}, ${userLocation.lng}]`);
                } catch (err) {
                  console.error('❌ Erro ao centralizar mapa:', err);
                }
              }
            }, 200);
          }}
          onMapClick={(lat, lng) => {
            // Clicar no mapa não faz nada - apenas pins interagem
          }}
        />

        {/* ✅ Barra de busca no topo direito (não sobrepõe WiFi) */}
        <div className="absolute top-4 right-4 z-10 flex justify-end">
          {!showSearch ? (
            <button
              onClick={() => setShowSearch(true)}
              className="flex items-center gap-2 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-xl shadow-lg px-4 py-3 border border-gray-200 dark:border-gray-800 hover:bg-white dark:hover:bg-gray-900 transition-all"
            >
              <Search className="h-5 w-5 text-[#0057FF]" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Buscar cases</span>
            </button>
          ) : (
            <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-2 min-w-[300px] max-w-[calc(100vw-32px)]">
              <div className="flex items-center gap-2">
                <Search className="h-5 w-5 text-gray-400 ml-2" />
                <Input
                  type="text"
                  placeholder="Ex: olimpo, soja, coach regulador..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                  autoFocus
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                  >
                    <X className="h-4 w-4 text-gray-500" />
                  </button>
                )}
                <button
                  onClick={() => {
                    setShowSearch(false);
                    setSearchQuery('');
                  }}
                  className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  Fechar
                </button>
              </div>
              {searchQuery && (
                <div className="mt-2 px-2 pb-1">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {filteredCases.length} {filteredCases.length === 1 ? 'resultado encontrado' : 'resultados encontrados'}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Legenda flutuante */}
        <div className="absolute top-20 left-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-xl shadow-lg p-3 border border-gray-200 dark:border-gray-800 max-w-[220px]">
          <div className="text-xs space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold text-[10px]">
                📈
              </div>
              <span className="text-gray-700 dark:text-gray-300 font-medium">Antes/Depois</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center text-white font-bold text-[10px]">
                🎯
              </div>
              <span className="text-gray-700 dark:text-gray-300 font-medium">Resultado</span>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
              <div className="text-[9px] text-gray-500 dark:text-gray-400 mb-1 font-semibold">Tamanhos:</div>
              <div className="flex gap-1">
                <div className="w-4 h-4 bg-gray-400 rounded" title="Pequeno"></div>
                <div className="w-5 h-5 bg-blue-500 rounded" title="Médio"></div>
                <div className="w-6 h-6 bg-amber-500 rounded flex items-center justify-center text-[8px]" title="Grande">★</div>
              </div>
            </div>
            <div className="text-[10px] text-gray-500 dark:text-gray-400 leading-tight">
              Clique no pin para ver detalhes completos
            </div>
          </div>
        </div>

        {/* Estatísticas flutuantes */}
        <div className="absolute bottom-24 left-4 right-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-xl shadow-lg p-4 border border-gray-200 dark:border-gray-800">
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#0057FF]">
                {searchQuery ? `${filteredCases.length}/${cases.length}` : cases.length}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                {searchQuery ? 'Filtrados' : 'Cases'}
              </div>
            </div>
            <div className="text-center border-l border-r border-gray-200 dark:border-gray-700">
              <div className="text-2xl font-bold text-green-600">
                {filteredCases.reduce((sum, c) => sum + c.views, 0).toLocaleString()}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Visualizações</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-600">+39%</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Média ganho</div>
            </div>
          </div>
        </div>

        {/* FAB - Adicionar Case (Ajustado para evitar sobreposição com controles) */}
        <button
          onClick={() => setShowAddCase(true)}
          className="fixed bottom-[140px] right-4 w-16 h-16 bg-gradient-to-br from-[#0057FF] to-[#0046CC] hover:from-[#0046CC] hover:to-[#0057FF] text-white rounded-full shadow-2xl flex items-center justify-center transition-all active:scale-95 hover:scale-105"
          style={{ zIndex: Z_INDEX.FAB }}
          aria-label="Adicionar novo case"
        >
          <Plus className="h-7 w-7" />
        </button>
      </div>

      {/* Dialog: Detalhes do Case (Outdoor Style) */}
      <Dialog open={!!selectedCase} onOpenChange={(open) => !open && setSelectedCase(null)}>
        <DialogContent className="p-0 max-w-md overflow-hidden">
          {selectedCase && (
            <>
              {/* Header com gradiente */}
              <DialogHeader className="bg-gradient-to-br from-[#0057FF] to-[#0046CC] text-white p-4">
                <DialogTitle className="sr-only">
                  {selectedCase.producer} - {selectedCase.location}
                </DialogTitle>
                <DialogDescription className="sr-only">
                  Case de sucesso mostrando resultados do produto {selectedCase.product} na fazenda {selectedCase.producer}
                </DialogDescription>
              </DialogHeader>
              <div className="bg-gradient-to-br from-[#0057FF] to-[#0046CC] text-white p-4 -mt-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-lg">{selectedCase.producer}</h3>
                      {selectedCase.cardSize === 'large' && (
                        <span className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black text-[9px] font-black px-2 py-0.5 rounded-full">
                          ★ PREMIUM
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-white/80 mt-1">
                      <MapPin className="h-3 w-3" />
                      {selectedCase.location}
                      {userLocation && (
                        <span className="text-xs ml-1">
                          • {calculateDistance(
                            userLocation.lat,
                            userLocation.lng,
                            selectedCase.lat,
                            selectedCase.lng
                          )} de você
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 items-end">
                    <Badge className="bg-white/20 text-white border-0 text-[10px]">
                      {selectedCase.campaign}
                    </Badge>
                    <Badge className={`text-[9px] border-0 ${
                      selectedCase.cardSize === 'large' 
                        ? 'bg-amber-500/30 text-amber-100' 
                        : selectedCase.cardSize === 'medium' 
                          ? 'bg-blue-500/30 text-blue-100' 
                          : 'bg-gray-500/30 text-gray-100'
                    }`}>
                      {selectedCase.cardSize === 'large' ? '⭐ Grande' : selectedCase.cardSize === 'medium' ? '📍 Médio' : '📌 Pequeno'}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* ✅ CONDICIONAL: Foto única OU Comparação ANTES/DEPOIS */}
              {selectedCase.type === 'resultado' ? (
                // Tipo RESULTADO: Uma foto grande
                <div className="relative">
                  <ImageWithFallback
                    src={selectedCase.photoResult || ''}
                    alt="Resultado"
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-lg flex items-center gap-1">
                    🎯 RESULTADO
                  </div>
                </div>
              ) : (
                // Tipo ANTES/DEPOIS: Grid de 2 fotos
                <div className="relative">
                  <div className="grid grid-cols-2 gap-0">
                    <div className="relative">
                      <ImageWithFallback
                        src={selectedCase.photoBefore || ''}
                        alt="Antes"
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                        ANTES
                      </div>
                    </div>
                    <div className="relative">
                      <ImageWithFallback
                        src={selectedCase.photoAfter || ''}
                        alt="Depois"
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                        DEPOIS
                      </div>
                    </div>
                  </div>
                  
                  {/* Divisor central */}
                  <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-white shadow-lg -ml-0.5 z-10"></div>
                </div>
              )}

              {/* ✅ Resultados (condicional baseado no tipo) */}
              <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
                {/* ✅ DESTAQUE PRINCIPAL: Produtividade em sc/ha */}
                {selectedCase.results.productivityValue && selectedCase.results.productivityUnit && (
                  <div className="mb-3 bg-white dark:bg-gray-900 rounded-xl p-5 shadow-lg border-2 border-[#0057FF]">
                    <div className="text-center">
                      <div className="text-6xl font-black text-[#0057FF] mb-2 tracking-tight">
                        {selectedCase.results.productivityValue}
                      </div>
                      <div className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        {selectedCase.results.productivityUnit}
                      </div>
                      {selectedCase.productDetail && (
                        <div className="text-sm text-gray-600 dark:text-gray-400 italic">
                          {selectedCase.productDetail}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {selectedCase.type === 'resultado' ? (
                  // Tipo RESULTADO: Mostrar métricas adicionais
                  <div className="grid grid-cols-2 gap-3">
                    {selectedCase.results.economy && (
                      <div className="text-center bg-white dark:bg-gray-900 rounded-lg p-3 shadow-sm">
                        <div className="text-2xl mb-1">💰</div>
                        <div className="font-bold text-green-600">{selectedCase.results.economy}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Economia</div>
                      </div>
                    )}
                    {selectedCase.results.period && (
                      <div className="text-center bg-white dark:bg-gray-900 rounded-lg p-3 shadow-sm">
                        <Calendar className="h-5 w-5 text-blue-600 mx-auto mb-1" />
                        <div className="font-bold text-blue-600">{selectedCase.results.period}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Período</div>
                      </div>
                    )}
                  </div>
                ) : (
                  // Tipo ANTES/DEPOIS: Grid de métricas
                  <div className="grid grid-cols-3 gap-3">
                    {selectedCase.results.productivity && (
                      <div className="text-center bg-white dark:bg-gray-900 rounded-lg p-3 shadow-sm">
                        <TrendingUp className="h-5 w-5 text-green-600 mx-auto mb-1" />
                        <div className="font-bold text-green-600">{selectedCase.results.productivity}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Resultado</div>
                      </div>
                    )}
                    {selectedCase.results.economy && (
                      <div className="text-center bg-white dark:bg-gray-900 rounded-lg p-3 shadow-sm">
                        <div className="text-2xl mb-1">💰</div>
                        <div className="font-bold text-green-600">{selectedCase.results.economy}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Economia</div>
                      </div>
                    )}
                    {selectedCase.results.period && (
                      <div className="text-center bg-white dark:bg-gray-900 rounded-lg p-3 shadow-sm">
                        <Calendar className="h-5 w-5 text-blue-600 mx-auto mb-1" />
                        <div className="font-bold text-blue-600">{selectedCase.results.period}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Período</div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Produto usado */}
              <div className="px-4 pb-3">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center gap-2">
                    <div className="text-2xl">📦</div>
                    <div className="flex-1">
                      <div className="text-xs text-gray-600 dark:text-gray-400">Produto utilizado</div>
                      <div className="font-semibold text-[#0057FF]">{selectedCase.product}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Descrição */}
              {selectedCase.description && (
                <div className="px-4 pb-3">
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    {selectedCase.description}
                  </p>
                </div>
              )}

              {/* Vendedor (CTA destacado) */}
              <div className="p-4 bg-gradient-to-br from-[#0057FF]/5 to-[#0046CC]/5 border-t border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#0057FF] to-[#0046CC] rounded-full flex items-center justify-center text-white font-bold">
                    {selectedCase.seller.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-sm">{selectedCase.seller.name}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">{selectedCase.seller.company}</div>
                  </div>
                </div>
                
                <a
                  href={`tel:${selectedCase.seller.phone.replace(/\D/g, '')}`}
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 px-4 rounded-lg shadow-lg transition-all active:scale-95"
                >
                  <Phone className="h-4 w-4" />
                  Ligar: {selectedCase.seller.phone}
                </a>

                {/* Botões de Editar e Excluir - ✅ SEMPRE MOSTRAR */}
                <div className="grid grid-cols-2 gap-2 mt-3">
                  <Button
                    variant="outline"
                    onClick={() => handleEdit(selectedCase)}
                    className="flex items-center justify-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                    Editar
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleDelete(selectedCase)}
                    className="flex items-center justify-center gap-2 text-red-600 border-red-300 hover:bg-red-50 dark:hover:bg-red-950"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                    Excluir
                  </Button>
                </div>

                <div className="flex items-center justify-center gap-4 mt-3 text-xs text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {selectedCase.views.toLocaleString()} visualizações
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(selectedCase.date).toLocaleDateString('pt-BR')}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Dialog: Adicionar Novo Case */}
      <Dialog open={showAddCase} onOpenChange={setShowAddCase}>
        <DialogContent className="max-w-md p-0 max-h-[90vh] overflow-y-auto">
          <DialogHeader className="p-4 border-b border-gray-200 dark:border-gray-800">
            <DialogTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-[#0057FF] to-[#0046CC] rounded-full flex items-center justify-center">
                {editingCase ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                ) : (
                  <Plus className="h-4 w-4 text-white" />
                )}
              </div>
              {editingCase ? 'Editar Case de Sucesso' : 'Novo Case de Sucesso'}
            </DialogTitle>
            <DialogDescription>
              {editingCase 
                ? 'Atualize as informações do case de sucesso.' 
                : 'Compartilhe resultados reais da sua região. Escolha entre mostrar antes/depois ou apenas o resultado final alcançado.'}
            </DialogDescription>
          </DialogHeader>

          <div className="p-4 space-y-4">
            {/* ✅ Seletor de Tipo de Case */}
            <div>
              <Label className="text-sm font-semibold mb-2 block">Tipo de Case *</Label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setCaseType('antes-depois')}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    caseType === 'antes-depois'
                      ? 'border-[#0057FF] bg-blue-50 dark:bg-blue-950'
                      : 'border-gray-300 dark:border-gray-700 hover:border-gray-400'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-1">📈</div>
                    <div className="text-xs font-semibold">Antes e Depois</div>
                    <div className="text-[10px] text-gray-500 mt-0.5">Comparação visual</div>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setCaseType('resultado')}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    caseType === 'resultado'
                      ? 'border-[#0057FF] bg-blue-50 dark:bg-blue-950'
                      : 'border-gray-300 dark:border-gray-700 hover:border-gray-400'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-1">🎯</div>
                    <div className="text-xs font-semibold">Resultado</div>
                    <div className="text-[10px] text-gray-500 mt-0.5">Produção/métricas</div>
                  </div>
                </button>
              </div>
            </div>

            {/* ✅ NOVO: Seletor de Tamanho do Card (Monetiza��ão) */}
            <div>
              <Label className="text-sm font-semibold mb-2 block">
                Tamanho do Card * 
                <span className="text-[10px] text-gray-500 ml-2">(afeta visibilidade no mapa)</span>
              </Label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setCardSize('small')}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    cardSize === 'small'
                      ? 'border-gray-500 bg-gray-50 dark:bg-gray-900'
                      : 'border-gray-300 dark:border-gray-700 hover:border-gray-400'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-lg mb-1">📌</div>
                    <div className="text-[10px] font-semibold">Pequeno</div>
                    <div className="text-[9px] text-gray-500 mt-0.5">Básico</div>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setCardSize('medium')}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    cardSize === 'medium'
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-950'
                      : 'border-gray-300 dark:border-gray-700 hover:border-gray-400'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-xl mb-1">📍</div>
                    <div className="text-xs font-semibold">Médio</div>
                    <div className="text-[9px] text-gray-500 mt-0.5">Padrão</div>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setCardSize('large')}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    cardSize === 'large'
                      ? 'border-amber-500 bg-amber-50 dark:bg-amber-950'
                      : 'border-gray-300 dark:border-gray-700 hover:border-gray-400'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-1">⭐</div>
                    <div className="text-xs font-semibold">Grande</div>
                    <div className="text-[9px] text-amber-600 dark:text-amber-400 mt-0.5">Premium</div>
                  </div>
                </button>
              </div>
              <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-[10px] text-gray-600 dark:text-gray-400 leading-relaxed">
                  💡 Cards maiores têm mais destaque no mapa e atraem mais visualizações. 
                  {cardSize === 'large' && ' O selo "Premium" é exibido automaticamente.'}
                </p>
              </div>
            </div>

            {/* ✅ Fotos (condicional baseado no tipo) */}
            <div>
              <Label className="text-sm font-semibold mb-2 block">
                {caseType === 'antes-depois' ? 'Fotos Comparativas *' : 'Foto do Resultado *'}
              </Label>
              
              {caseType === 'antes-depois' ? (
                // Grid 2 fotos: Antes e Depois
                <div className="grid grid-cols-2 gap-3">
                  {/* ANTES */}
                  <div>
                    <button
                      onClick={() => {
                        setCameraMode('before');
                        setShowCamera(true);
                      }}
                      className="w-full aspect-square border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg hover:border-[#0057FF] transition-colors relative overflow-hidden group"
                    >
                      {photoBefore ? (
                        <img src={photoBefore} alt="Antes" className="w-full h-full object-cover" />
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-colors">
                          <Camera className="h-8 w-8 text-gray-400 mb-2" />
                          <span className="text-xs text-gray-600 dark:text-gray-400">ANTES</span>
                        </div>
                      )}
                    </button>
                    <div className="text-center mt-1">
                      <Badge variant="outline" className="text-xs border-red-500 text-red-600">ANTES</Badge>
                    </div>
                  </div>

                  {/* DEPOIS */}
                  <div>
                    <button
                      onClick={() => {
                        setCameraMode('after');
                        setShowCamera(true);
                      }}
                      className="w-full aspect-square border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg hover:border-[#0057FF] transition-colors relative overflow-hidden group"
                    >
                      {photoAfter ? (
                        <img src={photoAfter} alt="Depois" className="w-full h-full object-cover" />
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-colors">
                          <Camera className="h-8 w-8 text-gray-400 mb-2" />
                          <span className="text-xs text-gray-600 dark:text-gray-400">DEPOIS</span>
                        </div>
                      )}
                    </button>
                    <div className="text-center mt-1">
                    <Badge variant="outline" className="text-xs border-green-500 text-green-600">DEPOIS</Badge>
                  </div>
                </div>
              </div>
              ) : (
                // Foto única: Resultado
                <div className="max-w-xs mx-auto">
                  <button
                    onClick={() => setShowCamera(true)}
                    className="w-full aspect-square border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg hover:border-[#0057FF] transition-colors relative overflow-hidden group"
                  >
                    {photoResult ? (
                      <img src={photoResult} alt="Resultado" className="w-full h-full object-cover" />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-colors">
                        <Camera className="h-8 w-8 text-gray-400 mb-2" />
                        <span className="text-xs text-gray-600 dark:text-gray-400">FOTO</span>
                      </div>
                    )}
                  </button>
                  <div className="text-center mt-1">
                    <Badge variant="outline" className="text-xs border-indigo-500 text-indigo-600">RESULTADO</Badge>
                  </div>
                </div>
              )}
            </div>

            {/* Informações do Produtor */}
            <div className="space-y-3">
              <div>
                <Label htmlFor="producer">Produtor / Fazenda *</Label>
                <Input
                  id="producer"
                  placeholder="Ex: Fazenda Santa Rita"
                  value={formData.producer}
                  onChange={(e) => setFormData({...formData, producer: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="location">Localização</Label>
                <Input
                  id="location"
                  placeholder="Ex: Jataizinho - PR (ou deixe em branco para GPS)"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="product">Produto Utilizado *</Label>
                <Input
                  id="product"
                  placeholder="Ex: Soja Olimpo"
                  value={formData.product}
                  onChange={(e) => setFormData({...formData, product: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="productDetail">
                  Detalhes do Produto 
                  <span className="text-xs text-gray-500 ml-2">(ex: material olimpo, com coach regulador)</span>
                </Label>
                <Input
                  id="productDetail"
                  placeholder="Ex: material olimpo"
                  value={formData.productDetail}
                  onChange={(e) => setFormData({...formData, productDetail: e.target.value})}
                />
              </div>
            </div>

            {/* ✅ Resultados (condicional baseado no tipo) */}
            <div className="space-y-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <Label className="text-sm font-semibold">Resultados Alcançados</Label>
              
              {/* ✅ NOVO: Campos de Produtividade Precisa (sc/ha) - PARA TODOS OS TIPOS */}
              <div className="bg-white dark:bg-gray-900 p-3 rounded-lg border border-green-300 dark:border-green-700">
                <Label className="text-xs font-bold text-[#0057FF] mb-2 block">
                  📊 Produtividade Precisa (destaque no card)
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="productivityValue" className="text-xs">Valor *</Label>
                    <Input
                      id="productivityValue"
                      type="number"
                      placeholder="Ex: 80"
                      value={formData.productivityValue}
                      onChange={(e) => setFormData({...formData, productivityValue: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="productivityUnit" className="text-xs">Unidade *</Label>
                    <Select
                      value={formData.productivityUnit}
                      onValueChange={(value) => setFormData({...formData, productivityUnit: value})}
                    >
                      <SelectTrigger id="productivityUnit">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sc/ha">sc/ha</SelectItem>
                        <SelectItem value="ton/ha">ton/ha</SelectItem>
                        <SelectItem value="kg/ha">kg/ha</SelectItem>
                        <SelectItem value="l/ha">l/ha</SelectItem>
                        <SelectItem value="%">%</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <p className="text-[10px] text-gray-500 mt-1">
                  Este valor aparecerá em DESTAQUE no card de detalhes
                </p>
              </div>

              {caseType === 'resultado' ? (
                // Campos para tipo RESULTADO
                <>
                  <div>
                    <Label htmlFor="quantity" className="text-xs">Quantidade Produzida *</Label>
                    <Input
                      id="quantity"
                      type="number"
                      placeholder="Ex: 120"
                      value={formData.quantity}
                      onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="unit" className="text-xs">Unidade</Label>
                      <Select
                        value={formData.unit}
                        onValueChange={(value) => setFormData({...formData, unit: value})}
                      >
                        <SelectTrigger id="unit">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sacas">Sacas</SelectItem>
                          <SelectItem value="toneladas">Toneladas</SelectItem>
                          <SelectItem value="kg">Kg</SelectItem>
                          <SelectItem value="hectares">Hectares</SelectItem>
                          <SelectItem value="litros">Litros</SelectItem>
                          <SelectItem value="unidades">Unidades</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="metric" className="text-xs">Métrica</Label>
                      <Select
                        value={formData.metric}
                        onValueChange={(value) => setFormData({...formData, metric: value})}
                      >
                        <SelectTrigger id="metric">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="produção">Produção</SelectItem>
                          <SelectItem value="rendimento">Rendimento</SelectItem>
                          <SelectItem value="área plantada">Área plantada</SelectItem>
                          <SelectItem value="colheita">Colheita</SelectItem>
                          <SelectItem value="vendas">Vendas</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="economy" className="text-xs">Economia Gerada (opcional)</Label>
                    <Input
                      id="economy"
                      placeholder="Ex: R$ 22.000 economizados"
                      value={formData.economy}
                      onChange={(e) => setFormData({...formData, economy: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="period" className="text-xs">Período</Label>
                    <Input
                      id="period"
                      placeholder="Ex: Safra 2025"
                      value={formData.period}
                      onChange={(e) => setFormData({...formData, period: e.target.value})}
                    />
                  </div>
                </>
              ) : (
                // Campos para tipo ANTES/DEPOIS
                <>
                  <div>
                    <Label htmlFor="productivity" className="text-xs">Ganho de Produtividade</Label>
                    <Input
                      id="productivity"
                      placeholder="Ex: +38% produtividade"
                      value={formData.productivity}
                      onChange={(e) => setFormData({...formData, productivity: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="economy" className="text-xs">Economia Gerada</Label>
                    <Input
                      id="economy"
                      placeholder="Ex: R$ 22.000 economizados"
                      value={formData.economy}
                      onChange={(e) => setFormData({...formData, economy: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="period" className="text-xs">Período de Análise</Label>
                    <Input
                      id="period"
                      placeholder="Ex: 120 dias"
                      value={formData.period}
                      onChange={(e) => setFormData({...formData, period: e.target.value})}
                    />
                  </div>
                </>
              )}
            </div>

            {/* Vendedor (CTA) */}
            <div className="space-y-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <Label className="text-sm font-semibold">Informações do Vendedor *</Label>
              
              <div>
                <Label htmlFor="sellerName" className="text-xs">Nome do Vendedor</Label>
                <Input
                  id="sellerName"
                  placeholder="Ex: Carlos Silva"
                  value={formData.sellerName}
                  onChange={(e) => setFormData({...formData, sellerName: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="sellerPhone" className="text-xs">Telefone para Contato</Label>
                <Input
                  id="sellerPhone"
                  placeholder="Ex: (43) 99876-5432"
                  value={formData.sellerPhone}
                  onChange={(e) => setFormData({...formData, sellerPhone: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="sellerCompany" className="text-xs">Empresa</Label>
                <Input
                  id="sellerCompany"
                  placeholder="Ex: AgroTech Solutions"
                  value={formData.sellerCompany}
                  onChange={(e) => setFormData({...formData, sellerCompany: e.target.value})}
                />
              </div>
            </div>

            {/* Descrição */}
            <div>
              <Label htmlFor="description">Descrição do Case</Label>
              <Textarea
                id="description"
                placeholder="Descreva brevemente o caso de sucesso..."
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>

            {/* Campanha */}
            <div>
              <Label htmlFor="campaign">Campanha / Safra</Label>
              <Input
                id="campaign"
                placeholder="Ex: Safra Verão 2025"
                value={formData.campaign}
                onChange={(e) => setFormData({...formData, campaign: e.target.value})}
              />
            </div>

            {/* Ações */}
            <div className="flex gap-2 pt-2">
              <Button
                variant="outline"
                onClick={() => {
                  setShowAddCase(false);
                  resetForm();
                }}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleSaveCase}
                className="flex-1 bg-gradient-to-r from-[#0057FF] to-[#0046CC] hover:from-[#0046CC] hover:to-[#0057FF]"
              >
                {editingCase ? 'Atualizar Case' : 'Publicar Case'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog de Confirmação de Exclusão */}
      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir o case de sucesso <strong>"{caseToDelete?.producer}"</strong>? 
              Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => {
              setShowDeleteConfirm(false);
              setCaseToDelete(null);
            }}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Excluir Case
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Camera Capture */}
      <CameraCapture
        isOpen={showCamera}
        onClose={() => setShowCamera(false)}
        onCapture={handleCameraCapture}
      />
    </div>
  );
}
