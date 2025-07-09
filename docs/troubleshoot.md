# Hook Lab - Troubleshooting Guide

This document contains common issues encountered during Hook Lab development and their solutions. Use this as a reference for future development.

## 🔴 Common CI/Build Errors

### 1. TypeScript/ESLint Errors

#### **Error: `Unexpected any. Specify a different type. @typescript-eslint/no-explicit-any`**

**What it means:** Using `any` type defeats TypeScript's type safety.

**Common scenarios:**
- Dynamic data from API calls
- Complex state objects
- Generic utility functions

**❌ Wrong:**
```typescript
const [data, setData] = useState<any>(null);
```

**✅ Correct:**
```typescript
// Define specific interface
interface UserData {
  message: string;
  timestamp: string;
  id: string;
}

const [data, setData] = useState<UserData | null>(null);

// Or inline type
const [data, setData] = useState<{
  message: string;
  timestamp: string;
  id: string;
} | null>(null);
```

**Solution pattern:**
1. Identify the actual shape of your data
2. Create an interface or inline type
3. Use union types with `null` for optional data

---

#### **Error: `'variable' is defined but never used. @typescript-eslint/no-unused-vars`**

**What it means:** ESLint detected a variable that's declared but never used.

**Common scenarios:**
- Error variables in try/catch blocks
- Function parameters not used
- Imported modules not used

**❌ Wrong:**
```typescript
try {
  // some code
} catch (error) {
  setError('Something went wrong'); // 'error' is unused
}
```

**✅ Correct:**
```typescript
try {
  // some code
} catch (error) {
  setError(error instanceof Error ? error.message : 'Something went wrong');
}

// Or if you really don't need the error
catch (_error) {
  setError('Something went wrong');
}
```

**Solution pattern:**
1. Use the variable appropriately
2. Prefix with underscore (`_error`) if intentionally unused
3. Remove if truly not needed

---

### 2. Build Process Issues

#### **Error: `Failed to compile` during `npm run build`**

**Common causes:**
- TypeScript errors
- ESLint errors
- Missing dependencies
- Circular imports

**Debugging steps:**
1. Run `npx tsc --noEmit` to check TypeScript issues
2. Run `npx eslint src/ --ext .ts,.tsx` to check linting
3. Check for missing imports/dependencies
4. Look for circular import dependencies

**Resolution order:**
1. Fix TypeScript errors first
2. Fix ESLint errors second
3. Test with `npm run build`

---

## 🔤 JSX Encoding Issues

### 7. Arrow Function Encoding in JSX

#### **Issue: Arrow functions not rendering correctly in code examples**

**Problem:** JSX treats `>` as the end of a tag, breaking arrow functions in inline code examples.

**Common scenarios:**
- Inline code snippets with arrow functions
- Template literals with arrow functions
- Code examples within JSX strings

**❌ Wrong:**
```jsx
// This will break JSX parsing
<code>setCount(prev => prev + 1)</code>

// This will render incorrectly
<code>onClick={() => handleClick()}</code>
```

**✅ Correct:**
```jsx
// Method 1: HTML entity encoding (for inline code)
<code>setCount(prev =&gt; prev + 1)</code>

// Method 2: JSX expression (for template literals)
<span className="text-cyan-400">{"=>"}</span>

// Method 3: Direct in template literals (works in some contexts)
<span>() =&gt; {}</span>
```

**Solution patterns by context:**

1. **Inline `<code>` elements:**
```jsx
<code className="px-2 py-1 bg-gray-800 rounded">
  setCount(prev =&gt; prev + 1)
</code>
```

2. **Styled code blocks with spans:**
```jsx
<span className="text-white">() </span>
<span className="text-cyan-400">{"=>"}</span>
<span className="text-white"> {}</span>
```

3. **Template literals in code blocks:**
```jsx
<code>{`
  const handleClick = () => {
    setCount(prev => prev + 1);
  };
`}</code>
```

**Best practice:** Use HTML entity encoding (`=&gt;`) for simple inline code, and JSX expressions (`{"=>"}`) for complex styled code blocks.

---

## 🎨 UI/UX Issues

### 3. Low Contrast Code Examples

#### **Issue: Code text is hard to read**

**Problem:** Light backgrounds with default text colors create poor contrast.

**Common scenarios:**
- Inline code snippets
- Error/success examples
- Code comparison blocks

**❌ Wrong:**
```jsx
<code className="px-2 py-1 text-gray-800 bg-gray-100 rounded">
  useEffect(() => {}, [])
</code>

<pre className="p-2 text-xs bg-red-100 rounded">
  <code>{`// Hard to read code`}</code>
</pre>
```

**✅ Correct:**
```jsx
<code className="px-2 py-1 text-white bg-gray-800 rounded">
  useEffect(() => {}, [])
</code>

<pre className="p-2 text-xs bg-gray-900 rounded">
  <code className="text-white">{`// Easy to read code`}</code>
</pre>
```

**Solution pattern:**
1. Use dark backgrounds (`bg-gray-800`, `bg-gray-900`)
2. Use light text (`text-white`)
3. Maintain consistency across all code examples

---

### 4. JSX Encoding Pattern Examples

#### **Real-world examples from Hook Lab codebase:**

**Pattern 1: Inline code with HTML entities**
```jsx
// useState page - inline code snippets
<code className="px-2 py-1 text-white bg-gray-800 rounded">
  setCount(prev =&gt; prev + 1)
</code>

<code className="px-2 py-1 text-white bg-gray-800 rounded">
  setIsToggled(prev =&gt; !prev)
</code>
```

**Pattern 2: Styled code blocks with JSX expressions**
```jsx
// useEffect page - complex styled code
<span className="text-white">() </span>
<span className="text-cyan-400">{"=>"}</span>
<span className="text-white"> {}</span>

// Multi-line example
<span className="text-white">(</span>
<span className="text-yellow-300">prev</span>
<span className="text-white">) </span>
<span className="text-cyan-400">{"=>"}</span>
<span className="text-white"> </span>
<span className="text-yellow-300">prev</span>
<span className="text-white"> + </span>
<span className="text-orange-400">1</span>
```

**Pattern 3: Template literals (works in some contexts)**
```jsx
// Direct template literal - works when not in JSX attribute
<code>{`
  const handleClick = () => {
    setCount(prev => prev + 1);
  };
`}</code>
```

**Pattern 4: Mixed approaches**
```jsx
// Comparison examples - different encoding for different contexts
<code className="px-2 py-1 bg-green-700 rounded">
  setCount(prev =&gt; prev + 1)
</code>
<span className="text-blue-800">vs</span>
<code className="px-2 py-1 bg-red-700 rounded">
  setCount(count + 1)
</code>
```

**When to use each pattern:**
- **HTML entities (`=&gt;`)**: Simple inline code, consistent across all browsers
- **JSX expressions (`{"=>"}`**: Complex styled code blocks, syntax highlighting
- **Template literals**: Multi-line code examples, preserves formatting
- **Mixed approaches**: Comparison examples, different semantic meanings

---

### 5. TypeScript State Patterns

#### **useState Type Safety**

**Pattern analysis from codebase:**

**Simple types (auto-inferred):**
```typescript
const [count, setCount] = useState(0); // number
const [isToggled, setIsToggled] = useState(false); // boolean
const [name, setName] = useState(''); // string
```

**Complex types (explicit typing needed):**
```typescript
// Array types
const [items, setItems] = useState<string[]>(['Item 1', 'Item 2']);

// Object types
const [user, setUser] = useState({ name: 'John', age: 25 }); // auto-inferred

// Union types
const [user, setUser] = useState<User | null>(null);
const [error, setError] = useState<string | null>(null);

// Complex object types
const [data, setData] = useState<{
  message: string;
  timestamp: string;
  id: string;
} | null>(null);
```

**Best practices:**
1. Let TypeScript infer simple types
2. Explicitly type arrays and complex objects
3. Use union types with `null` for optional data
4. Create interfaces for reusable types

---

## 🔧 Development Workflow

### 5. Error Resolution Process

**Step-by-step debugging:**

1. **Identify the error type**
   - TypeScript compilation error
   - ESLint/linting error
   - Runtime error
   - Build process error

2. **Use appropriate tools**
   ```bash
   # TypeScript check
   npx tsc --noEmit
   
   # ESLint check
   npx eslint src/ --ext .ts,.tsx --fix
   
   # Build test
   npm run build
   ```

3. **Fix in order of priority**
   - TypeScript errors (blocking)
   - ESLint errors (blocking in CI)
   - Warnings (non-blocking)
   - UI/UX issues (non-blocking)

4. **Test thoroughly**
   - Run all checks after each fix
   - Test in development mode
   - Test build process

---

## 📝 Code Quality Patterns

### 6. Consistent Styling

**Dark theme code blocks:**
```jsx
<pre className="p-4 overflow-x-auto text-sm bg-gray-900 rounded">
  <code className="text-white">
    {/* Your code here */}
  </code>
</pre>
```

**Inline code snippets:**
```jsx
<code className="px-2 py-1 text-white bg-gray-800 rounded">
  functionName()
</code>
```

**Code comparison blocks:**
```jsx
<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
  <div>
    <p className="mb-2 text-xs font-medium text-red-800">❌ Wrong:</p>
    <pre className="p-2 text-xs bg-gray-900 rounded">
      <code className="text-white">{`// Wrong example`}</code>
    </pre>
  </div>
  <div>
    <p className="mb-2 text-xs font-medium text-green-800">✅ Correct:</p>
    <pre className="p-2 text-xs bg-gray-900 rounded">
      <code className="text-white">{`// Correct example`}</code>
    </pre>
  </div>
</div>
```

---

## 🚀 Quick Reference

### Common Fixes Checklist

**TypeScript Issues:**
- [ ] Replace `any` with specific types
- [ ] Use interfaces for complex objects
- [ ] Add union types for nullable values
- [ ] Check for unused variables

**JSX Encoding Issues:**
- [ ] Use `=&gt;` for arrow functions in inline code
- [ ] Use `{"=>"}` for arrow functions in styled spans
- [ ] Use template literals for complex code blocks
- [ ] Test arrow function rendering in browser

**Contrast Issues:**
- [ ] Dark backgrounds for code blocks
- [ ] White text on dark backgrounds
- [ ] Consistent styling across components

**Build Issues:**
- [ ] Run `npx tsc --noEmit`
- [ ] Run `npx eslint src/ --ext .ts,.tsx --fix`
- [ ] Test with `npm run build`

**Testing Commands:**
```bash
# TypeScript check
npx tsc --noEmit

# ESLint check and fix
npx eslint src/ --ext .ts,.tsx --fix

# Build test
npm run build

# Development server
npm run dev
```

---

## 🔍 Future Prevention

### Pre-commit Checklist

1. **Before committing:**
   - Run TypeScript check
   - Run ESLint check
   - Test build process
   - Check UI contrast

2. **Code review focus:**
   - TypeScript type safety
   - ESLint compliance
   - UI accessibility
   - Consistent patterns

3. **CI/CD considerations:**
   - All builds must pass TypeScript compilation
   - All builds must pass ESLint checks
   - Contrast ratios should meet WCAG standards

---

*This troubleshooting guide should be updated as new issues are discovered and resolved.*