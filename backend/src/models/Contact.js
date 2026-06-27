/**
 * Modelo de Contacto - Formularios y consultas de clientes
 * 
 * Este modelo almacena los mensajes recibidos a través de los formularios
 * de contacto de la página web.
 */

import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  // Nombre de la persona que contacta
  name: {
    type: String,
    required: [true, 'El nombre es requerido'],
    trim: true,
    maxlength: [100, 'El nombre no puede exceder 100 caracteres']
  },
  
  // Email de contacto
  email: {
    type: String,
    required: [true, 'El email es requerido'],
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Por favor ingresa un email válido']
  },
  
  // Teléfono (opcional)
  phone: {
    type: String,
    trim: true,
    maxlength: [20, 'El teléfono no puede exceder 20 caracteres']
  },
  
  // Empresa (opcional)
  company: {
    type: String,
    trim: true,
    maxlength: [100, 'El nombre de la empresa no puede exceder 100 caracteres']
  },
  
  // Tipo de consulta
  subject: {
    type: String,
    required: [true, 'El asunto es requerido'],
    trim: true,
    maxlength: [200, 'El asunto no puede exceder 200 caracteres']
  },
  
  // Tipo de servicio de interés
  serviceType: {
    type: String,
    enum: [
      'desarrollo-web',
      'ciberseguridad',
      'marketing-digital',
      'diseno-uiux',
      'consultoria-ti',
      'desarrollo-movil',
      'cloud-devops',
      'data-analytics',
      'otro'
    ],
    default: 'otro'
  },
  
  // Mensaje principal
  message: {
    type: String,
    required: [true, 'El mensaje es requerido'],
    trim: true,
    maxlength: [2000, 'El mensaje no puede exceder 2000 caracteres']
  },
  
  // Presupuesto estimado del proyecto (opcional)
  budget: {
    type: Number,
    min: [0, 'El presupuesto no puede ser negativo']
  },
  
  // Rango de presupuesto
  budgetRange: {
    type: String,
    enum: [
      'menos-1000',
      '1000-5000',
      '5000-10000',
      '10000-25000',
      '25000-50000',
      'mas-50000',
      'no-seguro'
    ]
  },
  
  // ¿Cómo nos conoció?
  source: {
    type: String,
    enum: [
      'google',
      'linkedin',
      'instagram',
      'facebook',
      'twitter',
      'referido',
      'evento',
      'otro'
    ]
  },
  
  // Estado del mensaje
  status: {
    type: String,
    enum: ['nuevo', 'en-proceso', 'respondido', 'cerrado', 'spam'],
    default: 'nuevo'
  },
  
  // Prioridad
  priority: {
    type: String,
    enum: ['baja', 'normal', 'alta', 'urgente'],
    default: 'normal'
  },
  
  // IP del remitente (para seguridad)
  ipAddress: {
    type: String,
    trim: true
  },
  
  // User agent (para seguridad)
  userAgent: {
    type: String,
    trim: true
  },
  
  // ¿Se envió email de confirmación?
  confirmationEmailSent: {
    type: Boolean,
    default: false
  },
  
  // Respuesta interna (solo visible para admin)
  internalNotes: {
    type: String,
    trim: true,
    maxlength: [1000, 'Las notas internas no pueden exceder 1000 caracteres']
  },
  
  // Fecha de respuesta
  respondedAt: {
    type: Date
  },
  
  // Usuario que respondió (referencia a User model)
  respondedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  
  // Adjuntos (archivos subidos)
  attachments: [{
    name: String,
    url: String,
    size: Number,
    mimetype: String
  }],
  
  // Fechas
  createdAt: {
    type: Date,
    default: Date.now
  },
  
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Índice para búsquedas
contactSchema.index({ email: 1, status: 1, createdAt: -1 });
contactSchema.index({ name: 'text', message: 'text', subject: 'text' });

// Middleware para actualizar fecha
contactSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Método para marcar como respondido
contactSchema.methods.markAsResponded = async function(userId) {
  this.status = 'respondido';
  this.respondedAt = Date.now();
  if (userId) {
    this.respondedBy = userId;
  }
  await this.save();
  return this;
};

// Método para agregar nota interna
contactSchema.methods.addNote = async function(note) {
  this.internalNotes = this.internalNotes 
    ? `${this.internalNotes}\n\n${note}` 
    : note;
  await this.save();
  return this;
};

export default mongoose.model('Contact', contactSchema);