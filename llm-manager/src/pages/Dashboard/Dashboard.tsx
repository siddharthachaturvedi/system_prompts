import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useGetAnalyticsQuery, useGetPromptsQuery, useGetConversationsQuery } from '../../store/api';
import {
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  CurrencyDollarIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import Button from '../../components/atoms/Button/Button';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { currentWorkspace } = useSelector((state: RootState) => state.workspace);
  const { activeProvider, activeModel } = useSelector((state: RootState) => state.llm);
  
  const { data: analyticsData } = useGetAnalyticsQuery(
    { workspaceId: currentWorkspace?.id || '', timeRange: '7d' },
    { skip: !currentWorkspace }
  );
  
  const { data: promptsData } = useGetPromptsQuery(
    { workspaceId: currentWorkspace?.id || '', limit: 5 },
    { skip: !currentWorkspace }
  );
  
  const { data: conversationsData } = useGetConversationsQuery(
    { workspaceId: currentWorkspace?.id || '', limit: 5 },
    { skip: !currentWorkspace }
  );

  const stats = [
    {
      name: 'Total Conversations',
      value: analyticsData?.data.usage.totalRequests || 0,
      icon: ChatBubbleLeftRightIcon,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      name: 'Saved Prompts',
      value: promptsData?.pagination.total || 0,
      icon: DocumentTextIcon,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      name: 'Total Cost',
      value: `$${analyticsData?.data.costs.totalCost.toFixed(2) || '0.00'}`,
      icon: CurrencyDollarIcon,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
    {
      name: 'Avg Response Time',
      value: `${analyticsData?.data.performance.averageResponseTime.toFixed(1) || '0.0'}s`,
      icon: ClockIcon,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back to {currentWorkspace?.name || 'LLM Manager'}
            </h1>
            <p className="mt-1 text-gray-600">
              Currently using: <span className="font-medium">{activeProvider}</span>
              {activeModel && ` - ${activeModel}`}
            </p>
          </div>
          <div className="flex space-x-3">
            <Link to="/conversations">
              <Button variant="primary">
                Start New Conversation
              </Button>
            </Link>
            <Link to="/prompts">
              <Button variant="secondary">
                Create Prompt
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Conversations */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Conversations</h2>
            <Link to="/conversations" className="text-sm text-primary-600 hover:text-primary-700">
              View all
            </Link>
          </div>
          
          <div className="space-y-3">
            {conversationsData?.data.slice(0, 5).map((conversation) => (
              <div key={conversation.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {conversation.title}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(conversation.updatedAt).toLocaleDateString()} • {conversation.llmProvider}
                  </p>
                </div>
                <Link
                  to={`/conversations/${conversation.id}`}
                  className="text-sm text-primary-600 hover:text-primary-700"
                >
                  Continue
                </Link>
              </div>
            )) || (
              <p className="text-sm text-gray-500 text-center py-4">
                No conversations yet. Start your first conversation!
              </p>
            )}
          </div>
        </div>

        {/* Recent Prompts */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Prompts</h2>
            <Link to="/prompts" className="text-sm text-primary-600 hover:text-primary-700">
              View all
            </Link>
          </div>
          
          <div className="space-y-3">
            {promptsData?.data.slice(0, 5).map((prompt) => (
              <div key={prompt.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {prompt.title}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <p className="text-xs text-gray-500">
                      {new Date(prompt.updatedAt).toLocaleDateString()}
                    </p>
                    {prompt.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <Link
                  to={`/prompts/${prompt.id}`}
                  className="text-sm text-primary-600 hover:text-primary-700"
                >
                  Edit
                </Link>
              </div>
            )) || (
              <p className="text-sm text-gray-500 text-center py-4">
                No prompts yet. Create your first prompt!
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/conversations"
            className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all group"
          >
            <ChatBubbleLeftRightIcon className="h-8 w-8 text-gray-400 group-hover:text-primary-600 mb-2" />
            <h3 className="font-medium text-gray-900">Start Conversation</h3>
            <p className="text-sm text-gray-600 mt-1">
              Begin a new chat with your selected LLM
            </p>
          </Link>
          
          <Link
            to="/prompts/new"
            className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all group"
          >
            <DocumentTextIcon className="h-8 w-8 text-gray-400 group-hover:text-primary-600 mb-2" />
            <h3 className="font-medium text-gray-900">Create Prompt</h3>
            <p className="text-sm text-gray-600 mt-1">
              Design and save reusable prompts
            </p>
          </Link>
          
          <Link
            to="/batch"
            className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all group"
          >
            <svg className="h-8 w-8 text-gray-400 group-hover:text-primary-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14-7H5m14 14H5" />
            </svg>
            <h3 className="font-medium text-gray-900">Batch Process</h3>
            <p className="text-sm text-gray-600 mt-1">
              Process multiple inputs at once
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;