import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { LatLngExpression } from 'leaflet';
import { ClipLoader } from 'react-spinners'; // Import the spinner
import { Separator } from '@/components/ui/separator';

// Fix for default icon issue with Webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;



const LocationComponent: React.FC = () => {
    const [location, setLocation] = useState<{ latitude: number | null; longitude: number | null }>({
        latitude: null,
        longitude: null,
    });
    const [address, setAddress] = useState('');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser.');
        } else {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const coords = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    };
                    setLocation(coords);

                    // Reverse Geocoding
                    fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${coords.latitude}&lon=${coords.longitude}`
                    )
                        .then((response) => response.json())
                        .then((data) => {
                            setAddress(data.display_name);
                        })
                        .catch((err) => {
                            setError('Unable to retrieve address.');
                        });
                },
                (err) => {
                    setError('Unable to retrieve your location.');
                }
            );
        }
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (location.latitude && location.longitude) {
        const position: LatLngExpression = [location.latitude, location.longitude];

        // Define circle options
        const circleOptions = {
            color: 'blue',
            fillColor: 'blue',
            fillOpacity: 0.2,
        };

        return (
            <div>
                <MapContainer center={position} zoom={15} style={{ height: '400px', width: '100%' }}>
                    <TileLayer
                        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
                        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    />
                    <Circle center={position} radius={500} pathOptions={circleOptions} />
                </MapContainer>
                <div className='mt-4' />
                <Separator />                
                <p className='mt-2'>{address}</p>
            </div>
        );
    } else {
        // Show spinner during loading
        return (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                }}
            >
                <ClipLoader size={50} color={'#123abc'} loading={true} />
            </div>
        );
  };
};

export default LocationComponent;
