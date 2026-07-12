import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
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

  if (loading) return <Spinner />

  if (orders.length === 0) {
    return(
      <div className='p-6'>
        <h1 className='text-3xl font-bold mb-4'>My Orders</h1>
        <p className='text-gray-400'>You haven't placed any orders yet.</p>
      </div>
    );
  }

  return (
    <div className='p-6'>
      <h1 className='text-3xl font-bold mb-6'>My Orders</h1>
      <div className='space-y-4'>
        {orders.map((order) => (
          <div key = {order._id} className='bg-gray-800 rounded-lg p-4'>
            <div className='flex justify-between items-center mb-2'>
              <span className='text-sm text-gray-400'>
                Order #{order._id.slice(-6).toUpperCase()}
              </span>
              <span className='text-sm bg-purple-600 px-2 py-1 rounded'>
                {order.status}
              </span>
            </div>
            <div className='space-y-1'>
              {order.items.map((item, i) => (
                <p key={i} className='text-sm'>
                  {item.name} - ₹{item.basePrice}
                </p>
              ))}
            </div>
            <p className='text-purple-400 font-bold mt-2'>Total: ₹{order.totalAmount}</p>
            <p className='text-xs text-gray-500 mt-1'>
              Placed on {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyOrders;