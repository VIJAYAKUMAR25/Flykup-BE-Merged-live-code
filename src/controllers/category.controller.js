import Category from '../models/category.model.js';

// Create a new category
export const createCategory = async (req, res) => {
  try {
    const { categoryName, subcategories } = req.body;

    const newCategory = new Category({
      categoryName,
      subcategories,
    });

    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create category', error });
  }
};

// Get all categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch categories', error });
  }
};

// Get a single category by ID
export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch category', error });
  }
};

// Update a category by ID
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedCategory = await Category.findByIdAndUpdate(
       id,
      updates,
      { new: true } // Return the updated document
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update category', error });
  }
};

// Delete a category by ID
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete category', error });
  }
};
