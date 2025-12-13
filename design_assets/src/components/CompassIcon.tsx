import { memo } from 'react';

interface CompassIconProps {
  className?: string;
  rotation?: number;
}

export const CompassIcon = memo(function CompassIcon({ className = '', rotation = 0 }: CompassIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ transform: `rotate(${rotation}deg)`, transition: 'transform 0.3s ease' }}
    >
      {/* Círculo externo da bússola */}
      <circle
        cx="12"
        cy="12"
        r="10.5"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
      />
      
      {/* Círculo interno menor */}
      <circle
        cx="12"
        cy="12"
        r="8.5"
        stroke="currentColor"
        strokeWidth="0.4"
        fill="none"
        opacity="0.25"
      />
      
      {/* Agulha apontando para o Norte (vermelho) - MAIOR */}
      <path
        d="M12 3 L9 11 L12 12 L15 11 Z"
        fill="#EF4444"
        stroke="#DC2626"
        strokeWidth="0.8"
      />
      
      {/* Agulha apontando para o Sul (branco/cinza) - MAIOR */}
      <path
        d="M12 21 L9 13 L12 12 L15 13 Z"
        fill="#D1D5DB"
        stroke="#9CA3AF"
        strokeWidth="0.8"
      />
      
      {/* Ponto central - MAIOR */}
      <circle
        cx="12"
        cy="12"
        r="2"
        fill="currentColor"
      />
      
      {/* Letra N no topo - MUITO MAIOR */}
      <text
        x="12"
        y="5.5"
        fontSize="5.5"
        fontWeight="bold"
        fill="currentColor"
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        N
      </text>
      
      {/* Marcações cardeais - MAIORES */}
      <line x1="12" y1="1.5" x2="12" y2="2.5" stroke="currentColor" strokeWidth="1.5" />
      <line x1="22.5" y1="12" x2="21.5" y2="12" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
      <line x1="12" y1="22.5" x2="12" y2="21.5" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
      <line x1="1.5" y1="12" x2="2.5" y2="12" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
    </svg>
  );
});
