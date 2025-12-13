#!/usr/bin/env python3
"""
Script de Reorganização de Documentação - SoloForte
Fase P0: Mover 110+ arquivos .md para estrutura organizada
"""

import os
import shutil
from pathlib import Path
from typing import List, Dict

# Cores para output
class Colors:
    BLUE = '\033[94m'
    GREEN = '\033[92m'
    YELLOW = '\033[93m'
    RED = '\033[91m'
    BOLD = '\033[1m'
    END = '\033[0m'

def print_header(text: str):
    print(f"\n{Colors.BOLD}{Colors.BLUE}{text}{Colors.END}")

def print_success(text: str):
    print(f"{Colors.GREEN}✓ {text}{Colors.END}")

def print_info(text: str):
    print(f"  {text}")

def create_directories():
    """Cria estrutura de diretórios"""
    print_header("📁 Criando estrutura de diretórios...")
    
    dirs = [
        "docs/auditorias",
        "docs/guias",
        "docs/implementacoes",
        "docs/arquitetura",
        "docs/historico",
        "docs/decisoes"
    ]
    
    for dir_path in dirs:
        Path(dir_path).mkdir(parents=True, exist_ok=True)
    
    print_success("Estrutura criada!")

def move_files(patterns: List[str], destination: str, category: str) -> int:
    """Move arquivos que correspondem aos padrões para o destino"""
    moved_count = 0
    
    for pattern in patterns:
        for file in Path('.').glob(pattern):
            if file.is_file() and file.suffix == '.md':
                try:
                    dest_path = Path(destination) / file.name
                    if not dest_path.exists():
                        shutil.move(str(file), str(dest_path))
                        moved_count += 1
                except Exception as e:
                    print(f"{Colors.RED}Erro ao mover {file}: {e}{Colors.END}")
    
    return moved_count

def reorganize_docs():
    """Reorganiza toda a documentação"""
    
    print_header("🗂️  Reorganizando documentação do SoloForte...")
    
    # Criar estrutura
    create_directories()
    
    # Mapeamento de padrões para destinos
    moves = {
        "📊 AUDITORIAS": {
            "patterns": [
                "AUDITORIA_*.md",
                "INVENTARIO_*.md",
                "LEIA_PRIMEIRO_AUDITORIA.md",
                "SUMARIO_*.md"
            ],
            "destination": "docs/auditorias"
        },
        "📖 GUIAS": {
            "patterns": [
                "GUIA_*.md",
                "COMO_USAR.md",
                "INSTALL_*.md",
                "QUICK_*.md",
                "COMANDOS_*.md",
                "CHECKLIST_*.md",
                "NDVI_GUIDE.md",
                "INTERPRETACAO_*.md",
                "GEOLOCALIZACAO_*.md",
                "LIMITACOES_*.md",
                "API_SETUP.md",
                "SECURITY_*.md",
                "LIGHTHOUSE_*.md",
                "PINS_*.md",
                "DESIGN_CLEAN_*.md",
                "DASHBOARD_EXECUTIVO_*.md",
                "TELA_ENTRADA_*.md"
            ],
            "destination": "docs/guias"
        },
        "🔧 IMPLEMENTAÇÕES": {
            "patterns": [
                "IMPLEMENTACAO_*.md",
                "MELHORIAS_*.md",
                "OTIMIZACAO_*.md",
                "MOBILE_ONLY_*.md",
                "MAPAS_OFFLINE_*.md",
                "RADAR_CLIMA_*.md",
                "PROTOTIPO_COMPLETO.md",
                "CONFIRMACAO_*.md",
                "UNIFICACAO_*.md",
                "REORGANIZACAO_*.md",
                "SIMPLIFICACAO_*.md",
                "SISTEMA_VISUAL_*.md"
            ],
            "destination": "docs/implementacoes"
        },
        "🏗️  ARQUITETURA": {
            "patterns": [
                "ARQUITETURA_*.md",
                "ESTRUTURA_*.md",
                "STACK_*.md",
                "MAPEAMENTO_*.md",
                "SISTEMA_RASTREAMENTO_*.md",
                "DIAGRAMA_*.md",
                "EXEMPLO_CODIGO_*.md"
            ],
            "destination": "docs/arquitetura"
        },
        "🔨 HISTÓRICO": {
            "patterns": [
                "CORRECAO_*.md",
                "CORRECOES_*.md",
                "RESUMO_*.md",
                "FIX_*.md",
                "PATCHES_*.md",
                "CHANGELOG_*.md",
                "LIMPEZA_*.md",
                "TESTE_*.md",
                "TESTES_*.md",
                "VALIDACAO_*.md",
                "VERIFICACOES_*.md",
                "PROGRESSO_*.md",
                "STATUS_*.md",
                "OTIMIZACOES_CONCLUIDAS.md",
                "PERFORMANCE_DASHBOARD.md",
                "RESPOSTA_*.md",
                "SCRIPT_LIMPEZA_*.md"
            ],
            "destination": "docs/historico"
        },
        "💡 DECISÕES": {
            "patterns": [
                "DECISAO_*.md",
                "COMPARACAO_*.md",
                "ANALISE_*.md",
                "PRD_*.md",
                "EQUIVALENCIA_*.md",
                "SPRINT_*.md",
                "TIMELINE_*.md",
                "PROXIMOS_PASSOS_*.md"
            ],
            "destination": "docs/decisoes"
        }
    }
    
    # Executar movimentações
    total_moved = 0
    for category, config in moves.items():
        print_header(f"Movendo {category}...")
        moved = move_files(config["patterns"], config["destination"], category)
        print_info(f"✓ {moved} arquivos movidos para {config['destination']}/")
        total_moved += moved
    
    return total_moved

def verify_reorganization():
    """Verifica resultado da reorganização"""
    print_header("🔍 Verificando reorganização...")
    
    # Contar arquivos .md na raiz
    root_md_files = list(Path('.').glob('*.md'))
    root_count = len(root_md_files)
    
    # Contar arquivos em /docs
    docs_md_files = list(Path('docs').rglob('*.md'))
    docs_count = len(docs_md_files)
    
    print_header("📊 Estatísticas:")
    print_info(f"Arquivos .md na raiz: {root_count}")
    print_info(f"Arquivos .md em /docs: {docs_count}")
    print()
    
    if root_count <= 10:
        print_success(f"SUCESSO! Raiz está limpa (≤10 arquivos .md)")
    else:
        print(f"{Colors.YELLOW}⚠️  Ainda há {root_count} arquivos .md na raiz{Colors.END}")
        print("   Arquivos restantes:")
        for f in root_md_files:
            print(f"   - {f.name}")
    
    print()
    print_header("📂 Estrutura de /docs:")
    
    categories = [
        "auditorias",
        "guias",
        "implementacoes",
        "arquitetura",
        "historico",
        "decisoes"
    ]
    
    for cat in categories:
        count = len(list(Path(f'docs/{cat}').glob('*.md')))
        print_info(f"{cat.capitalize()}: {count} arquivos")
    
    return root_count, docs_count

def main():
    """Função principal"""
    print(f"{Colors.BOLD}{'='*60}{Colors.END}")
    print(f"{Colors.BOLD}REORGANIZAÇÃO DE DOCUMENTAÇÃO - SOLOFORTE{Colors.END}")
    print(f"{Colors.BOLD}Fase P0 (Estimativa: 5-10 minutos){Colors.END}")
    print(f"{Colors.BOLD}{'='*60}{Colors.END}")
    
    try:
        # Reorganizar
        total_moved = reorganize_docs()
        
        # Verificar
        root_count, docs_count = verify_reorganization()
        
        # Resumo final
        print()
        print_header("✅ Reorganização concluída!")
        print()
        print_info(f"Total de arquivos movidos: {total_moved}")
        print_info(f"Arquivos na raiz: {root_count}")
        print_info(f"Arquivos em /docs: {docs_count}")
        print()
        print_header("📖 Próximos passos:")
        print_info("1. Revisar: docs/README.md")
        print_info("2. Commit: git add docs/ && git commit -m 'docs: reorganize documentation'")
        print_info("3. Verificar que tudo funciona")
        print()
        print_success("🎉 Fase P0 completa!")
        
    except Exception as e:
        print(f"{Colors.RED}Erro durante reorganização: {e}{Colors.END}")
        return 1
    
    return 0

if __name__ == "__main__":
    exit(main())
