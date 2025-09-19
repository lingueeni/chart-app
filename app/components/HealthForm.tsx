"use client";

import { useState } from "react";

export default function HealthForm() {
  const [form, setForm] = useState({
    domain: "",
    server: "",
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("🔍 Running Active Directory Health Check...");
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* Header */}
      <h2 className="text-2xl font-oswald font-bold text-[#0078D4] mb-2">
        Enter Domain Information
      </h2>
      <p className="text-gray-500 font-roboto mb-6">
        Provide your Active Directory details to start the health check.
      </p>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <input
          type="text"
          name="domain"
          placeholder="🌐 Domain Name"
          value={form.domain}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0078D4] transition"
          required
        />
        <input
          type="text"
          name="server"
          placeholder="🖥️ Domain Controller IP"
          value={form.server}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0078D4] transition"
          required
        />
        <input
          type="text"
          name="username"
          placeholder="👤 Username"
          value={form.username}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0078D4] transition"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="🔑 Password"
          value={form.password}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0078D4] transition"
          required
        />

        {/* Submit Button */}
        <div className="col-span-1 md:col-span-2 flex justify-center mt-4">
          <button
            type="submit"
            className="bg-[#0078D4] hover:bg-[#005A9E] text-white font-semibold px-8 py-3 rounded-lg shadow-md transition-colors duration-300"
          >
            Run Health Check
          </button>
        </div>
      </form>
    </div>
  );
}
