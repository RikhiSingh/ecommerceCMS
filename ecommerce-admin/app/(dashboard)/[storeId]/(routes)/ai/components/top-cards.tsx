import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { BotMessageSquare, Cloud, MapPin } from 'lucide-react';
import LocationComponent from './location-component';
import WeatherComponent from './weather-component';
import { HashLoader } from 'react-spinners';
import CurrentDateTimeComponent from './day-and-date';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AiCard from './ai-card';

const TopCards: React.FC = () => {
  const [location, setLocation] = useState<{ latitude: number | null; longitude: number | null }>({
    latitude: null,
    longitude: null,
  });
  const [address, setAddress] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  const [currentWeather, setCurrentWeather] = useState<any>(null);
  const [forecastData, setForecastData] = useState<any>(null);

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
              fetchWeatherData(coords.latitude!, coords.longitude!);
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

  const fetchWeatherData = async (latitude: number, longitude: number) => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;
      // console.log(apiKey);

      // Fetch current weather data
      const currentWeatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
      );
      const currentWeatherData = await currentWeatherResponse.json();

      // Fetch forecast data
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
      );
      const forecastData = await forecastResponse.json();

      if (currentWeatherResponse.ok && forecastResponse.ok) {
        setCurrentWeather(currentWeatherData);
        setForecastData(forecastData);
        setLoading(false);
      } else {
        setError(
          currentWeatherData.message ||
          forecastData.message ||
          'Unable to retrieve weather data.'
        );
        setLoading(false);
      }
    } catch (err) {
      setError('Unable to retrieve weather data.');
      setLoading(false);
    }
  };

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
        <HashLoader size={50} color={'#123abc'} loading={true} />
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
      <div className='flex gap-2'>
        <div className="grid gap-4 grid-cols-1 w-1/3">
          {/* Weather Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Weather</CardTitle>
              <Cloud className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {currentWeather && forecastData && (
                <WeatherComponent
                  currentWeather={currentWeather}
                  forecastData={forecastData}
                />
              )}
              <CurrentDateTimeComponent />
            </CardContent>
          </Card>
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
        </div >
        <div className="w-2/3">
          {/* Pass data to AiCard */}
          {currentWeather && forecastData && (
            <AiCard
              address={address}
              currentWeather={currentWeather}
              forecastData={forecastData}
              date={new Date()}
            />
          )}
        </div>
      </div>
    </div >
  );
};

export default TopCards;
