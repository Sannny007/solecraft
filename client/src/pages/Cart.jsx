import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeFromCart, clearCart } from "../redux/slices/cartSlice";



const Cart = () => {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const total = items.reduce((sum, items) => sum + items.basePrice, 0);

  if (items.length === 0) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
        <p className="text-gray-400">Your cart is empty.</p>
      </div>
    );
  }
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="bg-gray-800 rounded-lg p-4 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">{items.name}</h2>
              <p className="text-gray-400 text-sm mt-1">
                Body: <span style={{ color: item.colors?.['rb1004_rb_r_0'] || '#fff' }}>●</span>{' '}
                Sole: <span style={{ color: item.colors?.['rb1000_rb_r_0'] || '#fff' }}>●</span>
              </p>
              <p className="text-purple-400 font-bold mt-1">₹{item.basePrice}</p>
            </div>
            <button
              onClick={() => dispatch(removeFromCart(index))}
              className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm">Remove</button>
          </div>
        ))}
      </div>

      <div className="bg-gray-800 mt-6 rounded-lg p-4 flex justify-between items-center">
        <p className="text-xl font-bold">Total : ₹{total}</p>
        <button
          onClick={() => navigate('/checkout')}
          className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold">Proceed to Checkout</button>
      </div>
    </div>
  );
}

export default Cart