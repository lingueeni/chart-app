"use client";

import { useState, useEffect } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

type User = {
  id: number;
  canonicalName: string;
  displayName: string;
  domainName: string;
  email: string;
  ouName: string;
  passwordExpireIn: string;
  accountStatus: string;
};

export default function UsersTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof User;
    direction: "asc" | "desc";
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // mock data
  useEffect(() => {
    const mockUsers: User[] = [
      {
        id: 1,
        canonicalName: "CN=John Doe,OU=Users,DC=example,DC=com",
        displayName: "John Doe",
        domainName: "example.com",
        email: "john.doe@example.com",
        ouName: "Users",
        passwordExpireIn: "30 days",
        accountStatus: "Active",
      },
      {
        id: 2,
        canonicalName: "CN=Jane Smith,OU=Admins,DC=example,DC=com",
        displayName: "Jane Smith",
        domainName: "example.com",
        email: "jane.smith@example.com",
        ouName: "Admins",
        passwordExpireIn: "Never",
        accountStatus: "Disabled",
      },
      {
        id: 3,
        canonicalName: "CN=Mike Brown,OU=IT,DC=example,DC=com",
        displayName: "Mike Brown",
        domainName: "example.com",
        email: "mike.brown@example.com",
        ouName: "IT",
        passwordExpireIn: "15 days",
        accountStatus: "Active",
      },
      {
        id: 4,
        canonicalName: "CN=Emily Clark,OU=HR,DC=example,DC=com",
        displayName: "Emily Clark",
        domainName: "example.com",
        email: "emily.clark@example.com",
        ouName: "HR",
        passwordExpireIn: "45 days",
        accountStatus: "Active",
      },
      {
        id: 5,
        canonicalName: "CN=David Wilson,OU=Finance,DC=example,DC=com",
        displayName: "David Wilson",
        domainName: "example.com",
        email: "david.wilson@example.com",
        ouName: "Finance",
        passwordExpireIn: "10 days",
        accountStatus: "Disabled",
      },
      {
        id: 6,
        canonicalName: "CN=Alice Green,OU=IT,DC=example,DC=com",
        displayName: "Alice Green",
        domainName: "example.com",
        email: "alice.green@example.com",
        ouName: "IT",
        passwordExpireIn: "90 days",
        accountStatus: "Active",
      },
    ];
    setUsers(mockUsers);
  }, []);

  // Sorting handler
  const handleSort = (key: keyof User) => {
    let direction: "asc" | "desc" = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Filter + Sort
  const filteredUsers = users
    .filter((user) =>
      Object.values(user).some((val) =>
        String(val).toLowerCase().includes(search.toLowerCase())
      )
    )
    .sort((a, b) => {
      if (!sortConfig) return 0;
      const { key, direction } = sortConfig;
      const order = direction === "asc" ? 1 : -1;
      return a[key].toString().localeCompare(b[key].toString()) * order;
    });

  // Pagination
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);

  // Export CSV
  const exportCSV = () => {
    const headers = [
      "Canonical Name",
      "Display Name",
      "Domain Name",
      "Email",
      "OU Name",
      "Password Expire In",
      "Account Status",
    ];
    const rows = filteredUsers.map((u) => [
      u.canonicalName,
      u.displayName,
      u.domainName,
      u.email,
      u.ouName,
      u.passwordExpireIn,
      u.accountStatus,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");

    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "users.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export PDF (fixed)
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text("Users", 14, 15);

    autoTable(doc, {
      head: [
        [
          "Canonical Name",
          "Display Name",
          "Domain Name",
          "Email",
          "OU Name",
          "Password Expire In",
          "Account Status",
        ],
      ],
      body: filteredUsers.map((u) => [
        u.canonicalName,
        u.displayName,
        u.domainName,
        u.email,
        u.ouName,
        u.passwordExpireIn,
        u.accountStatus,
      ]),
      startY: 20,
      styles: {
        fontSize: 8,
        cellPadding: 2,
        valign: "middle",
        halign: "left",
      },
      headStyles: {
        fillColor: [59, 130, 246],
        textColor: 255,
        fontStyle: "bold",
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
    });

    doc.save("users.pdf");
  };

  // Export XLSX
  const exportXLSX = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredUsers.map((u) => ({
        "Canonical Name": u.canonicalName,
        "Display Name": u.displayName,
        "Domain Name": u.domainName,
        Email: u.email,
        "OU Name": u.ouName,
        "Password Expire In": u.passwordExpireIn,
        "Account Status": u.accountStatus,
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    XLSX.writeFile(workbook, "users.xlsx");
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-md overflow-hidden">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 px-6 py-4 border-b border-gray-200 bg-gray-50">
        <h3 className="text-lg font-semibold text-gray-900">Users</h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={exportCSV}
            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded"
          >
            Export CSV
          </button>
          <button
            onClick={exportPDF}
            className="px-3 py-1 bg-red-600 hover:bg-green-700 text-white text-sm rounded"
          >
            Export PDF
          </button>
          <button
            onClick={exportXLSX}
            className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-white text-sm rounded"
          >
            Export XLSX
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="px-6 py-3 border-b border-gray-200">
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1); // reset pagination when searching
          }}
          className="w-full md:w-1/3 bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-700 uppercase text-xs">
              {[
                "canonicalName",
                "displayName",
                "domainName",
                "email",
                "ouName",
                "passwordExpireIn",
                "accountStatus",
              ].map((col) => (
                <th
                  key={col}
                  onClick={() => handleSort(col as keyof User)}
                  className="px-6 py-3 text-left font-semibold cursor-pointer hover:text-blue-600"
                >
                  {col
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (s) => s.toUpperCase())}
                  {sortConfig?.key === col &&
                    (sortConfig.direction === "asc" ? " ↑" : " ↓")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr
                key={user.id}
                className="border-b border-gray-200 hover:bg-gray-50 transition"
              >
                <td className="px-6 py-3 text-gray-800">
                  {user.canonicalName}
                </td>
                <td className="px-6 py-3 text-gray-800">{user.displayName}</td>
                <td className="px-6 py-3 text-gray-800">{user.domainName}</td>
                <td className="px-6 py-3 text-gray-800">{user.email}</td>
                <td className="px-6 py-3 text-gray-800">{user.ouName}</td>
                <td className="px-6 py-3 text-gray-800">
                  {user.passwordExpireIn}
                </td>
                <td
                  className={`px-6 py-3 font-semibold ${
                    user.accountStatus === "Active"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {user.accountStatus}
                </td>
              </tr>
            ))}
            {currentUsers.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-6 py-4 text-center text-gray-500 italic"
                >
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-6 py-3 bg-gray-50 border-t border-gray-200">
        <span className="text-sm text-gray-600">
          Page {currentPage} of {totalPages || 1}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 text-sm bg-gray-200 rounded disabled:opacity-50"
          >
            Prev
          </button>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 text-sm bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
