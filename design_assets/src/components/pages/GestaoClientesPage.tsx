/**
 * 🏢 PÁGINA DE GESTÃO DE CLIENTES E FAZENDAS - SOLOFORTE
 * 
 * CRUD completo para gerenciar clientes e fazendas
 */

import { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Edit2, Trash2, Building2, MapPin, Search, Filter, User, Phone, Mail, Loader2, ExternalLink } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { toast } from 'sonner@2.0.3';
import { supabase } from '../../utils/supabaseClient';
import type { NavigateFunction } from '../../types';

interface Cliente {
  id: string;
  nome: string;
  cpf_cnpj?: string;
  email?: string;
  telefone?: string;
  cidade?: string;
  estado?: string;
  ativo: boolean;
  data_criacao: string;
}

interface Fazenda {
  id: string;
  cliente_id: string;
  nome: string;
  area_total_ha?: number;
  cidade?: string;
  estado?: string;
  ativo: boolean;
  data_criacao: string;
}

interface GestaoClientesPageProps {
  navigate: NavigateFunction;
}

export function GestaoClientesPage({ navigate }: GestaoClientesPageProps) {
  const [activeTab, setActiveTab] = useState<'clientes' | 'fazendas'>('clientes');
  
  // Estados de Clientes
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [isLoadingClientes, setIsLoadingClientes] = useState(false);
  const [searchClientes, setSearchClientes] = useState('');
  
  // Estados de Fazendas
  const [fazendas, setFazendas] = useState<Fazenda[]>([]);
  const [isLoadingFazendas, setIsLoadingFazendas] = useState(false);
  const [searchFazendas, setSearchFazendas] = useState('');
  const [filtroClienteId, setFiltroClienteId] = useState<string>('');
  
  // Estados de Modals
  const [showClienteModal, setShowClienteModal] = useState(false);
  const [showFazendaModal, setShowFazendaModal] = useState(false);
  const [editingCliente, setEditingCliente] = useState<Cliente | null>(null);
  const [editingFazenda, setEditingFazenda] = useState<Fazenda | null>(null);
  
  // Form states
  const [isSaving, setIsSaving] = useState(false);

  // Carregar dados ao montar
  useEffect(() => {
    loadClientes();
    loadFazendas();
  }, []);

  const loadClientes = async () => {
    setIsLoadingClientes(true);
    try {
      // Verificar se Supabase está configurado
      if (!supabase) {
        console.warn('⚠️ Supabase não configurado');
        setIsLoadingClientes(false);
        return;
      }

      const { data, error } = await supabase
        .from('clientes')
        .select('*')
        .order('nome');

      if (error) throw error;
      setClientes(data || []);
    } catch (error) {
      console.error('Erro ao carregar clientes:', error);
      toast.error('Erro ao carregar clientes');
    } finally {
      setIsLoadingClientes(false);
    }
  };

  const loadFazendas = async () => {
    setIsLoadingFazendas(true);
    try {
      // Verificar se Supabase está configurado
      if (!supabase) {
        console.warn('⚠️ Supabase não configurado');
        setIsLoadingFazendas(false);
        return;
      }

      const { data, error } = await supabase
        .from('fazendas')
        .select('*, cliente:clientes(nome)')
        .order('nome');

      if (error) throw error;
      setFazendas(data || []);
    } catch (error) {
      console.error('Erro ao carregar fazendas:', error);
      toast.error('Erro ao carregar fazendas');
    } finally {
      setIsLoadingFazendas(false);
    }
  };

  const handleSaveCliente = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const clienteData = {
      nome: formData.get('nome') as string,
      cpf_cnpj: formData.get('cpf_cnpj') as string || null,
      email: formData.get('email') as string || null,
      telefone: formData.get('telefone') as string || null,
      cidade: formData.get('cidade') as string || null,
      estado: formData.get('estado') as string || null,
      ativo: true,
    };

    setIsSaving(true);
    try {
      if (editingCliente) {
        // Atualizar
        const { error } = await supabase
          .from('clientes')
          .update(clienteData)
          .eq('id', editingCliente.id);

        if (error) throw error;
        toast.success('Cliente atualizado com sucesso!');
      } else {
        // Criar
        const { error } = await supabase
          .from('clientes')
          .insert(clienteData);

        if (error) throw error;
        toast.success('Cliente criado com sucesso!');
      }

      loadClientes();
      setShowClienteModal(false);
      setEditingCliente(null);
    } catch (error) {
      console.error('Erro ao salvar cliente:', error);
      toast.error('Erro ao salvar cliente');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveFazenda = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const fazendaData = {
      cliente_id: formData.get('cliente_id') as string,
      nome: formData.get('nome') as string,
      area_total_ha: parseFloat(formData.get('area_total_ha') as string) || null,
      cidade: formData.get('cidade') as string || null,
      estado: formData.get('estado') as string || null,
      ativo: true,
    };

    setIsSaving(true);
    try {
      if (editingFazenda) {
        // Atualizar
        const { error } = await supabase
          .from('fazendas')
          .update(fazendaData)
          .eq('id', editingFazenda.id);

        if (error) throw error;
        toast.success('Fazenda atualizada com sucesso!');
      } else {
        // Criar
        const { error } = await supabase
          .from('fazendas')
          .insert(fazendaData);

        if (error) throw error;
        toast.success('Fazenda criada com sucesso!');
      }

      loadFazendas();
      setShowFazendaModal(false);
      setEditingFazenda(null);
    } catch (error) {
      console.error('Erro ao salvar fazenda:', error);
      toast.error('Erro ao salvar fazenda');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteCliente = async (cliente: Cliente) => {
    if (!confirm(`Deseja realmente excluir o cliente "${cliente.nome}"?`)) return;

    try {
      const { error } = await supabase
        .from('clientes')
        .delete()
        .eq('id', cliente.id);

      if (error) throw error;
      toast.success('Cliente excluído com sucesso!');
      loadClientes();
    } catch (error: any) {
      console.error('Erro ao excluir cliente:', error);
      if (error.code === '23503') {
        toast.error('Não é possível excluir: cliente possui fazendas vinculadas');
      } else {
        toast.error('Erro ao excluir cliente');
      }
    }
  };

  const handleDeleteFazenda = async (fazenda: Fazenda) => {
    if (!confirm(`Deseja realmente excluir a fazenda "${fazenda.nome}"?`)) return;

    try {
      const { error } = await supabase
        .from('fazendas')
        .delete()
        .eq('id', fazenda.id);

      if (error) throw error;
      toast.success('Fazenda excluída com sucesso!');
      loadFazendas();
    } catch (error: any) {
      console.error('Erro ao excluir fazenda:', error);
      if (error.code === '23503') {
        toast.error('Não é possível excluir: fazenda possui talhões vinculados');
      } else {
        toast.error('Erro ao excluir fazenda');
      }
    }
  };

  // Filtrar clientes
  const clientesFiltrados = clientes.filter(c =>
    c.nome.toLowerCase().includes(searchClientes.toLowerCase()) ||
    c.cidade?.toLowerCase().includes(searchClientes.toLowerCase()) ||
    c.cpf_cnpj?.includes(searchClientes)
  );

  // Filtrar fazendas
  const fazendasFiltradas = fazendas.filter(f => {
    const matchSearch = f.nome.toLowerCase().includes(searchFazendas.toLowerCase()) ||
      f.cidade?.toLowerCase().includes(searchFazendas.toLowerCase());
    const matchCliente = !filtroClienteId || f.cliente_id === filtroClienteId;
    return matchSearch && matchCliente;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
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
                <h1 className="text-2xl text-gray-900">
                  Gestão de Clientes
                </h1>
                <p className="text-sm text-gray-600">
                  Gerencie clientes e fazendas do sistema
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="clientes">
              <User className="h-4 w-4 mr-2" />
              Clientes ({clientes.length})
            </TabsTrigger>
            <TabsTrigger value="fazendas">
              <Building2 className="h-4 w-4 mr-2" />
              Fazendas ({fazendas.length})
            </TabsTrigger>
          </TabsList>

          {/* Tab Clientes */}
          <TabsContent value="clientes" className="space-y-4 mt-6">
            {/* Barra de Busca e Ações */}
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar clientes..."
                  value={searchClientes}
                  onChange={(e) => setSearchClientes(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button
                onClick={() => {
                  setEditingCliente(null);
                  setShowClienteModal(true);
                }}
                className="bg-[#0057FF] hover:bg-[#0046CC]"
              >
                <Plus className="h-4 w-4 mr-2" />
                Novo Cliente
              </Button>
            </div>

            {/* Lista de Clientes */}
            {isLoadingClientes ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-[#0057FF]" />
              </div>
            ) : clientesFiltrados.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <User className="h-12 w-12 text-gray-300 mb-3" />
                  <p className="text-gray-600">
                    {searchClientes ? 'Nenhum cliente encontrado' : 'Nenhum cliente cadastrado'}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {clientesFiltrados.map((cliente) => (
                  <Card key={cliente.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg text-gray-900">{cliente.nome}</h3>
                            {!cliente.ativo && <Badge variant="secondary">Inativo</Badge>}
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                            {cliente.cpf_cnpj && (
                              <div className="flex items-center gap-1">
                                <User className="h-3 w-3" />
                                {cliente.cpf_cnpj}
                              </div>
                            )}
                            {cliente.telefone && (
                              <div className="flex items-center gap-1">
                                <Phone className="h-3 w-3" />
                                {cliente.telefone}
                              </div>
                            )}
                            {cliente.email && (
                              <div className="flex items-center gap-1">
                                <Mail className="h-3 w-3" />
                                {cliente.email}
                              </div>
                            )}
                            {cliente.cidade && (
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {cliente.cidade}/{cliente.estado}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setEditingCliente(cliente);
                              setShowClienteModal(true);
                            }}
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteCliente(cliente)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Tab Fazendas */}
          <TabsContent value="fazendas" className="space-y-4 mt-6">
            {/* Barra de Busca e Ações */}
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar fazendas..."
                  value={searchFazendas}
                  onChange={(e) => setSearchFazendas(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filtroClienteId} onValueChange={setFiltroClienteId}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Todos os clientes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos os clientes</SelectItem>
                  {clientes.map(c => (
                    <SelectItem key={c.id} value={c.id}>{c.nome}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                onClick={() => {
                  setEditingFazenda(null);
                  setShowFazendaModal(true);
                }}
                className="bg-[#0057FF] hover:bg-[#0046CC]"
              >
                <Plus className="h-4 w-4 mr-2" />
                Nova Fazenda
              </Button>
            </div>

            {/* Lista de Fazendas */}
            {isLoadingFazendas ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-[#0057FF]" />
              </div>
            ) : fazendasFiltradas.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Building2 className="h-12 w-12 text-gray-300 mb-3" />
                  <p className="text-gray-600">
                    {searchFazendas || filtroClienteId ? 'Nenhuma fazenda encontrada' : 'Nenhuma fazenda cadastrada'}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {fazendasFiltradas.map((fazenda: any) => (
                  <Card key={fazenda.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg text-gray-900">{fazenda.nome}</h3>
                            {!fazenda.ativo && <Badge variant="secondary">Inativo</Badge>}
                          </div>
                          <div className="text-sm text-gray-600 mb-2">
                            <strong>Cliente:</strong> {fazenda.cliente?.nome}
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                            {fazenda.area_total_ha && (
                              <div>
                                <strong>Área:</strong> {fazenda.area_total_ha} ha
                              </div>
                            )}
                            {fazenda.cidade && (
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {fazenda.cidade}/{fazenda.estado}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setEditingFazenda(fazenda);
                              setShowFazendaModal(true);
                            }}
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteFazenda(fazenda)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Modal Cliente */}
      <Dialog open={showClienteModal} onOpenChange={setShowClienteModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingCliente ? 'Editar Cliente' : 'Novo Cliente'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSaveCliente}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome *</Label>
                <Input
                  id="nome"
                  name="nome"
                  required
                  defaultValue={editingCliente?.nome}
                  placeholder="Nome do cliente"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cpf_cnpj">CPF/CNPJ</Label>
                <Input
                  id="cpf_cnpj"
                  name="cpf_cnpj"
                  defaultValue={editingCliente?.cpf_cnpj}
                  placeholder="000.000.000-00"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={editingCliente?.email}
                  placeholder="email@exemplo.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone</Label>
                <Input
                  id="telefone"
                  name="telefone"
                  defaultValue={editingCliente?.telefone}
                  placeholder="(00) 00000-0000"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="cidade">Cidade</Label>
                  <Input
                    id="cidade"
                    name="cidade"
                    defaultValue={editingCliente?.cidade}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="estado">Estado</Label>
                  <Input
                    id="estado"
                    name="estado"
                    defaultValue={editingCliente?.estado}
                    placeholder="SP"
                    maxLength={2}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowClienteModal(false)}
                disabled={isSaving}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="bg-[#0057FF] hover:bg-[#0046CC]"
                disabled={isSaving}
              >
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Salvar'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Modal Fazenda */}
      <Dialog open={showFazendaModal} onOpenChange={setShowFazendaModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingFazenda ? 'Editar Fazenda' : 'Nova Fazenda'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSaveFazenda}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="cliente_id">Cliente *</Label>
                <Select
                  name="cliente_id"
                  required
                  defaultValue={editingFazenda?.cliente_id}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    {clientes.map(c => (
                      <SelectItem key={c.id} value={c.id}>{c.nome}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="nome">Nome da Fazenda *</Label>
                <Input
                  id="nome"
                  name="nome"
                  required
                  defaultValue={editingFazenda?.nome}
                  placeholder="Nome da fazenda"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="area_total_ha">Área Total (ha)</Label>
                <Input
                  id="area_total_ha"
                  name="area_total_ha"
                  type="number"
                  step="0.01"
                  defaultValue={editingFazenda?.area_total_ha}
                  placeholder="0.00"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="cidade">Cidade</Label>
                  <Input
                    id="cidade"
                    name="cidade"
                    defaultValue={editingFazenda?.cidade}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="estado">Estado</Label>
                  <Input
                    id="estado"
                    name="estado"
                    defaultValue={editingFazenda?.estado}
                    placeholder="SP"
                    maxLength={2}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowFazendaModal(false)}
                disabled={isSaving}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="bg-[#0057FF] hover:bg-[#0046CC]"
                disabled={isSaving}
              >
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Salvar'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default GestaoClientesPage;