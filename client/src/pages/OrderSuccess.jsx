import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="p-6 text-center mt-20">
      <h1 className="text-4xl font-bold text-green-400 mb-4">Order Placed</h1>
      <p className="text-gray-400 mb-6">Thank you for you order.</p>
      <Link to="/" className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold">Continue Shopping</Link>
    </div>
  );
}

export default OrderSuccess