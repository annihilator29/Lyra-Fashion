'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Package, ShoppingCart, BarChart3 } from 'lucide-react';

export function Sidebar() {
  const pathname = usePathname();

  // Navigation items for the admin sidebar
  const navItems = [
    {
      title: 'Dashboard',
      href: '/admin/dashboard',
      icon: LayoutDashboard,
    },
    {
      title: 'Products',
      href: '/admin/products',
      icon: Package,
    },
    {
      title: 'Orders',
      href: '/admin/orders',
      icon: ShoppingCart,
    },
    {
      title: 'Inventory',
      href: '/admin/inventory',
      icon: BarChart3,
    },
  ];

  return (
    <div className="w-64 bg-white shadow-md h-full">
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
      </div>
      <nav className="mt-4">
        <ul>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <li key={item.href}>
                <Link 
                  href={item.href}
                  className={`flex items-center px-4 py-3 text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}