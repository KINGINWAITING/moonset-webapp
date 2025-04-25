"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface TopTabsProps {
  tabs: {
    label: string;
    href: string;
  }[];
}

export default function TopTabs({ tabs }: TopTabsProps) {
  const pathname = usePathname();

  return (
    <div className="top-tabs">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`top-tab ${isActive ? "active" : ""}`}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
} 