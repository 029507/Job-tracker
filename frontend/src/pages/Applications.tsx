import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { applicationsAPI, Application } from "../services/api";
import { Plus, Edit2, Trash2, Search } from "lucide-react";

export const Applications: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchApplications();
  }, [filter, statusFilter]);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const { data } = await applicationsAPI.getAll(statusFilter || undefined, undefined, filter || undefined);
      setApplications(data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this application?")) {
      try {
        await applicationsAPI.delete(id);
        setApplications(applications.filter((app) => app.id !== id));
      } catch (error) {
        console.error("Error deleting application:", error);
      }
    }
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      APPLIED: "bg-blue-100 text-blue-800",
      PHONE_SCREEN: "bg-yellow-100 text-yellow-800",
      INTERVIEW: "bg-green-100 text-green-800",
      OFFER: "bg-purple-100 text-purple-800",
      REJECTED: "bg-red-100 text-red-800",
      WITHDRAWN: "bg-gray-100 text-gray-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Applications</h1>
          <button
            onClick={() => navigate("/applications/new")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2"
          >
            <Plus size={20} />
            New Application
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by company or position..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
          >
            <option value="">All Statuses</option>
            <option value="APPLIED">Applied</option>
            <option value="PHONE_SCREEN">Phone Screen</option>
            <option value="INTERVIEW">Interview</option>
            <option value="OFFER">Offer</option>
            <option value="REJECTED">Rejected</option>
            <option value="WITHDRAWN">Withdrawn</option>
          </select>
        </div>

        {/* Applications List */}
        {loading ? (
          <div className="text-center text-gray-500 py-12">Loading applications...</div>
        ) : applications.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-gray-500 mb-4">No applications yet</p>
            <button
              onClick={() => navigate("/applications/new")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg"
            >
              Add your first application
            </button>
          </div>
        ) : (
          <div className="grid gap-4">
            {applications.map((app) => (
              <div key={app.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{app.position}</h3>
                    <p className="text-gray-600">{app.company}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(app.status)}`}>
                    {app.status.replace(/_/g, " ")}
                  </span>
                </div>

                {app.description && (
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{app.description}</p>
                )}

                <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                  <span>Applied: {new Date(app.appliedDate).toLocaleDateString()}</span>
                  {app.notes && <span>Notes: {app.notes.substring(0, 50)}...</span>}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/applications/${app.id}`)}
                    className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium py-2 rounded-lg flex items-center justify-center gap-2"
                  >
                    <Edit2 size={16} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(app.id)}
                    className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 font-medium py-2 rounded-lg flex items-center justify-center gap-2"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
