/**
 * Tech Agency Backend - Servidor Principal
 * 
 * Este es el punto de entrada de la API RESTful para la agencia de soluciones tecnológicas.
 * Aquí configuramos Express, middleware, rutas y conexión a MongoDB.
 * 
 * Estructura modular:
 * - config/: Configuración de base de datos y servicios externos
 * - controllers/: Lógica de negocio para cada recurso
 * - middleware/: Middleware personalizado (auth, errorHandler, etc.)
 * - models/: Modelos de MongoDB
 * - routes/: Definición de rutas API
 * - services/: Servicios reutilizables (email, pagos, etc.)
 * - utils/: Utilidades y helpers
 */

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';

// Cargar variables de entorno
dotenv.config();

// Configuración de paths (para ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Importar configuración de base de datos
import connectDB, { checkDBHealth } from './config/database.js';

// Importar rutas - Agencia tecnológica
import serviceRoutes from './routes/serviceRoutes.js';
import portfolioRoutes from './routes/portfolioRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';

// Importar middleware de error handling
import { errorHandler } from './middleware/errorHandler.js';

// ================================
// 🚀 CONFIGURACIÓN DEL SERVIDOR
// ================================

const app = express();
const PORT = process.env.PORT || 5000;

// ================================
// ⚙️ MIDDLEWARE GLOBAL
// ================================

// Seguridad con Helmet
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https://res.cloudinary.com"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      connectSrc: ["'self'"]
    }
  }
}));

// CORS - Permitir conexiones desde el frontend
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:5173', 'http://localhost:3000'];
app.use(cors({
  origin: function(origin, callback) {
    // Permitir requests sin origin (como mobile apps o curl)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('No allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Compresión de respuestas
app.use(compression());

// Parsing de JSON y URL-encoded
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Cookie parser
app.use(cookieParser());

// ================================
// 🗄️ CONEXIÓN A BASE DE DATOS
// ================================

connectDB();

// ================================
// 📂 RUTAS DE LA API
// ================================

// Ruta de health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Tech Agency API - Funcionando correctamente',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    database: checkDBHealth() ? 'connected' : 'disconnected',
    version: '1.0.0'
  });
});

// ================================
// 📂 RUTAS DE LA API - AGENCIA TECNOLÓGICA
// ================================

// Rutas de servicios
app.use('/api/services', serviceRoutes);

// Rutas de portafolio/proyectos
app.use('/api/portfolio', portfolioRoutes);

// Rutas de contacto
app.use('/api/contact', contactRoutes);

// Rutas de autenticación
app.use('/api/auth', authRoutes);

// Rutas de usuarios
app.use('/api/users', userRoutes);

// ================================
// 🎯 RUTAS PARA EL FRONTEND (SPA)
// ================================

// Servir archivos estáticos del frontend en producción
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../frontend/dist')));
  
  // Todas las rutas no API deben servir el index.html del frontend (SPA)
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
  });
}

// ================================
// ❌ MANEJO DE ERRORES 404
// ================================

app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    error: 'Ruta no encontrada',
    path: req.originalUrl
  });
});

// ================================
// 🛡️ MANEJO GLOBAL DE ERRORES
// ================================

app.use(errorHandler);

// ================================
// 🚀 INICIAR SERVIDOR
// ================================

app.listen(PORT, () => {
  console.log('='.repeat(60));
  console.log('🚀 Tech Agency API - Servidor Iniciado');
  console.log('='.repeat(60));
  console.log(`📍 Puerto: ${PORT}`);
  console.log(`🌍 Entorno: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📊 Base de datos: ${checkDBHealth() ? '✅ Conectada' : '❌ Desconectada'}`);
  console.log(`🛡️  Seguridad: Helmet, CORS, Rate Limiting activados`);
  console.log('');
  console.log('📡 Endpoints disponibles:');
  console.log('');
  console.log('   🏥 Health:     http://localhost:' + PORT + '/api/health');
  console.log('');
  console.log('   🚀 Rutas de la Agencia:');
  console.log('   📋 Services:  http://localhost:' + PORT + '/api/services');
  console.log('   📁 Portfolio: http://localhost:' + PORT + '/api/portfolio');
  console.log('   📧 Contact:   http://localhost:' + PORT + '/api/contact');
  console.log('');
  console.log('⚡ Usa Ctrl+C para detener el servidor');
  console.log('='.repeat(60));
});

export default app;