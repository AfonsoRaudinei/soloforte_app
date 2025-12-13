/**
 * 🎯 USE STORAGE HOOK
 * 
 * React Hook para usar Capacitor Storage com API similar ao useState.
 * Sincroniza automaticamente com storage nativo.
 * 
 * Substitui: localStorage + useState
 * Por: Capacitor Storage + useStorage
 * 
 * @example
 * // Antes:
 * const [user, setUser] = useState(() => {
 *   const saved = localStorage.getItem('user');
 *   return saved ? JSON.parse(saved) : null;
 * });
 * 
 * // Depois:
 * const [user, setUser] = useStorage('user', null);
 * 
 * @version 2.0.0
 */

import { useState, useEffect, useCallback } from 'react';
import { storage } from '../storage/capacitor-storage';
import { logger } from '../logger';

/**
 * ✅ USE STORAGE
 * 
 * Hook para storage persistente com API igual useState
 */
export function useStorage<T>(
  key: string,
  defaultValue: T
): [T, (value: T | ((prev: T) => T)) => Promise<void>, boolean] {
  const [value, setValue] = useState<T>(defaultValue);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  // ✅ Carregar valor inicial do storage
  useEffect(() => {
    const loadValue = async () => {
      try {
        const stored = await storage.get<T>(key);
        
        if (stored !== null) {
          setValue(stored);
          logger.log(`✅ [useStorage] Loaded ${key}:`, stored);
        } else {
          // Se não existe, salvar o default
          await storage.set(key, defaultValue);
          logger.log(`✅ [useStorage] Initialized ${key} with default:`, defaultValue);
        }
        
        setIsLoading(false);
        setIsInitialized(true);
      } catch (error) {
        logger.error(`❌ [useStorage] Error loading ${key}:`, error);
        setValue(defaultValue);
        setIsLoading(false);
        setIsInitialized(true);
      }
    };

    loadValue();
  }, [key]);

  // ✅ Setter que salva automaticamente no storage
  const setStoredValue = useCallback(
    async (newValue: T | ((prev: T) => T)) => {
      try {
        // Resolver valor se for função
        const valueToStore = newValue instanceof Function ? newValue(value) : newValue;
        
        // Atualizar estado local
        setValue(valueToStore);
        
        // Salvar no storage
        await storage.set(key, valueToStore);
        logger.log(`✅ [useStorage] Saved ${key}:`, valueToStore);
      } catch (error) {
        logger.error(`❌ [useStorage] Error saving ${key}:`, error);
      }
    },
    [key, value]
  );

  return [value, setStoredValue, isLoading];
}

/**
 * ✅ USE STORAGE OBJECT
 * 
 * Hook otimizado para objetos (merge parcial)
 */
export function useStorageObject<T extends Record<string, any>>(
  key: string,
  defaultValue: T
): [T, (updates: Partial<T>) => Promise<void>, boolean] {
  const [value, setValue, isLoading] = useStorage<T>(key, defaultValue);

  const updateValue = useCallback(
    async (updates: Partial<T>) => {
      await setValue((prev) => ({ ...prev, ...updates }));
    },
    [setValue]
  );

  return [value, updateValue, isLoading];
}

/**
 * ✅ USE STORAGE ARRAY
 * 
 * Hook otimizado para arrays (métodos helper)
 */
export function useStorageArray<T>(
  key: string,
  defaultValue: T[] = []
): {
  items: T[];
  add: (item: T) => Promise<void>;
  remove: (predicate: (item: T) => boolean) => Promise<void>;
  update: (predicate: (item: T) => boolean, updates: Partial<T>) => Promise<void>;
  clear: () => Promise<void>;
  set: (items: T[]) => Promise<void>;
  isLoading: boolean;
} {
  const [items, setItems, isLoading] = useStorage<T[]>(key, defaultValue);

  const add = useCallback(
    async (item: T) => {
      await setItems((prev) => [...prev, item]);
    },
    [setItems]
  );

  const remove = useCallback(
    async (predicate: (item: T) => boolean) => {
      await setItems((prev) => prev.filter((item) => !predicate(item)));
    },
    [setItems]
  );

  const update = useCallback(
    async (predicate: (item: T) => boolean, updates: Partial<T>) => {
      await setItems((prev) =>
        prev.map((item) =>
          predicate(item) ? { ...item, ...updates } : item
        )
      );
    },
    [setItems]
  );

  const clear = useCallback(async () => {
    await setItems([]);
  }, [setItems]);

  return {
    items,
    add,
    remove,
    update,
    clear,
    set: setItems,
    isLoading
  };
}

/**
 * 🔧 MIGRATION HELPER
 * 
 * Migrar dados do localStorage para useStorage
 */
export function useMigrateFromLocalStorage(
  migrations: Array<{ oldKey: string; newKey: string; transform?: (value: any) => any }>
) {
  useEffect(() => {
    const migrate = async () => {
      for (const { oldKey, newKey, transform } of migrations) {
        const oldValue = localStorage.getItem(oldKey);
        
        if (oldValue) {
          try {
            let parsed = JSON.parse(oldValue);
            
            if (transform) {
              parsed = transform(parsed);
            }
            
            await storage.set(newKey, parsed);
            localStorage.removeItem(oldKey);
            
            logger.log(`✅ [Migration] ${oldKey} → ${newKey}`);
          } catch (error) {
            logger.error(`❌ [Migration] Failed ${oldKey}:`, error);
          }
        }
      }
    };

    migrate();
  }, []);
}

export default useStorage;
