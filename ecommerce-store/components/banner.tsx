import Image from "next/image";

const Banner = () => {
    return (
        <div className="h-[150px] bg-red-300 flex justify-around text-white">
            <div className="flex flex-row gap-16 items-center">
                <div className="text-4xl font-extrabold">
                    <p>
                        Order Local growns in your region!
                    </p>
                    <p>
                        Right now!
                    </p>
                </div>
                <div className="rounded-md">
                    <Image
                        src={"/img/banner.jpeg"}
                        alt="Banner"
                        width={180}
                        className="rounded-lg"
                        height={140}
                    />
                </div>
            </div>
        </div>
    );
}

export default Banner;