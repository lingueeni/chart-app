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
    alert("Running health check...");
  };

  return (
    <div className="bg-[#221E33] p-8 rounded-2xl shadow-lg ">
      <h2 className="text-2xl font-bold text-gray-200 mb-6">
        Enter Domain Information
      </h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <input
          type="text"
          name="domain"
          placeholder="Domain Name"
          value={form.domain}
          onChange={handleChange}
          className="bg-[#1a1c2e] border border-gray-700 rounded-lg px-4 py-3 text-gray-200 placeholder-gray-500 focus:outline-none"
          required
        />
        <input
          type="text"
          name="server"
          placeholder="Domain Controller IP"
          value={form.server}
          onChange={handleChange}
          className="bg-[#1a1c2e] border border-gray-700 rounded-lg px-4 py-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="bg-[#1a1c2e] border border-gray-700 rounded-lg px-4 py-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="bg-[#1a1c2e] border border-gray-700 rounded-lg px-4 py-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <div className="col-span-1 md:col-span-2 flex justify-center mt-4">
          <button
            type="submit"
            className="bg-blue-600  text-white font-semibold px-8 py-3 rounded-lg shadow-md"
          >
            Run Health Check
          </button>
        </div>
      </form>
    </div>
  );
}
