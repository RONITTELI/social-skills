// "use client";
// import Link from "next/link";

// export default function HomePage() {
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">

//       {/* NAVBAR */}
//       <header className="flex justify-between items-center px-8 py-4 shadow-sm bg-white">
//         <h1 className="text-2xl font-extrabold text-blue-700">SocialSkill AI</h1>
        
//         <div className="flex gap-4">
//           <Link
//             href="/login"
//             className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
//           >
//             Login
//           </Link>

//           <Link
//             href="/signup"
//             className="px-4 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50"
//           >
//             Sign Up
//           </Link>
//         </div>
//       </header>

//       {/* HERO */}
//       <section className="text-center mt-14 max-w-3xl mx-auto px-6">
//         <h2 className="text-4xl font-bold text-gray-800 leading-snug">
//           Build Your <span className="text-blue-600">Confidence</span> & Social Skills with AI
//         </h2>

//         <p className="mt-4 text-gray-600 text-lg">
//           Practice speaking, improve expressions, fix posture, and receive real-time AI feedback.
//         </p>

//         <Link
//           href="/profile"
//           className="mt-8 inline-block px-8 py-4 bg-blue-600 text-white rounded-xl text-lg hover:bg-blue-700"
//         >
//           Start Assessment
//         </Link>
//       </section>

//       {/* MODULES */}
//       <section className="mt-16 px-10 pb-20">
//         <h3 className="text-2xl font-bold mb-6 text-gray-700">Explore Modules</h3>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

//           {/* 1. Scenario & Response */}
//           <Link href="/scenarios" className="p-6 bg-white shadow-md rounded-xl hover:shadow-lg transition cursor-pointer">
//             <h2 className="text-xl font-semibold text-blue-600 mb-2">Scenario & Response Capture</h2>
//             <p className="text-gray-600 text-sm">
//               Choose a scenario, view prompt, and record your response.
//             </p>
//           </Link>

//           {/* 2. Speech & Tone Analysis */}
//           <Link href="/speech-analysis" className="p-6 bg-white shadow-md rounded-xl hover:shadow-lg transition cursor-pointer">
//             <h2 className="text-xl font-semibold text-blue-600 mb-2">Speech & Tone Analysis</h2>
//             <p className="text-gray-600 text-sm">
//               Analyze clarity, tone, speed, filler words, and fluency.
//             </p>
//           </Link>

//           {/* 3. Facial Emotion Analysis */}
//           <Link href="/emotion" className="p-6 bg-white shadow-md rounded-xl hover:shadow-lg transition cursor-pointer">
//             <h2 className="text-xl font-semibold text-blue-600 mb-2">Facial Emotion Analysis</h2>
//             <p className="text-gray-600 text-sm">
//               Detect emotions, eye contact, and facial expressions.
//             </p>
//           </Link>

//           {/* 4. Body Language */}
//           <Link href="/posture" className="p-6 bg-white shadow-md rounded-xl hover:shadow-lg transition cursor-pointer">
//             <h2 className="text-xl font-semibold text-blue-600 mb-2">Body Language</h2>
//             <p className="text-gray-600 text-sm">
//               Identify posture, gestures, and confidence level.
//             </p>
//           </Link>

//           {/* 5. AI Feedback Engine */}
//           <Link href="/feedback" className="p-6 bg-white shadow-md rounded-xl hover:shadow-lg transition cursor-pointer">
//             <h2 className="text-xl font-semibold text-blue-600 mb-2">AI Feedback Engine</h2>
//             <p className="text-gray-600 text-sm">
//               Get AI-powered communication improvement suggestions.
//             </p>
//           </Link>

//           {/* 6. Progress Dashboard */}
//           <Link href="/dashboard" className="p-6 bg-white shadow-md rounded-xl hover:shadow-lg transition cursor-pointer">
//             <h2 className="text-xl font-semibold text-blue-600 mb-2">Progress Dashboard</h2>
//             <p className="text-gray-600 text-sm">
//               Track your communication progress over time.
//             </p>
//           </Link>

//         </div>
//       </section>
//     </div>
//   );
// }







"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const uid = localStorage.getItem("userId");
    const storedEmail = localStorage.getItem("email");

    if (uid && storedEmail) {
      setLoggedIn(true);
      setEmail(storedEmail);
    } else {
      setLoggedIn(false);
    }
  }, []);

  return (
    <div className="min-h-screen">
      {/* HERO SECTION */}
      <section className="relative text-center pt-20 pb-24 px-6 overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-linear-to-br from-blue-100 via-purple-100 to-pink-100 -z-10"></div>
        
        <div className="max-w-4xl mx-auto">
          {/* Hero Content Card */}
          <div className="relative bg-linear-to-br from-white via-blue-50/30 to-purple-50/30 backdrop-blur-xl rounded-3xl p-12 shadow-[0_20px_60px_rgba(0,0,0,0.15)] border-2 border-white/50 hover:shadow-[0_25px_70px_rgba(0,0,0,0.2)] transition-all duration-300">
            {/* Decorative gradient orbs */}
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-linear-to-br from-blue-400/30 to-purple-400/30 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-linear-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6 drop-shadow-sm">
                Build Your <span className="bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">Confidence</span> & Social Skills with AI
              </h2>

              <p className="mt-6 text-gray-800 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
                Practice speaking, improve expressions, fix posture, and receive real-time AI feedback.
              </p>

              <Link
                href="/profile"
                className="mt-10 inline-block px-10 py-4 bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-2xl text-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all shadow-xl relative overflow-hidden group"
              >
                <span className="relative z-10">Create Profile</span>
                <div className="absolute inset-0 bg-linear-to-r from-pink-600 via-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* MODULES */}
      <section className="px-6 pb-20">
        <h3 className="text-3xl font-bold mb-8 text-gray-900 text-center">Explore Modules</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">

          {/* 1. Scenario & Response */}
          <Link href="/scenarios" className="group relative p-8 bg-white/80 backdrop-blur shadow-xl rounded-2xl hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100">
            <div className="absolute inset-0 bg-linear-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative">
              <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Scenario & Response Capture</h2>
              <p className="text-gray-700 text-sm leading-relaxed">
                Choose a scenario, view prompt, and record your response.
              </p>
            </div>
          </Link>

          {/* 2. Speech Analysis */}
          <Link href="/analysis" className="group relative p-8 bg-white/80 backdrop-blur shadow-xl rounded-2xl hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100">
            <div className="absolute inset-0 bg-linear-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative">
              <div className="w-12 h-12 bg-linear-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Speech & Tone Analysis</h2>
              <p className="text-gray-700 text-sm leading-relaxed">
                Analyze clarity, tone, speed, filler words, and fluency.
              </p>
            </div>
          </Link>

          {/* 3. Facial Emotion */}
          <Link href="/emotion" className="group relative p-8 bg-white/80 backdrop-blur shadow-xl rounded-2xl hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100">
            <div className="absolute inset-0 bg-linear-to-br from-pink-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative">
              <div className="w-12 h-12 bg-linear-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Facial Emotion Analysis</h2>
              <p className="text-gray-700 text-sm leading-relaxed">
                Detect emotions, eye contact, and facial expressions.
              </p>
            </div>
          </Link>

          {/* 4. Body Language */}
          <Link href="/posture" className="group relative p-8 bg-white/80 backdrop-blur shadow-xl rounded-2xl hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100">
            <div className="absolute inset-0 bg-linear-to-br from-indigo-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative">
              <div className="w-12 h-12 bg-linear-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Body Language Analysis</h2>
              <p className="text-gray-700 text-sm leading-relaxed">
                Identify posture, gestures, and confidence level.
              </p>
            </div>
          </Link>

          {/* 5. AI Feedback */}
          <Link href="/feedback" className="group relative p-8 bg-white/80 backdrop-blur shadow-xl rounded-2xl hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100">
            <div className="absolute inset-0 bg-linear-to-br from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative">
              <div className="w-12 h-12 bg-linear-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">AI Feedback Engine</h2>
              <p className="text-gray-700 text-sm leading-relaxed">
                Get AI-powered communication improvement suggestions.
              </p>
            </div>
          </Link>

          {/* 6. Progress Dashboard */}
          <Link href="/dashboard" className="group relative p-8 bg-white/80 backdrop-blur shadow-xl rounded-2xl hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100">
            <div className="absolute inset-0 bg-linear-to-br from-orange-500/10 to-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative">
              <div className="w-12 h-12 bg-linear-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Progress Dashboard</h2>
              <p className="text-gray-700 text-sm leading-relaxed">
                Track your communication progress over time.
              </p>
            </div>
          </Link>

        </div>
      </section>
    </div>
  );
}
