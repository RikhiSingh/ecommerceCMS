"use client";



import { Heading } from "@/components/ui/heading";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";

import { OrderColumn, columns } from "./columns";

interface OrderClientProps {
    data: OrderColumn[]
}

export const OrderClient: React.FC<OrderClientProps> = ({
    data
}) => {
    return (
        <>
            <Heading
                title={`Orders (${data.length})`}
                titleDescription="Manage orders for your store"
            />
            <Separator />

            <DataTable searchKey="products" columns={columns} data={data} />
        </>
    )
}