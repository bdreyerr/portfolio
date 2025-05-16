import React from "react";
import Link from "next/link";

export default function Code() {
    return (
        <div className="min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <header className="mb-10">
                <Link href="/" className="text-xl font-medium hover:underline">
                    ← Back to Home
                </Link>
            </header>

            <main>
                <h1 className="text-3xl sm:text-4xl font-bold mb-6">Code</h1>

                <div className="space-y-8">
                    <ul className="space-y-6 text-lg">
                        <li>
                            <Link href="/code/lectura" className="group">
                                <p className="text-xl font-semibold group-hover:text-blue-500 transition-colors">Lectura</p>
                            </Link>
                        </li>

                        <li>
                            <Link href="/code/daily-short" className="group">
                                <p className="text-xl font-semibold group-hover:text-blue-500 transition-colors">Daily Short</p>
                            </Link>
                        </li>

                        <li>
                            <Link href="/code/dreamrs" className="group">
                                <p className="text-xl font-semibold group-hover:text-blue-500 transition-colors">Dreamrs</p>
                            </Link>
                        </li>

                        <li>
                            <Link href="/code/radiant" className="group">
                                <p className="text-xl font-semibold group-hover:text-blue-500 transition-colors">Radiant</p>

                            </Link>
                        </li>
                    </ul>
                </div>
            </main>
        </div>
    );
} 