import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/atoms/Button/Button';
import { ChatBubbleLeftRightIcon, PlusIcon, SparklesIcon } from '@heroicons/react/24/outline';

const Conversations: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Conversations</h1>
        <Button variant="primary" leftIcon={<PlusIcon className="h-4 w-4" />}>
          New Conversation
        </Button>
      </div>
      
      <div className="bg-gradient-to-br from-white to-primary-50/30 rounded-2xl shadow-soft border border-gray-200 p-12 text-center">
        <div className="max-w-lg mx-auto">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-primary-100 rounded-full blur-xl opacity-30 animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-4 shadow-medium">
              <ChatBubbleLeftRightIcon className="h-12 w-12 text-white mx-auto" />
            </div>
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Start Your First Conversation</h3>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            Connect with powerful AI models through our intuitive chat interface. 
            Your conversations are automatically saved and organized for easy access.
          </p>
          
          <div className="space-y-4">
            <Button 
              variant="primary" 
              size="lg"
              leftIcon={<SparklesIcon className="h-5 w-5" />}
              className="w-full sm:w-auto"
            >
              Start Chatting Now
            </Button>
            
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Real-time responses</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>Auto-saved history</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span>Multi-LLM support</span>
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h4 className="font-semibold text-gray-900 mb-2">Lightning Fast</h4>
          <p className="text-sm text-gray-600">Get responses in seconds with optimized streaming</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-soft border border-gray-200 p-6 text-center hover:shadow-medium transition-all duration-300">
          <div className="bg-green-100 rounded-xl p-3 w-fit mx-auto mb-4">
            <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h4 className="font-semibold text-gray-900 mb-2">Always Secure</h4>
          <p className="text-sm text-gray-600">End-to-end encryption for all conversations</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-soft border border-gray-200 p-6 text-center hover:shadow-medium transition-all duration-300">
          <div className="bg-purple-100 rounded-xl p-3 w-fit mx-auto mb-4">
            <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14-7H5m14 14H5" />
            </svg>
          </div>
          <h4 className="font-semibold text-gray-900 mb-2">Organized</h4>
          <p className="text-sm text-gray-600">Smart categorization and search capabilities</p>
        </div>
      </div>
    </div>
  );
};

export default Conversations;