"use client";

import { useEffect, useState } from "react";

import PreviewModal from "@/components/preview-modal";

const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(()=>{
        setIsMounted(true);
    },[]);

    // ofc if we are not mounted return null (prevent hydration error)
    if(!isMounted){
        return null;
    }

    return ( 
        <>
            <PreviewModal />
        </>
     );
}
 
export default ModalProvider;