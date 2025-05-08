import React from "react";

type MoonsetLogoProps = {
  width?: number;
  height?: number;
  variant?: "full" | "small";
};

export function MoonsetLogo({ 
  width = 180, 
  height = width * 0.35, // Maintain aspect ratio 
  variant = "full" 
}: MoonsetLogoProps) {
  if (variant === "full") {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 540 189"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="moonset-logo w-full h-auto transition-transform duration-300"
      >
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#f0e6ff" />
            <stop offset="100%" stopColor="#d8c7ff" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="moonglow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        {/* Simple text path for MOONSET */}
        <text 
          x="3" 
          y="110" 
          fontFamily="Arial, sans-serif" 
          fontSize="82" 
          fontWeight="bold" 
          fill="url(#logoGradient)" 
          filter="url(#glow)"
        >
          MOONSET
        </text>
        
        {/* Moon symbol */}
        <circle 
          cx="460" 
          cy="90" 
          r="30" 
          fill="white"
          filter="url(#moonglow)"
          className="moon-circle"
        >
          <animate attributeName="opacity" values="0.9;1;0.9" dur="4s" repeatCount="indefinite" />
          <animate attributeName="r" values="30;32;30" dur="7s" repeatCount="indefinite" />
        </circle>
        
        {/* Animated stars around the logo */}
        <circle className="star-1" cx="50" cy="40" r="8" fill="white" opacity="0.9">
          <animate attributeName="opacity" values="0.9;0.4;0.9" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle className="star-2" cx="480" cy="130" r="6" fill="white" opacity="0.8">
          <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2.5s" repeatCount="indefinite" />
        </circle>
        <circle className="star-3" cx="330" cy="25" r="7" fill="white" opacity="0.85">
          <animate attributeName="opacity" values="0.85;0.4;0.85" dur="4s" repeatCount="indefinite" />
        </circle>
      </svg>
    );
  }
  
  // Small variant
  return (
    <svg
      width={width}
      height={width} // Square aspect ratio for small logo
      viewBox="0 0 150 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="moonset-logo-small w-auto h-auto transition-transform duration-300"
    >
      <defs>
        <linearGradient id="logoSmallGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="50%" stopColor="#f0e6ff" />
          <stop offset="100%" stopColor="#d8c7ff" />
        </linearGradient>
        <filter id="smallGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id="smallMoonglow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      
      {/* M for MOONSET */}
      <text 
        x="38" 
        y="95" 
        fontFamily="Arial, sans-serif" 
        fontSize="95" 
        fontWeight="bold" 
        fill="url(#logoSmallGradient)" 
        filter="url(#smallGlow)"
      >
        M
      </text>
      
      {/* Moon circle */}
      <circle 
        cx="75" 
        cy="75" 
        r="65" 
        fill="none"
        stroke="url(#logoSmallGradient)"
        strokeWidth="3"
        opacity="0.5"
        filter="url(#smallMoonglow)"
        className="small-moon-circle"
      >
        <animate attributeName="opacity" values="0.5;0.7;0.5" dur="4s" repeatCount="indefinite" />
        <animate attributeName="r" values="65;67;65" dur="7s" repeatCount="indefinite" />
      </circle>
      
      {/* Animated stars */}
      <circle className="small-star-1" cx="30" cy="30" r="8" fill="white" opacity="0.9">
        <animate attributeName="opacity" values="0.9;0.4;0.9" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle className="small-star-2" cx="120" cy="120" r="7" fill="white" opacity="0.8">
        <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2.5s" repeatCount="indefinite" />
      </circle>
      <circle className="small-star-3" cx="105" cy="45" r="9" fill="white" opacity="0.85">
        <animate attributeName="opacity" values="0.85;0.4;0.85" dur="4s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
} 