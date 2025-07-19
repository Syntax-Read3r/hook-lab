'use client';

import { useState, useRef, useEffect } from 'react';
import Navbar from '@/components/Navbar';

export default function UseRefPage() {
  // Basic ref states
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState('');
  
  // Previous value tracking
  const [count, setCount] = useState(0);
  const prevCountRef = useRef<number>(0);
  
  // Uncontrolled component ref
  const uncontrolledInputRef = useRef<HTMLInputElement>(null);
  const [uncontrolledValue, setUncontrolledValue] = useState('');
  
  // Timer ref for mutable values
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  
  // DOM measurement ref
  const measureRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
  // Scroll position ref
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  
  // Code visibility states
  const [showBasicCode, setShowBasicCode] = useState(false);
  const [showPrevValueCode, setShowPrevValueCode] = useState(false);
  const [showUncontrolledCode, setShowUncontrolledCode] = useState(false);
  const [showMutableCode, setShowMutableCode] = useState(false);
  const [showDOMCode, setShowDOMCode] = useState(false);
  const [showScrollCode, setShowScrollCode] = useState(false);
  
  // Track previous count value
  useEffect(() => {
    prevCountRef.current = count;
  });
  
  // Timer effect
  useEffect(() => {
    if (isTimerRunning) {
      timerRef.current = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isTimerRunning]);
  
  // Focus input function
  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  // Get uncontrolled input value
  const getUncontrolledValue = () => {
    if (uncontrolledInputRef.current) {
      setUncontrolledValue(uncontrolledInputRef.current.value);
    }
  };
  
  // Clear uncontrolled input
  const clearUncontrolledInput = () => {
    if (uncontrolledInputRef.current) {
      uncontrolledInputRef.current.value = '';
      setUncontrolledValue('');
    }
  };
  
  // Measure DOM element
  const measureElement = () => {
    if (measureRef.current) {
      const rect = measureRef.current.getBoundingClientRect();
      setDimensions({
        width: Math.round(rect.width),
        height: Math.round(rect.height)
      });
    }
  };
  
  // Scroll to top
  const scrollToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  // Scroll to bottom
  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ 
        top: scrollRef.current.scrollHeight, 
        behavior: 'smooth' 
      });
    }
  };
  
  // Handle scroll
  const handleScroll = () => {
    if (scrollRef.current) {
      setScrollPosition(scrollRef.current.scrollTop);
    }
  };
  
  // Reset timer
  const resetTimer = () => {
    setTimer(0);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setIsTimerRunning(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="mb-8 text-3xl font-bold text-center text-gray-800">
            useRef Hook Demo
          </h1>
          
          {/* Hook Description */}
          <div className="p-6 mb-8 bg-white rounded-lg shadow-md">
            <h2 className="mb-4 text-xl font-semibold text-gray-700">What is useRef?</h2>
            <p className="mb-4 text-gray-700">
              <code className="px-2 py-1 text-white bg-gray-800 rounded">useRef</code> is a React Hook that returns a mutable ref object 
              whose <code className="px-2 py-1 text-white bg-gray-800 rounded">.current</code> property is initialized to the passed argument. 
              The returned object will persist for the full lifetime of the component.
            </p>
            <div className="p-4 border border-gray-200 rounded bg-gray-50">
              <h3 className="mb-2 text-lg font-medium text-gray-800">Basic Syntax:</h3>
              <pre className="p-3 overflow-x-auto text-green-400 bg-gray-800 rounded">
                <code>{`const ref = useRef(initialValue);

// Common use cases:
const inputRef = useRef(null);          // DOM element reference
const prevValueRef = useRef();          // Store previous values
const timerRef = useRef(null);          // Store mutable values
const countRef = useRef(0);             // Persist values across renders

// Key characteristics:
// 1. .current property is mutable
// 2. Changing .current doesn't trigger re-renders
// 3. Persists across component re-renders
// 4. Perfect for DOM manipulation and storing mutable values`}</code>
              </pre>
            </div>
          </div>
          
          <div className="space-y-8">
            {/* Basic DOM Reference Example */}
            <div className="p-6 bg-white rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-700">Basic DOM Reference Example</h2>
                <button
                  onClick={() => setShowBasicCode(!showBasicCode)}
                  className="px-3 py-1 text-sm text-white transition-colors bg-gray-600 rounded hover:bg-gray-700"
                >
                  {showBasicCode ? 'Hide Code' : 'View Code'}
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Click the button to focus me!"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="flex-1 px-3 py-2 text-gray-800 placeholder-gray-500 border-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    onClick={focusInput}
                    className="px-4 py-2 text-white transition-colors bg-blue-500 rounded hover:bg-blue-600"
                  >
                    Focus Input
                  </button>
                  <button
                    onClick={() => setInputValue('')}
                    className="px-4 py-2 text-white transition-colors bg-red-500 rounded hover:bg-red-600"
                  >
                    Clear
                  </button>
                </div>
                
                <div className="p-3 bg-gray-100 border border-gray-200 rounded">
                  <p className="text-sm text-gray-800">
                    <strong>Input Value:</strong> {inputValue || '(empty)'}
                  </p>
                  <p className="mt-1 text-xs text-gray-700">
                    Click "Focus Input" to programmatically focus the input field using useRef
                  </p>
                </div>
              </div>
              
              <p className="mt-4 text-sm text-gray-700">
                ✅ This example shows the most common useRef pattern: direct DOM manipulation
              </p>
              
              {showBasicCode && (
                <div className="p-4 mt-4 border border-gray-200 rounded bg-gray-50">
                  <h3 className="mb-2 text-sm font-medium text-gray-700">Example Code:</h3>
                  <pre className="p-4 overflow-x-auto text-sm bg-gray-900 rounded">
                    <code>
                      <span className="text-green-400">{"// Create a ref to store the input DOM element"}{"\n"}</span>
                      <span className="text-blue-400">const</span> <span className="text-yellow-300">inputRef</span> = <span className="text-purple-400">useRef</span><span className="text-white">&lt;</span><span className="text-blue-300">HTMLInputElement</span><span className="text-white">&gt;(</span><span className="text-blue-400">null</span><span className="text-white">);</span>{"\n"}
                      <span className="text-blue-400">const</span> <span className="text-yellow-300">[inputValue, setInputValue]</span> = <span className="text-purple-400">useState</span><span className="text-white">(</span><span className="text-yellow-200">''</span><span className="text-white">);</span>{"\n\n"}
                      
                      <span className="text-green-400">{"// Function to focus the input programmatically"}{"\n"}</span>
                      <span className="text-blue-400">const</span> <span className="text-yellow-300">focusInput</span> = <span className="text-white">()</span> <span className="text-cyan-400">{"=>"}</span> <span className="text-white">{"{"}</span>{"\n"}
                      <span className="text-white">  </span><span className="text-blue-400">if</span> <span className="text-white">(</span><span className="text-yellow-300">inputRef</span>.<span className="text-yellow-300">current</span><span className="text-white">)</span> <span className="text-white">{"{"}</span>{"\n"}
                      <span className="text-white">    </span><span className="text-yellow-300">inputRef</span>.<span className="text-yellow-300">current</span>.<span className="text-purple-400">focus</span><span className="text-white">();</span>{"\n"}
                      <span className="text-white">  {"}"}</span>{"\n"}
                      <span className="text-white">{"}"}</span>;{"\n\n"}
                      
                      <span className="text-green-400">{"// JSX: Attach ref to input element"}{"\n"}</span>
                      <span className="text-red-400">{"<input"}</span>{"\n"}
                      <span className="text-green-300">  ref</span>=<span className="text-white">{"{"}</span><span className="text-yellow-300">inputRef</span><span className="text-white">{"}"}</span>{"\n"}
                      <span className="text-green-300">  type</span>=<span className="text-yellow-200">"text"</span>{"\n"}
                      <span className="text-green-300">  value</span>=<span className="text-white">{"{"}</span><span className="text-yellow-300">inputValue</span><span className="text-white">{"}"}</span>{"\n"}
                      <span className="text-green-300">  onChange</span>=<span className="text-white">{"{"}</span>(<span className="text-yellow-300">e</span>) <span className="text-cyan-400">{"=>"}</span> <span className="text-purple-400">setInputValue</span>(<span className="text-yellow-300">e</span>.<span className="text-yellow-300">target</span>.<span className="text-yellow-300">value</span>)<span className="text-white">{"}"}</span>{"\n"}
                      <span className="text-red-400">{"/>"}</span>{"\n\n"}
                      
                      <span className="text-red-400">{"<button"}</span> <span className="text-green-300">onClick</span>=<span className="text-white">{"{"}</span><span className="text-yellow-300">focusInput</span><span className="text-white">{"}"}</span><span className="text-red-400">{">"}</span>{"\n"}
                      <span className="text-white">  Focus Input</span>{"\n"}
                      <span className="text-red-400">{"</button>"}</span>{"\n\n"}
                      
                      <span className="text-green-400">{"// Key points:"}{"\n"}</span>
                      <span className="text-green-400">{"// 1. useRef doesn't trigger re-renders when .current changes"}{"\n"}</span>
                      <span className="text-green-400">{"// 2. Perfect for accessing DOM elements directly"}{"\n"}</span>
                      <span className="text-green-400">{"// 3. Always check if .current exists before using it"}{"\n"}</span>
                      <span className="text-green-400">{"// 4. TypeScript: specify the element type for better type safety"}</span>
                    </code>
                  </pre>
                </div>
              )}
            </div>

            {/* Previous Value Tracking Example */}
            <div className="p-6 bg-white rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-700">Previous Value Tracking Example</h2>
                <button
                  onClick={() => setShowPrevValueCode(!showPrevValueCode)}
                  className="px-3 py-1 text-sm text-white transition-colors bg-gray-600 rounded hover:bg-gray-700"
                >
                  {showPrevValueCode ? 'Hide Code' : 'View Code'}
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setCount(prev => prev + 1)}
                    className="px-4 py-2 text-white transition-colors bg-green-500 rounded hover:bg-green-600"
                  >
                    Increment
                  </button>
                  <button
                    onClick={() => setCount(prev => prev - 1)}
                    className="px-4 py-2 text-white transition-colors bg-red-500 rounded hover:bg-red-600"
                  >
                    Decrement
                  </button>
                  <button
                    onClick={() => setCount(0)}
                    className="px-4 py-2 text-white transition-colors bg-gray-500 rounded hover:bg-gray-600"
                  >
                    Reset
                  </button>
                </div>
                
                <div className="p-4 border border-purple-200 rounded bg-purple-50">
                  <div className="space-y-2">
                    <p className="text-purple-800">
                      <strong>Current Count:</strong> <span className="text-2xl font-bold">{count}</span>
                    </p>
                    <p className="text-purple-700">
                      <strong>Previous Count:</strong> <span className="text-xl">{prevCountRef.current ?? 'undefined'}</span>
                    </p>
                    <p className="text-purple-600">
                      <strong>Difference:</strong> {prevCountRef.current !== undefined ? count - prevCountRef.current : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
              
              <p className="mt-4 text-sm text-gray-700">
                ✅ This example shows how useRef can store previous values without triggering re-renders
              </p>
              
              {showPrevValueCode && (
                <div className="p-4 mt-4 border border-gray-200 rounded bg-gray-50">
                  <h3 className="mb-2 text-sm font-medium text-gray-700">Example Code:</h3>
                  <pre className="p-4 overflow-x-auto text-sm bg-gray-900 rounded">
                    <code>
                      <span className="text-green-400">{"// State for current count"}{"\n"}</span>
                      <span className="text-blue-400">const</span> <span className="text-yellow-300">[count, setCount]</span> = <span className="text-purple-400">useState</span><span className="text-white">(</span><span className="text-orange-400">0</span><span className="text-white">);</span>{"\n"}
                      
                      <span className="text-green-400">{"// Ref to store previous count value"}{"\n"}</span>
                      <span className="text-blue-400">const</span> <span className="text-yellow-300">prevCountRef</span> = <span className="text-purple-400">useRef</span><span className="text-white">&lt;</span><span className="text-blue-300">number</span><span className="text-white">&gt;();</span>{"\n\n"}
                      
                      <span className="text-green-400">{"// Effect to track previous value"}{"\n"}</span>
                      <span className="text-purple-400">useEffect</span><span className="text-white">(</span><span className="text-white">()</span> <span className="text-cyan-400">{"=>"}</span> <span className="text-white">{"{"}</span>{"\n"}
                      <span className="text-white">  </span><span className="text-green-400">{"// Update previous value after render"}{"\n"}</span>
                      <span className="text-white">  </span><span className="text-yellow-300">prevCountRef</span>.<span className="text-yellow-300">current</span> = <span className="text-yellow-300">count</span>;<span className="text-white">{"}"}</span>{"\n"}
                      <span className="text-white">{"}"}</span>); <span className="text-green-400">{"// No dependency array - runs after every render"}{"\n\n"}</span>
                      
                      <span className="text-green-400">{"// Usage in component"}{"\n"}</span>
                      <span className="text-red-400">{"<div>"}</span>{"\n"}
                      <span className="text-white">  </span><span className="text-red-400">{"<p>"}</span><span className="text-white">Current: </span><span className="text-white">{"{"}</span><span className="text-yellow-300">count</span><span className="text-white">{"}"}</span><span className="text-red-400">{"</p>"}</span>{"\n"}
                      <span className="text-white">  </span><span className="text-red-400">{"<p>"}</span><span className="text-white">Previous: </span><span className="text-white">{"{"}</span><span className="text-yellow-300">prevCountRef</span>.<span className="text-yellow-300">current</span> ?? <span className="text-yellow-200">'undefined'</span><span className="text-white">{"}"}</span><span className="text-red-400">{"</p>"}</span>{"\n"}
                      <span className="text-white">  </span><span className="text-red-400">{"<p>"}</span><span className="text-white">Difference: </span><span className="text-white">{"{"}</span><span className="text-yellow-300">count</span> - <span className="text-yellow-300">prevCountRef</span>.<span className="text-yellow-300">current</span><span className="text-white">{"}"}</span><span className="text-red-400">{"</p>"}</span>{"\n"}
                      <span className="text-red-400">{"</div>"}</span>{"\n\n"}
                      
                      <span className="text-green-400">{"// Key points:"}{"\n"}</span>
                      <span className="text-green-400">{"// 1. useEffect without deps runs after every render"}{"\n"}</span>
                      <span className="text-green-400">{"// 2. ref.current stores the value from the previous render"}{"\n"}</span>
                      <span className="text-green-400">{"// 3. Changing ref.current doesn't trigger re-renders"}{"\n"}</span>
                      <span className="text-green-400">{"// 4. Perfect for comparing current vs previous values"}</span>
                    </code>
                  </pre>
                </div>
              )}
            </div>

            {/* Uncontrolled Component Example */}
            <div className="p-6 bg-white rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-700">Uncontrolled Component Example</h2>
                <button
                  onClick={() => setShowUncontrolledCode(!showUncontrolledCode)}
                  className="px-3 py-1 text-sm text-white transition-colors bg-gray-600 rounded hover:bg-gray-700"
                >
                  {showUncontrolledCode ? 'Hide Code' : 'View Code'}
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <input
                    ref={uncontrolledInputRef}
                    type="text"
                    placeholder="Uncontrolled input - type anything!"
                    className="flex-1 px-3 py-2 text-gray-800 placeholder-gray-500 border-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                  <button
                    onClick={getUncontrolledValue}
                    className="px-4 py-2 text-white transition-colors bg-purple-500 rounded hover:bg-purple-600"
                  >
                    Get Value
                  </button>
                  <button
                    onClick={clearUncontrolledInput}
                    className="px-4 py-2 text-white transition-colors bg-red-500 rounded hover:bg-red-600"
                  >
                    Clear
                  </button>
                </div>
                
                <div className="p-3 border border-orange-200 rounded bg-orange-50">
                  <p className="text-sm text-orange-800">
                    <strong>Retrieved Value:</strong> {uncontrolledValue || '(click "Get Value" to retrieve)'}
                  </p>
                  <p className="mt-1 text-xs text-orange-700">
                    This input is uncontrolled - React doesn't manage its state. We use useRef to access its value on demand.
                  </p>
                </div>
                
                <div className="p-3 text-sm text-gray-800 border border-yellow-200 rounded bg-yellow-50">
                  <strong>⚠️ Controlled vs Uncontrolled:</strong>
                  <br />
                  <code className="px-2 py-1 text-green-700 rounded bg-green-50">✅ Controlled: value={"{state}"} onChange={"{setState}"}</code>
                  <br />
                  <code className="px-2 py-1 text-orange-700 rounded bg-orange-50">⚡ Uncontrolled: ref={"{ref}"} (access via ref.current.value)</code>
                </div>
              </div>
              
              <p className="mt-4 text-sm text-gray-700">
                ✅ Uncontrolled components can be useful for forms and integrating with third-party libraries
              </p>
              
              {showUncontrolledCode && (
                <div className="p-4 mt-4 border border-gray-200 rounded bg-gray-50">
                  <h3 className="mb-2 text-sm font-medium text-gray-700">Example Code:</h3>
                  <pre className="p-4 overflow-x-auto text-sm bg-gray-900 rounded">
                    <code>
                      <span className="text-green-400">{"// Ref for uncontrolled input"}{"\n"}</span>
                      <span className="text-blue-400">const</span> <span className="text-yellow-300">uncontrolledInputRef</span> = <span className="text-purple-400">useRef</span><span className="text-white">&lt;</span><span className="text-blue-300">HTMLInputElement</span><span className="text-white">&gt;(</span><span className="text-blue-400">null</span><span className="text-white">);</span>{"\n"}
                      <span className="text-blue-400">const</span> <span className="text-yellow-300">[retrievedValue, setRetrievedValue]</span> = <span className="text-purple-400">useState</span><span className="text-white">(</span><span className="text-yellow-200">''</span><span className="text-white">);</span>{"\n\n"}
                      
                      <span className="text-green-400">{"// Function to get input value on demand"}{"\n"}</span>
                      <span className="text-blue-400">const</span> <span className="text-yellow-300">getUncontrolledValue</span> = <span className="text-white">()</span> <span className="text-cyan-400">{"=>"}</span> <span className="text-white">{"{"}</span>{"\n"}
                      <span className="text-white">  </span><span className="text-blue-400">if</span> <span className="text-white">(</span><span className="text-yellow-300">uncontrolledInputRef</span>.<span className="text-yellow-300">current</span><span className="text-white">)</span> <span className="text-white">{"{"}</span>{"\n"}
                      <span className="text-white">    </span><span className="text-purple-400">setRetrievedValue</span><span className="text-white">(</span><span className="text-yellow-300">uncontrolledInputRef</span>.<span className="text-yellow-300">current</span>.<span className="text-yellow-300">value</span><span className="text-white">);</span>{"\n"}
                      <span className="text-white">  {"}"}</span>{"\n"}
                      <span className="text-white">{"}"}</span>;{"\n\n"}
                      
                      <span className="text-green-400">{"// Function to clear input programmatically"}{"\n"}</span>
                      <span className="text-blue-400">const</span> <span className="text-yellow-300">clearUncontrolledInput</span> = <span className="text-white">()</span> <span className="text-cyan-400">{"=>"}</span> <span className="text-white">{"{"}</span>{"\n"}
                      <span className="text-white">  </span><span className="text-blue-400">if</span> <span className="text-white">(</span><span className="text-yellow-300">uncontrolledInputRef</span>.<span className="text-yellow-300">current</span><span className="text-white">)</span> <span className="text-white">{"{"}</span>{"\n"}
                      <span className="text-white">    </span><span className="text-yellow-300">uncontrolledInputRef</span>.<span className="text-yellow-300">current</span>.<span className="text-yellow-300">value</span> = <span className="text-yellow-200">''</span>;<span className="text-white">{"}"}</span>{"\n"}
                      <span className="text-white">    </span><span className="text-purple-400">setRetrievedValue</span><span className="text-white">(</span><span className="text-yellow-200">''</span><span className="text-white">);</span>{"\n"}
                      <span className="text-white">  {"}"}</span>{"\n"}
                      <span className="text-white">{"}"}</span>;{"\n\n"}
                      
                      <span className="text-green-400">{"// JSX: Uncontrolled input (no value or onChange)"}{"\n"}</span>
                      <span className="text-red-400">{"<input"}</span>{"\n"}
                      <span className="text-green-300">  ref</span>=<span className="text-white">{"{"}</span><span className="text-yellow-300">uncontrolledInputRef</span><span className="text-white">{"}"}</span>{"\n"}
                      <span className="text-green-300">  type</span>=<span className="text-yellow-200">"text"</span>{"\n"}
                      <span className="text-green-300">  placeholder</span>=<span className="text-yellow-200">"Uncontrolled input"</span>{"\n"}
                      <span className="text-red-400">{"/>"}</span>{"\n\n"}
                      
                      <span className="text-green-400">{"// Key differences:"}{"\n"}</span>
                      <span className="text-green-400">{"// Controlled:   value={state} onChange={setState}"}{"\n"}</span>
                      <span className="text-green-400">{"// Uncontrolled: ref={ref} (access via ref.current.value)"}{"\n"}</span>
                      <span className="text-green-400">{"// Use uncontrolled for: forms, third-party integrations"}</span>
                    </code>
                  </pre>
                </div>
              )}
            </div>

            {/* Mutable Values Example */}
            <div className="p-6 bg-white rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-700">Mutable Values Example</h2>
                <button
                  onClick={() => setShowMutableCode(!showMutableCode)}
                  className="px-3 py-1 text-sm text-white transition-colors bg-gray-600 rounded hover:bg-gray-700"
                >
                  {showMutableCode ? 'Hide Code' : 'View Code'}
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-gray-100 border border-gray-200 rounded">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-gray-800">⏱️ {timer}s</p>
                      <p className="text-sm text-gray-600">Timer Status: {isTimerRunning ? '🟢 Running' : '🔴 Stopped'}</p>
                    </div>
                    <div className="space-x-2">
                      <button
                        onClick={() => setIsTimerRunning(!isTimerRunning)}
                        className={`px-4 py-2 rounded transition-colors ${
                          isTimerRunning 
                            ? 'bg-red-500 text-white hover:bg-red-600' 
                            : 'bg-green-500 text-white hover:bg-green-600'
                        }`}
                      >
                        {isTimerRunning ? 'Stop' : 'Start'}
                      </button>
                      <button
                        onClick={resetTimer}
                        className="px-4 py-2 text-white transition-colors bg-gray-500 rounded hover:bg-gray-600"
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 border border-blue-200 rounded bg-blue-50">
                  <p className="text-sm text-blue-800">
                    <strong>Timer ID stored in ref:</strong> {timerRef.current ? 'Active interval' : 'No active interval'}
                  </p>
                  <p className="mt-1 text-xs text-blue-700">
                    The timer ID is stored in a ref to persist across re-renders and enable proper cleanup
                  </p>
                </div>
              </div>
              
              <p className="mt-4 text-sm text-gray-700">
                ✅ This example shows useRef for storing mutable values that don't trigger re-renders
              </p>
              
              {showMutableCode && (
                <div className="p-4 mt-4 border border-gray-200 rounded bg-gray-50">
                  <h3 className="mb-2 text-sm font-medium text-gray-700">Example Code:</h3>
                  <pre className="p-4 overflow-x-auto text-sm bg-gray-900 rounded">
                    <code>
                      <span className="text-green-400">{"// State for timer"}{"\n"}</span>
                      <span className="text-blue-400">const</span> <span className="text-yellow-300">[timer, setTimer]</span> = <span className="text-purple-400">useState</span><span className="text-white">(</span><span className="text-orange-400">0</span><span className="text-white">);</span>{"\n"}
                      <span className="text-blue-400">const</span> <span className="text-yellow-300">[isRunning, setIsRunning]</span> = <span className="text-purple-400">useState</span><span className="text-white">(</span><span className="text-blue-400">false</span><span className="text-white">);</span>{"\n"}
                      
                      <span className="text-green-400">{"// Ref to store timer ID (mutable, doesn't trigger re-renders)"}{"\n"}</span>
                      <span className="text-blue-400">const</span> <span className="text-yellow-300">timerRef</span> = <span className="text-purple-400">useRef</span><span className="text-white">&lt;</span><span className="text-blue-300">NodeJS.Timeout</span> | <span className="text-blue-400">null</span><span className="text-white">&gt;(</span><span className="text-blue-400">null</span><span className="text-white">);</span>{"\n\n"}
                      
                      <span className="text-green-400">{"// Effect to manage timer"}{"\n"}</span>
                      <span className="text-purple-400">useEffect</span><span className="text-white">(</span><span className="text-white">()</span> <span className="text-cyan-400">{"=>"}</span> <span className="text-white">{"{"}</span>{"\n"}
                      <span className="text-white">  </span><span className="text-blue-400">if</span> <span className="text-white">(</span><span className="text-yellow-300">isRunning</span><span className="text-white">)</span> <span className="text-white">{"{"}</span>{"\n"}
                      <span className="text-white">    </span><span className="text-green-400">{"// Store interval ID in ref"}{"\n"}</span>
                      <span className="text-white">    </span><span className="text-yellow-300">timerRef</span>.<span className="text-yellow-300">current</span> = <span className="text-purple-400">setInterval</span><span className="text-white">(</span><span className="text-white">()</span> <span className="text-cyan-400">{"=>"}</span> <span className="text-white">{"{"}</span>{"\n"}
                      <span className="text-white">      </span><span className="text-purple-400">setTimer</span><span className="text-white">(</span><span className="text-yellow-300">prev</span> <span className="text-cyan-400">{"=>"}</span> <span className="text-yellow-300">prev</span> + <span className="text-orange-400">1</span><span className="text-white">);</span>{"\n"}
                      <span className="text-white">    {"}"}</span>, <span className="text-orange-400">1000</span><span className="text-white">);</span>{"\n"}
                      <span className="text-white">  {"}"} </span><span className="text-blue-400">else</span> <span className="text-white">{"{"}</span>{"\n"}
                      <span className="text-white">    </span><span className="text-green-400">{"// Clear interval using stored ID"}{"\n"}</span>
                      <span className="text-white">    </span><span className="text-blue-400">if</span> <span className="text-white">(</span><span className="text-yellow-300">timerRef</span>.<span className="text-yellow-300">current</span><span className="text-white">)</span> <span className="text-white">{"{"}</span>{"\n"}
                      <span className="text-white">      </span><span className="text-purple-400">clearInterval</span><span className="text-white">(</span><span className="text-yellow-300">timerRef</span>.<span className="text-yellow-300">current</span><span className="text-white">);</span>{"\n"}
                      <span className="text-white">    {"}"}</span>{"\n"}
                      <span className="text-white">  {"}"}</span>{"\n"}
                      <span className="text-white">  </span>{"\n"}
                      <span className="text-white">  </span><span className="text-green-400">{"// Cleanup on unmount"}{"\n"}</span>
                      <span className="text-white">  </span><span className="text-blue-400">return</span> <span className="text-white">()</span> <span className="text-cyan-400">{"=>"}</span> <span className="text-white">{"{"}</span>{"\n"}
                      <span className="text-white">    </span><span className="text-blue-400">if</span> <span className="text-white">(</span><span className="text-yellow-300">timerRef</span>.<span className="text-yellow-300">current</span><span className="text-white">)</span> <span className="text-white">{"{"}</span>{"\n"}
                      <span className="text-white">      </span><span className="text-purple-400">clearInterval</span><span className="text-white">(</span><span className="text-yellow-300">timerRef</span>.<span className="text-yellow-300">current</span><span className="text-white">);</span>{"\n"}
                      <span className="text-white">    {"}"}</span>{"\n"}
                      <span className="text-white">  {"}"}</span>;<span className="text-white">{"}"}</span>{"\n"}
                      <span className="text-white">{"}"}</span>, <span className="text-white">[</span><span className="text-yellow-300">isRunning</span><span className="text-white">]</span>);{"\n\n"}
                      
                      <span className="text-green-400">{"// Key benefits of storing timer ID in ref:"}{"\n"}</span>
                      <span className="text-green-400">{"// 1. Persists across re-renders"}{"\n"}</span>
                      <span className="text-green-400">{"// 2. Changing ref doesn't trigger re-renders"}{"\n"}</span>
                      <span className="text-green-400">{"// 3. Can be accessed in cleanup functions"}{"\n"}</span>
                      <span className="text-green-400">{"// 4. Prevents memory leaks from uncleaned intervals"}</span>
                    </code>
                  </pre>
                </div>
              )}
            </div>

            {/* DOM Measurements Example */}
            <div className="p-6 bg-white rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-700">DOM Measurements Example</h2>
                <button
                  onClick={() => setShowDOMCode(!showDOMCode)}
                  className="px-3 py-1 text-sm text-white transition-colors bg-gray-600 rounded hover:bg-gray-700"
                >
                  {showDOMCode ? 'Hide Code' : 'View Code'}
                </button>
              </div>
              
              <div className="space-y-4">
                <div
                  ref={measureRef}
                  className="p-6 bg-gradient-to-r from-blue-100 to-purple-100 border-2 border-dashed border-blue-300 rounded-lg"
                >
                  <h3 className="text-lg font-medium text-blue-800">Measureable Element</h3>
                  <p className="text-blue-700">This element can be measured using useRef and getBoundingClientRect()</p>
                  <p className="mt-2 text-sm text-blue-600">
                    Try resizing your browser window and click "Measure Element" to see how the dimensions change!
                  </p>
                </div>
                
                <div className="flex items-center space-x-4">
                  <button
                    onClick={measureElement}
                    className="px-4 py-2 text-white transition-colors bg-blue-500 rounded hover:bg-blue-600"
                  >
                    Measure Element
                  </button>
                </div>
                
                <div className="p-3 border border-green-200 rounded bg-green-50">
                  <p className="text-sm text-green-800">
                    <strong>Width:</strong> {dimensions.width}px
                  </p>
                  <p className="text-sm text-green-800">
                    <strong>Height:</strong> {dimensions.height}px
                  </p>
                  <p className="mt-1 text-xs text-green-700">
                    Dimensions measured using getBoundingClientRect() via useRef
                  </p>
                </div>
              </div>
              
              <p className="mt-4 text-sm text-gray-700">
                ✅ This example shows how useRef enables direct DOM measurements and manipulation
              </p>
              
              {showDOMCode && (
                <div className="p-4 mt-4 border border-gray-200 rounded bg-gray-50">
                  <h3 className="mb-2 text-sm font-medium text-gray-700">Example Code:</h3>
                  <pre className="p-4 overflow-x-auto text-sm bg-gray-900 rounded">
                    <code>
                      <span className="text-green-400">{"// Ref for DOM element to measure"}{"\n"}</span>
                      <span className="text-blue-400">const</span> <span className="text-yellow-300">measureRef</span> = <span className="text-purple-400">useRef</span><span className="text-white">&lt;</span><span className="text-blue-300">HTMLDivElement</span><span className="text-white">&gt;(</span><span className="text-blue-400">null</span><span className="text-white">);</span>{"\n"}
                      <span className="text-blue-400">const</span> <span className="text-yellow-300">[dimensions, setDimensions]</span> = <span className="text-purple-400">useState</span><span className="text-white">({"{"} </span><span className="text-yellow-300">width</span>: <span className="text-orange-400">0</span>, <span className="text-yellow-300">height</span>: <span className="text-orange-400">0</span> <span className="text-white">{"}"});</span>{"\n\n"}
                      
                      <span className="text-green-400">{"// Function to measure DOM element"}{"\n"}</span>
                      <span className="text-blue-400">const</span> <span className="text-yellow-300">measureElement</span> = <span className="text-white">()</span> <span className="text-cyan-400">{"=>"}</span> <span className="text-white">{"{"}</span>{"\n"}
                      <span className="text-white">  </span><span className="text-blue-400">if</span> <span className="text-white">(</span><span className="text-yellow-300">measureRef</span>.<span className="text-yellow-300">current</span><span className="text-white">)</span> <span className="text-white">{"{"}</span>{"\n"}
                      <span className="text-white">    </span><span className="text-green-400">{"// Get element's bounding rectangle"}{"\n"}</span>
                      <span className="text-white">    </span><span className="text-blue-400">const</span> <span className="text-yellow-300">rect</span> = <span className="text-yellow-300">measureRef</span>.<span className="text-yellow-300">current</span>.<span className="text-purple-400">getBoundingClientRect</span><span className="text-white">();</span>{"\n"}
                      <span className="text-white">    </span><span className="text-purple-400">setDimensions</span><span className="text-white">({"{"}</span>{"\n"}
                      <span className="text-white">      </span><span className="text-yellow-300">width</span>: <span className="text-yellow-300">Math</span>.<span className="text-purple-400">round</span><span className="text-white">(</span><span className="text-yellow-300">rect</span>.<span className="text-yellow-300">width</span><span className="text-white">),</span>{"\n"}
                      <span className="text-white">      </span><span className="text-yellow-300">height</span>: <span className="text-yellow-300">Math</span>.<span className="text-purple-400">round</span><span className="text-white">(</span><span className="text-yellow-300">rect</span>.<span className="text-yellow-300">height</span><span className="text-white">)</span>{"\n"}
                      <span className="text-white">    {"}"});</span>{"\n"}
                      <span className="text-white">  {"}"}</span>{"\n"}
                      <span className="text-white">{"}"}</span>;{"\n\n"}
                      
                      <span className="text-green-400">{"// JSX: Element to measure"}{"\n"}</span>
                      <span className="text-red-400">{"<div"}</span>{"\n"}
                      <span className="text-green-300">  ref</span>=<span className="text-white">{"{"}</span><span className="text-yellow-300">measureRef</span><span className="text-white">{"}"}</span>{"\n"}
                      <span className="text-green-300">  className</span>=<span className="text-yellow-200">"p-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg"</span>{"\n"}
                      <span className="text-red-400">{">"}</span>{"\n"}
                      <span className="text-white">  </span><span className="text-red-400">{"<h3>"}</span><span className="text-white">Measureable Element</span><span className="text-red-400">{"</h3>"}</span>{"\n"}
                      <span className="text-white">  </span><span className="text-red-400">{"<p>"}</span><span className="text-white">This element can be measured using useRef</span><span className="text-red-400">{"</p>"}</span>{"\n"}
                      <span className="text-red-400">{"</div>"}</span>{"\n\n"}
                      
                      <span className="text-red-400">{"<button"}</span> <span className="text-green-300">onClick</span>=<span className="text-white">{"{"}</span><span className="text-yellow-300">measureElement</span><span className="text-white">{"}"}</span><span className="text-red-400">{">"}</span>{"\n"}
                      <span className="text-white">  Measure Element</span>{"\n"}
                      <span className="text-red-400">{"</button>"}</span>{"\n\n"}
                      
                      <span className="text-green-400">{"// Available measurements from getBoundingClientRect():"}{"\n"}</span>
                      <span className="text-green-400">{"// - width, height: element dimensions"}{"\n"}</span>
                      <span className="text-green-400">{"// - x, y: position relative to viewport"}{"\n"}</span>
                      <span className="text-green-400">{"// - top, left, bottom, right: edge positions"}</span>
                    </code>
                  </pre>
                </div>
              )}
            </div>

            {/* Scroll Control Example */}
            <div className="p-6 bg-white rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-700">Scroll Control Example</h2>
                <button
                  onClick={() => setShowScrollCode(!showScrollCode)}
                  className="px-3 py-1 text-sm text-white transition-colors bg-gray-600 rounded hover:bg-gray-700"
                >
                  {showScrollCode ? 'Hide Code' : 'View Code'}
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={scrollToTop}
                    className="px-4 py-2 text-white transition-colors bg-green-500 rounded hover:bg-green-600"
                  >
                    Scroll to Top
                  </button>
                  <button
                    onClick={scrollToBottom}
                    className="px-4 py-2 text-white transition-colors bg-blue-500 rounded hover:bg-blue-600"
                  >
                    Scroll to Bottom
                  </button>
                </div>
                
                <div
                  ref={scrollRef}
                  onScroll={handleScroll}
                  className="h-32 p-4 overflow-y-auto border-2 border-gray-300 rounded-lg bg-gray-50"
                >
                  <div className="h-64 space-y-2">
                    <p className="text-gray-700">📜 This is the beginning of the scrollable content.</p>
                    <p className="text-gray-600">Scroll down to see more content...</p>
                    <p className="text-gray-600">Line 3 of content</p>
                    <p className="text-gray-600">Line 4 of content</p>
                    <p className="text-gray-600">Line 5 of content</p>
                    <p className="text-gray-600">Line 6 of content</p>
                    <p className="text-gray-600">Line 7 of content</p>
                    <p className="text-gray-600">Line 8 of content</p>
                    <p className="text-gray-600">Line 9 of content</p>
                    <p className="text-gray-600">Line 10 of content</p>
                    <p className="text-gray-600">Line 11 of content</p>
                    <p className="text-gray-600">Line 12 of content</p>
                    <p className="text-gray-700">🏁 This is the end of the scrollable content.</p>
                  </div>
                </div>
                
                <div className="p-3 border border-indigo-200 rounded bg-indigo-50">
                  <p className="text-sm text-indigo-800">
                    <strong>Current Scroll Position:</strong> {Math.round(scrollPosition)}px
                  </p>
                  <p className="mt-1 text-xs text-indigo-700">
                    Scroll position is tracked in real-time using useRef and onScroll event
                  </p>
                </div>
              </div>
              
              <p className="mt-4 text-sm text-gray-700">
                ✅ This example shows useRef for programmatic scroll control and position tracking
              </p>
              
              {showScrollCode && (
                <div className="p-4 mt-4 border border-gray-200 rounded bg-gray-50">
                  <h3 className="mb-2 text-sm font-medium text-gray-700">Example Code:</h3>
                  <pre className="p-4 overflow-x-auto text-sm bg-gray-900 rounded">
                    <code>
                      <span className="text-green-400">{"// Ref for scrollable container"}{"\n"}</span>
                      <span className="text-blue-400">const</span> <span className="text-yellow-300">scrollRef</span> = <span className="text-purple-400">useRef</span><span className="text-white">&lt;</span><span className="text-blue-300">HTMLDivElement</span><span className="text-white">&gt;(</span><span className="text-blue-400">null</span><span className="text-white">);</span>{"\n"}
                      <span className="text-blue-400">const</span> <span className="text-yellow-300">[scrollPosition, setScrollPosition]</span> = <span className="text-purple-400">useState</span><span className="text-white">(</span><span className="text-orange-400">0</span><span className="text-white">);</span>{"\n\n"}
                      
                      <span className="text-green-400">{"// Function to scroll to top"}{"\n"}</span>
                      <span className="text-blue-400">const</span> <span className="text-yellow-300">scrollToTop</span> = <span className="text-white">()</span> <span className="text-cyan-400">{"=>"}</span> <span className="text-white">{"{"}</span>{"\n"}
                      <span className="text-white">  </span><span className="text-blue-400">if</span> <span className="text-white">(</span><span className="text-yellow-300">scrollRef</span>.<span className="text-yellow-300">current</span><span className="text-white">)</span> <span className="text-white">{"{"}</span>{"\n"}
                      <span className="text-white">    </span><span className="text-yellow-300">scrollRef</span>.<span className="text-yellow-300">current</span>.<span className="text-purple-400">scrollTo</span><span className="text-white">({"{"} </span><span className="text-yellow-300">top</span>: <span className="text-orange-400">0</span>, <span className="text-yellow-300">behavior</span>: <span className="text-yellow-200">'smooth'</span> <span className="text-white">{"}"});</span>{"\n"}
                      <span className="text-white">  {"}"}</span>{"\n"}
                      <span className="text-white">{"}"}</span>;{"\n\n"}
                      
                      <span className="text-green-400">{"// Function to scroll to bottom"}{"\n"}</span>
                      <span className="text-blue-400">const</span> <span className="text-yellow-300">scrollToBottom</span> = <span className="text-white">()</span> <span className="text-cyan-400">{"=>"}</span> <span className="text-white">{"{"}</span>{"\n"}
                      <span className="text-white">  </span><span className="text-blue-400">if</span> <span className="text-white">(</span><span className="text-yellow-300">scrollRef</span>.<span className="text-yellow-300">current</span><span className="text-white">)</span> <span className="text-white">{"{"}</span>{"\n"}
                      <span className="text-white">    </span><span className="text-yellow-300">scrollRef</span>.<span className="text-yellow-300">current</span>.<span className="text-purple-400">scrollTo</span><span className="text-white">({"{"}</span>{"\n"}
                      <span className="text-white">      </span><span className="text-yellow-300">top</span>: <span className="text-yellow-300">scrollRef</span>.<span className="text-yellow-300">current</span>.<span className="text-yellow-300">scrollHeight</span>,{"\n"}
                      <span className="text-white">      </span><span className="text-yellow-300">behavior</span>: <span className="text-yellow-200">'smooth'</span>{"\n"}
                      <span className="text-white">    {"}"});</span>{"\n"}
                      <span className="text-white">  {"}"}</span>{"\n"}
                      <span className="text-white">{"}"}</span>;{"\n\n"}
                      
                      <span className="text-green-400">{"// Function to track scroll position"}{"\n"}</span>
                      <span className="text-blue-400">const</span> <span className="text-yellow-300">handleScroll</span> = <span className="text-white">()</span> <span className="text-cyan-400">{"=>"}</span> <span className="text-white">{"{"}</span>{"\n"}
                      <span className="text-white">  </span><span className="text-blue-400">if</span> <span className="text-white">(</span><span className="text-yellow-300">scrollRef</span>.<span className="text-yellow-300">current</span><span className="text-white">)</span> <span className="text-white">{"{"}</span>{"\n"}
                      <span className="text-white">    </span><span className="text-purple-400">setScrollPosition</span><span className="text-white">(</span><span className="text-yellow-300">scrollRef</span>.<span className="text-yellow-300">current</span>.<span className="text-yellow-300">scrollTop</span><span className="text-white">);</span>{"\n"}
                      <span className="text-white">  {"}"}</span>{"\n"}
                      <span className="text-white">{"}"}</span>;{"\n\n"}
                      
                      <span className="text-green-400">{"// JSX: Scrollable container"}{"\n"}</span>
                      <span className="text-red-400">{"<div"}</span>{"\n"}
                      <span className="text-green-300">  ref</span>=<span className="text-white">{"{"}</span><span className="text-yellow-300">scrollRef</span><span className="text-white">{"}"}</span>{"\n"}
                      <span className="text-green-300">  onScroll</span>=<span className="text-white">{"{"}</span><span className="text-yellow-300">handleScroll</span><span className="text-white">{"}"}</span>{"\n"}
                      <span className="text-green-300">  className</span>=<span className="text-yellow-200">"h-32 overflow-y-auto border-2 border-gray-300 rounded"</span>{"\n"}
                      <span className="text-red-400">{">"}</span>{"\n"}
                      <span className="text-white">  </span><span className="text-green-400">{"// Scrollable content here"}{"\n"}</span>
                      <span className="text-red-400">{"</div>"}</span>{"\n\n"}
                      
                      <span className="text-green-400">{"// Useful scroll properties:"}{"\n"}</span>
                      <span className="text-green-400">{"// - scrollTop: current scroll position"}{"\n"}</span>
                      <span className="text-green-400">{"// - scrollHeight: total scrollable height"}{"\n"}</span>
                      <span className="text-green-400">{"// - scrollTo(): programmatic scrolling with smooth behavior"}</span>
                    </code>
                  </pre>
                </div>
              )}
            </div>

            {/* Common Gotchas Section */}
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h2 className="mb-4 text-xl font-semibold text-gray-700">⚠️ Common Gotchas & Best Practices</h2>
              
              <div className="space-y-6">
                <div className="p-4 border border-red-200 rounded bg-red-50">
                  <h3 className="mb-2 text-lg font-medium text-red-800">1. Null Checks</h3>
                  <p className="mb-3 text-sm text-red-700">
                    Always check if ref.current exists before using it, especially during initial renders.
                  </p>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <p className="mb-2 text-xs font-medium text-red-800">❌ Wrong:</p>
                      <pre className="p-2 text-xs bg-gray-900 rounded">
                        <code className="text-white">{`const focusInput = () => {
  inputRef.current.focus(); // Error if null!
};`}</code>
                      </pre>
                    </div>
                    <div>
                      <p className="mb-2 text-xs font-medium text-green-800">✅ Correct:</p>
                      <pre className="p-2 text-xs bg-gray-900 rounded">
                        <code className="text-white">{`const focusInput = () => {
  if (inputRef.current) {
    inputRef.current.focus();
  }
};`}</code>
                      </pre>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border border-red-200 rounded bg-red-50">
                  <h3 className="mb-2 text-lg font-medium text-red-800">2. Not for State</h3>
                  <p className="mb-3 text-sm text-red-700">
                    Don't use useRef for values that should trigger re-renders. Use useState instead.
                  </p>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <p className="mb-2 text-xs font-medium text-red-800">❌ Wrong:</p>
                      <pre className="p-2 text-xs bg-gray-900 rounded">
                        <code className="text-white">{`const countRef = useRef(0);
const increment = () => {
  countRef.current += 1; // No re-render!
};
return <div>{countRef.current}</div>;`}</code>
                      </pre>
                    </div>
                    <div>
                      <p className="mb-2 text-xs font-medium text-green-800">✅ Correct:</p>
                      <pre className="p-2 text-xs bg-gray-900 rounded">
                        <code className="text-white">{`const [count, setCount] = useState(0);
const increment = () => {
  setCount(prev => prev + 1); // Triggers re-render
};
return <div>{count}</div>;`}</code>
                      </pre>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border border-red-200 rounded bg-red-50">
                  <h3 className="mb-2 text-lg font-medium text-red-800">3. Cleanup with Refs</h3>
                  <p className="mb-3 text-sm text-red-700">
                    Always clean up timers, intervals, and subscriptions stored in refs.
                  </p>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <p className="mb-2 text-xs font-medium text-red-800">❌ Wrong:</p>
                      <pre className="p-2 text-xs bg-gray-900 rounded">
                        <code className="text-white">{`useEffect(() => {
  timerRef.current = setInterval(fn, 1000);
  // No cleanup!
}, []);`}</code>
                      </pre>
                    </div>
                    <div>
                      <p className="mb-2 text-xs font-medium text-green-800">✅ Correct:</p>
                      <pre className="p-2 text-xs bg-gray-900 rounded">
                        <code className="text-white">{`useEffect(() => {
  timerRef.current = setInterval(fn, 1000);
  
  return () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };
}, []);`}</code>
                      </pre>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border border-blue-200 rounded bg-blue-50">
                  <h3 className="mb-2 text-lg font-medium text-blue-800">💡 Best Practices</h3>
                  <ul className="text-sm text-blue-700 list-disc list-inside space-y-1">
                    <li>Use useRef for DOM access, storing mutable values, and previous values</li>
                    <li>Always check if ref.current exists before using it</li>
                    <li>Don't use useRef for values that should trigger re-renders</li>
                    <li>Clean up timers, intervals, and subscriptions stored in refs</li>
                    <li>Use TypeScript to specify the element type for better type safety</li>
                    <li>Remember: changing .current doesn't trigger re-renders</li>
                    <li>Prefer controlled components over uncontrolled when possible</li>
                  </ul>
                </div>
                
                <div className="p-4 border border-green-200 rounded bg-green-50">
                  <h3 className="mb-2 text-lg font-medium text-green-800">🎯 When to Use useRef</h3>
                  <div className="text-sm text-green-700 space-y-2">
                    <p><strong>Perfect for:</strong></p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Accessing DOM elements (focus, scroll, measure)</li>
                      <li>Storing timer IDs, subscription IDs</li>
                      <li>Keeping track of previous values</li>
                      <li>Storing mutable values that don't affect rendering</li>
                      <li>Integrating with third-party libraries</li>
                    </ul>
                    <p className="mt-3"><strong>Not good for:</strong></p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Values that should trigger re-renders (use useState)</li>
                      <li>Values that depend on props or state (use useMemo/useCallback)</li>
                      <li>Values that need to be in dependency arrays</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}