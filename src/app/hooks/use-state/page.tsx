'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';

export default function UseStatePage() {
  const [count, setCount] = useState(0);
  const [isToggled, setIsToggled] = useState(false);
  const [items, setItems] = useState<string[]>(['Item 1', 'Item 2']);
  const [user, setUser] = useState({ name: 'John', age: 25 });
  
  // Code visibility states
  const [showCounterCode, setShowCounterCode] = useState(false);
  const [showToggleCode, setShowToggleCode] = useState(false);
  const [showArrayCode, setShowArrayCode] = useState(false);
  const [showObjectCode, setShowObjectCode] = useState(false);

  // Helper function to add new item to array
  const addItem = () => {
    const newItem = `Item ${items.length + 1}`;
    setItems(prev => [...prev, newItem]); // Correct way: create new array
  };

  // Helper function to remove item from array
  const removeItem = (index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index));
  };

  // Helper function to update user object
  const updateUserName = (newName: string) => {
    setUser(prev => ({ ...prev, name: newName })); // Correct way: create new object
  };

  const updateUserAge = () => {
    setUser(prev => ({ ...prev, age: prev.age + 1 }));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="mb-8 text-3xl font-bold text-center text-gray-800">
          useState Hook Demo
        </h1>
        
        {/* Hook Description */}
        <div className="p-6 mb-8 bg-white rounded-lg shadow-md">
          <h2 className="mb-4 text-xl font-semibold text-gray-700">What is useState?</h2>
          <p className="mb-4 text-gray-700">
            <code className="px-2 py-1 text-white bg-gray-800 rounded">useState</code> is a React Hook that lets you add state to functional components. 
            It returns an array with two elements: the current state value and a function to update it.
          </p>
          <div className="p-4 border border-gray-200 rounded bg-gray-50">
            <h3 className="mb-2 text-lg font-medium text-gray-800">Basic Syntax:</h3>
            <pre className="p-3 overflow-x-auto text-green-400 bg-gray-800 rounded">
              <code>{`const [state, setState] = useState(initialValue);

// Examples:
const [count, setCount] = useState(0);
const [name, setName] = useState('John');
const [items, setItems] = useState([]);
const [user, setUser] = useState({ name: 'Alice', age: 30 });`}</code>
            </pre>
          </div>
        </div>
        
        <div className="space-y-8">
          {/* Counter Section */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-700">Counter Example</h2>
              <button
                onClick={() => setShowCounterCode(!showCounterCode)}
                className="px-3 py-1 text-sm text-white transition-colors bg-gray-600 rounded hover:bg-gray-700"
              >
                {showCounterCode ? 'Hide Code' : 'View Code'}
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setCount(prev => prev - 1)}
                className="px-4 py-2 text-white transition-colors bg-red-500 rounded hover:bg-red-600"
              >
                -
              </button>
              <span className="text-2xl font-bold text-gray-800">{count}</span>
              <button
                onClick={() => setCount(prev => prev + 1)}
                className="px-4 py-2 text-white transition-colors bg-green-500 rounded hover:bg-green-600"
              >
                +
              </button>
              <button
                onClick={() => setCount(0)}
                className="px-4 py-2 text-white transition-colors bg-gray-500 rounded hover:bg-gray-600"
              >
                Reset
              </button>
            </div>
            <p className="mt-2 text-sm text-gray-700">
              ✅ Uses functional update: <code className="px-2 py-1 text-white bg-gray-800 rounded">setCount(prev =&gt; prev + 1)</code>
            </p>
            
            {showCounterCode && (
              <div className="p-4 mt-4 border border-gray-200 rounded bg-gray-50">
                <h3 className="mb-2 text-sm font-medium text-gray-700">Counter Example Code:</h3>
                <pre className="p-4 overflow-x-auto text-sm bg-gray-900 rounded">
                  <code>
                    <span className="text-green-400">{/* useState Hook: Initialize counter with 0 */}</span>{'\n'}
                    <span className="text-blue-400">const</span> <span className="text-white">[</span><span className="text-yellow-300">count</span><span className="text-white">, </span><span className="text-yellow-300">setCount</span><span className="text-white">] = </span><span className="text-purple-400">useState</span><span className="text-white">(</span><span className="text-orange-400">0</span><span className="text-white">);</span>{'\n\n'}
                    
                    <span className="text-green-400">{/* JSX: Counter UI with three buttons */}</span>{'\n'}
                    <span className="text-red-400">&lt;div</span> <span className="text-green-300">className</span><span className="text-white">=</span><span className="text-yellow-200">"flex items-center space-x-4"</span><span className="text-red-400">&gt;</span>{'\n'}
                    <span className="text-white">  </span><span className="text-green-400">{'// Decrement button - uses functional update'}</span>{'\n'}
                    <span className="text-white">  </span><span className="text-red-400">&lt;button</span>{'\n'}
                    <span className="text-white">    </span><span className="text-green-300">onClick</span><span className="text-white">=</span><span className="text-yellow-200">{'{() => '}</span><span className="text-yellow-300">setCount</span><span className="text-yellow-200">{'(prev => prev - 1)}'}</span>{'\n'}
                    <span className="text-white">    </span><span className="text-green-300">className</span><span className="text-white">=</span><span className="text-yellow-200">"px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"</span>{'\n'}
                    <span className="text-white">  </span><span className="text-red-400">&gt;</span>{'\n'}
                    <span className="text-white">    -</span>{'\n'}
                    <span className="text-white">  </span><span className="text-red-400">&lt;/button&gt;</span>{'\n'}
                    
                    <span className="text-white">  </span><span className="text-green-400">{'// Display current count value'}</span>{'\n'}
                    <span className="text-white">  </span><span className="text-red-400">&lt;span</span> <span className="text-green-300">className</span><span className="text-white">=</span><span className="text-yellow-200">"text-2xl font-bold text-gray-800"</span><span className="text-red-400">&gt;</span><span className="text-yellow-200">{'{'}</span><span className="text-yellow-300">count</span><span className="text-yellow-200">{'}'}</span><span className="text-red-400">&lt;/span&gt;</span>{'\n'}
                    
                    <span className="text-white">  </span><span className="text-green-400">{'// Increment button - uses functional update'}</span>{'\n'}
                    <span className="text-white">  </span><span className="text-red-400">&lt;button</span>{'\n'}
                    <span className="text-white">    </span><span className="text-green-300">onClick</span><span className="text-white">=</span><span className="text-yellow-200">{'{() => '}</span><span className="text-yellow-300">setCount</span><span className="text-yellow-200">{'(prev => prev + 1)}'}</span>{'\n'}
                    <span className="text-white">    </span><span className="text-green-300">className</span><span className="text-white">=</span><span className="text-yellow-200">"px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"</span>{'\n'}
                    <span className="text-white">  </span><span className="text-red-400">&gt;</span>{'\n'}
                    <span className="text-white">    +</span>{'\n'}
                    <span className="text-white">  </span><span className="text-red-400">&lt;/button&gt;</span>{'\n'}
                    
                    <span className="text-white">  </span><span className="text-green-400">{'// Reset button - sets count directly to 0'}</span>{'\n'}
                    <span className="text-white">  </span><span className="text-red-400">&lt;button</span>{'\n'}
                    <span className="text-white">    </span><span className="text-green-300">onClick</span><span className="text-white">=</span><span className="text-yellow-200">{'{() => '}</span><span className="text-yellow-300">setCount</span><span className="text-yellow-200">{'(0)}'}</span>{'\n'}
                    <span className="text-white">    </span><span className="text-green-300">className</span><span className="text-white">=</span><span className="text-yellow-200">"px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"</span>{'\n'}
                    <span className="text-white">  </span><span className="text-red-400">&gt;</span>{'\n'}
                    <span className="text-white">    Reset</span>{'\n'}
                    <span className="text-white">  </span><span className="text-red-400">&lt;/button&gt;</span>{'\n'}
                    <span className="text-red-400">&lt;/div&gt;</span>
                  </code>
                </pre>
              </div>
            )}
          </div>

          {/* Toggle Switch Section */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-700">Toggle Switch Example</h2>
              <button
                onClick={() => setShowToggleCode(!showToggleCode)}
                className="px-3 py-1 text-sm text-white transition-colors bg-gray-600 rounded hover:bg-gray-700"
              >
                {showToggleCode ? 'Hide Code' : 'View Code'}
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsToggled(prev => !prev)}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  isToggled
                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                    : 'bg-gray-200 text-gray-900 hover:bg-gray-300 border-2 border-gray-400'
                }`}
              >
                {isToggled ? 'ON' : 'OFF'}
              </button>
              <span className="text-gray-600">
                Status: <strong>{isToggled ? 'Enabled' : 'Disabled'}</strong>
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-700">
              ✅ Uses functional update: <code className="px-2 py-1 text-white bg-gray-800 rounded">setIsToggled(prev =&gt; !prev)</code>
            </p>
            
            {showToggleCode && (
              <div className="p-4 mt-4 border border-gray-200 rounded bg-gray-50">
                <h3 className="mb-2 text-sm font-medium text-gray-700">Toggle Switch Example Code:</h3>
                <pre className="p-4 overflow-x-auto text-sm bg-gray-900 rounded">
                  <code>
                    <span className="text-green-400">{/* useState Hook: Initialize toggle state with false */}</span>{'\n'}
                    <span className="text-blue-400">const</span> <span className="text-white">[</span><span className="text-yellow-300">isToggled</span><span className="text-white">, </span><span className="text-yellow-300">setIsToggled</span><span className="text-white">] = </span><span className="text-purple-400">useState</span><span className="text-white">(</span><span className="text-orange-400">false</span><span className="text-white">);</span>{'\n\n'}
                    
                    <span className="text-green-400">{/* JSX: Toggle switch with conditional styling */}</span>{'\n'}
                    <span className="text-red-400">&lt;div</span> <span className="text-green-300">className</span><span className="text-white">=</span><span className="text-yellow-200">"flex items-center space-x-4"</span><span className="text-red-400">&gt;</span>{'\n'}
                    <span className="text-white">  </span><span className="text-green-400">{'// Toggle button - uses functional update to flip boolean'}</span>{'\n'}
                    <span className="text-white">  </span><span className="text-red-400">&lt;button</span>{'\n'}
                    <span className="text-white">    </span><span className="text-green-300">onClick</span><span className="text-white">=</span><span className="text-yellow-200">{'{() => '}</span><span className="text-yellow-300">setIsToggled</span><span className="text-yellow-200">{'(prev => !prev)}'}</span>{'\n'}
                    <span className="text-white">    </span><span className="text-green-300">className</span><span className="text-white">=</span><span className="text-yellow-200">{'{`px-6 py-3 rounded-lg font-medium transition-colors ${'}</span>{'\n'}
                    <span className="text-white">      </span><span className="text-yellow-300">isToggled</span>{'\n'}
                    <span className="text-white">        </span><span className="text-cyan-400">?</span> <span className="text-yellow-200">'bg-blue-500 text-white hover:bg-blue-600'</span>{'\n'}
                    <span className="text-white">        </span><span className="text-cyan-400">:</span> <span className="text-yellow-200">'bg-gray-200 text-gray-900 hover:bg-gray-300 border-2 border-gray-400'</span>{'\n'}
                    <span className="text-yellow-200">    {'}`}'}</span>{'\n'}
                    <span className="text-white">  </span><span className="text-red-400">&gt;</span>{'\n'}
                    <span className="text-white">    </span><span className="text-green-400">{'// Conditional text based on toggle state'}</span>{'\n'}
                    <span className="text-white">    </span><span className="text-yellow-200">{'{'}</span><span className="text-yellow-300">isToggled</span> <span className="text-cyan-400">?</span> <span className="text-yellow-200">'ON'</span> <span className="text-cyan-400">:</span> <span className="text-yellow-200">'OFF'</span><span className="text-yellow-200">{'}'}</span>{'\n'}
                    <span className="text-white">  </span><span className="text-red-400">&lt;/button&gt;</span>{'\n'}
                    
                    <span className="text-white">  </span><span className="text-green-400">{'// Status indicator showing current state'}</span>{'\n'}
                    <span className="text-white">  </span><span className="text-red-400">&lt;span</span> <span className="text-green-300">className</span><span className="text-white">=</span><span className="text-yellow-200">"text-gray-600"</span><span className="text-red-400">&gt;</span>{'\n'}
                    <span className="text-white">    Status: </span><span className="text-red-400">&lt;strong&gt;</span><span className="text-yellow-200">{'{'}</span><span className="text-yellow-300">isToggled</span> <span className="text-cyan-400">?</span> <span className="text-yellow-200">'Enabled'</span> <span className="text-cyan-400">:</span> <span className="text-yellow-200">'Disabled'</span><span className="text-yellow-200">{'}'}</span><span className="text-red-400">&lt;/strong&gt;</span>{'\n'}
                    <span className="text-white">  </span><span className="text-red-400">&lt;/span&gt;</span>{'\n'}
                    <span className="text-red-400">&lt;/div&gt;</span>
                  </code>
                </pre>
              </div>
            )}
          </div>

          {/* Array State Section */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-700">Array State Updates</h2>
              <button
                onClick={() => setShowArrayCode(!showArrayCode)}
                className="px-3 py-1 text-sm text-white transition-colors bg-gray-600 rounded hover:bg-gray-700"
              >
                {showArrayCode ? 'Hide Code' : 'View Code'}
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex space-x-2">
                <button
                  onClick={addItem}
                  className="px-4 py-2 text-white transition-colors bg-blue-500 rounded hover:bg-blue-600"
                >
                  Add Item
                </button>
                <button
                  onClick={() => setItems([])}
                  className="px-4 py-2 text-white transition-colors bg-red-500 rounded hover:bg-red-600"
                >
                  Clear All
                </button>
              </div>
              <div className="space-y-2">
                {items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-100 border border-gray-200 rounded">
                    <span className="font-medium text-gray-800">{item}</span>
                    <button
                      onClick={() => removeItem(index)}
                      className="px-3 py-1 text-sm text-white transition-colors bg-red-500 rounded hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
              <div className="p-3 text-sm text-gray-800 border border-yellow-200 rounded bg-yellow-50">
                <strong>⚠️ Common Gotcha:</strong> Don't mutate arrays directly!
                <br />
                <code className="px-2 py-1 text-red-700 rounded bg-red-50">❌ items.push(newItem)</code>
                <br />
                <code className="px-2 py-1 text-green-700 rounded bg-green-50">✅ setItems(prev =&gt; [...prev, newItem])</code>
              </div>
              
              {showArrayCode && (
                <div className="p-4 mt-4 border border-gray-200 rounded bg-gray-50">
                  <h3 className="mb-2 text-sm font-medium text-gray-700">Array State Updates Code:</h3>
                  <pre className="p-4 overflow-x-auto text-sm bg-gray-900 rounded">
                    <code>
                      <span className="text-green-400">{/* useState Hook: Initialize array with default items */}</span>{'\n'}
                      <span className="text-blue-400">const</span> <span className="text-white">[</span><span className="text-yellow-300">items</span><span className="text-white">, </span><span className="text-yellow-300">setItems</span><span className="text-white">] = </span><span className="text-purple-400">useState</span><span className="text-white">&lt;</span><span className="text-blue-300">string</span><span className="text-white">[]&gt;([</span><span className="text-yellow-200">'Item 1'</span><span className="text-white">, </span><span className="text-yellow-200">'Item 2'</span><span className="text-white">]);</span>{'\n\n'}
                      
                      <span className="text-green-400">{/* Helper function: Add new item to array (immutable) */}</span>{'\n'}
                      <span className="text-blue-400">const</span> <span className="text-yellow-300">addItem</span> <span className="text-white">=</span> <span className="text-white">() =&gt; </span><span className="text-yellow-200">{'{'}</span>{'\n'}
                      <span className="text-white">  </span><span className="text-green-400">{/* Create new item with incremental number */}</span>{'\n'}
                      <span className="text-white">  </span><span className="text-blue-400">const</span> <span className="text-yellow-300">newItem</span> <span className="text-white">=</span> <span className="text-yellow-200">`Item ${'{items.length + 1}'}`</span><span className="text-white">;</span>{'\n'}
                      <span className="text-white">  </span><span className="text-green-400">{/* Use spread operator to create new array */}</span>{'\n'}
                      <span className="text-white">  </span><span className="text-yellow-300">setItems</span><span className="text-white">(</span><span className="text-yellow-300">prev</span> <span className="text-white">=&gt;</span> <span className="text-white">[...</span><span className="text-yellow-300">prev</span><span className="text-white">, </span><span className="text-yellow-300">newItem</span><span className="text-white">]);</span>{'\n'}
                      <span className="text-yellow-200">{'}'}</span><span className="text-white">;</span>{'\n\n'}
                      
                      <span className="text-green-400">{/* Helper function: Remove item by index (immutable) */}</span>{'\n'}
                      <span className="text-blue-400">const</span> <span className="text-yellow-300">removeItem</span> <span className="text-white">=</span> <span className="text-white">(</span><span className="text-yellow-300">index</span><span className="text-white">:</span> <span className="text-blue-300">number</span><span className="text-white">) =&gt; </span><span className="text-yellow-200">{'{'}</span>{'\n'}
                      <span className="text-white">  </span><span className="text-green-400">{/* Filter out item at specified index */}</span>{'\n'}
                      <span className="text-white">  </span><span className="text-yellow-300">setItems</span><span className="text-white">(</span><span className="text-yellow-300">prev</span> <span className="text-white">=&gt;</span> <span className="text-yellow-300">prev</span><span className="text-white">.</span><span className="text-purple-400">filter</span><span className="text-white">((</span><span className="text-yellow-300">_</span><span className="text-white">, </span><span className="text-yellow-300">i</span><span className="text-white">) =&gt; </span><span className="text-yellow-300">i</span> <span className="text-white">!==</span> <span className="text-yellow-300">index</span><span className="text-white">));</span>{'\n'}
                      <span className="text-yellow-200">{'}'}</span><span className="text-white">;</span>{'\n\n'}
                      
                      <span className="text-green-400">{/* JSX: Array management UI */}</span>{'\n'}
                      <span className="text-red-400">&lt;div</span> <span className="text-green-300">className</span><span className="text-white">=</span><span className="text-yellow-200">"space-y-4"</span><span className="text-red-400">&gt;</span>{'\n'}
                      <span className="text-white">  </span><span className="text-green-400">{'// Action buttons'}</span>{'\n'}
                      <span className="text-white">  </span><span className="text-red-400">&lt;div</span> <span className="text-green-300">className</span><span className="text-white">=</span><span className="text-yellow-200">"flex space-x-2"</span><span className="text-red-400">&gt;</span>{'\n'}
                      <span className="text-white">    </span><span className="text-red-400">&lt;button</span> <span className="text-green-300">onClick</span><span className="text-white">=</span><span className="text-yellow-200">{'{addItem}'}</span><span className="text-red-400">&gt;</span><span className="text-white">Add Item</span><span className="text-red-400">&lt;/button&gt;</span>{'\n'}
                      <span className="text-white">    </span><span className="text-red-400">&lt;button</span> <span className="text-green-300">onClick</span><span className="text-white">=</span><span className="text-yellow-200">{'{() => setItems([])}'}</span><span className="text-red-400">&gt;</span><span className="text-white">Clear All</span><span className="text-red-400">&lt;/button&gt;</span>{'\n'}
                      <span className="text-white">  </span><span className="text-red-400">&lt;/div&gt;</span>{'\n'}
                      
                      <span className="text-white">  </span><span className="text-green-400">{'// Dynamic list rendering'}</span>{'\n'}
                      <span className="text-white">  </span><span className="text-red-400">&lt;div</span> <span className="text-green-300">className</span><span className="text-white">=</span><span className="text-yellow-200">"space-y-2"</span><span className="text-red-400">&gt;</span>{'\n'}
                      <span className="text-white">    </span><span className="text-yellow-200">{'{'}</span><span className="text-yellow-300">items</span><span className="text-white">.</span><span className="text-purple-400">map</span><span className="text-white">((</span><span className="text-yellow-300">item</span><span className="text-white">, </span><span className="text-yellow-300">index</span><span className="text-white">) =&gt; (</span>{'\n'}
                      <span className="text-white">      </span><span className="text-red-400">&lt;div</span> <span className="text-green-300">key</span><span className="text-white">=</span><span className="text-yellow-200">{'{index}'}</span><span className="text-red-400">&gt;</span>{'\n'}
                      <span className="text-white">        </span><span className="text-red-400">&lt;span&gt;</span><span className="text-yellow-200">{'{'}</span><span className="text-yellow-300">item</span><span className="text-yellow-200">{'}'}</span><span className="text-red-400">&lt;/span&gt;</span>{'\n'}
                      <span className="text-white">        </span><span className="text-red-400">&lt;button</span> <span className="text-green-300">onClick</span><span className="text-white">=</span><span className="text-yellow-200">{'{() => removeItem(index)}'}</span><span className="text-red-400">&gt;</span>{'\n'}
                      <span className="text-white">          Remove</span>{'\n'}
                      <span className="text-white">        </span><span className="text-red-400">&lt;/button&gt;</span>{'\n'}
                      <span className="text-white">      </span><span className="text-red-400">&lt;/div&gt;</span>{'\n'}
                      <span className="text-white">    ))</span><span className="text-yellow-200">{'}'}</span>{'\n'}
                      <span className="text-white">  </span><span className="text-red-400">&lt;/div&gt;</span>{'\n'}
                      <span className="text-red-400">&lt;/div&gt;</span>
                    </code>
                  </pre>
                </div>
              )}
            </div>
          </div>

          {/* Object State Section */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-700">Object State Updates</h2>
              <button
                onClick={() => setShowObjectCode(!showObjectCode)}
                className="px-3 py-1 text-sm text-white transition-colors bg-gray-600 rounded hover:bg-gray-700"
              >
                {showObjectCode ? 'Hide Code' : 'View Code'}
              </button>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-gray-100 border border-gray-200 rounded">
                <p className="text-gray-800"><strong className="text-gray-900">Name:</strong> {user.name}</p>
                <p className="text-gray-800"><strong className="text-gray-900">Age:</strong> {user.age}</p>
              </div>
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Enter new name"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      updateUserName(e.currentTarget.value);
                      e.currentTarget.value = '';
                    }
                  }}
                  className="px-3 py-2 text-gray-800 placeholder-gray-500 border-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  onClick={updateUserAge}
                  className="px-4 py-2 text-white transition-colors bg-purple-500 rounded hover:bg-purple-600"
                >
                  Increase Age
                </button>
                <button
                  onClick={() => setUser({ name: 'John', age: 25 })}
                  className="px-4 py-2 text-white transition-colors bg-gray-500 rounded hover:bg-gray-600"
                >
                  Reset User
                </button>
              </div>
              <div className="p-3 text-sm text-gray-800 border border-yellow-200 rounded bg-yellow-50">
                <strong>⚠️ Common Gotcha:</strong> Don't mutate objects directly!
                <br />
                <code className="px-2 py-1 text-red-700 rounded bg-red-50">❌ user.name = newName</code>
                <br />
                <code className="px-2 py-1 text-green-700 rounded bg-green-50">✅ setUser(prev =&gt; ({'{ ...prev, name: newName }'}))</code>
              </div>
              
              {showObjectCode && (
                <div className="p-4 mt-4 border border-gray-200 rounded bg-gray-50">
                  <h3 className="mb-2 text-sm font-medium text-gray-700">Object State Updates Code:</h3>
                  <pre className="p-4 overflow-x-auto text-sm bg-gray-900 rounded">
                    <code>
                      <span className="text-green-400">{/* useState Hook: Initialize object with default user data */}</span>{'\n'}
                      <span className="text-blue-400">const</span> <span className="text-white">[</span><span className="text-yellow-300">user</span><span className="text-white">, </span><span className="text-yellow-300">setUser</span><span className="text-white">] = </span><span className="text-purple-400">useState</span><span className="text-white">({'{ name: '}</span><span className="text-yellow-200">'John'</span><span className="text-white">, age: </span><span className="text-orange-400">25</span> <span className="text-white">{'}'});</span>{'\n\n'}
                      
                      <span className="text-green-400">{/* Helper function: Update user name (immutable) */}</span>{'\n'}
                      <span className="text-blue-400">const</span> <span className="text-yellow-300">updateUserName</span> <span className="text-white">=</span> <span className="text-white">(</span><span className="text-yellow-300">newName</span><span className="text-white">:</span> <span className="text-blue-300">string</span><span className="text-white">) =&gt; </span><span className="text-yellow-200">{'{'}</span>{'\n'}
                      <span className="text-white">  </span><span className="text-green-400">{/* Use spread operator to create new object */}</span>{'\n'}
                      <span className="text-white">  </span><span className="text-yellow-300">setUser</span><span className="text-white">(</span><span className="text-yellow-300">prev</span> <span className="text-white">=&gt;</span> <span className="text-white">({'{ ...prev, name: newName }'});</span>{'\n'}
                      <span className="text-yellow-200">{'}'}</span><span className="text-white">;</span>{'\n\n'}
                      
                      <span className="text-green-400">{/* Helper function: Increment user age (immutable) */}</span>{'\n'}
                      <span className="text-blue-400">const</span> <span className="text-yellow-300">updateUserAge</span> <span className="text-white">=</span> <span className="text-white">() =&gt; </span><span className="text-yellow-200">{'{'}</span>{'\n'}
                      <span className="text-white">  </span><span className="text-green-400">{/* Preserve existing properties, update only age */}</span>{'\n'}
                      <span className="text-white">  </span><span className="text-yellow-300">setUser</span><span className="text-white">(</span><span className="text-yellow-300">prev</span> <span className="text-white">=&gt;</span> <span className="text-white">({'{ ...prev, age: prev.age + 1 }'});</span>{'\n'}
                      <span className="text-yellow-200">{'}'}</span><span className="text-white">;</span>{'\n\n'}
                      
                      <span className="text-green-400">{/* JSX: Object state management UIs */}</span>{'\n'}
                      <span className="text-red-400">&lt;div</span> <span className="text-green-300">className</span><span className="text-white">=</span><span className="text-yellow-200">"space-y-4"</span><span className="text-red-400">&gt;</span>{'\n'}
                      <span className="text-white">  </span><span className="text-green-400">{'// Display current user data'}</span>{'\n'}
                      <span className="text-white">  </span><span className="text-red-400">&lt;div</span> <span className="text-green-300">className</span><span className="text-white">=</span><span className="text-yellow-200">"bg-gray-100 p-4 rounded border border-gray-200"</span><span className="text-red-400">&gt;</span>{'\n'}
                      <span className="text-white">    </span><span className="text-red-400">&lt;p&gt;</span><span className="text-red-400">&lt;strong&gt;</span><span className="text-white">Name:</span><span className="text-red-400">&lt;/strong&gt;</span> <span className="text-yellow-200">{'{'}</span><span className="text-yellow-300">user.name</span><span className="text-yellow-200">{'}'}</span><span className="text-red-400">&lt;/p&gt;</span>{'\n'}
                      <span className="text-white">    </span><span className="text-red-400">&lt;p&gt;</span><span className="text-red-400">&lt;strong&gt;</span><span className="text-white">Age:</span><span className="text-red-400">&lt;/strong&gt;</span> <span className="text-yellow-200">{'{'}</span><span className="text-yellow-300">user.age</span><span className="text-yellow-200">{'}'}</span><span className="text-red-400">&lt;/p&gt;</span>{'\n'}
                      <span className="text-white">  </span><span className="text-red-400">&lt;/div&gt;</span>{'\n'}
                      
                      <span className="text-white">  </span><span className="text-green-400">{'// User interaction controls'}</span>{'\n'}
                      <span className="text-white">  </span><span className="text-red-400">&lt;div</span> <span className="text-green-300">className</span><span className="text-white">=</span><span className="text-yellow-200">"flex space-x-2"</span><span className="text-red-400">&gt;</span>{'\n'}
                      <span className="text-white">    </span><span className="text-green-400">{'// Input for name updates'}</span>{'\n'}
                      <span className="text-white">    </span><span className="text-red-400">&lt;input</span>{'\n'}
                      <span className="text-white">      </span><span className="text-green-300">type</span><span className="text-white">=</span><span className="text-yellow-200">"text"</span>{'\n'}
                      <span className="text-white">      </span><span className="text-green-300">placeholder</span><span className="text-white">=</span><span className="text-yellow-200">"Enter new name"</span>{'\n'}
                      <span className="text-white">      </span><span className="text-green-300">onKeyDown</span><span className="text-white">=</span><span className="text-yellow-200">{'{(e) => {'}</span>{'\n'}
                      <span className="text-white">        </span><span className="text-cyan-400">if</span> <span className="text-white">(</span><span className="text-yellow-300">e.key</span> <span className="text-white">===</span> <span className="text-yellow-200">'Enter'</span><span className="text-white">) </span><span className="text-yellow-200">{'{'}</span>{'\n'}
                      <span className="text-white">          </span><span className="text-yellow-300">updateUserName</span><span className="text-white">(</span><span className="text-yellow-300">e.currentTarget.value</span><span className="text-white">);</span>{'\n'}
                      <span className="text-white">          </span><span className="text-yellow-300">e.currentTarget.value</span> <span className="text-white">=</span> <span className="text-yellow-200">''</span><span className="text-white">;</span>{'\n'}
                      <span className="text-white">        </span><span className="text-yellow-200">{'}'}</span>{'\n'}
                      <span className="text-white">      </span><span className="text-yellow-200">{'}'}</span>{'\n'}
                      <span className="text-white">    </span><span className="text-red-400">/&gt;</span>{'\n'}
                      
                      <span className="text-white">    </span><span className="text-green-400">{'// Age increment button'}</span>{'\n'}
                      <span className="text-white">    </span><span className="text-red-400">&lt;button</span> <span className="text-green-300">onClick</span><span className="text-white">=</span><span className="text-yellow-200">{'{updateUserAge}'}</span><span className="text-red-400">&gt;</span>{'\n'}
                      <span className="text-white">      Increase Age</span>{'\n'}
                      <span className="text-white">    </span><span className="text-red-400">&lt;/button&gt;</span>{'\n'}
                      
                      <span className="text-white">    </span><span className="text-green-400">{'// Reset to default values'}</span>{'\n'}
                      <span className="text-white">    </span><span className="text-red-400">&lt;button</span> <span className="text-green-300">onClick</span><span className="text-white">=</span><span className="text-yellow-200">{'{() => setUser({ name: \'John\', age: 25 })}'}</span><span className="text-red-400">&gt;</span>{'\n'}
                      <span className="text-white">      Reset User</span>{'\n'}
                      <span className="text-white">    </span><span className="text-red-400">&lt;/button&gt;</span>{'\n'}
                      <span className="text-white">  </span><span className="text-red-400">&lt;/div&gt;</span>{'\n'}
                      <span className="text-red-400">&lt;/div&gt;</span>
                    </code>
                  </pre>
                </div>
              )}
            </div>
          </div>

          {/* Edge Cases Section */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="mb-4 text-xl font-semibold text-gray-700">Edge Cases & Best Practices</h2>
            <div className="space-y-6 text-sm">
              <div className="p-4 border border-blue-200 rounded bg-blue-50">
                <strong className="text-blue-800">🔄 Functional Updates:</strong> <span className="text-blue-700">Use when new state depends on previous state</span>
                <br />
                <div className="mt-2 mb-2">
                  <code className="px-2 py-1 font-medium text-white bg-green-700 rounded">setCount(prev =&gt; prev + 1)</code> <span className="text-blue-800">vs</span> <code className="px-2 py-1 font-medium text-white bg-red-700 rounded">setCount(count + 1)</code>
                </div>
                <p className="mt-2 text-xs text-blue-700">
                  <strong>Why functional updates?</strong> They ensure you're working with the latest state value, especially important in async operations, 
                  event handlers, and when multiple updates happen quickly. The functional approach prevents stale closures.
                </p>
              </div>
              
              <div className="p-4 border border-green-200 rounded bg-green-50">
                <strong className="text-green-800">🔒 Immutable Updates:</strong> <span className="text-green-700">Always create new objects/arrays</span>
                <br />
                <div className="mt-2 mb-2">
                  <span className="text-green-800">Arrays:</span> <code className="px-2 py-1 font-medium text-green-900 bg-green-100 rounded">[...prev, newItem]</code> <span className="text-green-800">|</span> <span className="text-green-800">Objects:</span> <code className="px-2 py-1 font-medium text-green-900 bg-green-100 rounded">{'{ ...prev, newProp: value }'}</code>
                </div>
                <p className="mt-2 text-xs text-green-700">
                  <strong>Why immutability?</strong> React uses Object.is() comparison to detect state changes. If you mutate the original object/array, 
                  React won't detect the change and won't re-render. Always create new references for updates.
                </p>
              </div>
              
              <div className="p-4 border border-red-200 rounded bg-red-50">
                <strong className="text-red-800">🕒 Stale Closure:</strong> <span className="text-red-700">A common pitfall in async operations</span>
                <br />
                <div className="mt-2 mb-2">
                  <code className="px-2 py-1 font-medium text-red-900 bg-red-100 rounded">setTimeout(() =&gt; setCount(prev =&gt; prev + 1), 1000)</code>
                </div>
                <p className="mt-2 text-xs text-red-700">
                  <strong>The problem:</strong> In closures (like setTimeout, useEffect), the <code className="px-1 bg-red-100 rounded">count</code> variable 
                  captures the value from when the closure was created, not the current value. Using functional updates 
                  <code className="px-1 bg-red-100 rounded">prev =&gt; prev + 1</code> ensures you get the latest state.
                </p>
              </div>
              
              <div className="p-4 border border-yellow-200 rounded bg-yellow-50">
                <strong className="text-yellow-800">📦 Batch Updates:</strong> <span className="text-yellow-700">React optimizes performance by batching updates</span>
                <br />
                <div className="mt-2 mb-2">
                  <span className="text-yellow-800">Multiple</span> <code className="px-2 py-1 font-medium text-yellow-900 bg-yellow-100 rounded">setState</code> <span className="text-yellow-800">calls in one handler = one re-render</span>
                </div>
                <p className="mt-2 text-xs text-yellow-700">
                  <strong>How it works:</strong> React automatically batches multiple state updates in event handlers into a single re-render for better performance. 
                  In React 18+, this batching also happens in promises, timeouts, and other async operations (Automatic Batching).
                </p>
              </div>
              
              <div className="p-4 border border-purple-200 rounded bg-purple-50">
                <strong className="text-purple-800">⚡ State Updates are Asynchronous:</strong> <span className="text-purple-700">setState doesn't immediately update the state</span>
                <br />
                <div className="mt-2 mb-2">
                  <code className="px-2 py-1 font-medium text-purple-900 bg-purple-100 rounded">setCount(count + 1); console.log(count); // Still old value!</code>
                </div>
                <p className="mt-2 text-xs text-purple-700">
                  <strong>Remember:</strong> State updates are scheduled and happen after the current execution. If you need to perform actions 
                  after state updates, use useEffect or access the new state in the next render cycle.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}