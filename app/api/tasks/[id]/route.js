// app/api/tasks/[id]/route.js

import connectDB from "@/lib/mongodb";
import Task from "@/models/task";
import { NextResponse } from "next/server";

// GET: Get a task by ID
export async function GET(req, { params }) {
    try {
        await connectDB();
        const { id } = params;
        const task = await Task.findById(id);
        if (!task) {
            return NextResponse.json({ success: false, message: "Task not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: task });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Error fetching task", error }, { status: 500 });
    }
}

// PUT: Update a task by ID
export async function PUT(req, { params }) {
    try {
        await connectDB();
        const { id } = params;
        const data = await req.json();
        const updatedTask = await Task.findByIdAndUpdate(id, data, { new: true });
        if (!updatedTask) {
            return NextResponse.json({ success: false, message: "Task not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: updatedTask });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Error updating task", error }, { status: 500 });
    }
}

// DELETE: Delete a task by ID
export async function DELETE(req, { params }) {
    try {
        await connectDB();
        const { id } = params;
        const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask) {
            return NextResponse.json({ success: false, message: "Task not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true, message: "Task deleted successfully" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Error deleting task", error }, { status: 500 });
    }
}
