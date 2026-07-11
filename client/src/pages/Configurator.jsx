import { useEffect, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { fetchProducts } from '../redux/slices/productSlice';
import SneakerModel from '../components/SneakerModel';

const Configurator = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.products);

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, items.length]);

  const product = items.find((p) => p._id === id);

  if (loading) return <p className="p-6">Loading....</p>;
  if (!product) return <p className="p-6">Product not found</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <p className="text-gray-400 mt-2">{product.description}</p>
      <p className="text-purple-400 font-bold mt-2">₹{product.basePrice}</p>

      <div className="mt-6 bg-gray-800 rounded-lg h-96">
        <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.8} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <SneakerModel modelPath={product.modelPath} />
          </Suspense>
          <OrbitControls />
        </Canvas>
      </div>
    </div>
  );
};

export default Configurator;