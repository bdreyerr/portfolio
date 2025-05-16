import React from "react";
import Link from "next/link";

export default function Books() {
    return (
        <div className="min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <header className="mb-10">
                <Link href="/" className="text-xl font-medium hover:underline">
                    ← Back to Home
                </Link>
            </header>

            <main>
                <h1 className="text-3xl sm:text-4xl font-bold mb-6">Books</h1>


                <div className="space-y-8">
                    <div className="flex flex-col gap-4">
                        <Link href="/books/reading-list" className="text-lg hover:underline">
                            Reading List
                        </Link>
                        <Link href="/books/reviews" className="text-lg hover:underline">
                            Reviews
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
} 