import React, { useState, useContext } from 'react';
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

// Базовый URL API
const API_BASE_URL = 'http://localhost:5000';

// Анимации
const fadeIn = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const pulseAnimation = keyframes`
  0% { box-shadow: 0 0 5px rgba(255, 0, 122, 0.5); }
  50% { box-shadow: 0 0 20px rgba(255, 0, 122, 0.8); }
  100% { box-shadow: 0 0 5px rgba(255, 0, 122, 0.5); }
`;

// Стили
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
}));

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [role, setRole] = useState('teacher'); // Роль: teacher или student
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { speakText, stopSpeech } = useContext(AccessibilityContext);
  const navigate = useNavigate();

  const handleSpeak = (text) => {
    speakText(text);
  };

  const handleRegister = async () => {
    if (!firstName || !lastName || !login || !password || !role) {
      setError('Пожалуйста, заполните все поля');
      handleSpeak('Пожалуйста, заполните все поля');
      return;
    }

    setIsLoading(true);
    setError('');

    const url = role === 'teacher' ? `${API_BASE_URL}/register-teacher` : `${API_BASE_URL}/register-student`;
    console.log('Отправка запроса на:', url);

    try {
      const response = await axios.post(url, {
        firstName,
        lastName,
        login,
        password,
      });

      console.log('Ответ сервера:', response.data);

      alert(`${role === 'teacher' ? 'Учитель' : 'Ученик'} успешно зарегистрирован! Теперь войдите.`);
      handleSpeak(`${role === 'teacher' ? 'Учитель' : 'Ученик'} успешно зарегистрирован! Теперь войдите.`);
      setIsRegistering(false);
      setFirstName('');
      setLastName('');
      setLogin('');
      setPassword('');
    } catch (error) {
      console.error('Ошибка при регистрации:', error);
      if (error.response) {
        setError(error.response.data.error || 'Ошибка регистрации');
        handleSpeak(error.response.data.error || 'Ошибка регистрации');
      } else {
        setError('Произошла ошибка: ' + error.message);
        handleSpeak('Произошла ошибка при регистрации');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!login || !password || !role) {
      setError('Пожалуйста, введите логин, пароль и выберите роль');
      handleSpeak('Пожалуйста, введите логин, пароль и выберите роль');
      return;
    }

    setIsLoading(true);
    setError('');

    const url = `${API_BASE_URL}/login`;
    console.log('Отправка запроса на:', url);

    try {
      const response = await axios.post(url, {
        login,
        password,
        role,
      });

      console.log('Ответ сервера:', response.data);

      // Сохраняем токен и данные пользователя
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('role', role);

      // Перенаправляем в зависимости от роли
      if (role === 'teacher') {
        navigate('/teacher-dashboard');
      } else {
        navigate('/student-dashboard');
      }
      handleSpeak('Авторизация успешна! Добро пожаловать в личный кабинет.');
    } catch (error) {
      console.error('Ошибка при авторизации:', error);
      if (error.response) {
        setError(error.response.data.error || 'Ошибка авторизации');
        handleSpeak(error.response.data.error || 'Ошибка авторизации');
      } else {
        setError('Произошла ошибка: ' + error.message);
        handleSpeak('Произошла ошибка при авторизации');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginContainer>
      <LoginCard>
        <Title
          onMouseEnter={() => handleSpeak(isRegistering ? 'Регистрация' : 'Авторизация')}
          onMouseLeave={stopSpeech}
          onTouchStart={() => handleSpeak(isRegistering ? 'Регистрация' : 'Авторизация')}
          onTouchEnd={stopSpeech}
          onFocus={() => handleSpeak(isRegistering ? 'Регистрация' : 'Авторизация')}
          onBlur={stopSpeech}
          tabIndex={0}
        >
          {isRegistering ? 'Регистрация' : 'Авторизация'}
        </Title>

        <Box mb={2}>
          <FormControl fullWidth>
            <InputLabel
              sx={{ color: '#FFFFFF', textShadow: '0 0 5px rgba(255, 0, 122, 0.5)' }}
              onMouseEnter={() => handleSpeak('Выберите роль')}
              onMouseLeave={stopSpeech}
            >
              Роль
            </InputLabel>
            <Select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              sx={{
                color: '#FFFFFF',
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '15px',
                border: '1px solid rgba(255, 0, 122, 0.3)',
                '& .MuiSvgIcon-root': { color: '#FFFFFF' },
              }}
              onFocus={() => handleSpeak('Выберите роль')}
              onBlur={stopSpeech}
            >
              <MenuItem value="teacher">Учитель</MenuItem>
              <MenuItem value="student">Ученик</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {isRegistering && (
          <>
            <Box>
              <CustomLabel
                htmlFor="firstName"
                onMouseEnter={() => handleSpeak('Введите ваше имя')}
                onMouseLeave={stopSpeech}
                onTouchStart={() => handleSpeak('Введите ваше имя')}
                onTouchEnd={stopSpeech}
              >
                Имя
              </CustomLabel>
              <CustomInput
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Введите ваше имя..."
                onFocus={() => handleSpeak('Введите ваше имя')}
                onBlur={stopSpeech}
                aria-label="Имя"
                tabIndex={0}
              />
            </Box>
            <Box>
              <CustomLabel
                htmlFor="lastName"
                onMouseEnter={() => handleSpeak('Введите вашу фамилию')}
                onMouseLeave={stopSpeech}
                onTouchStart={() => handleSpeak('Введите вашу фамилию')}
                onTouchEnd={stopSpeech}
              >
                Фамилия
              </CustomLabel>
              <CustomInput
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Введите вашу фамилию..."
                onFocus={() => handleSpeak('Введите вашу фамилию')}
                onBlur={stopSpeech}
                aria-label="Фамилия"
                tabIndex={0}
              />
            </Box>
          </>
        )}
        <Box>
          <CustomLabel
            htmlFor="login"
            onMouseEnter={() => handleSpeak('Введите ваш логин')}
            onMouseLeave={stopSpeech}
            onTouchStart={() => handleSpeak('Введите ваш логин')}
            onTouchEnd={stopSpeech}
          >
            Логин
          </CustomLabel>
          <CustomInput
            id="login"
            type="text"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            placeholder="Введите ваш логин..."
            onFocus={() => handleSpeak('Введите ваш логин')}
            onBlur={stopSpeech}
            aria-label="Логин"
            tabIndex={0}
          />
        </Box>
        <Box>
          <CustomLabel
            htmlFor="password"
            onMouseEnter={() => handleSpeak('Введите ваш пароль')}
            onMouseLeave={stopSpeech}
            onTouchStart={() => handleSpeak('Введите ваш пароль')}
            onTouchEnd={stopSpeech}
          >
            Пароль
          </CustomLabel>
          <CustomInput
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Введите ваш пароль..."
            onFocus={() => handleSpeak('Введите ваш пароль')}
            onBlur={stopSpeech}
            aria-label="Пароль"
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
          >
            {error}
          </Typography>
        )}
        <SubmitButton
          onClick={isRegistering ? handleRegister : handleLogin}
          disabled={isLoading}
          onMouseEnter={() => handleSpeak(isRegistering ? 'Зарегистрироваться' : 'Войти')}
          onMouseLeave={stopSpeech}
          onTouchStart={() => handleSpeak(isRegistering ? 'Зарегистрироваться' : 'Войти')}
          onTouchEnd={stopSpeech}
          onFocus={() => handleSpeak(isRegistering ? 'Зарегистрироваться' : 'Войти')}
          onBlur={stopSpeech}
          tabIndex={0}
        >
          {isLoading ? <CircularProgress size={20} sx={{ color: '#FFFFFF' }} /> : (isRegistering ? 'Зарегистрироваться' : 'Войти')}
        </SubmitButton>
        <Button
          onClick={() => setIsRegistering(!isRegistering)}
          sx={{
            color: '#FFFFFF',
            textTransform: 'none',
            fontFamily: "'Roboto', sans-serif",
            width: '100%',
            textAlign: 'center',
          }}
          onMouseEnter={() => handleSpeak(isRegistering ? 'Уже есть аккаунт? Войти' : 'Нет аккаунта? Зарегистрироваться')}
          onMouseLeave={stopSpeech}
          onTouchStart={() => handleSpeak(isRegistering ? 'Уже есть аккаунт? Войти' : 'Нет аккаунта? Зарегистрироваться')}
          onTouchEnd={stopSpeech}
          onFocus={() => handleSpeak(isRegistering ? 'Уже есть аккаунт? Войти' : 'Нет аккаунта? Зарегистрироваться')}
          onBlur={stopSpeech}
          tabIndex={0}
        >
          {isRegistering ? 'Уже есть аккаунт? Войти' : 'Нет аккаунта? Зарегистрироваться'}
        </Button>
      </LoginCard>
    </LoginContainer>
  );
};

export default Login;