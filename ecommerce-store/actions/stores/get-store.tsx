import prismadb from "@/lib/prismadb";
import { Product } from "@/types";

export const getStoreProducts = async (storeId: string): Promise<Product[]> => {
    const products = await prismadb.product.findMany({
        where: {
            storeId: storeId,
            isArchived: false
        },
        include: {
            category: {
                include: {
                    billboard: true
                }
            }, // Includes the related Category data
            size: true,     // Includes the related Color data
            images: true,
        }
    });

    return products.map(product => ({
        id: product.id,
        category: product.category as Product["category"],
        name: product.name,
        price: Number(product.price),  // Convert Decimal to number
        description: product.description,
        stockQuantity: product.stockQuantity,
        isFeatured: product.isFeatured,
        size: product.size as Product["size"],
        images: product.images as Product["images"],
    }));

};
