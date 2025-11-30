'use client';

import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from '@/components/admin/sidebar';
import { useUser } from '@/hooks/useUser';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { user, isLoading, isCheckingRole } = useUser();
  const router = useRouter();

  // Show loading state while checking authentication/role
  if (isLoading || isCheckingRole) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading admin dashboard...</div>
      </div>
    );
  }

  // Check if user exists and has admin role
  if (!user || user.role !== 'admin') {
    // Redirect to home page if not authenticated or not an admin
    router.push('/');
    return null; // Return null to render nothing since we're redirecting
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}