# Hook Lab - Styling Guide

This document defines the consistent styling patterns used across all Hook Lab pages. Use this as a reference to maintain visual consistency and code quality.

## 🎨 Design System Overview

Hook Lab follows a utility-first approach using Tailwind CSS with consistent patterns for:
- Layout and spacing
- Typography and colors
- Interactive components
- Code presentation
- Responsive design

---

## 📐 Page Structure & Layout

### Page Container Pattern
```jsx
<div className="min-h-screen bg-gray-100">
  <Navbar />
  <div className="p-8">
    <div className="max-w-4xl mx-auto">
      {/* Page content */}
    </div>
  </div>
</div>
```

**Classes:**
- `min-h-screen bg-gray-100` - Full viewport height with light gray background
- `p-8` - Consistent 32px padding on all sides
- `max-w-4xl mx-auto` - Centered content with max width of 896px

### Spacing System
- **Major sections**: `space-y-8` (32px vertical spacing)
- **Component sections**: `space-y-4` (16px vertical spacing)
- **Inline elements**: `space-x-4` (16px horizontal spacing)
- **Small spacing**: `space-x-2` (8px horizontal spacing)

---

## 🎭 Component Containers & Cards

### Primary Card Pattern
```jsx
<div className="p-6 bg-white rounded-lg shadow-md">
  {/* Card content */}
</div>
```

**Usage:** All main content sections, interactive components, code examples

### Description Card Pattern
```jsx
<div className="p-6 mb-8 bg-white rounded-lg shadow-md">
  {/* Description content */}
</div>
```

**Usage:** Hook descriptions, explanatory sections at top of pages

### Status Cards
```jsx
// Info/Loading
<div className="p-4 border border-blue-200 rounded bg-blue-50">
  <p className="text-blue-800">{message}</p>
</div>

// Success
<div className="p-4 border border-green-200 rounded bg-green-50">
  <p className="text-green-800">{message}</p>
</div>

// Error
<div className="p-4 border border-red-200 rounded bg-red-50">
  <p className="text-red-800">{message}</p>
</div>

// Warning
<div className="p-4 border border-yellow-200 rounded bg-yellow-50">
  <p className="text-yellow-800">{message}</p>
</div>
```

**Usage:** Status messages, alerts, loading states

---

## 🔘 Button Styles & Variants

### Primary Action Buttons
```jsx
// Green (success/add actions)
<button className="px-4 py-2 text-white transition-colors bg-green-500 rounded hover:bg-green-600">
  Add Item
</button>

// Blue (primary actions)
<button className="px-4 py-2 text-white transition-colors bg-blue-500 rounded hover:bg-blue-600">
  Submit
</button>

// Red (danger/remove actions)
<button className="px-4 py-2 text-white transition-colors bg-red-500 rounded hover:bg-red-600">
  Remove
</button>

// Purple (special actions)
<button className="px-4 py-2 text-white transition-colors bg-purple-500 rounded hover:bg-purple-600">
  Update
</button>
```

### Secondary Buttons
```jsx
// Gray (neutral actions)
<button className="px-4 py-2 text-white transition-colors bg-gray-500 rounded hover:bg-gray-600">
  Cancel
</button>

// Code toggle buttons (smaller)
<button className="px-3 py-1 text-sm text-white transition-colors bg-gray-600 rounded hover:bg-gray-700">
  {showCode ? 'Hide Code' : 'View Code'}
</button>
```

### Toggle Buttons (Conditional Styling)
```jsx
<button
  className={`px-6 py-3 rounded-lg font-medium transition-colors ${
    isToggled
      ? 'bg-blue-500 text-white hover:bg-blue-600'
      : 'bg-gray-200 text-gray-900 hover:bg-gray-300 border-2 border-gray-400'
  }`}
>
  {isToggled ? 'ON' : 'OFF'}
</button>
```

### Disabled State
```jsx
<button
  disabled
  className="px-4 py-2 bg-gray-400 text-gray-600 cursor-not-allowed rounded"
>
  Disabled Button
</button>
```

---

## 💻 Code Block Styling

### Code Container Structure
```jsx
<div className="p-4 border border-gray-200 rounded bg-gray-50">
  <pre className="p-4 overflow-x-auto text-sm bg-gray-900 rounded">
    <code className="text-white">
      {/* Code content */}
    </code>
  </pre>
</div>
```

### Inline Code
```jsx
<code className="px-2 py-1 text-white bg-gray-800 rounded">
  useState()
</code>
```

### Syntax Highlighting Colors
```jsx
// Example with syntax highlighting
<pre className="p-4 overflow-x-auto text-sm bg-gray-900 rounded">
  <code>
    <span className="text-blue-400">const</span>
    <span className="text-white"> [</span>
    <span className="text-yellow-300">count</span>
    <span className="text-white">, </span>
    <span className="text-yellow-300">setCount</span>
    <span className="text-white">] = </span>
    <span className="text-purple-400">useState</span>
    <span className="text-white">(</span>
    <span className="text-orange-400">0</span>
    <span className="text-white">);</span>
  </code>
</pre>
```

**Syntax Color Mapping:**
- **Comments**: `text-green-400`
- **Keywords**: `text-blue-400`
- **Variables**: `text-yellow-300`
- **Strings**: `text-yellow-200`
- **Numbers**: `text-orange-400`
- **Functions**: `text-purple-400`
- **JSX tags**: `text-red-400`
- **JSX attributes**: `text-green-300`
- **Operators**: `text-cyan-400`
- **Default text**: `text-white`

### Code Block Headers
```jsx
<div className="flex items-center justify-between mb-4">
  <h2 className="text-xl font-semibold text-gray-700">Code Example</h2>
  <button className="px-3 py-1 text-sm text-white transition-colors bg-gray-600 rounded hover:bg-gray-700">
    {showCode ? 'Hide Code' : 'View Code'}
  </button>
</div>
```

---

## 🔤 Typography & Text

### Headings
```jsx
// Page title (H1)
<h1 className="mb-8 text-3xl font-bold text-center text-gray-800">
  useState Hook Demo
</h1>

// Section title (H2)
<h2 className="mb-4 text-xl font-semibold text-gray-700">
  What is useState?
</h2>

// Subsection (H3)
<h3 className="mb-2 text-lg font-medium text-gray-800">
  Basic Usage
</h3>

// Code block header
<p className="mb-2 text-sm font-medium text-gray-700">
  Example:
</p>
```

### Body Text
```jsx
// Primary text
<p className="text-gray-700">
  This is the primary text content.
</p>

// Secondary text
<p className="text-gray-600">
  This is secondary text content.
</p>

// Small text
<p className="text-sm text-gray-700">
  This is small text content.
</p>

// Extra small text
<p className="text-xs text-gray-700">
  This is extra small text content.
</p>
```

### Status Text Colors
```jsx
// Success text
<p className="text-green-800">Success message</p>

// Error text
<p className="text-red-800">Error message</p>

// Warning text
<p className="text-yellow-800">Warning message</p>

// Info text
<p className="text-blue-800">Info message</p>
```

---

## 🎨 Color Schemes & Themes

### Primary Color Palette
- **Page background**: `bg-gray-100`
- **Card background**: `bg-white`
- **Border color**: `border-gray-200`
- **Primary text**: `text-gray-700`
- **Secondary text**: `text-gray-600`
- **Dark text**: `text-gray-800`

### Accent Colors
- **Blue**: Primary actions, info states (`bg-blue-500`, `text-blue-800`)
- **Green**: Success states, positive actions (`bg-green-500`, `text-green-800`)
- **Red**: Danger states, remove actions (`bg-red-500`, `text-red-800`)
- **Yellow**: Warning states, highlights (`bg-yellow-500`, `text-yellow-800`)
- **Purple**: Special actions, emphasis (`bg-purple-500`, `text-purple-800`)
- **Gray**: Neutral states, secondary actions (`bg-gray-500`, `text-gray-600`)

### Code Theme
- **Background**: `bg-gray-900`
- **Text**: `text-white`
- **Inline code background**: `bg-gray-800`

---

## 📱 Interactive Elements

### Form Inputs
```jsx
// Standard input field
<input
  type="text"
  className="px-3 py-2 text-gray-800 placeholder-gray-500 border-2 border-gray-300 rounded 
           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
  placeholder="Enter text..."
/>

// Full width input
<input
  type="text"
  className="flex-1 px-3 py-2 text-gray-800 placeholder-gray-500 border-2 border-gray-300 rounded 
           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
  placeholder="Enter text..."
/>

// Input with error state
<input
  type="text"
  className="px-3 py-2 text-gray-800 placeholder-gray-500 border-2 border-red-500 rounded 
           focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
  placeholder="Enter text..."
/>
```

### Form Labels
```jsx
<label className="block text-sm font-medium text-gray-700">
  Field Name
</label>
```

### Error Messages
```jsx
<p className="mt-1 text-sm text-red-600">
  This field is required
</p>
```

---

## 📐 Layout Patterns

### Flex Layouts
```jsx
// Header with title and button
<div className="flex items-center justify-between mb-4">
  <h2 className="text-xl font-semibold text-gray-700">Section Title</h2>
  <button className="px-3 py-1 text-sm text-white transition-colors bg-gray-600 rounded hover:bg-gray-700">
    Action
  </button>
</div>

// Inline elements with spacing
<div className="flex items-center space-x-4">
  <button>Button 1</button>
  <button>Button 2</button>
</div>
```

### Grid Layouts
```jsx
// Two-column grid (responsive)
<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
  <div>Column 1</div>
  <div>Column 2</div>
</div>
```

---

## 📱 Responsive Design

### Breakpoint Strategy
- **Mobile first**: Start with `grid-cols-1`, single column layouts
- **Medium screens**: Use `md:grid-cols-2` for side-by-side content
- **Consistent spacing**: Maintain spacing across all breakpoints

### Responsive Patterns
```jsx
// Responsive grid
<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
  {/* Content */}
</div>

// Responsive text (if needed)
<h1 className="text-2xl md:text-3xl font-bold">
  Responsive Title
</h1>
```

---

## 🔧 Component Patterns

### Section Header Pattern
```jsx
<div className="flex items-center justify-between mb-4">
  <h2 className="text-xl font-semibold text-gray-700">Section Title</h2>
  <button
    onClick={() => setShowCode(!showCode)}
    className="px-3 py-1 text-sm text-white transition-colors bg-gray-600 rounded hover:bg-gray-700"
  >
    {showCode ? 'Hide Code' : 'View Code'}
  </button>
</div>
```

### Collapsible Code Section Pattern
```jsx
{showCode && (
  <div className="p-4 mt-4 border border-gray-200 rounded bg-gray-50">
    <pre className="p-4 overflow-x-auto text-sm bg-gray-900 rounded">
      <code className="text-white">
        {/* Code content */}
      </code>
    </pre>
  </div>
)}
```

### Status Display Pattern
```jsx
<div className="p-4 border border-blue-200 rounded bg-blue-50">
  <p className="text-blue-800">
    <strong>Status:</strong> {status}
  </p>
</div>
```

---

## 🎯 Best Practices

### 1. Consistency
- Always use the same classes for similar components
- Follow the established color scheme
- Maintain consistent spacing patterns

### 2. Accessibility
- Ensure proper contrast ratios
- Use semantic HTML elements
- Include focus states for interactive elements

### 3. Responsive Design
- Use mobile-first approach
- Test on multiple screen sizes
- Maintain readability across devices

### 4. Code Quality
- Use conditional classes for dynamic states
- Keep utility classes organized and readable
- Follow Tailwind CSS best practices

### 5. Performance
- Use `transition-colors` for smooth hover effects
- Optimize for fast rendering
- Minimize CSS bundle size

---

## 📋 Component Checklist

When creating new components, ensure they include:

### Required Elements
- [ ] Consistent card styling (`p-6 bg-white rounded-lg shadow-md`)
- [ ] Proper typography classes
- [ ] Appropriate color scheme
- [ ] Hover states for interactive elements
- [ ] Focus states for accessibility
- [ ] Responsive design considerations

### Code Sections
- [ ] Collapsible code blocks with toggle buttons
- [ ] Syntax highlighting for code examples
- [ ] Proper code container styling
- [ ] Inline code styling where appropriate

### Interactive Elements
- [ ] Consistent button styling
- [ ] Form input styling with focus states
- [ ] Error message styling
- [ ] Status display patterns

### Layout
- [ ] Proper spacing using space utilities
- [ ] Responsive grid layouts where needed
- [ ] Flex layouts for component headers
- [ ] Consistent padding and margins

---

## 🔍 Common Mistakes to Avoid

1. **Inconsistent spacing**: Always use the established spacing system
2. **Wrong color usage**: Follow the color scheme for consistency
3. **Missing hover states**: All interactive elements need hover effects
4. **Poor contrast**: Ensure text is readable against backgrounds
5. **Inconsistent button sizes**: Use standard button sizing patterns
6. **Missing responsive design**: Test on mobile devices
7. **Incorrect code styling**: Follow the established code block patterns

---

*This styling guide should be referenced for all new components and updated as patterns evolve.*