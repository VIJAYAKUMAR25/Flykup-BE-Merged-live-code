import mongoose from 'mongoose';

const SubcategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  minFee: {
    type: Number,
    required: true,
  },
  maxFee: {
    type: Number,
    required: true,
  },
});

const CategorySchema = new mongoose.Schema({
 
  categoryName: {
    type: String,
    required: true,
  },
  subcategories: [SubcategorySchema],
}, { timestamps: true });

const Category = mongoose.model('Category', CategorySchema);

export default Category;
