"use client"
import { PrimaryButton } from "./butoons/PrimaryButton";
import { useRouter } from 'next/navigation'
import { Feature } from "./Feature";

export const Hero = () => {
    const router = useRouter();
    
    return (
        <div className="flex flex-col md:flex-row items-center justify-between px-8 py-20 max-w-7xl mx-auto gap-16">
            
            {/* Left Side: Text Content */}
            <div className="flex-[1.2] text-left">
                {/* Fixed line-height (leading) and font-weight */}
                <h1 className="text-5xl md:text-7xl font-semibold text-[#1F1F1F] tracking-tight leading-[1.05]">
                    Transformative AI for every team
                </h1>
                
                {/* Increased max-width and adjusted color to be softer but readable */}
                <p className="text-[22px] font-normal text-[#413735] mt-8 leading-[1.4] max-w-xl">
                    Zapier unlocks transformative AI to safely scale workflows, 
                    agents, and MCP with the world's most connected ecosystem of 
                    8,000+ integrations.
                </p>

                <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
                    <PrimaryButton 
                        onClick={() => router.push("/signup")}
                        className="w-full sm:w-auto px-10 py-4 bg-[#FF4F00] text-white font-bold rounded-md hover:bg-[#e64600] transition-all text-lg shadow-sm"
                    >
                        Start free with email
                    </PrimaryButton>

                    <button 
                        onClick={() => window.location.href = "/api/auth/google"}
                        className="flex items-center justify-center gap-3 w-full sm:w-auto px-10 py-4 border border-gray-300 bg-white text-[#1F1F1F] font-bold rounded-md hover:bg-gray-50 transition-all shadow-sm text-lg"
                    >
                        <img 
                            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
                            alt="Google" 
                            className="w-5 h-5" 
                        />
                        <span>Start free with Google</span>
                    </button>
                </div>
                
                {/* Feature tags footer */}
                <div className="flex flex-wrap justify-start items-center mt-10 gap-x-12 gap-y-4">
                    <Feature title="SOC 2 (TYPE II) - GDPR - CCPA" subtitle="" />
                    <Feature title="GDPR AND CCPA COMPLIANT" subtitle="" />
                </div>
            </div>  

            {/* Right Side: The Image */}
            <div className="flex-1 w-full flex justify-end">
                <img 
                    src="zap.avif" 
                    alt="Zapier dashboard" 
                    className="w-full h-auto object-contain" 
                />
            </div>
            
        </div>
    );
}