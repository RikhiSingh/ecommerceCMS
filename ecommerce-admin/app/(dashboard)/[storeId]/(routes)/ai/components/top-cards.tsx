import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Cloud, MapPin } from 'lucide-react';
import LocationComponent from './location-component';
import WeatherComponent from './weather-component';
import { ClipLoader } from 'react-spinners';
import { Calendar } from '@/components/ui/calendar';

const TopCards: React.FC = () => {
  const [location, setLocation] = useState<{ latitude: number | null; longitude: number | null }>({
    latitude: null,
    longitude: null,
  });
  const [address, setAddress] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      setLoading(false);
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
              setLoading(false);
            })
            .catch((err) => {
              setError('Unable to retrieve address.');
              setLoading(false);
            });
        },
        (err) => {
          setError('Unable to retrieve your location.');
          setLoading(false);
        }
      );
    }
  }, []);

  if (loading) {
    // Show spinner during loading
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <ClipLoader size={50} color={'#123abc'} loading={true} />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <Heading title="CommunmoCart AI" titleDescription="AI To do whatever here Lmao lorem can be here too kekw" />
      <Separator />
      <div className="grid gap-4 grid-cols-3">
        {/* Location Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Location</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <LocationComponent position={location} address={address} loading={loading} />
          </CardContent>
        </Card>

        {/* Weather Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Weather</CardTitle>
            <Cloud className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <WeatherComponent latitude={location.latitude!} longitude={location.longitude!} />
          </CardContent>
        </Card>

        {/* Weather Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Calendar</CardTitle>
            <Cloud className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className='flex justify-center mb-4'>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border w-[300px] flex items-center justify-center"
              />
            </div>
            <Separator/>
            
          </CardContent>
        </Card>
      </div >
    </div >
  );
};

export default TopCards;
