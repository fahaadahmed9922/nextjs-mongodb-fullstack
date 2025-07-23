"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditTaskPage() {
  const [title, setTitle] = useState("");
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await fetch(`/api/tasks/${id}`);
        const data = await res.json();
        setTitle(data.data.title);
      } catch (error) {
        console.error("Failed to fetch task:", error);
      }
    };

    fetchTask();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch(`/api/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title })
      });
      router.push("/tasks");
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  return (
    <div className="p-5 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Task</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Update Task
        </button>
      </form>
    </div>
  );
}