export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 gap-6 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 dark:text-gray-100">
        🚀 Next.js + MongoDB Fullstack Project
      </h1>

      <p className="text-center text-lg text-gray-600 dark:text-gray-300 max-w-xl">
        Congratulations! Your Next.js app is deployed on Vercel and ready to connect with MongoDB.
        You can now start building your full-stack CRUD features and test your API routes below.
      </p>

      <div className="flex gap-4 flex-wrap justify-center mt-4">
        <a
          href="/api/users"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Test API Route
        </a>
        <a
          href="https://nextjs.org/docs"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 transition"
        >
          Next.js Docs
        </a>
        <a
          href="https://www.mongodb.com/docs/"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          MongoDB Docs
        </a>
      </div>

      <footer className="mt-8 text-sm text-gray-500 dark:text-gray-400 text-center">
        Built with ❤️ using Next.js and MongoDB | Deployed on Vercel
      </footer>
    </main>
  );
}
