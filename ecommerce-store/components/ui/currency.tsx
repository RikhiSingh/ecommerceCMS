"use client";

import { useEffect, useState } from "react";

// ^^^ to prevent hydration errors 

export const formatter = new Intl.NumberFormat("en-US", {
    style: 'currency',
    currency: 'CAD'
});

interface CurrencyProps{
    value?: string | number;
}

const Currency: React.FC<CurrencyProps> = ({
    value
}) => {
    const[isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if(!isMounted){
        return null;
    }

    return (
        <strong className="font-semibold">
            {formatter.format(Number(value))}
        </strong>);
}

export default Currency;