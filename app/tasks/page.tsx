"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import useAuthRedirect from "../hooks/useAuthRedirect";

interface Task {
  _id: string;
  title: string;
}

export default function TasksPage() {
  useAuthRedirect(); // protect this page

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch("/api/tasks");
        if (!res.ok) throw new Error("Failed to fetch tasks");

        const data = await res.json();
        if (data && Array.isArray(data.data)) {
          setTasks(data.data);
        } else {
          setError("Invalid data format from API");
        }
      } catch (err: any) {
        console.error("Error fetching tasks:", err);
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this task?")) return;

    try {
      const res = await fetch(`/api/tasks/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete task");

      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err: any) {
      alert(err.message || "Failed to delete task");
    }
  };

  if (loading) return <div className="p-5 text-center">Loading tasks...</div>;
  if (error) return <div className="p-5 text-center text-red-600">{error}</div>;

  return (
    <div className="p-5 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">All Tasks</h1>
        <div className="flex gap-2">
          <Link href="/tasks/new">
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors">
              Create New Task
            </button>
          </Link>
          <button
            onClick={handleLogout}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      {tasks.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No tasks found.</p>
      ) : (
        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="flex justify-between items-center p-4 bg-gray-50 rounded shadow"
            >
              <span>{task.title}</span>
              <div className="flex gap-2">
                <Link href={`/tasks/${task._id}/edit`}>
                  <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                    Edit
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
