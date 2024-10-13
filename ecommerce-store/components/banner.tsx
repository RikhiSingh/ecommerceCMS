import Image from "next/image";

const Banner = () => {
    return (
        <div className="h-[150px] bg-red-300 rounded-b-xl flex justify-around text-white p-10">
            <div className="flex flex-row gap-16 items-center">
                <div className="font-extrabold sm:p-8 text-xl md:text-4xl  md:p-12">
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