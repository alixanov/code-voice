import React, { useEffect, useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import HomeFilledIcon from '@mui/icons-material/HomeFilled';
import PersonIcon from '@mui/icons-material/Person';
import LanguageIcon from '@mui/icons-material/Language';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { AccessibilityContext } from '../voice/AccessibilityContext';

const colors = {
  background: 'linear-gradient(135deg, #000000 10%,rgb(18, 18, 18) 90%)',
  accent: '#000000',
  glow: 'rgba(255, 255, 255, 0.3)',
  subtleGlow: 'rgba(255, 255, 255, 0.1)',
};

const NavbarContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: 'calc(100% - 40px)',
  background: 'linear-gradient(135deg, #000000 10%,rgb(18, 18, 18) 90%)',
  backdropFilter: 'blur(15px)',
  WebkitBackdropFilter: 'blur(15px)',
  padding: '20px',
  margin: '20px',
  borderRadius: '25px',
  marginBottom: 20,
  boxShadow: '0 5px 20px rgba(0, 0, 0, 0.3)',
  zIndex: 1300,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  transition: theme.transitions.create(['background', 'box-shadow'], {
    duration: theme.transitions.duration.short,
  }),
  '&:hover': {
    background: 'linear-gradient(135deg,rgba(0, 0, 0, 0.97) 10%,rgba(18, 18, 18, 0.96) 90%)',
  },
}));

const FooterContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  bottom: 0,
  left: 0,
  width: '100%',
  background: 'linear-gradient(135deg, #000000 10%,rgb(18, 18, 18) 90%)',
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
    background: 'linear-gradient(135deg,rgba(0, 0, 0, 0.97) 10%,rgba(18, 18, 18, 0.96) 90%)',
  },
}));

const LogoContainer = styled(Box)({
  padding: '10px 20px',
  textAlign: 'center',
  background: 'rgba(255, 255, 255, 0.05)',
  borderRadius: '15px',
});

const LogoText = styled(Typography)({
  color: '#ffffff',
  fontSize: 26,
  fontFamily: "'Inter', sans-serif",
  fontWeight: 700,
  letterSpacing: '0.8px',
  textShadow: '0 0 8px rgba(255, 255, 255, 0.3)',
});

const NavItems = styled(Box)(({ isMobile }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: isMobile ? 20 : 15,
  padding: '0 10px',
  justifyContent: 'center',
  alignItems: 'center',
}));

const NavItem = styled(Link)(({ theme, active, isMobile }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: isMobile ? 0 : 8,
  textDecoration: 'none',
  color: '#ffffff',
  padding: isMobile ? 10 : '8px 15px',
  borderRadius: isMobile ? '50%' : '15px',
  background: active ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.05)',
  transition: theme.transitions.create(['background', 'transform', 'box-shadow'], {
    duration: theme.transitions.duration.short,
    easing: theme.transitions.easing.easeInOut,
  }),
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.15)',
    transform: isMobile ? 'scale(1.1)' : 'translateY(-2px)',
    boxShadow: `0 5px 15px ${colors.subtleGlow}`,
  },
  '&:focus': {
    outline: '2px solid #FF007A',
    outlineOffset: '2px',
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
  '&:focus': {
    outline: '2px solid #FF007A',
    outlineOffset: '2px',
  },
}));

const AccessibilitySwitch = styled(FormControlLabel)(({ theme, isMobile }) => ({
  margin: isMobile ? '0 10px' : '0 15px',
  '& .MuiTypography-root': {
    color: '#FFFFFF',
    fontSize: isMobile ? '12px' : '14px',
    fontWeight: 500,
  },
  '& .MuiSwitch-root': {
    transform: isMobile ? 'rotate(180deg)' : 'none',
    '& .MuiSwitch-switchBase': {
      color: '#FFFFFF',
      '&.Mui-checked': {
        color: '#FFFFFF',
      },
      '&.Mui-checked + .MuiSwitch-track': {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
      },
    },
    '& .MuiSwitch-track': {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
  },
  '&:focus-within': {
    outline: '2px solid #FF007A',
    outlineOffset: '2px',
  },
}));

const Navbar = ({ sidebarOpen, setSidebarOpen, isMobile }) => {
  const location = useLocation();
  const [language, setLanguage] = useState('uz');
  const { isAccessibilityMode, setIsAccessibilityMode, speakText, stopSpeech, isSpeechSupported } = useContext(AccessibilityContext);

  // Check authentication and role
  const isAuthenticated = !!localStorage.getItem('token');
  const userRole = localStorage.getItem('role') || 'student'; // Default to 'student' if role is not found
  const dashboardPath = userRole === 'teacher' ? '/teacher-dashboard' : '/student-dashboard';

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

  const linkTranslations = {
    uz: {
      authenticated: [
        { to: '/', label: 'Asosiy', icon: HomeFilledIcon, active: location.pathname === '/' },
        { to: '/test', label: 'Savollar', icon: AppRegistrationIcon, active: location.pathname === '/test' },
        { to: dashboardPath, label: 'Shaxsiy kabinet', icon: PersonIcon, active: location.pathname === dashboardPath },
      ],
      unauthenticated: [
        { to: '/', label: 'Asosiy', icon: HomeFilledIcon, active: location.pathname === '/' },
        { to: '/test', label: 'Savollar', icon: AppRegistrationIcon, active: location.pathname === '/test' },
        { to: '/login', label: 'Ro‘yxatdan o‘tish', icon: PersonIcon, active: location.pathname === '/login' },
      ],
    },
    ru: {
      authenticated: [
        { to: '/', label: 'Главная', icon: HomeFilledIcon, active: location.pathname === '/' },
        { to: '/test', label: 'Вопросы', icon: AppRegistrationIcon, active: location.pathname === '/test' },
        { to: dashboardPath, label: 'Личный кабинет', icon: PersonIcon, active: location.pathname === dashboardPath },
      ],
      unauthenticated: [
        { to: '/', label: 'Главная', icon: HomeFilledIcon, active: location.pathname === '/' },
        { to: '/test', label: 'Вопросы', icon: AppRegistrationIcon, active: location.pathname === '/test' },
        { to: '/login', label: 'Регистрация', icon: PersonIcon, active: location.pathname === '/login' },
      ],
    },
  };

  const links = isAuthenticated
    ? linkTranslations[language].authenticated
    : linkTranslations[language].unauthenticated;

  const handleLanguageToggle = () => {
    const newLanguage = language === 'uz' ? 'ru' : 'uz';
    setLanguage(newLanguage);
    if (isAccessibilityMode) {
      speakText(newLanguage === 'uz' ? "O‘zbek" : 'Русский');
    }
  };

  const toggleAccessibilityMode = () => {
    setIsAccessibilityMode((prev) => {
      const newMode = !prev;
      if (!newMode) {
        stopSpeech();
      } else if (isSpeechSupported) {
        speakText(language === 'uz' ? 'Maxsus imkoniyatlar yoqildi' : 'Специальные возможности включены');
      }
      return newMode;
    });
  };

  const renderLink = ({ to, label, icon: Icon, active }) => (
    <NavItem
      to={to}
      active={active}
      isMobile={isMobile}
      key={to}
      onMouseEnter={() => isAccessibilityMode && speakText(label)}
      onMouseLeave={stopSpeech}
      onFocus={() => isAccessibilityMode && speakText(label)}
      onBlur={stopSpeech}
      tabIndex={0}
      aria-label={label}
      role="link"
    >
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
          <LanguageToggle
            active={language === 'ru'}
            onClick={handleLanguageToggle}
            isMobile={true}
            onMouseEnter={() => isAccessibilityMode && speakText(language === 'uz' ? 'UZ' : 'RU')}
            onMouseLeave={stopSpeech}
            onFocus={() => isAccessibilityMode && speakText(language === 'uz' ? 'UZ' : 'RU')}
            onBlur={stopSpeech}
            tabIndex={0}
            role="button"
            aria-label={language === 'uz' ? 'Сменить язык на русский' : 'Сменить язык на узбекский'}
          >
            <Typography
              sx={{
                color: '#fff',
                fontSize: 16,
                fontWeight: language === 'ru' ? 600 : 400,
                fontFamily: "'Inter', sans-serif",
                textShadow: language === 'ru' ? '0 0 5px rgba(255, 255, 255, 0.5)' : 'none',
              }}
            >
              {language === 'uz' ? 'UZ' : 'RU'}
            </Typography>
          </LanguageToggle>
          <AccessibilitySwitch
            control={<Switch checked={isAccessibilityMode} onChange={toggleAccessibilityMode} />}
            label=""
            isMobile={true}
            onMouseEnter={() =>
              isAccessibilityMode && speakText(language === 'uz' ? 'Maxsus imkoniyatlar' : 'Специальные возможности')
            }
            onMouseLeave={stopSpeech}
            onFocus={() =>
              speakText(language === 'uz' ? 'Maxsus imkoniyatlar' : 'Специальные возможности')
            }
            onBlur={stopSpeech}
            aria-label={language === 'uz' ? 'Переключить режим доступности' : 'Переключить режим специальных возможностей'}
          />
        </NavItems>
      </FooterContainer>
    );
  }

  return (
    <NavbarContainer>
      <LogoContainer>
        <LogoText
          onMouseEnter={() => isAccessibilityMode && speakText('Code Voice')}
          onMouseLeave={stopSpeech}
          onFocus={() => isAccessibilityMode && speakText('Code Voice')}
          onBlur={stopSpeech}
          tabIndex={0}
          role="heading"
          aria-level="1"
        >
          Code Voice
        </LogoText>
      </LogoContainer>
      <NavItems>
        {links.map(renderLink)}
        <LanguageToggle
          active={language === 'ru'}
          onClick={handleLanguageToggle}
          isMobile={false}
          onMouseEnter={() => isAccessibilityMode && speakText(language === 'uz' ? "O‘zbek" : 'Русский')}
          onMouseLeave={stopSpeech}
          onFocus={() => isAccessibilityMode && speakText(language === 'uz' ? "O‘zbek" : 'Русский')}
          onBlur={stopSpeech}
          tabIndex={0}
          role="button"
          aria-label={language === 'uz' ? 'Сменить язык на русский' : 'Сменить язык на узбекский'}
        >
          <Typography
            sx={{
              color: '#fff',
              fontSize: 16,
              fontWeight: language === 'ru' ? 600 : 400,
              fontFamily: "'Inter', sans-serif",
              textShadow: language === 'ru' ? '0 0 5px rgba(255, 255, 255, 0.5)' : 'none',
            }}
          >
            {language === 'uz' ? "O‘z" : 'Ру'}
          </Typography>
        </LanguageToggle>
        <AccessibilitySwitch
          control={<Switch checked={isAccessibilityMode} onChange={toggleAccessibilityMode} />}
          label={language === 'uz' ? 'Maxsus imkoniyatlar' : 'Специальные возможности'}
          isMobile={false}
          onMouseEnter={() =>
            isAccessibilityMode && speakText(language === 'uz' ? 'Maxsus imkoniyatlar' : 'Специальные возможности')
          }
          onMouseLeave={stopSpeech}
          onFocus={() =>
            speakText(language === 'uz' ? 'Maxsus imkoniyatlar' : 'Специальные возможности')
          }
          onBlur={stopSpeech}
          aria-label={language === 'uz' ? 'Переключить режим доступности' : 'Переключить режим специальных возможностей'}
        />
      </NavItems>
    </NavbarContainer>
  );
};

export default Navbar;