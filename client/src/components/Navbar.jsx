import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";


const Navbar = () => {
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };


  return (
    <nav className="bg-gray-800 px-6 py-4 flex justify-between items-center">
      <Link to = "/" className="text-xl font-bold text-purple-400">SoleCraft</Link>
      <div className="flex gap-4 items-center">
        <Link to = "/" className="hover:text-purple-400">Home</Link>
        <Link to="/cart" className="hover:text-purple-400">Cart</Link>
        {token ? (
          <>
          <span className="test-sm text-gray-300">Hi, {user?.name}</span>
          <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm">Logout</button>
          </>
        ) : (
          <>
          <Link to = "/login" className="hover:text-purple-400">Login</Link>
          <Link to = "/register" className="hover:text-purple-400">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar