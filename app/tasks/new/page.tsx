"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateTaskPage() {
  const [title, setTitle] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title })
      });
      router.push("/tasks");
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  };

  return (
    <div className="p-5 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create New Task</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button 
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
        >
          Create Task
        </button>
      </form>
    </div>
  );
}