"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export function MainNav({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) {

    const pathname = usePathname();
    const params = useParams();

    const routes = [
        {
            href: `/${params.storeId}`,
            label: 'Dashboard',
            active: pathname === `/${params.storeId}`,
        },
        {
            href: `/${params.storeId}/products`,
            label: 'Products',
            active: pathname === `/${params.storeId}/products`,
        },
        {
            href: `/${params.storeId}/orders`,
            label: 'Orders',
            active: pathname === `/${params.storeId}/orders`,
        },
        {
            href: `/${params.storeId}/settings`,
            // make the the setting that get loaded are only for that storeId
            label: 'Settings',
            active: pathname === `/${params.storeId}/settings`,
        },
        {
            href: `/${params.storeId}/ai`,
            label: 'CommunoCart AI',
            active: pathname === `/${params.storeId}/ai`,
            special: true, // Mark as a special route for different coloring
        },
        {
            href: `/${params.storeId}/courses`,
            // make the the setting that get loaded are only for that storeId
            label: 'Courses',
            active: pathname === `/${params.storeId}/courses`,
            special: true, // Mark as a special route for different coloring
        },
    ];

    return (
        <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
            {routes.map((route) => (
                <Link
                    key={route.href}
                    href={route.href}
                    className={cn("text-sm font-medium transition-colors hover:text-primary",
                        route.active ? "text-black dark:text-white" : "text-muted-foreground",
                        route.special ? "pl-5 text-yellow-500 font-bold text-md" : "",
                    )}
                >
                    {route.label}
                </Link>
            ))}
        </nav>
    )
}