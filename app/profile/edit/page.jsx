"use client";

import { useEffect, useState } from "react";

export default function EditProfile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const uid = localStorage.getItem("userId");
    fetch(`/api/profile/${uid || "guest"}`)
      .then((res) => res.json())
      .then((data) => setProfile(data.profile));
  }, []);

  async function handleUpdate() {
    const res = await fetch("/api/profile/update", {
      method: "PUT",
      body: JSON.stringify(profile),
    });

    const data = await res.json();
    if (data.success) {
      alert("Profile updated!");
      window.location.href = "/account";
    }
  }

  if (!profile) return <p className="p-10">Loading...</p>;

  return (
    <div className="min-h-screen py-16 px-6 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex flex-col items-center justify-center">
      <div className="max-w-4xl w-full mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 drop-shadow-lg">
            Edit Profile
          </h1>
          <p className="text-gray-700 text-lg">Update your personal information below</p>
        </div>
        <div className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-10 border-2 border-white/50">
          <div className="space-y-6">
            {/* Name */}
            <label className="block font-semibold mb-1">Full Name</label>
            <input
              type="text"
              value={profile.name}
              className="w-full p-3 border rounded mb-4"
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            />
            {/* Age + Height */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold mb-1">Age</label>
                <input
                  type="number"
                  value={profile.age}
                  className="w-full p-3 border rounded mb-4"
                  onChange={(e) => setProfile({ ...profile, age: e.target.value })}
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Height (in cm)</label>
                <input
                  type="number"
                  value={profile.height}
                  className="w-full p-3 border rounded mb-4"
                  onChange={(e) => setProfile({ ...profile, height: e.target.value })}
                />
              </div>
            </div>
            {/* Education */}
            <label className="block font-semibold mb-1">Education / Profession</label>
            <input
              type="text"
              value={profile.education}
              className="w-full p-3 border rounded mb-4"
              onChange={(e) => setProfile({ ...profile, education: e.target.value })}
            />
            {/* Personality */}
            <label className="block font-semibold mb-1">Personality Type</label>
            <select
              className="w-full p-3 border rounded mb-4"
              value={profile.personality}
              onChange={(e) => setProfile({ ...profile, personality: e.target.value })}
            >
              <option value="">Select</option>
              <option value="introvert">Introvert</option>
              <option value="ambivert">Ambivert</option>
              <option value="extrovert">Extrovert</option>
            </select>
            {/* Confidence */}
            <label className="block font-semibold mb-1">Communication Confidence (1-10)</label>
            <input
              type="number"
              min="1"
              max="10"
              value={profile.confidence}
              className="w-full p-3 border rounded mb-4"
              onChange={(e) => setProfile({ ...profile, confidence: e.target.value })}
            />
            {/* English Level */}
            <label className="block font-semibold mb-1">English Speaking Level</label>
            <select
              className="w-full p-3 border rounded mb-4"
              value={profile.englishLevel}
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
              {["Technology", "Music", "Sports", "Travel", "Reading", "Gaming", "Art"].map((interest) => (
                <button
                  key={interest}
                  type="button"
                  className={`px-4 py-2 rounded-full border ${profile.interests && profile.interests.includes(interest) ? "bg-blue-600 text-white" : "bg-white text-gray-700"}`}
                  onClick={() => {
                    setProfile((prev) => {
                      const already = prev.interests.includes(interest);
                      const updated = already
                        ? prev.interests.filter((i) => i !== interest)
                        : [...prev.interests, interest];
                      return { ...prev, interests: updated };
                    });
                  }}
                >
                  {interest}
                </button>
              ))}
            </div>
            {/* Goal */}
            <label className="block font-semibold mb-1">Your Goal</label>
            <select
              className="w-full p-3 border rounded mb-6"
              value={profile.goal}
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
              onClick={handleUpdate}
              className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white p-5 rounded-2xl text-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all shadow-xl relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Save Changes
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
