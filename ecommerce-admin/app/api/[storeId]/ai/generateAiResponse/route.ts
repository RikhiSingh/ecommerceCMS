import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { z } from 'zod';

// Define the schema for input validation
const AiResponseSchema = z.object({
  address: z.string(),
  currentWeather: z.any(),
  forecastData: z.any(),
  date: z.string(),
  plantName: z.string(),
});

export async function POST(
  req: NextRequest,
  { params }: { params: { storeId: string } }
) {
  try {
    // Parse and validate the request body
    const body = await req.json();
    const data = AiResponseSchema.parse(body);
    const { address, currentWeather, forecastData, date, plantName } = data;

    // Include the assistant ID
    const assistantId = 'asst_zAr7JFtKjLbTcaMLNqz2P68w';

    // Process forecast data to create the formatted message
    const groupForecastByDay = (data: any) => {
      const dailyData: { [date: string]: any } = {};

      data.forEach((forecast: any) => {
        const date = forecast.dt_txt.split(' ')[0];
        if (!dailyData[date]) {
          dailyData[date] = [];
        }
        dailyData[date].push(forecast);
      });

      return dailyData;
    };

    const extractDailyForecasts = (dailyData: { [date: string]: any }) => {
      const dailyForecasts = Object.keys(dailyData).map((date) => {
        const middayForecast = dailyData[date].find((forecast: any) =>
          forecast.dt_txt.includes('12:00:00')
        );
        const forecast = middayForecast || dailyData[date][0];
        return forecast;
      });

      return dailyForecasts.slice(1, 4); // Next 3 days
    };

    const dailyData = groupForecastByDay(forecastData.list);
    const dailyForecasts = extractDailyForecasts(dailyData);

    // Format the forecast
    let forecastText = '';
    dailyForecasts.forEach((forecast: any) => {
      const dateObj = new Date(forecast.dt * 1000);
      const dayOfWeek = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
      const description = forecast.weather[0].description;
      const tempMin = Math.round(forecast.main.temp_min);
      const tempMax = Math.round(forecast.main.temp_max);

      forecastText += `
${dayOfWeek}

${description}

${tempMin}°C / ${tempMax}°C

`;
    });

    // Format the date
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

    // Create the formatted message
    const formattedMessage = `
1. ${address}
2. ${Math.round(currentWeather.main.temp)}°, Feels like ${Math.round(
      currentWeather.main.feels_like
    )}°C ${currentWeather.weather[0].description}
3. ${forecastText}
4. ${formattedDate}

Optional Input: ${plantName}
`;

    // Initialize the OpenAI client
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY, // Ensure this is set in your .env file
    });

    // Use the assistant ID as a system prompt or include it in the messages
    const systemMessage = `Assistant ID: ${assistantId}. You are a helpful assistant that provides plant growing advice based on the user's location and weather data.`;

    // Make the API call using chat completion
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // or 'gpt-4' if you have access
      messages: [
        { role: 'system', content: systemMessage },
        { role: 'user', content: formattedMessage },
      ],
    });

    const responseText = completion.choices[0].message?.content;

    // Return the response
    return NextResponse.json({ response: responseText });
  } catch (error) {
    console.error('Error generating AI response:', error);
    return new NextResponse(
      'Internal server error: ' + (error as Error).message,
      { status: 500 }
    );
  }
}
