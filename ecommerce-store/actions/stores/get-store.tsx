import { Product } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_PRODUCT_API_URL}/stores/store-products`;

const getStoreProducts = async (id: string): Promise<Product[]> => {
    const response = await fetch(`${URL}?storeId=${id}`, {
        method: "GET",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch store products");
    }

    const data = await response.json();
    return data;
};

export default getStoreProducts;
