import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function SetupLayout({
    children
}:{
    children: React.ReactNode;
}){
    const {userId} = auth();

    if(!userId){
        redirect('/sign-in')
    }

    // load first store available
    const store= await prismadb.store.findFirst({
        where:{
            userId
        }
    });

    // if the store retrived from above exists redirect us to to that [storeId] which leads to dashboard which will confirm the same that storeId exists from cuurent logged in used if it doesnt go to root else render navigation bar and children
    if (store){
        redirect(`/${store.id}`);
    }

    return(
        <>
            {children}
        </>
    )
}