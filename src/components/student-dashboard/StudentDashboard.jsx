import React, { useState, useEffect, useContext } from 'react';
import { styled, keyframes } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import EmailIcon from '@mui/icons-material/Email';
import SendIcon from '@mui/icons-material/Send';
import { AccessibilityContext } from '../voice/AccessibilityContext';
import { useLanguage } from '../context/LanguageContext'; // Import the useLanguage hook
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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

const burstAnimation = keyframes`
  0% { transform: scale(0) rotate(0deg); opacity: 1; }
  50% { transform: scale(1.5) rotate(180deg); opacity: 0.7; }
  100% { transform: scale(0) rotate(360deg); opacity: 0; }
`;

// Услублар (Стили)
const DashboardContainer = styled(Box)(({ theme }) => ({
  background: '#000000',
  minHeight: '80vh',
  borderRadius: theme.breakpoints.down('sm') ? '0' : '25px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.breakpoints.down('sm') ? '15px' : '20px',
  gap: theme.breakpoints.down('sm') ? '15px' : '20px',
  position: 'relative',
  overflow: 'auto', // Добавляем скролл для всего контейнера
  animation: `${fadeIn} 0.8s ease-in-out`,
  width: '100%',
  boxSizing: 'border-box',
  borderRadius: '25px',
  maxHeight: 'calc(100vh - 127px)',
  scrollbarWidth: 'thin',
  scrollbarColor: 'rgba(255, 0, 122, 0.5) rgba(255, 255, 255, 0.1)',
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '10px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'rgba(255, 0, 122, 0.5)',
    borderRadius: '10px',
  },
}));

const TaskCard = styled(Card)(({ theme }) => ({
  width: '100%',
  background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.08))',
  borderRadius: '20px',
  padding: theme.breakpoints.down('sm') ? '10px' : '15px',
  margin: '10px 0',
  boxShadow: '0 5px 20px rgba(0, 0, 0, 0.8), 0 0 10px rgba(255, 0, 122, 0.3)',
  border: '1px solid rgba(255, 0, 122, 0.2)',
  backdropFilter: 'blur(15px)',
  position: 'relative',
  overflow: 'hidden',
  animation: `${fadeIn} 0.6s ease-in-out`,
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.9), 0 0 20px rgba(255, 0, 122, 0.5)',
    transform: 'translateY(-3px)',
    border: '1px solid rgba(255, 0, 122, 0.5)',
  },
  '&:focus-within': {
    outline: '2px solid #FF007A',
    outlineOffset: '2px',
  },
}));

const TaskTitle = styled(Typography)(({ theme }) => ({
  fontSize: theme.breakpoints.down('sm') ? '18px' : '24px',
  fontWeight: 700,
  color: '#FFFFFF',
  textShadow: '0 0 10px rgba(255, 0, 122, 0.5)',
  marginBottom: '10px',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  fontFamily: "'Orbitron', sans-serif",
  '&:focus-within': {
    outline: '2px solid #FF007A',
    outlineOffset: '2px',
  },
}));

const TaskDescription = styled(Typography)(({ theme }) => ({
  fontSize: theme.breakpoints.down('sm') ? '14px' : '16px',
  color: '#FFFFFF',
  whiteSpace: 'pre-wrap',
  background: 'rgba(255, 255, 255, 0.03)',
  padding: '10px',
  borderRadius: '15px',
  boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255, 0, 122, 0.1)',
  lineHeight: '1.6',
  opacity: '0.9',
  marginBottom: '15px',
  fontFamily: "'Roboto', sans-serif",
  width: '100%',
  boxSizing: 'border-box',
  '&:focus-within': {
    outline: '2px solid #FF007A',
    outlineOffset: '2px',
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

const Confetti = styled(Box)(({ delay, theme }) => ({
  position: 'absolute',
  width: '15px',
  height: '15px',
  background: 'linear-gradient(45deg, #FF007A, #00FFDD)',
  borderRadius: '50%',
  animation: `${burstAnimation} 2s ease-out infinite`,
  animationDelay: `${delay}s`,
  transformOrigin: 'center',
  zIndex: 5,
  boxShadow: '0 0 10px rgba(255, 0, 122, 0.5)',
}));

const CustomTextarea = styled('textarea')(({ theme }) => ({
  width: '100%',
  minHeight: '100px',
  background: 'rgba(255, 255, 255, 0.03)',
  color: '#FFFFFF',
  borderRadius: '15px',
  padding: '10px',
  border: '1px solid rgba(255, 0, 122, 0.3)',
  fontFamily: "'Roboto', sans-serif",
  fontSize: '16px',
  resize: 'vertical',
  outline: 'none',
  transition: 'all 0.3s ease',
  boxSizing: 'border-box',
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
}));

const CustomLabel = styled('label')(({ theme }) => ({
  color: '#FFFFFF',
  textShadow: '0 0 5px rgba(255, 0, 122, 0.5)',
  fontFamily: "'Roboto', sans-serif",
  fontSize: '16px',
  marginBottom: '5px',
  display: 'block',
  '&:focus-within': {
    outline: '2px solid #FF007A',
    outlineOffset: '2px',
  },
}));

const StudentDashboard = () => {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [solution, setSolution] = useState('');
  const [isSendingSolution, setIsSendingSolution] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const { speakText, stopSpeech } = useContext(AccessibilityContext);
  const { t, language } = useLanguage(); // Use the LanguageContext
  const navigate = useNavigate();

  const handleSpeak = (text) => {
    speakText(text);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const role = localStorage.getItem('role');

    if (!token || !storedUser || role !== 'student') {
      navigate('/login');
      return;
    }
    setUser(storedUser);

    // Topshiriqlarni yuklash
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/student-tasks`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(response.data);
      } catch (error) {
        console.error('Topshiriqlarni yuklashda xatolik:', error);
        handleSpeak(t('errorFetchTasks'));
      }
    };

    fetchTasks();
  }, [navigate, t]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    navigate('/login');
    handleSpeak(t('loggedOut'));
  };

  const sendSolution = async (taskId) => {
    if (!solution.trim()) {
      alert(t('errorEmptySolution'));
      handleSpeak(t('errorEmptySolution'));
      return;
    }

    setIsSendingSolution(taskId);
    handleSpeak(t('sending'));

    try {
      const response = await axios.post(`${API_BASE_URL}/send-solution`, { taskId, solution }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      setTasks((prev) =>
        prev.map((task) =>
          task._id === taskId ? { ...task, status: 'completed' } : task
        )
      );
      setSolution('');
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
      alert(t('successSendSolution'));
      handleSpeak(t('successSendSolution'));
    } catch (error) {
      console.error('Yechim yuborishda xatolik:', error);
      alert(t('errorSendSolution'));
      handleSpeak(t('errorSendSolution'));
    } finally {
      setIsSendingSolution(null);
    }
  };

  if (!user) return null;

  return (
    <DashboardContainer>
      {showConfetti && (
        <>
          {Array.from({ length: 50 }).map((_, i) => (
            <Confetti
              key={i}
              delay={i * 0.03}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </>
      )}
      <Box
        sx={{
          mb: 3,
          width: '100%',
          maxWidth: { xs: '100%', sm: '90%', md: '1200px' },
          mx: 'auto',
          px: { xs: 1, sm: 2 },
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography
          sx={{
            color: '#FFFFFF',
            fontSize: { xs: '18px', sm: '24px' },
            fontFamily: "'Orbitron', sans-serif",
            textShadow: '0 0 10px rgba(255, 0, 122, 0.5)',
          }}
          onMouseEnter={() => handleSpeak(t('welcome', user.firstName, user.lastName))}
          onMouseLeave={stopSpeech}
          onTouchStart={() => handleSpeak(t('welcome', user.firstName, user.lastName))}
          onTouchEnd={stopSpeech}
          onFocus={() => handleSpeak(t('welcome', user.firstName, user.lastName))}
          onBlur={stopSpeech}
          tabIndex={0}
          role="heading"
          aria-level="1"
        >
          {t('welcome', user.firstName, user.lastName)}
        </Typography>
        <Button
          onClick={handleLogout}
          sx={{
            background: 'linear-gradient(135deg, #FF007A, #00FFDD)',
            color: '#FFFFFF',
            borderRadius: '15px',
            padding: '8px 20px',
            textTransform: 'none',
            boxShadow: '0 5px 15px rgba(255, 0, 122, 0.5)',
            fontFamily: "'Orbitron', sans-serif",
            '&:hover': {
              background: 'linear-gradient(135deg, #00FFDD, #FF007A)',
              boxShadow: '0 10px 25px rgba(255, 0, 122, 0.8)',
            },
            '&:focus-within': {
              outline: '2px solid #FF007A',
              outlineOffset: '2px',
            },
          }}
          onMouseEnter={() => handleSpeak(t('logout'))}
          onMouseLeave={stopSpeech}
          onTouchStart={() => handleSpeak(t('logout'))}
          onTouchEnd={stopSpeech}
          onFocus={() => handleSpeak(t('logout'))}
          onBlur={stopSpeech}
          tabIndex={0}
          aria-label={t('logout')}
        >
          {t('logout')}
        </Button>
      </Box>

      {/* Bo‘lim: Topshiriqlarni olish va yuborish */}
      <Box
        sx={{
          mb: 3,
          width: '100%',
          maxWidth: { xs: '100%', sm: '90%', md: '1200px' },
          mx: 'auto',
          px: { xs: 1, sm: 2 },
        }}
      >
        <TaskTitle
          onMouseEnter={() => handleSpeak(t('yourTasks'))}
          onMouseLeave={stopSpeech}
          onTouchStart={() => handleSpeak(t('yourTasks'))}
          onTouchEnd={stopSpeech}
          onFocus={() => handleSpeak(t('yourTasks'))}
          onBlur={stopSpeech}
          tabIndex={0}
          role="heading"
          aria-level="2"
        >
          <EmailIcon sx={{ color: '#FF007A' }} /> {t('yourTasks')}
        </TaskTitle>
        {tasks.length === 0 ? (
          <Typography
            sx={{
              color: '#FFFFFF',
              opacity: 0.7,
              textAlign: 'center',
              fontFamily: "'Roboto', sans-serif",
            }}
            onMouseEnter={() => handleSpeak(t('noTasks'))}
            onMouseLeave={stopSpeech}
            onTouchStart={() => handleSpeak(t('noTasks'))}
            onTouchEnd={stopSpeech}
            onFocus={() => handleSpeak(t('noTasks'))}
            onBlur={stopSpeech}
            tabIndex={0}
          >
            {t('noTasks')}
          </Typography>
        ) : (
          tasks.map((task) => (
            <TaskCard key={task._id}>
              <CardContent>
                <TaskTitle
                  onMouseEnter={() => handleSpeak(t('taskFromTeacher'))}
                  onMouseLeave={stopSpeech}
                  onTouchStart={() => handleSpeak(t('taskFromTeacher'))}
                  onTouchEnd={stopSpeech}
                  onFocus={() => handleSpeak(t('taskFromTeacher'))}
                  onBlur={stopSpeech}
                  tabIndex={0}
                >
                  {t('taskFromTeacher')}
                </TaskTitle>
                <TaskDescription
                  onMouseEnter={() => handleSpeak(`${t('taskFromTeacher')}: ${task.message}`)}
                  onMouseLeave={stopSpeech}
                  onTouchStart={() => handleSpeak(`${t('taskFromTeacher')}: ${task.message}`)}
                  onTouchEnd={stopSpeech}
                  onFocus={() => handleSpeak(`${t('taskFromTeacher')}: ${task.message}`)}
                  onBlur={stopSpeech}
                  tabIndex={0}
                >
                  {task.message}
                </TaskDescription>
                <Typography
                  sx={{
                    color: '#FFFFFF',
                    mb: 2,
                    opacity: 0.8,
                    fontFamily: "'Roboto', sans-serif",
                  }}
                  onMouseEnter={() => handleSpeak(t('received', new Date(task.createdAt).toLocaleDateString(language === 'uz' ? 'uz-UZ' : 'ru-RU')))}
                  onMouseLeave={stopSpeech}
                  onTouchStart={() => handleSpeak(t('received', new Date(task.createdAt).toLocaleDateString(language === 'uz' ? 'uz-UZ' : 'ru-RU')))}
                  onTouchEnd={stopSpeech}
                  onFocus={() => handleSpeak(t('received', new Date(task.createdAt).toLocaleDateString(language === 'uz' ? 'uz-UZ' : 'ru-RU')))}
                  onBlur={stopSpeech}
                  tabIndex={0}
                >
                  {t('received', new Date(task.createdAt).toLocaleDateString(language === 'uz' ? 'uz-UZ' : 'ru-RU'))}
                </Typography>
                {task.status === 'sent' ? (
                  <>
                    <Box sx={{ mb: 2 }}>
                      <CustomLabel
                        htmlFor={`solution-${task._id}`}
                        onMouseEnter={() => handleSpeak(t('yourSolution'))}
                        onMouseLeave={stopSpeech}
                        onTouchStart={() => handleSpeak(t('yourSolution'))}
                        onTouchEnd={stopSpeech}
                        onFocus={() => handleSpeak(t('yourSolution'))}
                        onBlur={stopSpeech}
                      >
                        {t('yourSolution')}
                      </CustomLabel>
                      <CustomTextarea
                        id={`solution-${task._id}`}
                        value={solution}
                        onChange={(e) => setSolution(e.target.value)}
                        placeholder={t('solutionPlaceholder')}
                        onFocus={() => handleSpeak(t('solutionPlaceholder'))}
                        onBlur={stopSpeech}
                        aria-label={t('solutionPlaceholder')}
                        tabIndex={0}
                      />
                    </Box>
                    <SubmitButton
                      onClick={() => sendSolution(task._id)}
                      disabled={isSendingSolution === task._id}
                      onMouseEnter={() => handleSpeak(t('sendSolution'))}
                      onMouseLeave={stopSpeech}
                      onTouchStart={() => handleSpeak(t('sendSolution'))}
                      onTouchEnd={stopSpeech}
                      onFocus={() => handleSpeak(t('sendSolution'))}
                      onBlur={stopSpeech}
                      tabIndex={0}
                      aria-label={t('sendSolution')}
                    >
                      {isSendingSolution === task._id ? (
                        <CircularProgress size={20} sx={{ color: '#FFFFFF', mr: 1 }} />
                      ) : (
                        <SendIcon sx={{ mr: 1, color: '#FFFFFF' }} />
                      )}
                      {isSendingSolution === task._id ? t('sending') : t('sendSolution')}
                    </SubmitButton>
                  </>
                ) : (
                  <Typography
                    sx={{
                      color: '#00FFDD',
                      fontFamily: "'Roboto', sans-serif",
                    }}
                    onMouseEnter={() => handleSpeak(t('solutionSent'))}
                    onMouseLeave={stopSpeech}
                    onTouchStart={() => handleSpeak(t('solutionSent'))}
                    onTouchEnd={stopSpeech}
                    onFocus={() => handleSpeak(t('solutionSent'))}
                    onBlur={stopSpeech}
                    tabIndex={0}
                  >
                    {t('solutionSent')}
                  </Typography>
                )}
              </CardContent>
            </TaskCard>
          ))
        )}
      </Box>
    </DashboardContainer>
  );
};

export default StudentDashboard;