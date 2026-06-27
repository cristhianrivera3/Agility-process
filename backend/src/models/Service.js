/**
 * Modelo de Servicio - Para la agencia de soluciones tecnológicas
 * 
 * Este modelo representa los servicios que ofrece la agencia:
 * - Desarrollo Web
 * - Ciberseguridad
 * - Marketing Digital
 * - Diseño UI/UX
 * - Consultoría TI
 * - etc.
 */

import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  // Nombre del servicio (ej: "Desarrollo Web", "Ciberseguridad")
  name: {
    type: String,
    required: [true, 'El nombre del servicio es requerido'],
    trim: true,
    maxlength: [100, 'El nombre no puede exceder 100 caracteres']
  },
  
  // Slug para URLs amigables (ej: "desarrollo-web")
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  
  // Descripción corta del servicio
  shortDescription: {
    type: String,
    required: [true, 'La descripción corta es requerida'],
    maxlength: [200, 'La descripción corta no puede exceder 200 caracteres']
  },
  
  // Descripción detallada (puede incluir HTML para formato)
  description: {
    type: String,
    required: [true, 'La descripción es requerida']
  },
  
  // Categoría del servicio
  category: {
    type: String,
    required: [true, 'La categoría es requerida'],
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
  
  // Precio base (puede ser por hora, por proyecto, etc.)
  price: {
    type: Number,
    required: [true, 'El precio es requerido'],
    min: [0, 'El precio no puede ser negativo']
  },
  
  // Tipo de precio
  priceType: {
    type: String,
    enum: ['hourly', 'fixed', 'monthly', 'custom'],
    default: 'custom'
  },
  
  // Imagen principal del servicio
  image: {
    type: String,
    default: '/images/service-placeholder.jpg'
  },
  
  // Galería de imágenes (para mostrar ejemplos)
  gallery: [{
    url: String,
    alt: String,
    caption: String
  }],
  
  // Características/beneficios del servicio (array de strings)
  features: [{
    type: String,
    trim: true
  }],
  
  // Tecnologías relacionadas (ej: React, Node.js, AWS, etc.)
  technologies: [{
    type: String,
    trim: true
  }],
  
  // Duración estimada del servicio
  duration: {
    type: String,
    default: 'Variable según proyecto'
  },
  
  // ¿El servicio está disponible para contratar?
  available: {
    type: Boolean,
    default: true
  },
  
  // Orden de aparición en listados
  order: {
    type: Number,
    default: 0
  },
  
  // ¿Mostrar en la página principal?
  featured: {
    type: Boolean,
    default: false
  },
  
  // SEO
  metaTitle: {
    type: String,
    maxlength: [60, 'El meta título no puede exceder 60 caracteres']
  },
  
  metaDescription: {
    type: String,
    maxlength: [160, 'El meta descripción no puede exceder 160 caracteres']
  },
  
  // Estadísticas
  stats: {
    views: {
      type: Number,
      default: 0
    },
    inquiries: {
      type: Number,
      default: 0
    },
    conversions: {
      type: Number,
      default: 0
    }
  },
  
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
  // Habilitar uso de virtuals en respuestas JSON
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Índice para búsquedas de texto
serviceSchema.index({ name: 'text', description: 'text', features: 'text' });

// Middleware para actualizar el slug automáticamente
serviceSchema.pre('save', function(next) {
  if (this.isModified('name') || !this.slug) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  this.updatedAt = Date.now();
  next();
});

// Método para incrementar vistas
serviceSchema.methods.incrementViews = async function() {
  this.stats.views += 1;
  await this.save();
  return this.stats.views;
};

// Método para incrementar inquiries (consultas)
serviceSchema.methods.incrementInquiries = async function() {
  this.stats.inquiries += 1;
  await this.save();
  return this.stats.inquiries;
};

export default mongoose.model('Service', serviceSchema);