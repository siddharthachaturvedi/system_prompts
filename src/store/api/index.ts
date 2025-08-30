@@ .. @@
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../index';
import { logout, loginSuccess, refreshTokenSuccess, refreshTokenFailure } from '../slices/authSlice';
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

-const baseQuery = fetchBaseQuery({
+const baseQueryWithAuth = fetchBaseQuery({
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

+const baseQuery = async (args: any, api: any, extraOptions: any) => {
+  let result = await baseQueryWithAuth(args, api, extraOptions);
+  
+  if (result.error && result.error.status === 401) {
+    // Try to refresh the token
+    const refreshResult = await baseQueryWithAuth(
+      { url: '/auth/refresh', method: 'POST' },
+      api,
+      extraOptions
+    );
+    
+    if (refreshResult.data) {
+      // Store the new token
+      const newToken = (refreshResult.data as any).data.token;
+      api.dispatch(loginSuccess({
+        user: (api.getState() as RootState).auth.user!,
+        token: newToken,
+      }));
+      
+      // Retry the original query with new token
+      result = await baseQueryWithAuth(args, api, extraOptions);
+    } else {
+      // Refresh failed, logout user
+      api.dispatch(logout());
+    }
+  }
+  
+  return result;
+};

export const api = createApi({