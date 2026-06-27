/**
 * Controlador de Contacto - Lógica de negocio centralizada
 * Tech Agency - Soluciones Tecnológicas
 */

import Contact from '../models/Contact.js';
import { validationResult } from 'express-validator';

/**
 * @desc    Obtener todos los contactos (admin)
 * @route   GET /api/contact
 * @access  Private (Admin)
 */
export const getContacts = async (req, res) => {
  try {
    const { status, serviceType, priority, search, limit = 20, page = 1 } = req.query;

    let query = {};
    if (status) query.status = status;
    if (serviceType) query.serviceType = serviceType;
    if (priority) query.priority = priority;
    if (search) query.$text = { $search: search };

    const contacts = await Contact.find(query)
      .sort({ priority: -1, createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .select('-__v');

    const total = await Contact.countDocuments(query);

    res.json({
      success: true,
      count: contacts.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: contacts
    });
  } catch (error) {
    console.error('Error en getContacts:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener contactos',
      message: error.message
    });
  }
};

/**
 * @desc    Obtener estadísticas de contactos (admin)
 * @route   GET /api/contact/stats
 * @access  Private (Admin)
 */
export const getContactStats = async (req, res) => {
  try {
    const stats = await Contact.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    const totalContacts = await Contact.countDocuments();
    const newContacts = await Contact.countDocuments({ status: 'nuevo' });
    const recentContacts = await Contact.countDocuments({
      createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
    });

    // Stats por servicio
    const byService = await Contact.aggregate([
      { $group: { _id: '$serviceType', count: { $sum: 1 } } }
    ]);

    res.json({
      success: true,
      data: {
        byStatus: stats,
        byService,
        total: totalContacts,
        new: newContacts,
        recent: recentContacts
      }
    });
  } catch (error) {
    console.error('Error en getContactStats:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener estadísticas',
      message: error.message
    });
  }
};

/**
 * @desc    Obtener contacto por ID (admin)
 * @route   GET /api/contact/:id
 * @access  Private (Admin)
 */
export const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        error: 'Contacto no encontrado'
      });
    }

    res.json({
      success: true,
      data: contact
    });
  } catch (error) {
    console.error('Error en getContactById:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener contacto',
      message: error.message
    });
  }
};

/**
 * @desc    Crear mensaje de contacto (público)
 * @route   POST /api/contact
 * @access  Public
 */
export const createContact = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const contactData = {
      ...req.body,
      ipAddress: req.ip || req.connection?.remoteAddress,
      userAgent: req.get('User-Agent')
    };

    const contact = await Contact.create(contactData);

    res.status(201).json({
      success: true,
      message: '¡Mensaje enviado exitosamente! Te contactaremos pronto.',
      data: contact
    });
  } catch (error) {
    console.error('Error en createContact:', error);
    res.status(400).json({
      success: false,
      error: 'Error al enviar mensaje',
      message: error.message
    });
  }
};

/**
 * @desc    Actualizar contacto (admin)
 * @route   PUT /api/contact/:id
 * @access  Private (Admin)
 */
export const updateContact = async (req, res) => {
  try {
    const updateData = {
      ...req.body,
      respondedBy: req.user?.id,
      respondedAt: req.body.status === 'respondido' ? new Date() : undefined
    };

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        error: 'Contacto no encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Contacto actualizado exitosamente',
      data: contact
    });
  } catch (error) {
    console.error('Error en updateContact:', error);
    res.status(400).json({
      success: false,
      error: 'Error al actualizar contacto',
      message: error.message
    });
  }
};

/**
 * @desc    Eliminar contacto (admin)
 * @route   DELETE /api/contact/:id
 * @access  Private (Admin)
 */
export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        error: 'Contacto no encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Contacto eliminado exitosamente',
      data: {}
    });
  } catch (error) {
    console.error('Error en deleteContact:', error);
    res.status(500).json({
      success: false,
      error: 'Error al eliminar contacto',
      message: error.message
    });
  }
};