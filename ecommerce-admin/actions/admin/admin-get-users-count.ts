import prismadb from "@/lib/prismadb";

export const adminGetTotalUsers = async () => {
    const usersCount = await prismadb.store.count({
        where: {},
    });

    return usersCount;
};