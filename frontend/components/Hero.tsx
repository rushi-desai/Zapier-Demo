"use client"
import { PrimaryButton } from "./butoons/PrimaryButton";
import { useRouter } from 'next/navigation'

export const Hero = () => {
    const router = useRouter();
    
    return (
        <div className="flex flex-col md:flex-row items-center justify-between px-8 py-16 max-w-7xl mx-auto gap-12">
            
            {/* Left Side: Text Content */}
            <div className="flex-1 text-left">
                <h1 className="text-5xl md:text-6xl font-bold text-[#413735] leading-[1.1]">
                    Transformative AI for every team
                </h1>
                
                <p className="text-xl font-normal text-[#413735] mt-6 leading-relaxed max-w-md">
                    Zapier unlocks transformative AI to safely scale workflows, agents, and MCP 
                    with the world's most connected ecosystem of 8,000+ integrations.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
                    {/* Email Signup Button */}
                    <PrimaryButton 
                        onClick={() => router.push("/signup")}
                        className="w-full sm:w-auto px-8 py-4 bg-[#FF4F00] text-white font-bold rounded-sm hover:bg-[#e64600] transition-all text-lg"
                    >
                        Start free with email
                    </PrimaryButton>

                    {/* Google Signup Button */}
                    <button 
                        onClick={() => window.location.href = "/api/auth/google"}
                        className="flex items-center justify-center gap-3 w-full sm:w-auto px-4 py-4 border border-gray-300 bg-white text-[#413735] font-bold rounded-sm hover:bg-gray-50 transition-all shadow-sm text-lg"
                    >
                        <img 
                            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
                            alt="Google" 
                            className="w-5 h-5" 
                        />
                        <span>Start free with Google</span>
                    </button>
                </div>
                
              <div className="flex flex-row justify-start items-center mt-6 gap-10">
               <p className="mt-4 text-sm text-gray-500">Soc 2 (type II) - GDPR - CCPA</p>
                <p className="mt-4 text-sm text-gray-500">GDPR and CCPA compliant</p>
              </div>
                
            </div>  
                  

            {/* Right Side: The Image */}
            <div className="flex-1 w-full">
                <img 
                    src="zap.avif" 
                    alt="Zapier dashboard" 
                    className="w-full h-auto rounded-xl " 
                />
            </div>
            
        </div>
    );
}