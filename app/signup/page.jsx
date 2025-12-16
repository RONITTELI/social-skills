"use client";

import { useState } from "react";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignup() {
    const res = await fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.success) {
      alert("Signup successful");
      
      // SAVE EMAIL HERE
      localStorage.setItem("email", email);

      window.location.href = "/login";
    } else {
      alert(data.error);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 shadow-lg rounded-xl w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4 text-blue-600">Create Account</h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border rounded mb-3"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border rounded mb-3"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSignup}
          className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
