import React, { useState, useEffect, useContext } from 'react';
import { styled, keyframes } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import EmailIcon from '@mui/icons-material/Email';
import SendIcon from '@mui/icons-material/Send';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { AccessibilityContext } from '../voice/AccessibilityContext';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// API base URL
const API_BASE_URL = 'https://code-voice-server.vercel.app';

// Animations
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

// Styles
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
  overflow: 'auto',
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

const ContentWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  maxWidth: '1400px',
  margin: '0 auto',
  gap: theme.spacing(3),
  flex: 1,
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
  },
}));

const Section = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  background: 'rgba(255, 255, 255, 0.02)',
  borderRadius: '20px',
  padding: theme.spacing(2),
  boxShadow: '0 5px 20px rgba(0, 0, 0, 0.8)',
  border: '1px solid rgba(255, 0, 122, 0.2)',
  backdropFilter: 'blur(15px)',
  minHeight: '300px',
  overflowY: 'auto',
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
  [theme.breakpoints.down('md')]: {
    height: 'auto',
    minHeight: '300px',
  },
}));

const TaskCard = styled(Card)(({ theme }) => ({
  width: '100%',
  background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.08))',
  borderRadius: '20px',
  padding: theme.spacing(2),
  margin: theme.spacing(1, 0),
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
  marginBottom: theme.spacing(2),
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
  padding: theme.spacing(1.5),
  borderRadius: '15px',
  boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255, 0, 122, 0.1)',
  lineHeight: 1.6,
  opacity: 0.9,
  marginBottom: theme.spacing(2),
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
  width: '100%',
  marginBottom: theme.spacing(1),
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

const StatusChip = styled(Chip)(({ theme, status }) => ({
  background: status === 'completed' || status === 'checked' ? 'rgba(0, 255, 0, 0.2)' : 'rgba(255, 255, 255, 0.05)',
  color: '#FFFFFF',
  border: '1px solid rgba(255, 0, 122, 0.3)',
  fontWeight: 600,
  animation: status === 'completed' || status === 'checked' ? `${pulseAnimation} 1.5s ease-in-out infinite` : 'none',
  margin: theme.spacing(0.5),
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
  fontFamily: "'Roboto', sans-serif",
  boxShadow: status === 'completed' || status === 'checked' ? '0 0 10px rgba(0, 255, 0, 0.5)' : 'none',
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
  padding: theme.spacing(1.5),
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
  [theme.breakpoints.down('sm')]: {
    fontSize: '14px',
    padding: theme.spacing(1),
  },
}));

const CustomLabel = styled('label')(({ theme }) => ({
  color: '#FFFFFF',
  textShadow: '0 0 5px rgba(255, 0, 122, 0.5)',
  fontFamily: "'Roboto', sans-serif",
  fontSize: '16px',
  marginBottom: theme.spacing(1),
  display: 'block',
  [theme.breakpoints.down('sm')]: {
    fontSize: '14px',
  },
  '&:focus-within': {
    outline: '2px solid #FF007A',
    outlineOffset: '2px',
  },
}));

const CustomFormControl = styled(FormControl)(({ theme }) => ({
  width: '100%',
  marginBottom: theme.spacing(2),
  '& .MuiInputLabel-root': {
    color: '#FFFFFF',
    textShadow: '0 0 5px rgba(255, 0, 122, 0.5)',
    '&.Mui-focused': {
      color: '#FFFFFF',
    },
  },
  '& .MuiSelect-select': {
    color: '#FFFFFF',
    background: 'rgba(255, 255, 255, 0.03)',
    borderRadius: '15px',
    padding: theme.spacing(1.5),
    '&:focus': {
      background: 'rgba(255, 255, 255, 0.03)',
      borderRadius: '15px',
    },
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: '1px solid rgba(255, 0, 122, 0.3)',
      borderRadius: '15px',
    },
    '&:hover fieldset': {
      border: '1px solid rgba(255, 0, 122, 0.5)',
    },
    '&.Mui-focused fieldset': {
      border: '1px solid rgba(255, 0, 122, 0.8)',
    },
  },
  '& .MuiSvgIcon-root': {
    color: '#FF007A',
  },
  '&:focus-within': {
    outline: '2px solid #FF007A',
    outlineOffset: '2px',
  },
}));

const TeacherDashboard = () => {
  const [user, setUser] = useState(null);
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [taskMessage, setTaskMessage] = useState('');
  const [tasks, setTasks] = useState([]);
  const [solutions, setSolutions] = useState([]);
  const [isSendingTask, setIsSendingTask] = useState(false);
  const [isCheckingSolution, setIsCheckingSolution] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const { speakText, stopSpeech } = useContext(AccessibilityContext);
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const handleSpeak = (text) => {
    speakText(text);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const role = localStorage.getItem('role');

    if (!token || !storedUser || role !== 'teacher') {
      navigate('/login');
      return;
    }
    setUser(storedUser);

    const fetchStudents = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/students`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
        handleSpeak(t('errorFetchStudents'));
      }
    };

    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/tasks`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        handleSpeak(t('errorFetchTasks'));
      }
    };

    const fetchSolutions = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/solutions`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSolutions(response.data);
      } catch (error) {
        console.error('Error fetching solutions:', error);
        handleSpeak(t('errorFetchSolutions'));
      }
    };

    fetchStudents();
    fetchTasks();
    fetchSolutions();
  }, [navigate, t]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    navigate('/login');
    handleSpeak(t('loggedOut'));
  };

  const sendTaskToStudent = async () => {
    if (!selectedStudent || !taskMessage.trim()) {
      alert(t('errorSelectStudentAndTask'));
      handleSpeak(t('errorSelectStudentAndTask'));
      return;
    }

    const student = students.find((s) => s._id === selectedStudent);
    if (!student) return;

    setIsSendingTask(true);
    handleSpeak(t('sending'));

    const payload = {
      studentId: student._id,
      studentName: `${student.firstName} ${student.lastName}`,
      message: taskMessage,
    };

    try {
      const response = await axios.post(`${API_BASE_URL}/send-task`, payload, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      setTasks((prev) => [...prev, response.data.task]);
      setTaskMessage('');
      setSelectedStudent('');
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
      alert(t('successSendTask', `${student.firstName} ${student.lastName}`));
      handleSpeak(t('successSendTask', `${student.firstName} ${student.lastName}`));
    } catch (error) {
      console.error('Error sending task:', error);
      alert(t('errorSendTask'));
      handleSpeak(t('errorSendTask'));
    } finally {
      setIsSendingTask(false);
    }
  };

  const checkSolution = async (solutionId) => {
    setIsCheckingSolution(solutionId);
    handleSpeak(t('checking'));

    try {
      const response = await axios.post(
        `${API_BASE_URL}/check-solution`,
        { solutionId },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );

      setSolutions((prev) =>
        prev.map((sol) =>
          sol._id === solutionId ? { ...sol, status: 'checked' } : sol
        )
      );
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
      alert(t('successCheckSolution'));
      handleSpeak(t('successCheckSolution'));
    } catch (error) {
      console.error('Error checking solution:', error);
      alert(t('errorCheckSolution'));
      handleSpeak(t('errorCheckSolution'));
    } finally {
      setIsCheckingSolution(null);
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
          maxWidth: '1400px',
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

      <ContentWrapper>
        {/* Left Section: Send Homework */}
        <Section>
          <TaskTitle
            onMouseEnter={() => handleSpeak(t('sendPersonalTask'))}
            onMouseLeave={stopSpeech}
            onTouchStart={() => handleSpeak(t('sendPersonalTask'))}
            onTouchEnd={stopSpeech}
            onFocus={() => handleSpeak(t('sendPersonalTask'))}
            onBlur={stopSpeech}
            tabIndex={0}
            role="heading"
            aria-level="2"
          >
            <EmailIcon sx={{ color: '#FF007A' }} /> {t('sendPersonalTask')}
          </TaskTitle>
          <CustomFormControl>
            <InputLabel
              onMouseEnter={() => handleSpeak(t('selectStudent'))}
              onMouseLeave={stopSpeech}
              onTouchStart={() => handleSpeak(t('selectStudent'))}
              onTouchEnd={stopSpeech}
              onFocus={() => handleSpeak(t('selectStudent'))}
              onBlur={stopSpeech}
            >
              {t('selectStudent')}
            </InputLabel>
            <Select
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
              onMouseEnter={() => handleSpeak(t('selectStudent'))}
              onMouseLeave={stopSpeech}
              onTouchStart={() => handleSpeak(t('selectStudent'))}
              onTouchEnd={stopSpeech}
              onFocus={() => handleSpeak(t('selectStudent'))}
              onBlur={stopSpeech}
              tabIndex={0}
              aria-label={t('selectStudent')}
            >
              {students.map((student) => (
                <MenuItem key={student._id} value={student._id}>
                  {student.firstName} {student.lastName} (Login: {student.login})
                </MenuItem>
              ))}
            </Select>
          </CustomFormControl>
          <Box sx={{ mb: 2 }}>
            <CustomLabel
              htmlFor="task-message"
              onMouseEnter={() => handleSpeak(t('taskOrMessage'))}
              onMouseLeave={stopSpeech}
              onTouchStart={() => handleSpeak(t('taskOrMessage'))}
              onTouchEnd={stopSpeech}
              onFocus={() => handleSpeak(t('taskOrMessage'))}
              onBlur={stopSpeech}
            >
              {t('taskOrMessage')}
            </CustomLabel>
            <CustomTextarea
              id="task-message"
              value={taskMessage}
              onChange={(e) => setTaskMessage(e.target.value)}
              placeholder={t('taskPlaceholder')}
              onFocus={() => handleSpeak(t('taskPlaceholder'))}
              onBlur={stopSpeech}
              aria-label={t('taskPlaceholder')}
              tabIndex={0}
            />
          </Box>
          <SubmitButton
            onClick={sendTaskToStudent}
            disabled={isSendingTask}
            onMouseEnter={() => handleSpeak(t('sendTask'))}
            onMouseLeave={stopSpeech}
            onTouchStart={() => handleSpeak(t('sendTask'))}
            onTouchEnd={stopSpeech}
            onFocus={() => handleSpeak(t('sendTask'))}
            onBlur={stopSpeech}
            tabIndex={0}
            aria-label={t('sendTask')}
          >
            {isSendingTask ? (
              <CircularProgress size={20} sx={{ color: '#FFFFFF', mr: 1 }} />
            ) : (
              <SendIcon sx={{ mr: 1, color: '#FFFFFF' }} />
            )}
            {isSendingTask ? t('sending') : t('sendTask')}
          </SubmitButton>

          <TaskTitle
            sx={{ mt: 4 }}
            onMouseEnter={() => handleSpeak(t('sentTasksList'))}
            onMouseLeave={stopSpeech}
            onTouchStart={() => handleSpeak(t('sentTasksList'))}
            onTouchEnd={stopSpeech}
            onFocus={() => handleSpeak(t('sentTasksList'))}
            onBlur={stopSpeech}
            tabIndex={0}
            role="heading"
            aria-level="2"
          >
            <EmailIcon sx={{ color: '#FF007A' }} /> {t('sentTasksList')}
          </TaskTitle>
          {tasks.length === 0 ? (
            <Typography
              sx={{
                color: '#FFFFFF',
                opacity: 0.7,
                textAlign: 'center',
                fontFamily: "'Roboto', sans-serif",
              }}
              onMouseEnter={() => handleSpeak(t('noSentTasks'))}
              onMouseLeave={stopSpeech}
              onTouchStart={() => handleSpeak(t('noSentTasks'))}
              onTouchEnd={stopSpeech}
              onFocus={() => handleSpeak(t('noSentTasks'))}
              onBlur={stopSpeech}
              tabIndex={0}
            >
              {t('noSentTasks')}
            </Typography>
          ) : (
            tasks.map((task) => (
              <TaskCard key={task._id}>
                <CardContent>
                  <TaskTitle
                    onMouseEnter={() => handleSpeak(t('taskForStudent', task.studentName))}
                    onMouseLeave={stopSpeech}
                    onTouchStart={() => handleSpeak(t('taskForStudent', task.studentName))}
                    onTouchEnd={stopSpeech}
                    onFocus={() => handleSpeak(t('taskForStudent', task.studentName))}
                    onBlur={stopSpeech}
                    tabIndex={0}
                  >
                    {t('taskForStudent', task.studentName)}
                  </TaskTitle>
                  <TaskDescription
                    onMouseEnter={() => handleSpeak(`${t('taskText')}: ${task.message}`)}
                    onMouseLeave={stopSpeech}
                    onTouchStart={() => handleSpeak(`${t('taskText')}: ${task.message}`)}
                    onTouchEnd={stopSpeech}
                    onFocus={() => handleSpeak(`${t('taskText')}: ${task.message}`)}
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
                    onMouseEnter={() =>
                      handleSpeak(
                        t(
                          'sent',
                          new Date(task.createdAt).toLocaleDateString(
                            language === 'uz' ? 'uz-UZ' : 'ru-RU'
                          )
                        )
                      )
                    }
                    onMouseLeave={stopSpeech}
                    onTouchStart={() =>
                      handleSpeak(
                        t(
                          'sent',
                          new Date(task.createdAt).toLocaleDateString(
                            language === 'uz' ? 'uz-UZ' : 'ru-RU'
                          )
                        )
                      )
                    }
                    onTouchEnd={stopSpeech}
                    onFocus={() =>
                      handleSpeak(
                        t(
                          'sent',
                          new Date(task.createdAt).toLocaleDateString(
                            language === 'uz' ? 'uz-UZ' : 'ru-RU'
                          )
                        )
                      )
                    }
                    onBlur={stopSpeech}
                    tabIndex={0}
                  >
                    {t(
                      'sent',
                      new Date(task.createdAt).toLocaleDateString(
                        language === 'uz' ? 'uz-UZ' : 'ru-RU'
                      )
                    )}
                  </Typography>
                  <StatusChip
                    label={task.status === 'completed' ? t('taskCompleted') : t('taskPending')}
                    status={task.status}
                    icon={task.status === 'completed' ? <CheckCircleIcon sx={{ color: '#00FFDD' }} /> : null}
                    onMouseEnter={() =>
                      handleSpeak(task.status === 'completed' ? t('taskCompleted') : t('taskPending'))
                    }
                    onMouseLeave={stopSpeech}
                    onTouchStart={() =>
                      handleSpeak(task.status === 'completed' ? t('taskCompleted') : t('taskPending'))
                    }
                    onTouchEnd={stopSpeech}
                    onFocus={() =>
                      handleSpeak(task.status === 'completed' ? t('taskCompleted') : t('taskPending'))
                    }
                    onBlur={stopSpeech}
                    tabIndex={0}
                    aria-label={task.status === 'completed' ? t('taskCompleted') : t('taskPending')}
                  />
                </CardContent>
              </TaskCard>
            ))
          )}
        </Section>

        {/* Right Section: Check Homework */}
        <Section>
          <TaskTitle
            onMouseEnter={() => handleSpeak(t('checkSolutions'))}
            onMouseLeave={stopSpeech}
            onTouchStart={() => handleSpeak(t('checkSolutions'))}
            onTouchEnd={stopSpeech}
            onFocus={() => handleSpeak(t('checkSolutions'))}
            onBlur={stopSpeech}
            tabIndex={0}
            role="heading"
            aria-level="2"
          >
            <EmailIcon sx={{ color: '#FF007A' }} /> {t('checkSolutions')}
          </TaskTitle>
          {solutions.length === 0 ? (
            <Typography
              sx={{
                color: '#FFFFFF',
                opacity: 0.7,
                textAlign: 'center',
                fontFamily: "'Roboto', sans-serif",
              }}
              onMouseEnter={() => handleSpeak(t('noSolutions'))}
              onMouseLeave={stopSpeech}
              onTouchStart={() => handleSpeak(t('noSolutions'))}
              onTouchEnd={stopSpeech}
              onFocus={() => handleSpeak(t('noSolutions'))}
              onBlur={stopSpeech}
              tabIndex={0}
            >
              {t('noSolutions')}
            </Typography>
          ) : (
            solutions.map((solution) => (
              <TaskCard key={solution._id}>
                <CardContent>
                  <TaskTitle
                    onMouseEnter={() => handleSpeak(t('solutionFromStudent', solution.studentName))}
                    onMouseLeave={stopSpeech}
                    onTouchStart={() => handleSpeak(t('solutionFromStudent', solution.studentName))}
                    onTouchEnd={stopSpeech}
                    onFocus={() => handleSpeak(t('solutionFromStudent', solution.studentName))}
                    onBlur={stopSpeech}
                    tabIndex={0}
                  >
                    {t('solutionFromStudent', solution.studentName)}
                  </TaskTitle>
                  <TaskDescription
                    onMouseEnter={() => handleSpeak(`${t('solution')}: ${solution.solution}`)}
                    onMouseLeave={stopSpeech}
                    onTouchStart={() => handleSpeak(`${t('solution')}: ${solution.solution}`)}
                    onTouchEnd={stopSpeech}
                    onFocus={() => handleSpeak(`${t('solution')}: ${solution.solution}`)}
                    onBlur={stopSpeech}
                    tabIndex={0}
                  >
                    {t('solution')}: {solution.solution}
                  </TaskDescription>
                  <Typography
                    sx={{
                      color: '#FFFFFF',
                      mb: 2,
                      opacity: 0.8,
                      fontFamily: "'Roboto', sans-serif",
                    }}
                    onMouseEnter={() =>
                      handleSpeak(
                        t(
                          'sent',
                          new Date(solution.createdAt).toLocaleDateString(
                            language === 'uz' ? 'uz-UZ' : 'ru-RU'
                          )
                        )
                      )
                    }
                    onMouseLeave={stopSpeech}
                    onTouchStart={() =>
                      handleSpeak(
                        t(
                          'sent',
                          new Date(solution.createdAt).toLocaleDateString(
                            language === 'uz' ? 'uz-UZ' : 'ru-RU'
                          )
                        )
                      )
                    }
                    onTouchEnd={stopSpeech}
                    onFocus={() =>
                      handleSpeak(
                        t(
                          'sent',
                          new Date(solution.createdAt).toLocaleDateString(
                            language === 'uz' ? 'uz-UZ' : 'ru-RU'
                          )
                        )
                      )
                    }
                    onBlur={stopSpeech}
                    tabIndex={0}
                  >
                    {t(
                      'sent',
                      new Date(solution.createdAt).toLocaleDateString(
                        language === 'uz' ? 'uz-UZ' : 'ru-RU'
                      )
                    )}
                  </Typography>
                  {solution.status === 'pending' ? (
                    <SubmitButton
                      onClick={() => checkSolution(solution._id)}
                      disabled={isCheckingSolution === solution._id}
                      onMouseEnter={() => handleSpeak(t('markAsChecked'))}
                      onMouseLeave={stopSpeech}
                      onTouchStart={() => handleSpeak(t('markAsChecked'))}
                      onTouchEnd={stopSpeech}
                      onFocus={() => handleSpeak(t('markAsChecked'))}
                      onBlur={stopSpeech}
                      tabIndex={0}
                      aria-label={t('markAsChecked')}
                    >
                      {isCheckingSolution === solution._id ? (
                        <CircularProgress size={20} sx={{ color: '#FFFFFF', mr: 1 }} />
                      ) : (
                        <CheckCircleIcon sx={{ mr: 1, color: '#FFFFFF' }} />
                      )}
                      {isCheckingSolution === solution._id ? t('checking') : t('markAsChecked')}
                    </SubmitButton>
                  ) : (
                    <StatusChip
                      label={t('solutionChecked')}
                      status="checked"
                      icon={<CheckCircleIcon sx={{ color: '#00FFDD' }} />}
                      onMouseEnter={() => handleSpeak(t('solutionChecked'))}
                      onMouseLeave={stopSpeech}
                      onTouchStart={() => handleSpeak(t('solutionChecked'))}
                      onTouchEnd={stopSpeech}
                      onFocus={() => handleSpeak(t('solutionChecked'))}
                      onBlur={stopSpeech}
                      tabIndex={0}
                      aria-label={t('solutionChecked')}
                    />
                  )}
                </CardContent>
              </TaskCard>
            ))
          )}
        </Section>
      </ContentWrapper>
    </DashboardContainer>
  );
};

export default TeacherDashboard;