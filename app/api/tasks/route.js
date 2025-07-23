import connectDB from "@/lib/mongodb";
import Task from "@/models/task";
import { NextResponse } from "next/server";

// GET: Fetch all tasks
export async function GET() {
    try {
        await connectDB();
        const tasks = await Task.find();
        return NextResponse.json({ success: true, data: tasks });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Error fetching tasks", error }, { status: 500 });
    }
}

// POST: Create a new task
export async function POST(req) {
    try {
        await connectDB();
        const data = await req.json();
        const task = new Task(data);
        await task.save();
        return NextResponse.json({ success: true, data: task });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Error creating task", error }, { status: 500 });
    }
}
