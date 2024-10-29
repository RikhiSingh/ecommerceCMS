import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function DELETE(
    // unused
    req: Request,
    // params only available in the second argument of it
    { params }: { params: { storeId: string } }
) {
    try {

        if (!params.storeId) {
            return new NextResponse("Store ID is required", { status: 400 });
        }

        // need tyo use Delete many as we userId is not unique
        const store = await prismadb.store.deleteMany({
            where: {
                id: params.storeId,
            }
        });

        return NextResponse.json(store);


    } catch (error) {
        console.log('[ADMIN_STORE_DELETE]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}