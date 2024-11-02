import prismadb from "@/lib/prismadb";
import { Category } from "@/types";

const getCategories = async (): Promise<Category[]> =>{
    const categories = await prismadb.category.findMany({
        include: {
            billboard: true,
        },
    });

    return categories;
}

export default getCategories;