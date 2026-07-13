import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Menu, X, ShoppingBag, Package, LogOut } from 'lucide-react';
import { logout } from "../redux/slices/authSlice";

const Navbar = () => {
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
    setMenuOpen(false);
  };

  const closeMenu = () => setMenuOpen(false);

  const linkClass = "relative hover:text-[var(--accent)] transition-all duration-300 hover:-translate-y-0.5 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[var(--accent)] after:transition-all after:duration-300 hover:after:w-full";

  return (
    <nav className="bg-(--bg-alt)/80 backdrop-blur-md border-b border-(--line) px-6 py-4 sticky top-0 z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="font-display text-2xl tracking-wide text-(--accent) transition-transform duration-300 hover:scale-105 inline-block"
          onClick={closeMenu}
        >
          SOLE<span className="text-(--ink)">CRAFT</span>
        </Link>

        <div className="hidden md:flex gap-6 items-center">
          <Link to="/" className={linkClass}>Home</Link>
          <Link to="/cart" className={linkClass}>
            <ShoppingBag size={18} className="inline mr-1 -mt-0.5" />Cart
          </Link>
          {token ? (
            <>
              <Link to="/my-orders" className={linkClass}>
                <Package size={18} className="inline mr-1 -mt-0.5" />My Orders
              </Link>
              <span className="text-sm text-(--ink-dim)">Hi, {user?.name}</span>
              <button onClick={handleLogout} className="btn-danger px-4 py-2 text-sm flex items-center gap-1.5">
                <LogOut size={15} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={linkClass}>Login</Link>
              <Link to="/register" className="btn-primary px-4 py-2 text-sm">Register</Link>
            </>
          )}
        </div>

        <button className="md:hidden icon-btn" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 pb-2 animate-fadeUp">
          <Link to="/" className={linkClass} onClick={closeMenu}>Home</Link>
          <Link to="/cart" className={linkClass} onClick={closeMenu}>Cart</Link>
          {token ? (
            <>
              <Link to="/my-orders" className={linkClass} onClick={closeMenu}>My Orders</Link>
              <span className="text-sm text-(--ink-dim)">Hi, {user?.name}</span>
              <button onClick={handleLogout} className="btn-danger px-4 py-2 text-sm w-fit flex items-center gap-1.5">
                <LogOut size={15} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={linkClass} onClick={closeMenu}>Login</Link>
              <Link to="/register" className="btn-primary px-4 py-2 text-sm w-fit" onClick={closeMenu}>Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
