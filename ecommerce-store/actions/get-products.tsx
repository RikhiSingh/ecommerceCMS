import { Product } from "@/types";
import qs from "query-string";

const URL = `${process.env.NEXT_PUBLIC_PRODUCT_API_URL}/products`;

interface Query {
    categoryId?: string;
    colorId?: string;
    sizeId?: string;
    isFeatured?: boolean;
}

const getProducts = async (query: Query): Promise<Product[]> => {

    // console.log("getProducts called with query:", query); 
    const url = qs.stringifyUrl({
        url: URL,
        query: {
            colorId: query.colorId,
            sizeId: query.sizeId,
            categoryId: query.categoryId,
            isFeatured: query.isFeatured,
        }
    });
    // console.log("Fetching products from URL:", url);

    const res = await fetch(url);
    const products: Product[] = await res.json();

    // console.log("API Response for products:", products); 

    return products;
};

export default getProducts;
