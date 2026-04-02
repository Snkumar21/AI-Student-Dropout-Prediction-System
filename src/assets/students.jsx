// src/data/students.jsx

export const STUDENTS = [
  {
    id: "STU001",
    name: "Aarav Sharma",
    branch: "Computer Science",
    year: 2,
    semester: 3,
    attendance: 42,
    cgpa: 4.8,
    backlogs: 4,
    feesPaid: false,
    lastActive: "2024-11-10",
    subjects: [
      { name: "Data Structures", score: 31, attempts: 3, maxAttempts: 4 },
      { name: "DBMS", score: 28, attempts: 2, maxAttempts: 4 },
      { name: "OS", score: 45, attempts: 1, maxAttempts: 4 },
      { name: "Maths III", score: 22, attempts: 3, maxAttempts: 4 },
    ],
    testHistory: [72, 65, 58, 44, 38, 31],
    attendanceHistory: [68, 62, 55, 48, 42, 42],
    mentorNotes:
      "Student has stopped attending labs. Family financial issues suspected.",
    phone: "+91-9876500001",
    email: "aarav.s@institute.edu",
    guardian: "Rajesh Sharma",
    guardianPhone: "+91-9876500010",
  },

  // (rest of your students remain SAME — no change needed)
];

export const USERS = [
  {
    id: 1,
    name: "Dr. Amit Kumar",
    email: "admin@institute.edu",
    password: "admin123",
    role: "admin",
    avatar: "AK",
  },
  {
    id: 2,
    name: "Prof. Sunita Verma",
    email: "mentor@institute.edu",
    password: "mentor123",
    role: "mentor",
    avatar: "SV",
  },
  {
    id: 3,
    name: "Rahul Gupta",
    email: "counselor@institute.edu",
    password: "counsel123",
    role: "counselor",
    avatar: "RG",
  },
];

// ✅ Risk Score Calculation
export const computeRiskScore = (student) => {
  let score = 0;

  // Attendance (30%)
  if (student.attendance < 40) score += 30;
  else if (student.attendance < 55) score += 22;
  else if (student.attendance < 65) score += 12;
  else if (student.attendance < 75) score += 5;

  // CGPA (25%)
  if (student.cgpa < 4.5) score += 25;
  else if (student.cgpa < 5.5) score += 18;
  else if (student.cgpa < 6.5) score += 10;
  else if (student.cgpa < 7.0) score += 4;

  // Backlogs (25%)
  if (student.backlogs >= 5) score += 25;
  else if (student.backlogs >= 3) score += 18;
  else if (student.backlogs >= 1) score += 8;

  // Fees (10%)
  if (!student.feesPaid) score += 10;

  // Attempts (10%)
  const exhausted = student.subjects.filter(
    (s) => s.attempts >= s.maxAttempts - 1
  ).length;

  if (exhausted >= 2) score += 10;
  else if (exhausted >= 1) score += 5;

  return Math.min(score, 100);
};

// ✅ Risk Level Mapping
export const getRiskLevel = (score) => {
  if (score >= 65)
    return { level: "CRITICAL", color: "#ef4444", bg: "#fef2f2", badge: "🔴" };

  if (score >= 40)
    return { level: "HIGH", color: "#f97316", bg: "#fff7ed", badge: "🟠" };

  if (score >= 20)
    return { level: "MEDIUM", color: "#eab308", bg: "#fefce8", badge: "🟡" };

  return { level: "LOW", color: "#22c55e", bg: "#f0fdf4", badge: "🟢" };
};