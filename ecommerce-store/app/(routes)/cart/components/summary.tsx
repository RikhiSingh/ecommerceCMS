"use client";

import axios from "axios";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";

import Button from "@/components/ui/my-button";
import Currency from "@/components/ui/currency";
import { useCart } from "@/context/CartContext";

const Summary = () => {
    const searchParams = useSearchParams();
    const cart = useCart(); // Corrected usage
    const { items, removeAll } = cart; // Destructure items and removeAll

    useEffect(() => {
        if (searchParams.get("success")) {
            toast.success("Payment completed.");
            removeAll();
        }

        if (searchParams.get("cancelled")) {
            toast.error("Something went wrong.");
        }
    }, [searchParams, removeAll]);

    // Corrected total price calculation
    const totalPrice = items.reduce((total, item) => {
        return total + Number(item.price) * item.quantity;
    }, 0);

    const onCheckout = async () => {
        if (items.length === 0) {
            toast.error("Your cart is empty.");
            return;
        }

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
                {
                    items: items.map((item) => ({
                        productId: item.id,
                        quantity: item.quantity,
                    })),
                }
            );
            window.location.href = response.data.url;
        } catch (error) {
            toast.error("Failed to initiate checkout.");
            console.error(error);
        }
    };

    return (
        <div
            className="
                mt-16
                rounded-lg
                bg-gray-50
                dark:bg-black
                dark:border
                px-4
                py-6
                sm:p-6
                lg:col-span-5
                lg:mt-0
                lg:p-8
            "
        >
            <h2 className="text-lg font-medium text-gray-900  dark:text-white">
                Order Summary
            </h2>
            <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <div className="text-base font-medium text-gray-900  dark:text-white">
                        Order Total
                    </div>
                    <Currency value={totalPrice} />
                </div>
            </div>
            <Button
                disabled={items.length === 0}
                onClick={onCheckout}
                className="w-full mt-6 bg-green-800 hover:bg-green-600"
            >
                Checkout
            </Button>
        </div>
    );
};

export default Summary;
