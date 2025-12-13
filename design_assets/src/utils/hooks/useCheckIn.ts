import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner@2.0.3';
import { fetchWithAuth } from '../supabase/client';
import { logger } from '../logger';

interface CheckInState {
  isActive: boolean;
  startTime: string | null;
  location: {
    lat: number;
    lng: number;
    address: string;
  } | null;
  elapsedSeconds: number;
}

interface CheckInData {
  id: string;
  startTime: string;
  endTime?: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  duration?: number; // minutos
  notes?: string;
}

const STORAGE_KEY = 'soloforte_checkin_state';

export function useCheckIn() {
  const [state, setState] = useState<CheckInState>({
    isActive: false,
    startTime: null,
    location: null,
    elapsedSeconds: 0
  });

  // Carregar estado salvo ao iniciar
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setState(parsed);
      } catch (error) {
        logger.error('Erro ao carregar estado de check-in:', error);
      }
    }
  }, []);

  // Timer para atualizar tempo decorrido
  useEffect(() => {
    if (!state.isActive || !state.startTime) return;

    const interval = setInterval(() => {
      const start = new Date(state.startTime!).getTime();
      const now = new Date().getTime();
      const elapsed = Math.floor((now - start) / 1000);
      
      setState(prev => ({ ...prev, elapsedSeconds: elapsed }));
    }, 1000);

    return () => clearInterval(interval);
  }, [state.isActive, state.startTime]);

  // Lembretes de hora em hora quando check-in ativo
  useEffect(() => {
    if (!state.isActive || !state.startTime) return;

    const checkHourlyReminder = () => {
      const start = new Date(state.startTime!).getTime();
      const now = new Date().getTime();
      const elapsed = Math.floor((now - start) / 1000);
      const minutes = Math.floor(elapsed / 60);
      
      // Notificar a cada hora (60, 120, 180, etc)
      if (minutes > 0 && minutes % 60 === 0) {
        const hours = Math.floor(minutes / 60);
        toast.info(`⏱️ Check-in ativo há ${hours}h`, {
          description: 'Não se esqueça de fazer o check-out ao finalizar!',
          duration: 5000,
        });
      }
    };

    // Verificar a cada minuto se completou uma hora
    const reminderInterval = setInterval(checkHourlyReminder, 60000); // 60 segundos

    return () => clearInterval(reminderInterval);
  }, [state.isActive, state.startTime, state.elapsedSeconds]);

  // Salvar estado no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  // Obter localização atual
  const getCurrentLocation = useCallback(async (): Promise<{ lat: number; lng: number; address: string }> => {
    return new Promise((resolve) => {
      if (!('geolocation' in navigator)) {
        resolve({
          lat: -23.5505,
          lng: -46.6333,
          address: 'São Paulo, SP (Demo)'
        });
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          resolve({
            lat: latitude,
            lng: longitude,
            address: `Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`
          });
        },
        () => {
          // Fallback para localização demo
          resolve({
            lat: -23.5505,
            lng: -46.6333,
            address: 'São Paulo, SP (Demo)'
          });
        },
        {
          enableHighAccuracy: false,
          timeout: 5000,
          maximumAge: 60000
        }
      );
    });
  }, []);

  // Fazer check-in
  const checkIn = useCallback(async () => {
    try {
      const location = await getCurrentLocation();
      const startTime = new Date().toISOString();

      setState({
        isActive: true,
        startTime,
        location,
        elapsedSeconds: 0
      });

      // Tentar salvar no backend
      try {
        await fetchWithAuth('/make-server-b2d55462/checkin', {
          method: 'POST',
          body: JSON.stringify({ location, startTime })
        });
      } catch (err) {
        logger.log('Backend indisponível, usando storage local');
      }

      toast.success('✅ Check-in realizado!', {
        description: location.address
      });
    } catch (error) {
      logger.error('Erro no check-in:', error);
      toast.error('Erro ao fazer check-in');
    }
  }, [getCurrentLocation]);

  // Fazer check-out e retornar dados da visita
  const checkOut = useCallback(async (): Promise<CheckInData | null> => {
    if (!state.isActive || !state.startTime || !state.location) {
      return null;
    }

    try {
      const endTime = new Date().toISOString();
      const duration = Math.round(state.elapsedSeconds / 60); // minutos

      const visitData: CheckInData = {
        id: Date.now().toString(),
        startTime: state.startTime,
        endTime,
        location: state.location,
        duration
      };

      // Limpar estado
      setState({
        isActive: false,
        startTime: null,
        location: null,
        elapsedSeconds: 0
      });

      // Tentar salvar no backend
      try {
        await fetchWithAuth('/make-server-b2d55462/checkout', {
          method: 'POST',
          body: JSON.stringify(visitData)
        });
      } catch (err) {
        logger.log('Backend indisponível, usando storage local');
      }

      toast.success(`✅ Check-out realizado!`, {
        description: `Duração: ${formatDuration(duration)}`
      });

      return visitData;
    } catch (error) {
      logger.error('Erro no check-out:', error);
      toast.error('Erro ao fazer check-out');
      return null;
    }
  }, [state]);

  // Toggle check-in/out
  const toggle = useCallback(async () => {
    if (state.isActive) {
      return await checkOut();
    } else {
      await checkIn();
      return null;
    }
  }, [state.isActive, checkIn, checkOut]);

  // Formatar duração
  const formatTime = useCallback((seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  return {
    isActive: state.isActive,
    startTime: state.startTime,
    location: state.location,
    elapsedSeconds: state.elapsedSeconds,
    formattedTime: formatTime(state.elapsedSeconds),
    checkIn,
    checkOut,
    toggle
  };
}

function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours > 0) {
    return `${hours}h ${mins}min`;
  }
  return `${mins}min`;
}
