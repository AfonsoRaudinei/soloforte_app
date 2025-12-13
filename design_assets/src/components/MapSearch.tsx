import { useState, useRef, useEffect } from 'react';
import { Search, X, MapPin, Loader2 } from 'lucide-react';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';

interface MapSearchProps {
  onLocationSelect: (lat: number, lng: number, name: string) => void;
  className?: string;
}

interface SearchResult {
  id: string;
  name: string;
  description: string;
  lat: number;
  lng: number;
  type: 'fazenda' | 'talhao' | 'cidade';
}

export default function MapSearch({ onLocationSelect, className = '' }: MapSearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mock data - em produção viria do Supabase
  const mockLocations: SearchResult[] = [
    {
      id: '1',
      name: 'Fazenda Santa Rita',
      description: '450 hectares - São Paulo, SP',
      lat: -23.5505,
      lng: -46.6333,
      type: 'fazenda'
    },
    {
      id: '2',
      name: 'Propriedade Vale Verde',
      description: '320 hectares - Campinas, SP',
      lat: -22.9099,
      lng: -47.0626,
      type: 'fazenda'
    },
    {
      id: '3',
      name: 'Talhão Norte',
      description: 'Fazenda Santa Rita - 85 ha',
      lat: -23.5525,
      lng: -46.6350,
      type: 'talhao'
    },
    {
      id: '4',
      name: 'Talhão Sul',
      description: 'Fazenda Santa Rita - 120 ha',
      lat: -23.5485,
      lng: -46.6315,
      type: 'talhao'
    },
    {
      id: '5',
      name: 'Ribeirão Preto',
      description: 'São Paulo, Brasil',
      lat: -21.1704,
      lng: -47.8103,
      type: 'cidade'
    },
    {
      id: '6',
      name: 'Piracicaba',
      description: 'São Paulo, Brasil',
      lat: -22.7253,
      lng: -47.6492,
      type: 'cidade'
    }
  ];

  // Fechar quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Buscar ao digitar
  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }

    setLoading(true);
    const timer = setTimeout(() => {
      // Filtrar resultados mock
      const filtered = mockLocations.filter(loc =>
        loc.name.toLowerCase().includes(query.toLowerCase()) ||
        loc.description.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelect = (result: SearchResult) => {
    onLocationSelect(result.lat, result.lng, result.name);
    setQuery('');
    setResults([]);
    setIsOpen(false);
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
    inputRef.current?.focus();
  };

  const getIcon = (type: SearchResult['type']) => {
    switch (type) {
      case 'fazenda':
        return '🏡';
      case 'talhao':
        return '🌾';
      case 'cidade':
        return '🏙️';
    }
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Search Input */}
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        
        <Input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder="Buscar fazenda, talhão ou cidade..."
          className="pl-10 pr-10 bg-white/95 backdrop-blur-sm border-gray-200 shadow-lg h-12"
        />

        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-4 w-4 text-gray-400" />
          </button>
        )}
      </div>

      {/* Results Dropdown */}
      {isOpen && (query.length >= 2 || results.length > 0) && (
        <div className="absolute top-14 left-0 right-0 bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden z-50 max-h-80">
          {loading ? (
            <div className="p-4 flex items-center justify-center gap-2 text-gray-500">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm">Buscando...</span>
            </div>
          ) : results.length > 0 ? (
            <ScrollArea className="max-h-80">
              <div className="py-2">
                {results.map((result) => (
                  <button
                    key={result.id}
                    onClick={() => handleSelect(result)}
                    className="w-full px-4 py-3 hover:bg-gray-50 transition-colors flex items-center gap-3 text-left"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-xl">
                      {getIcon(result.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-gray-900 truncate">
                        {result.name}
                      </div>
                      <div className="text-xs text-gray-500 truncate">
                        {result.description}
                      </div>
                    </div>
                    <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0" />
                  </button>
                ))}
              </div>
            </ScrollArea>
          ) : query.length >= 2 ? (
            <div className="p-8 text-center text-gray-500">
              <MapPin className="h-8 w-8 mx-auto mb-2 text-gray-300" />
              <p className="text-sm">Nenhum resultado encontrado</p>
              <p className="text-xs text-gray-400 mt-1">
                Tente buscar por outra fazenda ou cidade
              </p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
