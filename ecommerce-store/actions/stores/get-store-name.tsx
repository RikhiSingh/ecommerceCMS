import { Store } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_PRODUCT_API_URL}/stores/store-name`;

const getStoreName = async (id: string): Promise<Store> => {
    const response = await fetch(`${URL}?storeId=${id}`, {
        method: "GET",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch store name");
    }

    const data = await response.json();
    return data;
};

export default getStoreName;
