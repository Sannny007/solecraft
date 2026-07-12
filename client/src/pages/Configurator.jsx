import { useEffect, useState, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { fetchProducts } from '../redux/slices/productSlice';
import SneakerModel from '../components/SneakerModel';
import { addToCart } from '../redux/slices/cartSlice';
import Spinner from '../components/Spinner';
import gsap from 'gsap';

const SWATCHES = ['#8B3A3A', '#1A1A1A', '#FFFFFF', '#2E5C8A', '#C9A227'];

const Configurator = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.products);

  const [colors, setColors] = useState({});

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, items.length]);

  const product = items.find((p) => p._id === id);

  if (loading) return <Spinner />;
  if (!product) return <p className="p-6">Product not found</p>;

  const handleAddToCart = () => {
    dispatch(addToCart({
      productId: product._id,
      name: product.name,
      basePrice: product.basePrice,
      colors,
    }));
    alert('Added to cart!');
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <p className="text-gray-400 mt-2">{product.description}</p>
      <p className="text-purple-400 font-bold mt-2">₹{product.basePrice}</p>

      <div className="mt-6 bg-gray-800 rounded-lg h-96">
        <Canvas camera={{ position: [0, 1, 5], fov: 50 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.8} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <SneakerModel modelPath={product.modelPath} colors={colors} />
          </Suspense>
          <OrbitControls minDistance={2} maxDistance={10} />
        </Canvas>
      </div>

      <div className="mt-6 space-y-4">
        <div>
          <p className="text-sm text-gray-400 mb-2">Body Color</p>
          <div className="flex gap-3">
            {SWATCHES.map((color) => (
              <button
                key={`body-${color}`}
                onClick={(e) => {
                  setColors((prev) => ({ ...prev, 'rb1004_rb_r_0': color }));
                  gsap.fromTo(
                    e.currentTarget,
                    { scale: 1.3 },
                    { scale: 1, duration: 0.3, ease: 'back.out(3)' }
                  );
                }}
                className="w-10 h-10 rounded-full border-2 border-gray-600 hover:border-white transition-colors"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-400 mb-2">Sole Color</p>
          <div className="flex gap-3">
            {SWATCHES.map((color) => (
              <button
                key={`sole-${color}`}
                onClick={(e) => {
                  setColors((prev) => ({ ...prev, 'rb1000_rb_r_0': color }));
                  gsap.fromTo(
                    e.currentTarget,
                    { scale: 1.3 },
                    { scale: 1, duration: 0.3, ease: 'back.out(3)' }
                  );
                }}
                className="w-10 h-10 rounded-full border-2 border-gray-600 hover:border-white transition-colors"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          className="mt-4 bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Configurator;