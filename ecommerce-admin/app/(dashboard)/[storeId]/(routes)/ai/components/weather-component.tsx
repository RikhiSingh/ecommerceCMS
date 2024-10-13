import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HashLoader } from 'react-spinners';
import Image from 'next/image';

interface WeatherComponentProps {
  currentWeather: any;
  forecastData: any;
}

interface WeatherData {
  city: {
    name: string;
    country: string;
    timezone: number;
  };
  list: Array<{
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      humidity: number;
    };
    weather: Array<{
      description: string;
      icon: string;
    }>;
    wind: {
      speed: number;
      deg: number;
    };
    dt_txt: string;
  }>;
}
interface WeatherComponentProps {
  currentWeather: any;
  forecastData: any;
}

const WeatherComponent: React.FC<WeatherComponentProps> = ({ currentWeather, forecastData }) => {
  // Remove the state variables and use the props instead
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Existing functions for processing forecast data
  const groupForecastByDay = (data: WeatherData['list']) => {
    const dailyData: { [date: string]: WeatherData['list'] } = {};

    data.forEach((forecast) => {
      const date = forecast.dt_txt.split(' ')[0];
      if (!dailyData[date]) {
        dailyData[date] = [];
      }
      dailyData[date].push(forecast);
    });

    return dailyData;
  };

  const extractDailyForecasts = (
    dailyData: { [date: string]: WeatherData['list'] }
  ) => {
    const dailyForecasts = Object.keys(dailyData).map((date) => {
      const middayForecast = dailyData[date].find((forecast) =>
        forecast.dt_txt.includes('12:00:00')
      );
      const forecast = middayForecast || dailyData[date][0];
      return forecast;
    });

    return dailyForecasts.slice(1, 4); // Next 3 days
  };

  if (loading) {
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
        <p>Loading Weather Data...</p>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (currentWeather && forecastData) {
    // Process forecast data
    const dailyData = groupForecastByDay(forecastData.list);
    const dailyForecasts = extractDailyForecasts(dailyData);

    // Display current weather
    const iconUrl = `https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@4x.png`;

    return (
      <div>
        <Card>
          <CardHeader>
            <CardTitle>
              {currentWeather.name}, {currentWeather.sys.country}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='flex items-center'>
              <Image src={iconUrl} alt='Weather icon' className='w-24 h-24' width={100} height={100}/>
              <div className='ml-4'>
                <h2 className='text-4xl font-bold'>
                  {Math.round(currentWeather.main.temp)}°C
                </h2>
                <p className='text-lg'>
                  Feels like {Math.round(currentWeather.main.feels_like)}°C
                </p>
                <p className='text-xl capitalize'>
                  {currentWeather.weather[0].description}
                </p>
              </div>
            </div>
            {/* Additional current weather details */}
          </CardContent>
        </Card>

        {/* Forecast */}
        <div className='mt-8'>
          <h3 className='text-xl font-bold'>3-Day Forecast</h3>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
            {dailyForecasts.map((forecast, index) => {
              const date = new Date(forecast.dt * 1000);
              const dayOfWeek = date.toLocaleDateString('en-US', {
                weekday: 'long',
              });
              const iconUrl = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`;
              return (
                <div
                  key={index}
                  className='rounded-lg shadow p-4 flex flex-col items-center border border-white/10'
                >
                  <p className='text-lg font-medium'>{dayOfWeek}</p>
                  <Image src={iconUrl} alt='Weather icon' className='w-16 h-16' width={100} height={100} />
                  <p className='capitalize'>{forecast.weather[0].description}</p>
                  <p>
                    <span className='font-bold'>
                      {Math.round(forecast.main.temp_max)}°C
                    </span>{' '}
                    / {Math.round(forecast.main.temp_min)}°C
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  } else {
    return <div>Weather data is not available.</div>;
  }
};

export default WeatherComponent;
