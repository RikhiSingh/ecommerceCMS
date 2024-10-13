import { auth } from "@clerk/nextjs"

const allowedIds = [
    "user_2nJO4YT7Kd96hdx8cfBkNi06gDd",
];

export const getIsAdmin = () => {
    const { userId } = auth();

    if (!userId) {
        return false;
    }

    return allowedIds.indexOf(userId) !== -1;
}