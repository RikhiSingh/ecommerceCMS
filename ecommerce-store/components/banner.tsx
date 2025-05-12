import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

const Banner = () => {
  return (
    <div className="h-[170px] bg-green-800 flex justify-around text-white p-10">
      <div className="flex flex-row gap-16 items-center">
        <div className="font-extrabold sm:p-8 text-xl md:text-4xl  md:p-12">
          <p>Order Local growns in your region!</p>
          <p className="hidden lg:block mt-1">No Subscription Fee!</p>
          <Button className="bg-red-500">
            <Link
              href={"https://communocart.vercel.app/"}
              target="_blank"
            >
              Gardener Sign Up
            </Link>
          </Button>
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
};

export default Banner;
