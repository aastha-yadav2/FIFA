import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { RealTimeProvider } from './context/RealTimeContext';
import { OperationsProvider } from './context/OperationsContext';
import ProtectedRoute from './components/ProtectedRoute';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';

// Pages
import Landing          from './pages/Landing';
import Login            from './pages/Login';
import Dashboard        from './pages/Dashboard';
import AIAssistant      from './pages/AIAssistant';
import Navigation       from './pages/Navigation';
import CrowdMonitoring  from './pages/CrowdMonitoring';
import Accessibility    from './pages/Accessibility';
import Transportation   from './pages/Transportation';
import Sustainability   from './pages/Sustainability';
import VolunteerCenter  from './pages/VolunteerCenter';
import IncidentReporting from './pages/IncidentReporting';
import Analytics        from './pages/Analytics';
import Settings         from './pages/Settings';

function AppLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
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
          </Router>
        </RealTimeProvider>
      </OperationsProvider>
    </AuthProvider>
  );
}
