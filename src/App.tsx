import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Map from './pages/Map';
import Employees from './pages/Employees';
import Inventory from './pages/Inventory';
import Crops from './pages/Crops';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<PrivateRoute />}>
            <Route
              path="/"
              element={
                <>
                  <Navbar />
                  <div className="container mx-auto px-4 py-8">
                    <Dashboard />
                  </div>
                </>
              }
            />
            <Route
              path="/map"
              element={
                <>
                  <Navbar />
                  <div className="container mx-auto px-4 py-8">
                    <Map />
                  </div>
                </>
              }
            />
            <Route
              path="/employees"
              element={
                <>
                  <Navbar />
                  <div className="container mx-auto px-4 py-8">
                    <Employees />
                  </div>
                </>
              }
            />
            <Route
              path="/inventory"
              element={
                <>
                  <Navbar />
                  <div className="container mx-auto px-4 py-8">
                    <Inventory />
                  </div>
                </>
              }
            />
            <Route
              path="/crops"
              element={
                <>
                  <Navbar />
                  <div className="container mx-auto px-4 py-8">
                    <Crops />
                  </div>
                </>
              }
            />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;