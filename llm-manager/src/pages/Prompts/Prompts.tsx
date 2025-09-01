import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/atoms/Button/Button';
import { DocumentTextIcon, PlusIcon, BeakerIcon, ShareIcon } from '@heroicons/react/24/outline';

const Prompts: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Prompt Library</h1>
        <Button variant="primary" leftIcon={<PlusIcon className="h-4 w-4" />}>
          Create Prompt
        </Button>
      </div>
      
      <div className="bg-gradient-to-br from-white to-green-50/30 rounded-2xl shadow-soft border border-gray-200 p-12 text-center">
        <div className="max-w-lg mx-auto">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-green-100 rounded-full blur-xl opacity-30 animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-4 shadow-medium">
              <DocumentTextIcon className="h-12 w-12 text-white mx-auto" />
            </div>
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Build Your Prompt Library</h3>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            Create, organize, and share powerful prompts that deliver consistent results. 
            Transform your best ideas into reusable templates.
          </p>
          
          <div className="space-y-4">
            <Button 
              variant="primary" 
              size="lg"
              leftIcon={<BeakerIcon className="h-5 w-5" />}
              className="w-full sm:w-auto"
            >
              Create Your First Prompt
            </Button>
            
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Variable support</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>Version control</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span>Team sharing</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Feature highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-soft border border-gray-200 p-6 text-center hover:shadow-medium transition-all duration-300">
          <div className="bg-orange-100 rounded-xl p-3 w-fit mx-auto mb-4">
            <svg className="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          </div>
          <h4 className="font-semibold text-gray-900 mb-2">Smart Tagging</h4>
          <p className="text-sm text-gray-600">Organize prompts with intelligent categorization</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-soft border border-gray-200 p-6 text-center hover:shadow-medium transition-all duration-300">
          <div className="bg-indigo-100 rounded-xl p-3 w-fit mx-auto mb-4">
            <BeakerIcon className="h-6 w-6 text-indigo-600" />
          </div>
          <h4 className="font-semibold text-gray-900 mb-2">Test & Refine</h4>
          <p className="text-sm text-gray-600">Built-in testing tools for prompt optimization</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-soft border border-gray-200 p-6 text-center hover:shadow-medium transition-all duration-300">
          <div className="bg-pink-100 rounded-xl p-3 w-fit mx-auto mb-4">
            <ShareIcon className="h-6 w-6 text-pink-600" />
          </div>
          <h4 className="font-semibold text-gray-900 mb-2">Team Collaboration</h4>
          <p className="text-sm text-gray-600">Share and collaborate on prompts with your team</p>
        </div>
      </div>
    </div>
  );
};

export default Prompts;