import { useState } from 'react';
import { ArrowLeft, Users, Plus, MapPin, Clock, Calendar, Phone, Mail, Trash2, Edit2, CheckCircle2, XCircle, MoreVertical } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { toast } from 'sonner@2.0.3';

interface GestaoEquipesProps {
  navigate: (path: string) => void;
}

interface Membro {
  id: string;
  nome: string;
  cargo: string;
  email: string;
  telefone: string;
  avatar?: string;
  status: 'ativo' | 'inativo' | 'ferias';
  checkInStatus: 'checkin' | 'checkout' | 'offline';
  horasTrabalhadas: number;
  ultimoCheckIn?: {
    data: string;
    hora: string;
    localizacao: string;
    lat: number;
    lng: number;
  };
}

export default function GestaoEquipes({ navigate }: GestaoEquipesProps) {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [membros, setMembros] = useState<Membro[]>([
    {
      id: '1',
      nome: 'Carlos Silva',
      cargo: 'Operador de Campo',
      email: 'carlos@soloforte.com',
      telefone: '(11) 98765-4321',
      status: 'ativo',
      checkInStatus: 'checkin',
      horasTrabalhadas: 42.5,
      ultimoCheckIn: {
        data: '2025-11-08',
        hora: '08:15',
        localizacao: 'Fazenda Esperança - Talhão A3',
        lat: -23.5505,
        lng: -46.6333
      }
    },
    {
      id: '2',
      nome: 'Maria Santos',
      cargo: 'Supervisora de Operações',
      email: 'maria@soloforte.com',
      telefone: '(11) 98765-4322',
      status: 'ativo',
      checkInStatus: 'checkin',
      horasTrabalhadas: 38.0,
      ultimoCheckIn: {
        data: '2025-11-08',
        hora: '07:45',
        localizacao: 'Fazenda Esperança - Sede',
        lat: -23.5515,
        lng: -46.6343
      }
    },
    {
      id: '3',
      nome: 'João Oliveira',
      cargo: 'Mecânico',
      email: 'joao@soloforte.com',
      telefone: '(11) 98765-4323',
      status: 'ativo',
      checkInStatus: 'checkout',
      horasTrabalhadas: 40.0
    },
    {
      id: '4',
      nome: 'Ana Costa',
      cargo: 'Operadora de Campo',
      email: 'ana@soloforte.com',
      telefone: '(11) 98765-4324',
      status: 'ferias',
      checkInStatus: 'offline',
      horasTrabalhadas: 0
    }
  ]);

  const [novoMembro, setNovoMembro] = useState({
    nome: '',
    cargo: '',
    email: '',
    telefone: ''
  });

  const handleAddMembro = () => {
    if (!novoMembro.nome || !novoMembro.cargo || !novoMembro.email) {
      toast.error('❌ Campos obrigatórios', {
        description: 'Preencha nome, cargo e email'
      });
      return;
    }

    const newMembro: Membro = {
      id: Date.now().toString(),
      ...novoMembro,
      status: 'ativo',
      checkInStatus: 'offline',
      horasTrabalhadas: 0
    };

    setMembros([...membros, newMembro]);
    setShowAddDialog(false);
    setNovoMembro({ nome: '', cargo: '', email: '', telefone: '' });
    
    toast.success('✅ Membro adicionado!', {
      description: `${newMembro.nome} foi adicionado à equipe`
    });
  };

  const handleDeleteMembro = (id: string) => {
    const membro = membros.find(m => m.id === id);
    setMembros(membros.filter(m => m.id !== id));
    toast.success('🗑️ Membro removido', {
      description: `${membro?.nome} foi removido da equipe`
    });
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      ativo: 'bg-green-100 text-green-700',
      inativo: 'bg-gray-100 text-gray-700',
      ferias: 'bg-blue-100 text-blue-700'
    };
    const labels = {
      ativo: '✅ Ativo',
      inativo: '⏸️ Inativo',
      ferias: '🏖️ Férias'
    };
    return (
      <Badge className={`${variants[status as keyof typeof variants]} border-0`}>
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  const getCheckInBadge = (checkInStatus: string) => {
    const variants = {
      checkin: 'bg-green-100 text-green-700',
      checkout: 'bg-gray-100 text-gray-700',
      offline: 'bg-red-100 text-red-700'
    };
    const labels = {
      checkin: '🟢 Check-in',
      checkout: '⚫ Check-out',
      offline: '🔴 Offline'
    };
    return (
      <Badge className={`${variants[checkInStatus as keyof typeof variants]} border-0`}>
        {labels[checkInStatus as keyof typeof labels]}
      </Badge>
    );
  };

  const membrosAtivos = membros.filter(m => m.status === 'ativo' && m.checkInStatus === 'checkin').length;
  const horasTotais = membros.reduce((acc, m) => acc + m.horasTrabalhadas, 0);

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/dashboard')}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-lg">Gestão de Equipes</h1>
              <p className="text-xs text-gray-500">{membros.length} colaboradores</p>
            </div>
          </div>
          
          <Button
            onClick={() => setShowAddDialog(true)}
            size="sm"
            className="bg-[#0057FF] hover:bg-[#0041CC] text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Adicionar
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="p-4 bg-gradient-to-br from-[#0057FF] to-[#0041CC] text-white border-0">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs opacity-90">Em Campo Agora</p>
                <p className="text-2xl mt-1">{membrosAtivos}</p>
              </div>
              <Users className="h-8 w-8 opacity-50" />
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-green-500 to-emerald-600 text-white border-0">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs opacity-90">Horas (Semana)</p>
                <p className="text-2xl mt-1">{horasTotais.toFixed(1)}h</p>
              </div>
              <Clock className="h-8 w-8 opacity-50" />
            </div>
          </Card>
        </div>

        {/* Lista de Membros */}
        <div className="space-y-3">
          <h2 className="text-sm text-gray-600 px-1">Equipe</h2>
          
          {membros.map((membro) => (
            <Card key={membro.id} className="p-4 border border-gray-200">
              <div className="flex items-start gap-3">
                {/* Avatar */}
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#0057FF] to-[#0041CC] flex items-center justify-center text-white flex-shrink-0">
                  <span className="text-lg">
                    {membro.nome.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  {/* Nome e Cargo */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm text-gray-900 truncate">{membro.nome}</h3>
                      <p className="text-xs text-gray-500">{membro.cargo}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 flex-shrink-0"
                      onClick={() => handleDeleteMembro(membro.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </div>

                  {/* Badges de Status */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {getStatusBadge(membro.status)}
                    {getCheckInBadge(membro.checkInStatus)}
                  </div>

                  {/* Informações de Contato */}
                  <div className="space-y-1.5 mb-3">
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <Mail className="h-3.5 w-3.5 text-gray-400" />
                      <span className="truncate">{membro.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <Phone className="h-3.5 w-3.5 text-gray-400" />
                      <span>{membro.telefone}</span>
                    </div>
                  </div>

                  {/* Último Check-in */}
                  {membro.ultimoCheckIn && (
                    <div className="bg-gray-50 rounded-lg p-3 space-y-1.5">
                      <p className="text-xs text-gray-500">Último Check-in</p>
                      <div className="flex items-center gap-2 text-xs text-gray-700">
                        <Calendar className="h-3.5 w-3.5 text-gray-400" />
                        <span>
                          {new Date(membro.ultimoCheckIn.data).toLocaleDateString('pt-BR')} às {membro.ultimoCheckIn.hora}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-700">
                        <MapPin className="h-3.5 w-3.5 text-[#0057FF]" />
                        <span className="truncate">{membro.ultimoCheckIn.localizacao}</span>
                      </div>
                    </div>
                  )}

                  {/* Horas Trabalhadas */}
                  <div className="mt-3 flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-xs text-gray-600">
                      {membro.horasTrabalhadas}h trabalhadas esta semana
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Dialog Adicionar Membro */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Adicionar Membro</DialogTitle>
            <DialogDescription>
              Adicione um novo colaborador à equipe
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome completo *</Label>
              <Input
                id="nome"
                placeholder="Ex: João Silva"
                value={novoMembro.nome}
                onChange={(e) => setNovoMembro({ ...novoMembro, nome: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cargo">Cargo *</Label>
              <Input
                id="cargo"
                placeholder="Ex: Operador de Campo"
                value={novoMembro.cargo}
                onChange={(e) => setNovoMembro({ ...novoMembro, cargo: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="exemplo@soloforte.com"
                value={novoMembro.email}
                onChange={(e) => setNovoMembro({ ...novoMembro, email: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="telefone">Telefone</Label>
              <Input
                id="telefone"
                placeholder="(11) 98765-4321"
                value={novoMembro.telefone}
                onChange={(e) => setNovoMembro({ ...novoMembro, telefone: e.target.value })}
              />
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setShowAddDialog(false)}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleAddMembro}
              className="flex-1 bg-[#0057FF] hover:bg-[#0041CC] text-white"
            >
              Adicionar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
