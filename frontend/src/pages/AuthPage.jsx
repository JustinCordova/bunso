import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { register, login } from "../api/index";

const logoUrl = "/logo_t.png";

const AuthPage = ({ mode = "login" }) => {
  const [authMode, setAuthMode] = useState(mode);
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    identifier: "",
    profilePicture: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const fileInputRef = useRef();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, profilePicture: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (authMode === "login") {
        // Login logic
        const { identifier, password } = form;
        const payload = { identifier, password };
        const { data } = await login(payload);
        // Store JWT in localStorage
        localStorage.setItem("bunso_token", data.token);
        localStorage.setItem("bunso_user", JSON.stringify(data.result));
        setError("");
        navigate("/");
      } else {
        // Registration logic
        const { name, username, email, password, profilePicture } = form;
        const [firstName, ...lastArr] = name.trim().split(" ");
        const lastName = lastArr.join(" ");
        const payload = {
          firstName,
          lastName,
          username,
          email,
          password,
          profilePicture,
        };
        await register(payload);
        setError("");
        alert("Registration successful! Please sign in.");
        setAuthMode("login");
        setForm({ ...form, password: "", identifier: "", profilePicture: "" });
      }
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[var(--color-light-purple)] to-[var(--color-light-red)]">
      {/* Left: Logo and Bunso */}
      <div className="flex flex-col justify-center items-center w-1/2 bg-black/60 backdrop-blur-lg">
        <img src={logoUrl} alt="Bunso Logo" className="w-32 h-32 mb-4" />
        <h1 className="text-5xl font-extrabold text-white tracking-wide">
          bunso
        </h1>
      </div>
      {/* Right: Auth Form */}
      <div className="flex flex-col justify-center items-center w-1/2 bg-white/5 backdrop-blur-lg">
        <div className="w-full max-w-md p-8 rounded-xl shadow-lg bg-black/70">
          <h2 className="text-3xl font-bold text-white mb-6">
            {authMode === "login" ? "Sign In" : "Register"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            {authMode === "register" && (
              <>
                <div>
                  <label className="block text-white/80 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded bg-white/10 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--color-light-purple)]"
                  />
                </div>
                <div>
                  <label className="block text-white/80 mb-1">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded bg-white/10 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--color-light-purple)]"
                  />
                </div>
                <div>
                  <label className="block text-white/80 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded bg-white/10 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--color-light-purple)]"
                  />
                </div>
                <div>
                  <label className="block text-white/80 mb-1">
                    Profile Picture
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleProfilePicChange}
                    className="w-full px-4 py-2 rounded bg-white/10 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--color-light-purple)]"
                  />
                  {form.profilePicture && (
                    <img
                      src={form.profilePicture}
                      alt="Profile Preview"
                      className="w-20 h-20 rounded-full mt-2 object-cover border-2 border-[var(--color-light-purple)]"
                    />
                  )}
                </div>
              </>
            )}
            {authMode === "login" && (
              <div>
                <label className="block text-white/80 mb-1">
                  Username or Email
                </label>
                <input
                  type="text"
                  name="identifier"
                  value={form.identifier}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded bg-white/10 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--color-light-purple)]"
                />
              </div>
            )}
            <div>
              <label className="block text-white/80 mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded bg-white/10 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--color-light-purple)]"
              />
            </div>
            {error && (
              <div className="bg-red-500/20 text-red-300 px-4 py-2 rounded text-sm">
                {error}
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 rounded bg-[var(--color-light-red)] hover:bg-[var(--color-light-red)]/80 text-white font-bold text-lg transition-colors duration-200 disabled:opacity-50"
            >
              {loading
                ? authMode === "login"
                  ? "Signing In..."
                  : "Registering..."
                : authMode === "login"
                ? "Sign In"
                : "Register"}
            </button>
          </form>
          <div className="mt-6 text-center">
            {authMode === "login" ? (
              <>
                <span className="text-white/70">Don't have an account? </span>
                <button
                  className="text-[var(--color-light-purple)] hover:underline font-semibold"
                  onClick={() => {
                    setAuthMode("register");
                    setError("");
                  }}
                >
                  Register
                </button>
              </>
            ) : (
              <>
                <span className="text-white/70">Already have an account? </span>
                <button
                  className="text-[var(--color-light-purple)] hover:underline font-semibold"
                  onClick={() => {
                    setAuthMode("login");
                    setError("");
                  }}
                >
                  Sign In
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
