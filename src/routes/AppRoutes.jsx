import React, { useState, useEffect, useRef } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { Navbar, Main, Test, Task, Login, TeacherDashboard, StudentDashboard } from '../components/';
import Box from '@mui/material/Box';
import { AccessibilityProvider } from '../components/voice/AccessibilityContext';
import { LanguageProvider } from '../components/context/LanguageContext'; // Import the LanguageProvider

// PrivateRoute component to protect routes
const PrivateRoute = ({ children, allowedRoles }) => {
  const isAuthenticated = !!localStorage.getItem('token');
  const userRole = localStorage.getItem('role') || 'student';

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const AppRoutes = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const location = useLocation();
  const routeRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <LanguageProvider> {/* Wrap with LanguageProvider */}
      <AccessibilityProvider>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', maxWidth: '1920px', width: '100%', mx: 'auto' }}>
          <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} isMobile={isMobile} />
          <Box
            ref={routeRef}
            className="routes__container"
            sx={{
              flexGrow: 1,
              padding: isMobile ? '5px' : location.pathname === '/' ? '20px' : '20px',
              marginTop: isMobile ? 0 : '110px',
              marginBottom: isMobile ? '100px' : 0,
              overflowY: 'auto',
            }}
          >
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/test" element={<Test />} />
              <Route path="/homework" element={<Task />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/teacher-dashboard"
                element={
                  <PrivateRoute allowedRoles={['teacher']}>
                    <TeacherDashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/student-dashboard"
                element={
                  <PrivateRoute allowedRoles={['student']}>
                    <StudentDashboard />
                  </PrivateRoute>
                }
              />
            </Routes>
          </Box>
        </Box>
      </AccessibilityProvider>
    </LanguageProvider>
  );
};

export default AppRoutes;