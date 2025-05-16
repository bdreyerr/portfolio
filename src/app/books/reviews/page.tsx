import React from "react";
import Link from "next/link";

export default function Reviews() {
    return (
        <div className="min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <header className="mb-10">
                <Link href="/books" className="text-xl font-medium hover:underline">
                    ← Back to Books
                </Link>
            </header>

            <main>
                <h1 className="text-3xl sm:text-4xl font-bold mb-6">Book Reviews</h1>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                    My thoughts and reviews of books I've read.
                </p>

                <div className="space-y-6">
                    <ul className="space-y-4">
                        <li className="border-b border-gray-200 dark:border-gray-700 pb-4">
                            <Link href="https://gilded-gram-643.notion.site/Oathbringer-Book-3-of-The-Stormlight-Archive-1e915b4ae20e80eabae4f13ede8a411d" className="text-lg hover:underline">
                                Oathbringer (Stormlight #3) - Brandon Sanderson
                            </Link>
                            <div className="mt-2">
                                <span className="text-sm text-gray-600 dark:text-gray-400">Rating: </span>
                                <span className="text-yellow-500">★★★</span>
                                <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">(3.6/5)</span>
                            </div>
                        </li>
                        <li className="border-b border-gray-200 dark:border-gray-700 pb-4">
                            <Link href="https://gilded-gram-643.notion.site/Words-of-Radiance-Book-2-of-the-Stormlight-Archive-1bd15b4ae20e8097b263d3d55bccab5a" className="text-lg hover:underline">
                                Words of Radiance (Stormlight #2) - Brandon Sanderson
                            </Link>
                            <div className="mt-2">
                                <span className="text-sm text-gray-600 dark:text-gray-400">Rating: </span>
                                <span className="text-yellow-500">★★★★</span>
                                <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">(4.1/5)</span>
                            </div>
                        </li>
                        <li className="border-b border-gray-200 dark:border-gray-700 pb-4">
                            <Link href="https://gilded-gram-643.notion.site/The-Way-of-Kings-Book-1-of-Stormlight-Archive-19315b4ae20e8004a0f0ffb255ff7027" className="text-lg hover:underline">
                                The Way of Kings (Stormlight #1) - Brandon Sanderson
                            </Link>
                            <div className="mt-2">
                                <span className="text-sm text-gray-600 dark:text-gray-400">Rating: </span>
                                <span className="text-yellow-500">★★★★</span>
                                <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">(4.5/5)</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </main>
        </div>
    );
} 