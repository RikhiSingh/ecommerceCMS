import Stripe from "stripe";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import prismadb from "@/lib/prismadb";
import { headers } from "next/headers";

const corsHeader = {
    // as one is on 3000 other on 3001
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
    // before post do options request
    return NextResponse.json({}, { headers: corsHeader });
};

export async function POST(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    // retreived from summary.tsx in frontend (in the cart)
    const { productIds } = await req.json();

    if (!productIds || productIds.length === 0) {
        return new NextResponse("Product Ids are required", { status: 400 });
    }

    const products = await prismadb.product.findMany({
        where: {
            id: {
                in: productIds
            }
        }
    });

    // send to stripe
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    products.forEach((product) => {
        line_items.push({
            quantity: 1,
            price_data: {
                currency: 'CAD',
                product_data: {
                    name: product.name,
                },
                unit_amount: product.price.toNumber() * 100
            }
        });
    });

    const order = await prismadb.order.create({
        data: {
            storeId: params.storeId,
            // cuz its a checkout session
            isPaid: false,
            orderItems: {
                create: productIds.map((productId: string) => ({
                    product: {
                        connect: {
                            id: productId
                        }
                    }
                }))
            }
        }
    });

    const session = await stripe.checkout.sessions.create({
        line_items,
        mode: "payment",
        billing_address_collection: "required",
        phone_number_collection: {
            enabled: true
        },
        // the useeffect will understand its success
        success_url: `${process.env.FRONTEND_STORE_URL}/cart?success=1`,
        cancel_url: `${process.env.FRONTEND_STORE_URL}/cart?cancelled=1`,
        metadata: {
            // use the metadata to locate the order and change status to paid
            orderId: order.id
        }
    });

    return NextResponse.json({ url: session.url }, {
        headers: corsHeader
    });
};