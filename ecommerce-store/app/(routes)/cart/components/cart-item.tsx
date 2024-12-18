"use client";

import Image from "next/image";
import { X } from "lucide-react";

import IconButton from "@/components/ui/icon-button";
import Currency from "@/components/ui/currency";

import { Product } from "@/types";
import { useCart } from "@/context/CartContext";

interface CartItemProps {
  data: Product & { quantity: number }; // Include quantity in the type
}

const CartItem: React.FC<CartItemProps> = ({ data }) => {
  const cart = useCart();

  const onRemove = () => {
    cart.removeItem(data.id);
  };

  return (
    <li className="flex py-6 border-b">
      <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
        <Image
          fill
          src={data.images[0].url}
          alt=""
          className="object-cover object-center"
        />
      </div>
      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="absolute z-10 right-0 top-0">
          <IconButton onClick={onRemove} icon={<X size={15} />} />
        </div>
        <div className="pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div>
            <p className="text-lg font-semibold text-black dark:text-white">{data.name}</p>
            <div className="mt-1 flex text-sm">
              <p className="text-gray-500 dark:text-white ml-4 border-l border-gray-200 pl-4">
                {data.size.name}
              </p>
            </div>
            {/* Display the quantity */}
            <div className="mt-1 text-sm text-gray-500  dark:text-white">
              Quantity: {data.quantity}
            </div>
          </div>
          <div className="mt-4 sm:mt-0 sm:pr-9">
            {/* Display  price for the item */}
            Total Price:&nbsp;
            <Currency value={data.quantity * data.price} />
          </div>
          <div className="pt-4 sm:pt-0 sm:pr-9">
            {/* Display total price for the item */}
            Item Price:&nbsp;
            <Currency value={data.price} />
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
