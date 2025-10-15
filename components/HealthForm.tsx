"use client";

import { useState } from "react";
import Image from "next/image";

export default function HealthForm() {
  const [form, setForm] = useState({
    domain: "",
    username: "",
    password: "",
  });

  const [ips, setIps] = useState<string[]>([]);
  const [currentIp, setCurrentIp] = useState("");
  const [modalMessage, setModalMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // 🧠 Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ➕ Add IP
  const handleAddIp = () => {
    const ip = currentIp.trim();
    if (!ip) return;
    if (ips.includes(ip)) return;
    setIps([...ips, ip]);
    setCurrentIp("");
  };

  // ❌ Remove IP
  const handleRemoveIp = (ip: string) => {
    setIps(ips.filter((i) => i !== ip));
  };

  // 🧹 Clear all IPs
  const handleClearIps = () => {
    setIps([]);
  };

  // 🚀 Submit form with validation
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Validation: Must have at least one IP
    if (ips.length === 0) {
      setModalMessage(
        "⚠️ Please add at least one Domain Controller IP before continuing."
      );
      return;
    }

    const payload = { ...form, ips };

    try {
      setLoading(true);
      const res = await fetch("https://json-server-d0eo.onrender.com/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to connect");

      await res.json();
      setModalMessage(`✅ Connection successful`);
      setForm({ domain: "", username: "", password: "" });
      setIps([]);
    } catch (err) {
      setModalMessage("❌ Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 max-w-2xl mx-auto">
      {/* Header */}
      <h2 className="text-2xl font-oswald font-bold text-[#0078D4] mb-2 text-center">
        Enter Domain Information
      </h2>
      <p className="text-gray-500 font-roboto mb-6 text-center">
        Provide your Active Directory details to start the health check.
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Domain Input */}
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Image
              src="/global.svg"
              alt="Domain"
              width={20}
              height={20}
              className="opacity-70"
            />
          </span>
          <input
            type="text"
            name="domain"
            placeholder="Domain Name"
            value={form.domain}
            onChange={handleChange}
            className="w-full bg-gray-50 border border-gray-300 rounded-lg pl-10 pr-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0078D4]"
            required
          />
        </div>

        {/* Domain Controller IPs */}
        <div className="bg-gray-50 border border-gray-300 rounded-lg p-4">
          <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
            <Image
              src="/monitor.svg"
              alt="Domain Controller"
              width={20}
              height={20}
              className="opacity-80"
            />
            Domain Controller IPs
          </label>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter IP address"
              value={currentIp}
              onChange={(e) => setCurrentIp(e.target.value)}
              className="flex-1 bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0078D4]"
            />
            <button
              type="button"
              onClick={handleAddIp}
              className="bg-[#0078D4] text-white px-4 rounded-lg hover:bg-[#005A9E] transition"
            >
              Add
            </button>
          </div>

          {/* IP chips */}
          <div className="flex flex-wrap gap-2 mt-3">
            {ips.map((ip) => (
              <span
                key={ip}
                className="flex items-center gap-2 bg-[#0078D4]/10 text-[#0078D4] px-3 py-1 rounded-full text-sm"
              >
                {ip}
                <button
                  type="button"
                  onClick={() => handleRemoveIp(ip)}
                  className="text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>

          {ips.length > 0 && (
            <button
              type="button"
              onClick={handleClearIps}
              className="mt-3 text-sm text-red-500 hover:underline"
            >
              Clear All
            </button>
          )}
        </div>

        {/* Username */}
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Image
              src="/user.svg"
              alt="User"
              width={20}
              height={20}
              className="opacity-70"
            />
          </span>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="w-full bg-gray-50 border border-gray-300 rounded-lg pl-10 pr-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0078D4]"
            required
          />
        </div>

        {/* Password */}
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Image
              src="/password.svg"
              alt="Password"
              width={20}
              height={20}
              className="opacity-70"
            />
          </span>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full bg-gray-50 border border-gray-300 rounded-lg pl-10 pr-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0078D4]"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-4">
          <button
            type="submit"
            disabled={loading}
            className={`px-8 py-3 rounded-lg shadow-md font-semibold transition-colors duration-300 ${
              loading
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-[#0078D4] hover:bg-[#005A9E] text-white"
            }`}
          >
            {loading ? "Testing..." : "Test Connection"}
          </button>
        </div>
      </form>

      {/* Modal Popup */}
      {modalMessage && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full text-center">
            <p className="text-gray-800 font-medium">{modalMessage}</p>
            <button
              onClick={() => setModalMessage(null)}
              className="mt-4 bg-[#0078D4] text-white px-6 py-2 rounded-lg hover:bg-[#005A9E] transition"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
