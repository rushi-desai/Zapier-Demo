"use client"
import { LinkButton } from "./butoons/LinkButton"
import { useRouter } from "next/navigation"
import { PrimaryButton } from "./butoons/PrimaryButton"

export const Appbar=()=>{
    const router = useRouter()
    return <div className="flex border-b justify-between">
       <div className ="flex flex-col justify-center px-15 py-4 text-2xl font-extrabold text-[#413735]">
        Zapier
       </div>

       <div className="flex m-2">
       
        <div className="pr-4 pt-1 font-['Inter',var(--zapier-marketing-font-base,var(--zds-typography-base))] ">
          
          <LinkButton onClick={()=>{}}>
            Contact Sales
         </LinkButton>
         </div>

            <div className='pr-4 font-["Inter",var(--zapier-marketing-font-base,var(--zds-typography-base))] pt-1'>
         <LinkButton onClick={()=>{router.push("/login")}}>
            Login
         </LinkButton>
         </div>

       <div className="pr-4 pt-3 ">
        <PrimaryButton 
        className="rounded-full"
        
        onClick ={()=>{
            router.push("/signup")
         
        }}  >
            Sign Up
        </PrimaryButton>
        </div>
         
       </div>

    </div>
}