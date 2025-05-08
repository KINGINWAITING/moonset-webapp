import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  BarChart2, 
  Wallet, 
  Globe, 
  FileText, 
  Users, 
  Vote, 
  Bell, 
  Lock
} from 'lucide-react'

export function SideNav() {
  const pathname = usePathname()

  const navItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: <LayoutDashboard className="h-5 w-5" />
    },
    {
      name: 'Analytics',
      href: '/dashboard/analytics',
      icon: <BarChart2 className="h-5 w-5" />
    },
    {
      name: 'Wallet',
      href: '/dashboard/wallet',
      icon: <Wallet className="h-5 w-5" />
    },
    {
      name: 'Market',
      href: '/dashboard/market',
      icon: <Globe className="h-5 w-5" />
    },
    {
      name: 'Research',
      href: '/dashboard/research',
      icon: <FileText className="h-5 w-5" />
    },
    {
      name: 'Community',
      href: '/dashboard/community',
      icon: <Users className="h-5 w-5" />
    },
    {
      name: 'Governance',
      href: '/dashboard/governance',
      icon: <Vote className="h-5 w-5" />
    },
    {
      name: 'Notifications',
      href: '/dashboard/notifications',
      icon: <Bell className="h-5 w-5" />
    },
    {
      name: 'Staking',
      href: '/dashboard/staking',
      icon: <Lock className="h-5 w-5" />
    }
  ]

  return (
    <aside className="dashboard-sidebar hidden md:flex w-64 flex-col fixed inset-y-0 z-50 bg-gradient-to-b from-purple-900/90 to-blue-900/90 border-r border-white/10 backdrop-blur-md">
      <div className="flex flex-col h-full px-3 py-4">
        <div className="mb-8 px-4 flex items-center justify-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/moonset.png"
              alt="MOONSET Logo"
              width={150}
              height={48}
              className="h-12 w-auto object-contain"
            />
          </Link>
        </div>
        <nav className="space-y-1 flex-1 px-2">
          {navItems.map((item, i) => (
            <Link 
              key={i} 
              href={item.href}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                pathname === item.href 
                  ? 'bg-white/10 text-white font-medium' 
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
        <div className="mt-auto pt-4 border-t border-white/10">
          <Link 
            href="#"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors text-white/70 hover:text-white hover:bg-white/5"
          >
            <Lock className="h-5 w-5" />
            <span>Sign Out</span>
          </Link>
        </div>
      </div>
    </aside>
  )
} 