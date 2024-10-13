import { CreditCard, DollarSign, Package } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Heading } from "../ui/heading";
import { Separator } from "../ui/separator";
import { Overview } from "../overview";
import { adminGetTotalRevenue } from "@/actions/admin/admin-get-total-revenue";
import { adminGetSalesCount } from "@/actions/admin/admin-get-sales-count";
import { adminGetStockCount } from "@/actions/admin/admin-get-stock-count";
import { adminGetGraphRevenue } from "@/actions/admin/admin-get-graph-revenue";
import { formatter } from "@/lib/utils";
import { adminGetTotalUsers } from "@/actions/admin/admin-get-users-count";

const AdminDashboardCards = async () => {

    const totalRevenue = await adminGetTotalRevenue();
    const salesCount = await adminGetSalesCount();
    const stockCount = await adminGetStockCount();
    const graphData = await adminGetGraphRevenue();
    const totalUsers = await adminGetTotalUsers();

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <Heading title="Dashboard" titleDescription="Overview of your Store" />
                <Separator />
                <div className=" grid gap-4 grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Revenue
                            </CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {formatter.format(totalRevenue)}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Sales
                            </CardTitle>
                            <CreditCard className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                +{salesCount}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Products in Stock
                            </CardTitle>
                            <Package className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {stockCount}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Sellers
                            </CardTitle>
                            <Package className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {totalUsers}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>
                            Overview
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        {/* pass the graph data */}
                        <Overview data={graphData} />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default AdminDashboardCards;