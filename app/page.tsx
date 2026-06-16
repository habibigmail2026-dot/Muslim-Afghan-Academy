"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";
import Image from "next/image";
import { Check } from "lucide-react";

// No Logo needed


export default function Home() {
  const { user } = useAuth();
  const [hoveredBtn, setHoveredBtn] = React.useState<"whatsapp" | "email" | null>(null);

  return (
    <div className="min-h-screen flex flex-col font-sans select-none bg-white text-[#299A8E] overflow-x-hidden relative">
      {/* Top Section - Cream background */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-6 md:px-12 pt-6 pb-20 flex flex-col items-stretch">
        
        {/* Header removed from here */}

        {/* Hero Area Split Left/Right */}
        <div className="flex flex-col md:flex-row relative">
          
          {/* Left Text content */}
          <div className="w-full md:w-1/2 flex flex-col z-10 pt-10">
            <h1 className="flex flex-col uppercase m-0 leading-[0.8] tracking-tighter text-[#299A8E]">
              <span className="text-[4.5rem] md:text-[6.5rem] font-black">MUSLIM</span>
              <span className="text-[4.5rem] md:text-[6.5rem] font-black">AFGHAN</span>
            </h1>
            
            <div className="mt-2 mb-8 items-start flex">
               <span className="bg-[#E27D22] text-white px-6 py-2 text-2xl md:text-4xl font-extrabold uppercase inline-block rounded-md tracking-wider shadow-sm">
                 ACADEMY
               </span>
            </div>
            
            <p className="max-w-xs text-sm md:text-base font-medium leading-relaxed opacity-80 mt-4">
              Stop waiting for the &quot;perfect time&quot; to start your dream career. Our online courses are designed for busy people.
            </p>
          </div>

          {/* Right Image content */}
          <div className="w-full md:w-1/2 relative mt-16 md:mt-0 flex justify-center md:justify-end items-center h-[450px] md:min-h-[600px] z-0">
             {/* Abstract Geometric Background Composition */}
             {/* Main Glowing Orb */}
             <div className="absolute right-0 md:-right-10 top-10 md:top-0 w-[350px] h-[350px] md:w-[550px] md:h-[550px] rounded-full bg-[#E27D22] blur-[80px] opacity-100 z-0"></div>
             {/* Intense Core Glow */}
             <div className="absolute right-[10%] top-20 md:top-10 w-[200px] h-[200px] md:w-[350px] md:h-[350px] rounded-full bg-[#F5A623] blur-[60px] opacity-100 z-0"></div>
             
             {/* Secondary Accent Circle */}
             <div className="absolute right-[15%] md:-top-5 w-32 h-32 border-[3px] border-[#299A8E]/30 rounded-full z-0 hidden md:block"></div>
             <div className="absolute left-[30%] bottom-5 w-20 h-20 bg-[#E27D22] rounded-full opacity-20 z-0"></div>
             
             {/* Decorative Dot Grid */}
             <div className="absolute right-[10%] -bottom-10 w-40 h-40 opacity-30 z-0 hidden md:block" style={{ backgroundImage: 'radial-gradient(#1E3A5F 2.5px, transparent 2.5px)', backgroundSize: '24px 24px' }}></div>

             {/* Main Image Architecture */}
             <div className="relative z-10 w-[280px] h-[380px] md:w-[420px] md:h-[540px] mt-[-30px] md:mt-[-20px] group">
                {/* Offset Frame */}
                <div className="absolute inset-0 border-[4px] border-[#299A8E] rounded-[2.5rem] md:rounded-[3.5rem] translate-x-5 translate-y-5 md:translate-x-8 md:translate-y-8 z-0 transition-transform duration-500 group-hover:translate-x-3 group-hover:translate-y-3"></div>
                
                {/* Image Card */}
                <div className="relative w-full h-full overflow-hidden rounded-[2.5rem] md:rounded-[3.5rem] shadow-[0_20px_50px_rgba(30,58,95,0.25)] border-4 border-white bg-white z-10">
                   <Image 
                     src="/islamic_tech_workspace.png" 
                     alt="Professional Online Learning" 
                     fill 
                     referrerPolicy="no-referrer"
                     className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                   />
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Orange Background */}
      <div className="w-full bg-[#E27D22] relative mt-10 md:mt-20 pt-10 pb-12 flex flex-col items-center z-20">
        
        {/* Teal Overlay Div positioned halfway up */}
        <div className="bg-[#299A8E] w-[90%] max-w-5xl rounded-[2rem] p-8 md:p-12 absolute -top-16 md:-top-32 left-1/2 -translate-x-1/2 shadow-lg flex flex-col md:flex-row gap-8 md:gap-16">
          
          {/* Left Column Services */}
          <div className="flex-1 text-white">
             <h2 className="text-2xl font-bold mb-6 tracking-wide uppercase">OUR SERVICES</h2>
             <ul className="space-y-4">
               {[
                 'On-Demand Video Courses',
                 'Live Masterclasses & Workshops',
                 '1-on-1 Mentorship Programs',
                 'Corporate Training Solutions'
               ].map((item, i) => (
                 <li key={i} className="flex items-center gap-3">
                   <div className="text-white"><Check size={20} strokeWidth={3} /></div>
                   <span className="font-medium text-sm md:text-base">{item}</span>
                 </li>
               ))}
             </ul>
          </div>

          {/* Right Column Programs */}
          <div className="flex-1 text-white md:border-l md:border-white/20 md:pl-16">
             <h2 className="text-2xl font-bold mb-6 tracking-wide uppercase">OUR PROGRAM</h2>
             <ul className="space-y-4">
               {[
                 'The Foundation Track',
                 'Professional Bootcamps',
                 'Leadership & Strategy Suite',
                 'Self-Paced Certification Modules'
               ].map((item, i) => (
                 <li key={i} className="flex items-center gap-3">
                   <div className="text-white"><Check size={20} strokeWidth={3} /></div>
                   <span className="font-medium text-sm md:text-base">{item}</span>
                 </li>
               ))}
             </ul>
          </div>
        </div>

        {/* Adjusting padding so content clears the absolute teal div */}
        <div className="h-[350px] md:h-[150px]"></div>

        {/* Register Now Button */}
        <Link href={user ? "/exams" : "/login"} className="relative z-30 -mt-10 mb-10 bg-white text-[#299A8E] px-10 py-3 rounded-full text-xl md:text-2xl font-black uppercase tracking-tight shadow-xl hover:scale-105 transition-transform border-4 border-white">
          {user ? "DASHBOARD" : "LOG IN"}
        </Link>
        
        {/* Footer Contact Info */}
        <div className="w-full max-w-6xl mx-auto flex justify-center items-center text-white/90 text-sm md:text-base font-medium px-6 h-[80px] pt-4">
           <div className="flex items-center justify-center gap-6" onMouseLeave={() => setHoveredBtn(null)}>
               {/* WhatsApp Button */}
               <div 
                  onMouseEnter={() => setHoveredBtn('whatsapp')}
                  className={`relative group cursor-pointer inline-flex transition-all duration-500 ${
                    hoveredBtn === 'email' ? 'w-0 opacity-0 overflow-hidden' : 'w-[160px] opacity-100'
                  }`}
               >
                  <div className="flex w-full items-center justify-center min-w-[160px] bg-white/20 backdrop-blur-md border border-white/30 px-6 py-3 rounded-full transition-all duration-500 font-bold uppercase tracking-widest text-white group-hover:opacity-0 group-hover:scale-95">
                    <span>WhatsApp</span>
                  </div>
                  <div className="absolute inset-0 bg-[#299A8E]/90 backdrop-blur-md border border-[#299A8E]/50 text-white px-2 py-3 rounded-full flex items-center justify-center opacity-0 scale-105 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 whitespace-nowrap font-bold shadow-[0_0_20px_rgba(41,154,142,0.6)] text-sm md:text-base pointer-events-none">
                    +93 70 893 7633
                  </div>
               </div>

               {/* Email Button */}
               <div 
                  onMouseEnter={() => setHoveredBtn('email')}
                  className={`relative group cursor-pointer inline-flex overflow-hidden transition-all duration-500 rounded-full ${
                    hoveredBtn === 'email' ? 'w-[320px]' : 'w-[160px]'
                  }`}
               >
                  <div className="flex w-full items-center justify-center min-w-[160px] bg-white/20 backdrop-blur-md border border-white/30 px-6 py-3 rounded-full transition-all duration-500 font-bold uppercase tracking-widest text-white group-hover:opacity-0 group-hover:scale-95">
                    <span>Email</span>
                  </div>
                  <div className="absolute inset-0 bg-[#299A8E]/90 backdrop-blur-md border border-[#299A8E]/50 text-white px-6 py-3 rounded-full flex items-center justify-center opacity-0 scale-105 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 whitespace-nowrap font-bold shadow-[0_0_20px_rgba(41,154,142,0.6)] text-sm md:text-base pointer-events-none tracking-widest">
                    Sanzarshafiullah@gmail.com
                  </div>
               </div>
           </div>
        </div>

      </div>
    </div>
  );
}
