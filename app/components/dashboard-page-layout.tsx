"use client"

import React from 'react'
import TopTabs from './top-tabs'

const dashboardTabs = [
  { label: 'Overview', href: '/dashboard' },
  { label: 'Analytics', href: '/dashboard/analytics' },
  { label: 'Reports', href: '/dashboard/market' }, // We'll use market as reports for now
  { label: 'Notifications', href: '/dashboard/notifications' },
]

interface DashboardPageLayoutProps {
  children: React.ReactNode;
}

export default function DashboardPageLayout({ children }: DashboardPageLayoutProps) {
  return (
    <div>
      <TopTabs tabs={dashboardTabs} />
      {children}
    </div>
  )
} 