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
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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

const burstAnimation = keyframes`
  0% { transform: scale(0) rotate(0deg); opacity: 1; }
  50% { transform: scale(1.5) rotate(180deg); opacity: 0.7; }
  100% { transform: scale(0) rotate(360deg); opacity: 0; }
`;

// Стили
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
  overflow: 'hidden',
  animation: `${fadeIn} 0.8s ease-in-out`,
  width: '100%',
  boxSizing: 'border-box',
  borderRadius: '25px',
  maxHeight: 'calc(100vh - 127px)',
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
    flexDirection: 'column', // На мобильных устройствах секции будут одна под другой
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
  height: 'calc(100vh - 120px)', // Высота с учетом шапки
  overflowY: 'auto', // Скролл внутри секции
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
    height: 'auto', // На мобильных устройствах высота автоматическая
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
}));

const StatusChip = styled(Chip)(({ theme, status }) => ({
  background: status === 'completed' || status === 'checked' ? 'rgba(0, 255, 0, 0.2)' : 'rgba(255, 255, 255, 0.05)',
  color: '#FFFFFF',
  border: '1px solid rgba(255, 0, 122, 0.3)',
  fontWeight: 600,
  animation: (status === 'completed' || status === 'checked') ? `${pulseAnimation} 1.5s ease-in-out infinite` : 'none',
  margin: theme.spacing(0.5),
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
  fontFamily: "'Roboto', sans-serif",
  boxShadow: (status === 'completed' || status === 'checked') ? '0 0 10px rgba(0, 255, 0, 0.5)' : 'none',
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

    // Загружаем учеников
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/students`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStudents(response.data);
      } catch (error) {
        console.error('Ошибка загрузки учеников:', error);
      }
    };

    // Загружаем задания
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/tasks`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(response.data);
      } catch (error) {
        console.error('Ошибка загрузки заданий:', error);
      }
    };

    // Загружаем решения
    const fetchSolutions = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/solutions`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSolutions(response.data);
      } catch (error) {
        console.error('Ошибка загрузки решений:', error);
      }
    };

    fetchStudents();
    fetchTasks();
    fetchSolutions();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    navigate('/login');
    handleSpeak('Вы вышли из системы');
  };

  const sendTaskToStudent = async () => {
    if (!selectedStudent || !taskMessage.trim()) {
      alert('Пожалуйста, выберите ученика и введите задание.');
      handleSpeak('Пожалуйста, выберите ученика и введите задание.');
      return;
    }

    const student = students.find((s) => s._id === selectedStudent);
    if (!student) return;

    setIsSendingTask(true);
    handleSpeak('Отправка задания...');

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
      alert('Задание успешно отправлено ученику!');
      handleSpeak(`Задание успешно отправлено ученику ${student.firstName} ${student.lastName}`);
    } catch (error) {
      console.error('Ошибка отправки задания:', error);
      alert('Ошибка при отправке задания');
      handleSpeak('Ошибка при отправке задания');
    } finally {
      setIsSendingTask(false);
    }
  };

  const checkSolution = async (solutionId) => {
    setIsCheckingSolution(solutionId);
    handleSpeak('Проверка решения...');

    try {
      const response = await axios.post(`${API_BASE_URL}/check-solution`, { solutionId }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      setSolutions((prev) =>
        prev.map((sol) =>
          sol._id === solutionId ? { ...sol, status: 'checked' } : sol
        )
      );
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
      alert('Решение отмечено как проверенное!');
      handleSpeak('Решение отмечено как проверенное');
    } catch (error) {
      console.error('Ошибка проверки решения:', error);
      alert('Ошибка при проверке решения');
      handleSpeak('Ошибка при проверке решения');
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
          onMouseEnter={() => handleSpeak(`Добро пожаловать, ${user.firstName} ${user.lastName}`)}
          onMouseLeave={stopSpeech}
          onFocus={() => handleSpeak(`Добро пожаловать, ${user.firstName} ${user.lastName}`)}
          onBlur={stopSpeech}
          tabIndex={0}
        >
          Добро пожаловать, {user.firstName} {user.lastName}
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
          }}
          onMouseEnter={() => handleSpeak('Выйти')}
          onMouseLeave={stopSpeech}
          onFocus={() => handleSpeak('Выйти')}
          onBlur={stopSpeech}
          tabIndex={0}
        >
          Выйти
        </Button>
      </Box>

      <ContentWrapper>
        {/* Левая часть: Отправка домашних заданий */}
        <Section>
          <TaskTitle
            onMouseEnter={() => handleSpeak('Отправить индивидуальное задание')}
            onMouseLeave={stopSpeech}
            onFocus={() => handleSpeak('Отправить индивидуальное задание')}
            onBlur={stopSpeech}
            tabIndex={0}
          >
            <EmailIcon sx={{ color: '#FF007A' }} /> Отправить индивидуальное задание
          </TaskTitle>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel
              sx={{ color: '#FFFFFF', textShadow: '0 0 5px rgba(255, 0, 122, 0.5)' }}
              onMouseEnter={() => handleSpeak('Выберите ученика')}
              onMouseLeave={stopSpeech}
              onFocus={() => handleSpeak('Выберите ученика')}
              onBlur={stopSpeech}
            >
              Выберите ученика
            </InputLabel>
            <Select
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
              sx={{
                background: 'rgba(255, 255, 255, 0.03)',
                color: '#FFFFFF',
                borderRadius: '15px',
                '& .MuiSelect-icon': { color: '#FF007A' },
                '& .MuiOutlinedInput-notchedOutline': {
                  border: '1px solid rgba(255, 0, 122, 0.3)',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  border: '1px solid rgba(255, 0, 122, 0.5)',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  border: '1px solid rgba(255, 0, 122, 0.8)',
                },
                fontFamily: "'Roboto', sans-serif",
              }}
              onMouseEnter={() => handleSpeak('Выберите ученика')}
              onMouseLeave={stopSpeech}
              onFocus={() => handleSpeak('Выберите ученика')}
              onBlur={stopSpeech}
              tabIndex={0}
            >
              {students.map((student) => (
                <MenuItem key={student._id} value={student._id}>
                  {student.firstName} {student.lastName} (Логин: {student.login})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box sx={{ mb: 2 }}>
            <CustomLabel
              htmlFor="task-message"
              onMouseEnter={() => handleSpeak('Введите задание или сообщение')}
              onMouseLeave={stopSpeech}
              onFocus={() => handleSpeak('Введите задание или сообщение')}
              onBlur={stopSpeech}
            >
              Задание или сообщение
            </CustomLabel>
            <CustomTextarea
              id="task-message"
              value={taskMessage}
              onChange={(e) => setTaskMessage(e.target.value)}
              placeholder="Введите задание или сообщение..."
              onFocus={() => handleSpeak('Введите задание или сообщение')}
              onBlur={stopSpeech}
              aria-label="Введите задание или сообщение"
              tabIndex={0}
            />
          </Box>
          <SubmitButton
            onClick={sendTaskToStudent}
            disabled={isSendingTask}
            onMouseEnter={() => handleSpeak('Отправить задание')}
            onMouseLeave={stopSpeech}
            onFocus={() => handleSpeak('Отправить задание')}
            onBlur={stopSpeech}
            tabIndex={0}
          >
            {isSendingTask ? (
              <CircularProgress size={20} sx={{ color: '#FFFFFF', mr: 1 }} />
            ) : (
              <SendIcon sx={{ mr: 1, color: '#FFFFFF' }} />
            )}
            {isSendingTask ? 'Отправка...' : 'Отправить задание'}
          </SubmitButton>

          <TaskTitle
            sx={{ mt: 4 }}
            onMouseEnter={() => handleSpeak('Список отправленных заданий')}
            onMouseLeave={stopSpeech}
            onFocus={() => handleSpeak('Список отправленных заданий')}
            onBlur={stopSpeech}
            tabIndex={0}
          >
            <EmailIcon sx={{ color: '#FF007A' }} /> Список отправленных заданий
          </TaskTitle>
          {tasks.length === 0 ? (
            <Typography
              sx={{
                color: '#FFFFFF',
                opacity: 0.7,
                textAlign: 'center',
                fontFamily: "'Roboto', sans-serif",
              }}
              onMouseEnter={() => handleSpeak('Нет отправленных заданий')}
              onMouseLeave={stopSpeech}
              onFocus={() => handleSpeak('Нет отправленных заданий')}
              onBlur={stopSpeech}
              tabIndex={0}
            >
              Нет отправленных заданий
            </Typography>
          ) : (
            tasks.map((task) => (
              <TaskCard key={task._id}>
                <CardContent>
                  <TaskTitle
                    onMouseEnter={() => handleSpeak(`Задание для ${task.studentName}`)}
                    onMouseLeave={stopSpeech}
                    onFocus={() => handleSpeak(`Задание для ${task.studentName}`)}
                    onBlur={stopSpeech}
                    tabIndex={0}
                  >
                    Задание для {task.studentName}
                  </TaskTitle>
                  <TaskDescription
                    onMouseEnter={() => handleSpeak(`Текст задания: ${task.message}`)}
                    onMouseLeave={stopSpeech}
                    onFocus={() => handleSpeak(`Текст задания: ${task.message}`)}
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
                    onMouseEnter={() => handleSpeak(`Отправлено: ${new Date(task.createdAt).toLocaleDateString()}`)}
                    onMouseLeave={stopSpeech}
                    onFocus={() => handleSpeak(`Отправлено: ${new Date(task.createdAt).toLocaleDateString()}`)}
                    onBlur={stopSpeech}
                    tabIndex={0}
                  >
                    Отправлено: {new Date(task.createdAt).toLocaleDateString()}
                  </Typography>
                  <StatusChip
                    label={task.status === 'completed' ? 'Выполнено' : 'Ожидает выполнения'}
                    status={task.status}
                    icon={task.status === 'completed' ? <CheckCircleIcon sx={{ color: '#00FFDD' }} /> : null}
                    onMouseEnter={() => handleSpeak(task.status === 'completed' ? 'Задание выполнено' : 'Ожидает выполнения')}
                    onMouseLeave={stopSpeech}
                    onFocus={() => handleSpeak(task.status === 'completed' ? 'Задание выполнено' : 'Ожидает выполнения')}
                    onBlur={stopSpeech}
                    tabIndex={0}
                  />
                </CardContent>
              </TaskCard>
            ))
          )}
        </Section>

        {/* Правая часть: Проверка домашних заданий */}
        <Section>
          <TaskTitle
            onMouseEnter={() => handleSpeak('Проверка домашних заданий')}
            onMouseLeave={stopSpeech}
            onFocus={() => handleSpeak('Проверка домашних заданий')}
            onBlur={stopSpeech}
            tabIndex={0}
          >
            <EmailIcon sx={{ color: '#FF007A' }} /> Проверка домашних заданий
          </TaskTitle>
          {solutions.length === 0 ? (
            <Typography
              sx={{
                color: '#FFFFFF',
                opacity: 0.7,
                textAlign: 'center',
                fontFamily: "'Roboto', sans-serif",
              }}
              onMouseEnter={() => handleSpeak('Нет решений от учеников')}
              onMouseLeave={stopSpeech}
              onFocus={() => handleSpeak('Нет решений от учеников')}
              onBlur={stopSpeech}
              tabIndex={0}
            >
              Нет решений от учеников
            </Typography>
          ) : (
            solutions.map((solution) => (
              <TaskCard key={solution._id}>
                <CardContent>
                  <TaskTitle
                    onMouseEnter={() => handleSpeak(`Решение от ${solution.studentName}`)}
                    onMouseLeave={stopSpeech}
                    onFocus={() => handleSpeak(`Решение от ${solution.studentName}`)}
                    onBlur={stopSpeech}
                    tabIndex={0}
                  >
                    Решение от {solution.studentName}
                  </TaskTitle>
                  <TaskDescription
                    onMouseEnter={() => handleSpeak(`Решение: ${solution.solution}`)}
                    onMouseLeave={stopSpeech}
                    onFocus={() => handleSpeak(`Решение: ${solution.solution}`)}
                    onBlur={stopSpeech}
                    tabIndex={0}
                  >
                    Решение: {solution.solution}
                  </TaskDescription>
                  <Typography
                    sx={{
                      color: '#FFFFFF',
                      mb: 2,
                      opacity: 0.8,
                      fontFamily: "'Roboto', sans-serif",
                    }}
                    onMouseEnter={() => handleSpeak(`Отправлено: ${new Date(solution.createdAt).toLocaleDateString()}`)}
                    onMouseLeave={stopSpeech}
                    onFocus={() => handleSpeak(`Отправлено: ${new Date(solution.createdAt).toLocaleDateString()}`)}
                    onBlur={stopSpeech}
                    tabIndex={0}
                  >
                    Отправлено: {new Date(solution.createdAt).toLocaleDateString()}
                  </Typography>
                  {solution.status === 'pending' ? (
                    <SubmitButton
                      onClick={() => checkSolution(solution._id)}
                      disabled={isCheckingSolution === solution._id}
                      onMouseEnter={() => handleSpeak('Отметить как проверенное')}
                      onMouseLeave={stopSpeech}
                      onFocus={() => handleSpeak('Отметить как проверенное')}
                      onBlur={stopSpeech}
                      tabIndex={0}
                    >
                      {isCheckingSolution === solution._id ? (
                        <CircularProgress size={20} sx={{ color: '#FFFFFF', mr: 1 }} />
                      ) : (
                        <CheckCircleIcon sx={{ mr: 1, color: '#FFFFFF' }} />
                      )}
                      {isCheckingSolution === solution._id ? 'Проверка...' : 'Отметить как проверенное'}
                    </SubmitButton>
                  ) : (
                    <StatusChip
                      label="Проверено"
                      status="checked"
                      icon={<CheckCircleIcon sx={{ color: '#00FFDD' }} />}
                      onMouseEnter={() => handleSpeak('Решение проверено')}
                      onMouseLeave={stopSpeech}
                      onFocus={() => handleSpeak('Решение проверено')}
                      onBlur={stopSpeech}
                      tabIndex={0}
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