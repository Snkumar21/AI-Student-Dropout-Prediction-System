import { useState, useMemo } from "react";
import {
  STUDENTS,
  computeRiskScore,
  getRiskLevel,
} from "./assets/students";
import { useAuth } from "../utils/AuthContext";
import StudentDetail from "./assets/StudentDetail";

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
  Legend,
} from "recharts";

// Navigation Items
const NAV = [
  { id: "dashboard", label: "Dashboard", icon: "🏠" },
  { id: "students", label: "Students", icon: "👥" },
  { id: "analytics", label: "Analytics", icon: "📊" },
  { id: "alerts", label: "Alerts", icon: "🔔" },
];

const Dashboard = () => {
  const { logout } = useAuth();

  const [activePage, setActivePage] = useState("dashboard");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [search, setSearch] = useState("");
  const [filterRisk] = useState("ALL");
  const [sidebarOpen] = useState(true);

  // Add risk score to students
  const studentsWithRisk = useMemo(
    () =>
      STUDENTS.map((s) => ({
        ...s,
        riskScore: computeRiskScore(s),
        risk: getRiskLevel(computeRiskScore(s)),
      })).sort((a, b) => b.riskScore - a.riskScore),
    []
  );

  // Stats
  const stats = useMemo(
    () => ({
      total: studentsWithRisk.length,
      critical: studentsWithRisk.filter(
        (s) => s.risk.level === "CRITICAL"
      ).length,
      high: studentsWithRisk.filter((s) => s.risk.level === "HIGH")
        .length,
      medium: studentsWithRisk.filter(
        (s) => s.risk.level === "MEDIUM"
      ).length,
      low: studentsWithRisk.filter((s) => s.risk.level === "LOW")
        .length,
      avgAttendance: Math.round(
        studentsWithRisk.reduce((a, s) => a + s.attendance, 0) /
          studentsWithRisk.length
      ),
      avgCgpa: (
        studentsWithRisk.reduce((a, s) => a + s.cgpa, 0) /
        studentsWithRisk.length
      ).toFixed(1),
    }),
    [studentsWithRisk]
  );

  // Filtered Students
  const filtered = useMemo(
    () =>
      studentsWithRisk.filter((s) => {
        const matchSearch =
          s.name.toLowerCase().includes(search.toLowerCase()) ||
          s.id.toLowerCase().includes(search.toLowerCase()) ||
          s.branch.toLowerCase().includes(search.toLowerCase());

        const matchRisk =
          filterRisk === "ALL" || s.risk.level === filterRisk;

        return matchSearch && matchRisk;
      }),
    [studentsWithRisk, search, filterRisk]
  );

  if (selectedStudent) {
    return (
      <StudentDetail
        student={selectedStudent}
        onBack={() => setSelectedStudent(null)}
      />
    );
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <div style={{ width: sidebarOpen ? "240px" : "70px" }}>
        {NAV.map((item) => (
          <button
            key={item.id}
            onClick={() => setActivePage(item.id)}
          >
            {item.icon} {sidebarOpen && item.label}
          </button>
        ))}

        <button onClick={logout}>Logout</button>
      </div>

      {/* Main */}
      <div style={{ flex: 1, padding: "20px" }}>
        <h1>{activePage.toUpperCase()}</h1>

        {/* Dashboard Page */}
        {activePage === "dashboard" && (
          <>
            <h2>Total Students: {stats.total}</h2>
            <h3>Critical: {stats.critical}</h3>

            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: "Critical", value: stats.critical },
                    { name: "High", value: stats.high },
                    { name: "Medium", value: stats.medium },
                    { name: "Low", value: stats.low },
                  ]}
                  dataKey="value"
                >
                  {[...Array(4)].map((_, i) => (
                    <Cell key={i} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </>
        )}

        {/* Students Page */}
        {activePage === "students" && (
          <>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
            />

            {filtered.map((s) => (
              <div
                key={s.id}
                onClick={() => setSelectedStudent(s)}
              >
                {s.name} - {s.riskScore}
              </div>
            ))}
          </>
        )}

        {/* Analytics */}
        {activePage === "analytics" && (
          <AnalyticsPage students={studentsWithRisk} />
        )}

        {/* Alerts */}
        {activePage === "alerts" && (
          <AlertsPage students={studentsWithRisk} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;