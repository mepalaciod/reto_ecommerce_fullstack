import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerFullUser } from "../../../firebase/auth"
import Button from '../../atoms/Button';
import Input from '../../atoms/Input';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cellphone: '',
    address: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validar contraseñas coinciden
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    /*
    // Validar email único
    const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const allUsers = [...MOCK_USERS, ...existingUsers];
    const emailExists = allUsers.some(user => user.email === formData.email);
    if (emailExists) {
      setError('El email ya está registrado.');
      return;
    }

    // Crear nuevo usuario
    const newUser = {
      id: Date.now(), // ID único basado en timestamp
      name: formData.name,
      email: formData.email,
      cellphone: formData.cellphone,
      address: formData.address,
      password: formData.password
    };

    // Guardar en localStorage
    existingUsers.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));

    // Navegar a login
    navigate('/login');
    */

    const respuesta = await registerFullUser(formData);

    if (respuesta.success) {
      navigate('/login');
    } else {
      setError(respuesta.error);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-4xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)] transition-all">
        <div className="p-6 md:p-10">

          <header className="mb-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">Crear cuenta</h2>
            <p className="mt-2 text-sm text-slate-500">Únete a nuestra comunidad hoy mismo</p>
          </header>

          {error && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">

              <div className="space-y-4">
                <Input
                  label="Nombre completo"
                  name="name"
                  type="text"
                  required
                  placeholder="Ej. Juan Pérez"
                  onChange={handleChange}
                />

                <Input
                  label="Correo electrónico"
                  name="email"
                  type="email"
                  required
                  placeholder="correo@ejemplo.com"
                  onChange={handleChange}
                />

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Celular"
                    name="cellphone"
                    type="tel"
                    placeholder="+57 300..."
                    onChange={handleChange}
                  />
                  <Input
                    label="Dirección"
                    name="address"
                    type="text"
                    placeholder="Calle 123..."
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Input
                  label="Contraseña"
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  hint="Mínimo 8 caracteres (letras y números)."
                  onChange={handleChange}
                />

                <Input
                  label="Confirmar contraseña"
                  name="confirmPassword"
                  type="password"
                  required
                  placeholder="••••••••"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="pt-4 space-y-4">
              <Button
                type="submit"
                size="lg"
                className="w-full"
              >
                Registrarse
              </Button>

              <p className="text-center text-sm text-slate-500">
                ¿Ya tienes una cuenta? <Link to="/login" className="font-semibold text-slate-900 hover:underline">Inicia sesión</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;