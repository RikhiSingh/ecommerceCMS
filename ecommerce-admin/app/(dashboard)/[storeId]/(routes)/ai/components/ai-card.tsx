import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { BotMessageSquare } from 'lucide-react';
import { useParams } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import remarkGfm from 'remark-gfm';
import { ScrollArea } from "@/components/ui/scroll-area"
import { ClipLoader } from 'react-spinners';

// Define a custom type that includes the 'inline' prop
interface CodeProps extends React.HTMLAttributes<HTMLElement> {
    inline?: boolean;
    className?: string;
    node?: any;
}

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
            } else {
                setAiResponse('An error occurred while generating the AI response.');
            }
        } catch (error) {
            setAiResponse('An error occurred while generating the AI response.');
        }
        setLoading(false);
    };

    return (
        <div className="w-full border rounded-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-medium">Communo AI</CardTitle>
                <BotMessageSquare className="h-8 w-8 text-muted-foreground" />
            </CardHeader>
            <Separator />
            <div className="p-2 flex flex-col gap-2">
                <div className="flex gap-2 flex-col justify-center items-center">
                    <p className="text-xl font-bold p-2">Enter a plant name</p>
                    <p className="text-md pl-2 pb-2">
                        Get personalized AI-engineered steps to grow it based on your current location and
                        weather conditions.
                    </p>
                    <Input
                        className="max-w-[600px]"
                        placeholder="Enter a plant name"
                        value={plantName}
                        onChange={(e) => setPlantName(e.target.value)}
                    />
                    <Button className="mb-4 mt-2" onClick={handleGenerateResponse} disabled={loading}>
                        {loading ? 'Generating...' : 'Generate Personalized AI Response'}
                    </Button>
                </div>
                <Separator />
                <ScrollArea className="h-[600px] min-h-[300px] p-4">
                    <div className="pl-2">
                        {/* Display the AI response using ReactMarkdown with custom components */}
                        {loading ? (
                            <div className="loading flex justify-center items-center">
                                <ClipLoader color="#000" loading={loading} size={50} />
                            </div>
                        ) : (
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                    h1: ({ node, ...props }) => <h1 className="text-2xl font-bold" {...props} />,
                                    h2: ({ node, ...props }) => <h2 className="text-xl pt-4 font-semibold" {...props} />,
                                    h3: ({ node, ...props }) => <h3 className="text-lg pt-4 font-semibold" {...props} />,
                                    strong: ({ node, ...props }) => <strong className="text-lg font-semibold" {...props} />,
                                    ul: ({ node, ...props }) => <ul className="list-disc ml-6" {...props} />,
                                    ol: ({ node, ...props }) => <ol className="list-decimal ml-6" {...props} />,
                                    li: ({ node, ...props }) => <li className="mb-1" {...props} />,
                                    p: ({ node, ...props }) => <p className="mb-2" {...props} />,
                                    code: ({ node, inline, className, children, ...props }: CodeProps) => {
                                        const match = /language-(\w+)/.exec(className || '');
                                        return !inline && match ? (
                                            <SyntaxHighlighter
                                                language={match[1]} // Assuming `match` from className is defined elsewhere
                                                style={vscDarkPlus as { [key: string]: React.CSSProperties }}
                                            >
                                                {String(children)}
                                            </SyntaxHighlighter>

                                        ) : (
                                            <code className={className} {...props}>
                                                {children}
                                            </code>
                                        );
                                    },
                                }}
                            >
                                {aiResponse || 'See the generated magical Personalized AI Response'}
                            </ReactMarkdown>
                        )}
                    </div>
                </ScrollArea >
            </div>
        </div>
    );
};

export default AiCard;
