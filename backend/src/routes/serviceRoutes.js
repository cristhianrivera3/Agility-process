/**
 * Rutas para Servicios - API RESTful
 * Tech Agency - Soluciones Tecnológicas
 */

import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import {
  getServices,
  getServiceById,
  getServiceBySlug,
  createService,
  updateService,
  deleteService
} from '../controllers/serviceController.js';

const router = express.Router();

// Rutas públicas
router.get('/', getServices);
router.get('/slug/:slug', getServiceBySlug);
router.get('/:id', getServiceById);

// Rutas protegidas (admin)
router.post('/', protect, authorize('admin'), createService);
router.put('/:id', protect, authorize('admin'), updateService);
router.delete('/:id', protect, authorize('admin'), deleteService);

export default router;