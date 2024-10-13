import prismadb from "@/lib/prismadb";

export const adminGetSalesCount = async () => {
    const salesCount = await prismadb.order.count({
        where: {
            isPaid: true,
        },
    });

    return salesCount;
};