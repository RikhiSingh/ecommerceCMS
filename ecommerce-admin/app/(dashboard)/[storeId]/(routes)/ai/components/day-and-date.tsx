import { Separator } from '@/components/ui/separator';
import React, { useState, useEffect } from 'react';

const CurrentDateTimeComponent: React.FC = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    // Update the time every second
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, []);

  // Format the date and time
  const dayOfWeek = currentDateTime.toLocaleDateString(undefined, { weekday: 'long' });
  const date = currentDateTime.toLocaleDateString(undefined, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  const time = currentDateTime.toLocaleTimeString();

  return (
    <div className="text-center mt-4">
      <p className="text-2xl mb-4 font-semibold">{dayOfWeek}</p>
      <Separator />
      <p className="text-lg mt-4">{date}</p>
      <p className="text-lg">{time}</p>
    </div>
  );
};

export default CurrentDateTimeComponent;
