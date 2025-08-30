@@ .. @@
 import React from 'react';
 import { useSelector, useDispatch } from 'react-redux';
 import { RootState } from '../../../store';
 import { logout } from '../../../store/slices/authSlice';
+import { useAuth } from '../../../hooks/useAuth';
 import { Menu, Transition } from '@headlessui/react';
 import {
   Bars3Icon,
   BellIcon,
   ChevronDownIcon,
 } from '@heroicons/react/24/outline';
 import Avatar from '../../atoms/Avatar/Avatar';
 import Button from '../../atoms/Button/Button';
 import LLMSelector from '../../molecules/LLMSelector/LLMSelector';
 import WorkspaceSelector from '../../molecules/WorkspaceSelector/WorkspaceSelector';

 interface HeaderProps {
   onToggleSidebar: () => void;
 }

 const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
   const dispatch = useDispatch();
-  const { user } = useSelector((state: RootState) => state.auth);
+  const { user } = useAuth(); // Use the custom hook for better auth management
   const { notifications } = useSelector((state: RootState) => state.ui);
   
   const unreadCount = notifications.filter(n => !n.read).length;

   const handleLogout = () => {
     dispatch(logout());
   };