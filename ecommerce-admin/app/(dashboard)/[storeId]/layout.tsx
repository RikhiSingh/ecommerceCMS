import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";

export default async function Dashboard({
    children,
    // params is in what store Id will be stored
    params
}: {
    children: React.ReactNode;
    params: { storeId: string }
}) {
    const { userId } = auth();

    if(!userId){
        redirect('/sign-in');
    }

    const store = await prismadb.store.findFirst({
        where:{
            id: params.storeId,
            userID: userId
        }
    });

    if(!store){
        redirect('/');
    }

    return (
        <>
            <div>This will be a navbar</div>
            {children}        
        </>
    )
}