/**
 * Modelo de Portfolio - Proyectos realizados por la agencia
 * 
 * Este modelo representa los proyectos/portafolio que ha realizado la agencia,
 * para mostrar a potenciales clientes el trabajo y experiencia.
 */

import mongoose from 'mongoose';

const portfolioSchema = new mongoose.Schema({
  // Título del proyecto
  title: {
    type: String,
    required: [true, 'El título del proyecto es requerido'],
    trim: true,
    maxlength: [100, 'El título no puede exceder 100 caracteres']
  },
  
  // Slug para URLs amigables
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  
  // Descripción corta
  shortDescription: {
    type: String,
    required: [true, 'La descripción corta es requerida'],
    maxlength: [200, 'La descripción corta no puede exceder 200 caracteres']
  },
  
  // Descripción detallada del proyecto
  description: {
    type: String,
    required: [true, 'La descripción es requerida']
  },
  
  // Cliente (nombre de la empresa o persona)
  client: {
    type: String,
    trim: true
  },
  
  // Industria del cliente
  industry: {
    type: String,
    enum: [
      'tecnologia',
      'ecommerce',
      'salud',
      'educacion',
      'finanzas',
      'entretenimiento',
      'gobierno',
      'ONG',
      'startup',
      'otro'
    ]
  },
  
  // Tipo de proyecto
  projectType: {
    type: String,
    required: [true, 'El tipo de proyecto es requerido'],
    enum: [
      'desarrollo-web',
      'desarrollo-movil',
      'diseno-uiux',
      'ciberseguridad',
      'marketing',
      'consultoria',
      'cloud-devops',
      'data-analytics',
      'otro'
    ]
  },
  
  // Imagen destacada del proyecto
  featuredImage: {
    type: String,
    required: [true, 'La imagen destacada es requerida']
  },
  
  // Galería de imágenes del proyecto
  gallery: [{
    url: String,
    alt: String,
    caption: String
  }],
  
  // Tecnologías utilizadas
  technologies: [{
    type: String,
    trim: true
  }],
  
  // URL del proyecto en vivo (si está disponible públicamente)
  liveUrl: {
    type: String,
    trim: true
  },
  
  // URL del repositorio (si es open source)
  repoUrl: {
    type: String,
    trim: true
  },
  
  // Fecha de inicio del proyecto
  startDate: {
    type: Date
  },
  
  // Fecha de finalización del proyecto
  endDate: {
    type: Date
  },
  
  // Duración estimada
  duration: {
    type: String
  },
  
  // Presupuesto del proyecto (opcional, solo visible para admin)
  budget: {
    type: Number,
    min: [0, 'El presupuesto no puede ser negativo']
  },
  
  // ¿Mostrar en la página principal?
  featured: {
    type: Boolean,
    default: false
  },
  
  // ¿El proyecto está publicado?
  published: {
    type: Boolean,
    default: true
  },
  
  // Orden de aparición
  order: {
    type: Number,
    default: 0
  },
  
  // Testimonio del cliente (si lo hay)
  testimonial: {
    quote: {
      type: String,
      maxlength: [500, 'El testimonio no puede exceder 500 caracteres']
    },
    clientName: {
      type: String,
      trim: true
    },
    clientPosition: {
      type: String,
      trim: true
    },
    clientAvatar: {
      type: String
    }
  },
  
  // Resultados/métricas del proyecto
  results: [{
    metric: {
      type: String,
      trim: true
    },
    value: {
      type: String,
      trim: true
    },
    description: {
      type: String,
      trim: true
    }
  }],
  
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
    likes: {
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
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Índice para búsquedas
portfolioSchema.index({ title: 'text', description: 'text', technologies: 'text' });

// Middleware para generar slug
portfolioSchema.pre('save', function(next) {
  if (this.isModified('title') || !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  this.updatedAt = Date.now();
  next();
});

// Método para incrementar vistas
portfolioSchema.methods.incrementViews = async function() {
  this.stats.views += 1;
  await this.save();
  return this.stats.views;
};

export default mongoose.model('Portfolio', portfolioSchema);