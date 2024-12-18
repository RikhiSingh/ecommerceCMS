"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { DataTable } from "@/components/ui/data-table";

import { ProductColumn, columns } from "./columns";
import { ApiList } from "@/components/ui/api-list";
import { Separator } from "@/components/ui/separator";

interface ProductClientProps{
    data: ProductColumn[]
}

export const ProductClient: React.FC<ProductClientProps> = ({
    data    
}) => {

    const router = useRouter();
    const params = useParams();

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Products (${data.length})`}
                    titleDescription="Manage products for your store"
                />
                <Button onClick={() => router.push(`/${params.storeId}/products/new`)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New
                </Button>
            </div>
            <Separator />

            <DataTable searchKey="name" columns={columns} data={data}/>

            {/* <Heading title="API" titleDescription="API calls for Products"/>

            <Separator />   

            <ApiList entityName="products" entityIdName="productId"/> */}
        </>
    )
}