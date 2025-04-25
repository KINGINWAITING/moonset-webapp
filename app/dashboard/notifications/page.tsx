"use client"

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell, CalendarDays, Settings, Check } from "lucide-react"
import DashboardPageLayout from '../../../components/dashboard-page-layout'

export default function NotificationsPage() {
  // Get current date in a nice format
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  return (
    <DashboardPageLayout>
      <div className="page-header">
        <div>
          <h1 className="page-title">Notifications</h1>
          <div className="page-date">
            <CalendarDays className="h-4 w-4 text-white/60" />
            <span>{currentDate}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            className="dashboard-button-primary flex items-center gap-2"
            onClick={() => alert("Notification settings would open here")}
          >
            <Settings className="h-4 w-4" />
            <span className="hidden md:inline">Settings</span>
          </Button>
        </div>
      </div>

      <Card className="dashboard-card mb-6">
        <CardHeader>
          <CardTitle className="text-white">Notifications Center</CardTitle>
          <CardDescription className="text-white/70">Stay updated on your account activity and platform updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-20 text-center">
            <div>
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-500/10 flex items-center justify-center">
                <Bell className="h-8 w-8 text-purple-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">No New Notifications</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                You're all caught up! No new notifications at this time
              </p>
              <Button 
                className="dashboard-button-primary"
                onClick={() => alert("All notifications marked as read")}
              >
                <Check className="mr-2 h-4 w-4" />
                Mark All as Read
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle className="text-white">Notification Settings</CardTitle>
          <CardDescription className="text-white/70">Configure when and how you want to be notified</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-white/5">
              <span className="text-sm text-white">Email Notifications</span>
              <Button 
                variant="outline" 
                className="text-white border-white/20 bg-white/5 hover:bg-white/10"
                onClick={() => alert("Email notification settings toggled")}
              >
                Enabled
              </Button>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-white/5">
              <span className="text-sm text-white">Price Alerts</span>
              <Button 
                variant="outline" 
                className="text-white border-white/20 bg-white/5 hover:bg-white/10"
                onClick={() => alert("Price alert settings toggled")}
              >
                Enabled
              </Button>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-white/5">
              <span className="text-sm text-white">Governance Votes</span>
              <Button 
                variant="outline" 
                className="text-white border-white/20 bg-white/5 hover:bg-white/10"
                onClick={() => alert("Governance notification settings toggled")}
              >
                Enabled
              </Button>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-white/5">
              <span className="text-sm text-white">Security Alerts</span>
              <Button 
                variant="outline" 
                className="text-white border-white/20 bg-white/5 hover:bg-white/10"
                onClick={() => alert("Security alert settings toggled")}
              >
                Enabled
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </DashboardPageLayout>
  )
} 