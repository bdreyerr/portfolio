import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main>
        <h1 className="text-3xl sm:text-4xl font-bold">Ben Dreyer</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Software Engineer @ <span><span style={{color: '#4285F4'}}>G</span><span style={{color: '#EA4335'}}>o</span><span style={{color: '#FBBC04'}}>o</span><span style={{color: '#4285F4'}}>g</span><span style={{color: '#34A853'}}>l</span><span style={{color: '#EA4335'}}>e</span></span> - San Francisco, CA
        </p>

        <div className="flex gap-6 mt-6">
          <a href="https://www.linkedin.com/in/ben-dreyer-3b9063159/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <svg className="w-6 h-6 text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <a href="https://github.com/bdreyerr" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <svg className="w-6 h-6 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
          </a>
          <a href="https://x.com/bendreyerr" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
            <svg className="w-6 h-6 text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <a href="https://apps.apple.com/us/developer/benjamin-dreyer/id1705589007" target="_blank" rel="noopener noreferrer" aria-label="Apple App Store">
            <svg className="w-6 h-6 text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.624 7.222c-.876 0-2.232-.996-3.66-.96-1.884.024-3.612 1.092-4.584 2.784-1.956 3.396-.504 8.412 1.404 11.172.936 1.344 2.04 2.856 3.504 2.808 1.404-.06 1.932-.912 3.636-.912 1.692 0 2.172.912 3.66.876 1.512-.024 2.472-1.368 3.396-2.724 1.068-1.56 1.512-3.072 1.536-3.156-.036-.012-2.94-1.128-2.976-4.488-.024-2.808 2.292-4.152 2.4-4.212-1.32-1.932-3.348-2.148-4.056-2.196-1.848-.144-3.396 1.008-4.26 1.008zm3.12-2.832c.78-.936 1.296-2.244 1.152-3.54-1.116.048-2.46.744-3.264 1.68-.72.828-1.344 2.16-1.176 3.42 1.236.096 2.508-.636 3.288-1.56z" />
            </svg>
          </a>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Link
            href="/resume"
            className="px-6 py-3 bg-gray-800 text-white dark:bg-gray-700 rounded-lg font-medium hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors text-center"
          >
            Resume
          </Link>
          <Link
            href="/code"
            className="px-6 py-3 bg-gray-800 text-white dark:bg-gray-700 rounded-lg font-medium hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors text-center"
          >
            Code
          </Link>
          <Link
            href="/books"
            className="px-6 py-3 bg-gray-800 text-white dark:bg-gray-700 rounded-lg font-medium hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors text-center"
          >
            Books
          </Link>
        </div>
      </main>
    </div>
  );
}
