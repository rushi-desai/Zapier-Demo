import { HeroVideo } from "@/components/HeroVideo";
import { Appbar } from "@/components/Appbar";
import { Hero } from "@/components/Hero";
import LogoCloud from "@/components/LogoCloud";
import { ToolkitSection } from "@/components/ToolkitSection";

export default function Home() {
  return (

      <main className="">
       
       <Appbar/>
      
     <div className="max-w-7xl mx-auto gap-12 border-x border-gray-300">
        <Hero/>
        <LogoCloud/>
       {/* <HeroVideo className="w-full h-screen object-cover" /> */}
       <ToolkitSection/>
     </div>
         
      </main>
 
  );
}
