"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function RecordPage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const [promptData, setPromptData] = useState<{ title: string; prompt: string } | null>(null);
  const [recording, setRecording] = useState(false);
  const [videoURL, setVideoURL] = useState("");
  const [timer, setTimer] = useState(0);
  const [transcript, setTranscript] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("scenario");
    if (saved) {
      setPromptData(JSON.parse(saved));
    }
  }, []);

  async function startRecording() {
    setTimer(0);
    setTranscript("");
    setVideoURL("");
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    }

    // Speech Recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';
        for (let i = 0; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
        setTranscript(finalTranscript + interimTranscript);
      };
      recognition.start();
    }

    const recorder = new MediaRecorder(stream);
    const chunks: BlobPart[] = [];

    recorder.ondataavailable = (e) => chunks.push(e.data);

    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: "video/webm" });
      const url = URL.createObjectURL(blob);
      setVideoURL(url);
    };

    mediaRecorderRef.current = recorder;
    recorder.start();
    setRecording(true);

    intervalRef.current = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
  }

  function stopRecording() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setRecording(false);

    const tracks = (videoRef.current?.srcObject as MediaStream)?.getTracks();
    tracks?.forEach((track) => track.stop());
  }

  return (
    <div className="min-h-screen py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <button onClick={() => router.push('/prompt')} className="text-gray-600 hover:text-gray-900 mb-4 flex items-center gap-2 transition">
            <span>←</span> Back to Prompt
          </button>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Record Your Response</h1>
        </div>

        {promptData && (
          <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6 rounded-2xl shadow-lg mb-8 border-2 border-white/50">
            <h2 className="font-bold text-xl text-gray-900 mb-2">{promptData.title}</h2>
            <p className="text-gray-700 text-lg">{promptData.prompt}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-4 shadow-2xl">
              <video
                ref={videoRef}
                className="w-full aspect-video bg-black rounded-2xl"
                muted
              ></video>
            </div>

            {videoURL && (
              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center gap-2">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Preview
                </h2>
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-4 shadow-2xl">
                  <video src={videoURL} controls className="w-full aspect-video rounded-2xl" />
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-white/90 backdrop-blur rounded-3xl p-6 shadow-xl border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">Recording Time</p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{timer}s</p>
                </div>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur rounded-3xl p-6 shadow-xl border border-gray-100">
              <h3 className="font-bold text-lg mb-3 text-gray-900 flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
                Live Transcript
              </h3>
              <div className="bg-gray-50 rounded-2xl p-4 max-h-64 overflow-y-auto">
                <p className="text-gray-700 leading-relaxed">{transcript || "Start speaking to see transcript..."}</p>
              </div>
            </div>

            <div className="space-y-3">
              {!recording ? (
                <button
                  onClick={startRecording}
                  className="w-full px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl hover:shadow-2xl hover:scale-105 transition-all shadow-xl font-semibold flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="8" />
                  </svg>
                  Start Recording
                </button>
              ) : (
                <button
                  onClick={stopRecording}
                  className="w-full px-6 py-4 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-2xl hover:shadow-2xl hover:scale-105 transition-all shadow-xl font-semibold flex items-center justify-center gap-2 animate-pulse"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                  </svg>
                  Stop Recording
                </button>
              )}

              {videoURL && (
                <button
                  onClick={() => {
                    localStorage.setItem("transcript", transcript);
                    localStorage.setItem("duration", timer.toString());
                    router.push("/analysis");
                  }}
                  className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-2xl hover:shadow-2xl hover:scale-105 transition-all shadow-xl font-semibold flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Continue to Analysis
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
