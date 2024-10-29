import { Store } from "@/types";
import qs from "query-string";

const URL = `${process.env.NEXT_PUBLIC_PRODUCT_API_URL}/stores`;

interface Query {
    storeId?: string,
    storeName?: string,
    storeLocation?: string
}

const getStores = async (query: Query): Promise<Store[]> => {

    // console.log("getProducts called with query:", query); 
    const url = qs.stringifyUrl({
        url: URL,
        query: {
            storeId: query.storeId,
            storeName: query.storeName,
            storeLocation: query.storeLocation
        }
    });
    // console.log("Fetching products from URL:", url);

    const res = await fetch(url);
    const stores: Store[] = await res.json();

    // console.log("API Response for products:", products); 

    return stores;
};

export default getStores;
