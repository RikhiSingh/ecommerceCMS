import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function GET(req: Request, { params }: { params: { storeId: string } }) {
    try {
        const { storeId } = params;

        if (!storeId) {
            return new NextResponse("Store ID is required", { status: 400 });
        }

        // Fetch the store name for the specified storeId
        const store = await prismadb.store.findUnique({
            where: {
                id: storeId,
            },
            select: {
                name: true, // Only select the name field
            },
        });

        if (!store) {
            return new NextResponse("Store not found", { status: 404 });
        }

        return NextResponse.json(store);
    } catch (error) {
        console.log('[STORES_Name_GET]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
