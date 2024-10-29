import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function GET() {
    try {
        // Fetch products irrespective of the storeId
        const stores = await prismadb.store.findMany({
            where: {},
        });

        return NextResponse.json(stores);
    } catch (error) {
        console.log('[STORES_GET]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
