@@ .. @@
 import React from 'react';
 import { Navigate, useLocation } from 'react-router-dom';
 import { useSelector } from 'react-redux';
 import { RootState } from '../../../store';

 interface ProtectedRouteProps {
   children: React.ReactNode;
 }

 const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
   const location = useLocation();
-  const { isAuthenticated, token } = useSelector((state: RootState) => state.auth);
+  const { isAuthenticated, token, user } = useSelector((state: RootState) => state.auth);

-  if (!isAuthenticated && !token) {
+  // Redirect to login if no token or not authenticated and no user data
+  if (!token || (!isAuthenticated && !user)) {
     return <Navigate to="/auth/login" state={{ from: location }} replace />;
   }

   return <>{children}</>;
 };