import React, { useState, useContext, useEffect } from 'react';
import { styled, keyframes } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { AccessibilityContext } from '../voice/AccessibilityContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useLanguage } from '../context/LanguageContext'; // Import the useLanguage hook

// API базавий URL
const API_BASE_URL = 'https://code-voice-server.vercel.app';

// Анимациялар
const fadeIn = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const pulseAnimation = keyframes`
  0% { box-shadow: 0 0 5px rgba(255, 0, 122, 0.5); }
  50% { box-shadow: 0 0 20px rgba(255, 0, 122, 0.8); }
  100% { box-shadow: 0 0 5px rgba(255, 0, 122, 0.5); }
`;

// Услублар (Стили)
const LoginContainer = styled(Box)(({ theme }) => ({
  background: '#000000',
  minHeight: '80vh',
  borderRadius: theme.breakpoints.down('sm') ? '0' : '25px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: "center",
  padding: theme.breakpoints.down('sm') ? '15px' : '20px',
  gap: theme.breakpoints.down('sm') ? '15px' : '20px',
  position: 'relative',
  overflow: 'hidden',
  animation: `${fadeIn} 0.8s ease-in-out`,
  width: '100%',
  boxSizing: 'border-box',
  borderRadius: '25px',
  maxHeight: 'calc(100vh - 127px)',
}));

const LoginCard = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '400px',
  background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.08))',
  borderRadius: '20px',
  padding: theme.breakpoints.down('sm') ? '20px' : '30px',
  boxShadow: '0 5px 20px rgba(0, 0, 0, 0.8), 0 0 10px rgba(255, 0, 122, 0.3)',
  border: '1px solid rgba(255, 0, 122, 0.2)',
  backdropFilter: 'blur(15px)',
  animation: `${fadeIn} 0.6s ease-in-out`,
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.9), 0 0 20px rgba(255, 0, 122, 0.5)',
    transform: 'translateY(-3px)',
    border: '1px solid rgba(255, 0, 122, 0.5)',
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  fontSize: theme.breakpoints.down('sm') ? '24px' : '28px',
  fontWeight: 700,
  color: '#FFFFFF',
  textShadow: '0 0 5px rgba(255, 0, 122, 0.5)',
  marginBottom: '20px',
  textAlign: 'center',
  fontFamily: "'Orbitron', sans-serif",
}));

const CustomInput = styled('input')(({ theme }) => ({
  width: '100%',
  background: 'rgba(255, 255, 255, 0.03)',
  color: '#FFFFFF',
  borderRadius: '15px',
  padding: '10px',
  border: '1px solid rgba(255, 0, 122, 0.3)',
  fontFamily: "'Roboto', sans-serif",
  fontSize: '16px',
  outline: 'none',
  transition: 'all 0.3s ease',
  boxSizing: 'border-box',
  marginBottom: '15px',
  '&:hover': {
    border: '1px solid rgba(255, 0, 122, 0.5)',
  },
  '&:focus': {
    border: '1px solid rgba(255, 0, 122, 0.8)',
    boxShadow: '0 0 10px rgba(255, 0, 122, 0.5)',
  },
  '&:focus-within': {
    outline: '2px solid #FF007A',
    outlineOffset: '2px',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '14px',
    padding: '8px',
  },
}));

const CustomLabel = styled('label')(({ theme }) => ({
  color: '#FFFFFF',
  textShadow: '0 0 5px rgba(255, 0, 122, 0.5)',
  fontFamily: "'Roboto', sans-serif",
  fontSize: '16px',
  marginBottom: '5px',
  display: 'block',
  [theme.breakpoints.down('sm')]: {
    fontSize: '14px',
  },
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(135deg, #FF007A, #00FFDD)',
  color: '#FFFFFF',
  padding: theme.breakpoints.down('sm') ? '8px 15px' : '10px 25px',
  borderRadius: '15px',
  textTransform: 'none',
  fontSize: theme.breakpoints.down('sm') ? '12px' : '14px',
  fontWeight: 600,
  boxShadow: '0 5px 15px rgba(255, 0, 122, 0.5)',
  transition: 'all 0.3s ease',
  animation: `${pulseAnimation} 2s ease-in-out infinite`,
  fontFamily: "'Orbitron', sans-serif",
  width: '100%',
  marginBottom: '10px',
  '&:hover': {
    background: 'linear-gradient(135deg, #00FFDD, #FF007A)',
    boxShadow: '0 10px 25px rgba(255, 0, 122, 0.8)',
    transform: 'translateY(-2px)',
  },
  '&:active': {
    transform: 'translateY(1px)',
    boxShadow: '0 3px 10px rgba(255, 0, 122, 0.3)',
  },
  '&:disabled': {
    background: 'rgba(255, 255, 255, 0.1)',
    color: '#FFFFFF',
    boxShadow: 'none',
    animation: 'none',
  },
  '&:focus-within': {
    outline: '2px solid #FF007A',
    outlineOffset: '2px',
  },
}));

const CustomFormControl = styled(FormControl)(({ theme }) => ({
  width: '100%',
  marginBottom: '15px',
  '& .MuiInputLabel-root': {
    color: '#FFFFFF',
    textShadow: '0 0 5px rgba(255, 0, 122, 0.5)',
  },
  '& .MuiSelect-root': {
    color: '#FFFFFF',
    background: 'rgba(255, 255, 255, 0.03)',
    borderRadius: '15px',
    border: '1px solid rgba(255, 0, 122, 0.3)',
  },
  '& .MuiSvgIcon-root': {
    color: '#FFFFFF',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    border: '1px solid rgba(255, 0, 122, 0.5)',
  },
  '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
    border: '1px solid rgba(255, 0, 122, 0.8)',
  },
  '&:focus-within': {
    outline: '2px solid #FF007A',
    outlineOffset: '2px',
  },
}));

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [role, setRole] = useState('teacher');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { speakText, stopSpeech } = useContext(AccessibilityContext);
  const { t } = useLanguage(); // Use the LanguageContext
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role') || 'student';
    if (token) {
      navigate(userRole === 'teacher' ? '/teacher-dashboard' : '/student-dashboard', { replace: true });
    }
  }, [navigate]);

  const handleSpeak = (text) => {
    speakText(text);
  };

  const handleRegister = async () => {
    if (!firstName || !lastName || !login || !password || !role) {
      setError(t('errorFillAllFields'));
      handleSpeak(t('errorFillAllFields'));
      return;
    }

    setIsLoading(true);
    setError('');

    const url = role === 'teacher' ? `${API_BASE_URL}/register-teacher` : `${API_BASE_URL}/register-student`;
    console.log('So‘rov yuborilmoqda:', url);

    try {
      const response = await axios.post(url, {
        firstName,
        lastName,
        login,
        password,
      });

      console.log('Serverdan javob:', response.data);

      alert(t('successRegister', role));
      handleSpeak(t('successRegister', role));
      setIsRegistering(false);
      setFirstName('');
      setLastName('');
      setLogin('');
      setPassword('');
    } catch (error) {
      console.error('Ro‘yxatdan o‘tishda xatolik:', error);
      if (error.response) {
        setError(error.response.data.error || t('errorRegister'));
        handleSpeak(error.response.data.error || t('errorRegister'));
      } else {
        setError(t('errorGeneric', error.message));
        handleSpeak(t('errorGeneric', error.message));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!login || !password || !role) {
      setError(t('errorLoginFields'));
      handleSpeak(t('errorLoginFields'));
      return;
    }

    setIsLoading(true);
    setError('');

    const url = `${API_BASE_URL}/login`;
    console.log('So‘rov yuborilmoqda:', url);

    try {
      const response = await axios.post(url, {
        login,
        password,
        role,
      });

      console.log('Serverdan javob:', response.data);

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('role', role);

      if (role === 'teacher') {
        navigate('/teacher-dashboard', { replace: true });
      } else {
        navigate('/student-dashboard', { replace: true });
      }
      handleSpeak(t('successLogin'));
    } catch (error) {
      console.error('Avtorizatsiyada xatolik:', error);
      if (error.response) {
        setError(error.response.data.error || t('errorLogin'));
        handleSpeak(error.response.data.error || t('errorLogin'));
      } else {
        setError(t('errorGeneric', error.message));
        handleSpeak(t('errorGeneric', error.message));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginContainer>
      <LoginCard>
        <Title
          onMouseEnter={() => handleSpeak(isRegistering ? t('registerTitle') : t('loginTitle'))}
          onMouseLeave={stopSpeech}
          onTouchStart={() => handleSpeak(isRegistering ? t('registerTitle') : t('loginTitle'))}
          onTouchEnd={stopSpeech}
          onFocus={() => handleSpeak(isRegistering ? t('registerTitle') : t('loginTitle'))}
          onBlur={stopSpeech}
          tabIndex={0}
          role="heading"
          aria-level="1"
        >
          {isRegistering ? t('registerTitle') : t('loginTitle')}
        </Title>

        <CustomFormControl>
          <InputLabel
            onMouseEnter={() => handleSpeak(t('roleLabel'))}
            onMouseLeave={stopSpeech}
            onFocus={() => handleSpeak(t('roleLabel'))}
            onBlur={stopSpeech}
          >
            {t('roleLabel')}
          </InputLabel>
          <Select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            onMouseEnter={() => handleSpeak(t('roleLabel'))}
            onMouseLeave={stopSpeech}
            onFocus={() => handleSpeak(t('roleLabel'))}
            onBlur={stopSpeech}
            tabIndex={0}
            aria-label={t('roleLabel')}
          >
            <MenuItem value="teacher">{t('teacher')}</MenuItem>
            <MenuItem value="student">{t('student')}</MenuItem>
          </Select>
        </CustomFormControl>

        {isRegistering && (
          <>
            <Box>
              <CustomLabel
                htmlFor="firstName"
                onMouseEnter={() => handleSpeak(t('firstNameLabel'))}
                onMouseLeave={stopSpeech}
                onTouchStart={() => handleSpeak(t('firstNameLabel'))}
                onTouchEnd={stopSpeech}
                onFocus={() => handleSpeak(t('firstNameLabel'))}
                onBlur={stopSpeech}
              >
                {t('firstNameLabel')}
              </CustomLabel>
              <CustomInput
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder={t('firstNamePlaceholder')}
                onFocus={() => handleSpeak(t('firstNameLabel'))}
                onBlur={stopSpeech}
                aria-label={t('firstNameLabel')}
                tabIndex={0}
              />
            </Box>
            <Box>
              <CustomLabel
                htmlFor="lastName"
                onMouseEnter={() => handleSpeak(t('lastNameLabel'))}
                onMouseLeave={stopSpeech}
                onTouchStart={() => handleSpeak(t('lastNameLabel'))}
                onTouchEnd={stopSpeech}
                onFocus={() => handleSpeak(t('lastNameLabel'))}
                onBlur={stopSpeech}
              >
                {t('lastNameLabel')}
              </CustomLabel>
              <CustomInput
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder={t('lastNamePlaceholder')}
                onFocus={() => handleSpeak(t('lastNameLabel'))}
                onBlur={stopSpeech}
                aria-label={t('lastNameLabel')}
                tabIndex={0}
              />
            </Box>
          </>
        )}
        <Box>
          <CustomLabel
            htmlFor="login"
            onMouseEnter={() => handleSpeak(t('loginLabel'))}
            onMouseLeave={stopSpeech}
            onTouchStart={() => handleSpeak(t('loginLabel'))}
            onTouchEnd={stopSpeech}
            onFocus={() => handleSpeak(t('loginLabel'))}
            onBlur={stopSpeech}
          >
            {t('loginLabel')}
          </CustomLabel>
          <CustomInput
            id="login"
            type="text"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            placeholder={t('loginPlaceholder')}
            onFocus={() => handleSpeak(t('loginLabel'))}
            onBlur={stopSpeech}
            aria-label={t('loginLabel')}
            tabIndex={0}
          />
        </Box>
        <Box>
          <CustomLabel
            htmlFor="password"
            onMouseEnter={() => handleSpeak(t('passwordLabel'))}
            onMouseLeave={stopSpeech}
            onTouchStart={() => handleSpeak(t('passwordLabel'))}
            onTouchEnd={stopSpeech}
            onFocus={() => handleSpeak(t('passwordLabel'))}
            onBlur={stopSpeech}
          >
            {t('passwordLabel')}
          </CustomLabel>
          <CustomInput
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t('passwordPlaceholder')}
            onFocus={() => handleSpeak(t('passwordLabel'))}
            onBlur={stopSpeech}
            aria-label={t('passwordLabel')}
            tabIndex={0}
          />
        </Box>
        {error && (
          <Typography
            sx={{
              color: '#FF5555',
              mb: 2,
              fontSize: '14px',
              textShadow: '0 0 5px rgba(255, 0, 122, 0.3)',
              fontFamily: "'Roboto', sans-serif",
              textAlign: 'center',
            }}
            onMouseEnter={() => handleSpeak(error)}
            onMouseLeave={stopSpeech}
            onFocus={() => handleSpeak(error)}
            onBlur={stopSpeech}
            tabIndex={0}
            role="alert"
          >
            {error}
          </Typography>
        )}
        <SubmitButton
          onClick={isRegistering ? handleRegister : handleLogin}
          disabled={isLoading}
          onMouseEnter={() => handleSpeak(isRegistering ? t('registerButton') : t('loginButton'))}
          onMouseLeave={stopSpeech}
          onTouchStart={() => handleSpeak(isRegistering ? t('registerButton') : t('loginButton'))}
          onTouchEnd={stopSpeech}
          onFocus={() => handleSpeak(isRegistering ? t('registerButton') : t('loginButton'))}
          onBlur={stopSpeech}
          tabIndex={0}
          aria-label={isRegistering ? t('registerButton') : t('loginButton')}
        >
          {isLoading ? <CircularProgress size={20} sx={{ color: '#FFFFFF' }} /> : (isRegistering ? t('registerButton') : t('loginButton'))}
        </SubmitButton>
        <Button
          onClick={() => setIsRegistering(!isRegistering)}
          sx={{
            color: '#FFFFFF',
            textTransform: 'none',
            fontFamily: "'Roboto', sans-serif",
            width: '100%',
            textAlign: 'center',
            '&:focus-within': {
              outline: '2px solid #FF007A',
              outlineOffset: '2px',
            },
          }}
          onMouseEnter={() => handleSpeak(isRegistering ? t('toggleToLogin') : t('toggleToRegister'))}
          onMouseLeave={stopSpeech}
          onTouchStart={() => handleSpeak(isRegistering ? t('toggleToLogin') : t('toggleToRegister'))}
          onTouchEnd={stopSpeech}
          onFocus={() => handleSpeak(isRegistering ? t('toggleToLogin') : t('toggleToRegister'))}
          onBlur={stopSpeech}
          tabIndex={0}
          aria-label={isRegistering ? t('toggleToLogin') : t('toggleToRegister')}
        >
          {isRegistering ? t('toggleToLogin') : t('toggleToRegister')}
        </Button>
      </LoginCard>
    </LoginContainer>
  );
};

export default Login;