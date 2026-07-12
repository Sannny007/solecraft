import express from "express";
import Order from "../models/Order.js";
import protect from "../middleWare/authMiddleware.js";
import Router from "./authRoutes.js";

const router = express.Router();

// Create an Order
router.post('/', protect, async (req, res) => {
  try {
    const { items, totalAmount } = req.body;
    const order = await Order.create({
      user: req.user._id,
      items,
      totalAmount,
    });
    res.status(201).json(order);
  } catch ( error ) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});


// Get loggedin user's order
router.get('/my-orders', protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch ( error ) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});


export default router;
