import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../api/UserApi";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState<string | null>(null);
  const [messageType, setMessageType] =React.useState<"success" | "error" | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!email.trim()) return setMessage("Email is required");
    if (!password.trim()) return setMessage("Password is required");

    setLoading(true);
    try 
    {
        const res = await login({ Email: email.trim(), Password: password.trim() });
       if (res.status === "SUCCESS" && res.token) 
        {
            localStorage.setItem("wallet_token", res.token);
            localStorage.setItem("wallet_user", JSON.stringify(res));

            setMessageType("success");
            setMessage("Login successful");

            navigate("/", { replace: true });
            return;
        }

          setMessageType("error");
          setMessage(res.status);
    } catch (err: any) {
      setMessage(err?.message || "LOGIN_FAILED");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={page}>
      <div style={card}>
        {/* Top icon */}
        <div style={iconWrap} aria-hidden="true">
          {/* simple wallet icon (inline svg) */}
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 7.5C4 6.119 5.119 5 6.5 5H18a2 2 0 0 1 2 2v1.25"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <path
              d="M4 9.25V17.5C4 18.881 5.119 20 6.5 20H18a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2H6.5C5.119 8 4 9.119 4 10.5"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <path
              d="M16.2 13.1h3.2"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <h1 style={title}>Welcome back</h1>
        <p style={subtitle}>Sign in to access your wallet</p>

        <form onSubmit={handleSubmit} style={{ marginTop: 22 }}>
          {/* Email */}
          <label style={label}>Email</label>
          <div style={inputRow}>
            <span style={leftIcon} aria-hidden="true">
              {/* mail icon */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 7.5A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5v9A2.5 2.5 0 0 1 17.5 19h-11A2.5 2.5 0 0 1 4 16.5v-9Z"
                  stroke="#6B7280"
                  strokeWidth="1.8"
                />
                <path
                  d="M6.7 8l5.3 4 5.3-4"
                  stroke="#6B7280"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>

            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={input}
              autoComplete="username"
            />
          </div>

          {/* Password */}
          <div style={{ marginTop: 18 }}>
            <label style={label}>Password</label>
            <div style={inputRow}>
              <span style={leftIcon} aria-hidden="true">
                {/* lock icon */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M7 10V8a5 5 0 0 1 10 0v2"
                    stroke="#6B7280"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                  <path
                    d="M6.5 10.5h11A2.5 2.5 0 0 1 20 13v5A2.5 2.5 0 0 1 17.5 20h-11A2.5 2.5 0 0 1 4 18v-5A2.5 2.5 0 0 1 6.5 10.5Z"
                    stroke="#6B7280"
                    strokeWidth="1.8"
                  />
                </svg>
              </span>

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={input}
                autoComplete="current-password"
              />

              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                style={eyeBtn}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {/* eye icon */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7Z"
                    stroke="#6B7280"
                    strokeWidth="1.8"
                  />
                  <path
                    d="M12 15.5A3.5 3.5 0 1 0 12 8.5a3.5 3.5 0 0 0 0 7Z"
                    stroke="#6B7280"
                    strokeWidth="1.8"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div style={rowBetween}>
            <span />
            <button
              type="button"
              onClick={() => setMessage("Forgot password flow not wired yet")}
              style={linkBtn}
            >
              Forgot password?
            </button>
          </div>

          <button type="submit" disabled={loading} style={primaryBtn}>
            {loading ? "Signing in..." : "Sign in"}
          </button>

          {message && (
              <div
                style={{
                  ...messageBox,
                  ...(messageType === "success" ? successBox : errorBox),
                }}
              >
                {message}
              </div>
            )}

          <div style={bottomText}>
            Don&apos;t have an account?{" "}
            <Link to="/register" style={signupLink}>
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ---------- styles (inline to match screenshot, no extra CSS needed) ---------- */

const page: React.CSSProperties = {
  minHeight: "100vh",
  background: "#F6F7FB",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: 16,
};

const card: React.CSSProperties = {
  width: "100%",
  maxWidth: 380,                 // ✅ smaller width
  background: "#fff",
  borderRadius: 18,
  padding: "26px 26px",          // ✅ smaller padding
  boxShadow: "0 18px 40px rgba(16,24,40,0.08)",
};

const iconWrap: React.CSSProperties = {
   width: 48,                     // ⬅️ smaller
  height: 48,
  borderRadius: 14,
  background: "#18A689",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto 10px",
};

const title: React.CSSProperties = {
   textAlign: "center",
  margin: 0,
  fontSize: 24,                  // ⬅️ reduced
  fontWeight: 800,
  letterSpacing: -0.4,
  color: "#111827",
};

const subtitle: React.CSSProperties = {
  textAlign: "center",
  margin: "6px 0 0",
  color: "#6B7280",
  fontSize: 13,                  
};


const label: React.CSSProperties = {
  fontWeight: 700,
  marginBottom: 4,              
  display: "block",
  color: "#111827",
  fontSize: 12,                
};
const inputRow: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  border: "1px solid #E5E7EB",
  borderRadius: 14,
  padding: "8px 12px",           // ⬅️ reduced height
  background: "#fff",
};
const rowBetween: React.CSSProperties = { display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10, fontSize:13};
const leftIcon: React.CSSProperties = {
  display: "inline-flex",        // ✅ FIXED (was wrong in your code)
  alignItems: "center",
  justifyContent: "center",
  width: 26,
  height: 26,
};

const input: React.CSSProperties = {
  flex: 1,
  border: "none",
  outline: "none",
  fontSize: 13,                  // ✅ smaller input text
  color: "#111827",
};

const eyeBtn: React.CSSProperties = {
  border: "none",
  background: "transparent",
  cursor: "pointer",
  padding: 4,
  borderRadius: 8,
};


const linkBtn: React.CSSProperties = {
  border: "none",
  background: "transparent",
  color: "#18A689",
  fontWeight: 700,
  cursor: "pointer",
  fontSize: 13,                  // ✅ smaller
};

const primaryBtn: React.CSSProperties = {
  width: "100%",
  marginTop: 12,
  padding: "10px 14px",          // ⬅️ shorter button
  borderRadius: 16,
  border: "none",
  cursor: "pointer",
  background: "#18A689",
  color: "#fff",
  fontSize: 15,                  // ⬅️ smaller
  fontWeight: 800,
};

const messageBox: React.CSSProperties = {
  marginTop: 14,
  padding: "10px 12px",
  borderRadius: 12,
  background: "rgba(17,24,39,0.04)",
  color: "#111827",
};
const bottomText: React.CSSProperties = {
  marginTop: 12,
  textAlign: "center",
  color: "#6B7280",
  fontSize: 13,
};
// const bottomText: React.CSSProperties = {
//   marginTop: 22,
//   textAlign: "center",
//   color: "#6B7280",
//   fontSize: 16,
// };

const signupLink: React.CSSProperties = {
  color: "#18A689",
  fontWeight: 700,
  textDecoration: "none",
};

const successBox: React.CSSProperties = {
  background: "rgba(16,185,129,0.12)",
  color: "#065F46",
  border: "1px solid rgba(16,185,129,0.35)",
};

const errorBox: React.CSSProperties = {
  background: "rgba(239,68,68,0.12)",
  color: "#7F1D1D",
  border: "1px solid rgba(239,68,68,0.35)",
};

const forgotRow: React.CSSProperties = {
  display: "flex",
  justifyContent: "flex-end",
  marginTop: 8,
};

