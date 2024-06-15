import Link from "next/link";

export default function Custom404Page() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[100dvh] bg-gray-100 dark:bg-gray-900 p-4">
            <div className="max-w-md text-center space-y-4">
                <h1 className="text-6xl font-bold text-gray-800 dark:text-gray-200">404</h1>
                <p className="text-2xl font-medium text-gray-600 dark:text-gray-400">
                    Oops! The page you&apos;re looking for doesn&apos;t exist.
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                    It looks like you&apos;ve encountered a technical issue. Please try navigating back to the homepage
                    or dashboard.
                </p>
                <Link
                    href="/dashboard"
                    className="inline-flex items-center justify-center rounded-md bg-gray-800 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-gray-300 dark:focus:ring-gray-600 dark:focus:ring-offset-gray-900"
                    prefetch={false}
                >
                    Go to Homepage
                </Link>
            </div>
        </div>
    );
}
