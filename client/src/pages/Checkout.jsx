import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CreditCard } from 'lucide-react';
import { clearCart } from '../redux/slices/cartSlice';
import { createOrder } from "../redux/api/orders";

const Checkout = () => {
  const { items } = useSelector((state) => state.cart);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState(null);

  const total = items.reduce((sum, item) => sum + item.basePrice, 0);

  const handlePlaceOrder = async () => {
    setPlacing(true);
    setError(null);

    try {
      const orderData = {
        items: items.map((item) => ({
          productId: item.productId,
          name: item.name,
          basePrice: item.basePrice,
          colors: item.colors,
        })),
        totalAmount: total,
      };
      await createOrder(orderData, token);
      dispatch(clearCart());
      navigate('/order-success');
    } catch (err) {
      setError('Failed to place order. Please try again.');
    } finally {
      setPlacing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="p-6 text-center py-24 animate-fadeIn">
        <h1 className="font-display text-3xl mb-4">CHECKOUT</h1>
        <p className="text-[var(--ink-dim)]">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="font-display text-4xl mb-8">CHECKOUT</h1>

      <div className="space-y-3 mb-6">
        {items.map((item, index) => (
          <div key={index} className="card p-4 flex justify-between items-center animate-fadeUp" style={{ animationDelay: `${index * 0.08}s` }}>
            <span className="font-medium">{item.name}</span>
            <span className="text-[var(--accent)] font-semibold">₹{item.basePrice}</span>
          </div>
        ))}
      </div>

      <div className="card p-5 mb-6">
        <p className="font-display text-2xl">TOTAL: ₹{total}</p>
      </div>

      {error && <p className="text-[var(--accent-2)] mb-4">{error}</p>}

      <button
        onClick={handlePlaceOrder}
        disabled={placing}
        className="btn-primary w-full sm:w-auto"
      >
        <CreditCard size={18} /> {placing ? 'Placing order...' : 'Place Order'}
      </button>
    </div>
  );
};

export default Checkout;
