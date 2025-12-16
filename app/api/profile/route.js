import { connectDB } from "@/lib/db";
import Profile from "@/models/Profile";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    await Profile.create(body);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
