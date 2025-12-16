import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import Profile from "@/models/Profile";

export async function GET(req, context) {
  try {
    await connectDB();

    // ⭐ FIX: Next.js 15/16 requires awaiting context.params
    const { id } = await context.params;

    console.log("Connected DB Name:", mongoose.connection.name);
    console.log("Collections:", await mongoose.connection.db.listCollections().toArray());

    const profile = await Profile.findOne({ userId: id });

    if (!profile) {
      console.log("Profile not found in DB");
      return Response.json({ profile: null });
    }

    return Response.json({ profile });

  } catch (err) {
    console.log("🔥 REAL SERVER ERROR:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
