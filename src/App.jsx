import React, { useState, useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { RealTimeProvider } from './context/RealTimeContext';
import { OperationsProvider } from './context/OperationsContext';
import ProtectedRoute from './components/ProtectedRoute';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';

// Pages
const Landing          = React.lazy(() => import('./pages/Landing'));
const Login            = React.lazy(() => import('./pages/Login'));
const Dashboard        = React.lazy(() => import('./pages/Dashboard'));
const AIAssistant      = React.lazy(() => import('./pages/AIAssistant'));
const Navigation       = React.lazy(() => import('./pages/Navigation'));
const CrowdMonitoring  = React.lazy(() => import('./pages/CrowdMonitoring'));
const Accessibility    = React.lazy(() => import('./pages/Accessibility'));
const Transportation   = React.lazy(() => import('./pages/Transportation'));
const Sustainability   = React.lazy(() => import('./pages/Sustainability'));
const VolunteerCenter  = React.lazy(() => import('./pages/VolunteerCenter'));
const IncidentReporting = React.lazy(() => import('./pages/IncidentReporting'));
const Analytics        = React.lazy(() => import('./pages/Analytics'));
const Settings         = React.lazy(() => import('./pages/Settings'));

function AppLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark' || (savedTheme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, []);
  return (
    <div className="app-layout">
      <Sidebar onCollapse={setCollapsed} />
      <TopBar sidebarCollapsed={collapsed} />
      <main className={`main-content ${collapsed ? 'sidebar-collapsed' : ''}`}>
        {children}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <OperationsProvider>
        <RealTimeProvider>
          <Router>
            <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'var(--text-secondary)' }}>Loading...</div>}>
              <Routes>
              {/* Public routes */}
              <Route path="/"      element={<Landing />} />
              <Route path="/login" element={<Login />} />

              {/* Protected routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <AppLayout><Dashboard /></AppLayout>
                </ProtectedRoute>
              } />
              <Route path="/ai-assistant" element={
                <ProtectedRoute>
                  <AppLayout><AIAssistant /></AppLayout>
                </ProtectedRoute>
              } />
              <Route path="/navigation" element={
                <ProtectedRoute>
                  <AppLayout><Navigation /></AppLayout>
                </ProtectedRoute>
              } />
              <Route path="/crowd-monitoring" element={
                <ProtectedRoute>
                  <AppLayout><CrowdMonitoring /></AppLayout>
                </ProtectedRoute>
              } />
              <Route path="/accessibility" element={
                <ProtectedRoute>
                  <AppLayout><Accessibility /></AppLayout>
                </ProtectedRoute>
              } />
              <Route path="/transportation" element={
                <ProtectedRoute>
                  <AppLayout><Transportation /></AppLayout>
                </ProtectedRoute>
              } />
              <Route path="/sustainability" element={
                <ProtectedRoute>
                  <AppLayout><Sustainability /></AppLayout>
                </ProtectedRoute>
              } />
              <Route path="/volunteer-center" element={
                <ProtectedRoute>
                  <AppLayout><VolunteerCenter /></AppLayout>
                </ProtectedRoute>
              } />
              <Route path="/incident-reporting" element={
                <ProtectedRoute>
                  <AppLayout><IncidentReporting /></AppLayout>
                </ProtectedRoute>
              } />
              <Route path="/analytics" element={
                <ProtectedRoute>
                  <AppLayout><Analytics /></AppLayout>
                </ProtectedRoute>
              } />
              <Route path="/settings" element={
                <ProtectedRoute>
                  <AppLayout><Settings /></AppLayout>
                </ProtectedRoute>
              } />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            </Suspense>
          </Router>
        </RealTimeProvider>
      </OperationsProvider>
    </AuthProvider>
  );
}
