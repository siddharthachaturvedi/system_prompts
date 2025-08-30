// Core application types

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Workspace {
  id: string;
  name: string;
  description?: string;
  members: WorkspaceMember[];
  settings: WorkspaceSettings;
  createdAt: Date;
  updatedAt: Date;
}

export interface WorkspaceMember {
  userId: string;
  role: 'admin' | 'member' | 'viewer';
  joinedAt: Date;
}

export interface WorkspaceSettings {
  allowGuestAccess: boolean;
  defaultLLM: string;
  maxTokensPerMonth?: number;
}

export interface LLMProvider {
  id: string;
  name: string;
  displayName: string;
  models: LLMModel[];
  capabilities: LLMCapability[];
  status: 'active' | 'inactive' | 'error';
}

export interface LLMModel {
  id: string;
  name: string;
  displayName: string;
  description?: string;
  maxTokens: number;
  costPerToken: number;
  capabilities: string[];
}

export interface LLMCapability {
  type: 'text' | 'image' | 'code' | 'function_calling';
  description: string;
}

export interface Prompt {
  id: string;
  title: string;
  content: string;
  description?: string;
  variables: PromptVariable[];
  tags: string[];
  category?: string;
  workspaceId: string;
  createdBy: string;
  isPublic: boolean;
  version: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface PromptVariable {
  name: string;
  type: 'text' | 'number' | 'boolean' | 'select';
  description?: string;
  defaultValue?: string;
  options?: string[]; // For select type
  required: boolean;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  llmProvider: string;
  llmModel: string;
  workspaceId: string;
  createdBy: string;
  isShared: boolean;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  metadata?: MessageMetadata;
  timestamp: Date;
  tokens?: number;
  cost?: number;
}

export interface MessageMetadata {
  promptId?: string;
  executionTime?: number;
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface BatchJob {
  id: string;
  name: string;
  status: 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';
  promptId: string;
  llmProvider: string;
  llmModel: string;
  inputData: any[];
  outputData?: any[];
  progress: {
    total: number;
    completed: number;
    failed: number;
  };
  settings: BatchJobSettings;
  createdBy: string;
  workspaceId: string;
  createdAt: Date;
  completedAt?: Date;
}

export interface BatchJobSettings {
  concurrency: number;
  retryAttempts: number;
  outputFormat: 'json' | 'csv' | 'xlsx';
  includeMetadata: boolean;
}

export interface Workflow {
  id: string;
  name: string;
  description?: string;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  triggers: WorkflowTrigger[];
  settings: WorkflowSettings;
  workspaceId: string;
  createdBy: string;
  isTemplate: boolean;
  version: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface WorkflowNode {
  id: string;
  type: 'llm_call' | 'transform' | 'condition' | 'output' | 'api_call';
  position: { x: number; y: number };
  data: Record<string, any>;
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  condition?: string;
}

export interface WorkflowTrigger {
  type: 'manual' | 'schedule' | 'webhook';
  config: Record<string, any>;
}

export interface WorkflowSettings {
  timeout: number;
  retryPolicy: 'none' | 'linear' | 'exponential';
  maxRetries: number;
}

export interface AnalyticsData {
  usage: UsageMetrics;
  costs: CostMetrics;
  performance: PerformanceMetrics;
  users: UserMetrics;
}

export interface UsageMetrics {
  totalTokens: number;
  totalRequests: number;
  byLLM: Record<string, number>;
  byUser: Record<string, number>;
  byTimeRange: TimeSeriesData[];
}

export interface CostMetrics {
  totalCost: number;
  byLLM: Record<string, number>;
  byUser: Record<string, number>;
  projectedMonthlyCost: number;
}

export interface PerformanceMetrics {
  averageResponseTime: number;
  successRate: number;
  errorRate: number;
  byLLM: Record<string, PerformanceData>;
}

export interface UserMetrics {
  activeUsers: number;
  newUsers: number;
  retentionRate: number;
  engagementScore: number;
}

export interface TimeSeriesData {
  timestamp: Date;
  value: number;
}

export interface PerformanceData {
  responseTime: number;
  successRate: number;
  errorRate: number;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form types
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface PromptForm {
  title: string;
  content: string;
  description?: string;
  tags: string[];
  category?: string;
  variables: PromptVariable[];
}

// UI State types
export interface UIState {
  sidebarOpen: boolean;
  currentView: string;
  loading: boolean;
  error?: string;
  notifications: Notification[];
}

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

// Filter and search types
export interface SearchFilters {
  query?: string;
  tags?: string[];
  category?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
  sortBy?: 'name' | 'created' | 'updated' | 'usage';
  sortOrder?: 'asc' | 'desc';
}

export interface ConversationFilters extends SearchFilters {
  llmProvider?: string;
  sharedOnly?: boolean;
}

export interface PromptFilters extends SearchFilters {
  publicOnly?: boolean;
  hasVariables?: boolean;
}