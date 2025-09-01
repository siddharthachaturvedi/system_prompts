import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-100 py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="max-w-md w-full space-y-8">
        {/* Logo and branding */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-medium hover:shadow-strong hover:scale-105 transition-all duration-300">
            <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h2 className="mt-8 text-3xl font-bold text-gray-900">
            LLM Manager
          </h2>
          <p className="mt-3 text-base text-gray-600">
            Manage your AI conversations and prompts
          </p>
        </div>

        {/* Auth form content */}
        <div className="bg-white/95 backdrop-blur-sm py-8 px-6 shadow-strong rounded-2xl border border-white/20 animate-slide-up">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;