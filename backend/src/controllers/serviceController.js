/**
 * Controlador de Servicios - Lógica de negocio centralizada
 * Tech Agency - Soluciones Tecnológicas
 */

import Service from '../models/Service.js';

/**
 * @desc    Obtener todos los servicios (público)
 * @route   GET /api/services
 * @access  Public
 */
export const getServices = async (req, res) => {
  try {
    const { category, featured, search, limit = 12, page = 1 } = req.query;

    let query = {};
    if (req.query.all === 'true') {
      // Admin puede ver todos (incluyendo no disponibles)
      query = {};
    } else {
      query.available = true;
    }

    if (category && category !== 'all') query.category = category;
    if (featured === 'true') query.featured = true;
    if (search) query.$text = { $search: search };

    const services = await Service.find(query)
      .sort({ order: 1, createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .select('-__v');

    const total = await Service.countDocuments(query);

    res.json({
      success: true,
      count: services.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: services
    });
  } catch (error) {
    console.error('Error en getServices:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener servicios',
      message: error.message
    });
  }
};

/**
 * @desc    Obtener servicio por ID
 * @route   GET /api/services/:id
 * @access  Public
 */
export const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        error: 'Servicio no encontrado'
      });
    }

    res.json({
      success: true,
      data: service
    });
  } catch (error) {
    console.error('Error en getServiceById:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener servicio',
      message: error.message
    });
  }
};

/**
 * @desc    Obtener servicio por slug
 * @route   GET /api/services/slug/:slug
 * @access  Public
 */
export const getServiceBySlug = async (req, res) => {
  try {
    const service = await Service.findOne({ slug: req.params.slug });

    if (!service) {
      return res.status(404).json({
        success: false,
        error: 'Servicio no encontrado'
      });
    }

    // Incrementar vistas
    if (typeof service.incrementViews === 'function') {
      await service.incrementViews();
    }

    res.json({
      success: true,
      data: service
    });
  } catch (error) {
    console.error('Error en getServiceBySlug:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener servicio',
      message: error.message
    });
  }
};

/**
 * @desc    Crear servicio
 * @route   POST /api/services
 * @access  Private (Admin)
 */
export const createService = async (req, res) => {
  try {
    const service = await Service.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Servicio creado exitosamente',
      data: service
    });
  } catch (error) {
    console.error('Error en createService:', error);

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: 'Ya existe un servicio con este slug'
      });
    }

    res.status(400).json({
      success: false,
      error: 'Error al crear servicio',
      message: error.message
    });
  }
};

/**
 * @desc    Actualizar servicio
 * @route   PUT /api/services/:id
 * @access  Private (Admin)
 */
export const updateService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!service) {
      return res.status(404).json({
        success: false,
        error: 'Servicio no encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Servicio actualizado exitosamente',
      data: service
    });
  } catch (error) {
    console.error('Error en updateService:', error);
    res.status(400).json({
      success: false,
      error: 'Error al actualizar servicio',
      message: error.message
    });
  }
};

/**
 * @desc    Eliminar servicio
 * @route   DELETE /api/services/:id
 * @access  Private (Admin)
 */
export const deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        error: 'Servicio no encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Servicio eliminado exitosamente',
      data: {}
    });
  } catch (error) {
    console.error('Error en deleteService:', error);
    res.status(500).json({
      success: false,
      error: 'Error al eliminar servicio',
      message: error.message
    });
  }
};