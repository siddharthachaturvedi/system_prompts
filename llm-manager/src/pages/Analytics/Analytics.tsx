import React from 'react';
import Button from '../../components/atoms/Button/Button';
import { ChartBarIcon, EyeIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

const Analytics: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <Button variant="secondary" leftIcon={<EyeIcon className="h-4 w-4" />}>
          View Reports
        </Button>
      </div>
      
      <div className="bg-gradient-to-br from-white to-blue-50/30 rounded-2xl shadow-soft border border-gray-200 p-12 text-center">
        <div className="max-w-lg mx-auto">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-blue-100 rounded-full blur-xl opacity-30 animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-4 shadow-medium">
              <ChartBarIcon className="h-12 w-12 text-white mx-auto" />
            </div>
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Powerful Analytics Dashboard</h3>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            Track usage patterns, monitor costs, and optimize your LLM performance with 
            comprehensive analytics and insights.
          </p>
          
          <div className="space-y-4">
            <Button 
              variant="primary" 
              size="lg"
              leftIcon={<ChartBarIcon className="h-5 w-5" />}
              className="w-full sm:w-auto"
            >
              Explore Analytics
            </Button>
            
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>Usage tracking</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Cost optimization</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span>Performance metrics</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Feature highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-soft border border-gray-200 p-6 text-center hover:shadow-medium transition-all duration-300">
          <div className="bg-blue-100 rounded-xl p-3 w-fit mx-auto mb-4">
            <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <h4 className="font-semibold text-gray-900 mb-2">Usage Trends</h4>
          <p className="text-sm text-gray-600">Monitor usage patterns and identify peak times</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-soft border border-gray-200 p-6 text-center hover:shadow-medium transition-all duration-300">
          <div className="bg-green-100 rounded-xl p-3 w-fit mx-auto mb-4">
            <CurrencyDollarIcon className="h-6 w-6 text-green-600" />
          </div>
          <h4 className="font-semibold text-gray-900 mb-2">Cost Analysis</h4>
          <p className="text-sm text-gray-600">Track spending and optimize budget allocation</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-soft border border-gray-200 p-6 text-center hover:shadow-medium transition-all duration-300">
          <div className="bg-purple-100 rounded-xl p-3 w-fit mx-auto mb-4">
            <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h4 className="font-semibold text-gray-900 mb-2">Performance Insights</h4>
          <p className="text-sm text-gray-600">Compare LLM performance and response quality</p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;