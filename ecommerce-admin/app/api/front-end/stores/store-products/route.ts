export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function GET(req: Request, { params }: { params: { storeId: string }}) {
    try {
        const { storeId } = params;

        if (!storeId) {
            return new NextResponse("Store ID is required", { status: 400 });
        }

        // Fetch products for the specified storeId
        const products = await prismadb.product.findMany({
            where: {
                storeId: storeId, // Filter products by storeId
            },
            include: {
                images: {
                    select: {
                        url: true,
                    }
                }
            }
        });

        return NextResponse.json(products);
    } catch (error) {
        console.log('[STORES_PRODUCTS_GET]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
