import connectDB from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "yoursecretkey"; // put in .env.local

export async function POST(req) {
  await connectDB();
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ success: false, message: "All fields required." }, { status: 400 });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ success: false, message: "User not found." }, { status: 400 });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return NextResponse.json({ success: false, message: "Invalid password." }, { status: 400 });
  }

  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "7d" });

  const res = NextResponse.json({
    success: true,
    message: "Login successful.",
    token,
    user: { _id: user._id, name: user.name, email: user.email }
  });

  res.cookies.set("token", token, { httpOnly: true, path: "/" });

  return res;
}
