import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../api/UserApi";

export default function Register() {
  const nav = useNavigate();

  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const [showPassword, setShowPassword] = React.useState(false);

  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState<string | null>(null);
  const [messageType, setMessageType] = React.useState<"success" | "error" | null>(null);

  const normalizePhone = (raw: string) => raw.replace(/\D/g, "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!fullName.trim()) return setMessage("Full name is required");
    if (!email.trim()) return setMessage("Email is required");
    if (!phone.trim()) return setMessage("Phone number is required");
    if (!password) return setMessage("Password is required");
    if (password !== confirmPassword) return setMessage("Passwords do not match");

    setLoading(true);

    try {
      const res = await register({
        FullName:fullName,
        Email: email.trim(),
        PhoneNumber: normalizePhone(phone.trim()),
        Password: password,
        ConfirmPassword:confirmPassword
      });

      if (res.status === "SUCCESS") {
        setMessage("Account created successfully. Please login.");
        setMessageType("success");
        nav("/login", { replace: true });
        return;
      }

      setMessage(res.status);
      setMessageType("error");
    } catch (e: any) {
      setMessage(e?.message ?? "REGISTER_FAILED");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={page}>
      <div style={card}>
        <div style={iconWrap} aria-hidden="true">
          {/* wallet icon */}
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

        <h1 style={title}>Create account</h1>
        <p style={subtitle}>Join WalletPay today</p>

        <form onSubmit={handleSubmit} style={{ marginTop: 22 }}>
          {/* Full name */}
          <label style={label}>Full Name</label>
          <div style={inputRow}>
            <span style={leftIcon} aria-hidden="true">
              {/* user icon */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 12a4.5 4.5 0 1 0-4.5-4.5A4.5 4.5 0 0 0 12 12Z"
                  stroke="#6B7280"
                  strokeWidth="1.8"
                />
                <path
                  d="M4.5 20c1.7-4.2 13.3-4.2 15 0"
                  stroke="#6B7280"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </span>

            <input
              type="text"
              placeholder="John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              style={input}
              autoComplete="name"
            />
          </div>

          {/* Email */}
          <div style={{ marginTop: 18 }}>
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
          </div>

          {/* Phone */}
          <div style={{ marginTop: 18 }}>
            <label style={label}>Phone Number</label>
            <div style={inputRow}>
              <span style={leftIcon} aria-hidden="true">
                {/* phone icon */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M8.5 4.5h-2A2.5 2.5 0 0 0 4 7v10a2.5 2.5 0 0 0 2.5 2.5h2"
                    stroke="#6B7280"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                  <path
                    d="M15.5 4.5h2A2.5 2.5 0 0 1 20 7v10a2.5 2.5 0 0 1-2.5 2.5h-2"
                    stroke="#6B7280"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                  <path
                    d="M9 7h6M9 17h6"
                    stroke="#6B7280"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </span>

              <input
                type="tel"
                placeholder="2567XXXXXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={input}
                autoComplete="tel"
              />
            </div>
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
                autoComplete="new-password"
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

          {/* Confirm Password */}
          <div style={{ marginTop: 18 }}>
            <label style={label}>Confirm Password</label>
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
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={input}
                autoComplete="new-password"
              />
            </div>

            {confirmPassword.length > 0 && (
              <div style={hint}>
                {password === confirmPassword ? "✅ Passwords match" : "❌ Passwords do not match"}
              </div>
            )}
          </div>

          <button type="submit" disabled={loading} style={primaryBtn}>
            {loading ? "Creating..." : "Create account"}
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
            Already have an account?{" "}
            <Link to="/login" style={signupLink}>
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ---------- styles (same style family as the Login screen) ---------- */

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
  maxWidth: 420,                 // ⬅️ reduced again
  background: "#fff",
  borderRadius: 16,
  padding: "20px 22px",          // ⬅️ tighter padding
  boxShadow: "0 14px 32px rgba(16,24,40,0.08)",
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
  fontSize: 13,                  // ⬅️ reduced
};


const label: React.CSSProperties = {
  fontWeight: 700,
  marginBottom: 4,               // ⬅️ tighter
  display: "block",
  color: "#111827",
  fontSize: 12,                  // ⬅️ smaller
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

const leftIcon: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 22,
  height: 22,
};

const input: React.CSSProperties = {
  flex: 1,
  border: "none",
  outline: "none",
  fontSize: 13,                  // ⬅️ smaller text
  color: "#111827",
};

const eyeBtn: React.CSSProperties = {
  border: "none",
  background: "transparent",
  cursor: "pointer",
  padding: 4,
  borderRadius: 8,
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

const hint: React.CSSProperties = {
  marginTop: 6,
  color: "#6B7280",
  fontSize: 11,
};

const bottomText: React.CSSProperties = {
  marginTop: 12,
  textAlign: "center",
  color: "#6B7280",
  fontSize: 13,
};

const signupLink: React.CSSProperties = {
  color: "#18A689",
  fontWeight: 800,
  textDecoration: "none",
};


const messageBox: React.CSSProperties = {
  marginTop: 8,
  padding: "8px 10px",
  borderRadius: 10,
  fontWeight: 700,
  textAlign: "center",
  fontSize: 12,
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
