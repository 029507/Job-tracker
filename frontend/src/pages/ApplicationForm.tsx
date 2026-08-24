import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { applicationsAPI, Application } from "../services/api";
import { ArrowLeft, Save } from "lucide-react";

export const ApplicationForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(!!id);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<Partial<Application>>({
    company: "",
    position: "",
    jobUrl: "",
    description: "",
    status: "APPLIED",
    notes: "",
  });

  useEffect(() => {
    if (id && id !== "new") {
      fetchApplication();
    }
  }, [id]);

  const fetchApplication = async () => {
    try {
      const { data } = await applicationsAPI.getById(id!);
      setFormData(data);
    } catch (error) {
      console.error("Error fetching application:", error);
      navigate("/applications");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (id && id !== "new") {
        await applicationsAPI.update(id, formData);
      } else {
        await applicationsAPI.create(formData);
      }
      navigate("/applications");
    } catch (error) {
      console.error("Error saving application:", error);
      alert("Error saving application");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <div className="text-gray-500">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-2xl mx-auto p-6">
        <button
          onClick={() => navigate("/applications")}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
        >
          <ArrowLeft size={20} />
          Back to Applications
        </button>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          {id && id !== "new" ? "Edit Application" : "New Application"}
        </h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company *</label>
              <input
                type="text"
                name="company"
                value={formData.company || ""}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
                placeholder="e.g., Google"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Position *</label>
              <input
                type="text"
                name="position"
                value={formData.position || ""}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
                placeholder="e.g., Software Engineer"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Job URL</label>
            <input
              type="url"
              name="jobUrl"
              value={formData.jobUrl || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description || ""}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
              placeholder="Job description, requirements, etc."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status *</label>
              <select
                name="status"
                value={formData.status || "APPLIED"}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
              >
                <option value="APPLIED">Applied</option>
                <option value="PHONE_SCREEN">Phone Screen</option>
                <option value="INTERVIEW">Interview</option>
                <option value="OFFER">Offer</option>
                <option value="REJECTED">Rejected</option>
                <option value="WITHDRAWN">Withdrawn</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Applied Date</label>
              <input
                type="date"
                name="appliedDate"
                value={formData.appliedDate ? new Date(formData.appliedDate).toISOString().split("T")[0] : ""}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
            <textarea
              name="notes"
              value={formData.notes || ""}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
              placeholder="Personal notes, interview feedback, etc."
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={saving}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg flex items-center gap-2 disabled:opacity-50"
            >
              <Save size={20} />
              {saving ? "Saving..." : "Save Application"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/applications")}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-6 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
