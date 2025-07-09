# Hook Lab

A comprehensive React Hooks learning platform built with Next.js 15, featuring interactive examples and detailed explanations of React Hooks.

## 🌟 Live Demo

Visit the live demo: [Hook Lab](https://syntax-read3r.github.io/hook-lab/)

## 📚 What is Hook Lab?

Hook Lab is an interactive educational platform designed to help developers learn React Hooks through hands-on examples. Each hook is demonstrated with:

- **Interactive Examples**: Live, working demonstrations you can interact with
- **Code Snippets**: Syntax-highlighted code examples with explanations
- **Best Practices**: Common patterns and anti-patterns
- **Edge Cases**: Important gotchas and how to handle them

## 🎯 Featured Hooks

### Core Hooks
- **useState** - State management in functional components
- **useEffect** - Side effects and lifecycle management
- **useContext** - Context consumption and state sharing
- **useReducer** - Complex state management with reducer pattern
- **useRef** - Direct DOM access and persistent values
- **useLayoutEffect** - Synchronous DOM mutations
- **useInsertionEffect** - CSS-in-JS and style injection

### Performance Hooks
- **useTransition** - Concurrent rendering and transitions
- **useDeferredValue** - Deferring non-urgent updates
- **useSyncExternalStore** - Subscribing to external stores

### Utility Hooks
- **useId** - Unique ID generation for accessibility
- **useImperativeHandle** - Customizing ref exposure

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/syntax-read3r/hook-lab.git
   cd hook-lab
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`
   
   > **Note**: If you encounter a 404 error, the app is configured with a `basePath` for GitHub Pages deployment. The configuration automatically disables `basePath` in development, but if you're still seeing issues, ensure you're accessing the correct localhost URL.

## 🏗️ Project Structure

```
hook-lab/
├── src/
│   ├── app/
│   │   ├── hooks/
│   │   │   ├── use-state/
│   │   │   ├── use-effect/
│   │   │   ├── use-context/
│   │   │   └── ...
│   │   ├── next-features/
│   │   └── layout.tsx
│   ├── components/
│   │   └── Navbar.tsx
│   └── styles/
│       └── globals.css
├── docs/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── next.config.ts
├── tailwind.config.js
└── package.json
```

## 🛠️ Built With

- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - JavaScript library for building user interfaces
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript

## 📖 Learning Path

### Beginner
1. **useState** - Start with basic state management
2. **useEffect** - Learn about side effects and cleanup
3. **useContext** - Understand context and prop drilling solutions

### Intermediate
4. **useReducer** - Complex state management patterns
5. **useRef** - DOM manipulation and persistent values
6. **useLayoutEffect** - Understanding the render cycle

### Advanced
7. **useTransition** - Concurrent features and performance
8. **useDeferredValue** - Optimizing expensive operations
9. **useSyncExternalStore** - External state management

## 🎨 Features

- **Interactive Examples**: Click, type, and interact with live demos
- **Code Visualization**: Syntax-highlighted code with explanations
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Dark Mode Ready**: Clean, accessible interface
- **Performance Optimized**: Static site generation for fast loading

## 🚢 Deployment

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Manual Deployment
```bash
npm run build
```

The static files will be generated in the `out` directory.

### GitHub Pages Setup
1. Enable GitHub Pages in repository settings
2. Set source to "GitHub Actions"
3. Push to main branch to trigger deployment

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Guidelines
- Follow the existing code structure
- Add interactive examples for new hooks
- Include comprehensive documentation
- Test thoroughly across different browsers
- Follow accessibility best practices

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- React team for creating these amazing hooks
- Next.js team for the excellent framework
- Tailwind CSS for the utility-first approach
- The open-source community for inspiration

## 📧 Contact

Created by **Munya** - feel free to contact me!

📧 Email: [syntaxread3r@gmail.com](mailto:syntaxread3r@gmail.com)

---

**Happy Learning! 🎉**