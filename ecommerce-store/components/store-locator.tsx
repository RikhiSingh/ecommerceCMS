import dynamic from "next/dynamic";
import prismadb from "@/lib/prismadb";
const MapComponent = dynamic(() => import('../components/map-component'), { ssr: false });

const StoreLocator = async () => {
    const stores = await prismadb.store.findMany();

    return (
        <div className="rounded-lg p-4">
            <h1 className="text-center text-4xl text-[#052e15] font-extrabold mt-2 mb-4">Stores In the Region</h1>
            <MapComponent stores={stores} />
        </div>
    );
}

export default StoreLocator;