@@ .. @@
 import React from 'react';
 import { Outlet } from 'react-router-dom';
 import { useSelector, useDispatch } from 'react-redux';
 import { RootState } from '../../../store';
 import { toggleSidebar } from '../../../store/slices/uiSlice';
+import { useAuth } from '../../../hooks/useAuth';
 import Sidebar from '../../organisms/Sidebar/Sidebar';
 import Header from '../../organisms/Header/Header';
 import NotificationCenter from '../../molecules/NotificationCenter/NotificationCenter';

 const DashboardLayout: React.FC = () => {
   const dispatch = useDispatch();
   const { sidebarOpen } = useSelector((state: RootState) => state.ui);
 }
+  
+  // Initialize auth and handle token validation
+  useAuth();

   return (
   )