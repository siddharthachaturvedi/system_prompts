import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../index';
import {
  User,
  Workspace,
  LLMProvider,
  Prompt,
  Conversation,
  BatchJob,
  Workflow,
  AnalyticsData,
  ApiResponse,
  PaginatedResponse,
  SearchFilters,
} from '../../types';

const baseQuery = fetchBaseQuery({
  baseUrl: '/api',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    headers.set('content-type', 'application/json');
    return headers;
  },
});

export const api = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: [
    'User',
    'Workspace',
    'LLMProvider',
    'Prompt',
    'Conversation',
    'BatchJob',
    'Workflow',
    'Analytics',
  ],
  endpoints: (builder) => ({
    // Authentication endpoints
    login: builder.mutation<
      ApiResponse<{ user: User; token: string }>,
      { email: string; password: string }
    >({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),

    register: builder.mutation<
      ApiResponse<{ user: User; token: string }>,
      { name: string; email: string; password: string }
    >({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
      }),
    }),

    refreshToken: builder.mutation<ApiResponse<{ token: string }>, void>({
      query: () => ({
        url: '/auth/refresh',
        method: 'POST',
      }),
    }),

    // User endpoints
    getCurrentUser: builder.query<ApiResponse<User>, void>({
      query: () => '/auth/me',
      providesTags: ['User'],
    }),

    updateUser: builder.mutation<ApiResponse<User>, Partial<User>>({
      query: (userData) => ({
        url: '/auth/me',
        method: 'PATCH',
        body: userData,
      }),
      invalidatesTags: ['User'],
    }),

    // Workspace endpoints
    getWorkspaces: builder.query<ApiResponse<Workspace[]>, void>({
      query: () => '/workspaces',
      providesTags: ['Workspace'],
    }),

    getWorkspace: builder.query<ApiResponse<Workspace>, string>({
      query: (id) => `/workspaces/${id}`,
      providesTags: (result, error, id) => [{ type: 'Workspace', id }],
    }),

    createWorkspace: builder.mutation<ApiResponse<Workspace>, Partial<Workspace>>({
      query: (workspace) => ({
        url: '/workspaces',
        method: 'POST',
        body: workspace,
      }),
      invalidatesTags: ['Workspace'],
    }),

    updateWorkspace: builder.mutation<
      ApiResponse<Workspace>,
      { id: string; data: Partial<Workspace> }
    >({
      query: ({ id, data }) => ({
        url: `/workspaces/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Workspace', id }],
    }),

    // LLM Provider endpoints
    getLLMProviders: builder.query<ApiResponse<LLMProvider[]>, void>({
      query: () => '/llms/providers',
      providesTags: ['LLMProvider'],
    }),

    testLLMConnection: builder.mutation<
      ApiResponse<{ status: string; latency: number }>,
      { providerId: string; modelId: string }
    >({
      query: (data) => ({
        url: '/llms/test',
        method: 'POST',
        body: data,
      }),
    }),

    executeLLM: builder.mutation<
      ApiResponse<{ response: string; metadata: any }>,
      {
        providerId: string;
        modelId: string;
        prompt: string;
        config?: Record<string, any>;
      }
    >({
      query: (data) => ({
        url: '/llms/execute',
        method: 'POST',
        body: data,
      }),
    }),

    // Prompt endpoints
    getPrompts: builder.query<
      PaginatedResponse<Prompt>,
      { workspaceId: string; filters?: SearchFilters; page?: number; limit?: number }
    >({
      query: ({ workspaceId, filters, page = 1, limit = 20 }) => ({
        url: '/prompts',
        params: { workspaceId, ...filters, page, limit },
      }),
      providesTags: ['Prompt'],
    }),

    getPrompt: builder.query<ApiResponse<Prompt>, string>({
      query: (id) => `/prompts/${id}`,
      providesTags: (result, error, id) => [{ type: 'Prompt', id }],
    }),

    createPrompt: builder.mutation<ApiResponse<Prompt>, Partial<Prompt>>({
      query: (prompt) => ({
        url: '/prompts',
        method: 'POST',
        body: prompt,
      }),
      invalidatesTags: ['Prompt'],
    }),

    updatePrompt: builder.mutation<
      ApiResponse<Prompt>,
      { id: string; data: Partial<Prompt> }
    >({
      query: ({ id, data }) => ({
        url: `/prompts/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Prompt', id }],
    }),

    deletePrompt: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `/prompts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Prompt'],
    }),

    // Conversation endpoints
    getConversations: builder.query<
      PaginatedResponse<Conversation>,
      { workspaceId: string; filters?: SearchFilters; page?: number; limit?: number }
    >({
      query: ({ workspaceId, filters, page = 1, limit = 20 }) => ({
        url: '/conversations',
        params: { workspaceId, ...filters, page, limit },
      }),
      providesTags: ['Conversation'],
    }),

    getConversation: builder.query<ApiResponse<Conversation>, string>({
      query: (id) => `/conversations/${id}`,
      providesTags: (result, error, id) => [{ type: 'Conversation', id }],
    }),

    createConversation: builder.mutation<ApiResponse<Conversation>, Partial<Conversation>>({
      query: (conversation) => ({
        url: '/conversations',
        method: 'POST',
        body: conversation,
      }),
      invalidatesTags: ['Conversation'],
    }),

    updateConversation: builder.mutation<
      ApiResponse<Conversation>,
      { id: string; data: Partial<Conversation> }
    >({
      query: ({ id, data }) => ({
        url: `/conversations/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Conversation', id }],
    }),

    deleteConversation: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `/conversations/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Conversation'],
    }),

    // Batch Job endpoints
    getBatchJobs: builder.query<
      PaginatedResponse<BatchJob>,
      { workspaceId: string; page?: number; limit?: number }
    >({
      query: ({ workspaceId, page = 1, limit = 20 }) => ({
        url: '/batch-jobs',
        params: { workspaceId, page, limit },
      }),
      providesTags: ['BatchJob'],
    }),

    createBatchJob: builder.mutation<ApiResponse<BatchJob>, Partial<BatchJob>>({
      query: (job) => ({
        url: '/batch-jobs',
        method: 'POST',
        body: job,
      }),
      invalidatesTags: ['BatchJob'],
    }),

    getBatchJobStatus: builder.query<ApiResponse<BatchJob>, string>({
      query: (id) => `/batch-jobs/${id}`,
      providesTags: (result, error, id) => [{ type: 'BatchJob', id }],
    }),

    cancelBatchJob: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `/batch-jobs/${id}/cancel`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'BatchJob', id }],
    }),

    // Workflow endpoints
    getWorkflows: builder.query<
      PaginatedResponse<Workflow>,
      { workspaceId: string; page?: number; limit?: number }
    >({
      query: ({ workspaceId, page = 1, limit = 20 }) => ({
        url: '/workflows',
        params: { workspaceId, page, limit },
      }),
      providesTags: ['Workflow'],
    }),

    createWorkflow: builder.mutation<ApiResponse<Workflow>, Partial<Workflow>>({
      query: (workflow) => ({
        url: '/workflows',
        method: 'POST',
        body: workflow,
      }),
      invalidatesTags: ['Workflow'],
    }),

    executeWorkflow: builder.mutation<
      ApiResponse<{ executionId: string; status: string }>,
      { id: string; inputs?: Record<string, any> }
    >({
      query: ({ id, inputs }) => ({
        url: `/workflows/${id}/execute`,
        method: 'POST',
        body: { inputs },
      }),
    }),

    // Analytics endpoints
    getAnalytics: builder.query<
      ApiResponse<AnalyticsData>,
      { workspaceId: string; timeRange: string }
    >({
      query: ({ workspaceId, timeRange }) => ({
        url: '/analytics',
        params: { workspaceId, timeRange },
      }),
      providesTags: ['Analytics'],
    }),

    getUsageReport: builder.query<
      ApiResponse<any>,
      { workspaceId: string; startDate: string; endDate: string }
    >({
      query: ({ workspaceId, startDate, endDate }) => ({
        url: '/analytics/usage',
        params: { workspaceId, startDate, endDate },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useRefreshTokenMutation,
  useGetCurrentUserQuery,
  useUpdateUserMutation,
  useGetWorkspacesQuery,
  useGetWorkspaceQuery,
  useCreateWorkspaceMutation,
  useUpdateWorkspaceMutation,
  useGetLLMProvidersQuery,
  useTestLLMConnectionMutation,
  useExecuteLLMMutation,
  useGetPromptsQuery,
  useGetPromptQuery,
  useCreatePromptMutation,
  useUpdatePromptMutation,
  useDeletePromptMutation,
  useGetConversationsQuery,
  useGetConversationQuery,
  useCreateConversationMutation,
  useUpdateConversationMutation,
  useDeleteConversationMutation,
  useGetBatchJobsQuery,
  useCreateBatchJobMutation,
  useGetBatchJobStatusQuery,
  useCancelBatchJobMutation,
  useGetWorkflowsQuery,
  useCreateWorkflowMutation,
  useExecuteWorkflowMutation,
  useGetAnalyticsQuery,
  useGetUsageReportQuery,
} = api;