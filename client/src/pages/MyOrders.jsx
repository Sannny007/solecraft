import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Package } from 'lucide-react';
import { getMyOrders } from '../redux/api/orders';
import Spinner from '../components/Spinner';

const MyOrders = () => {
  const { token } = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getMyOrders(token);
        setOrders(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [token]);

  if (loading) return <Spinner />;

  if (orders.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center animate-fadeIn">
        <Package size={48} className="text-(--ink-dim) mb-4" />
        <h1 className="font-display text-3xl mb-2">MY ORDERS</h1>
        <p className="text-(--ink-dim)">You haven't placed any orders yet.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="font-display text-4xl mb-8">MY ORDERS</h1>
      <div className="space-y-4">
        {orders.map((order, i) => (
          <div key={order._id} className="card p-5 animate-fadeUp" style={{ animationDelay: `${i * 0.08}s` }}>
            <div className="flex justify-between items-center mb-3 flex-wrap gap-2">
              <span className="text-sm text-(--ink-dim) tracking-wide">
                ORDER #{order._id.slice(-6).toUpperCase()}
              </span>
              <span className="text-xs font-semibold bg-(--accent) text-(--accent-ink) px-3 py-1 rounded-full uppercase tracking-wide">
                {order.status}
              </span>
            </div>
            <div className="space-y-1 mb-2">
              {order.items.map((item, idx) => (
                <p key={idx} className="text-sm text-(--ink-dim)">
                  {item.name} &mdash; ₹{item.basePrice}
                </p>
              ))}
            </div>
            <span className="shoe-tag text-xs">Total ₹{order.totalAmount}</span>
            <p className="text-xs text-(--ink-dim) mt-3">
              Placed on {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
