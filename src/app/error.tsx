"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">Oops!</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">
          Something went wrong
        </h2>
        <p className="text-gray-600 mb-8">
          An error occurred while loading this page.
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
