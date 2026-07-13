import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Package } from 'lucide-react';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="p-6 max-w-4xl mx-auto animate-fadeUp">
      <div className="flex items-center gap-3 mb-8">
        <LayoutDashboard className="text-(--accent)" size={28} />
        <h1 className="font-display text-4xl">DASHBOARD</h1>
      </div>
      <p className="text-(--ink-dim) mb-8">Welcome back{user?.name ? `, ${user.name}` : ''}. Here's your quick access.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Link to="/" className="card p-6 flex items-center gap-4">
          <ShoppingBag className="text-(--accent)" size={28} />
          <div>
            <h2 className="font-display text-xl">BROWSE SNEAKERS</h2>
            <p className="text-(--ink-dim) text-sm">Start a new customization</p>
          </div>
        </Link>
        <Link to="/my-orders" className="card p-6 flex items-center gap-4">
          <Package className="text-(--accent)" size={28} />
          <div>
            <h2 className="font-display text-xl">MY ORDERS</h2>
            <p className="text-(--ink-dim) text-sm">Track what you've built</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
