"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { SiteHeader } from "@/components/site-header";

interface ConditionalHeaderProps {
  children: ReactNode;
}

export function ConditionalHeader({ children }: ConditionalHeaderProps) {
  const pathname = usePathname();
  
  // Pages where the navbar should be hidden
  const hiddenNavbarPaths = [
    "/",                // Landing page
    "/about",           // About page
    "/whitepaper",      // Whitepaper page
    // Future pages to hide navbar:
    // "/blog",
    // "/faqs", 
    // "/news",
    // "/contact"
  ];
  
  // Check if current path is in the list of paths where navbar should be hidden
  const shouldHideHeader = hiddenNavbarPaths.includes(pathname);

  return (
    <>
      {/* Only render SiteHeader if not on a page where navbar should be hidden */}
      {!shouldHideHeader && <SiteHeader />}
      {children}
    </>
  );
} 