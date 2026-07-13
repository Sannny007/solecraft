import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { LogIn } from 'lucide-react';
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
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <form onSubmit={handleSubmit} className="card w-full max-w-sm p-8 space-y-5 animate-fadeUp">
        <div className="text-center mb-2">
          <LogIn className="mx-auto mb-2 text-(--accent)" size={28} />
          <h1 className="font-display text-3xl">WELCOME BACK</h1>
          <p className="text-(--ink-dim) text-sm mt-1">Log in to keep customizing</p>
        </div>
        <input
          type="email"
          placeholder="you@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field w-full"
          required/>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field w-full"
          required/>
        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? 'Logging in...' : 'Login'}
        </button>
        {error && <p className="text-(--accent-2) text-sm text-center">{error}</p>}
        {user && <p className="text-(--accent) text-sm text-center">Welcome back, {user.name}!</p>}
        <p className="text-center text-sm text-(--ink-dim)">
          New here? <Link to="/register" className="text-(--accent) hover:underline">Create an account</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
