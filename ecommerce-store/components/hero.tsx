import getStores from "@/actions/get-store-locations";
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image";

const Hero = async () => {
    const stores = await getStores({});
    // console.log("stores:", stores);
    const storeLinkPrefix = "/store/";

    return (
        <div className="h-[300px] px-12">
            <div className="text-3xl font-bold mb-5">
                Best Store isn&apos;t just a store, it&apos;s an experience.
            </div>
            <Carousel
                opts={{
                    align: "start",
                }}
                className="w-full"
            >
                <CarouselContent>
                    {stores.map((store, index) => (
                        <CarouselItem key={index} className="basis-1/2 lg:basis-1/4">
                            <div className="p-1">
                                <Card>
                                    <a href={`${storeLinkPrefix}${store.id}`}>
                                        <CardContent className="flex aspect-square w-full items-center justify-center p-6 h-[150px]">
                                            <Image
                                                width={200}
                                                height={200}
                                                src={"/img/stores/store-one.webp"}
                                                alt={store.name}
                                                className="w-full h-full object-cover rounded-lg"
                                            />
                                        </CardContent>
                                        <div className="text-center font-semibold mt-2">
                                            {store.name}
                                        </div>
                                    </a>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    );
}

export default Hero;