import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ShoppingCart } from 'lucide-react';
import { fetchProducts } from '../redux/slices/productSlice';
import Spinner from '../components/Spinner';

const Home = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.products);
  const containerRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (items.length > 0 && containerRef.current && !hasAnimated.current) {
      gsap.fromTo(
        containerRef.current.children,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out' }
      );
      hasAnimated.current = true;
    }
  }, [items]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Choose a product to customize</h1>
      {loading && <Spinner />}
      {error && <p className="text-red-400">{error}</p>}

      <div ref={containerRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((product) => (
          <Link
            key={product._id}
            to={`/product/${product._id}`}
            className="group relative bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 transition-colors"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 bg-purple-600 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <ShoppingCart size={18} />
              </div>
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-400 text-sm mt-1">{product.description}</p>
              <p className="text-purple-400 font-bold mt-2">₹{product.basePrice}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;