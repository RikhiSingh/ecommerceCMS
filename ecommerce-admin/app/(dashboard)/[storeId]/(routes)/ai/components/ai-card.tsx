import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { BotMessageSquare } from 'lucide-react';
import { useParams } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

interface AiCardProps {
    address: string;
    currentWeather: any;
    forecastData: any;
    date: Date;
}

const AiCard: React.FC<AiCardProps> = ({ address, currentWeather, forecastData, date }) => {
    const [plantName, setPlantName] = useState('');
    const [aiResponse, setAiResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const params = useParams();

    const handleGenerateResponse = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/${params.storeId}/ai/generateAiResponse`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    address,
                    currentWeather,
                    forecastData,
                    date: date.toISOString(),
                    plantName,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setAiResponse(data.response);
                console.log(data.response);
            } else {
                console.error('Error:', data.error);
                setAiResponse('An error occurred while generating the AI response.');
            }
        } catch (error) {
            console.error('Error:', error);
            setAiResponse('An error occurred while generating the AI response.');
        }
        setLoading(false);
    };

    return (
        <Card className='w-full'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-xl font-medium'>Communo AI</CardTitle>
                <BotMessageSquare className='h-8 w-8 text-muted-foreground' />
            </CardHeader>
            <Separator />
            <div className='p-2 flex flex-col gap-2'>
                <div className='flex gap-2 flex-col justify-center items-center'>
                    <p className='text-xl font-bold p-2'>Enter a plant name</p>
                    <p className='text-md pl-2 pb-2'>
                        Get personalized AI-engineered steps to grow it based on your current location and
                        weather conditions
                    </p>
                    <Input
                        className='max-w-[600px]'
                        placeholder='Enter a plant name'
                        value={plantName}
                        onChange={(e) => setPlantName(e.target.value)}
                    />
                    <Button className='mb-4 mt-2' onClick={handleGenerateResponse} disabled={loading}>
                        {loading ? 'Generating...' : 'Generate Personalized AI Response'}
                    </Button>
                </div>
                <Separator />
                <div className='h-full min-h-[300px] p-2'>
                    <div className='pl-2'>
                        {/* Display the AI response using ReactMarkdown */}
                        <ReactMarkdown>{aiResponse || 'Response will be displayed here.'}</ReactMarkdown>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default AiCard;
