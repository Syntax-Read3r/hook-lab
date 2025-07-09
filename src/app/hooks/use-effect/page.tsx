'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';

interface User {
  id: number;
  name: string;
  email: string;
  lastUpdated: string;
}

export default function UseEffectPage() {
  const [count, setCount] = useState(0);
  const [pageTitle, setPageTitle] = useState('useEffect Demo');
  
  // Data fetching states
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
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
  const [showAutoFetchCode, setShowAutoFetchCode] = useState(false);
  const [showTimerCode, setShowTimerCode] = useState(false);
  const [showEventCode, setShowEventCode] = useState(false);
  const [showStorageCode, setShowStorageCode] = useState(false);
  
  // Auto-fetch data states
  const [autoFetchedData, setAutoFetchedData] = useState<any>(null);
  const [autoFetchLoading, setAutoFetchLoading] = useState(true);
  const [autoFetchError, setAutoFetchError] = useState<string | null>(null);
  
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
    let interval: NodeJS.Timeout | null = null;
    
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

  // Auto-fetch data on mount (empty dependency array)
  useEffect(() => {
    const fetchData = async () => {
      try {
        setAutoFetchLoading(true);
        setAutoFetchError(null);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Simulate data
        const data = {
          message: "Data automatically fetched on component mount!",
          timestamp: new Date().toISOString(),
          id: Math.random().toString(36).substring(7)
        };
        
        setAutoFetchedData(data);
      } catch (error) {
        setAutoFetchError('Failed to fetch data');
      } finally {
        setAutoFetchLoading(false);
      }
    };
    
    fetchData();
  }, []); // Empty dependency array - runs only once on mount

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
      setError(err instanceof Error ? err.message : 'An error occurred');
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
          <h1 className="mb-8 text-3xl font-bold text-center text-gray-800">
            useEffect Hook Demo
          </h1>
          
          {/* Hook Description */}
          <div className="p-6 mb-8 bg-white rounded-lg shadow-md">
            <h2 className="mb-4 text-xl font-semibold text-gray-700">What is useEffect?</h2>
            <p className="mb-4 text-gray-700">
              <code className="px-2 py-1 text-white bg-gray-800 rounded">useEffect</code> is a React Hook that lets you perform side effects in functional components. 
              It serves the same purpose as componentDidMount, componentDidUpdate, and componentWillUnmount combined in React class components.
            </p>
            <div className="p-4 border border-gray-200 rounded bg-gray-50">
              <h3 className="mb-2 text-lg font-medium text-gray-800">Basic Syntax:</h3>
              <pre className="p-3 overflow-x-auto text-green-400 bg-gray-800 rounded">
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
            <div className="p-6 bg-white rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-700">Basic useEffect Example</h2>
                <button
                  onClick={() => setShowBasicCode(!showBasicCode)}
                  className="px-3 py-1 text-sm text-white transition-colors bg-gray-600 rounded hover:bg-gray-700"
                >
                  {showBasicCode ? 'Hide Code' : 'View Code'}
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setCount(prev => prev + 1)}
                    className="px-4 py-2 text-white transition-colors bg-blue-500 rounded hover:bg-blue-600"
                  >
                    Increment Count
                  </button>
                  <span className="text-2xl font-bold text-gray-800">{count}</span>
                  <button
                    onClick={() => setCount(0)}
                    className="px-4 py-2 text-white transition-colors bg-gray-500 rounded hover:bg-gray-600"
                  >
                    Reset
                  </button>
                </div>
                
                <div className="p-3 bg-gray-100 border border-gray-200 rounded">
                  <p className="text-sm text-gray-800">
                    <strong>Current page title:</strong> {isClient && typeof document !== 'undefined' ? document.title : 'Loading...'}
                  </p>
                  <p className="mt-1 text-xs text-gray-700">
                    Check the browser tab title - it updates automatically when count changes!
                  </p>
                </div>
              </div>
              
              <p className="mt-4 text-sm text-gray-700">
                 This example shows useEffect with dependency array: <code className="px-2 py-1 text-white bg-gray-800 rounded">
  useEffect(() ={">"} {"{}"}, [count])
</code>

              </p>
              
              {showBasicCode && (
                <div className="p-4 mt-4 border border-gray-200 rounded bg-gray-50">
                  <h3 className="mb-2 text-sm font-medium text-gray-700">Example Code:</h3>
                  <pre className="p-4 overflow-x-auto text-sm bg-gray-900 rounded">
                    <code>
                      <span className="text-green-400">{"// State for count and page title"}{"\n"}</span>
                      <span className="text-blue-400">const</span>{" "}
                      <span className="text-yellow-300">[count, setCount]</span>{" "}
                      = <span className="text-purple-400">useState</span>
                      <span className="text-white">(</span>
                      <span className="text-orange-400">0</span>
                      <span className="text-white">)</span>;{"\n"}

                      <span className="text-blue-400">const</span>{" "}
                      <span className="text-yellow-300">[pageTitle, setPageTitle]</span>{" "}
                      = <span className="text-purple-400">useState</span>
                      <span className="text-white">(</span>
                      <span className="text-yellow-200">'useEffect Demo'</span>
                      <span className="text-white">)</span>;{"\n\n"}

                      <span className="text-green-400">{"// useEffect with dependency array"}{"\n"}</span>
                      <span className="text-purple-400">useEffect</span>
                      <span className="text-white">(</span>
                      <span className="text-white">()</span>{" "}
                      <span className="text-cyan-400">{"=>"}</span>{" "}
                      <span className="text-white">{"{"}</span>{"\n"}

                      <span className="text-white">  </span>
                      <span className="text-blue-400">if</span>{" "}
                      <span className="text-white">(</span>
                      <span className="text-blue-400">typeof</span>{" "}
                      <span className="text-yellow-300">document</span>{" "}
                      <span className="text-cyan-400">!==</span>{" "}
                      <span className="text-yellow-200">'undefined'</span>
                      <span className="text-white">)</span>{" "}
                      <span className="text-white">{"{"}</span>{"\n"}

                      <span className="text-white">    </span>
                      <span className="text-yellow-300">document</span>.
                      <span className="text-yellow-300">title</span>{" "}
                      = <span className="text-yellow-200">`</span>
                      <span className="text-yellow-200">${"{pageTitle}"} - Count: ${"{count}"}`</span>;{"\n"}

                      <span className="text-white">  {"}"}</span>{"\n"}
                      <span className="text-white">{"}"}</span>,
                      <span className="text-white"> [</span>
                      <span className="text-yellow-300">count</span>,{" "}
                      <span className="text-yellow-300">pageTitle</span>
                      <span className="text-white">]</span>
                      <span className="text-white">)</span>;{"\n\n"}

                      <span className="text-green-400">{"// This effect runs whenever count or pageTitle changes"}{"\n"}</span>
                      <span className="text-green-400">{"// The dependency array [count, pageTitle] tells React to re-run"}{"\n"}</span>
                      <span className="text-green-400">{"// this effect only when these values change"}</span>
                    </code>

                  </pre>
                </div>
              )}
            </div>

            {/* Title Input Example */}
            <div className="p-6 bg-white rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-700">Multiple Dependencies Example</h2>
                <button
                  onClick={() => setShowMultiDepsCode(!showMultiDepsCode)}
                  className="px-3 py-1 text-sm text-white transition-colors bg-gray-600 rounded hover:bg-gray-700"
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
                    className="px-3 py-2 text-gray-800 placeholder-gray-500 border-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    onClick={() => setPageTitle('useEffect Demo')}
                    className="px-4 py-2 text-white transition-colors bg-purple-500 rounded hover:bg-purple-600"
                  >
                    Reset Title
                  </button>
                </div>
                
                <div className="p-3 border border-purple-200 rounded bg-purple-50">
                  <p className="text-sm text-purple-800">
                    <strong>Current Title:</strong> {pageTitle}
                  </p>
                  <p className="mt-1 text-xs text-purple-700">
                    This effect depends on both 'count' and 'pageTitle' variables
                  </p>
                </div>
              </div>
              
              <p className="mt-4 text-sm text-gray-700">
                 This example shows useEffect with multiple dependencies: <code className="px-2 py-1 text-white bg-gray-800 rounded">useEffect(() ={">"} {"{}"}, [count, pageTitle])</code>
              </p>
              
              {showMultiDepsCode && (
                <div className="p-4 mt-4 border border-gray-200 rounded bg-gray-50">
                  <h3 className="mb-2 text-sm font-medium text-gray-700">Example Code:</h3>
                  <pre className="p-4 overflow-x-auto text-sm bg-gray-900 rounded">
                    <code>
                      <span className="text-green-400">{"// Same useEffect as previous example"}{"\n"}</span>
                      <span className="text-purple-400">useEffect</span>(<span className="text-white">()</span> <span className="text-cyan-400">{"=>"}</span> <span className="text-white">{"{"}</span>{"\n"}
                      <span className="text-white">  </span><span className="text-blue-400">if</span> <span className="text-white">(</span><span className="text-blue-400">typeof</span> <span className="text-yellow-300">document</span> <span className="text-cyan-400">!==</span> <span className="text-yellow-200">'undefined'</span><span className="text-white">)</span> <span className="text-white">{"{"}</span>{"\n"}
                      <span className="text-white">    </span><span className="text-yellow-300">document</span>.<span className="text-yellow-300">title</span> = <span className="text-yellow-200">`${"{"}</span><span className="text-yellow-300">pageTitle</span><span className="text-yellow-200">{"}"} - Count: ${"{"}</span><span className="text-yellow-300">count</span><span className="text-yellow-200">{"}"}`</span>;{"\n"}
                      <span className="text-white">  {"}"}</span>{"\n"}
                      <span className="text-white">{"}"}</span>, <span className="text-white">[</span><span className="text-yellow-300">count</span>, <span className="text-yellow-300">pageTitle</span><span className="text-white">]</span>);{"\n"}
                      {"\n"}
                      <span className="text-green-400">{"// Input handler for page title"}{"\n"}</span>
                      <span className="text-red-400">{"<input"}</span>{"\n"}
                      <span className="text-green-300">  type</span>=<span className="text-yellow-200">"text"</span>{"\n"}
                      <span className="text-green-300">  value</span>=<span className="text-white">{"{"}</span><span className="text-yellow-300">pageTitle</span><span className="text-white">{"}"}</span>{"\n"}
                      <span className="text-green-300">  onChange</span>=<span className="text-white">{"{"}</span>(<span className="text-yellow-300">e</span>) <span className="text-cyan-400">{"=>"}</span> <span className="text-purple-400">setPageTitle</span>(<span className="text-yellow-300">e</span>.<span className="text-yellow-300">target</span>.<span className="text-yellow-300">value</span>)<span className="text-white">{"}"}</span>{"\n"}
                      <span className="text-red-400">{"/>"}</span>{"\n"}
                      {"\n"}
                      <span className="text-green-400">{"// Effect will run whenever EITHER count OR pageTitle changes"}</span>
                    </code>
                  </pre>
                </div>
              )}
            </div>

            {/* Auto-fetch on Mount Example */}
            <div className="p-6 bg-white rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-700">Auto-fetch on Mount Example</h2>
                <button
                  onClick={() => setShowAutoFetchCode(!showAutoFetchCode)}
                  className="px-3 py-1 text-sm text-white transition-colors bg-gray-600 rounded hover:bg-gray-700"
                >
                  {showAutoFetchCode ? 'Hide Code' : 'View Code'}
                </button>
              </div>
              
              <div className="space-y-4">
                {autoFetchLoading ? (
                  <div className="p-4 border border-blue-200 rounded bg-blue-50">
                    <p className="text-blue-700">🔄 Loading data automatically...</p>
                  </div>
                ) : autoFetchError ? (
                  <div className="p-4 border border-red-200 rounded bg-red-50">
                    <p className="text-red-700">❌ Error: {autoFetchError}</p>
                  </div>
                ) : (
                  <div className="p-4 border border-green-200 rounded bg-green-50">
                    <h3 className="font-medium text-green-800">✅ Auto-fetched Data:</h3>
                    <p className="text-green-700">Message: {autoFetchedData?.message}</p>
                    <p className="text-green-700">ID: {autoFetchedData?.id}</p>
                    <p className="text-green-700">Timestamp: {autoFetchedData?.timestamp}</p>
                  </div>
                )}
              </div>
              
              <p className="mt-4 text-sm text-gray-700">
                This data was fetched automatically when the component mounted using: <code className="px-2 py-1 text-white bg-gray-800 rounded">useEffect(() ={">"} {"{}"}, [])</code>
              </p>
              
              {showAutoFetchCode && (
                <div className="p-4 mt-4 border border-gray-200 rounded bg-gray-50">
                  <h3 className="mb-2 text-sm font-medium text-gray-700">Example Code:</h3>
                  <pre className="p-4 overflow-x-auto text-sm bg-gray-900 rounded">
                    <code>
                      <span className="text-green-400">{"// Auto-fetch data on mount (empty dependency array)"}{"\n"}</span>
                      <span className="text-purple-400">useEffect</span>(<span className="text-white">()</span> <span className="text-cyan-400">{"=>"}</span> <span className="text-white">{"{"}</span>{"\n"}
                      <span className="text-white">  </span><span className="text-blue-400">const</span> <span className="text-yellow-300">fetchData</span> = <span className="text-blue-400">async</span> <span className="text-white">()</span> <span className="text-cyan-400">{"=>"}</span> <span className="text-white">{"{"}</span>{"\n"}
                      <span className="text-white">    </span><span className="text-blue-400">try</span> <span className="text-white">{"{"}</span>{"\n"}
                      <span className="text-white">      </span><span className="text-purple-400">setLoading</span>(<span className="text-blue-400">true</span>);{"\n"}
                      <span className="text-white">      </span><span className="text-purple-400">setError</span>(<span className="text-blue-400">null</span>);{"\n"}
                      <span className="text-white">      </span>{"\n"}
                      <span className="text-white">      </span><span className="text-green-400">{"// Simulate API call"}{"\n"}</span>
                      <span className="text-white">      </span><span className="text-blue-400">await</span> <span className="text-blue-400">new</span> <span className="text-purple-400">Promise</span>(<span className="text-yellow-300">resolve</span> <span className="text-cyan-400">{"=>"}</span> <span className="text-purple-400">setTimeout</span>(<span className="text-yellow-300">resolve</span>, <span className="text-orange-400">2000</span>));{"\n"}
                      <span className="text-white">      </span>{"\n"}
                      <span className="text-white">      </span><span className="text-blue-400">const</span> <span className="text-yellow-300">data</span> = <span className="text-white">{"{"}</span>{"\n"}
                      <span className="text-white">        </span><span className="text-yellow-300">message</span>: <span className="text-yellow-200">"Data automatically fetched on component mount!"</span>,{"\n"}
                      <span className="text-white">        </span><span className="text-yellow-300">timestamp</span>: <span className="text-blue-400">new</span> <span className="text-purple-400">Date</span>().<span className="text-purple-400">toISOString</span>(),{"\n"}
                      <span className="text-white">        </span><span className="text-yellow-300">id</span>: <span className="text-yellow-300">Math</span>.<span className="text-purple-400">random</span>().<span className="text-purple-400">toString</span>(<span className="text-orange-400">36</span>).<span className="text-purple-400">substring</span>(<span className="text-orange-400">7</span>){"\n"}
                      <span className="text-white">      {"}"}</span>;{"\n"}
                      <span className="text-white">      </span>{"\n"}
                      <span className="text-white">      </span><span className="text-purple-400">setData</span>(<span className="text-yellow-300">data</span>);{"\n"}
                      <span className="text-white">    {"}"} </span><span className="text-blue-400">catch</span> (<span className="text-yellow-300">error</span>) <span className="text-white">{"{"}</span>{"\n"}
                      <span className="text-white">      </span><span className="text-purple-400">setError</span>(<span className="text-yellow-200">'Failed to fetch data'</span>);{"\n"}
                      <span className="text-white">    {"}"} </span><span className="text-blue-400">finally</span> <span className="text-white">{"{"}</span>{"\n"}
                      <span className="text-white">      </span><span className="text-purple-400">setLoading</span>(<span className="text-blue-400">false</span>);{"\n"}
                      <span className="text-white">    {"}"}</span>{"\n"}
                      <span className="text-white">  {"}"}</span>;{"\n"}
                      <span className="text-white">  </span>{"\n"}
                      <span className="text-white">  </span><span className="text-purple-400">fetchData</span>();{"\n"}
                      <span className="text-white">{"}"}</span>, <span className="text-white">[]</span>); <span className="text-green-400">{"// Empty dependency array - runs only once on mount"}</span>{"\n"}
                      {"\n"}
                      <span className="text-green-400">{"// Key points:"}{"\n"}</span>
                      <span className="text-green-400">{"// 1. Empty dependency array [] means this runs only once"}{"\n"}</span>
                      <span className="text-green-400">{"// 2. Perfect for initial data loading"}{"\n"}</span>
                      <span className="text-green-400">{"// 3. Equivalent to componentDidMount in class components"}</span>
                    </code>
                  </pre>
                </div>
              )}
            </div>

            {/* Manual Data Fetching Example */}
            <div className="p-6 bg-white rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-700">Manual Data Fetching Example</h2>
                <button
                  onClick={() => setShowFetchCode(!showFetchCode)}
                  className="px-3 py-1 text-sm text-white transition-colors bg-gray-600 rounded hover:bg-gray-700"
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
                  <div className="p-3 border border-red-200 rounded bg-red-50">
                    <p className="text-red-700">❌ Error: {error}</p>
                  </div>
                )}
                
                {user && (
                  <div className="p-3 border border-green-200 rounded bg-green-50">
                    <h3 className="font-medium text-green-800">✅ User Data:</h3>
                    <p className="text-green-700">ID: {user.id}</p>
                    <p className="text-green-700">Name: {user.name}</p>
                    <p className="text-green-700">Email: {user.email}</p>
                    <p className="text-green-700">Last Updated: {user.lastUpdated}</p>
                  </div>
                )}
              </div>
              
              <p className="mt-4 text-sm text-gray-700">
                 This example shows async data fetching with loading and error states
              </p>
              
              {showFetchCode && (
                <div className="p-4 mt-4 border border-gray-200 rounded bg-gray-50">
                  <h3 className="mb-2 text-sm font-medium text-gray-700">Example Code:</h3>
                  <pre className="p-4 overflow-x-auto text-sm bg-gray-900 rounded">
                    <code>
                      <span className="text-green-400">{"// State for data fetching"}{"\n"}</span>
                      <span className="text-blue-400">const</span>{" "}
                      <span className="text-yellow-300">[user, setUser]</span>{" "}
                      = <span className="text-purple-400">useState</span>
                      <span className="text-white">(</span>
                      <span className="text-blue-400">null</span>
                      <span className="text-white">)</span>;{"\n"}

                      <span className="text-blue-400">const</span>{" "}
                      <span className="text-yellow-300">[loading, setLoading]</span>{" "}
                      = <span className="text-purple-400">useState</span>
                      <span className="text-white">(</span>
                      <span className="text-blue-400">false</span>
                      <span className="text-white">)</span>;{"\n"}

                      <span className="text-blue-400">const</span>{" "}
                      <span className="text-yellow-300">[error, setError]</span>{" "}
                      = <span className="text-purple-400">useState</span>
                      <span className="text-white">(</span>
                      <span className="text-blue-400">null</span>
                      <span className="text-white">)</span>;{"\n\n"}

                      <span className="text-green-400">{"// Async function to fetch user data"}{"\n"}</span>
                      <span className="text-blue-400">const</span>{" "}
                      <span className="text-yellow-300">fetchUserData</span>{" "}
                      = <span className="text-blue-400">async</span>{" "}
                      <span className="text-white">()</span>{" "}
                      <span className="text-cyan-400">{"=>"}</span>{" "}
                      <span className="text-white">{"{"}</span>{"\n"}

                      <span className="text-white">  </span>
                      <span className="text-purple-400">setLoading</span>
                      <span className="text-white">(</span>
                      <span className="text-blue-400">true</span>
                      <span className="text-white">)</span>;{"\n"}

                      <span className="text-white">  </span>
                      <span className="text-purple-400">setError</span>
                      <span className="text-white">(</span>
                      <span className="text-blue-400">null</span>
                      <span className="text-white">)</span>;{"\n\n"}

                      <span className="text-white">  </span>
                      <span className="text-blue-400">try</span>{" "}
                      <span className="text-white">{"{"}</span>{"\n"}

                      <span className="text-white">    </span>
                      <span className="text-green-400">{"// Simulate API call"}{"\n"}</span>
                      <span className="text-white">    </span>
                      <span className="text-blue-400">await</span>{" "}
                      <span className="text-blue-400">new</span>{" "}
                      <span className="text-purple-400">Promise</span>
                      <span className="text-white">(</span>
                      <span className="text-yellow-300">resolve</span>{" "}
                      <span className="text-cyan-400">{"=>"}</span>{" "}
                      <span className="text-purple-400">setTimeout</span>
                      <span className="text-white">(</span>
                      <span className="text-yellow-300">resolve</span>,{" "}
                      <span className="text-orange-400">1000</span>
                      <span className="text-white">))</span>;{"\n\n"}

                      <span className="text-white">    </span>
                      <span className="text-blue-400">if</span>{" "}
                      <span className="text-white">(</span>
                      <span className="text-yellow-300">Math</span>.
                      <span className="text-purple-400">random</span>
                      <span className="text-white">()</span>{" "}
                      <span className="text-cyan-400">{">"}</span>{" "}
                      <span className="text-orange-400">0.3</span>
                      <span className="text-white">)</span>{" "}
                      <span className="text-white">{"{"}</span>{"\n"}

                      <span className="text-white">      </span>
                      <span className="text-purple-400">setUser</span>
                      <span className="text-white">(</span>
                      <span className="text-white">{"{"}</span>{"\n"}

                      <span className="text-white">        </span>
                      <span className="text-yellow-300">id</span>:{" "}
                      <span className="text-yellow-300">Date</span>.
                      <span className="text-purple-400">now</span>
                      <span className="text-white">()</span>,{"\n"}

                      <span className="text-white">        </span>
                      <span className="text-yellow-300">name</span>:{" "}
                      <span className="text-yellow-200">'John Doe'</span>,{"\n"}

                      <span className="text-white">        </span>
                      <span className="text-yellow-300">email</span>:{" "}
                      <span className="text-yellow-200">'john@example.com'</span>{"\n"}

                      <span className="text-white">      {"}"}</span>
                      <span className="text-white">)</span>;{"\n"}

                      <span className="text-white">    {"}"} </span>
                      <span className="text-blue-400">else</span>{" "}
                      <span className="text-white">{"{"}</span>{"\n"}

                      <span className="text-white">      </span>
                      <span className="text-blue-400">throw</span>{" "}
                      <span className="text-blue-400">new</span>{" "}
                      <span className="text-purple-400">Error</span>
                      <span className="text-white">(</span>
                      <span className="text-yellow-200">'Failed to fetch user data'</span>
                      <span className="text-white">)</span>;{"\n"}

                      <span className="text-white">    {"}"}</span>{"\n"}
                      <span className="text-white">  {"}"} </span>

                      <span className="text-blue-400">catch</span>{" "}
                      <span className="text-white">(</span>
                      <span className="text-yellow-300">err</span>
                      <span className="text-white">)</span>{" "}
                      <span className="text-white">{"{"}</span>{"\n"}

                      <span className="text-white">    </span>
                      <span className="text-purple-400">setError</span>
                      <span className="text-white">(</span>
                      <span className="text-yellow-300">err</span>.
                      <span className="text-yellow-300">message</span>
                      <span className="text-white">)</span>;{"\n"}

                      <span className="text-white">  {"}"} </span>
                      <span className="text-blue-400">finally</span>{" "}
                      <span className="text-white">{"{"}</span>{"\n"}

                      <span className="text-white">    </span>
                      <span className="text-purple-400">setLoading</span>
                      <span className="text-white">(</span>
                      <span className="text-blue-400">false</span>
                      <span className="text-white">)</span>;{"\n"}

                      <span className="text-white">  {"}"}</span>{"\n"}
                      <span className="text-white">{"}"}</span>;{"\n\n"}

                      <span className="text-green-400">{"// No useEffect needed - this is manual fetching!"}{"\n"}</span>
                      <span className="text-green-400">{"// For automatic fetching on mount, you'd use:"}{"\n"}</span>
                      <span className="text-green-400">{"// useEffect(() => fetchUserData(), []);"}</span>
                    </code>
                  </pre>
                </div>
              )}
            </div>

            {/* Timer & Cleanup Example */}
            <div className="p-6 bg-white rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-700">Timer & Cleanup Example</h2>
                <button
                  onClick={() => setShowTimerCode(!showTimerCode)}
                  className="px-3 py-1 text-sm text-white transition-colors bg-gray-600 rounded hover:bg-gray-700"
                >
                  {showTimerCode ? 'Hide Code' : 'View Code'}
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-gray-100 border border-gray-200 rounded">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-gray-800">⏱️ {timer}s</p>
                      <p className="text-sm text-gray-600">Timer Status: {isRunning ? '🟢 Running' : '🔴 Stopped'}</p>
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
                        className="px-4 py-2 text-white transition-colors bg-gray-500 rounded hover:bg-gray-600"
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="mt-4 text-sm text-gray-700">
                ✅ This example shows useEffect with cleanup functions to prevent memory leaks
              </p>
              
              {showTimerCode && (
                <div className="p-4 mt-4 border border-gray-200 rounded bg-gray-50">
                  <h3 className="mb-2 text-sm font-medium text-gray-700">Example Code:</h3>
                  <pre className="p-4 overflow-x-auto text-sm bg-gray-900 rounded">
                    <code>
                      <span className="text-green-400">{"// Timer states"}{"\n"}</span>
                      <span className="text-blue-400">const</span> <span className="text-yellow-300">[timer, setTimer]</span> = <span className="text-purple-400">useState</span>(<span className="text-orange-400">0</span>);{"\n"}
                      <span className="text-blue-400">const</span> <span className="text-yellow-300">[isRunning, setIsRunning]</span> = <span className="text-purple-400">useState</span>(<span className="text-blue-400">false</span>);{"\n"}
                      {"\n"}
                      <span className="text-green-400">{"// useEffect with cleanup - Timer management"}{"\n"}</span>
                      <span className="text-purple-400">useEffect</span>(<span className="text-white">()</span> <span className="text-cyan-400">{"=>"}</span> <span className="text-white">{"{"}</span>{"\n"}
                      <span className="text-white">  </span><span className="text-blue-400">let</span> <span className="text-yellow-300">interval</span> = <span className="text-blue-400">null</span>;{"\n"}
                      <span className="text-white">  </span>{"\n"}
                      <span className="text-white">  </span><span className="text-blue-400">if</span> (<span className="text-yellow-300">isRunning</span>) <span className="text-white">{"{"}</span>{"\n"}
                      <span className="text-white">    </span><span className="text-yellow-300">interval</span> = <span className="text-purple-400">setInterval</span>(<span className="text-white">()</span> <span className="text-cyan-400">{"=>"}</span> <span className="text-white">{"{"}</span>{"\n"}
                      <span className="text-white">      </span><span className="text-purple-400">setTimer</span>(<span className="text-yellow-300">prev</span> <span className="text-cyan-400">{"=>"}</span> <span className="text-yellow-300">prev</span> + <span className="text-orange-400">1</span>);{"\n"}
                      <span className="text-white">    {"}"}</span>, <span className="text-orange-400">1000</span>);{"\n"}
                      <span className="text-white">  {"}"}</span>{"\n"}
                      {"\n"}
                      <span className="text-green-400">{"  // Cleanup function - CRITICAL for preventing memory leaks!"}{"\n"}</span>
                      <span className="text-white">  </span><span className="text-blue-400">return</span> <span className="text-white">()</span> <span className="text-cyan-400">{"=>"}</span> <span className="text-white">{"{"}</span>{"\n"}
                      <span className="text-white">    </span><span className="text-blue-400">if</span> (<span className="text-yellow-300">interval</span>) <span className="text-white">{"{"}</span>{"\n"}
                      <span className="text-white">      </span><span className="text-purple-400">clearInterval</span>(<span className="text-yellow-300">interval</span>);{"\n"}
                      <span className="text-white">    {"}"}</span>{"\n"}
                      <span className="text-white">  {"}"}</span>;{"\n"}
                      <span className="text-white">{"}"}</span>, <span className="text-white">[</span><span className="text-yellow-300">isRunning</span><span className="text-white">]</span>);{"\n"}
                      {"\n"}
                      <span className="text-green-400">{"// Key points:"}{"\n"}</span>
                      <span className="text-green-400">{"// 1. Cleanup function prevents memory leaks"}{"\n"}</span>
                      <span className="text-green-400">{"// 2. Returns a function that React calls when:"}{"\n"}</span>
                      <span className="text-green-400">{"//    - Component unmounts"}{"\n"}</span>
                      <span className="text-green-400">{"//    - Dependencies change (before running effect again)"}{"\n"}</span>
                      <span className="text-green-400">{"// 3. Always clean up: timers, subscriptions, event listeners"}</span>
                    </code>
                  </pre>
                </div>
              )}
            </div>

            {/* Event Listener Example */}
            <div className="p-6 bg-white rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-700">Event Listener Example</h2>
                <button
                  onClick={() => setShowEventCode(!showEventCode)}
                  className="px-3 py-1 text-sm text-white transition-colors bg-gray-600 rounded hover:bg-gray-700"
                >
                  {showEventCode ? 'Hide Code' : 'View Code'}
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="p-3 border border-blue-200 rounded bg-blue-50">
                  <p className="text-sm text-blue-800">
                    <strong>Window Size:</strong> {isClient ? `${windowSize.width} × ${windowSize.height}px` : 'Loading...'}
                  </p>
                  <p className="mt-1 text-xs text-blue-700">
                    Try resizing your browser window to see this update in real-time!
                  </p>
                </div>
              </div>
              
              <p className="mt-4 text-sm text-gray-700">
                ✅ This example shows useEffect for event listeners with proper cleanup
              </p>
              
              {showEventCode && (
                <div className="p-4 mt-4 border border-gray-200 rounded bg-gray-50">
                  <h3 className="mb-2 text-sm font-medium text-gray-700">Example Code:</h3>
                  <pre className="p-4 overflow-x-auto text-sm bg-gray-900 rounded">
                    <code>
                      <span className="text-green-400">{"// Window size state"}{"\n"}</span>
                      <span className="text-blue-400">const</span> <span className="text-yellow-300">[windowSize, setWindowSize]</span> = <span className="text-purple-400">useState</span>(<span className="text-white">{"{"}</span> <span className="text-yellow-300">width</span>: <span className="text-orange-400">0</span>, <span className="text-yellow-300">height</span>: <span className="text-orange-400">0</span> <span className="text-white">{"}"}</span>);{"\n"}
                      {"\n"}
                      <span className="text-green-400">{"// useEffect for window resize listener (cleanup example)"}{"\n"}</span>
                      <span className="text-purple-400">useEffect</span>(<span className="text-white">()</span> <span className="text-cyan-400">{"=>"}</span> <span className="text-white">{"{"}</span>{"\n"}
                      <span className="text-white">  </span><span className="text-blue-400">const</span> <span className="text-yellow-300">handleResize</span> = <span className="text-white">()</span> <span className="text-cyan-400">{"=>"}</span> <span className="text-white">{"{"}</span>{"\n"}
                      <span className="text-white">    </span><span className="text-purple-400">setWindowSize</span>(<span className="text-white">{"{"}</span>{"\n"}
                      <span className="text-white">      </span><span className="text-yellow-300">width</span>: <span className="text-yellow-300">window</span>.<span className="text-yellow-300">innerWidth</span>,{"\n"}
                      <span className="text-white">      </span><span className="text-yellow-300">height</span>: <span className="text-yellow-300">window</span>.<span className="text-yellow-300">innerHeight</span>{"\n"}
                      <span className="text-white">    {"}"}</span>);{"\n"}
                      <span className="text-white">  {"}"}</span>;{"\n"}
                      {"\n"}
                      <span className="text-white">  </span><span className="text-blue-400">if</span> (<span className="text-blue-400">typeof</span> <span className="text-yellow-300">window</span> <span className="text-cyan-400">!==</span> <span className="text-yellow-200">'undefined'</span>) <span className="text-white">{"{"}</span>{"\n"}
                      <span className="text-white">    </span><span className="text-green-400">{"// Set initial size"}{"\n"}</span>
                      <span className="text-white">    </span><span className="text-purple-400">handleResize</span>();{"\n"}
                      <span className="text-white">    </span>{"\n"}
                      <span className="text-white">    </span><span className="text-green-400">{"// Add event listener"}{"\n"}</span>
                      <span className="text-white">    </span><span className="text-yellow-300">window</span>.<span className="text-purple-400">addEventListener</span>(<span className="text-yellow-200">'resize'</span>, <span className="text-yellow-300">handleResize</span>);{"\n"}
                      <span className="text-white">    </span>{"\n"}
                      <span className="text-white">    </span><span className="text-green-400">{"// Cleanup: remove event listener"}{"\n"}</span>
                      <span className="text-white">    </span><span className="text-blue-400">return</span> <span className="text-white">()</span> <span className="text-cyan-400">{"=>"}</span> <span className="text-white">{"{"}</span>{"\n"}
                      <span className="text-white">      </span><span className="text-yellow-300">window</span>.<span className="text-purple-400">removeEventListener</span>(<span className="text-yellow-200">'resize'</span>, <span className="text-yellow-300">handleResize</span>);{"\n"}
                      <span className="text-white">    {"}"}</span>;{"\n"}
                      <span className="text-white">  {"}"}</span>{"\n"}
                      <span className="text-white">{"}"}</span>, <span className="text-white">[]</span>); <span className="text-green-400">{"// Empty dependency array - setup once on mount"}</span>{"\n"}
                      {"\n"}
                      <span className="text-green-400">{"// Key points:"}{"\n"}</span>
                      <span className="text-green-400">{"// 1. Always remove event listeners in cleanup"}{"\n"}</span>
                      <span className="text-green-400">{"// 2. Empty dependency array means this runs once on mount"}{"\n"}</span>
                      <span className="text-green-400">{"// 3. Cleanup prevents memory leaks when component unmounts"}{"\n"}</span>
                      <span className="text-green-400">{"// 4. Same event listener reference used for add/remove"}</span>
                    </code>
                  </pre>
                </div>
              )}
            </div>

            {/* Local Storage Example */}
            <div className="p-6 bg-white rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-700">Local Storage Example</h2>
                <button
                  onClick={() => setShowStorageCode(!showStorageCode)}
                  className="px-3 py-1 text-sm text-white transition-colors bg-gray-600 rounded hover:bg-gray-700"
                >
                  {showStorageCode ? 'Hide Code' : 'View Code'}
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <input
                    type="text"
                    placeholder="Type something..."
                    value={savedText}
                    onChange={(e) => setSavedText(e.target.value)}
                    className="flex-1 px-3 py-2 text-gray-800 placeholder-gray-500 border-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    onClick={() => setSavedText('')}
                    className="px-4 py-2 text-white transition-colors bg-red-500 rounded hover:bg-red-600"
                  >
                    Clear
                  </button>
                </div>
                
                <div className="p-3 border border-yellow-200 rounded bg-yellow-50">
                  <p className="text-sm text-yellow-800">
                    <strong>Saved Text:</strong> {savedText || '(empty)'}
                  </p>
                  <p className="mt-1 text-xs text-yellow-700">
                    This text is automatically saved to localStorage and will persist across page refreshes!
                  </p>
                </div>
              </div>
              
              <p className="mt-4 text-sm text-gray-700">
                ✅ This example shows useEffect for data persistence with localStorage
              </p>
              
              {showStorageCode && (
                <div className="p-4 mt-4 border border-gray-200 rounded bg-gray-50">
                  <h3 className="mb-2 text-sm font-medium text-gray-700">Example Code:</h3>
                  <pre className="p-4 overflow-x-auto text-sm bg-gray-900 rounded">
                    <code>
                      <span className="text-green-400">{"// Local storage state"}{"\n"}</span>
                      <span className="text-blue-400">const</span> <span className="text-yellow-300">[savedText, setSavedText]</span> = <span className="text-purple-400">useState</span>(<span className="text-yellow-200">''</span>);{"\n"}
                      {"\n"}
                      <span className="text-green-400">{"// useEffect for local storage (load saved data on mount)"}{"\n"}</span>
                      <span className="text-purple-400">useEffect</span>(<span className="text-white">()</span> <span className="text-cyan-400">{"=>"}</span> <span className="text-white">{"{"}</span>{"\n"}
                      <span className="text-white">  </span><span className="text-blue-400">if</span> (<span className="text-blue-400">typeof</span> <span className="text-yellow-300">localStorage</span> <span className="text-cyan-400">!==</span> <span className="text-yellow-200">'undefined'</span>) <span className="text-white">{"{"}</span>{"\n"}
                      <span className="text-white">    </span><span className="text-blue-400">const</span> <span className="text-yellow-300">saved</span> = <span className="text-yellow-300">localStorage</span>.<span className="text-purple-400">getItem</span>(<span className="text-yellow-200">'savedText'</span>);{"\n"}
                      <span className="text-white">    </span><span className="text-blue-400">if</span> (<span className="text-yellow-300">saved</span>) <span className="text-white">{"{"}</span>{"\n"}
                      <span className="text-white">      </span><span className="text-purple-400">setSavedText</span>(<span className="text-yellow-300">saved</span>);{"\n"}
                      <span className="text-white">    {"}"}</span>{"\n"}
                      <span className="text-white">  {"}"}</span>{"\n"}
                      <span className="text-white">{"}"}</span>, <span className="text-white">[]</span>); <span className="text-green-400">{"// Empty dependency array - run once on mount"}</span>{"\n"}
                      {"\n"}
                      <span className="text-green-400">{"// useEffect for local storage (save data when it changes)"}{"\n"}</span>
                      <span className="text-purple-400">useEffect</span>(<span className="text-white">()</span> <span className="text-cyan-400">{"=>"}</span> <span className="text-white">{"{"}</span>{"\n"}
                      <span className="text-white">  </span><span className="text-blue-400">if</span> (<span className="text-blue-400">typeof</span> <span className="text-yellow-300">localStorage</span> <span className="text-cyan-400">!==</span> <span className="text-yellow-200">'undefined'</span>) <span className="text-white">{"{"}</span>{"\n"}
                      <span className="text-white">    </span><span className="text-yellow-300">localStorage</span>.<span className="text-purple-400">setItem</span>(<span className="text-yellow-200">'savedText'</span>, <span className="text-yellow-300">savedText</span>);{"\n"}
                      <span className="text-white">  {"}"}</span>{"\n"}
                      <span className="text-white">{"}"}</span>, <span className="text-white">[</span><span className="text-yellow-300">savedText</span><span className="text-white">]</span>); <span className="text-green-400">{"// Runs when savedText changes"}</span>{"\n"}
                      {"\n"}
                      <span className="text-green-400">{"// Key points:"}{"\n"}</span>
                      <span className="text-green-400">{"// 1. Two separate effects for load/save operations"}{"\n"}</span>
                      <span className="text-green-400">{"// 2. Load effect runs once on mount ([])"}{"\n"}</span>
                      <span className="text-green-400">{"// 3. Save effect runs when savedText changes ([savedText])"}{"\n"}</span>
                      <span className="text-green-400">{"// 4. Always check if localStorage is available (SSR safety)"}</span>
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
                  <h3 className="mb-2 text-lg font-medium text-red-800">1. Missing Dependencies</h3>
                  <p className="mb-3 text-sm text-red-700">
                    Always include all variables from component scope that are used inside useEffect in the dependency array.
                  </p>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <p className="mb-2 text-xs font-medium text-red-800">❌ Wrong:</p>
                      <pre className="p-2 text-xs bg-gray-900 rounded">
                        <code className="text-white">{`useEffect(() => {
  console.log(count);
}, []); // Missing 'count' in dependencies`}</code>
                      </pre>
                    </div>
                    <div>
                      <p className="mb-2 text-xs font-medium text-green-800">✅ Correct:</p>
                      <pre className="p-2 text-xs bg-gray-900 rounded">
                        <code className="text-white">{`useEffect(() => {
  console.log(count);
}, [count]); // Include 'count' in dependencies`}</code>
                      </pre>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border border-red-200 rounded bg-red-50">
                  <h3 className="mb-2 text-lg font-medium text-red-800">2. Memory Leaks</h3>
                  <p className="mb-3 text-sm text-red-700">
                    Always clean up subscriptions, timers, and event listeners to prevent memory leaks.
                  </p>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <p className="mb-2 text-xs font-medium text-red-800">❌ Wrong:</p>
                      <pre className="p-2 text-xs bg-gray-900 rounded">
                        <code className="text-white">{`useEffect(() => {
  const interval = setInterval(() => {
    console.log('tick');
  }, 1000);
  // No cleanup!
}, []);`}</code>
                      </pre>
                    </div>
                    <div>
                      <p className="mb-2 text-xs font-medium text-green-800">✅ Correct:</p>
                      <pre className="p-2 text-xs bg-gray-900 rounded">
                        <code className="text-white">{`useEffect(() => {
  const interval = setInterval(() => {
    console.log('tick');
  }, 1000);
  
  return () => clearInterval(interval);
}, []);`}</code>
                      </pre>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border border-red-200 rounded bg-red-50">
                  <h3 className="mb-2 text-lg font-medium text-red-800">3. Infinite Loops</h3>
                  <p className="mb-3 text-sm text-red-700">
                    Be careful with object/array dependencies and missing dependency arrays.
                  </p>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <p className="mb-2 text-xs font-medium text-red-800">❌ Wrong:</p>
                      <pre className="p-2 text-xs bg-gray-900 rounded">
                        <code className="text-white">{`useEffect(() => {
  setUser({ name: 'John' });
}); // No dependency array = runs on every render`}</code>
                      </pre>
                    </div>
                    <div>
                      <p className="mb-2 text-xs font-medium text-green-800">✅ Correct:</p>
                      <pre className="p-2 text-xs bg-gray-900 rounded">
                        <code className="text-white">{`useEffect(() => {
  setUser({ name: 'John' });
}, []); // Empty array = runs once on mount`}</code>
                      </pre>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border border-blue-200 rounded bg-blue-50">
                  <h3 className="mb-2 text-lg font-medium text-blue-800">💡 Best Practices</h3>
                  <ul className="text-sm text-blue-700 list-disc list-inside space-y-1">
                    <li>Use multiple useEffect hooks for different concerns (separation of concerns)</li>
                    <li>Always provide a dependency array (even if empty)</li>
                    <li>Use the ESLint plugin react-hooks/exhaustive-deps to catch missing dependencies</li>
                    <li>Consider using useCallback/useMemo for object/function dependencies</li>
                    <li>Clean up subscriptions, timers, and event listeners in the return function</li>
                    <li>Handle async operations carefully (components might unmount before async operations complete)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}