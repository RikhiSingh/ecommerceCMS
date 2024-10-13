"use client";

import { Dialog } from "@headlessui/react";
import { Category } from "@/types";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import IconButton from "./ui/icon-button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface MobileMainNavProps {
    data: Category[];
}

const MobileMainNav: React.FC<MobileMainNavProps> = ({ data }) => {
    const pathname = usePathname();
    const routes = data.map((route) => ({
        href: `/category/${route.id}`,
        label: route.name,
        active: pathname === `/category/${route.id}`
    }));

    const [open, setOpen] = useState(false);

    const onOpen = () => setOpen(true);
    const onClose = () => setOpen(false);

    return (
        <>
            <Button
                onClick={onOpen}
                className="flex items-center gap-x-2 lg:hidden"
                variant="outline"
            >
                <Menu size={20} />
            </Button>

            <Dialog
                open={open}
                as="div"
                className="relative z-40 lg:hidden"
                onClose={onClose}
            >
                {/* Background */}
                <div className="fixed inset-0 bg-black bg-opacity-25" />

                {/* Dialog position */}
                <div className="fixed inset-0 z-40 flex">
                    <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
                        {/* Close Button */}
                        <div className="flex items-center justify-end px-4 mb-6">
                            <IconButton
                                icon={<X size={15} />}
                                onClick={onClose}
                            />
                        </div>

                        {/* Render the filters */}
                        <div className="lg:hidden block">
                            <nav
                                className="mx-6 flex flex-col gap-4 lg:space-x-6"
                            >
                                {routes.map((route) => (
                                    <Link
                                        key={route.href}
                                        href={route.href}
                                        className={cn(
                                            "text-xl font-medium transition-colors pl-4 hover:text-black",
                                            route.active ? "text-black" : "text-neutral-500"
                                        )}
                                    >
                                        {route.label}
                                    </Link>
                                ))}
                            </nav>
                        </div>

                    </Dialog.Panel>
                </div>

            </Dialog>
        </>
    );
}

export default MobileMainNav;