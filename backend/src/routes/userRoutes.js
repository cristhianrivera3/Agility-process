import express from 'express';
import {
  getUserProfile,
  updateUserProfile,
  getUserById,
  getUsers,
  deleteUser
} from '../controllers/userController.js';
import { protect, authorize } from '../middleware/auth.js';
import { validateUserUpdate, validateObjectId } from '../middleware/validation.js';
import { uploadSingle, handleUploadError, processUploadedFiles } from '../middleware/upload.js';

const router = express.Router();

// @desc    Get all users (admin)
// @route   GET /api/users
// @access  Private/Admin
router.get('/', protect, authorize('admin'), getUsers);

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
router.get('/profile', protect, getUserProfile);

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
router.put(
  '/profile',
  protect,
  uploadSingle('avatar'),
  handleUploadError,
  processUploadedFiles,
  validateUserUpdate,
  updateUserProfile
);

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Public
router.get('/:id', validateObjectId, getUserById);

// @desc    Delete user (admin)
// @route   DELETE /api/users/:id
// @access  Private/Admin
router.delete('/:id', protect, authorize('admin'), validateObjectId, deleteUser);

export default router;
