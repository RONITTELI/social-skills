"use client";
import React from "react";

export default function FacialEmotionPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-pink-100 via-purple-100 to-blue-100 p-8">
      <div className="bg-white/90 rounded-3xl shadow-2xl p-10 max-w-xl w-full text-center border-2 border-white/50">
        <h1 className="text-3xl font-extrabold bg-linear-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">Facial Emotion Analysis</h1>
        <p className="text-gray-700 mb-8">(Frontend Only) This module will analyze your facial expressions and eye contact during speech. In the real app, you would see live video and emotion results here.</p>
        <div className="flex flex-col items-center gap-6">
          <div className="w-40 h-40 rounded-full bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300 flex items-center justify-center mb-2">
            <span className="text-6xl">😊</span>
          </div>
          <div className="space-y-2">
            <div className="text-lg font-semibold">Detected Emotion: <span className="text-pink-600">Happy</span></div>
            <div className="text-gray-600">Eye Contact: <span className="text-blue-600 font-semibold">Good</span></div>
            <div className="text-gray-600">Facial Expression: <span className="text-purple-600 font-semibold">Smiling</span></div>
          </div>
        </div>
        <div className="mt-8 text-xs text-gray-400">(This is a static mockup. No camera or backend yet.)</div>
      </div>
    </div>
  );
}
