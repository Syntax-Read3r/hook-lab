'use client';

import { useState } from 'react';

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
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          useState Hook Demo
        </h1>
        
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
            <p className="text-sm text-gray-600 mt-2">
              =¡ Uses functional update: <code>setCount(prev => prev + 1)</code>
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
                    : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                }`}
              >
                {isToggled ? 'ON' : 'OFF'}
              </button>
              <span className="text-gray-600">
                Status: <strong>{isToggled ? 'Enabled' : 'Disabled'}</strong>
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              =¡ Uses functional update: <code>setIsToggled(prev => !prev)</code>
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
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                    <span>{item}</span>
                    <button
                      onClick={() => removeItem(index)}
                      className="px-2 py-1 bg-red-400 text-white text-sm rounded hover:bg-red-500 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
              <div className="text-sm text-gray-600 bg-yellow-50 p-3 rounded">
                <strong>  Common Gotcha:</strong> Don't mutate arrays directly!
                <br />
                <code className="text-red-600">L items.push(newItem)</code>
                <br />
                <code className="text-green-600"> setItems(prev => [...prev, newItem])</code>
              </div>
            </div>
          </div>

          {/* Object State Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Object State Updates</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded">
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Age:</strong> {user.age}</p>
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
                  className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              <div className="text-sm text-gray-600 bg-yellow-50 p-3 rounded">
                <strong>  Common Gotcha:</strong> Don't mutate objects directly!
                <br />
                <code className="text-red-600">L user.name = newName</code>
                <br />
                <code className="text-green-600"> setUser(prev => ({'{ ...prev, name: newName }'}))</code>
              </div>
            </div>
          </div>

          {/* Edge Cases Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Edge Cases & Best Practices</h2>
            <div className="space-y-4 text-sm">
              <div className="bg-blue-50 p-3 rounded">
                <strong>=¡ Functional Updates:</strong> Use when new state depends on previous state
                <br />
                <code>setCount(prev => prev + 1)</code> vs <code>setCount(count + 1)</code>
              </div>
              <div className="bg-green-50 p-3 rounded">
                <strong> Immutable Updates:</strong> Always create new objects/arrays
                <br />
                Arrays: <code>[...prev, newItem]</code> | Objects: <code>{'{ ...prev, newProp: value }'}</code>
              </div>
              <div className="bg-red-50 p-3 rounded">
                <strong>  Stale Closure:</strong> In event handlers, use functional updates
                <br />
                <code>setTimeout(() => setCount(prev => prev + 1), 1000)</code>
              </div>
              <div className="bg-yellow-50 p-3 rounded">
                <strong>= Batch Updates:</strong> React batches state updates in event handlers
                <br />
                Multiple <code>setState</code> calls in one handler = one re-render
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}