import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../redux/slices/cartSlice';
import { createOrder } from "../redux/api/orders";

const Checkout = () => {
  const { items } = useSelector((state) => state.cart);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState(null);

  const total = items.reduce((sum, items) => sum + items.basePrice, 0);

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
    } catch ( error ) {
      setError('Failed to place Order. Please try again.', error);
    } finally {
      setPlacing(false);
    }
  };
  if (items.length === 0) {
    return(
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">Checkout</h1>
        <p className="text-gray-400">Your Cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      
      <div className="space-y-3 mb-6">
        {items.map((item, index) => (
          <div key={index} className="bg-gray-800 rounded-lg p-4 flex justify-between">
            <span>{item.name}</span>
            <span className="text-purple-400 font-semibold">₹{item.basePrice}</span>
          </div>
        ))}
      </div>

      <div className="bg-gray-800 rounded-lg p-4 mb-6">
        <p className="text-xl font-bold">Total: ₹{total}</p>
      </div>

      {error && <p className="text-red-400 mb-4">{error}</p>}

      <button
      onClick={handlePlaceOrder}
      disabled = {placing}
      className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold disabled:opacity-50">
        {placing ? 'Placing order....' : 'Place order'}
      </button>
    </div>
  );
}

export default Checkout