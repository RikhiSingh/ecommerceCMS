"use server";

import prismadb from "@/lib/prismadb";

export const adminSetToFeatured = async (productId: string) => {
    try {

        await prismadb.product.update({
            where: {
                id: productId
            },
            data: {
                isFeatured: true
            }
        })
    } catch (error) {
        console.log(error)
    }
}