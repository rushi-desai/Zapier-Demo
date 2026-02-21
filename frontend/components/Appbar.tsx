"use client"
import { LinkButton } from "./butoons/LinkButton"
import { useRouter } from "next/navigation"
import { PrimaryButton } from "./butoons/PrimaryButton"

export const Appbar=()=>{
    const router = useRouter()
    return <div className="pl-7 flex border-y border-[#514f4c] justify-between bg-[#fff6f0]">
     <div className="relative inline-block px-6 py-4 text-3xl font-extrabold text-[#413735]">
         Zapier
  <div className="ml-1 mb-8 absolute left-0 -bottom-1 h-1 w-5 bg-[#FF4A00]"></div>
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