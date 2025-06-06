// import { cors } from "@/lib/init-middleware";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function POST(
  req: Request
  // res: Response
) {
  // await cors(req, res);
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name, location } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    const store = await prismadb.store.create({
      data: {
        name,
        location,
        userId,
        imageUrl: "",
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORES_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
