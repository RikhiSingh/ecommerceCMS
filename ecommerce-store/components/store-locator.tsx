import getStores from "@/actions/get-store-locations";

const StoreLocator = async () => {
    const stores = await getStores({});
    console.log("stores:", stores);
    return (

        <div>
            {stores.map((store) => (
                <div key={store.id}>
                    <p>{store.name}</p>
                    <p>{store.location}</p>
                </div>
            ))}
        </div>
    );
}

export default StoreLocator;