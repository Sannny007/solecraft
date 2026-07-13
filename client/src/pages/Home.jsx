import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import { fetchProducts } from '../redux/slices/productSlice';
import Spinner from '../components/Spinner';

const Home = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.products);
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
      );
    }
  }, []);

  useEffect(() => {
    if (items.length > 0 && containerRef.current && !hasAnimated.current) {
      gsap.fromTo(
        containerRef.current.children,
        { opacity: 0, y: 50, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out' }
      );
      hasAnimated.current = true;
    }
  }, [items]);

  return (
    <div>
      {/* Hero */}
      <section className="relative px-6 pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden">
        <div ref={heroRef} className="max-w-4xl mx-auto text-center relative z-10">
          <span className="inline-block text-xs tracking-[0.3em] text-[var(--accent)] font-semibold mb-4">
            DESIGN &middot; CUSTOMIZE &middot; WEAR
          </span>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl leading-[0.95] mb-6">
            BUILD A SNEAKER<br />
            <span className="text-[var(--accent)]">THAT'S YOURS</span>
          </h1>
          <p className="text-[var(--ink-dim)] text-base md:text-lg max-w-xl mx-auto mb-8">
            Pick a silhouette, recolor every panel in real time on a live 3D model, and check out a pair built exactly to your spec.
          </p>
          <a href="#products" className="btn-primary text-sm">
            Start Customizing <ArrowRight size={16} />
          </a>
        </div>
        {/* Ambient floating accents */}
        <div className="absolute top-10 left-[8%] w-24 h-24 rounded-full bg-[var(--accent)]/10 blur-2xl animate-float" />
        <div className="absolute bottom-0 right-[10%] w-32 h-32 rounded-full bg-[var(--accent-2)]/10 blur-2xl animate-float" style={{ animationDelay: '1.2s' }} />
      </section>

      {/* Products */}
      <section id="products" className="px-6 pb-20 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-8 flex-wrap gap-3">
          <h2 className="font-display text-3xl md:text-4xl">CHOOSE YOUR CANVAS</h2>
          <span className="text-[var(--ink-dim)] text-sm">{items.length} models available</span>
        </div>

        {loading && <Spinner />}
        {error && <p className="text-[var(--accent-2)]">{error}</p>}

        <div ref={containerRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((product) => (
            <Link key={product._id} to={`/product/${product._id}`} className="card group block">
              <div className="card-glow-line" />
              <div className="relative h-52 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-transparent to-transparent" />
                <div className="absolute top-3 right-3 bg-[var(--accent)] text-[var(--accent-ink)] p-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <ShoppingCart size={16} />
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl mb-1 tracking-wide">{product.name}</h3>
                <p className="text-[var(--ink-dim)] text-sm mb-3 line-clamp-2">{product.description}</p>
                <span className="shoe-tag text-sm">₹{product.basePrice}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
