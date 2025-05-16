import React from "react";
import Link from "next/link";
import CodeViewer from "@/components/CodeViewer";
import VideoPlayer from "@/components/VideoPlayer";
import { lectura } from "@/data/lectura";
import { projectVideos } from "@/data/projectVideos";

export default function Lectura() {
    return (
        <div className="min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <header className="mb-10">
                <Link href="/code" className="text-xl font-medium hover:underline">
                    ← Back to Projects
                </Link>
            </header>

            <main>
                <h1 className="text-3xl sm:text-4xl font-bold mb-4">Lectura</h1>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                    Access the world's top university lectures in your pocket. Lectura brings you official lectures from prestigious institutions like Stanford, Harvard, and MIT, transforming how you learn on the go.
                </p>

                <div className="space-y-10">
                    {/* Video Player */}
                    <VideoPlayer
                        videoId={projectVideos.lectura.id}
                        title={projectVideos.lectura.title}
                    />

                    {/* Code Viewer */}
                    <div>
                        <CodeViewer
                            projectStructure={lectura}
                            initialFile="Lectures/ContentView.swift"
                        />
                    </div>

                    {/* Project Links */}
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Project Links</h2>
                        <div className="flex flex-wrap gap-4">
                            <a
                                href="https://apps.apple.com/us/app/lectura-university-lectures/id6740043004"
                                className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                </svg>
                                App Store
                            </a>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
} 