import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/slices/authSlice';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser({ email, password }));
    if (loginUser.fulfilled.match(result)) {
      setEmail('');
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-center">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 w-80 h-110 space-y-4 rounded-tr-[64px] rounded-bl-[64px]  shadow-[8px_-8px_20px_rgba(59,130,246,0.35)]">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <input
          type="email"
          placeholder="you@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 outline-none transition duration-300 hover:scale-110"
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 outline-none transition duration-300 hover:scale-110"
        />
        <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 transition duration-300 hover:scale-110 p-2 rounded-3xl">
          {loading ? 'Logging in...' : 'Login'}
        </button>
        {error && <p className="text-red-400 text-sm">{error}</p>}
        {user && <p className="text-green-400 text-sm">Welcome back, {user.name}!</p>}
      </form>
    </div>
  );
}

export default Login;