import { useEffect, useState, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Check, ShoppingCart, RotateCcw } from 'lucide-react';
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
  const [added, setAdded] = useState(false);
  const [colors, setColors] = useState({});
  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, items.length]);

  const product = items.find((p) => p._id === id);
  if (loading) return <Spinner />;
  if (!product) return <p className="p-6 text-(--ink-dim)">Product not found</p>;

  const handleAddToCart = () => {
    dispatch(addToCart({
      productId: product._id,
      name: product.name,
      basePrice: product.basePrice,
      colors,
    }));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const ColorRow = ({ label, meshKey }) => (
    <div>
      <p className="text-sm text-(--ink-dim) mb-2 tracking-wide uppercase">{label}</p>
      <div className="flex gap-3 flex-wrap">
        {SWATCHES.map((color) => {
          const active = colors[meshKey] === color;
          return (
            <button
              key={`${meshKey}-${color}`}
              onClick={(e) => {
                setColors((prev) => ({ ...prev, [meshKey]: color }));
                gsap.fromTo(
                  e.currentTarget,
                  { scale: 1.3 },
                  { scale: 1, duration: 0.3, ease: 'back.out(3)' }
                );
              }}
              className="relative w-10 h-10 rounded-full transition-all duration-300 hover:scale-110"
              style={{
                backgroundColor: color,
                border: active ? '2px solid var(--accent)' : '2px solid var(--line)',
                boxShadow: active ? '0 0 0 3px rgba(200,255,61,0.2)' : 'none',
              }}
              aria-label={`${label} ${color}`}>
              {active && (
                <Check
                  size={16}
                  className="absolute inset-0 m-auto"
                  style={{ color: ['#FFFFFF', '#C9A227'].includes(color) ? '#0c0b0a' : '#fff' }}/>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="p-6 max-w-6xl mx-auto animate-fadeUp">
      <div className="mb-6">
        <h1 className="font-display text-4xl">{product.name}</h1>
        <p className="text-(--ink-dim) mt-2 max-w-xl">{product.description}</p>
        <span className="shoe-tag text-sm mt-3">₹{product.basePrice}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-8">
        <div className="card h-96 lg:h-[520px] relative overflow-hidden">
          <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 text-xs text-(--ink-dim) bg-(--bg)/60 backdrop-blur px-3 py-1.5 rounded-full">
            <RotateCcw size={12} /> Drag to rotate
          </div>
          <Canvas camera={{ position: [0, 1, 5], fov: 50 }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.8} />
              <directionalLight position={[5, 5, 5]} intensity={1} />
              <SneakerModel modelPath={product.modelPath} colors={colors} />
            </Suspense>
            <OrbitControls minDistance={2} maxDistance={10} autoRotate autoRotateSpeed={1.2} />
          </Canvas>
        </div>
        <div className="space-y-6">
          <div className="card p-6 space-y-6">
            <ColorRow label="Body Color" meshKey="rb1004_rb_r_0" />
            <ColorRow label="Sole Color" meshKey="rb1000_rb_r_0" />
          </div>

          <button
            onClick={handleAddToCart}
            className={added ? 'btn-primary w-full' : 'btn-primary w-full'}
            style={added ? { background: 'var(--accent)' } : undefined}>
            {added ? <><Check size={18} /> Added to Cart</> : <><ShoppingCart size={18} /> Add to Cart</>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Configurator;
