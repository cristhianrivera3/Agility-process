/**
 * Controlador de Portafolio - Lógica de negocio centralizada
 * Tech Agency - Soluciones Tecnológicas
 */

import Portfolio from '../models/Portfolio.js';

/**
 * @desc    Obtener todos los proyectos (público)
 * @route   GET /api/portfolio
 * @access  Public
 */
export const getProjects = async (req, res) => {
  try {
    const { projectType, featured, industry, search, limit = 12, page = 1 } = req.query;

    let query = {};
    if (req.query.all === 'true') {
      // Admin puede ver todos
      query = {};
    } else {
      query.published = true;
    }

    if (projectType && projectType !== 'all') query.projectType = projectType;
    if (featured === 'true') query.featured = true;
    if (industry) query.industry = industry;
    if (search) query.$text = { $search: search };

    const projects = await Portfolio.find(query)
      .sort({ order: 1, createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .select('-__v');

    const total = await Portfolio.countDocuments(query);

    res.json({
      success: true,
      count: projects.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: projects
    });
  } catch (error) {
    console.error('Error en getProjects:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener proyectos',
      message: error.message
    });
  }
};

/**
 * @desc    Obtener proyecto por ID
 * @route   GET /api/portfolio/:id
 * @access  Public
 */
export const getProjectById = async (req, res) => {
  try {
    const project = await Portfolio.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'Proyecto no encontrado'
      });
    }

    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    console.error('Error en getProjectById:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener proyecto',
      message: error.message
    });
  }
};

/**
 * @desc    Obtener proyecto por slug
 * @route   GET /api/portfolio/slug/:slug
 * @access  Public
 */
export const getProjectBySlug = async (req, res) => {
  try {
    const project = await Portfolio.findOne({ slug: req.params.slug });

    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'Proyecto no encontrado'
      });
    }

    // Incrementar vistas
    if (typeof project.incrementViews === 'function') {
      await project.incrementViews();
    }

    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    console.error('Error en getProjectBySlug:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener proyecto',
      message: error.message
    });
  }
};

/**
 * @desc    Crear proyecto
 * @route   POST /api/portfolio
 * @access  Private (Admin)
 */
export const createProject = async (req, res) => {
  try {
    const project = await Portfolio.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Proyecto creado exitosamente',
      data: project
    });
  } catch (error) {
    console.error('Error en createProject:', error);

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: 'Ya existe un proyecto con este slug'
      });
    }

    res.status(400).json({
      success: false,
      error: 'Error al crear proyecto',
      message: error.message
    });
  }
};

/**
 * @desc    Actualizar proyecto
 * @route   PUT /api/portfolio/:id
 * @access  Private (Admin)
 */
export const updateProject = async (req, res) => {
  try {
    const project = await Portfolio.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'Proyecto no encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Proyecto actualizado exitosamente',
      data: project
    });
  } catch (error) {
    console.error('Error en updateProject:', error);
    res.status(400).json({
      success: false,
      error: 'Error al actualizar proyecto',
      message: error.message
    });
  }
};

/**
 * @desc    Eliminar proyecto
 * @route   DELETE /api/portfolio/:id
 * @access  Private (Admin)
 */
export const deleteProject = async (req, res) => {
  try {
    const project = await Portfolio.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'Proyecto no encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Proyecto eliminado exitosamente',
      data: {}
    });
  } catch (error) {
    console.error('Error en deleteProject:', error);
    res.status(500).json({
      success: false,
      error: 'Error al eliminar proyecto',
      message: error.message
    });
  }
};