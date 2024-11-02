import prismadb from "@/lib/prismadb";
import { Color } from "@/types";

const getColors = async (): Promise<Color[]> =>{
    const colors = await prismadb.color.findMany({});

    return colors;
}

export default getColors;