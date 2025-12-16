"use client";

import { useEffect, useState } from "react";

export default function AccountPage() {
  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const uid = localStorage.getItem("userId");
    const storedEmail = localStorage.getItem("email");

    if (!uid) window.location.href = "/login";

    setEmail(storedEmail);

    fetch(`/api/profile/${uid}`)
      .then((res) => res.json())
      .then((data) => {
        setProfile(data.profile);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="p-10">Loading...</p>;

  if (!profile) {
    return (
      <div className="p-10 text-center">
        <p className="text-gray-800 text-lg mb-4">
          No profile found. Please create your profile first.
        </p>
        <a
          href="/profile"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg"
        >
          Create Profile
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-xl mt-10">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">My Account</h1>

      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold">
          {profile.name.charAt(0).toUpperCase()}
        </div>

        <div>
          <p className="text-lg font-semibold">{profile.name}</p>
          <p className="text-gray-700">{email}</p>
        </div>
      </div>

      <div className="space-y-3">
        <p><b>Age:</b> {profile.age}</p>
        <p><b>Height:</b> {profile.height} cm</p>
        <p><b>Education:</b> {profile.education}</p>
        <p><b>Personality:</b> {profile.personality}</p>
        <p><b>Confidence:</b> {profile.confidence}/10</p>
        <p><b>English Level:</b> {profile.englishLevel}</p>
        <p><b>Interests:</b> {profile.interests.join(", ")}</p>
        <p><b>Goal:</b> {profile.goal}</p>
      </div>
    </div>
  );
}
