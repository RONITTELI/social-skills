import { generateFeedback } from "@/lib/feedbackEngine";

export default function FeedbackTestPage() {
  const result = generateFeedback({
    wpm: 165,
    fillerWords: 4,
    confidenceScore: 5,
    tone: "nervous",
    duration: 28,
    personality: "ambivert"
  });

  console.log(result);

  return (
    <div style={{ padding: 30 }}>
      <h1>Feedback Engine Test</h1>

      <h3>Feedback</h3>
      <ul>
        {result.feedback.map((f, i) => (
          <li key={i}>{f}</li>
        ))}
      </ul>

      <h3>Recommendations</h3>
      <ul>
        {result.recommendations.map((r, i) => (
          <li key={i}>{r}</li>
        ))}
      </ul>
    </div>
  );
}
