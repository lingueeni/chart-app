"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";

const steps = [
  "Step 1: Checking Users...",
  "Step 2: Verifying Groups...",
  "Step 3: Validating Policies...",
  "Step 4: Scanning Security Settings...",
  "Step 5: Finalizing...",
];

const barData = [
  { name: "Auth", value: 45 },
  { name: "Groups", value: 30 },
  { name: "Policies", value: 60 },
  { name: "Users", value: 75 },
];

const pieData = [
  { name: "Passed", value: 70 },
  { name: "Failed", value: 30 },
];
const COLORS = ["#16a34a", "#dc2626"];

const lineData = [
  { name: "Step 1", progress: 20 },
  { name: "Step 2", progress: 45 },
  { name: "Step 3", progress: 65 },
  { name: "Step 4", progress: 90 },
  { name: "Step 5", progress: 100 },
];

export default function ADXLoadingScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();

  useEffect(() => {
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < steps.length) {
        setCurrentStep(step);
      } else {
        clearInterval(interval);
        // Simulate API finishing
        setTimeout(() => router.push("/"), 1000);
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[600px] bg-gray-50 rounded-2xl border border-gray-200 shadow-sm p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 animate-pulse">
        Running Active Directory Extended Checks...
      </h2>

      {/* Spinner */}
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-6"></div>

      {/* Responsive Charts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {/* Bar Chart */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h4 className="text-sm font-semibold text-gray-600 mb-2">
            Test Coverage
          </h4>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3B82F6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h4 className="text-sm font-semibold text-gray-600 mb-2">
            Results Breakdown
          </h4>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={70}
                label
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h4 className="text-sm font-semibold text-gray-600 mb-2">
            Progress Timeline
          </h4>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="progress"
                stroke="#2563EB"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Step Progress Text */}
      <p className="mt-6 text-gray-600 text-center animate-pulse">
        {steps[currentStep]}
      </p>
    </div>
  );
}
