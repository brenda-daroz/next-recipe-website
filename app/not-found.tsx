'use client'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#008080] text-center text-white font-mono">
      <div className="bg-gray-200 text-black border-4 border-gray-900 rounded-lg shadow-xl p-8 max-w-lg">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="bg-blue-600 text-white px-3 py-1 text-sm font-bold border-2 border-black">
            404 ERROR
          </span>
          <span className="text-sm text-gray-800">Page Not Found</span>
        </div>

        <div className="bg-white border-2 border-black text-left p-4 text-gray-900 shadow-inner">
          <p className="mb-2">
            🧠 <b>Error:</b> The page you’re looking for has been moved, deleted,
            or possibly never existed.
          </p>
          <p className="mb-4">
            Try hitting <kbd className="border border-gray-800 px-1">F5</kbd> to refresh, or go back to safety.
          </p>
          <div className="flex justify-end">
            <button
              onClick={() => (window.location.href = "/")}
              className="bg-pink-400 border-2 border-gray-800 px-4 py-1 text-sm font-bold active:translate-y-[2px]"
            >
              OK
            </button>
          </div>
        </div>
      </div>

      <p className="mt-8 text-sm opacity-80">
        © The Internet. All rights reserved.
      </p>

      <style>
        {`
          @keyframes blink {
            0%, 49%, 100% { opacity: 1; }
            50%, 99% { opacity: 0; }
          }
          .blink {
            animation: blink 1s step-start infinite;
          }
        `}
      </style>
    </div>
  );
}
