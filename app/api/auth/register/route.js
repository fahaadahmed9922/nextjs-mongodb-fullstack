import connectDB from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  await connectDB();
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json({ success: false, message: "All fields required." }, { status: 400 });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ success: false, message: "Email already registered." }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return NextResponse.json({ success: true, message: "User registered successfully.", user });
}
