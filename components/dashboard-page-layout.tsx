import React from 'react'

interface DashboardPageLayoutProps {
  children: React.ReactNode
}

export default function DashboardPageLayout({ children }: DashboardPageLayoutProps) {
  return (
    <div className="dashboard-page">
      {children}
    </div>
  )
} 