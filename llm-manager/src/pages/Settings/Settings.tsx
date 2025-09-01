import React from 'react';
import Button from '../../components/atoms/Button/Button';
import { Cog6ToothIcon, KeyIcon, UserIcon, BellIcon } from '@heroicons/react/24/outline';

const Settings: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <Button variant="secondary" leftIcon={<Cog6ToothIcon className="h-4 w-4" />}>
          Advanced Settings
        </Button>
      </div>
      
      <div className="bg-gradient-to-br from-white to-gray-50/50 rounded-2xl shadow-soft border border-gray-200 p-12 text-center">
        <div className="max-w-lg mx-auto">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-gray-100 rounded-full blur-xl opacity-30 animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-gray-600 to-gray-700 rounded-2xl p-4 shadow-medium">
              <Cog6ToothIcon className="h-12 w-12 text-white mx-auto" />
            </div>
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Customize Your Experience</h3>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            Personalize your workspace, manage API keys, configure preferences, 
            and control how you interact with AI models.
          </p>
          
          <div className="space-y-4">
            <Button 
              variant="primary" 
              size="lg"
              leftIcon={<UserIcon className="h-5 w-5" />}
              className="w-full sm:w-auto"
            >
              Manage Profile
            </Button>
            
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>API management</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Privacy controls</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span>Team permissions</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Settings categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-soft border border-gray-200 p-6 text-center hover:shadow-medium hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
          <div className="bg-blue-100 rounded-xl p-3 w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
            <UserIcon className="h-6 w-6 text-blue-600" />
          </div>
          <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-primary-700 transition-colors duration-200">Profile</h4>
          <p className="text-sm text-gray-600">Personal information and preferences</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-soft border border-gray-200 p-6 text-center hover:shadow-medium hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
          <div className="bg-green-100 rounded-xl p-3 w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
            <KeyIcon className="h-6 w-6 text-green-600" />
          </div>
          <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-primary-700 transition-colors duration-200">API Keys</h4>
          <p className="text-sm text-gray-600">Manage your LLM provider credentials</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-soft border border-gray-200 p-6 text-center hover:shadow-medium hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
          <div className="bg-purple-100 rounded-xl p-3 w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
            <BellIcon className="h-6 w-6 text-purple-600" />
          </div>
          <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-primary-700 transition-colors duration-200">Notifications</h4>
          <p className="text-sm text-gray-600">Configure alerts and communication preferences</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-soft border border-gray-200 p-6 text-center hover:shadow-medium hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
          <div className="bg-red-100 rounded-xl p-3 w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
            <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-primary-700 transition-colors duration-200">Security</h4>
          <p className="text-sm text-gray-600">Privacy settings and security options</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;