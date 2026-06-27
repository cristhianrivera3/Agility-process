/**
 * LiquidButton.jsx - Botón con efecto líquido/metálico adaptado a CSS puro
 * 
 * Conserva la esencia del código original (shadcn/ui) pero SIN dependencias pesadas
 * Efectos: brillo metálico, sombras 3D, hover glow azul, líquido con SVG filter
 */

import './LiquidButton.css';

const LiquidButton = ({
  children,
  variant = 'primary',
  size = 'default',
  href,
  onClick,
  className = '',
  ...props
}) => {
  const Tag = href ? 'a' : 'button';

  return (
    <Tag
      href={href}
      onClick={onClick}
      className={`liquid-btn liquid-${variant} liquid-${size} ${className}`}
      {...props}
    >
      {/* Capa de sombra 3D outer */}
      <div className="liquid-outer-shadow"></div>
      
      {/* Capa de brillo inner */}
      <div className="liquid-inner-glow"></div>
      
      {/* SVG filter para efecto líquido (glass morph) */}
      <svg className="liquid-svg-filter" aria-hidden="true">
        <defs>
          <filter id="liquid-glass" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="15" xChannelSelector="R" yChannelSelector="B" result="displaced" />
            <feGaussianBlur in="displaced" stdDeviation="2" result="blurred" />
            <feComposite in="blurred" in2="SourceGraphic" operator="in" />
          </filter>
        </defs>
      </svg>
      
      {/* Contenido */}
      <span className="liquid-content">
        {children}
        <span className="liquid-arrow">→</span>
      </span>
      
      {/* Shine effect overlay */}
      <div className="liquid-shine"></div>
    </Tag>
  );
};

export default LiquidButton;