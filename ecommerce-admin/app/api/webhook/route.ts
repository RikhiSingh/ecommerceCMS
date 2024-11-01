import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import prismadb from "@/lib/prismadb";


export async function POST(req: Request) {
    const body = await req.text();
    const signature = headers().get("Stripe-Signature") as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        )
    } catch (error: any) {
        return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
    }

    const session = event.data.object as Stripe.Checkout.Session;

    const address = session?.customer_details?.address;

    const addressComponents = [
        address?.line1,
        address?.line2,
        address?.city,
        address?.state,
        address?.postal_code,
        address?.country,
    ];

    const addressString = addressComponents.filter((c) => c !== null).join(", ");

    if (event.type === "checkout.session.completed") {
        console.log("Updating order...");
        const order = await prismadb.order.update({
            where: {
                id: session?.metadata?.orderId,
            },
            data: {
                isPaid: true,
                address: addressString,
                phone: session?.customer_details?.phone || ''
            },
            include: {
                orderItems: true,
            }
        });
        console.log("Order updated:", order);

        const productIds = order.orderItems.map((orderItem) => orderItem.productId);
        console.log("Updating products...", productIds);

        await prismadb.product.updateMany({
            where: {
                id: {
                    in: [...productIds],
                },
                stockQuantity: {
                    gt: 0, // Only update if quantity is greater than zero
                },
            },
            data: {
                stockQuantity: {
                    decrement: 1,
                },
                isArchived: false, // Ensure it's not archived
            },
        });

        // Archive products with zero quantity
        await prismadb.product.updateMany({
            where: {
                id: {
                    in: [...productIds],
                },
                stockQuantity: 0, // Archive products with zero quantity
            },
            data: {
                isArchived: true,
            },
        });
    }
    console.log("Products updated.");

    return new NextResponse(null, { status: 200 });
}