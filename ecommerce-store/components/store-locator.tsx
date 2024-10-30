
import getStores from "@/actions/get-store-locations";
import MapComponent from "./map-component";

const StoreLocator = async () => {
    const stores = await getStores({});

    return (
        <div className="bg-gray-100 rounded-lg">
            <h1 className="text-center text-4xl text-[#f89114] font-extrabold mt-2 mb-2">Store&apos;s In the region</h1>
            <MapComponent stores={stores} />
        </div>
    );
}

export default StoreLocator;