import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import prismadb from "@/lib/prismadb";

interface DashboardPageProps {
    params: { storeId: string }
};

const DashboardPage: React.FC<DashboardPageProps> = async ({
    // destructure the params
    params
}) => {
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <Heading title="Dashboard" description="Overview of your Store"/>
                <Separator />
                <div className=" grid gap-4 grid-cols-3">
                    
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;