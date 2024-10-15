import React, { useState } from 'react';
import { User, UserPlus, Edit, Trash2 } from 'lucide-react';

interface Employee {
  id: number;
  name: string;
  role: string;
  isAdmin: boolean;
}

const Employees: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([
    { id: 1, name: 'Juan Pérez', role: 'Agricultor', isAdmin: false },
    { id: 2, name: 'María García', role: 'Gerente', isAdmin: true },
  ]);

  const [newEmployee, setNewEmployee] = useState({ name: '', role: '', isAdmin: false });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setNewEmployee(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const addEmployee = () => {
    if (newEmployee.name && newEmployee.role) {
      setEmployees(prev => [...prev, { ...newEmployee, id: Date.now() }]);
      setNewEmployee({ name: '', role: '', isAdmin: false });
    }
  };

  const deleteEmployee = (id: number) => {
    setEmployees(prev => prev.filter(emp => emp.id !== id));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-4">Gestión de Empleados</h1>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Agregar Nuevo Empleado</h2>
        <div className="flex space-x-4">
          <input
            type="text"
            name="name"
            value={newEmployee.name}
            onChange={handleInputChange}
            placeholder="Nombre"
            className="flex-grow p-2 border rounded"
          />
          <input
            type="text"
            name="role"
            value={newEmployee.role}
            onChange={handleInputChange}
            placeholder="Cargo"
            className="flex-grow p-2 border rounded"
          />
          <label className="flex items-center">
            <input
              type="checkbox"
              name="isAdmin"
              checked={newEmployee.isAdmin}
              onChange={handleInputChange}
              className="mr-2"
            />
            Es Admin
          </label>
          <button
            onClick={addEmployee}
            className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
          >
            <UserPlus size={20} />
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Lista de Empleados</h2>
        <ul className="space-y-4">
          {employees.map(employee => (
            <li key={employee.id} className="flex items-center justify-between bg-gray-100 p-4 rounded">
              <div className="flex items-center space-x-4">
                <User size={24} className="text-gray-500" />
                <div>
                  <p className="font-semibold">{employee.name}</p>
                  <p className="text-sm text-gray-600">{employee.role}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <span className={`px-2 py-1 rounded text-xs ${employee.isAdmin ? 'bg-blue-100 text-blue-800' : 'bg-gray-200 text-gray-800'}`}>
                  {employee.isAdmin ? 'Admin' : 'Empleado'}
                </span>
                <button className="text-blue-500 hover:text-blue-700">
                  <Edit size={20} />
                </button>
                <button onClick={() => deleteEmployee(employee.id)} className="text-red-500 hover:text-red-700">
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

export default Employees;