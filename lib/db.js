import mongoose from "mongoose";

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "socialskill",
    });
    console.log("DB Connected ✔");
  } catch (err) {
    console.error("DB Error ❌:", err);
  }
};
