# GitHub Pages Deployment Guide for Next.js Projects

This guide provides step-by-step instructions for setting up a Next.js project to deploy on GitHub Pages (username.github.io).

## 📋 Prerequisites

- Node.js 18+ installed
- Git configured
- GitHub account
- WSL (Windows Subsystem for Linux) recommended for Windows users

## 🚀 Initial Project Setup

### 1. Create Next.js Project

```bash
# Create new Next.js project with TypeScript and Tailwind
npx create-next-app@latest project-name --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

# Navigate to project
cd project-name
```

### 2. Configure for GitHub Pages

#### Update `next.config.ts`:

```typescript
import type { NextConfig } from 'next';

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: 'out',
  images: {
    unoptimized: true
  },
  assetPrefix: isProd ? '/repository-name/' : '',
  basePath: isProd ? '/repository-name' : '',
};

export default nextConfig;
```

#### Add deployment scripts to `package.json`:

```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "export": "next build && touch out/.nojekyll",
    "deploy": "npm run export && gh-pages -d out"
  }
}
```

### 3. Install GitHub Pages Dependencies

```bash
npm install --save-dev gh-pages
```

## 🔧 Repository Setup

### 1. Initialize Git Repository

```bash
git init
git add .
git commit -m "Initial commit"
```

### 2. Create GitHub Repository

1. Go to GitHub and create new repository named `repository-name`
2. **DO NOT** initialize with README, .gitignore, or license

### 3. Connect Local to Remote

```bash
git remote add origin https://github.com/username/repository-name.git
git branch -M main
git push -u origin main
```

## 🚀 GitHub Actions Deployment Setup

### Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy Next.js to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build project
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## ⚙️ GitHub Repository Settings

### 1. Enable GitHub Pages

1. Go to repository **Settings** → **Pages**
2. Source: **GitHub Actions**
3. Save settings

### 2. Environment Setup (if needed)

1. Go to **Settings** → **Environments**
2. Create `github-pages` environment
3. Add protection rules if desired

## 🗂️ Project Structure Best Practices

```
project-name/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── docs/
│   ├── githubIO.md
│   ├── consistency.md
│   └── styles.md
├── public/
│   ├── favicon.ico
│   └── assets/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   └── components/
│       └── Navbar.tsx
├── next.config.ts
├── package.json
└── README.md
```

## 🔍 Common Issues & Solutions

### 1. Build Failures

**Issue**: Build fails with module not found errors
**Solution**: 
```bash
# Clear cache and reinstall
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

### 2. Path Issues

**Issue**: Assets not loading on GitHub Pages
**Solution**: Ensure `assetPrefix` and `basePath` are correctly set in `next.config.ts`

### 3. Windows Development Issues

**Issue**: `'next' is not recognized` error on Windows
**Solution**: Use WSL for development:
```bash
# Switch to WSL
wsl

# Navigate to project
cd /mnt/c/Users/username/path/to/project

# Run commands in WSL
npm run dev
```

### 4. 404 Errors on Page Refresh

**Issue**: Direct navigation to routes returns 404
**Solution**: GitHub Pages serves static files, ensure `trailingSlash: true` in config

## 📱 Development Workflow

### 1. Daily Development

```bash
# Start development server (use WSL on Windows)
npm run dev

# Open browser to http://localhost:3000
```

### 2. Before Deployment

```bash
# Test build locally
npm run build

# Test export
npm run export

# Check out/ directory contents
ls -la out/
```

### 3. Deployment

```bash
# Commit changes
git add .
git commit -m "Description of changes"

# Push to trigger GitHub Actions
git push origin main

# Check deployment at: https://username.github.io/repository-name/
```

## 🎨 Styling & Components Setup

### 1. Global CSS Setup (`src/app/globals.css`)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Add custom global styles */
```

### 2. Component Structure

- Use `src/components/` for reusable components
- Follow consistent naming: `ComponentName.tsx`
- Include TypeScript interfaces for props

### 3. Responsive Design

- Use Tailwind responsive prefixes (`sm:`, `md:`, `lg:`, `xl:`)
- Test on multiple screen sizes
- Implement mobile-first design

## 🧪 Testing & Quality

### 1. Pre-deployment Checklist

- [ ] All pages load without errors
- [ ] Navigation works correctly
- [ ] Responsive design functions on all screen sizes
- [ ] All images and assets load properly
- [ ] No console errors
- [ ] Build succeeds locally

### 2. Performance Optimization

```bash
# Analyze bundle size
npm run build

# Check for unused dependencies
npx depcheck
```

## 🔐 Security & Best Practices

### 1. Environment Variables

- Never commit sensitive data
- Use `.env.local` for local development
- Use GitHub Secrets for deployment variables

### 2. Dependencies

```bash
# Keep dependencies updated
npm audit
npm update

# Remove unused dependencies
npm prune
```

## 📚 Resources

- [Next.js Static Export Documentation](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

## 🚨 Emergency Troubleshooting

### Quick Fix Commands

```bash
# Reset everything
rm -rf .next out node_modules package-lock.json
npm install
npm run build

# Force redeploy
git commit --allow-empty -m "Force redeploy"
git push origin main

# Check GitHub Actions logs
# Go to repository → Actions tab → Click on failed workflow
```

### Support Locations

1. Check this file first: `docs/githubIO.md`
2. Check project-specific: `docs/troubleshoot.md` 
3. GitHub Actions logs in repository
4. Next.js documentation for static exports

---

*Last updated: 2025-07-19*
*This file should be updated whenever new deployment patterns or issues are discovered.*