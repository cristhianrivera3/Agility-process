/**
 * Página de Login para Administración
 * 
 * Acceso restringido para administradores del sitio.
 * Los usuarios normales no necesitan registrarse - solo contacto.
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../context/AuthContext';
import './AdminLogin.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Si ya está autenticado, redirigir al dashboard
  if (isAuthenticated) {
    navigate('/admin/dashboard');
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);
    
    if (result.success) {
      navigate('/admin/dashboard');
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <>
      <Helmet>
        <title>Admin Login - Tech Agency</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="admin-login-page">
        <div className="login-container">
          <div className="login-header">
            <div className="login-logo">
              <span className="logo-text">Tech</span>
              <span className="logo-accent">Agency</span>
            </div>
            <h1>Panel de Administración</h1>
            <p>Ingresa tus credenciales para acceder al dashboard</p>
          </div>

          {error && (
            <div className="login-error">
              <span>⚠️</span>
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="login-field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@techagency.com"
                required
                autoFocus
              />
            </div>

            <div className="login-field">
              <label htmlFor="password">Contraseña</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-large login-btn"
              disabled={loading}
            >
              {loading ? 'Ingresando...' : 'Ingresar al Panel'}
            </button>
          </form>

          <div className="login-footer">
            <a href="/">← Volver al sitio</a>
          </div>
        </div>

        <div className="login-decoration">
          <div className="decoration-content">
            <span className="decoration-icon">🛡️</span>
            <h2>Administra tu sitio</h2>
            <p>Gestiona servicios, portafolio y más desde un solo lugar.</p>
            <div className="decoration-features">
              <div className="decoration-feature">
                <span>📋</span> Gestionar Servicios
              </div>
              <div className="decoration-feature">
                <span>📁</span> Administrar Portafolio
              </div>
              <div className="decoration-feature">
                <span>📊</span> Ver Estadísticas
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;