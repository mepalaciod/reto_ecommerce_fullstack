import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import smile from "../../../assets/smile.png";
import { loginUser } from "../../../firebase/auth";
import Button from '../../atoms/Button';
import Input from '../../atoms/Input';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    /*
    // Obtener usuarios registrados
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const allUsers = [...MOCK_USERS, ...registeredUsers];

    // Buscar usuario
    const user = allUsers.find(u => u.email === formData.email && u.password === formData.password);
    if (user) {
      // Login exitoso
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      navigate('/gallery');
    } else {
      setError('Credenciales incorrectas.');
    }
      */
    const result = await loginUser(formData.email, formData.password);
    if (result.success) {
      navigate('/gallery');
    } else {
      setError(result.error);
    }
  };
  return (
    <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-md rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-10">

        <div className="mb-10 flex flex-col items-center text-center">
          <div className="mb-4 rounded-3xl bg-slate-100 p-4">
            <img src={smile} alt="Smile Icon" className="h-14 w-14" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Welcome back</h1>
          <p className="mt-2 text-sm text-slate-500">Sign in to continue browsing products</p>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="correo@ejemplo.com"
          />

          <Input
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="••••••••"
          />

          <div className="flex items-center justify-between text-sm text-slate-500">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900/20" />
              remember me
            </label>
            <a href="#" className="font-medium text-slate-900 hover:underline">
              forgot password?
            </a>
          </div>

          <Button type="submit" size="lg" className="w-full">
            Login
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Button>

        </form>
      </div>
    </div>
  );
};

export default Login;