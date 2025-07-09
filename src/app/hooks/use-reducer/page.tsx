'use client';

import { useReducer, useState } from 'react';
import Navbar from '@/components/Navbar';

// Counter reducer types
interface CounterState {
  count: number;
  history: string[];
}

type CounterAction = 
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'reset' }
  | { type: 'set'; payload: number };

// Form reducer types
interface FormState {
  name: string;
  email: string;
  message: string;
  errors: {
    name?: string;
    email?: string;
    message?: string;
  };
  isSubmitting: boolean;
  submittedData: FormState | null;
}

type FormAction = 
  | { type: 'update_field'; field: keyof FormState; value: string }
  | { type: 'set_error'; field: keyof FormState['errors']; error: string }
  | { type: 'clear_errors' }
  | { type: 'submit_start' }
  | { type: 'submit_success'; data: FormState }
  | { type: 'submit_error' }
  | { type: 'reset_form' };

// Counter reducer function
function counterReducer(state: CounterState, action: CounterAction): CounterState {
  switch (action.type) {
    case 'increment':
      return {
        count: state.count + 1,
        history: [...state.history, `Incremented to ${state.count + 1}`]
      };
    case 'decrement':
      return {
        count: state.count - 1,
        history: [...state.history, `Decremented to ${state.count - 1}`]
      };
    case 'reset':
      return {
        count: 0,
        history: [...state.history, 'Reset to 0']
      };
    case 'set':
      return {
        count: action.payload,
        history: [...state.history, `Set to ${action.payload}`]
      };
    default:
      throw new Error(`Unknown action type: ${action}`);
  }
}

// Form reducer function
function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'update_field':
      return {
        ...state,
        [action.field]: action.value,
        errors: {
          ...state.errors,
          [action.field]: undefined // Clear field error when user types
        }
      };
    case 'set_error':
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.field]: action.error
        }
      };
    case 'clear_errors':
      return {
        ...state,
        errors: {}
      };
    case 'submit_start':
      return {
        ...state,
        isSubmitting: true,
        errors: {}
      };
    case 'submit_success':
      return {
        ...state,
        isSubmitting: false,
        submittedData: action.data
      };
    case 'submit_error':
      return {
        ...state,
        isSubmitting: false
      };
    case 'reset_form':
      return {
        name: '',
        email: '',
        message: '',
        errors: {},
        isSubmitting: false,
        submittedData: null
      };
    default:
      throw new Error(`Unknown action type: ${action}`);
  }
}

// Initial states
const initialCounterState: CounterState = {
  count: 0,
  history: ['Initial state: 0']
};

const initialFormState: FormState = {
  name: '',
  email: '',
  message: '',
  errors: {},
  isSubmitting: false,
  submittedData: null
};

export default function UseReducerPage() {
  // useReducer for counter
  const [counterState, counterDispatch] = useReducer(counterReducer, initialCounterState);
  
  // useReducer for form
  const [formState, formDispatch] = useReducer(formReducer, initialFormState);
  
  // Code visibility states
  const [showCounterCode, setShowCounterCode] = useState(false);
  const [showFormCode, setShowFormCode] = useState(false);
  const [showReducerCode, setShowReducerCode] = useState(false);
  const [showComparisonCode, setShowComparisonCode] = useState(false);

  // Form validation and submission
  const validateForm = () => {
    let isValid = true;
    
    if (!formState.name.trim()) {
      formDispatch({ type: 'set_error', field: 'name', error: 'Name is required' });
      isValid = false;
    }
    
    if (!formState.email.trim()) {
      formDispatch({ type: 'set_error', field: 'email', error: 'Email is required' });
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      formDispatch({ type: 'set_error', field: 'email', error: 'Please enter a valid email' });
      isValid = false;
    }
    
    if (!formState.message.trim()) {
      formDispatch({ type: 'set_error', field: 'message', error: 'Message is required' });
      isValid = false;
    }
    
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    formDispatch({ type: 'submit_start' });
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      formDispatch({ type: 'submit_success', data: formState });
    } catch (error) {
      formDispatch({ type: 'submit_error' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="mb-8 text-3xl font-bold text-center text-gray-800">
            useReducer Hook Demo
          </h1>
          
          {/* Hook Description */}
          <div className="p-6 mb-8 bg-white rounded-lg shadow-md">
            <h2 className="mb-4 text-xl font-semibold text-gray-700">What is useReducer?</h2>
            <p className="mb-4 text-gray-700">
              <code className="px-2 py-1 text-white bg-gray-800 rounded">useReducer</code> is a React Hook that provides an alternative to <code className="px-2 py-1 text-white bg-gray-800 rounded">useState</code>. 
              It's particularly useful for managing complex state logic that involves multiple sub-values or when the next state depends on the previous one.
            </p>
            <div className="p-4 border border-gray-200 rounded bg-gray-50">
              <h3 className="mb-2 text-lg font-medium text-gray-800">Basic Syntax:</h3>
              <pre className="p-3 overflow-x-auto text-green-400 bg-gray-800 rounded">
                <code>{`const [state, dispatch] = useReducer(reducer, initialState);

// Reducer function signature
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

// Usage
dispatch({ type: 'increment' });
dispatch({ type: 'decrement' });`}</code>
              </pre>
            </div>
          </div>
          
          <div className="space-y-8">
            {/* Counter Example */}
            <div className="p-6 bg-white rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-700">Counter with useReducer</h2>
                <button
                  onClick={() => setShowCounterCode(!showCounterCode)}
                  className="px-3 py-1 text-sm text-white transition-colors bg-gray-600 rounded hover:bg-gray-700"
                >
                  {showCounterCode ? 'Hide Code' : 'View Code'}
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-gray-100 border border-gray-200 rounded">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-3xl font-bold text-gray-800">Count: {counterState.count}</p>
                      <p className="text-sm text-gray-600">Actions performed: {counterState.history.length}</p>
                    </div>
                    <div className="space-x-2">
                      <button
                        onClick={() => counterDispatch({ type: 'increment' })}
                        className="px-4 py-2 text-white transition-colors bg-green-500 rounded hover:bg-green-600"
                      >
                        +1
                      </button>
                      <button
                        onClick={() => counterDispatch({ type: 'decrement' })}
                        className="px-4 py-2 text-white transition-colors bg-red-500 rounded hover:bg-red-600"
                      >
                        -1
                      </button>
                      <button
                        onClick={() => counterDispatch({ type: 'set', payload: 10 })}
                        className="px-4 py-2 text-white transition-colors bg-blue-500 rounded hover:bg-blue-600"
                      >
                        Set to 10
                      </button>
                      <button
                        onClick={() => counterDispatch({ type: 'reset' })}
                        className="px-4 py-2 text-white transition-colors bg-gray-500 rounded hover:bg-gray-600"
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-3 border border-blue-200 rounded bg-blue-50">
                    <h3 className="mb-2 text-sm font-medium text-blue-800">Action History:</h3>
                    <div className="max-h-20 overflow-y-auto">
                      {counterState.history.map((action, index) => (
                        <p key={index} className="text-xs text-blue-700">
                          {index + 1}. {action}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="mt-4 text-sm text-gray-700">
                ✅ This example shows how useReducer manages complex state with action history tracking
              </p>
              
              {showCounterCode && (
                <div className="p-4 mt-4 border border-gray-200 rounded bg-gray-50">
                  <h3 className="mb-2 text-sm font-medium text-gray-700">Counter Example Code:</h3>
                  <pre className="p-4 overflow-x-auto text-sm bg-gray-900 rounded">
                    <code>
                      <span className="text-green-400">{"// Counter state interface"}{"\n"}</span>
                      <span className="text-blue-400">interface</span> <span className="text-yellow-300">CounterState</span> <span className="text-white">{"{"}</span>{"\n"}
                      <span className="text-white">  </span><span className="text-yellow-300">count</span>: <span className="text-blue-300">number</span>;{"\n"}
                      <span className="text-white">  </span><span className="text-yellow-300">history</span>: <span className="text-blue-300">string</span>[];{"\n"}
                      <span className="text-white">{"}"}</span>{"\n\n"}
                      
                      <span className="text-green-400">{"// Action types"}{"\n"}</span>
                      <span className="text-blue-400">type</span> <span className="text-yellow-300">CounterAction</span> = {"\n"}
                      <span className="text-white">  | </span><span className="text-white">{"{"}</span> <span className="text-yellow-300">type</span>: <span className="text-yellow-200">'increment'</span> <span className="text-white">{"}"}</span>{"\n"}
                      <span className="text-white">  | </span><span className="text-white">{"{"}</span> <span className="text-yellow-300">type</span>: <span className="text-yellow-200">'decrement'</span> <span className="text-white">{"}"}</span>{"\n"}
                      <span className="text-white">  | </span><span className="text-white">{"{"}</span> <span className="text-yellow-300">type</span>: <span className="text-yellow-200">'reset'</span> <span className="text-white">{"}"}</span>{"\n"}
                      <span className="text-white">  | </span><span className="text-white">{"{"}</span> <span className="text-yellow-300">type</span>: <span className="text-yellow-200">'set'</span>; <span className="text-yellow-300">payload</span>: <span className="text-blue-300">number</span> <span className="text-white">{"}"}</span>;{"\n\n"}
                      
                      <span className="text-green-400">{"// Reducer function"}{"\n"}</span>
                      <span className="text-blue-400">function</span> <span className="text-yellow-300">counterReducer</span>(<span className="text-yellow-300">state</span>, <span className="text-yellow-300">action</span>) <span className="text-white">{"{"}</span>{"\n"}
                      <span className="text-white">  </span><span className="text-blue-400">switch</span> (<span className="text-yellow-300">action</span>.<span className="text-yellow-300">type</span>) <span className="text-white">{"{"}</span>{"\n"}
                      <span className="text-white">    </span><span className="text-blue-400">case</span> <span className="text-yellow-200">'increment'</span>:{"\n"}
                      <span className="text-white">      </span><span className="text-blue-400">return</span> <span className="text-white">{"{"}</span>{"\n"}
                      <span className="text-white">        </span><span className="text-yellow-300">count</span>: <span className="text-yellow-300">state</span>.<span className="text-yellow-300">count</span> + <span className="text-orange-400">1</span>,{"\n"}
                      <span className="text-white">        </span><span className="text-yellow-300">history</span>: [...<span className="text-yellow-300">state</span>.<span className="text-yellow-300">history</span>, <span className="text-yellow-200">`Incremented to ${"{state.count + 1}"}`</span>]{"\n"}
                      <span className="text-white">      {"}"}</span>;{"\n"}
                      <span className="text-white">    </span><span className="text-blue-400">case</span> <span className="text-yellow-200">'decrement'</span>:{"\n"}
                      <span className="text-white">      </span><span className="text-blue-400">return</span> <span className="text-white">{"{"}</span>{"\n"}
                      <span className="text-white">        </span><span className="text-yellow-300">count</span>: <span className="text-yellow-300">state</span>.<span className="text-yellow-300">count</span> - <span className="text-orange-400">1</span>,{"\n"}
                      <span className="text-white">        </span><span className="text-yellow-300">history</span>: [...<span className="text-yellow-300">state</span>.<span className="text-yellow-300">history</span>, <span className="text-yellow-200">`Decremented to ${"{state.count - 1}"}`</span>]{"\n"}
                      <span className="text-white">      {"}"}</span>;{"\n"}
                      <span className="text-white">    </span><span className="text-blue-400">case</span> <span className="text-yellow-200">'reset'</span>:{"\n"}
                      <span className="text-white">      </span><span className="text-blue-400">return</span> <span className="text-white">{"{"}</span> <span className="text-yellow-300">count</span>: <span className="text-orange-400">0</span>, <span className="text-yellow-300">history</span>: [...<span className="text-yellow-300">state</span>.<span className="text-yellow-300">history</span>, <span className="text-yellow-200">'Reset to 0'</span>] <span className="text-white">{"}"}</span>;{"\n"}
                      <span className="text-white">    </span><span className="text-blue-400">default</span>:{"\n"}
                      <span className="text-white">      </span><span className="text-blue-400">throw</span> <span className="text-blue-400">new</span> <span className="text-purple-400">Error</span>(<span className="text-yellow-200">`Unknown action type`</span>);{"\n"}
                      <span className="text-white">  {"}"}</span>{"\n"}
                      <span className="text-white">{"}"}</span>{"\n\n"}
                      
                      <span className="text-green-400">{"// Usage in component"}{"\n"}</span>
                      <span className="text-blue-400">const</span> [<span className="text-yellow-300">state</span>, <span className="text-yellow-300">dispatch</span>] = <span className="text-purple-400">useReducer</span>(<span className="text-yellow-300">counterReducer</span>, <span className="text-yellow-300">initialState</span>);{"\n"}
                      <span className="text-yellow-300">dispatch</span>(<span className="text-white">{"{"}</span> <span className="text-yellow-300">type</span>: <span className="text-yellow-200">'increment'</span> <span className="text-white">{"}"}</span>);
                    </code>
                  </pre>
                </div>
              )}
            </div>

            {/* Form Example */}
            <div className="p-6 bg-white rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-700">Form Handling with useReducer</h2>
                <button
                  onClick={() => setShowFormCode(!showFormCode)}
                  className="px-3 py-1 text-sm text-white transition-colors bg-gray-600 rounded hover:bg-gray-700"
                >
                  {showFormCode ? 'Hide Code' : 'View Code'}
                </button>
              </div>
              
              <div className="space-y-4">
                {!formState.submittedData ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Name</label>
                      <input
                        type="text"
                        value={formState.name}
                        onChange={(e) => formDispatch({ type: 'update_field', field: 'name', value: e.target.value })}
                        className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                          formState.errors.name ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter your name"
                      />
                      {formState.errors.name && (
                        <p className="mt-1 text-sm text-red-600">{formState.errors.name}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <input
                        type="email"
                        value={formState.email}
                        onChange={(e) => formDispatch({ type: 'update_field', field: 'email', value: e.target.value })}
                        className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                          formState.errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter your email"
                      />
                      {formState.errors.email && (
                        <p className="mt-1 text-sm text-red-600">{formState.errors.email}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Message</label>
                      <textarea
                        value={formState.message}
                        onChange={(e) => formDispatch({ type: 'update_field', field: 'message', value: e.target.value })}
                        rows={4}
                        className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                          formState.errors.message ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter your message"
                      />
                      {formState.errors.message && (
                        <p className="mt-1 text-sm text-red-600">{formState.errors.message}</p>
                      )}
                    </div>
                    
                    <div className="flex space-x-4">
                      <button
                        type="submit"
                        disabled={formState.isSubmitting}
                        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
                      >
                        {formState.isSubmitting ? 'Submitting...' : 'Submit'}
                      </button>
                      <button
                        type="button"
                        onClick={() => formDispatch({ type: 'reset_form' })}
                        className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        Reset
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="p-4 border border-green-200 rounded bg-green-50">
                    <h3 className="mb-2 font-medium text-green-800">✅ Form Submitted Successfully!</h3>
                    <div className="text-sm text-green-700">
                      <p><strong>Name:</strong> {formState.submittedData.name}</p>
                      <p><strong>Email:</strong> {formState.submittedData.email}</p>
                      <p><strong>Message:</strong> {formState.submittedData.message}</p>
                    </div>
                    <button
                      onClick={() => formDispatch({ type: 'reset_form' })}
                      className="px-4 py-2 mt-3 text-white bg-blue-500 rounded hover:bg-blue-600"
                    >
                      Submit Another
                    </button>
                  </div>
                )}
              </div>
              
              <p className="mt-4 text-sm text-gray-700">
                ✅ This example shows complex form state management with validation using useReducer
              </p>
              
              {showFormCode && (
                <div className="p-4 mt-4 border border-gray-200 rounded bg-gray-50">
                  <h3 className="mb-2 text-sm font-medium text-gray-700">Form Example Code:</h3>
                  <pre className="p-4 overflow-x-auto text-sm bg-gray-900 rounded">
                    <code>
                      <span className="text-green-400">{"// Form state interface"}{"\n"}</span>
                      <span className="text-blue-400">interface</span> <span className="text-yellow-300">FormState</span> <span className="text-white">{"{"}</span>{"\n"}
                      <span className="text-white">  </span><span className="text-yellow-300">name</span>: <span className="text-blue-300">string</span>;{"\n"}
                      <span className="text-white">  </span><span className="text-yellow-300">email</span>: <span className="text-blue-300">string</span>;{"\n"}
                      <span className="text-white">  </span><span className="text-yellow-300">message</span>: <span className="text-blue-300">string</span>;{"\n"}
                      <span className="text-white">  </span><span className="text-yellow-300">errors</span>: <span className="text-white">{"{"}</span> <span className="text-yellow-300">name</span>?: <span className="text-blue-300">string</span>; <span className="text-yellow-300">email</span>?: <span className="text-blue-300">string</span>; <span className="text-white">{"}"}</span>;{"\n"}
                      <span className="text-white">  </span><span className="text-yellow-300">isSubmitting</span>: <span className="text-blue-300">boolean</span>;{"\n"}
                      <span className="text-white">{"}"}</span>{"\n\n"}
                      
                      <span className="text-green-400">{"// Form reducer function"}{"\n"}</span>
                      <span className="text-blue-400">function</span> <span className="text-yellow-300">formReducer</span>(<span className="text-yellow-300">state</span>, <span className="text-yellow-300">action</span>) <span className="text-white">{"{"}</span>{"\n"}
                      <span className="text-white">  </span><span className="text-blue-400">switch</span> (<span className="text-yellow-300">action</span>.<span className="text-yellow-300">type</span>) <span className="text-white">{"{"}</span>{"\n"}
                      <span className="text-white">    </span><span className="text-blue-400">case</span> <span className="text-yellow-200">'update_field'</span>:{"\n"}
                      <span className="text-white">      </span><span className="text-blue-400">return</span> <span className="text-white">{"{"}</span>{"\n"}
                      <span className="text-white">        </span>...<span className="text-yellow-300">state</span>,{"\n"}
                      <span className="text-white">        </span>[<span className="text-yellow-300">action</span>.<span className="text-yellow-300">field</span>]: <span className="text-yellow-300">action</span>.<span className="text-yellow-300">value</span>,{"\n"}
                      <span className="text-white">        </span><span className="text-yellow-300">errors</span>: <span className="text-white">{"{"}</span> ...<span className="text-yellow-300">state</span>.<span className="text-yellow-300">errors</span>, [<span className="text-yellow-300">action</span>.<span className="text-yellow-300">field</span>]: <span className="text-blue-400">undefined</span> <span className="text-white">{"}"}</span>{"\n"}
                      <span className="text-white">      {"}"}</span>;{"\n"}
                      <span className="text-white">    </span><span className="text-blue-400">case</span> <span className="text-yellow-200">'set_error'</span>:{"\n"}
                      <span className="text-white">      </span><span className="text-blue-400">return</span> <span className="text-white">{"{"}</span> ...<span className="text-yellow-300">state</span>, <span className="text-yellow-300">errors</span>: <span className="text-white">{"{"}</span> ...<span className="text-yellow-300">state</span>.<span className="text-yellow-300">errors</span>, [<span className="text-yellow-300">action</span>.<span className="text-yellow-300">field</span>]: <span className="text-yellow-300">action</span>.<span className="text-yellow-300">error</span> <span className="text-white">{"}"}</span> <span className="text-white">{"}"}</span>;{"\n"}
                      <span className="text-white">    </span><span className="text-blue-400">default</span>:{"\n"}
                      <span className="text-white">      </span><span className="text-blue-400">throw</span> <span className="text-blue-400">new</span> <span className="text-purple-400">Error</span>(<span className="text-yellow-200">`Unknown action type`</span>);{"\n"}
                      <span className="text-white">  {"}"}</span>{"\n"}
                      <span className="text-white">{"}"}</span>{"\n\n"}
                      
                      <span className="text-green-400">{"// Usage in component"}{"\n"}</span>
                      <span className="text-blue-400">const</span> [<span className="text-yellow-300">formState</span>, <span className="text-yellow-300">formDispatch</span>] = <span className="text-purple-400">useReducer</span>(<span className="text-yellow-300">formReducer</span>, <span className="text-yellow-300">initialState</span>);{"\n"}
                      <span className="text-yellow-300">formDispatch</span>(<span className="text-white">{"{"}</span> <span className="text-yellow-300">type</span>: <span className="text-yellow-200">'update_field'</span>, <span className="text-yellow-300">field</span>: <span className="text-yellow-200">'name'</span>, <span className="text-yellow-300">value</span>: <span className="text-yellow-200">'John'</span> <span className="text-white">{"}"}</span>);
                    </code>
                  </pre>
                </div>
              )}
            </div>

            {/* useState vs useReducer Comparison */}
            <div className="p-6 bg-white rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-700">useState vs useReducer</h2>
                <button
                  onClick={() => setShowComparisonCode(!showComparisonCode)}
                  className="px-3 py-1 text-sm text-white transition-colors bg-gray-600 rounded hover:bg-gray-700"
                >
                  {showComparisonCode ? 'Hide Code' : 'View Code'}
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="p-4 border border-blue-200 rounded bg-blue-50">
                    <h3 className="mb-3 text-lg font-medium text-blue-800">useState</h3>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>✅ Simple state updates</li>
                      <li>✅ Independent state variables</li>
                      <li>✅ Less boilerplate code</li>
                      <li>✅ Good for basic state management</li>
                      <li>❌ Complex state logic becomes messy</li>
                      <li>❌ Multiple related state updates</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 border border-green-200 rounded bg-green-50">
                    <h3 className="mb-3 text-lg font-medium text-green-800">useReducer</h3>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>✅ Complex state logic</li>
                      <li>✅ Related state updates</li>
                      <li>✅ Predictable state transitions</li>
                      <li>✅ Better for testing</li>
                      <li>❌ More boilerplate code</li>
                      <li>❌ Overkill for simple state</li>
                    </ul>
                  </div>
                </div>
                
                <div className="p-4 border border-yellow-200 rounded bg-yellow-50">
                  <h3 className="mb-3 text-lg font-medium text-yellow-800">When to use useReducer:</h3>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• State has multiple sub-values</li>
                    <li>• Next state depends on previous state</li>
                    <li>• Complex state logic</li>
                    <li>• State transitions need to be predictable</li>
                    <li>• Multiple components need same state logic</li>
                    <li>• State updates involve multiple actions</li>
                  </ul>
                </div>
              </div>
              
              {showComparisonCode && (
                <div className="p-4 mt-4 border border-gray-200 rounded bg-gray-50">
                  <h3 className="mb-2 text-sm font-medium text-gray-700">Comparison Example:</h3>
                  <pre className="p-4 overflow-x-auto text-sm bg-gray-900 rounded">
                    <code>
                      <span className="text-green-400">{"// useState approach (simple counter)"}{"\n"}</span>
                      <span className="text-blue-400">const</span> [<span className="text-yellow-300">count</span>, <span className="text-yellow-300">setCount</span>] = <span className="text-purple-400">useState</span>(<span className="text-orange-400">0</span>);{"\n"}
                      <span className="text-blue-400">const</span> <span className="text-yellow-300">increment</span> = <span className="text-white">()</span> <span className="text-cyan-400">{"=>"}</span> <span className="text-purple-400">setCount</span>(<span className="text-yellow-300">prev</span> <span className="text-cyan-400">{"=>"}</span> <span className="text-yellow-300">prev</span> + <span className="text-orange-400">1</span>);{"\n"}
                      <span className="text-blue-400">const</span> <span className="text-yellow-300">decrement</span> = <span className="text-white">()</span> <span className="text-cyan-400">{"=>"}</span> <span className="text-purple-400">setCount</span>(<span className="text-yellow-300">prev</span> <span className="text-cyan-400">{"=>"}</span> <span className="text-yellow-300">prev</span> - <span className="text-orange-400">1</span>);{"\n\n"}
                      
                      <span className="text-green-400">{"// useReducer approach (complex counter with history)"}{"\n"}</span>
                      <span className="text-blue-400">const</span> [<span className="text-yellow-300">state</span>, <span className="text-yellow-300">dispatch</span>] = <span className="text-purple-400">useReducer</span>(<span className="text-yellow-300">counterReducer</span>, <span className="text-yellow-300">initialState</span>);{"\n"}
                      <span className="text-blue-400">const</span> <span className="text-yellow-300">increment</span> = <span className="text-white">()</span> <span className="text-cyan-400">{"=>"}</span> <span className="text-purple-400">dispatch</span>(<span className="text-white">{"{"}</span> <span className="text-yellow-300">type</span>: <span className="text-yellow-200">'increment'</span> <span className="text-white">{"}"}</span>);{"\n"}
                      <span className="text-blue-400">const</span> <span className="text-yellow-300">decrement</span> = <span className="text-white">()</span> <span className="text-cyan-400">{"=>"}</span> <span className="text-purple-400">dispatch</span>(<span className="text-white">{"{"}</span> <span className="text-yellow-300">type</span>: <span className="text-yellow-200">'decrement'</span> <span className="text-white">{"}"}</span>);{"\n\n"}
                      
                      <span className="text-green-400">{"// useReducer benefits:"}{"\n"}</span>
                      <span className="text-green-400">{"// - Centralized state logic"}{"\n"}</span>
                      <span className="text-green-400">{"// - Predictable state transitions"}{"\n"}</span>
                      <span className="text-green-400">{"// - Easy to test reducer functions"}{"\n"}</span>
                      <span className="text-green-400">{"// - Better for complex state management"}</span>
                    </code>
                  </pre>
                </div>
              )}
            </div>

            {/* Best Practices */}
            <div className="p-6 bg-white rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-700">Best Practices & Common Gotchas</h2>
                <button
                  onClick={() => setShowReducerCode(!showReducerCode)}
                  className="px-3 py-1 text-sm text-white transition-colors bg-gray-600 rounded hover:bg-gray-700"
                >
                  {showReducerCode ? 'Hide Code' : 'View Code'}
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="p-4 border border-green-200 rounded bg-green-50">
                  <h3 className="mb-2 text-lg font-medium text-green-800">✅ Best Practices</h3>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Always return new state objects (don't mutate)</li>
                    <li>• Use TypeScript for type safety</li>
                    <li>• Keep reducer functions pure (no side effects)</li>
                    <li>• Use switch statements for action types</li>
                    <li>• Throw errors for unknown actions</li>
                    <li>• Use action creators for complex payloads</li>
                  </ul>
                </div>
                
                <div className="p-4 border border-red-200 rounded bg-red-50">
                  <h3 className="mb-2 text-lg font-medium text-red-800">❌ Common Gotchas</h3>
                  <ul className="text-sm text-red-700 space-y-1">
                    <li>• Mutating state directly instead of returning new object</li>
                    <li>• Forgetting to handle all action types</li>
                    <li>• Making reducer functions impure (side effects)</li>
                    <li>• Using useReducer for simple state (overkill)</li>
                    <li>• Not using TypeScript (loses type safety)</li>
                    <li>• Putting too much logic in components instead of reducer</li>
                  </ul>
                </div>
                
                <div className="p-4 border border-blue-200 rounded bg-blue-50">
                  <h3 className="mb-2 text-lg font-medium text-blue-800">💡 Pro Tips</h3>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Combine with useContext for global state management</li>
                    <li>• Use useCallback for dispatch functions passed to children</li>
                    <li>• Test reducer functions separately from components</li>
                    <li>• Consider using immer for complex state updates</li>
                    <li>• Create action creators for better maintainability</li>
                    <li>• Use lazy initialization for expensive initial state</li>
                  </ul>
                </div>
              </div>
              
              {showReducerCode && (
                <div className="p-4 mt-4 border border-gray-200 rounded bg-gray-50">
                  <h3 className="mb-2 text-sm font-medium text-gray-700">Best Practices Example:</h3>
                  <pre className="p-4 overflow-x-auto text-sm bg-gray-900 rounded">
                    <code>
                      <span className="text-green-400">{"// ✅ Good: Pure reducer with TypeScript"}{"\n"}</span>
                      <span className="text-blue-400">function</span> <span className="text-yellow-300">counterReducer</span>(<span className="text-yellow-300">state</span>: <span className="text-blue-300">CounterState</span>, <span className="text-yellow-300">action</span>: <span className="text-blue-300">CounterAction</span>) <span className="text-white">{"{"}</span>{"\n"}
                      <span className="text-white">  </span><span className="text-blue-400">switch</span> (<span className="text-yellow-300">action</span>.<span className="text-yellow-300">type</span>) <span className="text-white">{"{"}</span>{"\n"}
                      <span className="text-white">    </span><span className="text-blue-400">case</span> <span className="text-yellow-200">'increment'</span>:{"\n"}
                      <span className="text-white">      </span><span className="text-blue-400">return</span> <span className="text-white">{"{"}</span> ...<span className="text-yellow-300">state</span>, <span className="text-yellow-300">count</span>: <span className="text-yellow-300">state</span>.<span className="text-yellow-300">count</span> + <span className="text-orange-400">1</span> <span className="text-white">{"}"}</span>; <span className="text-green-400">{"// New object"}</span>{"\n"}
                      <span className="text-white">    </span><span className="text-blue-400">default</span>:{"\n"}
                      <span className="text-white">      </span><span className="text-blue-400">throw</span> <span className="text-blue-400">new</span> <span className="text-purple-400">Error</span>(<span className="text-yellow-200">`Unknown action: ${"{action.type}"}`</span>); <span className="text-green-400">{"// Handle unknown actions"}</span>{"\n"}
                      <span className="text-white">  {"}"}</span>{"\n"}
                      <span className="text-white">{"}"}</span>{"\n\n"}
                      
                      <span className="text-green-400">{"// ❌ Bad: Mutating state directly"}{"\n"}</span>
                      <span className="text-blue-400">function</span> <span className="text-yellow-300">badReducer</span>(<span className="text-yellow-300">state</span>, <span className="text-yellow-300">action</span>) <span className="text-white">{"{"}</span>{"\n"}
                      <span className="text-white">  </span><span className="text-blue-400">switch</span> (<span className="text-yellow-300">action</span>.<span className="text-yellow-300">type</span>) <span className="text-white">{"{"}</span>{"\n"}
                      <span className="text-white">    </span><span className="text-blue-400">case</span> <span className="text-yellow-200">'increment'</span>:{"\n"}
                      <span className="text-white">      </span><span className="text-yellow-300">state</span>.<span className="text-yellow-300">count</span>++; <span className="text-red-400">{"// ❌ Direct mutation"}</span>{"\n"}
                      <span className="text-white">      </span><span className="text-blue-400">return</span> <span className="text-yellow-300">state</span>; <span className="text-red-400">{"// ❌ Same object reference"}</span>{"\n"}
                      <span className="text-white">  {"}"}</span>{"\n"}
                      <span className="text-white">{"}"}</span>{"\n\n"}
                      
                      <span className="text-green-400">{"// ✅ Good: Action creators for complex payloads"}{"\n"}</span>
                      <span className="text-blue-400">const</span> <span className="text-yellow-300">actionCreators</span> = <span className="text-white">{"{"}</span>{"\n"}
                      <span className="text-white">  </span><span className="text-yellow-300">updateField</span>: (<span className="text-yellow-300">field</span>: <span className="text-blue-300">string</span>, <span className="text-yellow-300">value</span>: <span className="text-blue-300">string</span>) <span className="text-cyan-400">{"=>"}</span> (<span className="text-white">{"{"}</span>{"\n"}
                      <span className="text-white">    </span><span className="text-yellow-300">type</span>: <span className="text-yellow-200">'update_field'</span> <span className="text-blue-400">as</span> <span className="text-blue-400">const</span>,{"\n"}
                      <span className="text-white">    </span><span className="text-yellow-300">field</span>,{"\n"}
                      <span className="text-white">    </span><span className="text-yellow-300">value</span>{"\n"}
                      <span className="text-white">  {"}"}</span>){"\n"}
                      <span className="text-white">{"}"}</span>;
                    </code>
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}