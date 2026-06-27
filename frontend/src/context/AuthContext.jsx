/**
 * AuthContext - Manejo de autenticación simplificado
 * 
 * Funciona completamente offline - si el backend no está disponible,
 * no rompe la aplicación.
 */

import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    return { user: null, token: null, loading: false, isAuthenticated: false, login: async () => ({ success: false, error: 'Contexto no disponible' }), logout: () => {} };
  }
  return context;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    let mounted = true;
    const timer = setTimeout(async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        try {
          const response = await authAPI.getProfile();
          if (!mounted) return;
          const userData = response.data?.data || response.data;
          setUser(userData);
          setIsAuthenticated(true);
        } catch (error) {
          if (!mounted) return;
          console.log('⚡ Backend no disponible - modo visual');
          setIsAuthenticated(false);
        }
      }
      if (mounted) setLoading(false);
    }, 200);

    return () => { mounted = false; clearTimeout(timer); };
  }, []);

  async function login(email, password) {
    try {
      const response = await authAPI.login({ email, password });
      const data = response.data?.data || response.data;
      const newToken = data.token || data;
      if (newToken) {
        localStorage.setItem('token', newToken);
        setToken(newToken);
        setIsAuthenticated(true);
        return { success: true };
      }
      return { success: false, error: 'No se recibió token' };
    } catch (error) {
      const message = error.response?.data?.error || error.error || 'Error al iniciar sesión';
      return { success: false, error: message };
    }
  }

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}