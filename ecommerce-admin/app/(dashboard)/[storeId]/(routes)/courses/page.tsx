import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Video } from "lucide-react";

const videoData = [
    {
        title: "For Beginners - Gardening 101",
        link: "https://www.youtube.com/embed/B0DrWAUsNSc",
    },
    {
        title: "How Much Food Can I Grow in 1 Year?",
        link: "https://www.youtube.com/embed/DOgOMLG-Zyg",
    },
    {
        title: "Beekeeping and more",
        link: "https://www.youtube.com/embed/P37AjceP82U",
    },
    {
        title: "Summer Harvesting",
        link: "https://www.youtube.com/embed/uL6NkuFp3Cc",
    },
    {
        title: "Final Summer Harvest",
        link: "https://www.youtube.com/embed/vyRdcEbCpY4",
    },
    {
        title: "One Year of Gardening",
        link: "https://www.youtube.com/embed/pyMfkhtEI28",
    },
];

const CoursesPage = () => {
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <Heading title="Dashboard" titleDescription="Overview of your Store" />
                <Separator />
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
                    {videoData.map((video, index) => (
                        <Card key={index}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    {video.title}
                                </CardTitle>
                                <Video className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent className="aspect-w-16 aspect-h-9 h-[300px]">
                                <iframe
                                    src={video.link}
                                    title={video.title}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen
                                    className="w-full h-full"
                                ></iframe>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CoursesPage;
