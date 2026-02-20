"use client"

import { ReactNode } from "react";

export const LinkButton =({children ,onClick}:{children:ReactNode , onClick:()=>void})=>{
    return <div onClick={onClick} className="cursor-pointer px-4 py-4 text-[#413735] hover:bg-[#f5f3eb] font-medium rounded-md">
        {children}
    </div>
}