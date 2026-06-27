/**
 * Configuración de Conexión a MongoDB (Opcional)
 * 
 * Este módulo intenta conectar a MongoDB, pero si no está disponible,
 * la aplicación continuará funcionando con datos en memoria.
 * Esto permite desarrollo y pruebas sin necesidad de instalar MongoDB.
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Variable global para saber si MongoDB está disponible
let isMongoAvailable = false;

/**
 * Intenta conectar a MongoDB
 * Si falla, la app sigue funcionando sin base de datos
 */
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/tech-agency';
    
    const conn = await mongoose.connect(mongoURI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 3000, // Timeout rápido para no esperar mucho
      socketTimeoutMS: 45000,
    });
    
    isMongoAvailable = true;
    console.log(`✅ MongoDB Conectado: ${conn.connection.host}`);
    console.log(`📊 Base de datos: ${conn.connection.name}`);
    
    // Manejo de eventos de conexión
    mongoose.connection.on('error', (err) => {
      console.error('❌ Error de MongoDB:', err);
      isMongoAvailable = false;
    });
    
    mongoose.connection.on('disconnected', () => {
      console.log('⚠️  MongoDB desconectado');
      isMongoAvailable = false;
    });
    
    mongoose.connection.on('reconnected', () => {
      console.log('✅ MongoDB reconectado');
      isMongoAvailable = true;
    });
    
  } catch (error) {
    console.log('⚠️  MongoDB no disponible - usando datos en memoria');
    console.log('   Para instalar MongoDB: https://www.mongodb.com/try/download/community');
    console.log('   La app funcionará sin base de datos para desarrollo.');
    isMongoAvailable = false;
  }
};

/**
 * Verifica si MongoDB está disponible
 */
export const checkDBHealth = () => {
  return isMongoAvailable;
};

/**
 * Obtiene el estado de MongoDB para los modelos
 */
export const isMongoConnected = () => {
  return isMongoAvailable && mongoose.connection.readyState === 1;
};

export default connectDB;