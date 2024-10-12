import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image";

const storeItems = [
    {
        name: "Store One",
        url: "/store-one",
        image: "/img/stores/store-one.webp",
    },
    {
        name: "Store Two",
        url: "/store-two",
        image: "/img/stores/store-two.jpg",
    },
    {
        name: "Store Three",
        url: "/store-three",
        image: "/img/stores/store-three.jpg",
    },
    {
        name: "Store Four",
        url: "/store-four",
        image: "/img/stores/store-five.webp",
    },
    {
        name: "Store Five",
        url: "/store-five",
        image: "/img/stores/store-four.webp",
    },
];

const Hero = () => {
    return (
        <div className="h-[300px] px-12">
            <div className="text-2xl font-bold mb-16">
                Best Store isn&apos;t just a store, it&apos;s an experience.
            </div>
            <Carousel
                opts={{
                    align: "start",
                }}
                className="w-full"
            >
                <CarouselContent>
                    {storeItems.map((store, index) => (
                        <CarouselItem key={index} className="basis-1/2 lg:basis-1/4">
                            <div className="p-1">
                                <Card>
                                    <a href={store.url}>
                                        <CardContent className="flex aspect-square w-full items-center justify-center p-6 h-[150px]">
                                            <Image
                                                width={200}
                                                height={200}
                                                src={store.image}
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