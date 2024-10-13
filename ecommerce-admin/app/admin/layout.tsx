import AdminNavbar from "@/components/admin/admin-navbar";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <AdminNavbar />
            {children}        
        </>
    )
}