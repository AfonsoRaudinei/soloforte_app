import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { MapPin, Building2, User, Loader2 } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { supabase } from '../utils/supabaseClient';
import type { Polygon } from '../types';

interface Cliente {
  id: string;
  nome: string;
  cidade?: string;
  estado?: string;
}

interface Fazenda {
  id: string;
  cliente_id: string;
  nome: string;
  area_total_ha?: number;
  cidade?: string;
  estado?: string;
}

interface TalhaoVinculoModalProps {
  isOpen: boolean;
  onClose: () => void;
  polygon: Polygon | null;
  onSave: (talhaoId: string) => void;
}

export function TalhaoVinculoModal({ isOpen, onClose, polygon, onSave }: TalhaoVinculoModalProps) {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [fazendas, setFazendas] = useState<Fazenda[]>([]);
  const [selectedClienteId, setSelectedClienteId] = useState<string>('');
  const [selectedFazendaId, setSelectedFazendaId] = useState<string>('');
  const [nomeTalhao, setNomeTalhao] = useState('');
  const [cultura, setCultura] = useState('');
  const [safra, setSafra] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Carregar clientes ao abrir o modal
  useEffect(() => {
    if (isOpen) {
      loadClientes();
      if (polygon) {
        setNomeTalhao(polygon.name);
      }
    }
  }, [isOpen, polygon]);

  // Carregar fazendas quando selecionar cliente
  useEffect(() => {
    if (selectedClienteId) {
      loadFazendas(selectedClienteId);
    } else {
      setFazendas([]);
      setSelectedFazendaId('');
    }
  }, [selectedClienteId]);

  const loadClientes = async () => {
    setIsLoading(true);
    try {
      // Verificar se Supabase está configurado
      if (!supabase) {
        console.warn('⚠️ Supabase não configurado');
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('clientes')
        .select('*')
        .eq('ativo', true)
        .order('nome');

      if (error) throw error;
      setClientes(data || []);
    } catch (error) {
      console.error('Erro ao carregar clientes:', error);
      toast.error('Erro ao carregar clientes');
    } finally {
      setIsLoading(false);
    }
  };

  const loadFazendas = async (clienteId: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('fazendas')
        .select('*')
        .eq('cliente_id', clienteId)
        .eq('ativo', true)
        .order('nome');

      if (error) throw error;
      setFazendas(data || []);
    } catch (error) {
      console.error('Erro ao carregar fazendas:', error);
      toast.error('Erro ao carregar fazendas');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!polygon) return;

    // Validações
    if (!selectedClienteId) {
      toast.error('Selecione um cliente');
      return;
    }
    if (!selectedFazendaId) {
      toast.error('Selecione uma fazenda');
      return;
    }
    if (!nomeTalhao.trim()) {
      toast.error('Digite o nome do talhão');
      return;
    }

    setIsSaving(true);
    try {
      // Preparar coordenadas no formato GeoJSON
      const coordenadas = {
        type: 'Polygon',
        coordinates: [polygon.points.map(p => [p.lng, p.lat])],
        points: polygon.points, // Manter também no formato original para facilitar
      };

      const talhaoData = {
        cliente_id: selectedClienteId,
        fazenda_id: selectedFazendaId,
        nome: nomeTalhao.trim(),
        area_ha: polygon.area,
        perimetro_m: polygon.perimeter,
        coordenadas: coordenadas,
        tipo: polygon.type,
        cor: polygon.color,
        cultura: cultura.trim() || null,
        safra: safra.trim() || null,
      };

      const { data, error } = await supabase
        .from('talhoes')
        .insert(talhaoData)
        .select()
        .single();

      if (error) throw error;

      // Buscar nome do cliente e fazenda para o toast
      const cliente = clientes.find(c => c.id === selectedClienteId);
      const fazenda = fazendas.find(f => f.id === selectedFazendaId);

      toast.success('✅ Talhão salvo com sucesso!', {
        description: `${nomeTalhao} em ${fazenda?.nome} (${cliente?.nome})`,
        duration: 4000,
      });

      onSave(data.id);
      handleClose();
    } catch (error) {
      console.error('Erro ao salvar talhão:', error);
      toast.error('Erro ao salvar talhão no banco de dados');
    } finally {
      setIsSaving(false);
    }
  };

  const handleClose = () => {
    setSelectedClienteId('');
    setSelectedFazendaId('');
    setNomeTalhao('');
    setCultura('');
    setSafra('');
    onClose();
  };

  if (!polygon) return null;

  const selectedCliente = clientes.find(c => c.id === selectedClienteId);
  const selectedFazenda = fazendas.find(f => f.id === selectedFazendaId);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-[#0057FF]" />
            Salvar Talhão
          </DialogTitle>
          <DialogDescription>
            Vincule o talhão a um cliente e fazenda para persistir no banco de dados
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Informações do Polígono */}
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-gray-600">Área</p>
                <p className="text-gray-900">
                  <strong>{polygon.area.toFixed(2)} ha</strong>
                </p>
              </div>
              <div>
                <p className="text-gray-600">Perímetro</p>
                <p className="text-gray-900">
                  <strong>{polygon.perimeter.toFixed(0)} m</strong>
                </p>
              </div>
            </div>
          </div>

          {/* Selecionar Cliente */}
          <div className="space-y-2">
            <Label htmlFor="cliente" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Cliente *
            </Label>
            <Select
              value={selectedClienteId}
              onValueChange={setSelectedClienteId}
              disabled={isLoading}
            >
              <SelectTrigger id="cliente">
                <SelectValue placeholder="Selecione um cliente" />
              </SelectTrigger>
              <SelectContent>
                {clientes.map(cliente => (
                  <SelectItem key={cliente.id} value={cliente.id}>
                    {cliente.nome}
                    {cliente.cidade && ` • ${cliente.cidade}/${cliente.estado}`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Selecionar Fazenda */}
          <div className="space-y-2">
            <Label htmlFor="fazenda" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Fazenda *
            </Label>
            <Select
              value={selectedFazendaId}
              onValueChange={setSelectedFazendaId}
              disabled={!selectedClienteId || isLoading}
            >
              <SelectTrigger id="fazenda">
                <SelectValue placeholder={
                  !selectedClienteId 
                    ? "Selecione um cliente primeiro" 
                    : fazendas.length === 0
                    ? "Nenhuma fazenda encontrada"
                    : "Selecione uma fazenda"
                } />
              </SelectTrigger>
              <SelectContent>
                {fazendas.map(fazenda => (
                  <SelectItem key={fazenda.id} value={fazenda.id}>
                    {fazenda.nome}
                    {fazenda.area_total_ha && ` • ${fazenda.area_total_ha} ha`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Nome do Talhão */}
          <div className="space-y-2">
            <Label htmlFor="nome">
              Nome do Talhão *
            </Label>
            <Input
              id="nome"
              value={nomeTalhao}
              onChange={(e) => setNomeTalhao(e.target.value)}
              placeholder="Ex: Talhão A3, Área Norte, etc."
              maxLength={100}
            />
          </div>

          {/* Cultura (Opcional) */}
          <div className="space-y-2">
            <Label htmlFor="cultura">
              Cultura (Opcional)
            </Label>
            <Input
              id="cultura"
              value={cultura}
              onChange={(e) => setCultura(e.target.value)}
              placeholder="Ex: Soja, Milho, Café..."
              maxLength={50}
            />
          </div>

          {/* Safra (Opcional) */}
          <div className="space-y-2">
            <Label htmlFor="safra">
              Safra (Opcional)
            </Label>
            <Input
              id="safra"
              value={safra}
              onChange={(e) => setSafra(e.target.value)}
              placeholder="Ex: 2024/2025"
              maxLength={20}
            />
          </div>

          {/* Preview do Vínculo */}
          {selectedCliente && selectedFazenda && (
            <div className="p-3 bg-green-50 rounded-lg border border-green-200">
              <p className="text-xs text-green-800 mb-1">
                <strong>Será salvo em:</strong>
              </p>
              <p className="text-sm text-green-900">
                {selectedFazenda.nome} → {selectedCliente.nome}
              </p>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isSaving}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            disabled={isSaving || !selectedClienteId || !selectedFazendaId || !nomeTalhao.trim()}
            className="bg-[#0057FF] hover:bg-[#0046CC]"
          >
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Salvando...
              </>
            ) : (
              'Salvar Talhão'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default TalhaoVinculoModal;