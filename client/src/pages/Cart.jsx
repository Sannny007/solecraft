import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { removeFromCart } from "../redux/slices/cartSlice";

const Cart = () => {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const total = items.reduce((sum, item) => sum + item.basePrice, 0);

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center animate-fadeIn">
        <ShoppingBag size={48} className="text-[var(--ink-dim)] mb-4" />
        <h1 className="font-display text-3xl mb-2">YOUR CART IS EMPTY</h1>
        <p className="text-[var(--ink-dim)] mb-6">Go build something you'd actually wear.</p>
        <Link to="/" className="btn-primary text-sm">Browse Sneakers <ArrowRight size={16} /></Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="font-display text-4xl mb-8">YOUR CART</h1>

      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="card p-4 flex justify-between items-center animate-fadeUp" style={{ animationDelay: `${index * 0.08}s` }}>
            <div>
              <h2 className="font-display text-lg tracking-wide">{item.name}</h2>
              <p className="text-[var(--ink-dim)] text-sm mt-1 flex items-center gap-3">
                <span className="flex items-center gap-1">
                  Body
                  <span
                    className="inline-block w-3.5 h-3.5 rounded-full border border-[var(--line)]"
                    style={{ backgroundColor: item.colors?.['rb1004_rb_r_0'] || '#fff' }}
                  />
                </span>
                <span className="flex items-center gap-1">
                  Sole
                  <span
                    className="inline-block w-3.5 h-3.5 rounded-full border border-[var(--line)]"
                    style={{ backgroundColor: item.colors?.['rb1000_rb_r_0'] || '#fff' }}
                  />
                </span>
              </p>
              <span className="shoe-tag text-xs mt-2">₹{item.basePrice}</span>
            </div>
            <button
              onClick={() => dispatch(removeFromCart(index))}
              className="icon-btn text-[var(--ink-dim)] p-2"
              aria-label="Remove item"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>

      <div className="card mt-6 p-5 flex justify-between items-center flex-wrap gap-4">
        <p className="font-display text-2xl">TOTAL: ₹{total}</p>
        <button onClick={() => navigate('/checkout')} className="btn-primary text-sm">
          Proceed to Checkout <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default Cart;
