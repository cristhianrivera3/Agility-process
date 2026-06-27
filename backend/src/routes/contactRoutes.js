/**
 * Rutas para Contacto - API RESTful
 * Tech Agency - Soluciones Tecnológicas
 */

import express from 'express';
import { body } from 'express-validator';
import { protect, authorize } from '../middleware/auth.js';
import {
  getContacts,
  getContactStats,
  getContactById,
  createContact,
  updateContact,
  deleteContact
} from '../controllers/contactController.js';

const router = express.Router();

// Estadísticas (debe ir antes de /:id para evitar conflictos)
router.get('/stats', protect, authorize('admin'), getContactStats);

// Rutas públicas
router.post('/', [
  body('name').trim().notEmpty().withMessage('El nombre es requerido'),
  body('email').isEmail().normalizeEmail().withMessage('Email inválido'),
  body('phone').trim().notEmpty().withMessage('El teléfono es requerido'),
  body('subject').trim().notEmpty().withMessage('El asunto es requerido'),
  body('message').trim().isLength({ min: 10, max: 2000 }).withMessage('El mensaje debe tener entre 10 y 2000 caracteres')
], createContact);

// Rutas protegidas (admin)
router.get('/', protect, authorize('admin'), getContacts);
router.get('/:id', protect, authorize('admin'), getContactById);
router.put('/:id', protect, authorize('admin'), updateContact);
router.delete('/:id', protect, authorize('admin'), deleteContact);

export default router;