-- ==========================================
-- SCHEMA DE TALHÕES - SOLOFORTE
-- ==========================================
-- Tabela para armazenar polígonos/talhões desenhados no mapa
-- com vínculo a clientes e fazendas

-- ===== TABELA DE CLIENTES =====
CREATE TABLE IF NOT EXISTS public.clientes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome text NOT NULL,
  cpf_cnpj text UNIQUE,
  email text,
  telefone text,
  endereco text,
  cidade text,
  estado text,
  cep text,
  ativo boolean DEFAULT true,
  data_criacao timestamptz DEFAULT now(),
  data_atualizacao timestamptz DEFAULT now()
);

-- ===== TABELA DE FAZENDAS =====
CREATE TABLE IF NOT EXISTS public.fazendas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cliente_id uuid REFERENCES public.clientes(id) ON DELETE CASCADE,
  nome text NOT NULL,
  area_total_ha numeric,
  localizacao text,
  cidade text,
  estado text,
  cep text,
  coordenadas jsonb, -- Centro da fazenda { lat, lng }
  ativo boolean DEFAULT true,
  data_criacao timestamptz DEFAULT now(),
  data_atualizacao timestamptz DEFAULT now()
);

-- ===== TABELA DE TALHÕES =====
CREATE TABLE IF NOT EXISTS public.talhoes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cliente_id uuid REFERENCES public.clientes(id) ON DELETE CASCADE,
  fazenda_id uuid REFERENCES public.fazendas(id) ON DELETE CASCADE,
  nome text NOT NULL,
  area_ha numeric NOT NULL,
  perimetro_m numeric NOT NULL,
  coordenadas jsonb NOT NULL,  -- GeoJSON Polygon com estrutura completa
  tipo text DEFAULT 'polygon', -- freehand, polygon, rectangle, circle
  cor text DEFAULT '#0057FF',
  observacoes text,
  cultura text, -- Ex: "Soja", "Milho", "Café"
  safra text, -- Ex: "2024/2025"
  ativo boolean DEFAULT true,
  data_criacao timestamptz DEFAULT now(),
  data_atualizacao timestamptz DEFAULT now()
);

-- ===== ÍNDICES =====
CREATE INDEX IF NOT EXISTS idx_fazendas_cliente_id ON public.fazendas(cliente_id);
CREATE INDEX IF NOT EXISTS idx_talhoes_cliente_id ON public.talhoes(cliente_id);
CREATE INDEX IF NOT EXISTS idx_talhoes_fazenda_id ON public.talhoes(fazenda_id);
CREATE INDEX IF NOT EXISTS idx_talhoes_ativo ON public.talhoes(ativo);

-- ===== RLS (Row Level Security) =====
ALTER TABLE public.clientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fazendas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.talhoes ENABLE ROW LEVEL SECURITY;

-- Políticas: permitir acesso autenticado (simplificado para MVP)
CREATE POLICY "Permitir leitura de clientes" ON public.clientes FOR SELECT USING (true);
CREATE POLICY "Permitir inserção de clientes" ON public.clientes FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir atualização de clientes" ON public.clientes FOR UPDATE USING (true);
CREATE POLICY "Permitir exclusão de clientes" ON public.clientes FOR DELETE USING (true);

CREATE POLICY "Permitir leitura de fazendas" ON public.fazendas FOR SELECT USING (true);
CREATE POLICY "Permitir inserção de fazendas" ON public.fazendas FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir atualização de fazendas" ON public.fazendas FOR UPDATE USING (true);
CREATE POLICY "Permitir exclusão de fazendas" ON public.fazendas FOR DELETE USING (true);

CREATE POLICY "Permitir leitura de talhões" ON public.talhoes FOR SELECT USING (true);
CREATE POLICY "Permitir inserção de talhões" ON public.talhoes FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir atualização de talhões" ON public.talhoes FOR UPDATE USING (true);
CREATE POLICY "Permitir exclusão de talhões" ON public.talhoes FOR DELETE USING (true);

-- ===== DADOS DE EXEMPLO =====
INSERT INTO public.clientes (id, nome, cpf_cnpj, email, telefone, cidade, estado) VALUES
  ('11111111-1111-1111-1111-111111111111', 'João Silva', '123.456.789-00', 'joao@email.com', '(11) 98765-4321', 'São Paulo', 'SP'),
  ('22222222-2222-2222-2222-222222222222', 'Maria Oliveira', '987.654.321-00', 'maria@email.com', '(19) 91234-5678', 'Campinas', 'SP'),
  ('33333333-3333-3333-3333-333333333333', 'Pedro Santos', '456.789.123-00', 'pedro@email.com', '(16) 99876-5432', 'Ribeirão Preto', 'SP')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.fazendas (id, cliente_id, nome, area_total_ha, cidade, estado, coordenadas) VALUES
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', 'Fazenda Esperança', 500, 'São Paulo', 'SP', '{"lat": -23.5505, "lng": -46.6333}'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '11111111-1111-1111-1111-111111111111', 'Fazenda Boa Vista', 350, 'Campinas', 'SP', '{"lat": -22.9099, "lng": -47.0626}'),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', '22222222-2222-2222-2222-222222222222', 'Sítio das Flores', 120, 'Campinas', 'SP', '{"lat": -22.8888, "lng": -47.0555}'),
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', '33333333-3333-3333-3333-333333333333', 'Fazenda Santa Clara', 800, 'Ribeirão Preto', 'SP', '{"lat": -21.1704, "lng": -47.8103}')
ON CONFLICT (id) DO NOTHING;

-- ===== COMENTÁRIOS =====
COMMENT ON TABLE public.clientes IS 'Tabela de clientes do sistema SoloForte';
COMMENT ON TABLE public.fazendas IS 'Tabela de fazendas vinculadas a clientes';
COMMENT ON TABLE public.talhoes IS 'Tabela de talhões/polígonos desenhados no mapa com vínculo a fazendas';
COMMENT ON COLUMN public.talhoes.coordenadas IS 'GeoJSON Polygon com array de pontos {lat, lng}';
COMMENT ON COLUMN public.talhoes.tipo IS 'Tipo de desenho: freehand, polygon, rectangle, circle';
