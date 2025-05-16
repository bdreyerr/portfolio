import React from "react";
import Link from "next/link";

export default function ReadingList() {
    return (
        <div className="min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <header className="mb-10">
                <Link href="/books" className="text-xl font-medium hover:underline">
                    ← Back to Books
                </Link>
            </header>

            <main>
                <h1 className="text-3xl sm:text-4xl font-bold mb-6">Reading List</h1>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                    Books I've read (and the date I finished them)
                </p>

                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-6">2025</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-md">
                            <h3 className="font-medium mb-1">Leviathan Wakes</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">James S.A. Corey (1/6/2025)</p>
                        </div>
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-md">
                            <h3 className="font-medium mb-1">Forward the Foundation</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Isaac Asimov</p>
                        </div>
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-md">
                            <h3 className="font-medium mb-1">The Way of Kings</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Brandon Sanderson (2/6/25)</p>
                        </div>
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-md">
                            <h3 className="font-medium mb-1">Words of Radiance</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Brandon Sanderson (3/19/25)</p>
                        </div>
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-md">
                            <h3 className="font-medium mb-1">Oathbringer</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Brandon Sanderson (5/6/25)</p>
                        </div>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-6">2024</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-md">
                            <h3 className="font-medium mb-1">A Knight of the Seven Kingdoms</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">George R.R. Martin</p>
                        </div>
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-md">
                            <h3 className="font-medium mb-1">Endymion</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Dan Simmons</p>
                        </div>
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-md">
                            <h3 className="font-medium mb-1">Rise of Endymion</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Dan Simmons</p>
                        </div>
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-md">
                            <h3 className="font-medium mb-1">Fire and Blood</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">George R.R. Martin</p>
                        </div>
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-md">
                            <h3 className="font-medium mb-1">Mistborn</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Brandon Sanderson</p>
                        </div>
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-md">
                            <h3 className="font-medium mb-1">The Well of Ascension</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Brandon Sanderson</p>
                        </div>
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-md">
                            <h3 className="font-medium mb-1">The Hero of Ages</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Brandon Sanderson (4/29/24)</p>
                        </div>
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-md">
                            <h3 className="font-medium mb-1">Project Hail Mary</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Andy Weir (5/15/24)</p>
                        </div>
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-md">
                            <h3 className="font-medium mb-1">Foundation</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Isaac Asimov (5/21/24)</p>
                        </div>
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-md">
                            <h3 className="font-medium mb-1">Foundation and Empire</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Isaac Asimov (5/31/24)</p>
                        </div>
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-md">
                            <h3 className="font-medium mb-1">Second Foundation</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Isaac Asimov (6/10/24)</p>
                        </div>
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-md">
                            <h3 className="font-medium mb-1">The Hitchhiker's Guide to the Galaxy</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Douglas Adams (6/17/24)</p>
                        </div>
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-md">
                            <h3 className="font-medium mb-1">Fire and Blood (The Dance)</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">George R.R. Martin</p>
                        </div>
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-md">
                            <h3 className="font-medium mb-1">Foundation's Edge</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Isaac Asimov (7/5/24)</p>
                        </div>
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-md">
                            <h3 className="font-medium mb-1">Foundation and Earth</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Isaac Asimov (7/24/24)</p>
                        </div>
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-md">
                            <h3 className="font-medium mb-1">The Hobbit</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">J.R.R. Tolkien (8/2/24)</p>
                        </div>
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-md">
                            <h3 className="font-medium mb-1">The Fellowship of the Ring</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">J.R.R. Tolkien (8/21/24)</p>
                        </div>
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-md">
                            <h3 className="font-medium mb-1">The Two Towers</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">J.R.R. Tolkien (9/9/24)</p>
                        </div>
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-md">
                            <h3 className="font-medium mb-1">The Return of the King</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">J.R.R. Tolkien (9/22/24)</p>
                        </div>
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-md">
                            <h3 className="font-medium mb-1">The Blade Itself</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Joe Abercrombie (11/1/24)</p>
                        </div>
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-md">
                            <h3 className="font-medium mb-1">Before They Are Hanged</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Joe Abercrombie (11/23/24)</p>
                        </div>
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-md">
                            <h3 className="font-medium mb-1">Last Argument of Kings</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Joe Abercrombie (12/13/24)</p>
                        </div>
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-md">
                            <h3 className="font-medium mb-1">Prelude to Foundation</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Isaac Asimov (12/18/24)</p>
                        </div>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-6">2023</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-md">
                            <h3 className="font-medium mb-1">A Storm of Swords</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">George R.R. Martin</p>
                        </div>
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-md">
                            <h3 className="font-medium mb-1">The Three-Body Problem</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Cixin Liu</p>
                        </div>
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-md">
                            <h3 className="font-medium mb-1">The Dark Forest</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Cixin Liu</p>
                        </div>
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-md">
                            <h3 className="font-medium mb-1">Death's End</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Cixin Liu</p>
                        </div>
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-md">
                            <h3 className="font-medium mb-1">The Art of Happiness</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Dalai Lama</p>
                        </div>
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-md">
                            <h3 className="font-medium mb-1">The Four Agreements</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Don Miguel Ruiz</p>
                        </div>
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-md">
                            <h3 className="font-medium mb-1">Hyperion</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Dan Simmons</p>
                        </div>
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-md">
                            <h3 className="font-medium mb-1">The Fall of Hyperion</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Dan Simmons</p>
                        </div>
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-md">
                            <h3 className="font-medium mb-1">A Feast for Crows</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">George R.R. Martin</p>
                        </div>
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-md">
                            <h3 className="font-medium mb-1">A Dance with Dragons</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">George R.R. Martin</p>
                        </div>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-6">2022</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-md">
                            <h3 className="font-medium mb-1">A Game of Thrones</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">George R.R. Martin</p>
                        </div>
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-md">
                            <h3 className="font-medium mb-1">A Clash of Kings</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">George R.R. Martin</p>
                        </div>
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-md">
                            <h3 className="font-medium mb-1">The Circle</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Dave Eggers</p>
                        </div>
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-md">
                            <h3 className="font-medium mb-1">Recursion</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Blake Crouch</p>
                        </div>
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-md">
                            <h3 className="font-medium mb-1">Invisible Cities</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Italo Calvino</p>
                        </div>
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-md">
                            <h3 className="font-medium mb-1 text-gray-700 dark:text-gray-300">Want to Read:</h3>
                            <p className="text-sm mb-2">Watchmen - Alan Moore</p>
                            <p className="text-sm">The Song of Achilles - Madeline Miller</p>
                        </div>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-6">2021</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-md">
                            <h3 className="font-medium mb-1">Ready Player Two</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Ernest Cline</p>
                        </div>
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-md">
                            <h3 className="font-medium mb-1">The Invisible Man</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">H.G. Wells</p>
                        </div>
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-md">
                            <h3 className="font-medium mb-1">The Illustrated Man</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Ray Bradbury</p>
                        </div>
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-md">
                            <h3 className="font-medium mb-1">The Name of the Wind</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Patrick Rothfuss</p>
                        </div>
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-md">
                            <h3 className="font-medium mb-1">Neuromancer</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">William Gibson</p>
                        </div>
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-md">
                            <h3 className="font-medium mb-1">The Wise Man's Fear</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Patrick Rothfuss</p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
} 