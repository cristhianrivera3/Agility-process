import { NavLink } from 'react-router-dom';
import './Navbar.css';

const navItems = [
  { name: 'Inicio', url: '/' },
  { name: 'Servicios', url: '/servicios' },
  { name: 'Nosotros', url: '/nosotros' },
  { name: 'Portafolio', url: '/portafolio' },
];

const Navbar = () => {
  return (
    <nav className="nav-menu">
      {navItems.map(item => (
        <NavLink
          key={item.name}
          to={item.url}
          className={({ isActive }) =>
            `nav-item ${isActive ? 'active' : ''}`
          }
        >
          {item.name}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navbar;
