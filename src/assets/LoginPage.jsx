import { useState } from "react";
import { useAuth } from "../AuthContext";

const LoginPage = () => {
  const { login, googleLogin, error, setError } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await new Promise((r) => setTimeout(r, 600));
    login(email, password);

    setLoading(false);
  };

  const fillDemo = (role) => {
    const creds = {
      admin: { email: "admin@institute.edu", password: "admin123" },
      mentor: { email: "mentor@institute.edu", password: "mentor123" },
      counselor: { email: "counselor@institute.edu", password: "counsel123" },
    };

    setEmail(creds[role].email);
    setPassword(creds[role].password);
    setError("");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        fontFamily: "'Outfit', sans-serif",
        background:
          "linear-gradient(135deg, #0f172a 0%, #1e1b4b 40%, #0f172a 100%)",
      }}
    >
      {/* Left Panel */}
      <div style={{ flex: 1, padding: "60px", color: "white" }}>
        <h1>
          Early Warning <br />
          <span style={{ color: "#a78bfa" }}>Drop-out</span> Prediction
        </h1>
        <p>AI-powered student risk analytics system.</p>
      </div>

      {/* Right Panel */}
      <div style={{ width: "400px", padding: "40px" }}>
        <h2 style={{ color: "white" }}>Login</h2>

        {/* Google Login */}
        <button onClick={googleLogin}>Continue with Google</button>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />

          {error && <p style={{ color: "red" }}>{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Demo Buttons */}
        <div>
          <button onClick={() => fillDemo("admin")}>Admin</button>
          <button onClick={() => fillDemo("mentor")}>Mentor</button>
          <button onClick={() => fillDemo("counselor")}>
            Counselor
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;