import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useGiftContext } from '../context/GiftContext';

interface GuestLoginModalProps {
  onClose: () => void;
}

const GuestLoginModal: React.FC<GuestLoginModalProps> = ({ onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [errors, setErrors] = useState({ name: '', email: '', password: '' });
  const { setCurrentGuest } = useGiftContext();

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: '', email: '', password: '' };

    if (!name.trim()) {
      newErrors.name = 'Nome é obrigatório';
      isValid = false;
    }

    if (!email.trim()) {
      newErrors.email = 'E-mail é obrigatório';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'E-mail inválido';
      isValid = false;
    }

    if (isAdmin && !password.trim()) {
      newErrors.password = 'Senha é obrigatória para login como administrador';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      if (isAdmin) {
        if (email === 'anderson@email.com' && password === 'admin123') {
          setCurrentGuest({ name, email, isAdmin: true });
          onClose();
        } else {
          setErrors(prev => ({ ...prev, password: 'Credenciais de administrador inválidas' }));
          return;
        }
      } else {
        setCurrentGuest({ name, email, isAdmin: false });
        onClose();
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative animate-fadeIn">
        <button 
          onClick={onClose} 
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>
        
        <h2 className="text-2xl font-serif text-center mb-6 text-olive">
          {isAdmin ? 'Login Administrativo' : 'Login de Convidado'}
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 mb-2">Seu Nome</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-olive text-gray-900 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Digite seu nome"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">Seu E-mail</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-olive text-gray-900 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Digite seu e-mail"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {isAdmin && (
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 mb-2">Senha</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-olive text-gray-900 ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Digite a senha de administrador"
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>
          )}

          <div className="mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
                className="mr-2"
              />
              <span className="text-gray-700">Entrar como Administrador</span>
            </label>
          </div>
          
          <button 
            type="submit"
            className="w-full bg-olive hover:bg-olive-dark text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            {isAdmin ? 'Entrar como Admin' : 'Continuar como Convidado'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default GuestLoginModal;