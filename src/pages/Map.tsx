import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Map: React.FC = () => {
  const position: [number, number] = [51.505, -0.09];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Mapa de Establecimientos y Parcelas</h1>
      <div style={{ height: '500px', width: '100%' }}>
        <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position}>
            <Popup>
              Un marcador de ejemplo. <br /> Puedes personalizar esto.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;