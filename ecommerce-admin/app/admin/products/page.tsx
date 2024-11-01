import { Card} from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import prismadb from "@/lib/prismadb";
import { Payment, columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";



async function getData(): Promise<Payment[]> {
    const products = await prismadb.product.findMany({
        select: {
            id: true,
            name: true,
            createdAt: true,
            stockQuantity: true,
            price: true,
            isFeatured: true,
        }
    });

    return products.map(product => {
        const stockQuantity = product.stockQuantity;
        const price = product.price;
        
        // If the product is featured, return "Yes", otherwise return "No"
        const isFeatured = product.isFeatured === true ? "Yes" : "No";

        return {
            id: product.id,
            name: product.name,
            created_at: product.createdAt,
            stockQuantity,
            price: price.toNumber(),
            isFeatured,
        };
    });    
}


const SellersPage = async () => {
    const data = await getData();
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <Heading title="Stores" titleDescription="Manage Stores" />
                <Separator />


                <Card className="col-span-4 pb-6">
                    <div className="container mx-auto mt-6">
                        <DataTable columns={columns} data={data} />
                    </div>
                </Card>
            </div>
        </div>
    );
}

export default SellersPage;