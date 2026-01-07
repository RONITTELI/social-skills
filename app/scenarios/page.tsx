"use client";
import Link from "next/link";

const scenarios = [
  { id: 1, title: "Interview Introduction", prompt: "Tell me about yourself in 30 seconds." },
  { id: 2, title: "Meet a New Friend", prompt: "Introduce yourself casually to someone new." },
  { id: 3, title: "Classroom Introduction", prompt: "Introduce yourself on the first day of class." },
  { id: 4, title: "Workplace Conversation", prompt: "Explain your role to a teammate." },
];

export default function ScenariosPage() {
  const getGradientClasses = (index) => {
    const gradients = [
      { bg: 'from-blue-500/10 to-purple-500/10', badge: 'from-blue-500 to-purple-600' },
      { bg: 'from-purple-500/10 to-pink-500/10', badge: 'from-purple-500 to-pink-600' },
      { bg: 'from-green-500/10 to-emerald-500/10', badge: 'from-green-500 to-emerald-600' },
      { bg: 'from-orange-500/10 to-yellow-500/10', badge: 'from-orange-500 to-yellow-600' }
    ];
    return gradients[index % 4];
  };

  return (
    <div className="min-h-screen py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Select a Scenario</h1>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto">Choose a scenario below to start practicing your communication skills</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {scenarios.map((s, index) => {
            const gradient = getGradientClasses(index);
            return (
              <Link
                key={s.id}
                href={{
                  pathname: "/prompt",
                  query: {
                    title: s.title,
                    prompt: s.prompt,
                  },
                }}
              >
                <div className="group relative h-full p-8 bg-white/90 backdrop-blur shadow-xl rounded-3xl hover:shadow-2xl cursor-pointer transition-all duration-300 border border-gray-100 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradient.bg} opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                  <div className="relative flex flex-col h-full">
                    <div className={`w-14 h-14 mb-4 rounded-2xl bg-gradient-to-br ${gradient.badge} flex items-center justify-center shadow-lg`}>
                      <span className="text-2xl font-bold text-white">{s.id}</span>
                    </div>
                    <h2 className="text-xl font-bold mb-3 text-gray-900">{s.title}</h2>
                    <p className="text-gray-600 text-sm mb-4 flex-grow">{s.prompt}</p>
                    <p className="text-blue-600 font-semibold group-hover:translate-x-1 transition-transform">Start practicing →</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
