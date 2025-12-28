const FILLER_WORDS = [
  "ah", "ehm", "er", "hmm", "mhm", "uh", "uhm", "um", "mm", "mn",
  "like", "basically", "literally", "actually", "honestly", "so", "you know",
  "i mean", "right", "okay",
];

export function analyzeSpeech(transcript, duration) {
  if (!transcript || transcript.trim() === "") {
    return {
      wpm: 0,
      fillerWords: 0,
      transcript: "",
    };
  }

  const words = transcript.toLowerCase().split(/\s+/);
  const wordCount = words.length;

  const wpm = Math.round((wordCount / duration) * 60);

  const fillerWordCount = words.filter(word => FILLER_WORDS.includes(word)).length;

  return {
    wpm: wpm,
    fillerWords: fillerWordCount,
    transcript: transcript,
  };
}
