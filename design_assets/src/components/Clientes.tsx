import { useState } from 'react';
import { Search, ChevronDown, ChevronRight, Phone, Mail, ArrowLeft } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';

interface ClientesProps {
  navigate: (path: string) => void;
}

// 🔥 VERSÃO VISUAL PURA - SEM LÓGICA, SEM LOOPS
// Dados mockados inline
const MOCK_CLIENTES = [
  {
    id: '1',
    nome: 'João Silva',
    email: 'joao@fazenda.com',
    whatsapp: '(64) 99999-1111',
    fazenda: 'Fazenda São João',
    cidade: 'Rio Verde',
    estado: 'GO',
    areas: 3,
    hectares: 450,
  },
  {
    id: '2',
    nome: 'Maria Santos',
    email: 'maria@fazenda.com',
    whatsapp: '(64) 99999-2222',
    fazenda: 'Fazenda Santa Maria',
    cidade: 'Jataí',
    estado: 'GO',
    areas: 5,
    hectares: 680,
  },
  {
    id: '3',
    nome: 'Pedro Oliveira',
    email: 'pedro@fazenda.com',
    whatsapp: '(64) 99999-3333',
    fazenda: 'Fazenda Boa Vista',
    cidade: 'Mineiros',
    estado: 'GO',
    areas: 2,
    hectares: 320,
  },
];

export default function Clientes({ navigate }: ClientesProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Filtro simples
  const clientesFiltrados = MOCK_CLIENTES.filter(c =>
    c.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.fazenda.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-screen w-screen bg-gray-50 overflow-y-auto scroll-smooth pb-32">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 sticky top-0 z-10">
        <div className="flex items-center gap-3 mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/dashboard')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-lg">Clientes</h1>
            <p className="text-sm text-gray-600">{clientesFiltrados.length} produtores</p>
          </div>
        </div>

        {/* Busca */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Buscar por nome ou fazenda..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Lista de clientes */}
      <div className="p-4 space-y-3 max-w-4xl mx-auto">
        {clientesFiltrados.map((cliente) => {
          const isExpanded = expandedId === cliente.id;
          const initials = cliente.nome
            .split(' ')
            .map(n => n[0])
            .join('')
            .substring(0, 2)
            .toUpperCase();

          return (
            <Card key={cliente.id} className="overflow-hidden">
              {/* Header do card */}
              <div
                className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => setExpandedId(isExpanded ? null : cliente.id)}
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 bg-[#0057FF]">
                    <AvatarFallback className="bg-[#0057FF] text-white">
                      {initials}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <h3 className="font-medium">{cliente.nome}</h3>
                    <p className="text-sm text-gray-600">{cliente.fazenda}</p>
                  </div>

                  <div className="text-right text-sm text-gray-600">
                    <div>{cliente.areas} áreas</div>
                    <div>{cliente.hectares} ha</div>
                  </div>

                  {isExpanded ? (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  )}
                </div>
              </div>

              {/* Detalhes expandidos */}
              {isExpanded && (
                <div className="border-t border-gray-200 p-4 bg-gray-50 space-y-3">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-gray-600">Cidade:</span>
                      <div className="font-medium">{cliente.cidade}/{cliente.estado}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Hectares:</span>
                      <div className="font-medium">{cliente.hectares} ha</div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Phone className="h-4 w-4 mr-2" />
                      {cliente.whatsapp}
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          );
        })}

        {clientesFiltrados.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            Nenhum cliente encontrado
          </div>
        )}
      </div>
    </div>
  );
}