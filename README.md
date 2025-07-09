# Ben Dreyer's Portfolio

A modern, responsive portfolio website for Ben Dreyer, Software Engineer at Google. Built with Next.js 15, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern Design**: Clean, responsive interface with dark/light theme support
- **Project Showcase**: Interactive code viewer with syntax highlighting
- **Resume Section**: Professional experience and skills
- **Book Reviews**: Reading lists and book reviews
- **Social Links**: LinkedIn, GitHub, X (Twitter), and Apple App Store
- **Interactive Components**: Custom video player and code viewer

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Icons**: Custom SVG icons
- **Fonts**: Geist Sans & Geist Mono (Google Fonts)
- **Code Highlighting**: React Syntax Highlighter

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Landing page
│   ├── layout.tsx         # Root layout
│   ├── globals.css        # Global styles
│   ├── resume/            # Resume section
│   ├── code/              # Project showcases
│   │   ├── lectura/       # Reading app project
│   │   ├── daily-short/   # Daily Short project
│   │   ├── dreamrs/       # Dreamrs project
│   │   └── radiant/       # Radiant project
│   └── books/             # Book reviews & reading lists
│       ├── reading-list/
│       └── reviews/
├── components/            # Reusable components
│   ├── CodeViewer.tsx    # Interactive code viewer
│   └── VideoPlayer.tsx   # Custom video player
└── data/                 # Project data files
    ├── lectura.ts        # Lectura project data
    ├── dailyShort.ts     # Daily Short project data
    ├── dreamrs.ts        # Dreamrs project data
    ├── radiant.ts        # Radiant project data
    ├── sampleProjectData.ts
    └── projectVideos.ts
```

## 🎨 Design Features

- **Responsive Layout**: Optimized for desktop and mobile
- **Typography**: Geist font family for modern aesthetics
- **Color Scheme**: Dark/light mode support
- **Hover Effects**: Smooth transitions on interactive elements
- **Accessibility**: ARIA labels and semantic HTML

## 📱 Sections

### Landing Page
- Professional introduction
- Social media links (LinkedIn, GitHub, X, Apple App Store)
- Navigation to main sections

### Resume
- Professional experience
- Skills and technologies
- Contact information

### Code Projects
Four featured projects with detailed showcases:

1. **Lectura** - Reading/book application
2. **Daily Short** - Daily content application
3. **Dreamrs** - Dream-related application
4. **Radiant** - Utility/productivity application

Each project includes:
- Interactive code viewer with syntax highlighting
- Project descriptions and features
- Technology stack information

### Books
- Reading lists
- Book reviews
- Reading recommendations

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Git

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd ben-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production version
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🔧 Development

### Adding New Projects

1. Create project data file in `src/data/`:
```typescript
export const projectName = {
  // Project data structure
};
```

2. Add route in `src/app/code/project-name/`
3. Update navigation in `src/app/code/page.tsx`

### Customizing Components

The portfolio uses two main custom components:

- **CodeViewer**: Interactive code display with syntax highlighting
- **VideoPlayer**: Custom video player for project demonstrations

## 📦 Dependencies

### Core Dependencies
- `next`: Next.js framework
- `react` & `react-dom`: React library
- `typescript`: TypeScript support
- `tailwindcss`: Utility-first CSS framework
- `react-syntax-highlighter`: Code syntax highlighting

### Development Dependencies
- `@types/*`: TypeScript type definitions
- `@tailwindcss/*`: Tailwind CSS plugins
- Various character encoding utilities

## 🌐 Deployment

### Vercel (Recommended)
The easiest deployment option:

1. Connect your GitHub repository to Vercel
2. Configure build settings (auto-detected)
3. Deploy with automatic CI/CD

### Manual Deployment
```bash
npm run build
npm run start
```

## 🔒 Environment Variables

No environment variables are required for basic functionality.

## 📄 License

This portfolio is private and proprietary.

## 👤 Author

**Ben Dreyer**
- Software Engineer @ Google
- Location: San Francisco, CA
- LinkedIn: [ben-dreyer-3b9063159](https://www.linkedin.com/in/ben-dreyer-3b9063159/)
- GitHub: [bdreyerr](https://github.com/bdreyerr)
- X: [bendreyerr](https://x.com/bendreyerr)
- Apple App Store: [Developer Profile](https://apps.apple.com/us/developer/benjamin-dreyer/id1705589007)

## 🤝 Contributing

This is a personal portfolio. For suggestions or bug reports, please reach out directly.

## 📋 Notes

- The portfolio showcases real projects and professional experience
- All code examples and project data are included for demonstration
- The design emphasizes clean, professional presentation
- Mobile-responsive design ensures accessibility across devices
