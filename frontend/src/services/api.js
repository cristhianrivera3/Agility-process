/**
 * Servicio API - Configuración de Axios para conectar con el backend
 * 
 * Este módulo configura axios con la URL base del backend y maneja
 * la inyección automática de tokens JWT en las solicitudes.
 */

import axios from 'axios';

// URL del backend - usa variable de entorno o fallback a localhost:5000
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Crear instancia de axios con configuración personalizada
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 segundos
});

// Interceptor para agregar token JWT a las solicitudes
api.interceptors.request.use(
  (config) => {
    // Obtener token del localStorage
    const token = localStorage.getItem('token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas y errores
api.interceptors.response.use(
  (response) => {
    // Si la respuesta es exitosa, retornar los datos
    return response;
  },
  (error) => {
    // Manejar errores comunes
    if (error.response) {
      // El servidor respondió con un código de estado fuera del rango 2xx
      const { status, data } = error.response;
      
      if (status === 401) {
        // Token inválido o expirado - cerrar sesión
        console.error('Error 401: No autorizado');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/admin';
      } else if (status === 403) {
        // Acceso prohibido
        console.error('Error 403: Acceso prohibido');
      } else if (status === 404) {
        // Recurso no encontrado
        console.error('Error 404: Recurso no encontrado');
      } else if (status === 500) {
        // Error del servidor
        console.error('Error 500: Error del servidor');
      }
      
      return Promise.reject(data || error);
    } else if (error.request) {
      // La solicitud se hizo pero no hubo respuesta
      console.error('Error de conexión: No se pudo conectar con el servidor');
      return Promise.reject({ error: 'Error de conexión. Intente nuevamente.' });
    } else {
      // Error al configurar la solicitud
      console.error('Error:', error.message);
      return Promise.reject(error);
    }
  }
);

// ================================
// SERVICIOS DE AUTENTICACIÓN
// ================================

export const authAPI = {
  // Registrar usuario
  register: (userData) => api.post('/auth/register', userData),
  
  // Iniciar sesión
  login: (credentials) => api.post('/auth/login', credentials),
  
  // Cerrar sesión
  logout: () => api.post('/auth/logout'),
  
  // Obtener perfil del usuario
  getProfile: () => api.get('/auth/profile'),
  
  // Actualizar perfil
  updateProfile: (userData) => api.put('/auth/profile', userData),
};

// ================================
// SERVICIOS DE SERVICIOS (AGENCIA)
// ================================

export const servicesAPI = {
  // Obtener todos los servicios
  getAll: (params = {}) => api.get('/services', { params }),
  
  // Obtener servicio por slug
  getBySlug: (slug) => api.get(`/services/${slug}`),
  
  // Crear servicio (admin)
  create: (serviceData) => api.post('/services', serviceData),
  
  // Actualizar servicio (admin)
  update: (id, serviceData) => api.put(`/services/${id}`, serviceData),
  
  // Eliminar servicio (admin)
  delete: (id) => api.delete(`/services/${id}`),
};

// ================================
// SERVICIOS DE PORTAFOLIO
// ================================

export const portfolioAPI = {
  // Obtener todos los proyectos
  getAll: (params = {}) => api.get('/portfolio', { params }),
  
  // Obtener proyecto por slug
  getBySlug: (slug) => api.get(`/portfolio/${slug}`),
  
  // Crear proyecto (admin)
  create: (projectData) => api.post('/portfolio', projectData),
  
  // Actualizar proyecto (admin)
  update: (id, projectData) => api.put(`/portfolio/${id}`, projectData),
  
  // Eliminar proyecto (admin)
  delete: (id) => api.delete(`/portfolio/${id}`),
};

// ================================
// SERVICIOS DE USUARIOS (ADMIN)
// ================================

export const usersAPI = {
  // Obtener todos los usuarios (admin)
  getAll: (params = {}) => api.get('/users', { params }),
  
  // Obtener usuario por ID (admin)
  getById: (id) => api.get(`/users/${id}`),
  
  // Actualizar usuario (admin)
  update: (id, userData) => api.put(`/users/${id}`, userData),
  
  // Eliminar usuario (admin)
  delete: (id) => api.delete(`/users/${id}`),
};

export default api;