"use client";

import { useState, useEffect } from "react";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    userId: "",
    name: "",
    age: "",
    height: "",
    education: "",
    personality: "",
    confidence: "",
    englishLevel: "",
    interests: [],
    goal: "",
  });

  useEffect(() => {
    const uid = localStorage.getItem("userId");
    if (!uid) {
      window.location.href = "/login";
      return;
    }
    setProfile((prev) => ({ ...prev, userId: uid }));
  }, []);

  const interestOptions = ["Technology", "Music", "Sports", "Travel", "Reading", "Gaming", "Art"];

  function toggleInterest(interest) {
    setProfile((prev) => {
      const already = prev.interests.includes(interest);
      const updated = already
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest];
      return { ...prev, interests: updated };
    });
  }

  async function handleSubmit() {
    const res = await fetch("/api/profile", {
      method: "POST",
      body: JSON.stringify(profile),
    });

    const data = await res.json();
    if (data.success) {
      alert("Profile saved!");
      window.location.href = "/scenarios";
    } else {
      alert(data.error);
    }
  }

  return (
    <div className="min-h-screen bg-blue-50 flex justify-center py-10 px-4">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-3xl">
        
        <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          Complete Your Profile
        </h1>

        {/* Name */}
        <label className="block font-semibold mb-1">Full Name</label>
        <input
          type="text"
          className="w-full p-3 border rounded mb-4"
          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
        />

        {/* Age + Height */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Age</label>
            <input
              type="number"
              className="w-full p-3 border rounded mb-4"
              onChange={(e) => setProfile({ ...profile, age: e.target.value })}
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Height (in cm)</label>
            <input
              type="number"
              className="w-full p-3 border rounded mb-4"
              onChange={(e) => setProfile({ ...profile, height: e.target.value })}
            />
          </div>
        </div>

        {/* Education */}
        <label className="block font-semibold mb-1">Education / Profession</label>
        <input
          type="text"
          className="w-full p-3 border rounded mb-4"
          onChange={(e) => setProfile({ ...profile, education: e.target.value })}
        />

        {/* Personality */}
        <label className="block font-semibold mb-1">Personality Type</label>
        <select
          className="w-full p-3 border rounded mb-4"
          onChange={(e) => setProfile({ ...profile, personality: e.target.value })}
        >
          <option value="">Select</option>
          <option value="introvert">Introvert</option>
          <option value="ambivert">Ambivert</option>
          <option value="extrovert">Extrovert</option>
        </select>

        {/* Confidence */}
        <label className="block font-semibold mb-1">
          Communication Confidence (1-10)
        </label>
        <input
          type="number"
          min="1"
          max="10"
          className="w-full p-3 border rounded mb-4"
          onChange={(e) => setProfile({ ...profile, confidence: e.target.value })}
        />

        {/* English Level */}
        <label className="block font-semibold mb-1">English Speaking Level</label>
        <select
          className="w-full p-3 border rounded mb-4"
          onChange={(e) => setProfile({ ...profile, englishLevel: e.target.value })}
        >
          <option value="">Select</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>

        {/* Interests */}
        <label className="block font-semibold mb-2">Your Interests</label>
        <div className="flex flex-wrap gap-2 mb-4">
          {interestOptions.map((interest) => (
            <button
              key={interest}
              type="button"
              className={`px-4 py-2 rounded-full border ${
                profile.interests.includes(interest)
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700"
              }`}
              onClick={() => toggleInterest(interest)}
            >
              {interest}
            </button>
          ))}
        </div>

        {/* Goal */}
        <label className="block font-semibold mb-1">Your Goal</label>
        <select
          className="w-full p-3 border rounded mb-6"
          onChange={(e) => setProfile({ ...profile, goal: e.target.value })}
        >
          <option value="">Select</option>
          <option value="interview">Interview Preparation</option>
          <option value="confidence">Build Social Confidence</option>
          <option value="publicspeaking">Improve Public Speaking</option>
          <option value="fluency">Improve Fluency</option>
        </select>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white p-4 rounded-xl text-lg hover:bg-blue-700"
        >
          Save & Continue
        </button>
      </div>
    </div>
  );
}
