import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, DollarSign, Package } from "lucide-react";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { formatter } from "@/lib/utils";
import { getTotalRevenue } from "@/actions/get-total-revenue";
import { getSalesCount } from "@/actions/get-sales-count";
import { getStockCount } from "@/actions/get-stock-count";
import { Overview } from "@/components/overview";
import { getGraphRevenue } from "@/actions/get-graph-revenue";
import Footer from "./_components/footer";

interface DashboardPageProps {
  params: { storeId: string };
}

const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
  const totalRevenue = await getTotalRevenue(params.storeId);
  const salesCount = await getSalesCount(params.storeId);
  const stockCount = await getStockCount(params.storeId);
  const graphData = await getGraphRevenue(params.storeId);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-6 p-8 pt-6">
        <Heading title="Dashboard" titleDescription="Overview of your Store" />
        <Separator />
        <div className="grid gap-6 md:grid-cols-3 sm:grid-cols-1">
          {/* Total Revenue Card */}
          <Card className="border border-gray-300 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatter.format(totalRevenue)}
              </div>
            </CardContent>
          </Card>

          {/* Sales Card */}
          <Card className="border border-gray-300 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Sales
              </CardTitle>
              <CreditCard className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                +{salesCount}
              </div>
            </CardContent>
          </Card>

          {/* Products in Stock Card */}
          <Card className="border border-gray-300 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Products in Stock
              </CardTitle>
              <Package className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {stockCount}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Overview Graph */}
        <Card className="col-span-1 md:col-span-3 border border-gray-300 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            {/* Pass the graph data */}
            <Overview data={graphData} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
