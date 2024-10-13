import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import prismadb from "@/lib/prismadb";
import { Payment, columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";



async function getData(): Promise<Payment[]> {
    const stores = await prismadb.store.findMany({
        select: {
            id: true,
            name: true,
            userId: true,
            createdAt: true,
            _count: {
                select: { products: true }, // Get total number of products for each store
            },
            orders: {
                where: { isPaid: true },
                select: {
                    orderItems: {
                        select: {
                            product: {
                                select: { price: true }
                            }
                        }
                    }
                }
            }
        }
    });

    return stores.map(store => {
        const soldProducts = store.orders.reduce((count, order) => count + order.orderItems.length, 0);
        const totalWorth = store.orders.reduce((total, order) => {
            return total + order.orderItems.reduce((sum, item) => sum + item.product.price.toNumber(), 0);
        }, 0);

        return {
            id: store.id,
            name: store.name,
            userId: store.userId,
            created_at: store.createdAt,
            totalProducts: store._count.products, // Total number of products in store
            soldProducts, // Total number of sold products
            totalWorth // Total worth of sold products
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