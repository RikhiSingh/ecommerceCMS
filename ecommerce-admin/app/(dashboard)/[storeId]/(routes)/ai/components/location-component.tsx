import React from 'react';
import { MapContainer, TileLayer, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { LatLngExpression } from 'leaflet';
import { Separator } from '@/components/ui/separator';
import { ClipLoader } from 'react-spinners'; // Import the spinner

// Fix for default icon issue with Webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

interface LocationComponentProps {
  position: { latitude: number | null; longitude: number | null };
  address: string;
  loading: boolean; // Add the loading prop
}

const LocationComponent: React.FC<LocationComponentProps> = ({ position, address, loading }) => {
  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column', // Add this to stack the spinner and text vertically
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <ClipLoader size={50} color={'#123abc'} loading={true} />
        <p>Loading Location Data...</p>
      </div>
    );
  }

  if (position.latitude && position.longitude) {
    const mapPosition: LatLngExpression = [position.latitude, position.longitude];

    // Define circle options
    const circleOptions = {
      color: 'blue',
      fillColor: 'blue',
      fillOpacity: 0.2,
    };

    return (
      <div>
        <MapContainer className='z-0' center={mapPosition} zoom={14} style={{ height: '400px', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          <Circle center={mapPosition} radius={500} pathOptions={circleOptions} />
        </MapContainer>
        <div className='mt-4' />
        <Separator />
        <p className='mt-2'>{address}</p>
      </div>
    );
  } else {
    return <div>Location data is not available.</div>;
  }
};

export default LocationComponent;
