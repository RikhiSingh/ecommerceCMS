import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DollarSign, LocateIcon } from "lucide-react";
import LocationComponent from "./location-component";
import WeatherComponent from "./weather-component";

const TopCards = () => {
    return ( 
        <div className="flex-1 space-y-4 p-8 pt-6">
                <Heading title="CommunmoCart AI" titleDescription="AI To do whatever here Lmao lorem can be here too kekw" />
                <Separator />
                <div className=" grid gap-4 grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Current Location
                            </CardTitle>
                            <LocateIcon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <LocationComponent />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Current Weather
                            </CardTitle>
                            <LocateIcon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                           <WeatherComponent />
                        </CardContent>
                    </Card>
                </div>
            </div>
     );
}
 
export default TopCards;