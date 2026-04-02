import { useState } from "react";
import { getRiskLevel } from "./students";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
} from "recharts";

const StudentDetail = ({ student: s, onBack }) => {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([
    {
      text: s.mentorNotes,
      date: "2024-11-28",
      author: "Prof. Sunita Verma",
    },
  ]);

  const [tab, setTab] = useState("overview");

  const riskScore = s.riskScore || 0;
  const riskInfo = s.risk || getRiskLevel(riskScore);

  const radarData = [
    { subject: "Attendance", A: s.attendance, fullMark: 100 },
    { subject: "CGPA", A: s.cgpa * 10, fullMark: 100 },
    {
      subject: "Test Scores",
      A:
        s.subjects.reduce((a, sub) => a + sub.score, 0) /
        s.subjects.length,
      fullMark: 100,
    },
    {
      subject: "Fee Status",
      A: s.feesPaid ? 100 : 0,
      fullMark: 100,
    },
  ];

  const trendData = s.testHistory.map((score, i) => ({
    week: `W${i + 1}`,
    score,
    attendance: s.attendanceHistory[i],
  }));

  return (
    <div style={{ minHeight: "100vh", background: "#0f172a", color: "white" }}>
      {/* Header */}
      <div style={{ padding: "20px" }}>
        <button onClick={onBack}>← Back</button>

        <h2>{s.name}</h2>
        <p>
          {s.id} • {s.branch}
        </p>

        <h3 style={{ color: riskInfo.color }}>
          {riskScore} ({riskInfo.level})
        </h3>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "10px", padding: "10px" }}>
        {["overview", "performance", "subjects", "counseling"].map(
          (t) => (
            <button key={t} onClick={() => setTab(t)}>
              {t}
            </button>
          )
        )}
      </div>

      {/* Overview */}
      {tab === "overview" && (
        <div>
          <h3>Metrics</h3>
          <p>Attendance: {s.attendance}%</p>
          <p>CGPA: {s.cgpa}</p>

          <ResponsiveContainer width="100%" height={250}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <Radar
                dataKey="A"
                stroke={riskInfo.color}
                fill={riskInfo.color}
                fillOpacity={0.3}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Performance */}
      {tab === "performance" && (
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Line dataKey="score" stroke="#8884d8" />
            <Line dataKey="attendance" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      )}

      {/* Subjects */}
      {tab === "subjects" && (
        <div>
          {s.subjects.map((sub, i) => (
            <div key={i}>
              <h4>{sub.name}</h4>
              <p>Score: {sub.score}</p>
              <p>
                Attempts: {sub.attempts}/{sub.maxAttempts}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Counseling */}
      {tab === "counseling" && (
        <div>
          <h3>Notes</h3>

          {notes.map((n, i) => (
            <div key={i}>
              <strong>{n.author}</strong> ({n.date})
              <p>{n.text}</p>
            </div>
          ))}

          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add note..."
          />

          <button
            onClick={() => {
              if (note.trim()) {
                setNotes([
                  ...notes,
                  {
                    text: note,
                    date: new Date().toISOString().split("T")[0],
                    author: "You",
                  },
                ]);
                setNote("");
              }
            }}
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default StudentDetail;