import { UserButton, auth } from "@clerk/nextjs";

import { MainNav } from "@/components/main-nav";
import { redirect } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { AdminMainNav } from "./admin-main-nav";

const AdminNavbar = async () => {
    const { userId } = auth();

    if (!userId) {
        redirect("/sign-in");
    }

    return (
        <div className="border-b">
            <div className="flex h-16 items-center px-4">
                <AdminMainNav className="mx-6" />
                <div className="ml-auto flex items-center space-x-4">
                    <ThemeToggle />
                    <UserButton afterSignOutUrl="/" />
                </div>
            </div>
        </div>
    );
}

export default AdminNavbar;