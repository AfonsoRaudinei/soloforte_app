import { useState, useEffect, useCallback } from 'react';
import { projectId, publicAnonKey } from '../supabase/info';
import { logger } from '../logger';
import type { Produtor, APIResponse, Status } from '../../types';

interface ProdutorWithDetails extends Produtor {
  talhoes?: any[];
}

interface UseProdutoresReturn {
  produtores: ProdutorWithDetails[];
  loading: boolean;
  error: string | null;
  status: Status;
  refetch: () => Promise<void>;
  syncFromExternal: (apiUrl: string, apiToken?: string) => Promise<void>;
  createProdutor: (produtor: Partial<Produtor>) => Promise<Produtor | null>;
  updateProdutor: (produtorId: string, data: Partial<Produtor>) => Promise<Produtor | null>;
  deleteProdutor: (produtorId: string) => Promise<boolean>;
  getProdutor: (produtorId: string) => Promise<ProdutorWithDetails | null>;
}

export function useProdutores(accessToken: string | null): UseProdutoresReturn {
  const [produtores, setProdutores] = useState<ProdutorWithDetails[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>('idle');

  const fetchProdutores = useCallback(async () => {
    if (!accessToken) {
      logger.warn('useProdutores', 'Nenhum token de acesso fornecido');
      return;
    }

    setLoading(true);
    setStatus('loading');
    setError(null);

    try {
      const url = `https://${projectId}.supabase.co/functions/v1/make-server-b2d55462/produtores`;
      
      logger.info('useProdutores', 'Buscando produtores...');
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Erro ao buscar produtores: ${response.statusText}`);
      }

      const data: APIResponse<{ produtores: ProdutorWithDetails[] }> = await response.json();
      
      if (data.success && data.produtores) {
        setProdutores(data.produtores);
        setStatus('success');
        logger.success('useProdutores', `${data.produtores.length} produtores carregados`);
      } else {
        throw new Error(data.error || 'Erro ao buscar produtores');
      }
    } catch (err: any) {
      const errorMessage = err.message || 'Erro desconhecido ao buscar produtores';
      setError(errorMessage);
      setStatus('error');
      logger.error('useProdutores', errorMessage);
    } finally {
      setLoading(false);
    }
  }, [accessToken]);

  const syncFromExternal = useCallback(async (apiUrl: string, apiToken?: string) => {
    if (!accessToken) {
      logger.error('useProdutores', 'Nenhum token de acesso fornecido');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const url = `https://${projectId}.supabase.co/functions/v1/make-server-b2d55462/produtores/sync`;
      
      logger.info('useProdutores', `Sincronizando produtores de ${apiUrl}...`);
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ apiUrl, apiToken }),
      });

      if (!response.ok) {
        throw new Error(`Erro ao sincronizar produtores: ${response.statusText}`);
      }

      const data: APIResponse = await response.json();
      
      if (data.success) {
        logger.success('useProdutores', `${data.count || 0} produtores sincronizados`);
        await fetchProdutores(); // Recarregar lista
      } else {
        throw new Error(data.error || 'Erro ao sincronizar produtores');
      }
    } catch (err: any) {
      const errorMessage = err.message || 'Erro ao sincronizar produtores';
      setError(errorMessage);
      logger.error('useProdutores', errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [accessToken, fetchProdutores]);

  const createProdutor = useCallback(async (produtor: Partial<Produtor>): Promise<Produtor | null> => {
    if (!accessToken) {
      logger.error('useProdutores', 'Nenhum token de acesso fornecido');
      return null;
    }

    try {
      const url = `https://${projectId}.supabase.co/functions/v1/make-server-b2d55462/produtores`;
      
      logger.info('useProdutores', 'Criando produtor...');
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(produtor),
      });

      if (!response.ok) {
        throw new Error(`Erro ao criar produtor: ${response.statusText}`);
      }

      const data: APIResponse<{ produtor: Produtor }> = await response.json();
      
      if (data.success && data.produtor) {
        logger.success('useProdutores', 'Produtor criado com sucesso');
        await fetchProdutores(); // Recarregar lista
        return data.produtor;
      } else {
        throw new Error(data.error || 'Erro ao criar produtor');
      }
    } catch (err: any) {
      const errorMessage = err.message || 'Erro ao criar produtor';
      logger.error('useProdutores', errorMessage);
      throw err;
    }
  }, [accessToken, fetchProdutores]);

  const updateProdutor = useCallback(async (produtorId: string, produtorData: Partial<Produtor>): Promise<Produtor | null> => {
    if (!accessToken) {
      logger.error('useProdutores', 'Nenhum token de acesso fornecido');
      return null;
    }

    try {
      const url = `https://${projectId}.supabase.co/functions/v1/make-server-b2d55462/produtores/${produtorId}`;
      
      logger.info('useProdutores', `Atualizando produtor ${produtorId}...`);
      
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(produtorData),
      });

      if (!response.ok) {
        throw new Error(`Erro ao atualizar produtor: ${response.statusText}`);
      }

      const data: APIResponse<{ produtor: Produtor }> = await response.json();
      
      if (data.success && data.produtor) {
        logger.success('useProdutores', 'Produtor atualizado com sucesso');
        await fetchProdutores(); // Recarregar lista
        return data.produtor;
      } else {
        throw new Error(data.error || 'Erro ao atualizar produtor');
      }
    } catch (err: any) {
      const errorMessage = err.message || 'Erro ao atualizar produtor';
      logger.error('useProdutores', errorMessage);
      throw err;
    }
  }, [accessToken, fetchProdutores]);

  const deleteProdutor = useCallback(async (produtorId: string): Promise<boolean> => {
    if (!accessToken) {
      logger.error('useProdutores', 'Nenhum token de acesso fornecido');
      return false;
    }

    try {
      const url = `https://${projectId}.supabase.co/functions/v1/make-server-b2d55462/produtores/${produtorId}`;
      
      logger.info('useProdutores', `Deletando produtor ${produtorId}...`);
      
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Erro ao deletar produtor: ${response.statusText}`);
      }

      const data: APIResponse = await response.json();
      
      if (data.success) {
        logger.success('useProdutores', 'Produtor deletado com sucesso');
        await fetchProdutores(); // Recarregar lista
        return true;
      } else {
        throw new Error(data.error || 'Erro ao deletar produtor');
      }
    } catch (err: any) {
      const errorMessage = err.message || 'Erro ao deletar produtor';
      logger.error('useProdutores', errorMessage);
      throw err;
    }
  }, [accessToken, fetchProdutores]);

  const getProdutor = useCallback(async (produtorId: string): Promise<ProdutorWithDetails | null> => {
    if (!accessToken) {
      logger.error('useProdutores', 'Nenhum token de acesso fornecido');
      return null;
    }

    try {
      const url = `https://${projectId}.supabase.co/functions/v1/make-server-b2d55462/produtores/${produtorId}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Erro ao buscar produtor: ${response.statusText}`);
      }

      const data: APIResponse<{ produtor: ProdutorWithDetails }> = await response.json();
      
      if (data.success && data.produtor) {
        // Buscar talhões
        const talhoesUrl = `https://${projectId}.supabase.co/functions/v1/make-server-b2d55462/produtores/${produtorId}/talhoes`;
        const talhoesResponse = await fetch(talhoesUrl, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });
        
        if (talhoesResponse.ok) {
          const talhoesData = await talhoesResponse.json();
          data.produtor.talhoes = talhoesData.talhoes || [];
        }
        
        return data.produtor;
      } else {
        throw new Error(data.error || 'Erro ao buscar produtor');
      }
    } catch (err: any) {
      const errorMessage = err.message || 'Erro ao buscar produtor';
      logger.error('useProdutores', errorMessage);
      return null;
    }
  }, [accessToken]);

  useEffect(() => {
    if (accessToken) {
      fetchProdutores();
    }
  }, [accessToken, fetchProdutores]);

  return {
    produtores,
    loading,
    error,
    status,
    refetch: fetchProdutores,
    syncFromExternal,
    createProdutor,
    updateProdutor,
    deleteProdutor,
    getProdutor,
  };
}
