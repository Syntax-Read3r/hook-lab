import Link from 'next/link';

export default function Home() {
  const hookTasks = [
    {
      id: 1,
      title: 'useState',
      description: 'Counter, toggle switch, and state management patterns',
      path: '/hooks/use-state',
      status: 'completed'
    },
    {
      id: 2,
      title: 'useEffect',
      description: 'API data fetching and cleanup functions',
      path: '/hooks/use-effect',
      status: 'pending'
    },
    {
      id: 3,
      title: 'useReducer',
      description: 'Counter with reducer logic and form handling',
      path: '/hooks/use-reducer',
      status: 'pending'
    },
    {
      id: 4,
      title: 'useRef',
      description: 'Focus input fields and track previous values',
      path: '/hooks/use-ref',
      status: 'pending'
    },
    {
      id: 5,
      title: 'useContext',
      description: 'Global theme switcher without prop drilling',
      path: '/hooks/use-context',
      status: 'pending'
    },
    {
      id: 6,
      title: 'useLayoutEffect',
      description: 'Measure DOM size and layout shift detection',
      path: '/hooks/use-layout-effect',
      status: 'pending'
    },
    {
      id: 7,
      title: 'useInsertionEffect',
      description: 'Inject styles before layout',
      path: '/hooks/use-insertion-effect',
      status: 'pending'
    },
    {
      id: 8,
      title: 'useDeferredValue',
      description: 'Slow search input with deferred rendering',
      path: '/hooks/use-deferred-value',
      status: 'pending'
    },
    {
      id: 9,
      title: 'useImperativeHandle',
      description: 'Custom input component with exposed methods',
      path: '/hooks/use-imperative-handle',
      status: 'pending'
    },
    {
      id: 10,
      title: 'useTransition',
      description: 'Slow state updates with transition fallback',
      path: '/hooks/use-transition',
      status: 'pending'
    },
    {
      id: 11,
      title: 'useSyncExternalStore',
      description: 'External store for window size tracking',
      path: '/hooks/use-sync-external-store',
      status: 'pending'
    },
    {
      id: 12,
      title: 'useId',
      description: 'Prevent ID collisions in form fields',
      path: '/hooks/use-id',
      status: 'pending'
    }
  ];

  const nextFeatures = [
    {
      id: 13,
      title: 'File-based Routing',
      description: 'Create pages with next/link navigation',
      path: '/next-features/routing',
      status: 'pending'
    },
    {
      id: 14,
      title: 'Layouts',
      description: 'Persistent navbar and footer layout',
      path: '/next-features/layout-demo',
      status: 'pending'
    },
    {
      id: 15,
      title: 'Metadata',
      description: 'SEO metadata with generateMetadata',
      path: '/next-features/metadata',
      status: 'pending'
    },
    {
      id: 16,
      title: 'Loading States',
      description: 'Suspense and lazy loading demos',
      path: '/next-features/loading',
      status: 'pending'
    },
    {
      id: 17,
      title: 'Server vs Client',
      description: 'Server actions vs useEffect comparison',
      path: '/next-features/server-client-fetch',
      status: 'pending'
    },
    {
      id: 18,
      title: 'API Routes',
      description: 'JSON API endpoint example',
      path: '/next-features/api-example',
      status: 'pending'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🪝 Hook Lab
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Interactive playground for mastering React Hooks and Next.js features. 
            Each demo includes working examples, code explanations, and common gotchas.
          </p>
        </header>

        {/* React Hooks Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
            ⚛️ React Hooks
            <span className="ml-3 text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
              Phase 1
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hookTasks.map((task) => (
              <Link
                key={task.id}
                href={task.path}
                className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6 border border-gray-200"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {task.title}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    task.status === 'completed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {task.status === 'completed' ? '✓' : '○'}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4">{task.description}</p>
                <div className="flex items-center text-blue-600 text-sm font-medium">
                  Try it out →
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Next.js Features Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
            ⚡ Next.js Features
            <span className="ml-3 text-sm bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
              Phase 2
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nextFeatures.map((feature) => (
              <Link
                key={feature.id}
                href={feature.path}
                className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6 border border-gray-200"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {feature.title}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    feature.status === 'completed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {feature.status === 'completed' ? '✓' : '○'}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4">{feature.description}</p>
                <div className="flex items-center text-purple-600 text-sm font-medium">
                  Explore →
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-500 text-sm">
          <p>Built with Next.js 15 + React 19 + TypeScript + Tailwind CSS</p>
        </footer>
      </div>
    </div>
  );
}