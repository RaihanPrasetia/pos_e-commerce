"use client";

export default function NotFoundPage() {

    const handleBack = () => {
        window.history.back()
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-800">
            <h1 className="text-6xl font-bold">404</h1>
            <p className="text-lg mt-2">Oops! The page you are looking for does not exist.</p>
            <button onClick={handleBack} className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md">Go Back</button>
        </div>
    );
}
