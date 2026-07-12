import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoutes from './components/ProtectedRoutes';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { fetchCurrentUser } from './redux/slices/authSlice';
import Configurator from './pages/Configurator';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch])
  return (
    <div className='min-h-screen bg-gray-900 text-white'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/cart' element={<Cart />} />
        <Route path="/product/:id" element={<Configurator />} />
        <Route path="/checkout" element={
          <ProtectedRoutes>
            <Checkout />
          </ProtectedRoutes>
        } />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/dashboard" element={
          <ProtectedRoutes>
            <Dashboard />
          </ProtectedRoutes>
        }
        />
      </Routes>
    </div>
  );
}

export default App