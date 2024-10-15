import React, { useState } from 'react';
import { Package, Plus, Minus } from 'lucide-react';

interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  type: 'seed' | 'product';
}

const Inventory: React.FC = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([
    { id: 1, name: 'Semillas de Maíz', quantity: 500, unit: 'kg', type: 'seed' },
    { id: 2, name: 'Fertilizante NPK', quantity: 1000, unit: 'L', type: 'product' },
  ]);

  const [newItem, setNewItem] = useState({ name: '', quantity: 0, unit: '', type: 'product' as 'seed' | 'product' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewItem(prev => ({
      ...prev,
      [name]: name === 'quantity' ? Number(value) : value
    }));
  };

  const addItem = () => {
    if (newItem.name && newItem.quantity > 0 && newItem.unit) {
      setInventory(prev => [...prev, { ...newItem, id: Date.now() }]);
      setNewItem({ name: '', quantity: 0, unit: '', type: 'product' });
    }
  };

  const updateQuantity = (id: number, change: number) => {
    setInventory(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: Math.max(0, item.quantity + change) } : item
    ));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-4">Inventario</h1>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Agregar Nuevo Item</h2>
        <div className="flex space-x-4">
          <input
            type="text"
            name="name"
            value={newItem.name}
            onChange={handleInputChange}
            placeholder="Nombre del item"
            className="flex-grow p-2 border rounded"
          />
          <input
            type="number"
            name="quantity"
            value={newItem.quantity}
            onChange={handleInputChange}
            placeholder="Cantidad"
            className="w-24 p-2 border rounded"
          />
          <input
            type="text"
            name="unit"
            value={newItem.unit}
            onChange={handleInputChange}
            placeholder="Unidad"
            className="w-24 p-2 border rounded"
          />
          <select
            name="type"
            value={newItem.type}
            onChange={handleInputChange}
            className="p-2 border rounded"
          >
            <option value="product">Producto</option>
            <option value="seed">Semilla</option>
          </select>
          <button
            onClick={addItem}
            className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Lista de Inventario</h2>
        <ul className="space-y-4">
          {inventory.map(item => (
            <li key={item.id} className="flex items-center justify-between bg-gray-100 p-4 rounded">
              <div className="flex items-center space-x-4">
                <Package size={24} className="text-gray-500" />
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-600">{item.quantity} {item.unit}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded text-xs ${item.type === 'seed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                  {item.type === 'seed' ? 'Semilla' : 'Producto'}
                </span>
                <button onClick={() => updateQuantity(item.id, -1)} className="text-red-500 hover:text-red-700">
                  <Minus size={20} />
                </button>
                <button onClick={() => updateQuantity(item.id, 1)} className="text-green-500 hover:text-green-700">
                  <Plus size={20} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Inventory;