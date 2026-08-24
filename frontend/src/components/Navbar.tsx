import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { authAPI } from "../services/api";
import { LogOut, Menu, X } from "lucide-react";

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/dashboard" className="flex items-center">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                JT
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900">Job Tracker</span>
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="/dashboard" className="text-gray-700 hover:text-blue-600">
              Dashboard
            </a>
            <a href="/applications" className="text-gray-700 hover:text-blue-600">
              Applications
            </a>
            <a href="/analytics" className="text-gray-700 hover:text-blue-600">
              Analytics
            </a>
            <div className="flex items-center gap-4 pl-4 border-l">
              <span className="text-gray-700 text-sm">{user?.name}</span>
              <button
                onClick={handleLogout}
                className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t">
            <a href="/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
              Dashboard
            </a>
            <a href="/applications" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
              Applications
            </a>
            <a href="/analytics" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
              Analytics
            </a>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};
