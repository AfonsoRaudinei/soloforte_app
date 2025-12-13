/**
 * ERROR BOUNDARY
 * Captura erros e evita que a aplicação quebre completamente
 */

import { Component, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from '../ui/button';
import { isDevelopment } from '../../utils/environment';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: any) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: any;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null
    };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo
    });

    // Callback opcional para logging externo
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };



  render() {
    if (this.state.hasError) {
      // Usar fallback customizado se fornecido
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Fallback padrão
      return (
        <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 p-6">
          <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center space-y-6">
            {/* Ícone de erro */}
            <div className="flex justify-center">
              <div className="h-20 w-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-10 w-10 text-red-600 dark:text-red-500" />
              </div>
            </div>

            {/* Título */}
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Oops! Algo deu errado
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Encontramos um erro inesperado. Nossa equipe foi notificada e estamos trabalhando para resolver.
              </p>
            </div>

            {/* Detalhes do erro (apenas em desenvolvimento) */}
            {isDevelopment() && this.state.error && (
              <details className="text-left">
                <summary className="cursor-pointer text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                  Detalhes técnicos
                </summary>
                <div className="mt-2 p-3 bg-gray-100 dark:bg-gray-900 rounded-lg text-xs font-mono text-red-600 dark:text-red-400 overflow-auto max-h-40">
                  <p className="font-bold mb-2">{this.state.error.name}: {this.state.error.message}</p>
                  <pre className="whitespace-pre-wrap">{this.state.error.stack}</pre>
                </div>
              </details>
            )}

            {/* Ações */}
            <div className="flex gap-3">
              <Button
                onClick={this.handleReload}
                className="flex-1 bg-[#0057FF] hover:bg-[#0046CC]"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Recarregar Página
              </Button>
              <Button
                onClick={this.handleGoHome}
                variant="outline"
                className="flex-1"
              >
                <Home className="h-4 w-4 mr-2" />
                Ir para Home
              </Button>
            </div>

            {/* Informações adicionais */}
            <p className="text-xs text-gray-500 dark:text-gray-600">
              Se o problema persistir, entre em contato com o suporte.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * HOC para envolver componentes com ErrorBoundary
 */
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode
) {
  return function WithErrorBoundaryComponent(props: P) {
    return (
      <ErrorBoundary fallback={fallback}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}
