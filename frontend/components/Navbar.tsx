"use client";

import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <div className="h-16 bg-white shadow flex items-center justify-between px-6">
      <h1 className="font-bold text-lg">HRMS Module</h1>
      <div className="flex items-center gap-4">
        <span className="text-sm">{user?.name}</span>
        <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
          {user?.role}
        </span>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-3 py-1 rounded text-sm"
        >
          Logout
        </button>
      </div>
    </div>
  );
}