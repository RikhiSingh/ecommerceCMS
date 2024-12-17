"use client";

import { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";

import Button from "@/components/ui/my-button";
import { useCart } from "@/context/CartContext";
import { ModeToggle } from "./toggle-button";

const NavbarActions = () => {
    // to prevent hydration
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const router = useRouter();

    const cart = useCart();

    if (!isMounted) {
        return null;
    }

    return (
        <div className="ml-auto flex items-center gap-x-4">
            {/* <ModeToggle /> */}
            <Button onClick={() => router.push("/cart")} className="flex items-center rounded-full bg-black px-4 py-2 dark:border dark:border-input dark:bg-background dark:shadow-sm dark:hover:bg-accent dark:hover:text-accent-foreground">
                <ShoppingBag
                    size={20}
                    color="white"
                />
                <span className="ml-2 text-sm font-medium text-white">
                    {cart.items.length}
                </span>
            </Button>
        </div>
    );
}

export default NavbarActions;