import dynamic from "next/dynamic";
import { PrismaClient } from "@prisma/client";
const MapComponent = dynamic(() => import('../components/map-component'), { ssr: false });

const prisma = new PrismaClient();

const StoreLocator = async () => {
    // const stores = await getStores({});
    const stores = await prisma.store.findMany();

    return (
        <div className="bg-gray-100 rounded-lg">
            <h1 className="text-center text-4xl text-[#f89114] font-extrabold mt-2 mb-2">Store&apos;s In the region</h1>
            <MapComponent stores={stores} />
        </div>
    );
}

export default StoreLocator;