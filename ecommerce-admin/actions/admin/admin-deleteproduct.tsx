"use server";

import prismadb from "@/lib/prismadb";



export const adminDeleteProduct = async (productId: string) => {
    try {

        await prismadb.product.delete({
            where: {
                id: productId
            }
        })
    } catch (error) {
        console.log(error)
    }
}