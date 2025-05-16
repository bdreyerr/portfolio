import React from "react";
import Link from "next/link";

export default function Music() {
    return (
        <div className="min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <header className="mb-10">
                <Link href="/" className="text-xl font-medium hover:underline">
                    ← Back to Home
                </Link>
            </header>

            <main>
                <h1 className="text-3xl sm:text-4xl font-bold mb-6">Music</h1>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                    My music interests and recommendations.
                </p>

                <div className="space-y-8">
                    <p className="text-gray-500 dark:text-gray-400 italic">
                        Music content coming soon...
                    </p>
                </div>
            </main>
        </div>
    );
} 