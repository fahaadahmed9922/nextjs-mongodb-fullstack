"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Task {
  _id: string;
  title: string;
}

export default function HomePage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
      fetchTasks();
    } else {
      setLoggedIn(false);
      setLoading(false);
    }
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await fetch("/api/tasks");
      const data = await res.json();
      if (data.success) {
        setTasks(data.data);
      } else {
        setError("Failed to fetch tasks.");
      }
    } catch {
      setError("Error fetching tasks.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this task?")) return;
    try {
      const res = await fetch(`/api/tasks/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setTasks(tasks.filter(task => task._id !== id));
      } else {
        alert(data.message || "Failed to delete task.");
      }
    } catch {
      alert("Error deleting task.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    setTasks([]);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-6">
        {!loggedIn ? (
          <div className="text-center space-y-8">
            <div className="space-y-3">
              <h1 className="text-3xl font-light text-gray-900">Task Manager</h1>
              <p className="text-gray-500">Simple task management for focused productivity</p>
            </div>
            <div className="flex justify-center gap-3">
              <Link href="/register" className="px-6 py-2.5 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors text-sm font-medium">
                Register
              </Link>
              <Link href="/login" className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-colors text-sm font-medium">
                Sign In
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-light text-gray-900">Tasks</h1>
              <div className="flex gap-3">
                <Link href="/tasks/new" className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium">
                  New Task
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors text-sm"
                >
                  Sign Out
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            {tasks.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-gray-300 rounded"></div>
                </div>
                <p className="text-gray-500">No tasks yet. Create your first one!</p>
              </div>
            ) : (
              <div className="space-y-2">
                {tasks.map(task => (
                  <div
                    key={task._id}
                    className="bg-white border border-gray-200 rounded-lg p-4 flex justify-between items-center hover:border-gray-300 transition-colors group"
                  >
                    <span className="text-gray-900 font-medium">{task.title}</span>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link href={`/tasks/${task._id}/edit`} className="px-3 py-1 text-xs text-gray-600 hover:text-gray-800 transition-colors">
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(task._id)}
                        className="px-3 py-1 text-xs text-red-600 hover:text-red-800 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}