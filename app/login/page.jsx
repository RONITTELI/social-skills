"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.success) {
      alert("Login successful");
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("email", email);   // <-- IMPORTANT

      window.location.href = "/profile";
    } else {
      alert(data.error);
    }
  }

  return (
    <div className="min-h-[calc(100vh-72px)] flex items-center justify-center bg-gradient-to-b from-blue-50 to-white">
      <div className="bg-white/90 backdrop-blur p-8 shadow-xl rounded-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold mb-2 text-gray-900">Welcome back</h1>
        <p className="text-gray-600 mb-6">Sign in to continue</p>

        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          placeholder="you@example.com"
          className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-blue-600 focus:outline-none"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input
          type="password"
          placeholder="••••••••"
          className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-blue-600 focus:outline-none"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </button>

        <p className="text-sm text-gray-600 mt-4">Don't have an account? <a href="/signup" className="text-blue-600 hover:underline">Sign up</a></p>
      </div>
    </div>
  );
}
