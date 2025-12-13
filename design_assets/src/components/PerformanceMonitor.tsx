import React, { useState, useEffect } from 'react';
import { Activity, Zap, TrendingUp, Clock, Eye, Gauge } from 'lucide-react';
import { Card } from './ui/card';

interface PerformanceMetrics {
  fcp: number | null; // First Contentful Paint
  lcp: number | null; // Largest Contentful Paint
  fid: number | null; // First Input Delay
  cls: number | null; // Cumulative Layout Shift
  ttfb: number | null; // Time to First Byte
  tti: number | null; // Time to Interactive
}

interface PerformanceScore {
  score: number;
  rating: 'good' | 'needs-improvement' | 'poor';
}

export const PerformanceMonitor: React.FC = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fcp: null,
    lcp: null,
    fid: null,
    cls: null,
    ttfb: null,
    tti: null,
  });
  const [isVisible, setIsVisible] = useState(false);
  const [resourceCount, setResourceCount] = useState(0);
  const [prefetchCount, setPrefetchCount] = useState(0);

  useEffect(() => {
    // Ctrl+Shift+M para toggle
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'M') {
        setIsVisible(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    // Performance Observer para Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'paint' && entry.name === 'first-contentful-paint') {
          setMetrics(prev => ({ ...prev, fcp: entry.startTime }));
        }
        if (entry.entryType === 'largest-contentful-paint') {
          setMetrics(prev => ({ ...prev, lcp: entry.startTime }));
        }
        if (entry.entryType === 'first-input') {
          const fidEntry = entry as PerformanceEventTiming;
          setMetrics(prev => ({ ...prev, fid: fidEntry.processingStart - fidEntry.startTime }));
        }
        if (entry.entryType === 'layout-shift' && !(entry as any).hadRecentInput) {
          setMetrics(prev => ({ ...prev, cls: (prev.cls || 0) + (entry as any).value }));
        }
      }
    });

    observer.observe({ entryTypes: ['paint', 'largest-contentful-paint', 'first-input', 'layout-shift'] });

    // Navigation Timing para TTFB e TTI
    const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigationEntry) {
      setMetrics(prev => ({
        ...prev,
        ttfb: navigationEntry.responseStart - navigationEntry.requestStart,
      }));
    }

    // Aproximação do TTI usando Performance API
    setTimeout(() => {
      const tti = performance.now();
      setMetrics(prev => ({ ...prev, tti }));
    }, 100);

    // Contar recursos carregados
    const resources = performance.getEntriesByType('resource');
    setResourceCount(resources.length);

    // Contar prefetch links
    const prefetchLinks = document.querySelectorAll('link[rel="prefetch"], link[rel="preload"]');
    setPrefetchCount(prefetchLinks.length);

    return () => observer.disconnect();
  }, [isVisible]);

  const getScore = (metric: keyof PerformanceMetrics, value: number | null): PerformanceScore => {
    if (value === null) return { score: 0, rating: 'poor' };

    const thresholds: Record<keyof PerformanceMetrics, [number, number]> = {
      fcp: [1800, 3000],
      lcp: [2500, 4000],
      fid: [100, 300],
      cls: [0.1, 0.25],
      ttfb: [800, 1800],
      tti: [3800, 7300],
    };

    const [good, needsImprovement] = thresholds[metric];
    
    if (value <= good) {
      return { score: 100, rating: 'good' };
    } else if (value <= needsImprovement) {
      return { score: 50, rating: 'needs-improvement' };
    } else {
      return { score: 0, rating: 'poor' };
    }
  };

  const formatMetric = (value: number | null, unit: string = 'ms'): string => {
    if (value === null) return '--';
    return `${value.toFixed(0)}${unit}`;
  };

  const getRatingColor = (rating: 'good' | 'needs-improvement' | 'poor'): string => {
    switch (rating) {
      case 'good': return 'text-green-500';
      case 'needs-improvement': return 'text-yellow-500';
      case 'poor': return 'text-red-500';
    }
  };

  const getRatingBg = (rating: 'good' | 'needs-improvement' | 'poor'): string => {
    switch (rating) {
      case 'good': return 'bg-green-500/10';
      case 'needs-improvement': return 'bg-yellow-500/10';
      case 'poor': return 'bg-red-500/10';
    }
  };

  const calculateOverallScore = (): number => {
    const scores = [
      getScore('fcp', metrics.fcp).score * 0.1,
      getScore('lcp', metrics.lcp).score * 0.25,
      getScore('fid', metrics.fid).score * 0.25,
      getScore('cls', metrics.cls).score * 0.25,
      getScore('ttfb', metrics.ttfb).score * 0.1,
      getScore('tti', metrics.tti).score * 0.05,
    ];
    return scores.reduce((a, b) => a + b, 0);
  };

  if (!isVisible) {
    return null;
  }

  const overallScore = calculateOverallScore();
  const overallRating: 'good' | 'needs-improvement' | 'poor' = 
    overallScore >= 90 ? 'good' : overallScore >= 50 ? 'needs-improvement' : 'poor';

  return (
    <div className="fixed bottom-4 right-4 z-50 w-[380px] max-h-[80vh] overflow-auto">
      <Card className="bg-white dark:bg-gray-900 shadow-2xl border-2 border-blue-500">
        <div className="p-4 space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Gauge className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold">Performance Monitor</h3>
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              ✕
            </button>
          </div>

          {/* Overall Score */}
          <div className={`p-4 rounded-lg ${getRatingBg(overallRating)}`}>
            <div className="text-center">
              <div className={`text-4xl ${getRatingColor(overallRating)}`}>
                {overallScore.toFixed(0)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Lighthouse Score (estimado)
              </div>
            </div>
          </div>

          {/* Core Web Vitals */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Core Web Vitals
            </h4>

            {/* LCP */}
            <MetricCard
              icon={<Eye className="w-4 h-4" />}
              label="LCP"
              value={formatMetric(metrics.lcp)}
              score={getScore('lcp', metrics.lcp)}
              description="Largest Contentful Paint"
            />

            {/* FID */}
            <MetricCard
              icon={<Zap className="w-4 h-4" />}
              label="FID"
              value={formatMetric(metrics.fid)}
              score={getScore('fid', metrics.fid)}
              description="First Input Delay"
            />

            {/* CLS */}
            <MetricCard
              icon={<Activity className="w-4 h-4" />}
              label="CLS"
              value={formatMetric(metrics.cls, '')}
              score={getScore('cls', metrics.cls)}
              description="Cumulative Layout Shift"
            />
          </div>

          {/* Other Metrics */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Outras Métricas
            </h4>

            {/* FCP */}
            <MetricCard
              icon={<Clock className="w-4 h-4" />}
              label="FCP"
              value={formatMetric(metrics.fcp)}
              score={getScore('fcp', metrics.fcp)}
              description="First Contentful Paint"
            />

            {/* TTFB */}
            <MetricCard
              icon={<TrendingUp className="w-4 h-4" />}
              label="TTFB"
              value={formatMetric(metrics.ttfb)}
              score={getScore('ttfb', metrics.ttfb)}
              description="Time to First Byte"
            />

            {/* TTI */}
            <MetricCard
              icon={<Zap className="w-4 h-4" />}
              label="TTI"
              value={formatMetric(metrics.tti)}
              score={getScore('tti', metrics.tti)}
              description="Time to Interactive"
            />
          </div>

          {/* Optimization Stats */}
          <div className="border-t pt-4 space-y-2">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Estatísticas de Otimização
            </h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="bg-blue-500/10 p-2 rounded">
                <div className="text-blue-600 dark:text-blue-400">
                  {prefetchCount}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Prefetch ativos
                </div>
              </div>
              <div className="bg-green-500/10 p-2 rounded">
                <div className="text-green-600 dark:text-green-400">
                  {resourceCount}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Recursos carregados
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-xs text-gray-500 dark:text-gray-400 text-center border-t pt-2">
            Pressione <kbd className="px-1 bg-gray-200 dark:bg-gray-700 rounded">Ctrl+Shift+M</kbd> para fechar
          </div>
        </div>
      </Card>
    </div>
  );
};

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  score: PerformanceScore;
  description: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ icon, label, value, score, description }) => {
  const getRatingColor = (rating: 'good' | 'needs-improvement' | 'poor'): string => {
    switch (rating) {
      case 'good': return 'text-green-500';
      case 'needs-improvement': return 'text-yellow-500';
      case 'poor': return 'text-red-500';
    }
  };

  const getRatingBg = (rating: 'good' | 'needs-improvement' | 'poor'): string => {
    switch (rating) {
      case 'good': return 'bg-green-500/10';
      case 'needs-improvement': return 'bg-yellow-500/10';
      case 'poor': return 'bg-red-500/10';
    }
  };

  return (
    <div className={`flex items-center justify-between p-2 rounded ${getRatingBg(score.rating)}`}>
      <div className="flex items-center gap-2">
        <div className={getRatingColor(score.rating)}>{icon}</div>
        <div>
          <div className="text-sm">{label}</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">{description}</div>
        </div>
      </div>
      <div className={`text-lg ${getRatingColor(score.rating)}`}>
        {value}
      </div>
    </div>
  );
};

export default PerformanceMonitor;
