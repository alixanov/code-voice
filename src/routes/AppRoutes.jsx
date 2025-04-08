// AppRoutes.js
import React, { useState, useEffect, useRef } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Navbar, Main, Test } from '../components/';
import Box from '@mui/material/Box';
import { AccessibilityProvider } from '../components/voice/AccessibilityContext'; // Импортируем провайдер

const AppRoutes = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const location = useLocation();
  const routeRef = useRef(null);

  const checkAuthentication = () => {
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        if (parsedData && parsedData.id) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch {
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
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
          </Routes>
        </Box>
      </Box>
    </AccessibilityProvider>
  );
};

export default AppRoutes;