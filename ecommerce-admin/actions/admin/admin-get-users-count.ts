import prismadb from "@/lib/prismadb";

export const adminGetTotalUsers = async () => {
    const uniqueUsers = await prismadb.store.findMany({
        distinct: ['userId'], // Find distinct userIds
        select: {
            userId: true, // Only select the userId
        },
    });

    return uniqueUsers.length; // Return the count of unique userIds
};
