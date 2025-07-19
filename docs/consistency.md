# Hook Lab - Consistency Guide

This document outlines the established patterns and consistency standards used across all Hook Lab pages. Use this as a reference when creating new hook demonstrations to maintain visual and functional consistency.

## 📐 Page Structure Consistency

### Standard Page Layout
All hook pages follow this exact structure:

```tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import Navbar from '@/components/Navbar';

export default function UseHookPage() {
  // State declarations
  // Ref declarations  
  // Code visibility states
  // Effects
  // Helper functions

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="mb-8 text-3xl font-bold text-center text-gray-800">
            useHook Hook Demo
          </h1>
          
          {/* Hook Description */}
          <div className="p-6 mb-8 bg-white rounded-lg shadow-md">
            {/* Description content */}
          </div>
          
          <div className="space-y-8">
            {/* Interactive examples */}
          </div>
        </div>
      </div>
    </div>
  );
}
```

### Required Elements

Every hook page MUST include:

1. **Page Title**: `useHook Hook Demo` format
2. **Hook Description Section**: Explanation of what the hook does
3. **Basic Syntax Section**: Code example showing hook syntax
4. **Interactive Examples**: At least 3-4 different use cases
5. **Common Gotchas Section**: Best practices and common mistakes
6. **Code Toggle Buttons**: For each example section

## 🎨 Visual Consistency

### Typography Hierarchy

```tsx
// Page title (H1)
<h1 className="mb-8 text-3xl font-bold text-center text-gray-800">
  useHook Hook Demo
</h1>

// Section title (H2)
<h2 className="mb-4 text-xl font-semibold text-gray-700">
  Section Title
</h2>

// Subsection (H3)
<h3 className="mb-2 text-lg font-medium text-gray-800">
  Subsection Title
</h3>

// Code example header
<h3 className="mb-2 text-sm font-medium text-gray-700">
  Example Code:
</h3>
```

### Color Scheme Standards

**Status Colors**:
- ✅ Success: `text-green-800`, `bg-green-50`, `border-green-200`
- ❌ Error: `text-red-800`, `bg-red-50`, `border-red-200`
- ⚠️ Warning: `text-yellow-800`, `bg-yellow-50`, `border-yellow-200`
- ℹ️ Info: `text-blue-800`, `bg-blue-50`, `border-blue-200`
- 🔄 Loading: `text-blue-700`, `bg-blue-50`, `border-blue-200`

**Interactive Elements**:
- Primary buttons: `bg-blue-500 hover:bg-blue-600`
- Success buttons: `bg-green-500 hover:bg-green-600`
- Danger buttons: `bg-red-500 hover:bg-red-600`
- Secondary buttons: `bg-gray-500 hover:bg-gray-600`

## 🧩 Component Patterns

### Section Container Pattern

```tsx
<div className="p-6 bg-white rounded-lg shadow-md">
  <div className="flex items-center justify-between mb-4">
    <h2 className="text-xl font-semibold text-gray-700">Section Title</h2>
    <button
      onClick={() => setShowCode(!showCode)}
      className="px-3 py-1 text-sm text-white transition-colors bg-gray-600 rounded hover:bg-gray-700"
    >
      {showCode ? 'Hide Code' : 'View Code'}
    </button>
  </div>
  
  <div className="space-y-4">
    {/* Interactive content */}
  </div>
  
  <p className="mt-4 text-sm text-gray-700">
    ✅ Description of what this example demonstrates
  </p>
  
  {showCode && (
    <div className="p-4 mt-4 border border-gray-200 rounded bg-gray-50">
      <h3 className="mb-2 text-sm font-medium text-gray-700">Example Code:</h3>
      <pre className="p-4 overflow-x-auto text-sm bg-gray-900 rounded">
        <code>
          {/* Syntax-highlighted code */}
        </code>
      </pre>
    </div>
  )}
</div>
```

### Hook Description Pattern

```tsx
<div className="p-6 mb-8 bg-white rounded-lg shadow-md">
  <h2 className="mb-4 text-xl font-semibold text-gray-700">What is useHook?</h2>
  <p className="mb-4 text-gray-700">
    <code className="px-2 py-1 text-white bg-gray-800 rounded">useHook</code> description...
  </p>
  <div className="p-4 border border-gray-200 rounded bg-gray-50">
    <h3 className="mb-2 text-lg font-medium text-gray-800">Basic Syntax:</h3>
    <pre className="p-3 overflow-x-auto text-green-400 bg-gray-800 rounded">
      <code>{`// Basic usage examples`}</code>
    </pre>
  </div>
</div>
```

### Status Display Pattern

```tsx
// Info status
<div className="p-4 border border-blue-200 rounded bg-blue-50">
  <p className="text-blue-800">
    <strong>Status:</strong> {status}
  </p>
</div>

// Success status
<div className="p-4 border border-green-200 rounded bg-green-50">
  <p className="text-green-800">
    <strong>Success:</strong> {message}
  </p>
</div>

// Error status
<div className="p-4 border border-red-200 rounded bg-red-50">
  <p className="text-red-800">
    <strong>Error:</strong> {error}
  </p>
</div>

// Warning/Gotcha
<div className="p-3 text-sm text-gray-800 border border-yellow-200 rounded bg-yellow-50">
  <strong>⚠️ Common Gotcha:</strong> Description
  <br />
  <code className="px-2 py-1 text-red-700 rounded bg-red-50">❌ Wrong approach</code>
  <br />
  <code className="px-2 py-1 text-green-700 rounded bg-green-50">✅ Correct approach</code>
</div>
```

## 💻 Code Syntax Highlighting

### Consistent Color Mapping

```tsx
// Comments
<span className="text-green-400">{"// Comment here"}</span>

// Keywords (const, let, if, return, etc.)
<span className="text-blue-400">const</span>

// Variables and function names
<span className="text-yellow-300">variableName</span>

// Strings
<span className="text-yellow-200">'string value'</span>

// Numbers
<span className="text-orange-400">42</span>

// Functions (useState, useEffect, etc.)
<span className="text-purple-400">useState</span>

// JSX elements
<span className="text-red-400">{"<div"}</span>

// JSX attributes
<span className="text-green-300">className</span>

// Operators
<span className="text-cyan-400">{"=>"}</span>

// Default text
<span className="text-white">default text</span>
```

### Code Block Structure

```tsx
<pre className="p-4 overflow-x-auto text-sm bg-gray-900 rounded">
  <code>
    <span className="text-green-400">{"// Code comments"}{"\n"}</span>
    <span className="text-blue-400">const</span>{" "}
    <span className="text-yellow-300">[state, setState]</span>{" "}
    = <span className="text-purple-400">useState</span>
    <span className="text-white">(</span>
    <span className="text-orange-400">0</span>
    <span className="text-white">);</span>{"\n\n"}
    
    {/* More code with proper formatting */}
  </code>
</pre>
```

## 🔘 Button Consistency

### Standard Button Patterns

```tsx
// Primary action button
<button className="px-4 py-2 text-white transition-colors bg-blue-500 rounded hover:bg-blue-600">
  Primary Action
</button>

// Success/Add button
<button className="px-4 py-2 text-white transition-colors bg-green-500 rounded hover:bg-green-600">
  Add/Success Action
</button>

// Danger/Remove button
<button className="px-4 py-2 text-white transition-colors bg-red-500 rounded hover:bg-red-600">
  Remove/Danger Action
</button>

// Secondary/Reset button
<button className="px-4 py-2 text-white transition-colors bg-gray-500 rounded hover:bg-gray-600">
  Reset/Secondary
</button>

// Code toggle button (smaller)
<button className="px-3 py-1 text-sm text-white transition-colors bg-gray-600 rounded hover:bg-gray-700">
  {showCode ? 'Hide Code' : 'View Code'}
</button>

// Disabled button
<button
  disabled
  className="px-4 py-2 bg-gray-400 text-gray-600 cursor-not-allowed rounded"
>
  Disabled
</button>
```

### Conditional Button Styling

```tsx
<button
  className={`px-4 py-2 rounded transition-colors ${
    condition 
      ? 'bg-green-500 text-white hover:bg-green-600' 
      : 'bg-red-500 text-white hover:bg-red-600'
  }`}
>
  {condition ? 'Active' : 'Inactive'}
</button>
```

## 📝 Form Input Consistency

### Standard Input Pattern

```tsx
<input
  type="text"
  placeholder="Enter text..."
  value={value}
  onChange={(e) => setValue(e.target.value)}
  className="px-3 py-2 text-gray-800 placeholder-gray-500 border-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
/>

// Full width input
<input
  className="flex-1 px-3 py-2 text-gray-800 placeholder-gray-500 border-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
/>

// Input with error state
<input
  className="px-3 py-2 text-gray-800 placeholder-gray-500 border-2 border-red-500 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
/>
```

## ⚠️ Common Gotchas Section Pattern

Every page MUST include a "Common Gotchas & Best Practices" section:

```tsx
<div className="p-6 bg-white rounded-lg shadow-md">
  <h2 className="mb-4 text-xl font-semibold text-gray-700">⚠️ Common Gotchas & Best Practices</h2>
  
  <div className="space-y-6">
    {/* Wrong vs Correct examples */}
    <div className="p-4 border border-red-200 rounded bg-red-50">
      <h3 className="mb-2 text-lg font-medium text-red-800">1. Common Mistake</h3>
      <p className="mb-3 text-sm text-red-700">
        Description of the mistake
      </p>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <p className="mb-2 text-xs font-medium text-red-800">❌ Wrong:</p>
          <pre className="p-2 text-xs bg-gray-900 rounded">
            <code className="text-white">{`// Wrong code example`}</code>
          </pre>
        </div>
        <div>
          <p className="mb-2 text-xs font-medium text-green-800">✅ Correct:</p>
          <pre className="p-2 text-xs bg-gray-900 rounded">
            <code className="text-white">{`// Correct code example`}</code>
          </pre>
        </div>
      </div>
    </div>
    
    {/* Best practices list */}
    <div className="p-4 border border-blue-200 rounded bg-blue-50">
      <h3 className="mb-2 text-lg font-medium text-blue-800">💡 Best Practices</h3>
      <ul className="text-sm text-blue-700 list-disc list-inside space-y-1">
        <li>Best practice 1</li>
        <li>Best practice 2</li>
        <li>Best practice 3</li>
      </ul>
    </div>
  </div>
</div>
```

## 🔄 State Management Patterns

### Code Visibility States

```tsx
// Always include these for each section with code examples
const [showBasicCode, setShowBasicCode] = useState(false);
const [showAdvancedCode, setShowAdvancedCode] = useState(false);
const [showExampleCode, setShowExampleCode] = useState(false);
```

### Hook State Patterns

```tsx
// Basic hook state
const [value, setValue] = useState(initialValue);

// Loading states
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);

// Complex state with TypeScript
const [data, setData] = useState<DataType | null>(null);

// Multiple related states
const [count, setCount] = useState(0);
const [isActive, setIsActive] = useState(false);
const [items, setItems] = useState<string[]>([]);
```

## 📱 Responsive Design Standards

### Container Spacing

```tsx
// Page container
<div className="p-8">
  <div className="max-w-4xl mx-auto">
    {/* Content */}
  </div>
</div>

// Section spacing
<div className="space-y-8">
  {/* Sections */}
</div>

// Element spacing
<div className="space-y-4">
  {/* Elements */}
</div>
```

### Grid Layouts

```tsx
// Two-column responsive grid
<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
  <div>Column 1</div>
  <div>Column 2</div>
</div>

// Button groups
<div className="flex items-center space-x-4">
  <button>Button 1</button>
  <button>Button 2</button>
</div>
```

## 🧪 Interactive Example Requirements

### Minimum Interactive Examples

Each hook page should include:

1. **Basic Usage Example**: Simplest possible demonstration
2. **Practical Example**: Real-world use case
3. **Advanced Example**: More complex scenario or edge case
4. **Comparison Example**: Common mistakes vs correct usage

### Example Naming Convention

```tsx
// Section titles should be descriptive and follow this pattern:
"Basic [Hook] Example"
"[Specific Use Case] Example" 
"Advanced [Feature] Example"
"[Hook] with [Other Concept] Example"
```

## 📋 Quality Checklist

Before considering a hook page complete, verify:

### Content Requirements
- [ ] Hook description with clear explanation
- [ ] Basic syntax code block
- [ ] At least 3 interactive examples
- [ ] Common gotchas section with wrong/correct examples
- [ ] Best practices list
- [ ] All examples have working functionality

### Visual Requirements
- [ ] Consistent color scheme throughout
- [ ] Proper typography hierarchy
- [ ] All buttons follow standard patterns
- [ ] Code blocks have proper syntax highlighting
- [ ] Status messages use appropriate colors
- [ ] Responsive design on mobile/tablet

### Interactive Requirements
- [ ] All buttons work correctly
- [ ] All inputs respond properly
- [ ] Code toggle buttons show/hide correctly
- [ ] No console errors
- [ ] Examples demonstrate hook functionality clearly

### Code Quality Requirements
- [ ] TypeScript types are properly defined
- [ ] All refs check for null before usage
- [ ] Effects have proper cleanup
- [ ] No memory leaks from timers/subscriptions
- [ ] Consistent variable naming

## 🔄 Maintenance Guidelines

### When Adding New Hooks

1. **Follow the exact structure** outlined in this document
2. **Copy patterns** from existing completed pages (useState, useEffect, useRef)
3. **Maintain consistency** in naming, styling, and functionality
4. **Test thoroughly** on different screen sizes
5. **Update this document** if new patterns emerge

### When Updating Existing Pages

1. **Check consistency** with latest patterns
2. **Update all pages** if making global changes
3. **Test cross-page navigation** and styling
4. **Maintain backwards compatibility** with existing URLs

---

*This consistency guide should be updated whenever new patterns are established or existing patterns are modified.*