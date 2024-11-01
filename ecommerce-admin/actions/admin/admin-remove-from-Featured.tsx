"use server";

import prismadb from "@/lib/prismadb";

export const adminRemoveFromFeatured = async (productId: string) => {
    try {

        await prismadb.product.update({
            where: {
                id: productId
            },
            data: {
                isFeatured: false
            }
        })
    } catch (error) {
        console.log(error)
    }
}