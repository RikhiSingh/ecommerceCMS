"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export function AdminMainNav({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) {

    const pathname = usePathname();
    const params = useParams();

    const routes = [
        {
            href: `/admin`,
            label: 'Dashboard',
            active: pathname === `/admin`,
        },
        {
            href: `/admin/stores`,
            label: 'Stores',
            active: pathname === `/admin/stores`,
        },
        {
            href: `/admin/products`,
            label: 'Products',
            active: pathname === `/admin/products`,
        }
    ];

    return (
        <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
            {routes.map((route) => (
                <Link
                    key={route.href}
                    href={route.href}
                    className={cn("text-sm font-medium transition-colors hover:text-primary",
                        route.active ? "text-black dark:text-white" : "text-muted-foreground",
                    )}
                >
                    {route.label}
                </Link>
            ))}
        </nav>
    )
}