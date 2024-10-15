import React from 'react';
import { BarChart, Users, Package, Sprout } from 'lucide-react';
import useAuthStore from '../store/authStore';

const Dashboard: React.FC = () => {
  const user = useAuthStore((state) => state.user);

  // Datos simulados para el dashboard
  const dashboardData = {
    totalEmployees: 15,
    totalInventoryItems: 250,
    activeCrops: 8,
    recentActivities: [
      { id: 1, action: 'Nuevo empleado agregado', date: '2024-03-15' },
      { id: 2, action: 'Actualización de inventario', date: '2024-03-14' },
      { id: 3, action: 'Nuevo cultivo plantado', date: '2024-03-13' },
    ],
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-4">Panel de Control</h1>
      <p className="text-lg">Bienvenido, {user?.name}!</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Empleados</h2>
            <Users size={24} className="text-green-500" />
          </div>
          <p className="text-3xl font-bold mt-2">{dashboardData.totalEmployees}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Items en Inventario</h2>
            <Package size={24} className="text-green-500" />
          </div>
          <p className="text-3xl font-bold mt-2">{dashboardData.totalInventoryItems}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Cultivos Activos</h2>
            <Sprout size={24} className="text-green-500" />
          </div>
          <p className="text-3xl font-bold mt-2">{dashboardData.activeCrops}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Actividades Recientes</h2>
        <ul className="space-y-2">
          {dashboardData.recentActivities.map((activity) => (
            <li key={activity.id} className="flex items-center justify-between">
              <span>{activity.action}</span>
              <span className="text-sm text-gray-500">{activity.date}</span>
            </li>
          ))}
        </ul>
      </div>

      {user?.role === 'admin' && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Resumen de Rendimiento</h2>
          <div className="flex items-center justify-center">
            <BarChart size={200} className="text-green-500" />
          </div>
          <p className="text-center mt-4">Gráfico de rendimiento (simulado)</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;