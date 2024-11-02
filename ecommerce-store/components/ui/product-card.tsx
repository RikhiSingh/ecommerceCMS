"use client";

import Image from "next/image";
import { MouseEventHandler } from "react";
import { Expand, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

import { CartItem, Product } from "@/types";
import IconButton from "@/components/ui/icon-button";
import Currency from "@/components/ui/currency";
import usePreviewModal from "@/hooks/use-preview-modal";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";

interface ProductCard {
    data: Product;
}

const ProductCard: React.FC<ProductCard> = ({
    data
}) => {
    // console.log("Product data passed to ProductCard:", data); 
    const cart = useCart();
    const previewModal = usePreviewModal();
    const router = useRouter();

    const handleClick = () =>{
        router.push(`/product/${data?.id}`);
    }

    const onPreview: MouseEventHandler<HTMLButtonElement> = (event) =>{
        // this stopProgration will make sure and overwrite that fact that the div returned (item card) has an onClick
        event.stopPropagation();

        previewModal.onOpen(data);
    }
    
    const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) =>{
        // this stopProgration will make sure and overwrite that fact that the div returned (item card) has an onClick
        event.stopPropagation();

        const cartItem: CartItem = {
            ...data,
            quantity: 1, // or some other default quantity
          };

        cart.addItem(cartItem);
        toast.success("Added to cart");
    }
    
    return (
        <div onClick={handleClick} className="bg-white dark:bg-black group cursor-pointer rounded-xl border p-3 space-y-4">
            {/* Images and actions */}
            <div className="aspect-square rounded-xl bg-gray-100 relative">
                <Image
                    src={data?.images?.[0]?.url}
                    fill
                    alt="Image"
                    className="aspect-square object-cover rounded-md"
                />
                <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
                    <div className="flex gap-x-6 justify-center">
                        <IconButton
                            onClick={onPreview}
                            icon={<Expand size={20} className="text-gray-600 dark:text-white" />}
                        />
                        <IconButton
                            onClick={onAddToCart}
                            icon={<ShoppingCart size={20} className="text-gray-600 dark:text-white" />}
                        />
                    </div>
                </div>
            </div>
            {/* description */}
            <div>
                <p className="font-semibold text-lg">
                    {data.name}
                </p>
                <p className="text-sm text-gray-500 dark:text-white">
                    {data.category?.name}
                </p>
            </div>
            {/* Price */}
            <div className="flex items-center justify-between">
                <Currency value={data?.price}/>
            </div>
        </div>
    );
}

export default ProductCard;