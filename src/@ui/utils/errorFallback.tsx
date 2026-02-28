export function ErrorFallback({ error }: any) {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-2xl rounded-xl p-10 max-w-md text-center animate-fadeIn">
        <div className="text-6xl mb-4 animate-bounce">⚠️</div>
        <h2 className="text-3xl font-extrabold text-red-600 mb-3">
          Oops! Something went wrong
        </h2>
        <p className="text-gray-700 mb-4">
          We encountered an unexpected error. Our team has been notified.
        </p>
        <p className="text-gray-500 text-sm mb-6">
          {error?.message || "Unknown error"}
        </p>
        <button
          onClick={handleRetry}
          className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition-colors"
        >
          Retry
        </button>
        <p className="text-gray-400 text-xs mt-4">
          If the problem persists, please contact support.
        </p>
      </div>
    </div>
  );
}