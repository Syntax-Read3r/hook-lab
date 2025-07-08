'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';

export default function UseEffectPage() {
  const [count, setCount] = useState(0);
  const [pageTitle, setPageTitle] = useState('useEffect Demo');
  
  // Data fetching states
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Timer states
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  
  // Window resize state
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [isClient, setIsClient] = useState(false);
  
  // Local storage state
  const [savedText, setSavedText] = useState('');
  
  // Code visibility states
  const [showBasicCode, setShowBasicCode] = useState(false);
  const [showMultiDepsCode, setShowMultiDepsCode] = useState(false);
  const [showFetchCode, setShowFetchCode] = useState(false);
  const [showTimerCode, setShowTimerCode] = useState(false);
  const [showEventCode, setShowEventCode] = useState(false);
  const [showStorageCode, setShowStorageCode] = useState(false);
  
  // Client-side hydration effect
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Basic useEffect with dependency array
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.title = `${pageTitle} - Count: ${count}`;
    }
  }, [count, pageTitle]);

  // useEffect with cleanup - Timer management
  useEffect(() => {
    let interval;
    
    if (isRunning) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning]);

  // useEffect for window resize listener (cleanup example)
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    if (typeof window !== 'undefined') {
      // Set initial size
      handleResize();
      
      // Add event listener
      window.addEventListener('resize', handleResize);
      
      // Cleanup: remove event listener
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  // useEffect for local storage (persistence)
  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('savedText');
      if (saved) {
        setSavedText(saved);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('savedText', savedText);
    }
  }, [savedText]);

  // Data fetching function
  const fetchUserData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate random success/failure
      if (Math.random() > 0.3) {
        setUser({
          id: Date.now(),
          name: 'John Doe',
          email: 'john@example.com',
          lastUpdated: new Date().toLocaleTimeString()
        });
      } else {
        throw new Error('Failed to fetch user data');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Reset timer
  const resetTimer = () => {
    setTimer(0);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
            useEffect Hook Demo
          </h1>
          
          {/* Hook Description */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">What is useEffect?</h2>
            <p className="text-gray-700 mb-4">
              <code className="bg-gray-100 px-2 py-1 rounded text-gray-800">useEffect</code> is a React Hook that lets you perform side effects in functional components. 
              It serves the same purpose as componentDidMount, componentDidUpdate, and componentWillUnmount combined in React class components.
            </p>
            <div className="bg-gray-50 p-4 rounded border border-gray-200">
              <h3 className="text-lg font-medium mb-2 text-gray-800">Basic Syntax:</h3>
              <pre className="bg-gray-800 text-green-400 p-3 rounded overflow-x-auto">
                <code>{`useEffect(() => {
  // Side effect code here
  console.log('Effect runs');
  
  // Optional cleanup function
  return () => {
    console.log('Cleanup runs');
  };
}, [dependencies]); // Optional dependency array

// Common patterns:
useEffect(() => {}); // Runs on every render
useEffect(() => {}, []); // Runs only once (mount)
useEffect(() => {}, [count]); // Runs when count changes`}</code>
              </pre>
            </div>
          </div>
          
          <div className="space-y-8">
            {/* Basic useEffect Example */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-700">Basic useEffect Example</h2>
                <button
                  onClick={() => setShowBasicCode(!showBasicCode)}
                  className="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700 transition-colors"
                >
                  {showBasicCode ? 'Hide Code' : 'View Code'}
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setCount(prev => prev + 1)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                  >
                    Increment Count
                  </button>
                  <span className="text-2xl font-bold text-gray-800">{count}</span>
                  <button
                    onClick={() => setCount(0)}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                  >
                    Reset
                  </button>
                </div>
                
                <div className="bg-gray-100 p-3 rounded border border-gray-200">
                  <p className="text-gray-800 text-sm">
                    <strong>Current page title:</strong> {isClient && typeof document !== 'undefined' ? document.title : 'Loading...'}
                  </p>
                  <p className="text-gray-700 text-xs mt-1">
                    Check the browser tab title - it updates automatically when count changes!
                  </p>
                </div>
              </div>
              
              <p className="text-sm text-gray-700 mt-4">
                 This example shows useEffect with dependency array: <code className="bg-gray-100 px-2 py-1 rounded text-gray-800">useEffect(() => {}, [count])</code>
              </p>
              
              {showBasicCode && (
                <div className="mt-4 bg-gray-50 p-4 rounded border border-gray-200">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Example Code:</h3>
                  <pre className="bg-gray-900 p-4 rounded overflow-x-auto text-sm">
                    <code>
                      <span className="text-green-400">// State for count and page title</span>{"\n"}
                      <span className="text-blue-400">const</span> <span className="text-yellow-300">[count, setCount]</span> = <span className="text-purple-400">useState</span>(<span className="text-orange-400">0</span>);{"\n"}
                      <span className="text-blue-400">const</span> <span className="text-yellow-300">[pageTitle, setPageTitle]</span> = <span className="text-purple-400">useState</span>(<span className="text-yellow-200">'useEffect Demo'</span>);{"\n"}
                      {"\n"}
                      <span className="text-green-400">// useEffect with dependency array</span>{"\n"}
                      <span className="text-purple-400">useEffect</span>(<span className="text-white">()</span> <span className="text-cyan-400">=></span> <span className="text-white">{"{"}</span>{"\n"}
                      <span className="text-white">  </span><span className="text-blue-400">if</span> <span className="text-white">(</span><span className="text-blue-400">typeof</span> <span className="text-yellow-300">document</span> <span className="text-cyan-400">!==</span> <span className="text-yellow-200">'undefined'</span><span className="text-white">)</span> <span className="text-white">{"{"}</span>{"\n"}
                      <span className="text-white">    </span><span className="text-yellow-300">document</span>.<span className="text-yellow-300">title</span> = <span className="text-yellow-200">`${"{"}</span><span className="text-yellow-300">pageTitle</span><span className="text-yellow-200">{"}"} - Count: ${"{"}</span><span className="text-yellow-300">count</span><span className="text-yellow-200">{"}"}`</span>;{"\n"}
                      <span className="text-white">  {"}"}</span>{"\n"}
                      <span className="text-white">{"}"}</span>, <span className="text-white">[</span><span className="text-yellow-300">count</span>, <span className="text-yellow-300">pageTitle</span><span className="text-white">]</span>);{"\n"}
                      {"\n"}
                      <span className="text-green-400">// This effect runs whenever count or pageTitle changes</span>{"\n"}
                      <span className="text-green-400">// The dependency array [count, pageTitle] tells React to re-run</span>{"\n"}
                      <span className="text-green-400">// this effect only when these values change</span>
                    </code>
                  </pre>
                </div>
              )}
            </div>

            {/* Title Input Example */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-700">Multiple Dependencies Example</h2>
                <button
                  onClick={() => setShowMultiDepsCode(!showMultiDepsCode)}
                  className="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700 transition-colors"
                >
                  {showMultiDepsCode ? 'Hide Code' : 'View Code'}
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <input
                    type="text"
                    placeholder="Enter page title"
                    value={pageTitle}
                    onChange={(e) => setPageTitle(e.target.value)}
                    className="px-3 py-2 border-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 placeholder-gray-500"
                  />
                  <button
                    onClick={() => setPageTitle('useEffect Demo')}
                    className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
                  >
                    Reset Title
                  </button>
                </div>
                
                <div className="bg-purple-50 p-3 rounded border border-purple-200">
                  <p className="text-purple-800 text-sm">
                    <strong>Current Title:</strong> {pageTitle}
                  </p>
                  <p className="text-purple-700 text-xs mt-1">
                    This effect depends on both 'count' and 'pageTitle' variables
                  </p>
                </div>
              </div>
              
              <p className="text-sm text-gray-700 mt-4">
                 This example shows useEffect with multiple dependencies: <code className="bg-gray-100 px-2 py-1 rounded text-gray-800">useEffect(() => {}, [count, pageTitle])</code>
              </p>
              
              {showMultiDepsCode && (
                <div className="mt-4 bg-gray-50 p-4 rounded border border-gray-200">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Example Code:</h3>
                  <pre className="bg-gray-900 p-4 rounded overflow-x-auto text-sm">
                    <code>
                      <span className="text-green-400">// Same useEffect as previous example</span>{"\n"}
                      <span className="text-purple-400">useEffect</span>(<span className="text-white">()</span> <span className="text-cyan-400">=></span> <span className="text-white">{"{"}</span>{"\n"}
                      <span className="text-white">  </span><span className="text-blue-400">if</span> <span className="text-white">(</span><span className="text-blue-400">typeof</span> <span className="text-yellow-300">document</span> <span className="text-cyan-400">!==</span> <span className="text-yellow-200">'undefined'</span><span className="text-white">)</span> <span className="text-white">{"{"}</span>{"\n"}
                      <span className="text-white">    </span><span className="text-yellow-300">document</span>.<span className="text-yellow-300">title</span> = <span className="text-yellow-200">`${"{"}</span><span className="text-yellow-300">pageTitle</span><span className="text-yellow-200">{"}"} - Count: ${"{"}</span><span className="text-yellow-300">count</span><span className="text-yellow-200">{"}"}`</span>;{"\n"}
                      <span className="text-white">  {"}"}</span>{"\n"}
                      <span className="text-white">{"}"}</span>, <span className="text-white">[</span><span className="text-yellow-300">count</span>, <span className="text-yellow-300">pageTitle</span><span className="text-white">]</span>);{"\n"}
                      {"\n"}
                      <span className="text-green-400">// Input handler for page title</span>{"\n"}
                      <span className="text-red-400">{"<input"}</span>{"\n"}
                      <span className="text-green-300">  type</span>=<span className="text-yellow-200">"text"</span>{"\n"}
                      <span className="text-green-300">  value</span>=<span className="text-white">{"{"}</span><span className="text-yellow-300">pageTitle</span><span className="text-white">{"}"}</span>{"\n"}
                      <span className="text-green-300">  onChange</span>=<span className="text-white">{"{"}</span>(<span className="text-yellow-300">e</span>) <span className="text-cyan-400">=></span> <span className="text-purple-400">setPageTitle</span>(<span className="text-yellow-300">e</span>.<span className="text-yellow-300">target</span>.<span className="text-yellow-300">value</span>)<span className="text-white">{"}"}</span>{"\n"}
                      <span className="text-red-400">{"/>"}</span>{"\n"}
                      {"\n"}
                      <span className="text-green-400">// Effect will run whenever EITHER count OR pageTitle changes</span>
                    </code>
                  </pre>
                </div>
              )}
            </div>

            {/* Data Fetching Example */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-700">Data Fetching Example</h2>
                <button
                  onClick={() => setShowFetchCode(!showFetchCode)}
                  className="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700 transition-colors"
                >
                  {showFetchCode ? 'Hide Code' : 'View Code'}
                </button>
              </div>
              
              <div className="space-y-4">
                <button
                  onClick={fetchUserData}
                  disabled={loading}
                  className={`px-4 py-2 rounded transition-colors ${
                    loading 
                      ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                      : 'bg-green-500 text-white hover:bg-green-600'
                  }`}
                >
                  {loading ? 'Loading...' : 'Fetch User Data'}
                </button>
                
                {error && (
                  <div className="bg-red-50 border border-red-200 p-3 rounded">
                    <p className="text-red-700">❌ Error: {error}</p>
                  </div>
                )}
                
                {user && (
                  <div className="bg-green-50 border border-green-200 p-3 rounded">
                    <h3 className="text-green-800 font-medium">✅ User Data:</h3>
                    <p className="text-green-700">ID: {user.id}</p>
                    <p className="text-green-700">Name: {user.name}</p>
                    <p className="text-green-700">Email: {user.email}</p>
                    <p className="text-green-700">Last Updated: {user.lastUpdated}</p>
                  </div>
                )}
              </div>
              
              <p className="text-sm text-gray-700 mt-4">
                 This example shows async data fetching with loading and error states
              </p>
              
              {showFetchCode && (
                <div className="mt-4 bg-gray-50 p-4 rounded border border-gray-200">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Example Code:</h3>
                  <pre className="bg-gray-900 p-4 rounded overflow-x-auto text-sm">
                    <code>
                      <span className="text-green-400">// State for data fetching</span>{"\n"}
                      <span className="text-blue-400">const</span> <span className="text-yellow-300">[user, setUser]</span> = <span className="text-purple-400">useState</span>(<span className="text-blue-400">null</span>);{"\n"}
                      <span className="text-blue-400">const</span> <span className="text-yellow-300">[loading, setLoading]</span> = <span className="text-purple-400">useState</span>(<span className="text-blue-400">false</span>);{"\n"}
                      <span className="text-blue-400">const</span> <span className="text-yellow-300">[error, setError]</span> = <span className="text-purple-400">useState</span>(<span className="text-blue-400">null</span>);{"\n"}
                      {"\n"}
                      <span className="text-green-400">// Async function to fetch user data</span>{"\n"}
                      <span className="text-blue-400">const</span> <span className="text-yellow-300">fetchUserData</span> = <span className="text-blue-400">async</span> <span className="text-white">()</span> <span className="text-cyan-400">=></span> <span className="text-white">{"{"}</span>{"\n"}
                      <span className="text-white">  </span><span className="text-purple-400">setLoading</span>(<span className="text-blue-400">true</span>);{"\n"}
                      <span className="text-white">  </span><span className="text-purple-400">setError</span>(<span className="text-blue-400">null</span>);{"\n"}
                      <span className="text-white">  </span>{"\n"}
                      <span className="text-white">  </span><span className="text-blue-400">try</span> <span className="text-white">{"{"}</span>{"\n"}
                      <span className="text-white">    </span><span className="text-green-400">// Simulate API call</span>{"\n"}
                      <span className="text-white">    </span><span className="text-blue-400">await</span> <span className="text-blue-400">new</span> <span className="text-purple-400">Promise</span>(<span className="text-yellow-300">resolve</span> <span className="text-cyan-400">=></span> <span className="text-purple-400">setTimeout</span>(<span className="text-yellow-300">resolve</span>, <span className="text-orange-400">1000</span>));{"\n"}
                      <span className="text-white">    </span>{"\n"}
                      <span className="text-white">    </span><span className="text-blue-400">if</span> <span className="text-white">(</span><span className="text-yellow-300">Math</span>.<span className="text-purple-400">random</span>() <span className="text-cyan-400">></span> <span className="text-orange-400">0.3</span><span className="text-white">)</span> <span className="text-white">{"{"}</span>{"\n"}
                      <span className="text-white">      </span><span className="text-purple-400">setUser</span>(<span className="text-white">{"{"}</span>{"\n"}
                      <span className="text-white">        </span><span className="text-yellow-300">id</span>: <span className="text-yellow-300">Date</span>.<span className="text-purple-400">now</span>(),{"\n"}
                      <span className="text-white">        </span><span className="text-yellow-300">name</span>: <span className="text-yellow-200">'John Doe'</span>,{"\n"}
                      <span className="text-white">        </span><span className="text-yellow-300">email</span>: <span className="text-yellow-200">'john@example.com'</span>{"\n"}
                      <span className="text-white">      {"}"}</span>);{"\n"}
                      <span className="text-white">    {"}"} </span><span className="text-blue-400">else</span> <span className="text-white">{"{"}</span>{"\n"}
                      <span className="text-white">      </span><span className="text-blue-400">throw</span> <span className="text-blue-400">new</span> <span className="text-purple-400">Error</span>(<span className="text-yellow-200">'Failed to fetch user data'</span>);{"\n"}
                      <span className="text-white">    {"}"}</span>{"\n"}
                      <span className="text-white">  {"}"} </span><span className="text-blue-400">catch</span> <span className="text-white">(</span><span className="text-yellow-300">err</span><span className="text-white">)</span> <span className="text-white">{"{"}</span>{"\n"}
                      <span className="text-white">    </span><span className="text-purple-400">setError</span>(<span className="text-yellow-300">err</span>.<span className="text-yellow-300">message</span>);{"\n"}
                      <span className="text-white">  {"}"} </span><span className="text-blue-400">finally</span> <span className="text-white">{"{"}</span>{"\n"}
                      <span className="text-white">    </span><span className="text-purple-400">setLoading</span>(<span className="text-blue-400">false</span>);{"\n"}
                      <span className="text-white">  {"}"}</span>{"\n"}
                      <span className="text-white">{"}"}</span>;{"\n"}
                      {"\n"}
                      <span className="text-green-400">// No useEffect needed - this is manual fetching!</span>{"\n"}
                      <span className="text-green-400">// For automatic fetching on mount, you'd use:</span>{"\n"}
                      <span className="text-green-400">// useEffect(() => {"{"}fetchUserData();{"}"}, []);</span>
                    </code>
                  </pre>
                </div>
              )}
            </div>

            {/* Timer & Cleanup Example */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">Timer & Cleanup Example</h2>
              
              <div className="space-y-4">
                <div className="bg-gray-100 p-4 rounded border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-gray-800">⏱️ {timer}s</p>
                      <p className="text-gray-600 text-sm">Timer Status: {isRunning ? '🟢 Running' : '🔴 Stopped'}</p>
                    </div>
                    <div className="space-x-2">
                      <button
                        onClick={() => setIsRunning(!isRunning)}
                        className={`px-4 py-2 rounded transition-colors ${
                          isRunning 
                            ? 'bg-red-500 text-white hover:bg-red-600' 
                            : 'bg-green-500 text-white hover:bg-green-600'
                        }`}
                      >
                        {isRunning ? 'Stop' : 'Start'}
                      </button>
                      <button
                        onClick={resetTimer}
                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-gray-700 mt-4">
                ✅ This example shows useEffect with cleanup functions to prevent memory leaks
              </p>
            </div>

            {/* Event Listener Example */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">Event Listener Example</h2>
              
              <div className="space-y-4">
                <div className="bg-blue-50 p-3 rounded border border-blue-200">
                  <p className="text-blue-800 text-sm">
                    <strong>Window Size:</strong> {isClient ? `${windowSize.width} × ${windowSize.height}px` : 'Loading...'}
                  </p>
                  <p className="text-blue-700 text-xs mt-1">
                    Try resizing your browser window to see this update in real-time!
                  </p>
                </div>
              </div>
              
              <p className="text-sm text-gray-700 mt-4">
                ✅ This example shows useEffect for event listeners with proper cleanup
              </p>
            </div>

            {/* Local Storage Example */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">Local Storage Example</h2>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <input
                    type="text"
                    placeholder="Type something..."
                    value={savedText}
                    onChange={(e) => setSavedText(e.target.value)}
                    className="flex-1 px-3 py-2 border-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 placeholder-gray-500"
                  />
                  <button
                    onClick={() => setSavedText('')}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                  >
                    Clear
                  </button>
                </div>
                
                <div className="bg-yellow-50 p-3 rounded border border-yellow-200">
                  <p className="text-yellow-800 text-sm">
                    <strong>Saved Text:</strong> {savedText || '(empty)'}
                  </p>
                  <p className="text-yellow-700 text-xs mt-1">
                    This text is automatically saved to localStorage and will persist across page refreshes!
                  </p>
                </div>
              </div>
              
              <p className="text-sm text-gray-700 mt-4">
                ✅ This example shows useEffect for data persistence with localStorage
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}