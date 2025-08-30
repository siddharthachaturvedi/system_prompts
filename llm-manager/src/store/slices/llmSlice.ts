import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LLMProvider } from '../../types';

interface LLMState {
  providers: LLMProvider[];
  activeProvider: string | null;
  activeModel: string | null;
  isLoading: boolean;
  error: string | null;
  configurations: Record<string, LLMConfiguration>;
}

interface LLMConfiguration {
  apiKey?: string;
  baseUrl?: string;
  temperature: number;
  maxTokens: number;
  topP: number;
  frequencyPenalty: number;
  presencePenalty: number;
}

const initialState: LLMState = {
  providers: [],
  activeProvider: localStorage.getItem('activeProvider'),
  activeModel: localStorage.getItem('activeModel'),
  isLoading: false,
  error: null,
  configurations: {},
};

export const llmSlice = createSlice({
  name: 'llm',
  initialState,
  reducers: {
    setProviders: (state, action: PayloadAction<LLMProvider[]>) => {
      state.providers = action.payload;
    },
    setActiveProvider: (state, action: PayloadAction<string>) => {
      state.activeProvider = action.payload;
      localStorage.setItem('activeProvider', action.payload);
    },
    setActiveModel: (state, action: PayloadAction<string>) => {
      state.activeModel = action.payload;
      localStorage.setItem('activeModel', action.payload);
    },
    updateProviderStatus: (state, action: PayloadAction<{ providerId: string; status: 'active' | 'inactive' | 'error' }>) => {
      const provider = state.providers.find(p => p.id === action.payload.providerId);
      if (provider) {
        provider.status = action.payload.status;
      }
    },
    setConfiguration: (state, action: PayloadAction<{ providerId: string; config: LLMConfiguration }>) => {
      state.configurations[action.payload.providerId] = action.payload.config;
    },
    updateConfiguration: (state, action: PayloadAction<{ providerId: string; config: Partial<LLMConfiguration> }>) => {
      const existing = state.configurations[action.payload.providerId] || {};
      state.configurations[action.payload.providerId] = {
        ...existing,
        ...action.payload.config,
      };
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setProviders,
  setActiveProvider,
  setActiveModel,
  updateProviderStatus,
  setConfiguration,
  updateConfiguration,
  setLoading,
  setError,
} = llmSlice.actions;