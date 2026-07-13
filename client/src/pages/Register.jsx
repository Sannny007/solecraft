import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import { registerUser } from "../redux/slices/authSlice";

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(registerUser({ name, email, password }));
    if (registerUser.fulfilled.match(result)) {
      setEmail('');
      setPassword('');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <form onSubmit={handleSubmit} className="card w-full max-w-sm p-8 space-y-5 animate-fadeUp">
        <div className="text-center mb-2">
          <UserPlus className="mx-auto mb-2 text-(--accent)" size={28} />
          <h1 className="font-display text-3xl">JOIN SOLECRAFT</h1>
          <p className="text-(--ink-dim) text-sm mt-1">Start designing your own pair</p>
        </div>
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-field w-full"
          required/>

        <input
          type="email"
          placeholder="joe@gmail.com"
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
          {loading ? 'Creating account...' : 'Register'}
        </button>
        {error && <p className="text-(--accent-2) text-sm text-center">{error}</p>}
        <p className="text-center text-sm text-(--ink-dim)">
          Already have an account? <Link to="/login" className="text-[var(--accent)] hover:underline">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
