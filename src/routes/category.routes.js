import express from 'express';
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from '../controllers/category.controller.js';

const categoryRouter = express.Router();

// Route to create a new category
categoryRouter.post('/create', createCategory);

// Route to get all categories
categoryRouter.get('/get', getCategories);

// Route to get a specific category by ID
categoryRouter.get('/get/:id', getCategoryById);

// Route to update a specific category by ID
categoryRouter.put('/update/:id', updateCategory);

// Route to delete a specific category by ID
categoryRouter.delete('/delete/:id', deleteCategory);

export default categoryRouter;
