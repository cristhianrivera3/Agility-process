/**
 * Rutas para Portafolio - API RESTful
 * Tech Agency - Soluciones Tecnológicas
 */

import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import {
  getProjects,
  getProjectById,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject
} from '../controllers/portfolioController.js';

const router = express.Router();

// Rutas públicas
router.get('/', getProjects);
router.get('/slug/:slug', getProjectBySlug);
router.get('/:id', getProjectById);

// Rutas protegidas (admin)
router.post('/', protect, authorize('admin'), createProject);
router.put('/:id', protect, authorize('admin'), updateProject);
router.delete('/:id', protect, authorize('admin'), deleteProject);

export default router;