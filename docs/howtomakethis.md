# How to Create a Next.js GitHub Pages Boilerplate with CI/CD

This guide shows you how to create a complete Next.js boilerplate for GitHub Pages with automated deployment. This is a general-purpose setup that can be used for any GitHub.io project.

## 🎯 What You'll Get

- **Modern Next.js 15** setup with App Router
- **Automatic GitHub Pages deployment** via GitHub Actions
- **TypeScript & Tailwind CSS** configured
- **Static site generation** optimized for GitHub Pages
- **CI/CD pipeline** that deploys on every push to main
- **Custom domain support** (optional)

## 📋 Prerequisites

- Node.js 18+
- GitHub account
- Git installed locally

## 🚀 Step 1: Create New Next.js Project

```bash
# Create new Next.js project
npx create-next-app@latest my-github-pages-site --typescript --tailwind --app --eslint --src-dir

# Navigate to project
cd my-github-pages-site

# Test that everything works
npm run dev
```

Visit `http://localhost:3000` to confirm it's working, then stop the dev server.

## ⚙️ Step 2: Configure for GitHub Pages

### 2.1 Update `next.config.ts`

Replace the contents with:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/my-github-pages-site",  // Replace with your repo name
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```

**Important**: Replace `my-github-pages-site` with your actual repository name.

### 2.2 Update `package.json`

Modify the scripts section:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

### 2.3 Create `.nojekyll` file

```bash
# Create file to disable Jekyll processing
touch public/.nojekyll
```

## 🤖 Step 3: Set Up GitHub Actions CI/CD

### 3.1 Create workflow directory

```bash
mkdir -p .github/workflows
```

### 3.2 Create deployment workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

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
          node-version: 18
          cache: 'npm'

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Install dependencies
        run: npm ci

      - name: Build with Next.js
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
    if: github.ref == 'refs/heads/main'
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## 📁 Step 4: Create Basic Site Structure

### 4.1 Update `src/app/page.tsx`

Replace with a basic homepage:

```typescript
export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to My GitHub Pages Site
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            This is a Next.js site deployed automatically to GitHub Pages using GitHub Actions.
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="#features"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Get Started
            </a>
            <a
              href="https://github.com/your-username/your-repo"
              className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub
            </a>
          </div>
        </div>

        <div id="features" className="mt-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                🚀 Modern Stack
              </h3>
              <p className="text-gray-600">
                Built with Next.js 15, React 19, TypeScript, and Tailwind CSS
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                🤖 Auto Deploy
              </h3>
              <p className="text-gray-600">
                Automatic deployment to GitHub Pages with GitHub Actions
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                ⚡ Optimized
              </h3>
              <p className="text-gray-600">
                Static site generation for fast loading and SEO
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

### 4.2 Update `src/app/layout.tsx`

```typescript
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'My GitHub Pages Site',
  description: 'A Next.js site deployed to GitHub Pages',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
```

## 🔧 Step 5: GitHub Repository Setup

### 5.1 Create GitHub Repository

1. Go to [GitHub](https://github.com)
2. Click "New repository"
3. Name it `my-github-pages-site` (or your preferred name)
4. Make it public
5. Don't initialize with README (we already have files)

### 5.2 Push Your Code

```bash
# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Next.js GitHub Pages setup"

# Add remote origin (replace with your GitHub username and repo name)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git push -u origin main
```

## 🌐 Step 6: Enable GitHub Pages

### 6.1 Configure Repository Settings

1. Go to your repository on GitHub
2. Click "Settings" tab
3. Scroll down to "Pages" section
4. Under "Source", select "GitHub Actions"
5. Save the settings

### 6.2 Wait for Deployment

- The GitHub Action will automatically run
- Check the "Actions" tab to see the deployment progress
- Once complete, your site will be available at:
  `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME`

## 🎨 Step 7: Customization Options

### 7.1 Add Custom Domain (Optional)

If you have a custom domain:

1. Create `public/CNAME` file:
   ```
   yourdomain.com
   ```

2. Update `next.config.ts`:
   ```typescript
   const nextConfig: NextConfig = {
     output: "export",
     basePath: "",  // Remove basePath for custom domain
     trailingSlash: true,
     images: {
       unoptimized: true,
     },
   };
   ```

### 7.2 Environment-Specific Configuration

Create different configs for development and production:

```typescript
// next.config.ts
import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? "/your-repo-name" : "",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```

## 🔄 Step 8: Development Workflow

### 8.1 Local Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Test production build locally
npx serve out
```

### 8.2 Deployment Workflow

1. Make changes to your code
2. Commit and push to main branch:
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```
3. GitHub Actions automatically deploys to GitHub Pages

## 📚 Step 9: Common Additions

### 9.1 Add More Pages

```bash
# Create new page
mkdir src/app/about
touch src/app/about/page.tsx
```

```typescript
// src/app/about/page.tsx
export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">About</h1>
        <p className="text-lg text-gray-600">
          This is the about page of your GitHub Pages site.
        </p>
      </div>
    </div>
  );
}
```

### 9.2 Add Navigation Component

```typescript
// src/components/Navigation.tsx
import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold text-gray-900">
            My Site
          </Link>
          <div className="flex space-x-6">
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              Home
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900">
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
```

### 9.3 Add SEO Component

```typescript
// src/components/SEO.tsx
import Head from 'next/head';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export default function SEO({ title, description, image, url }: SEOProps) {
  const siteTitle = title ? `${title} | My Site` : 'My GitHub Pages Site';
  const siteDescription = description || 'A Next.js site deployed to GitHub Pages';
  
  return (
    <Head>
      <title>{siteTitle}</title>
      <meta name="description" content={siteDescription} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:type" content="website" />
      {image && <meta property="og:image" content={image} />}
      {url && <meta property="og:url" content={url} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={siteDescription} />
      {image && <meta name="twitter:image" content={image} />}
    </Head>
  );
}
```

## 🐛 Troubleshooting

### Common Issues

1. **404 on GitHub Pages**: 
   - Check that basePath in next.config.ts matches your repo name
   - Ensure GitHub Pages is set to "GitHub Actions" source

2. **Build Failures**:
   - Check the Actions tab for error details
   - Ensure all dependencies are in package.json
   - Verify Next.js version compatibility

3. **Images Not Loading**:
   - Make sure images are in the `public` folder
   - Use `unoptimized: true` in next.config.ts

4. **CSS Not Loading**:
   - Check that Tailwind CSS is properly configured
   - Verify globals.css imports

### Debug Commands

```bash
# Check build output
npm run build && ls -la out/

# Test production build locally
npx serve out

# Check for TypeScript errors
npx tsc --noEmit

# Check for linting issues
npm run lint
```

## 🎉 Single-Command Setup

For quick setup, you can use this single prompt with Claude:

```
Create a Next.js 15 GitHub Pages boilerplate with:
- TypeScript and Tailwind CSS
- Static export configuration for GitHub Pages
- GitHub Actions CI/CD workflow
- Basic homepage with responsive design
- Proper basePath configuration
- .nojekyll file for GitHub Pages
- Modern project structure with src/ directory
- Production-ready deployment setup

Configure everything needed for automatic deployment to username.github.io/repo-name when pushed to main branch.
```

## 📝 Summary

This boilerplate provides:

- ✅ **Modern Next.js 15** with App Router
- ✅ **Automatic deployment** via GitHub Actions
- ✅ **TypeScript & Tailwind CSS** setup
- ✅ **GitHub Pages optimization**
- ✅ **CI/CD pipeline** for every push
- ✅ **Custom domain support**
- ✅ **SEO-friendly** static generation

Your site will be automatically deployed to `https://username.github.io/repo-name` every time you push to the main branch!

## 🔗 Useful Links

- [Next.js Documentation](https://nextjs.org/docs)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)