'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';

export default function UseStatePage() {
  const [count, setCount] = useState(0);
  const [isToggled, setIsToggled] = useState(false);
  const [items, setItems] = useState<string[]>(['Item 1', 'Item 2']);
  const [user, setUser] = useState({ name: 'John', age: 25 });

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
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          useState Hook Demo
        </h1>
        
        {/* Hook Description */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">What is useState?</h2>
          <p className="text-gray-700 mb-4">
            <code className="bg-gray-100 px-2 py-1 rounded text-gray-800">useState</code> is a React Hook that lets you add state to functional components. 
            It returns an array with two elements: the current state value and a function to update it.
          </p>
          <div className="bg-gray-50 p-4 rounded border border-gray-200">
            <h3 className="text-lg font-medium mb-2 text-gray-800">Basic Syntax:</h3>
            <pre className="bg-gray-800 text-green-400 p-3 rounded overflow-x-auto">
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
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Counter Example</h2>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setCount(prev => prev - 1)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                -
              </button>
              <span className="text-2xl font-bold text-gray-800">{count}</span>
              <button
                onClick={() => setCount(prev => prev + 1)}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
              >
                +
              </button>
              <button
                onClick={() => setCount(0)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
              >
                Reset
              </button>
            </div>
            <p className="text-sm text-gray-700 mt-2">
              ✅ Uses functional update: <code className="bg-gray-100 px-2 py-1 rounded text-gray-800">setCount(prev => prev + 1)</code>
            </p>
          </div>

          {/* Toggle Switch Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Toggle Switch Example</h2>
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
            <p className="text-sm text-gray-700 mt-2">
              ✅ Uses functional update: <code className="bg-gray-100 px-2 py-1 rounded text-gray-800">setIsToggled(prev => !prev)</code>
            </p>
          </div>

          {/* Array State Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Array State Updates</h2>
            <div className="space-y-4">
              <div className="flex space-x-2">
                <button
                  onClick={addItem}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  Add Item
                </button>
                <button
                  onClick={() => setItems([])}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                  Clear All
                </button>
              </div>
              <div className="space-y-2">
                {items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-100 p-3 rounded border border-gray-200">
                    <span className="text-gray-800 font-medium">{item}</span>
                    <button
                      onClick={() => removeItem(index)}
                      className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
              <div className="text-sm text-gray-800 bg-yellow-50 p-3 rounded border border-yellow-200">
                <strong>⚠️ Common Gotcha:</strong> Don't mutate arrays directly!
                <br />
                <code className="text-red-700 bg-red-50 px-2 py-1 rounded">❌ items.push(newItem)</code>
                <br />
                <code className="text-green-700 bg-green-50 px-2 py-1 rounded">✅ setItems(prev => [...prev, newItem])</code>
              </div>
            </div>
          </div>

          {/* Object State Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Object State Updates</h2>
            <div className="space-y-4">
              <div className="bg-gray-100 p-4 rounded border border-gray-200">
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
                  className="px-3 py-2 border-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 placeholder-gray-500"
                />
                <button
                  onClick={updateUserAge}
                  className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
                >
                  Increase Age
                </button>
                <button
                  onClick={() => setUser({ name: 'John', age: 25 })}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                >
                  Reset User
                </button>
              </div>
              <div className="text-sm text-gray-800 bg-yellow-50 p-3 rounded border border-yellow-200">
                <strong>⚠️ Common Gotcha:</strong> Don't mutate objects directly!
                <br />
                <code className="text-red-700 bg-red-50 px-2 py-1 rounded">❌ user.name = newName</code>
                <br />
                <code className="text-green-700 bg-green-50 px-2 py-1 rounded">✅ setUser(prev => ({'{ ...prev, name: newName }'}))</code>
              </div>
            </div>
          </div>

          {/* Edge Cases Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Edge Cases & Best Practices</h2>
            <div className="space-y-6 text-sm">
              <div className="bg-blue-50 p-4 rounded border border-blue-200">
                <strong className="text-blue-800">🔄 Functional Updates:</strong> <span className="text-blue-700">Use when new state depends on previous state</span>
                <br />
                <div className="mt-2 mb-2">
                  <code className="text-blue-900 bg-blue-100 px-2 py-1 rounded font-medium">setCount(prev => prev + 1)</code> <span className="text-blue-800">vs</span> <code className="text-gray-800 bg-gray-100 px-2 py-1 rounded font-medium">setCount(count + 1)</code>
                </div>
                <p className="text-blue-700 text-xs mt-2">
                  <strong>Why functional updates?</strong> They ensure you're working with the latest state value, especially important in async operations, 
                  event handlers, and when multiple updates happen quickly. The functional approach prevents stale closures.
                </p>
              </div>
              
              <div className="bg-green-50 p-4 rounded border border-green-200">
                <strong className="text-green-800">🔒 Immutable Updates:</strong> <span className="text-green-700">Always create new objects/arrays</span>
                <br />
                <div className="mt-2 mb-2">
                  <span className="text-green-800">Arrays:</span> <code className="text-green-900 bg-green-100 px-2 py-1 rounded font-medium">[...prev, newItem]</code> <span className="text-green-800">|</span> <span className="text-green-800">Objects:</span> <code className="text-green-900 bg-green-100 px-2 py-1 rounded font-medium">{'{ ...prev, newProp: value }'}</code>
                </div>
                <p className="text-green-700 text-xs mt-2">
                  <strong>Why immutability?</strong> React uses Object.is() comparison to detect state changes. If you mutate the original object/array, 
                  React won't detect the change and won't re-render. Always create new references for updates.
                </p>
              </div>
              
              <div className="bg-red-50 p-4 rounded border border-red-200">
                <strong className="text-red-800">🕒 Stale Closure:</strong> <span className="text-red-700">A common pitfall in async operations</span>
                <br />
                <div className="mt-2 mb-2">
                  <code className="text-red-900 bg-red-100 px-2 py-1 rounded font-medium">setTimeout(() => setCount(prev => prev + 1), 1000)</code>
                </div>
                <p className="text-red-700 text-xs mt-2">
                  <strong>The problem:</strong> In closures (like setTimeout, useEffect), the <code className="bg-red-100 px-1 rounded">count</code> variable 
                  captures the value from when the closure was created, not the current value. Using functional updates 
                  <code className="bg-red-100 px-1 rounded">prev => prev + 1</code> ensures you get the latest state.
                </p>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded border border-yellow-200">
                <strong className="text-yellow-800">📦 Batch Updates:</strong> <span className="text-yellow-700">React optimizes performance by batching updates</span>
                <br />
                <div className="mt-2 mb-2">
                  <span className="text-yellow-800">Multiple</span> <code className="text-yellow-900 bg-yellow-100 px-2 py-1 rounded font-medium">setState</code> <span className="text-yellow-800">calls in one handler = one re-render</span>
                </div>
                <p className="text-yellow-700 text-xs mt-2">
                  <strong>How it works:</strong> React automatically batches multiple state updates in event handlers into a single re-render for better performance. 
                  In React 18+, this batching also happens in promises, timeouts, and other async operations (Automatic Batching).
                </p>
              </div>
              
              <div className="bg-purple-50 p-4 rounded border border-purple-200">
                <strong className="text-purple-800">⚡ State Updates are Asynchronous:</strong> <span className="text-purple-700">setState doesn't immediately update the state</span>
                <br />
                <div className="mt-2 mb-2">
                  <code className="text-purple-900 bg-purple-100 px-2 py-1 rounded font-medium">setCount(count + 1); console.log(count); // Still old value!</code>
                </div>
                <p className="text-purple-700 text-xs mt-2">
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