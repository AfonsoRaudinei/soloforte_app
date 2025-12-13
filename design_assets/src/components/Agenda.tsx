import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon, Users, FileText } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import Watermark from './shared/Watermark';
import type { CalendarEvent, EventType } from '../types';

interface AgendaProps {
  navigate: (path: string) => void;
}

const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

export default function Agenda({ navigate }: AgendaProps) {
  const [currentWeek, setCurrentWeek] = useState(0);
  const [showNewEvent, setShowNewEvent] = useState(false);

  const eventos = [
    { dia: 1, tipo: '🌾', titulo: 'Visita Fazenda Silva', hora: '09:00' },
    { dia: 2, tipo: '🧠', titulo: 'Reunião Técnica', hora: '14:00' },
    { dia: 3, tipo: '📈', titulo: 'Relatório Mensal', hora: '10:00' },
    { dia: 5, tipo: '🌾', titulo: 'Inspeção Campo', hora: '08:00' },
  ];

  return (
    <div className="h-full w-full bg-gradient-to-br from-gray-50 to-gray-100 overflow-y-auto scroll-smooth pb-32 relative">
      <Watermark />
      <div className="max-w-2xl mx-auto p-6 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-gray-800">Agenda Semanal</h1>
            <p className="text-gray-500">Outubro 2025</p>
          </div>
          <Button
            onClick={() => setShowNewEvent(true)}
            className="h-12 w-12 bg-[#0057FF] hover:bg-[#0046CC] rounded-full shadow-lg"
          >
            <Plus className="h-6 w-6" />
          </Button>
        </div>

        {/* Controles de Semana */}
        <div className="flex items-center justify-between mb-6 bg-white rounded-2xl p-4 shadow-lg">
          <button
            onClick={() => setCurrentWeek(currentWeek - 1)}
            className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <ChevronLeft className="h-5 w-5 text-gray-700" />
          </button>

          <div className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-[#0057FF]" />
            <span className="text-gray-700">12 - 18 de Outubro</span>
          </div>

          <button
            onClick={() => setCurrentWeek(currentWeek + 1)}
            className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <ChevronRight className="h-5 w-5 text-gray-700" />
          </button>
        </div>

        {/* Filtros */}
        <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
          {['Todos', 'Visitas', 'Reuniões', 'Relatórios'].map((filtro) => (
            <button
              key={filtro}
              className="px-4 py-2 bg-white rounded-full shadow hover:shadow-md transition-shadow whitespace-nowrap text-gray-700"
            >
              {filtro}
            </button>
          ))}
        </div>

        {/* Grade de Dias */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {diasSemana.map((dia) => (
            <div key={dia} className="text-center text-gray-500 py-2">
              {dia}
            </div>
          ))}
        </div>

        {/* Eventos da Semana */}
        <div className="grid grid-cols-7 gap-2">
          {[...Array(7)].map((_, index) => {
            const eventosNoDia = eventos.filter((e) => e.dia === index);
            const isToday = index === 2; // Simular dia atual

            return (
              <div key={index} className="min-h-[120px]">
                <div
                  className={`bg-white rounded-xl p-2 shadow-sm ${
                    isToday ? 'ring-2 ring-[#0057FF]' : ''
                  }`}
                >
                  <div
                    className={`text-center mb-2 ${
                      isToday ? 'text-[#0057FF]' : 'text-gray-700'
                    }`}
                  >
                    {13 + index}
                  </div>

                  {eventosNoDia.map((evento, idx) => (
                    <div
                      key={idx}
                      className="bg-blue-50 rounded-lg p-2 mb-2 cursor-pointer hover:bg-blue-100 transition-colors"
                    >
                      <div className="text-xl mb-1">{evento.tipo}</div>
                      <div className="text-xs text-gray-600 truncate">
                        {evento.hora}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Lista de Eventos */}
        <div className="mt-8">
          <h2 className="mb-4 text-gray-800">Próximos Eventos</h2>
          <div className="space-y-3">
            {eventos.map((evento, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4"
              >
                <div className="text-3xl">{evento.tipo}</div>
                <div className="flex-1">
                  <div className="text-gray-800">{evento.titulo}</div>
                  <div className="text-gray-500">{evento.hora}</div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dialog Novo Evento */}
      <Dialog open={showNewEvent} onOpenChange={setShowNewEvent}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Novo Evento</DialogTitle>
            <DialogDescription>
              Adicione um novo evento à sua agenda como visitas, reuniões ou relatórios.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <label className="block mb-2 text-gray-700">Tipo de Evento</label>
              <Select>
                <SelectTrigger className="h-12 rounded-xl">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="visita">🌾 Visita</SelectItem>
                  <SelectItem value="reuniao">🧠 Reunião</SelectItem>
                  <SelectItem value="relatorio">📈 Relatório</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block mb-2 text-gray-700">Título</label>
              <Input className="h-12 rounded-xl" placeholder="Nome do evento" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block mb-2 text-gray-700">Data</label>
                <Input type="date" className="h-12 rounded-xl" />
              </div>
              <div>
                <label className="block mb-2 text-gray-700">Hora</label>
                <Input type="time" className="h-12 rounded-xl" />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-gray-700">Cliente</label>
              <Select>
                <SelectTrigger className="h-12 rounded-xl">
                  <SelectValue placeholder="Selecione o cliente" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="silva">Fazenda Silva</SelectItem>
                  <SelectItem value="santos">Fazenda Santos</SelectItem>
                  <SelectItem value="oliveira">Fazenda Oliveira</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button className="w-full h-12 bg-[#0057FF] hover:bg-[#0046CC] rounded-xl">
              Criar Evento
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}