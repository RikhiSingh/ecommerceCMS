import prismadb from "@/lib/prismadb";

export const adminGetTotalStores = async () => {
    const usersCount = await prismadb.store.count({
        where: {},
    });

    return usersCount;
};