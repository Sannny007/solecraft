import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true },

  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      },
      name: String,
      basePrice: Number,
      colors: Object,
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: 'placed',
  },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
export default Order;