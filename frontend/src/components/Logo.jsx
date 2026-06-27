import { Link } from 'react-router-dom';

const Logo = () => (
  <Link to="/" className="site-logo">
    <svg
      width="180"
      height="40"
      viewBox="0 0 220 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Líneas de conexión entre nodos */}
      <line x1="18" y1="20" x2="50" y2="8" stroke="#00d4ff" strokeWidth="0.8" opacity="0.4" />
      <line x1="50" y1="8" x2="82" y2="20" stroke="#00d4ff" strokeWidth="0.8" opacity="0.4" />
      <line x1="18" y1="20" x2="82" y2="20" stroke="#00d4ff" strokeWidth="0.6" opacity="0.3" />
      <line x1="50" y1="8" x2="50" y2="32" stroke="#00d4ff" strokeWidth="0.6" opacity="0.2" />

      {/* Nodo izquierdo */}
      <circle cx="18" cy="20" r="4" fill="#00d4ff" opacity="0.3" />
      <circle cx="18" cy="20" r="2" fill="#00d4ff" />

      {/* Nodo centro */}
      <circle cx="50" cy="8" r="3.5" fill="#7B5CFF" opacity="0.3" />
      <circle cx="50" cy="8" r="1.8" fill="#7B5CFF" />

      {/* Nodo derecho */}
      <circle cx="82" cy="20" r="3.5" fill="#00d4ff" opacity="0.25" />
      <circle cx="82" cy="20" r="1.8" fill="#00d4ff" />

      {/* Nodo inferior */}
      <circle cx="50" cy="32" r="2.5" fill="#7B5CFF" opacity="0.2" />
      <circle cx="50" cy="32" r="1.3" fill="#7B5CFF" opacity="0.6" />

      {/* Texto AGILITY */}
      <text x="105" y="16" fill="white" fontSize="13" fontWeight="700" fontFamily="Poppins, sans-serif" letterSpacing="2.5">
        AGILITY
      </text>

      {/* Texto PROCESS */}
      <text x="105" y="32" fill="#00d4ff" fontSize="13" fontWeight="700" fontFamily="Poppins, sans-serif" letterSpacing="2.5">
        PROCESS
      </text>
    </svg>
  </Link>
);

export default Logo;
