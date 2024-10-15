import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, Map, Users, Package, Sprout, LogOut } from 'lucide-react';
import useAuthStore from '../store/authStore';

const Navbar: React.FC = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-green-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">AgroCrop</Link>
        <div className="space-x-4">
          <Link to="/" className="hover:text-green-200"><Home className="inline-block mr-1" size={20} />Inicio</Link>
          <Link to="/map" className="hover:text-green-200"><Map className="inline-block mr-1" size={20} />Mapa</Link>
          {user?.role === 'admin' && (
            <Link to="/employees" className="hover:text-green-200"><Users className="inline-block mr-1" size={20} />Empleados</Link>
          )}
          <Link to="/inventory" className="hover:text-green-200"><Package className="inline-block mr-1" size={20} />Inventario</Link>
          <Link to="/crops" className="hover:text-green-200"><Sprout className="inline-block mr-1" size={20} />Cultivos</Link>
          <button onClick={handleLogout} className="hover:text-green-200"><LogOut className="inline-block mr-1" size={20} />Salir</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;