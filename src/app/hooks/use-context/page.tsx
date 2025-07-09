'use client';

import Navbar from '@/components/Navbar';

export default function UseContextPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="mb-8 text-3xl font-bold text-center text-gray-800">
            useContext Hook Demo
          </h1>
          
          <div className="p-6 mb-8 bg-white rounded-lg shadow-md">
            <h2 className="mb-4 text-xl font-semibold text-gray-700">Coming Soon</h2>
            <p className="text-gray-700">
              This page is under construction. The useContext hook demonstration will be available soon.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}