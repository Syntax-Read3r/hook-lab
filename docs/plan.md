
## 📘 Hook Lab Tasks – Phase 1: React Hooks

Each hook below should have its **own page/component**, with:

* A live demo (button click, form, animation, etc.)
* Code comments and explanations
* Edge cases or common gotchas

---

### **1. `useState`**

* Task: Create a counter and a toggle switch.
* Bonus: Show array and object state updates properly.

### **2. `useEffect`**

* Task: Fetch API data on mount and show a cleanup function.
* Bonus: Use dependency array examples.

### **3. `useReducer`**

* Task: Rebuild the counter using reducer logic.
* Bonus: Show form handling with reducer.

### **4. `useRef`**

* Task: Focus an input field on button click.
* Bonus: Track previous value using `.current`.

### **5. `useContext`**

* Task: Global theme switcher (light/dark) using context provider.
* Bonus: Nest a child component deep to prove no prop drilling.

### **6. `useLayoutEffect`**

* Task: Measure DOM size before paint and highlight layout shift.
* Bonus: Compare visually with `useEffect`.

### **7. `useInsertionEffect`**

* Task: Inject styles before layout.
* Bonus: Use a styled component example.

### **8. `useDeferredValue`**

* Task: Create a slow-search input, then defer rendering result.
* Bonus: Show without defer → then with.

### **9. `useImperativeHandle`**

* Task: Build a custom input component with exposed `.focus()` method.
* Bonus: Explain `forwardRef` clearly.

### **10. `useTransition`**

* Task: Simulate a slow state update with transition fallback UI.
* Bonus: Use startTransition for a search list.

### **11. `useSyncExternalStore`**

* Task: Create a simple external store (e.g., window size or custom counter).
* Bonus: Compare with normal state/hooks approach.

### **12. `useId`**

* Task: Show how `useId` prevents ID collisions in form fields.
* Bonus: Multiple components on same page using the hook.

---

## ⚙️ Phase 2: Next.js Concepts

Create a new folder called `/next-features/` to contain demos of Next.js-specific concepts.

---

### **13. File-based Routing**

* Task: Create `pages/about.tsx`, `pages/contact.tsx`.
* Bonus: Link between them using `next/link`.

### **14. Layouts (App Router)**

* Task: Build a persistent navbar and footer using shared layout.

### **15. Metadata**

* Task: Add SEO metadata using `generateMetadata` in layout.

### **16. Loading States**

* Task: Simulate `suspense` and lazy loading for a slow page.

### **17. Server Actions vs useEffect**

* Task: Compare fetching data using server action vs `useEffect`.

### **18. API Routes**

* Task: Add `/api/hello.ts` that returns JSON.
* Bonus: Call it from a React component.

### **19. Auth / Middleware (optional if time)**

* Task: Set up a simple protected route (fake login required).
* Bonus: Middleware to redirect unauthorized access.

---

### ✅ Output

Each task = 1 self-contained page with:

* A short description at the top
* Working demo (clickable/interactable)
* Annotated code (maybe toggleable view)
* “Try it yourself” ideas (bonus)

