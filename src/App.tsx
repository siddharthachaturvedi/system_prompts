@@ .. @@
-import React from 'react';
+import React, { useEffect } from 'react';
 import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
-import { Provider } from 'react-redux';
+import { Provider, useDispatch, useSelector } from 'react-redux';
-import { store } from './store';
+import { store, RootState } from './store';
+import { initializeAuth } from './store/slices/authSlice';
+import { useGetCurrentUserQuery } from './store/api';
 import DashboardLayout from './components/templates/DashboardLayout/DashboardLayout';
 import AuthLayout from './components/templates/AuthLayout/AuthLayout';
 import Dashboard from './pages/Dashboard/Dashboard';
 import Conversations from './pages/Conversations/Conversations';
 import Prompts from './pages/Prompts/Prompts';
 import Analytics from './pages/Analytics/Analytics';
 import Settings from './pages/Settings/Settings';
 import Login from './pages/Auth/Login';
 import Register from './pages/Auth/Register';
 import ProtectedRoute from './components/molecules/ProtectedRoute/ProtectedRoute';

+const AppContent: React.FC = () => {
+  const dispatch = useDispatch();
+  const { token, isAuthenticated } = useSelector((state: RootState) => state.auth);
+  
+  // Skip the query if no token exists
+  const { isLoading: isValidatingUser } = useGetCurrentUserQuery(undefined, {
+    skip: !token,
+  });
+
+  useEffect(() => {
+    // Initialize auth state from localStorage on app start
+    dispatch(initializeAuth());
+  }, [dispatch]);
+
+  // Show loading spinner while validating existing token
+  if (token && isValidatingUser) {
+    return (
+      <div className="min-h-screen flex items-center justify-center bg-gray-50">
+        <div className="text-center">
+          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
+          <p className="mt-4 text-gray-600">Validating session...</p>
+        </div>
+      </div>
+    );
+  }
+
+  return (
+    <Router>
+      <div className="min-h-screen bg-gray-50">
+        <Routes>
+          {/* Auth routes */}
+          <Route path="/auth" element={<AuthLayout />}>
+            <Route path="login" element={<Login />} />
+            <Route path="register" element={<Register />} />
+            <Route index element={<Navigate to="/auth/login" replace />} />
+          </Route>
+
+          {/* Protected app routes */}
+          <Route path="/" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
+            <Route index element={<Dashboard />} />
+            <Route path="conversations/*" element={<Conversations />} />
+            <Route path="prompts/*" element={<Prompts />} />
+            <Route path="analytics" element={<Analytics />} />
+            <Route path="settings/*" element={<Settings />} />
+          </Route>
+
+          {/* Fallback */}
+          <Route path="*" element={<Navigate to="/" replace />} />
+        </Routes>
+      </div>
+    </Router>
+  );
+};

 function App() {
   return (
     <Provider store={store}>
-      <Router>
-        <div className="min-h-screen bg-gray-50">
-          <Routes>
-            {/* Auth routes */}
-            <Route path="/auth" element={<AuthLayout />}>
-              <Route path="login" element={<Login />} />
-              <Route path="register" element={<Register />} />
-              <Route index element={<Navigate to="/auth/login" replace />} />
-            </Route>
-
-            {/* Protected app routes */}
-            <Route path="/" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
-              <Route index element={<Dashboard />} />
-              <Route path="conversations/*" element={<Conversations />} />
-              <Route path="prompts/*" element={<Prompts />} />
-              <Route path="analytics" element={<Analytics />} />
-              <Route path="settings/*" element={<Settings />} />
-            </Route>
-
-            {/* Fallback */}
-            <Route path="*" element={<Navigate to="/" replace />} />
-          </Routes>
-        </div>
-      </Router>
+      <AppContent />
     </Provider>
   );
 }