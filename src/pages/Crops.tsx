import React, { useState } from 'react';
import { Sprout, Calendar, Edit, Trash2 } from 'lucide-react';

interface Crop {
  id: number;
  name: string;
  plantingDate: string;
  harvestDate: string;
  status: 'planted' | 'growing' | 'ready' | 'harvested';
}

const Crops: React.FC = () => {
  const [crops, setCrops] = useState<Crop[]>([
    { id: 1, name: 'Maíz', plantingDate: '2024-03-01', harvestDate: '2024-07-15', status: 'growing' },
    { id: 2, name: 'Trigo', plantingDate: '2024-04-15', harvestDate: '2024-08-30', status: 'planted' },
  ]);

  const [newCrop, setNewCrop] = useState({ name: '', plantingDate: '', harvestDate: '', status: 'planted' as Crop['status'] });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewCrop(prev => ({ ...prev, [name]: value }));
  };

  const addCrop = () => {
    if (newCrop.name && newCrop.plantingDate && newCrop.harvestDate) {
      setCrops(prev => [...prev, { ...newCrop, id: Date.now() }]);
      setNewCrop({ name: '', plantingDate: '', harvestDate: '', status: 'planted' });
    }
  };

  const deleteCrop = (id: number) => {
    setCrops(prev => prev.filter(crop => crop.id !== id));
  };

  const getStatusColor = (status: Crop['status']) => {
    switch (status) {
      case 'planted': return 'bg-blue-100 text-blue-800';
      case 'growing': return 'bg-green-100 text-green-800';
      case 'ready': return 'bg-yellow-100 text-yellow-800';
      case 'harvested': return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-4">Gestión de Cultivos</h1>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Agregar Nuevo Cultivo</h2>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={newCrop.name}
            onChange={handleInputChange}
            placeholder="Nombre del cultivo"
            className="p-2 border rounded"
          />
          <input
            type="date"
            name="plantingDate"
            value={newCrop.plantingDate}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
          <input
            type="date"
            name="harvestDate"
            value={newCrop.harvestDate}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
          <select
            name="status"
            value={newCrop.status}
            onChange={handleInputChange}
            className="p-2 border rounded"
          >
            <option value="planted">Plantado</option>
            <option value="growing">Creciendo</option>
            <option value="ready">Listo para cosechar</option>
            <option value="harvested">Cosechado</option>
          </select>
        </div>
        <button
          onClick={addCrop}
          className="mt-4 bg-green-500 text-white p-2 rounded hover:bg-green-600 w-full"
        >
          Agregar Cultivo
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Lista de Cultivos</h2>
        <ul className="space-y-4">
          {crops.map(crop => (
            <li key={crop.id} className="flex items-center justify-between bg-gray-100 p-4 rounded">
              <div className="flex items-center space-x-4">
                <Sprout size={24} className="text-green-500" />
                <div>
                  <p className="font-semibold">{crop.name}</p>
                  <div className="flex space-x-4 text-sm text-gray-600">
                    <span className="flex items-center">
                      <Calendar size={16} className="mr-1" /> Plantado: {crop.plantingDate}
                    </span>
                    <span className="flex items-center">
                      <Calendar size={16} className="mr-1" /> Cosecha: {crop.harvestDate}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded text-xs ${getStatusColor(crop.status)}`}>
                  {crop.status}
                </span>
                <button className="text-blue-500 hover:text-blue-700">
                  <Edit size={20} />
                </button>
                <button onClick={() => deleteCrop(crop.id)} className="text-red-500 hover:text-red-700">
                  <Trash2 size={20} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Crops;