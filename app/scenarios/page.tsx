"use client";
import React, { useState, useRef, useEffect } from "react";

const scenarios = [
  "Job Interview",
  "Making a New Friend",
  "Public Speaking",
  "Ordering at a Restaurant",
  "Giving Feedback",
  "Team Meeting"
];

export default function ScenarioSpeechPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraOn, setCameraOn] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (cameraOn && videoRef.current) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then((stream) => {
          videoRef.current!.srcObject = stream;
        })
        .catch((err) => {
          setError("Camera access denied or not available.");
        });
    } else if (videoRef.current) {
      if (videoRef.current.srcObject) {
        (videoRef.current.srcObject as MediaStream)
          .getTracks()
          .forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
    }
    // Cleanup on unmount
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        (videoRef.current.srcObject as MediaStream)
          .getTracks()
          .forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
    };
  }, [cameraOn]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-blue-100 via-purple-100 to-pink-100 p-8">
      <div className="bg-white/90 rounded-3xl shadow-2xl p-10 max-w-xl w-full text-center border-2 border-white/50">
        <h1 className="text-3xl font-extrabold bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">Scenario & Speech Analysis</h1>
        <p className="text-gray-700 mb-8">(Frontend Only) Select a scenario and turn on your camera. In the real app, you would record audio/video and see speech analysis here.</p>
        <div className="grid grid-cols-1 gap-3 mb-6">
          {scenarios.map((sc, i) => (
            <button
              key={sc}
              className={`w-full px-6 py-3 rounded-xl border font-semibold transition-all ${selected === sc ? "bg-blue-600 text-white" : "bg-white text-blue-700 border-blue-200 hover:bg-blue-50"}`}
              onClick={() => setSelected(sc)}
            >
              {i + 1}. {sc}
            </button>
          ))}
        </div>
        {selected && (
          <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200 text-blue-800">
            <div className="font-bold mb-2">Selected Scenario:</div>
            <div>{selected}</div>
            <button
              className={`mt-4 px-6 py-2 rounded-xl font-semibold transition-all ${cameraOn ? "bg-red-600 text-white" : "bg-blue-600 text-white"}`}
              onClick={() => setCameraOn((on) => !on)}
            >
              {cameraOn ? "Turn Off Camera" : "Turn On Camera"}
            </button>
            {error && <div className="mt-2 text-red-500 text-sm">{error}</div>}
            {cameraOn && (
              <div className="mt-6 flex flex-col items-center">
                <video ref={videoRef} autoPlay playsInline className="rounded-2xl border-4 border-blue-200 shadow-lg w-64 h-48 bg-black" />
                <div className="mt-2 text-xs text-gray-400">(Camera preview only, not recording)</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
