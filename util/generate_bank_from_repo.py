#!/usr/bin/env python3
import os
import argparse
import requests
import json
from urllib.parse import urlparse

def parse_github_url(url):
    """Parse a GitHub URL to extract owner and repo name."""
    path = urlparse(url).path.strip('/')
    parts = path.split('/')
    
    if len(parts) < 2:
        raise ValueError("Invalid GitHub URL format")
    
    owner = parts[0]
    repo = parts[1]
    
    return owner, repo

def get_repo_contents(owner, repo, path="", token=None):
    """Recursively fetch repository contents from GitHub API."""
    headers = {}
    if token:
        headers["Authorization"] = f"token {token}"
    
    url = f"https://api.github.com/repos/{owner}/{repo}/contents/{path}"
    response = requests.get(url, headers=headers)
    
    if response.status_code != 200:
        print(f"Failed to fetch {path}: {response.status_code}")
        print(response.json())
        return []
    
    return response.json()

def determine_language(filename):
    """Determine language based on file extension."""
    ext = os.path.splitext(filename)[1].lower()
    
    language_map = {
        '.js': 'javascript',
        '.jsx': 'jsx',
        '.ts': 'typescript',
        '.tsx': 'typescript',
        '.html': 'html',
        '.css': 'css',
        '.scss': 'scss',
        '.py': 'python',
        '.md': 'markdown',
        '.json': 'json',
        '.yml': 'yaml',
        '.yaml': 'yaml',
        '.sh': 'bash',
        '.rs': 'rust',
        '.go': 'go',
        '.java': 'java',
        '.c': 'c',
        '.cpp': 'cpp',
        '.h': 'c',
        '.hpp': 'cpp',
        '.rb': 'ruby',
        '.php': 'php',
    }
    
    return language_map.get(ext, 'plaintext')

def process_repo_recursively(owner, repo, path="", token=None, max_size=50000, excluded_dirs=None):
    """Process repository contents recursively."""
    if excluded_dirs is None:
        excluded_dirs = ['.git', 'node_modules', 'dist', 'build', '.next', '.vscode']
    
    items = get_repo_contents(owner, repo, path, token)
    result = []
    
    for item in items:
        # Skip excluded directories
        if item['name'] in excluded_dirs:
            continue
            
        node = {
            'name': item['name'],
            'path': item['path'],
            'type': 'file' if item['type'] == 'file' else 'directory'
        }
        
        if item['type'] == 'dir':
            children = process_repo_recursively(owner, repo, item['path'], token, max_size, excluded_dirs)
            if children:
                node['children'] = children
            result.append(node)
        elif item['type'] == 'file':
            # Skip binary files and large files
            if item.get('size', 0) > max_size:
                print(f"Skipping large file: {item['path']} ({item['size']} bytes)")
                continue
                
            content_response = requests.get(item['download_url'], headers={'Authorization': f"token {token}"} if token else {})
            
            if content_response.status_code == 200:
                try:
                    content = content_response.text
                    node['content'] = content
                    node['language'] = determine_language(item['name'])
                    result.append(node)
                except UnicodeDecodeError:
                    print(f"Skipping binary file: {item['path']}")
            else:
                print(f"Failed to fetch content for {item['path']}: {content_response.status_code}")
    
    return result

def escape_string_content(s):
    """Escape content for use in template literals."""
    # Escape backticks and backslashes
    return s.replace('\\', '\\\\').replace('`', '\\`').replace('${', '\\${')

def generate_typescript_file(data, output_file, variable_name="repoData"):
    """Generate a TypeScript file with the repository data."""
    with open(output_file, 'w', encoding='utf-8') as f:
        # Write the import statement
        f.write("import { FileNode } from '../components/CodeViewer';\n\n")
        
        # Start the export declaration
        f.write(f"export const {variable_name}: FileNode[] = [\n")
        
        # Process each root node
        for i, node in enumerate(data):
            f.write(process_node(node, 1))  # Start with indentation level 1
            if i < len(data) - 1:
                f.write(",\n")
            else:
                f.write("\n")
        
        # Close the array
        f.write("];\n")

def process_node(node, indent_level):
    """Process a single node recursively and return TypeScript code."""
    indent = '    ' * indent_level
    result = f"{indent}{{\n"
    
    # Add name and path
    result += f"{indent}    name: '{node['name']}',\n"
    result += f"{indent}    path: '{node['path']}',\n"
    
    # Add type
    result += f"{indent}    type: '{node['type']}',\n"
    
    # Add children if present
    if 'children' in node and node['children']:
        result += f"{indent}    children: [\n"
        for i, child in enumerate(node['children']):
            result += process_node(child, indent_level + 2)
            if i < len(node['children']) - 1:
                result += ",\n"
            else:
                result += "\n"
        result += f"{indent}    ]"
    
    # Add content and language if it's a file
    if 'content' in node and node['content'] is not None:
        if 'children' in node and node['children']:
            result += ",\n"
        
        # Use template literals for content (backticks)
        escaped_content = escape_string_content(node['content'])
        result += f"{indent}    content: `{escaped_content}`"
        
        if 'language' in node:
            result += f",\n{indent}    language: '{node['language']}'"
    
    result += f"\n{indent}}}"
    return result

def main():
    parser = argparse.ArgumentParser(description='Generate TypeScript file from GitHub repository')
    parser.add_argument('repo_url', help='GitHub repository URL')
    parser.add_argument('--output', '-o', default='src/data/repoData.ts', help='Output TypeScript file')
    parser.add_argument('--token', '-t', help='GitHub personal access token')
    parser.add_argument('--exclude', '-e', nargs='+', help='Directories to exclude')
    parser.add_argument('--max-size', '-m', type=int, default=100000, help='Maximum file size in bytes')
    parser.add_argument('--var-name', '-v', default='repoData', help='Name of the exported variable')
    
    args = parser.parse_args()
    
    try:
        owner, repo = parse_github_url(args.repo_url)
        print(f"Fetching repository: {owner}/{repo}")
        
        excluded_dirs = ['.git', 'node_modules', 'dist', 'build', '.next', '.vscode']
        if args.exclude:
            excluded_dirs.extend(args.exclude)
            
        repo_data = process_repo_recursively(owner, repo, token=args.token, max_size=args.max_size, excluded_dirs=excluded_dirs)
        
        if repo_data:
            output_path = args.output
            os.makedirs(os.path.dirname(output_path), exist_ok=True)
            generate_typescript_file(repo_data, output_path, args.var_name)
            print(f"Repository data saved to {output_path}")
        else:
            print("No data to save")
            
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    main()
