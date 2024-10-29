export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function GET(req: Request) {
    try {
        const storeId = new URL(req.url).searchParams.get("storeId");

        if (!storeId) {
            return new NextResponse("Store ID is required", { status: 400 });
        }

        const store = await prismadb.store.findUnique({
            where: { id: storeId },
            select: { name: true },
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
