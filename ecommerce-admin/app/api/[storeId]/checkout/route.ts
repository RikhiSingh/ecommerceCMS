// app/api/[storeId]/checkout/route.ts

import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb'; // Adjust the path as necessary
import { stripe } from '@/lib/stripe'; // Ensure Stripe is correctly initialized
import { Stripe } from 'stripe';

// Define allowed origins
const allowedOrigins = ['http://localhost:3001']; // Add more origins as needed

// CORS Headers
const corsHeaders = {
  'Access-Control-Allow-Origin': allowedOrigins[0],
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// Handle OPTIONS requests for CORS preflight
export async function OPTIONS(request: Request, { params }: { params: { storeId: string } }) {
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders,
  });
}

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    // Parse the request body to extract items
    const { items } = await req.json();

    // Validate that items exist and is an array
    if (!items || !Array.isArray(items) || items.length === 0) {
      return new NextResponse(JSON.stringify({ error: 'No items provided for checkout.' }), {
        status: 400,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      });
    }

    // Extract product IDs from the items
    const productIds = items.map((item: { productId: string }) => item.productId);

    // Fetch products from the database
    const products = await prismadb.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
    });

    // Check if all products exist
    if (products.length !== productIds.length) {
      return new NextResponse(JSON.stringify({ error: 'Some products were not found.' }), {
        status: 400,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      });
    }

    // Construct Stripe line items with quantities
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = products.map(
      (product) => {
        const item = items.find((i: { productId: string }) => i.productId === product.id);
        return {
          quantity: item?.quantity || 1, // Default to 1 if quantity is not provided
          price_data: {
            currency: 'CAD',
            product_data: {
              name: product.name,
              // Optionally, add more product details like images
              // images: [product.imageUrl],
            },
            unit_amount: Math.round(product.price.toNumber() * 100), // Convert to cents
          },
        };
      }
    );

    // Create an order in the database
    const order = await prismadb.order.create({
      data: {
        storeId: params.storeId,
        isPaid: false,
        orderItems: {
          create: items.map((item: { productId: string; quantity: number }) => ({
            product: {
              connect: { id: item.productId },
            },
            quantity: item.quantity,
          })),
        },
      },
    });

    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      billing_address_collection: 'required',
      phone_number_collection: {
        enabled: true,
      },
      success_url: `${process.env.FRONTEND_STORE_URL}/cart?success=1`,
      cancel_url: `${process.env.FRONTEND_STORE_URL}/cart?cancelled=1`,
      metadata: {
        orderId: order.id, // Embed order ID for post-payment processing
      },
    });

    // Respond with the Stripe session URL
    return new NextResponse(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Checkout Error:', error);

    // Handle known Stripe errors
    if (error instanceof Stripe.errors.StripeError) {
      return new NextResponse(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      });
    }

    // Handle other errors
    return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
    });
  }
}
