import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import HomeFilledIcon from '@mui/icons-material/HomeFilled';
import PersonIcon from '@mui/icons-material/Person';
import LanguageIcon from '@mui/icons-material/Language';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

const colors = {
  background: 'linear-gradient(135deg, #000000 10%,rgb(18, 18, 18) 90%)', // Чёрно-белый градиент
  accent: '#000000',
  glow: 'rgba(255, 255, 255, 0.3)',
  subtleGlow: 'rgba(255, 255, 255, 0.1)',
};

// Стили для верхнего навбара (десктоп)
const NavbarContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: 'calc(100% - 40px)', // Учитываем margin
  background: 'linear-gradient(135deg, #000000 10%,rgb(18, 18, 18) 90%)', // Чёрно-белый градиент
  backdropFilter: 'blur(15px)',
  WebkitBackdropFilter: 'blur(15px)',
  padding: '20px',
  margin: '20px',
  borderRadius: '25px',
  marginBottom:20,
  boxShadow: '0 5px 20px rgba(0, 0, 0, 0.3)',
  zIndex: 1300,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between', // Логотип слева, иконки справа
  transition: theme.transitions.create(['background', 'box-shadow'], {
    duration: theme.transitions.duration.short,
  }),
  '&:hover': {
    background: 'linear-gradient(135deg,rgba(0, 0, 0, 0.97) 10%,rgba(18, 18, 18, 0.96) 90%)', // Чёрно-белый градиент

  },
}));

// Стили для футера (мобильная версия)
const FooterContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  bottom: 0,
  left: 0,
  width: '100%', // Учитываем margin
  background: 'linear-gradient(135deg, #000000 10%,rgb(18, 18, 18) 90%)', // Чёрно-белый градиент
  backdropFilter: 'blur(15px)',
  WebkitBackdropFilter: 'blur(15px)',
  padding: '20px',
  borderRadius: '25px',
  boxShadow: '0 -5px 20px rgba(0, 0, 0, 0.3)',
  zIndex: 1300,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  transition: theme.transitions.create(['background', 'box-shadow'], {
    duration: theme.transitions.duration.short,
  }),
  '&:hover': {
    background: 'linear-gradient(135deg,rgba(0, 0, 0, 0.97) 10%,rgba(18, 18, 18, 0.96) 90%)', // Чёрно-белый градиент
  },
}));

const LogoContainer = styled(Box)({
  padding: '10px 20px',
  textAlign: 'center',
  background: 'rgba(255, 255, 255, 0.05)', // Лёгкий белый акцент
  borderRadius: '15px',
});

const LogoText = styled(Typography)({
  color: '#ffffff',
  fontSize: 26,
  fontFamily: "'Inter', sans-serif",
  fontWeight: 700,
  letterSpacing: '0.8px',
  textShadow: '0 0 8px rgba(255, 255, 255, 0.3)', // Белое свечение
});

const NavItems = styled(Box)(({ isMobile }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: isMobile ? 20 : 15, // Меньший gap для десктопной версии из-за текста
  padding: '0 10px',
  justifyContent: 'center',
  alignItems: 'center',
}));

const NavItem = styled(Link)(({ theme, active, isMobile }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: isMobile ? 0 : 8, // Отступ между иконкой и текстом в десктопе
  textDecoration: 'none',
  color: '#ffffff',
  padding: isMobile ? 10 : '8px 15px',
  borderRadius: isMobile ? '50%' : '15px', // Круглые кнопки для мобильной версии, прямоугольные для десктопа
  background: active ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.05)', // Белый акцент для активного состояния
  transition: theme.transitions.create(['background', 'transform', 'box-shadow'], {
    duration: theme.transitions.duration.short,
    easing: theme.transitions.easing.easeInOut,
  }),
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.15)',
    transform: isMobile ? 'scale(1.1)' : 'translateY(-2px)',
    boxShadow: `0 5px 15px ${colors.subtleGlow}`,
  },
  '& svg': {
    filter: active ? 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.5))' : 'none',
  },
}));

const LanguageToggle = styled(Box)(({ theme, active, isMobile }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: isMobile ? 0 : 8,
  padding: isMobile ? 10 : '8px 15px',
  borderRadius: isMobile ? '50%' : '15px',
  background: active ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.05)',
  transition: theme.transitions.create(['background', 'transform', 'box-shadow'], {
    duration: theme.transitions.duration.short,
    easing: theme.transitions.easing.easeInOut,
  }),
  cursor: 'pointer',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.15)',
    transform: isMobile ? 'scale(1.1)' : 'translateY(-2px)',
    boxShadow: `0 5px 15px ${colors.subtleGlow}`,
  },
  '& svg': {
    filter: active ? 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.5))' : 'none',
  },
}));

const Navbar = ({ sidebarOpen, setSidebarOpen, isMobile }) => {
  const location = useLocation();
  const [language, setLanguage] = useState('uz'); // По умолчанию узбекский

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobile && sidebarOpen) {
        const sidebar = document.querySelector('.MuiDrawer-paper');
        const menuButton = document.querySelector('.menu-button');
        const clickedSidebar = sidebar && sidebar.contains(event.target);
        const clickedMenuButton = menuButton && menuButton.contains(event.target);
        if (!clickedSidebar && !clickedMenuButton) {
          setSidebarOpen(false);
        }
      }
    };

    if (isMobile && sidebarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobile, sidebarOpen, setSidebarOpen]);

  const isAuthenticated = !!localStorage.getItem('userData');

  // Локализация ссылок
  const linkTranslations = {
    uz: {
      authenticated: [
        { to: '/', label: 'Asosiy', icon: HomeFilledIcon, active: location.pathname === '/' },
        { to: '/homework', label: 'Vazifalar', icon: PersonIcon, active: location.pathname === '/homework' },
        { to: '/test', label: 'Savollar', icon: AppRegistrationIcon , active: location.pathname === '/test' },
      ],
      unauthenticated: [
        { to: '/', label: 'Asosiy', icon: HomeFilledIcon, active: location.pathname === '/' },
        { to: '/test', label: ' Savollar', icon: AppRegistrationIcon , active: location.pathname === '/test' },
      ],
    },
    ru: {
      authenticated: [
        { to: '/', label: 'Главная', icon: HomeFilledIcon, active: location.pathname === '/' },
        { to: '/homework', label: 'Задания', icon: PersonIcon, active: location.pathname === '/homework' },
        { to: '/test', label: 'Вопросы', icon: AppRegistrationIcon , active: location.pathname === '/test' },
      ],
      unauthenticated: [
        { to: '/', label: 'Главная', icon: HomeFilledIcon, active: location.pathname === '/' },
        { to: '/test', label: 'Вопросы', icon: AppRegistrationIcon , active: location.pathname === '/test' },
      ],
    },
  };

  const links = isAuthenticated
    ? linkTranslations[language].authenticated
    : linkTranslations[language].unauthenticated;

  const handleLanguageToggle = () => {
    setLanguage((prev) => (prev === 'uz' ? 'ru' : 'uz'));
  };

  const renderLink = ({ to, label, icon: Icon, active }) => (
    <NavItem to={to} active={active} isMobile={isMobile} key={to}>
      <Icon sx={{ fontSize: 24, color: '#fff' }} />
      {!isMobile && (
        <Typography
          sx={{
            color: '#fff',
            fontSize: 16,
            fontWeight: active ? 600 : 400,
            fontFamily: "'Inter', sans-serif",
            textShadow: active ? '0 0 5px rgba(255, 255, 255, 0.5)' : 'none',
          }}
        >
          {label}
        </Typography>
      )}
    </NavItem>
  );

  if (isMobile) {
    return (
      <FooterContainer>
        <NavItems isMobile={true}>
          {links.map(renderLink)}
          <LanguageToggle active={language === 'ru'} onClick={handleLanguageToggle} isMobile={true}>
            <LanguageIcon sx={{ fontSize: 24, color: '#fff' }} />
          </LanguageToggle>
        </NavItems>
      </FooterContainer>
    );
  }

  return (
    <NavbarContainer>
      <LogoContainer>
        <LogoText>Code Voice</LogoText>
      </LogoContainer>
      <NavItems>
        {links.map(renderLink)}
        <LanguageToggle active={language === 'ru'} onClick={handleLanguageToggle} isMobile={false}>
          <LanguageIcon sx={{ fontSize: 24, color: '#fff' }} />
          <Typography
            sx={{
              color: '#fff',
              fontSize: 16,
              fontWeight: language === 'ru' ? 600 : 400,
              fontFamily: "'Inter', sans-serif",
              textShadow: language === 'ru' ? '0 0 5px rgba(255, 255, 255, 0.5)' : 'none',
            }}
          >
            {language === 'uz' ? "O‘zbek" : 'Русский'}
          </Typography>
        </LanguageToggle>
      </NavItems>
    </NavbarContainer>
  );
};

export default Navbar;