import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { applicationsAPI, analyticsAPI, Application, Stats } from "../services/api";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Briefcase, TrendingUp, CheckCircle, AlertCircle } from "lucide-react";

export const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentApps, setRecentApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, appsRes] = await Promise.all([
        analyticsAPI.getStats(),
        applicationsAPI.getAll(),
      ]);
      setStats(statsRes.data);
      setRecentApps(appsRes.data.slice(0, 5));
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <div className="text-gray-500">Loading dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Track and manage your job applications</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <QuickStatCard
            icon={<Briefcase className="text-blue-600" size={24} />}
            label="Total Applications"
            value={stats?.total || 0}
            color="bg-blue-50"
          />
          <QuickStatCard
            icon={<TrendingUp className="text-green-600" size={24} />}
            label="Response Rate"
            value={`${stats?.responseRate || 0}%`}
            color="bg-green-50"
          />
          <QuickStatCard
            icon={<CheckCircle className="text-purple-600" size={24} />}
            label="Interview Offers"
            value={stats?.interview || 0}
            color="bg-purple-50"
          />
          <QuickStatCard
            icon={<AlertCircle className="text-orange-600" size={24} />}
            label="Success Rate"
            value={`${stats?.successRate || 0}%`}
            color="bg-orange-50"
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Status Overview */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Application Status Overview</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <StatusBadge label="Applied" value={stats?.applied || 0} color="bg-blue-100 text-blue-800" />
              <StatusBadge label="Phone Screen" value={stats?.phoneScreen || 0} color="bg-yellow-100 text-yellow-800" />
              <StatusBadge label="Interview" value={stats?.interview || 0} color="bg-green-100 text-green-800" />
              <StatusBadge label="Offer" value={stats?.offer || 0} color="bg-purple-100 text-purple-800" />
              <StatusBadge label="Rejected" value={stats?.rejected || 0} color="bg-red-100 text-red-800" />
              <StatusBadge label="Withdrawn" value={stats?.withdrawn || 0} color="bg-gray-100 text-gray-800" />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <a
                href="/applications/new"
                className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
              >
                Add New Application
              </a>
              <a
                href="/applications"
                className="block w-full text-center bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-lg transition"
              >
                View All Applications
              </a>
              <a
                href="/analytics"
                className="block w-full text-center bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-lg transition"
              >
                View Analytics
              </a>
            </div>
          </div>
        </div>

        {/* Recent Applications */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Applications</h2>
          {recentApps.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No applications yet. Start by adding your first one!</p>
          ) : (
            <div className="space-y-3">
              {recentApps.map((app) => (
                <div key={app.id} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div>
                    <p className="font-medium text-gray-900">{app.position}</p>
                    <p className="text-sm text-gray-600">{app.company}</p>
                  </div>
                  <span className="text-sm font-medium text-gray-600">
                    {new Date(app.appliedDate).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface QuickStatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color: string;
}

const QuickStatCard: React.FC<QuickStatCardProps> = ({ icon, label, value, color }) => (
  <div className={`${color} rounded-lg shadow p-6 flex items-center gap-4`}>
    <div className="p-3 bg-white rounded-lg">{icon}</div>
    <div>
      <p className="text-gray-600 text-sm">{label}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  </div>
);

interface StatusBadgeProps {
  label: string;
  value: number;
  color: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ label, value, color }) => (
  <div className={`${color} rounded-lg p-3 text-center`}>
    <p className="text-sm font-medium">{label}</p>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);
