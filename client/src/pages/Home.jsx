import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProducts } from "../redux/slices/productSlice";


const Home = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Choose a product to customize</h1>
      {loading && <p>Loading products.....</p>}
      {error && <p className="text-red-400">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((products) => (
          <Link
          key={products._id}
          to={`product/${products._id}`}
          className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition"
          >
            <h2 className="text-xl font-semibold">{products.name}</h2>
            <p className="text-gray-400 text-sm mt-1">{products.description}</p>
            <p className="text-purple-400 font-bold mt-2">₹{products.basePrice}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home