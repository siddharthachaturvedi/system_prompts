import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
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

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            {/* Auth routes */}
            <Route path="/auth" element={<AuthLayout />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route index element={<Navigate to="/auth/login" replace />} />
            </Route>

            {/* Protected app routes */}
            <Route path="/" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
              <Route index element={<Dashboard />} />
              <Route path="conversations/*" element={<Conversations />} />
              <Route path="prompts/*" element={<Prompts />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="settings/*" element={<Settings />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;