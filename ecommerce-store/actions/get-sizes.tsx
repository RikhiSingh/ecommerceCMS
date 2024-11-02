import prismadb from "@/lib/prismadb";
import { Size } from "@/types";

const getSizes = async (): Promise<Size[]> =>{
    const sizes  = await prismadb.size.findMany({});

    return sizes;
}

export default getSizes;