import AdminDashboardCards from "@/components/admin/admin-dashboard-card";
import { getIsAdmin } from "@/lib/admin";
import { redirect } from "next/navigation";

const AdminPage = async () => {
    const isAdmin = await getIsAdmin();

    if (!isAdmin) {
        redirect("/");
    }

    return (
        <AdminDashboardCards />
    );
}

export default AdminPage;