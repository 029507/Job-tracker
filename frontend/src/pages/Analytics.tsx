import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { analyticsAPI, Stats } from "../services/api";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, CheckCircle, AlertCircle, Award } from "lucide-react";

export const Analytics: React.FC = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [monthlyData, setMonthlyData] = useState<any[]>([]);
  const [statusData, setStatusData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, timelineRes, distributionRes] = await Promise.all([
          analyticsAPI.getStats(),
          analyticsAPI.getMonthlyTimeline(),
          analyticsAPI.getStatusDistribution(),
        ]);

        setStats(statsRes.data);
        setMonthlyData(timelineRes.data);

        const distribution = distributionRes.data;
        const data = Object.entries(distribution).map(([status, count]) => ({
          name: status,
          value: count,
        }));
        setStatusData(data);
      } catch (error) {
        console.error("Error fetching analytics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <div className="text-gray-500">Loading analytics...</div>
        </div>
      </div>
    );
  }

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4"];

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={<TrendingUp className="text-blue-600" size={24} />}
            label="Total Applications"
            value={stats?.total || 0}
          />
          <StatCard
            icon={<AlertCircle className="text-yellow-600" size={24} />}
            label="Response Rate"
            value={`${stats?.responseRate || 0}%`}
          />
          <StatCard
            icon={<CheckCircle className="text-green-600" size={24} />}
            label="Interview Rate"
            value={`${stats?.interview || 0}`}
          />
          <StatCard
            icon={<Award className="text-purple-600" size={24} />}
            label="Success Rate"
            value={`${stats?.successRate || 0}%`}
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Timeline */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Applications Over Time</h2>
            {monthlyData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-center text-gray-500 py-12">No data available</div>
            )}
          </div>

          {/* Status Distribution */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Status Distribution</h2>
            {statusData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-center text-gray-500 py-12">No data available</div>
            )}
          </div>
        </div>

        {/* Detailed Stats */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Detailed Breakdown</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
            <DetailStat label="Applied" value={stats?.applied || 0} color="bg-blue-100" />
            <DetailStat label="Phone Screen" value={stats?.phoneScreen || 0} color="bg-yellow-100" />
            <DetailStat label="Interview" value={stats?.interview || 0} color="bg-green-100" />
            <DetailStat label="Offer" value={stats?.offer || 0} color="bg-purple-100" />
            <DetailStat label="Rejected" value={stats?.rejected || 0} color="bg-red-100" />
            <DetailStat label="Withdrawn" value={stats?.withdrawn || 0} color="bg-gray-100" />
          </div>
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value }) => (
  <div className="bg-white rounded-lg shadow p-6 flex items-center gap-4">
    <div className="p-3 bg-gray-100 rounded-lg">{icon}</div>
    <div>
      <p className="text-gray-600 text-sm">{label}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  </div>
);

interface DetailStatProps {
  label: string;
  value: number;
  color: string;
}

const DetailStat: React.FC<DetailStatProps> = ({ label, value, color }) => (
  <div className={`${color} rounded-lg p-4 text-center`}>
    <p className="text-gray-600 text-sm font-medium">{label}</p>
    <p className="text-2xl font-bold text-gray-900">{value}</p>
  </div>
);
