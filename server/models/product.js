import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name : {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  basePrice: {
    type: Number,
    required: true,
  },
  modelPath: {
    type: String,
    required: true,
  },
  customizableParts: [
    {
      partName: {
        type: String,
        required: true,
      },
      meshName: {
        type: String,
        required: true,
      },
      colorOptions: [
        {
          type: String,
        }
      ]
    }
  ]

}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

export default Product;