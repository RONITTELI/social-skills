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
    setProfile((prev) => ({ ...prev, userId: uid || "" }));
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
  <div className="min-h-screen py-16 px-4 bg-linear-to-br from-blue-100 via-purple-100 to-pink-100 flex justify-center">
    <div className="max-w-3xl w-full space-y-10">

      {/* PROFILE PREVIEW */}
      <div className="flex flex-col items-center">
        <div className="w-32 h-32 rounded-full bg-linear-to-br from-blue-400 via-purple-400 to-pink-400 flex items-center justify-center shadow-lg mb-4">
          <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>

        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-blue-600 via-purple-600 to-pink-600">
          {profile.name || "Your Name"}
        </h1>
        <p className="text-gray-600">{profile.education || "Education / Profession"}</p>
      </div>

      {/* PROFILE FORM */}
      <div className="bg-white p-8 rounded-3xl shadow-xl space-y-5">

        {/* Personality */}
        <div>
          <label className="font-semibold">Personality Type</label>
          <select
            className="w-full p-3 border rounded"
            value={profile.personality}
            onChange={(e) => setProfile({ ...profile, personality: e.target.value })}
          >
            <option value="">Select</option>
            <option value="introvert">Introvert</option>
            <option value="ambivert">Ambivert</option>
            <option value="extrovert">Extrovert</option>
          </select>
        </div>

        {/* Confidence */}
        <div>
          <label className="font-semibold">Confidence (1–10)</label>
          <input
            type="number"
            min="1"
            max="10"
            className="w-full p-3 border rounded"
            value={profile.confidence}
            onChange={(e) => setProfile({ ...profile, confidence: e.target.value })}
          />
        </div>

        {/* English Level */}
        <div>
          <label className="font-semibold">English Level</label>
          <select
            className="w-full p-3 border rounded"
            value={profile.englishLevel}
            onChange={(e) => setProfile({ ...profile, englishLevel: e.target.value })}
          >
            <option value="">Select</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        {/* Interests */}
        <div>
          <label className="font-semibold">Interests</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {interestOptions.map((interest) => (
              <button
                key={interest}
                type="button"
                className={`px-4 py-2 rounded-full border ${
                  profile.interests.includes(interest)
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100"
                }`}
                onClick={() => toggleInterest(interest)}
              >
                {interest}
              </button>
            ))}
          </div>
        </div>

        {/* Goal */}
        <div>
          <label className="font-semibold">Goal</label>
          <select
            className="w-full p-3 border rounded"
            value={profile.goal}
            onChange={(e) => setProfile({ ...profile, goal: e.target.value })}
          >
            <option value="">Select</option>
            <option value="interview">Interview Prep</option>
            <option value="confidence">Social Confidence</option>
            <option value="publicspeaking">Public Speaking</option>
            <option value="fluency">Fluency</option>
          </select>
        </div>

        {/* SUBMIT */}
        <button
          onClick={handleSubmit}
          className="w-full bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 text-white p-4 rounded-xl font-semibold hover:scale-105 transition"
        >
          Save & Continue
        </button>
      </div>

    </div>
  </div>
);

}
