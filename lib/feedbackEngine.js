export function generateFeedback(data) {
  const feedback = [];
  const recommendations = [];

  // Speaking speed
  if (data.wpm < 90) {
    feedback.push("Your speaking speed is slow. Try speaking a bit faster.");
  } else if (data.wpm > 150) {
    feedback.push("Your speaking speed is fast. Try slowing down for better clarity.");
  } else {
    feedback.push("Your speaking speed is well balanced.");
  }

  // Filler words
  if (data.fillerWords > 4) {
    feedback.push("You are using many filler words like 'um' or 'uh'. Try pausing instead.");
  } else if (data.fillerWords > 1) {
    feedback.push("You used some filler words. Reducing them will improve fluency.");
  } else {
    feedback.push("Great job! You used very few filler words.");
  }

  // Confidence score
  if (data.confidenceScore < 5) {
    feedback.push("Your confidence level is low. Regular practice will help improve it.");
    recommendations.push("Practice confidence-building speaking scenarios daily.");
  } else if (data.confidenceScore < 7) {
    feedback.push("Your confidence level is moderate. Keep practicing to improve further.");
  } else {
    feedback.push("You sound confident. Keep maintaining this level.");
  }

  // Tone analysis
  if (data.tone === "nervous") {
    feedback.push("Your tone indicates nervousness. Try deep breathing before speaking.");
    recommendations.push("Practice calm and slow speaking exercises.");
  } else if (data.tone === "flat") {
    feedback.push("Your tone sounds flat. Try adding more energy and variation.");
  } else if (data.tone === "confident") {
    feedback.push("Your tone sounds confident and clear.");
  }

  // Duration check
  if (data.duration < 20) {
    feedback.push("Your response was short. Try elaborating your answers more.");
  }

  // Personality-based suggestion
  if (data.personality === "introvert") {
    recommendations.push("Start with short speaking sessions to build comfort.");
  } else if (data.personality === "ambivert") {
    recommendations.push("Balance practice between solo and interactive scenarios.");
  } else if (data.personality === "extrovert") {
    recommendations.push("Focus on clarity and structured responses.");
  }

  return {
    feedback,
    recommendations
  };
}
