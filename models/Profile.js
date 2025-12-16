import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    name: String,
    age: Number,
    height: Number,
    education: String,
    personality: String,
    confidence: Number,
    englishLevel: String,
    interests: [String],
    goal: String,
  },
  { timestamps: true }
);

const Profile =
  mongoose.models.Profile || mongoose.model("Profile", profileSchema);

export default Profile;
