"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";

import Button from "@/components/ui/my-button";
import Currency from "@/components/ui/currency";
import { useCart } from "@/context/CartContext";

const Summary = () => {
  const searchParams = useSearchParams();
  const cart = useCart();
  const { items, removeAll } = cart;

  const [showOptions, setShowOptions] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "etransfer">(
    "cash"
  );
  const [pickupTime, setPickupTime] = useState("");

  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Payment completed.");
      removeAll();
    }
    if (searchParams.get("cancelled")) {
      toast.error("Something went wrong.");
    }
  }, [searchParams, removeAll]);

  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price) * item.quantity;
  }, 0);

  const onPlaceOrder = () => {
    if (items.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }
    // first show payment + pickup options
    setShowOptions(true);
  };

  const onConfirm = async () => {
    if (!pickupTime) {
      toast.error("Please select a pickup time.");
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
          paymentMethod,
          pickupTime,
        }
      );
      window.location.href = response.data.url;
    } catch (error) {
      toast.error("Failed to initiate checkout.");
      console.error(error);
    }
  };

  return (
    <>
      <div
        className="
          mt-16 rounded-lg bg-gray-50 dark:bg-black dark:border
          px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8
        "
      >
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          Order Summary
        </h2>
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between border-t border-gray-200 pt-4">
            <div className="text-base font-medium text-gray-900 dark:text-white">
              Order Total
            </div>
            <Currency value={totalPrice} />
          </div>
        </div>
        <Button
          disabled={items.length === 0}
          onClick={onPlaceOrder}
          className="w-full mt-6 bg-green-800 hover:bg-green-600"
        >
          Place Order
        </Button>
      </div>

      {showOptions && (
        <div className="fixed max-w-xl bottom-0 inset-x-0 bg-white dark:bg-gray-900 border-t p-4 shadow-lg">
          <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">
            Payment & Pickup
          </h3>

          {/* Payment Method */}
          <div className="mb-4">
            <span className="block font-medium text-gray-700 dark:text-gray-300">
              Payment Method
            </span>
            <label className="inline-flex items-center mr-4">
              <input
                type="radio"
                name="payment"
                value="cash"
                checked={paymentMethod === "cash"}
                onChange={() => setPaymentMethod("cash")}
                className="form-radio"
              />
              <span className="ml-2 text-gray-700 dark:text-gray-300">
                Cash
              </span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="payment"
                value="etransfer"
                checked={paymentMethod === "etransfer"}
                onChange={() => setPaymentMethod("etransfer")}
                className="form-radio"
              />
              <span className="ml-2 text-gray-700 dark:text-gray-300">
                eTransfer
              </span>
            </label>
          </div>

          {/* Pickup Time */}
          <div className="mb-4">
            <label
              htmlFor="pickupTime"
              className="block font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Pickup Time
            </label>
            <input
              id="pickupTime"
              type="time"
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
              className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </div>

          <Button
            onClick={onConfirm}
            className="w-full bg-blue-700 hover:bg-blue-500"
          >
            Confirm & Checkout
          </Button>
        </div>
      )}
    </>
  );
};

export default Summary;
