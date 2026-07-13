import { Link } from "react-router-dom";
import { CheckCircle2 } from 'lucide-react';

const OrderSuccess = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center animate-fadeUp">
      <CheckCircle2 size={64} className="text-(--accent) mb-4 animate-float" />
      <h1 className="font-display text-4xl mb-3">ORDER PLACED</h1>
      <p className="text-(--ink-dim) mb-8">Thanks for the order — we're already lacing up.</p>
      <Link to="/" className="btn-primary text-sm">Continue Shopping</Link>
    </div>
  );
};

export default OrderSuccess;
