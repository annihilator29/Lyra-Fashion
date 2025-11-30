'use client';

import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { getAdminMetrics } from '@/app/actions/admin';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MetricCard } from '@/components/admin/metric-card';

// Mock data for charts - in a real app, this would come from API
const revenueData = [
  { name: 'Mon', revenue: 4000 },
  { name: 'Tue', revenue: 3000 },
  { name: 'Wed', revenue: 2000 },
  { name: 'Thu', revenue: 2780 },
  { name: 'Fri', revenue: 1890 },
  { name: 'Sat', revenue: 2390 },
  { name: 'Sun', revenue: 3490 },
];

const orderStatusData = [
  { name: 'Pending', value: 12 },
  { name: 'Paid', value: 24 },
  { name: 'Production', value: 18 },
  { name: 'Shipped', value: 15 },
  { name: 'Delivered', value: 30 },
  { name: 'Cancelled', value: 3 },
];

export default function AdminDashboardPage() {
  const [metrics, setMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setLoading(true);
        const data = await getAdminMetrics();
        setMetrics(data);
      } catch (err) {
        setError('Failed to load metrics');
        console.error('Error fetching admin metrics:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        <p>Loading dashboard metrics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <MetricCard
          title="Total Revenue"
          value={`$${(metrics?.totalRevenue || 0) / 100}`}
          description="Total revenue from paid orders"
        />
        <MetricCard
          title="Total Orders"
          value={metrics?.totalOrders || 0}
          description="Total number of orders"
        />
        <MetricCard
          title="Low Stock Items"
          value={metrics?.lowStockItems || 0}
          description="Items with low inventory"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                <Bar dataKey="revenue" fill="#3b82f6">
                  {revenueData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill="#3b82f6" />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Order Status Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Order Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={orderStatusData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#10b981">
                  {orderStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getStatusColor(entry.name)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <p>Dashboard content to be expanded with additional metrics.</p>
      </div>
    </div>
  );
}

// Helper function to get status-specific colors for the chart
function getStatusColor(status: string): string {
  const colorMap: Record<string, string> = {
    'Pending': '#f59e0b',
    'Paid': '#10b981',
    'Production': '#8b5cf6',
    'Shipped': '#3b82f6',
    'Delivered': '#22c55e',
    'Cancelled': '#ef4444',
  };
  
  return colorMap[status] || '#6b7280';
}