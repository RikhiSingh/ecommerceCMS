"use client";

import { ShoppingCart } from "lucide-react";
import { Product } from "@/types";
import Currency from "@/components/ui/currency";
import Button from "@/components/ui/my-button";
import { useState } from "react";
import Select from "react-select";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";

interface InfoProps {
  data: Product;
}

const Info: React.FC<InfoProps> = ({ data }) => {
  const cart = useCart();
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1); // State to manage selected quantity

  const onAddToCart = () => {
    cart.addItem({ ...data, quantity: selectedQuantity }); // Add selected quantity to cart
    toast.success("Added to cart");
  };

  // Generate quantity options based on available stock (max 10)
  const quantityOptions = Array.from(
    { length: Math.min(data.stockQuantity, 10) },
    (_, i) => ({
      value: i + 1,
      label: (i + 1).toString(),
    })
  );

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        {data.name}
      </h1>
      <div className="mt-3 flex items-end justify-between">
        <p className="text-2xl text-gray-900 dark:text-white">
          <Currency value={data?.price} />
          <span className="ml-2 text-sm text-gray-600">/lb</span>
        </p>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-y-6">
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black dark:text-white">Size:</h3>
          <div>{data?.size?.name}</div>
        </div>
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black dark:text-white">Color:</h3>
          <div
            className="h-6 w-6 rounded-full border border-gray-600"
            style={{ backgroundColor: data?.color?.value }}
          />
        </div>
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black dark:text-white">
            Quantity Left:
          </h3>
          <div>{data?.stockQuantity}</div>
        </div>
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black dark:text-white">
            Select Quantity:
          </h3>
          <Select
            options={quantityOptions}
            value={quantityOptions.find(
              (option) => option.value === selectedQuantity
            )} // Set selected value
            onChange={(newValue) => setSelectedQuantity(newValue?.value || 1)} // Set selected quantity
          />
        </div>
      </div>
      <div className="mt-10 flex items-center gap-x-3">
        <Button
          onClick={onAddToCart}
          className="flex items-center gap-x-2 bg-green-800"
        >
          Add to Cart
          <ShoppingCart />
        </Button>
      </div>
      <hr className="my-4" />
      <div className="mt-2 flex items-center gap-x-3">
        <h1 className="text-xl text-gray-900 dark:text-white font-bold">
          Description:
        </h1>
      </div>
      <div className="mt-4">{data.description}</div>
    </div>
  );
};

export default Info;
