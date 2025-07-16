// app/api/users/route.js

import connectDB from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

// GET: Fetch all users
export async function GET() {
    try {
        await connectDB();
        const users = await User.find();
        return NextResponse.json(users);
    } catch (error) {
        return NextResponse.json({ message: "Error fetching users", error }, { status: 500 });
    }
}

// POST: Add a new user
export async function POST(req) {
    try {
        await connectDB();
        const data = await req.json();
        const user = new User(data);
        await user.save();
        return NextResponse.json({ message: "User created successfully!", user });
    } catch (error) {
        return NextResponse.json({ message: "Error creating user", error }, { status: 500 });
    }
}
