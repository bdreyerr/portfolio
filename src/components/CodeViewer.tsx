"use client";

import React, { useState, useEffect } from 'react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
// Import Swift language
import swift from 'react-syntax-highlighter/dist/cjs/languages/prism/swift';

// Register language
SyntaxHighlighter.registerLanguage('swift', swift);

// Types for our file structure
export type FileNode = {
    name: string;
    path: string;
    type: 'file' | 'directory';
    children?: FileNode[];
    content?: string;
    language?: string;
};

type CodeViewerProps = {
    projectStructure: FileNode[];
    initialFile?: string;
};

export const CodeViewer: React.FC<CodeViewerProps> = ({
    projectStructure,
    initialFile
}) => {
    // State for tracking the selected file
    const [selectedFile, setSelectedFile] = useState<FileNode | null>(
        initialFile ? findFileByPath(projectStructure, initialFile) : null
    );

    // State for tracking expanded folders
    const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());

    // Function to find a file by its path
    function findFileByPath(nodes: FileNode[], path: string): FileNode | null {
        for (const node of nodes) {
            if (node.path === path) return node;
            if (node.children) {
                const found = findFileByPath(node.children, path);
                if (found) return found;
            }
        }
        return null;
    }

    // Function to get all parent folder paths of a file
    function getParentFolderPaths(filePath: string): string[] {
        const parts = filePath.split('/');
        const paths: string[] = [];

        // Build parent paths
        for (let i = 1; i < parts.length; i++) {
            paths.push(parts.slice(0, i).join('/'));
        }

        return paths;
    }

    // Initialize expanded folders based on selected file
    useEffect(() => {
        if (selectedFile) {
            const parentFolders = getParentFolderPaths(selectedFile.path);
            setExpandedFolders(new Set(parentFolders));
        } else if (projectStructure.length > 0) {
            // If no file is selected, select the first file
            const firstFile = findFirstFile(projectStructure);
            if (firstFile) {
                setSelectedFile(firstFile);
                const parentFolders = getParentFolderPaths(firstFile.path);
                setExpandedFolders(new Set(parentFolders));
            }
        }
    }, [selectedFile?.path, projectStructure]);

    // Helper to find the first file in the tree
    function findFirstFile(nodes: FileNode[]): FileNode | null {
        for (const node of nodes) {
            if (node.type === 'file') {
                return node;
            }
            if (node.children && node.children.length > 0) {
                const found = findFirstFile(node.children);
                if (found) return found;
            }
        }
        return null;
    }

    // Handle file selection
    function handleFileSelect(file: FileNode) {
        if (file.type !== 'file') return;

        setSelectedFile(file);

        // Expand parent folders
        const parentFolders = getParentFolderPaths(file.path);
        setExpandedFolders(new Set(parentFolders));
    }

    // Toggle folder expanded/collapsed state
    function toggleFolder(folderPath: string) {
        setExpandedFolders(prev => {
            const newExpanded = new Set(prev);
            if (newExpanded.has(folderPath)) {
                newExpanded.delete(folderPath);
            } else {
                newExpanded.add(folderPath);
            }
            return newExpanded;
        });
    }

    // Recursively render the file tree
    const renderFileTree = (nodes: FileNode[]) => {
        return (
            <ul className="pl-4">
                {nodes.map((node) => (
                    <li key={node.path} className="py-1">
                        {node.type === 'directory' ? (
                            <>
                                <div
                                    className="flex items-center cursor-pointer hover:text-blue-500"
                                    onClick={() => toggleFolder(node.path)}
                                >
                                    <span className="inline-block w-4 mr-1">
                                        {expandedFolders.has(node.path) ? (
                                            <ChevronDownIcon className="h-4 w-4" />
                                        ) : (
                                            <ChevronRightIcon className="h-4 w-4" />
                                        )}
                                    </span>
                                    <FolderIcon className="h-4 w-4 mr-1" />
                                    <span>{node.name}</span>
                                </div>
                                {expandedFolders.has(node.path) && node.children && node.children.length > 0 &&
                                    renderFileTree(node.children)
                                }
                            </>
                        ) : (
                            <div
                                className={`flex items-center cursor-pointer hover:text-blue-500 pl-5 ${selectedFile?.path === node.path ? 'text-blue-500 font-medium' : ''
                                    }`}
                                onClick={() => handleFileSelect(node)}
                            >
                                <FileIcon className="h-4 w-4 mr-1" />
                                <span>{node.name}</span>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-md flex flex-col md:flex-row h-[600px] font-[family-name:var(--font-geist-sans)]">
            {/* File explorer sidebar */}
            <div className="w-full md:w-1/4 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700 p-4 overflow-y-auto max-h-[200px] md:max-h-none md:h-full">
                <h3 className="font-medium mb-3 text-sm uppercase tracking-wider">Files</h3>
                {projectStructure.length > 0 ? (
                    renderFileTree(projectStructure)
                ) : (
                    <div className="text-gray-500 text-sm">No files found</div>
                )}
            </div>

            {/* Code content area */}
            <div className="w-full md:w-3/4 overflow-auto flex-1">
                {selectedFile ? (
                    <div className="h-full">
                        <div className="border-b border-gray-200 dark:border-gray-700 px-4 py-2 text-sm font-mono">
                            {selectedFile.path}
                        </div>
                        <SyntaxHighlighter
                            language={
                                selectedFile.path.endsWith('.swift')
                                    ? 'swift'
                                    : (selectedFile.language || 'javascript')
                            }
                            style={atomDark}
                            customStyle={{
                                margin: 0,
                                minHeight: '100%',
                                background: 'transparent',
                                fontFamily: 'var(--font-geist-mono), Menlo, Monaco, Consolas, "Courier New", monospace',
                                fontSize: '0.9rem',
                                padding: '1rem'
                            }}
                            showLineNumbers={true}
                        >
                            {selectedFile.content || '// No content'}
                        </SyntaxHighlighter>
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                        Select a file to view its contents
                    </div>
                )}
            </div>
        </div>
    );
};

// Icon components
const FileIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
    </svg>
);

const FolderIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
    </svg>
);

const ChevronRightIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
    </svg>
);

const ChevronDownIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
);

export default CodeViewer; 