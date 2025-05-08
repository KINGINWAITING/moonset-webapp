"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MoonsetLogo } from "@/components/moonset-logo";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Zap } from "lucide-react";

// Helper function to calculate time remaining
const calculateTimeLeft = (targetDate: Date) => {
  const difference = +targetDate - +new Date();
  let timeLeft = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }
  return timeLeft;
};

export default function LandingPage() {
  const targetLaunchDate = new Date("2025-07-17T00:00:00Z");
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetLaunchDate));
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetLaunchDate));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Prevent hydration mismatch for countdown by only rendering when mounted
  if (!isMounted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white relative overflow-hidden p-4">
        {/* Placeholder for pre-render or loading state */}
      </div>
    );
  }
  
  const isLaunched = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white relative overflow-hidden p-6 isolate">
      {/* Central gradient focus and dark background */}
      <div 
        className="absolute inset-0 -z-10 overflow-hidden"
        style={{
          background: 'radial-gradient(circle at center, rgba(88, 28, 135, 0.2) 0%, rgba(30, 27, 75, 0.05) 40%, rgba(0, 0, 0, 0) 70%)'
        }}
      />

      {/* Rotating starfield */}
      <div 
        className="absolute inset-0 -z-5 overflow-hidden" 
        style={{
          perspective: '1000px',
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Star rotation container */}
        <div 
          className="absolute inset-0" 
          style={{
            animation: 'rotate-stars 600s linear infinite',
            transformOrigin: 'center center'
          }}
        >
          {/* Generate stars programmatically */}
          {Array.from({ length: 100 }).map((_, index) => {
            // Calculate random positions for stars
            const angle = Math.random() * Math.PI * 2;
            const distance = 20 + Math.random() * 45; // Between 20-65% from center
            const size = 1 + Math.random() * 3;
            const opacity = 0.3 + Math.random() * 0.7;
            const x = 50 + Math.cos(angle) * distance;
            const y = 50 + Math.sin(angle) * distance;
            
            return (
              <div 
                key={index}
                className="absolute rounded-full" 
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                  backgroundColor: 'white',
                  opacity: opacity,
                  boxShadow: `0 0 ${size * 2}px ${size}px rgba(255, 255, 255, ${opacity * 0.5})`,
                }}
              />
            );
          })}
          
          {/* Polaris (center star) */}
          <div 
            className="absolute rounded-full"
            style={{
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: '4px',
              height: '4px',
              backgroundColor: 'white',
              opacity: 0.9,
              boxShadow: '0 0 10px 5px rgba(255, 255, 255, 0.6)',
            }}
          />
        </div>
      </div>

      <main className="relative z-10 flex flex-col items-center justify-center text-center space-y-10 md:space-y-12 animate-fadeInUp">
        
        <div className="transform hover:scale-105 transition-transform duration-500 ease-out group relative">
          <MoonsetLogo width={280} variant="small" />
          <div className="absolute inset-0 rounded-full group-hover:bg-purple-500/20 blur-3xl transition-all duration-500"></div>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight title-glow">
          MOONSET Token <span className="block sm:inline-block">Launching In:</span>
        </h1>

        {isLaunched ? (
          <div className="text-4xl md:text-5xl font-bold text-green-400 animate-pulse-strong p-4 rounded-lg bg-green-500/10 border border-green-500/30 shadow-2xl">
            MOONSET HAS LAUNCHED!
            <div className="mt-2 text-lg text-green-300">Explore the new era.</div>
          </div>
        ) : (
          <div className="grid grid-flow-col gap-3 sm:gap-5 text-center auto-cols-max countdown-container-glow">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds },
            ].map(item => (
              <div key={item.label} className="flex flex-col p-3 sm:p-4 bg-slate-800/60 backdrop-blur-md rounded-xl shadow-xl border border-purple-500/40 w-20 sm:w-24 md:w-28">
                <span className="text-3xl sm:text-4xl md:text-5xl font-mono countdown-value tabular-nums">
                  {String(item.value).padStart(2, '0')}
                </span>
                <span className="text-xs sm:text-sm uppercase text-purple-300/90 tracking-wider mt-1">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 pt-6">
          <Link href="/whitepaper" passHref>
            <Button
              variant="outline"
              className="w-full sm:w-auto text-base sm:text-lg px-8 py-3 rounded-lg border-2 border-purple-400/80 text-purple-300/90 
                         hover:bg-purple-500/20 hover:text-white hover:border-purple-400 hover:shadow-purple-500/40 hover:shadow-lg 
                         transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center gap-2.5 group"
            >
              <FileText size={18} className="group-hover:animate-wiggle-once" /> Read Whitepaper
            </Button>
          </Link>
          <Link href="/dashboard" passHref>
            <Button
              className="w-full sm:w-auto text-base sm:text-lg px-8 py-3 rounded-lg 
                         bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-500 
                         hover:from-purple-700 hover:via-blue-600 hover:to-cyan-600 
                         text-white shadow-lg hover:shadow-blue-500/40 hover:shadow-xl 
                         transform hover:scale-105 transition-all duration-300 ease-in-out flex items-center gap-2.5 group"
            >
              <Zap size={18} className="group-hover:animate-pulse-fast"/> Enter Dashboard 
            </Button>
          </Link>
        </div>
      </main>

      <style jsx global>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        @keyframes rotate-stars {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .title-glow {
          text-shadow: 0 0 10px rgba(192, 132, 252, 0.3), 0 0 20px rgba(139, 92, 246, 0.2);
        }
        .countdown-value {
          text-shadow: 0 0 8px rgba(224, 192, 252, 0.6), 0 0 12px rgba(192, 132, 252, 0.4);
        }
        .countdown-container-glow {
           box-shadow: 0 0 25px rgba(139, 92, 246, 0.15), 0 0 10px rgba(160, 100, 250, 0.1);
           border-radius: 0.75rem;
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.02); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 10s infinite ease-in-out;
        }
        
        @keyframes pulse-strong {
          0%, 100% { opacity: 0.9; transform: scale(1); box-shadow: 0 0 15px rgba(52, 211, 153, 0.3); }
          50% { opacity: 1; transform: scale(1.03); box-shadow: 0 0 30px rgba(52, 211, 153, 0.5); }
        }
        .animate-pulse-strong {
          animation: pulse-strong 2.5s infinite ease-in-out;
        }

        @keyframes wiggle-once {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-8deg); }
          75% { transform: rotate(8deg); }
        }
        .group-hover\:animate-wiggle-once:hover .lucide-file-text, 
        .group:hover .lucide-file-text {
            animation: wiggle-once 0.5s ease-in-out;
        }

        @keyframes pulse-fast-icon {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.15); }
        }
        .group:hover .lucide-zap {
            animation: pulse-fast-icon 0.7s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}
