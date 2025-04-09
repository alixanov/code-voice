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

// Стили (без изменений)
const TaskContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  background: 'linear-gradient(135deg, #000000 10%, #1A1A1A 90%)',
  maxHeight: 'calc(100vh - 145px)',
  minHeight: '80vh',
  overflowY: 'auto',
  padding: theme.breakpoints.down('sm') ? '8px' : '15px',
  margin: theme.breakpoints.down('sm') ? '0' : '10px',
  marginTop: theme.breakpoints.down('sm') ? '0' : '10px',
  borderRadius: '25px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  boxSizing: 'border-box',
  scrollbarWidth: 'thin',
  scrollbarColor: '#FF007A rgba(255, 255, 255, 0.1)',
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'linear-gradient(135deg, #FF007A, #00FFDD)',
    borderRadius: '4px',
    boxShadow: '0 0 10px rgba(255, 0, 122, 0.5)',
    '&:hover': {
      background: 'linear-gradient(135deg, #00FFDD, #FF007A)',
    },
  },
  animation: `${fadeIn} 1s ease-in-out`,
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
  boxSizing: 'border-box',
  '&:hover': {
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.9), 0 0 20px rgba(255, 0, 122, 0.5)',
    transform: 'translateY(-3px)',
    border: '1px solid rgba(255, 0, 122, 0.5)',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '8px',
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
}));

const TaskDescription = styled(Typography)(({ theme }) => ({
  fontSize: theme.breakpoints.down('sm') ? '14px' : '16px',
  color: '#FFFFFF',
  whiteSpace: 'pre-wrap',
  background: 'rgba(255, 255, 255, 0.03)',
  padding: '10px',
  borderRadius: '15px',
  boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255, 0, 122, 0.1)',
  lineHeight: 1.6,
  opacity: 0.9,
  marginBottom: '15px',
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
  background: status === 'completed' ? 'rgba(0, 255, 0, 0.2)' : 'rgba(255, 255, 255, 0.05)',
  color: '#FFFFFF',
  border: '1px solid rgba(255, 0, 122, 0.3)',
  fontWeight: 600,
  animation: status === 'completed' ? `${pulseAnimation} 1.5s ease-in-out infinite` : 'none',
  margin: '5px',
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
  fontFamily: "'Roboto', sans-serif",
  boxShadow: status === 'completed' ? '0 0 10px rgba(0, 255, 0, 0.5)' : 'none',
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
  [theme.breakpoints.down('sm')]: {
    fontSize: '14px',
    padding: '8px',
  },
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

// Список учеников (пример)
const students = [
  { id: 1, name: 'Иван Иванов', email: 'alixanovshukurullo13@gmail.com' },
  { id: 2, name: 'Мария Петрова', email: 'dadabayevuz@gmail.com' },
  { id: 3, name: 'Алексей Сидоров', email: 'codenebula000@gmail.com' },
];

// Компонент Task
const Task = () => {
  const [userRole, setUserRole] = useState('teacher');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [taskMessage, setTaskMessage] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentSolution, setStudentSolution] = useState('');
  const [tasks, setTasks] = useState([]);
  const [submissionStatus, setSubmissionStatus] = useState({});
  const [isSendingTask, setIsSendingTask] = useState(false);
  const [isSendingSolution, setIsSendingSolution] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const { speakText, stopSpeech } = useContext(AccessibilityContext);

  const handleSpeak = (text) => {
    speakText(text);
  };

  // Загружаем задания из бэкенда при монтировании компонента
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:5000/tasks');
        const data = await response.json();
        setTasks(data);
        // Устанавливаем статусы на основе данных из MongoDB
        const statuses = {};
        data.forEach((task) => {
          statuses[task._id] = task.status;
        });
        setSubmissionStatus(statuses);
      } catch (error) {
        console.error('Ошибка загрузки заданий:', error);
      }
    };
    fetchTasks();
  }, []);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const sendTaskToStudent = async () => {
    if (!selectedStudent || !taskMessage.trim()) {
      alert('Пожалуйста, выберите ученика и введите задание.');
      handleSpeak('Пожалуйста, выберите ученика и введите задание.');
      return;
    }

    const student = students.find((s) => s.id === selectedStudent);
    if (!student) return;

    setIsSendingTask(true);
    handleSpeak('Отправка задания...');

    const payload = {
      studentId: student.id,
      studentName: student.name,
      studentEmail: student.email,
      taskMessage,
    };

    try {
      const response = await fetch('http://localhost:5000/send-task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (response.ok) {
        setTasks((prev) => [...prev, result.task]);
        setTaskMessage('');
        setSelectedStudent(null);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
        alert('Задание успешно отправлено ученику!');
        handleSpeak(`Задание успешно отправлено ученику ${student.name}`);
      } else {
        alert(`Ошибка при отправке задания: ${result.error || 'Попробуйте снова.'}`);
        handleSpeak('Ошибка при отправке задания. Попробуйте снова.');
      }
    } catch (error) {
      console.error('Ошибка отправки задания:', error);
      alert(`Произошла ошибка при отправке задания: ${error.message}`);
      handleSpeak('Произошла ошибка при отправке задания.');
    } finally {
      setIsSendingTask(false);
    }
  };

  const submitSolution = async (taskId) => {
    if (!studentEmail.trim() || !studentSolution.trim()) {
      alert('Пожалуйста, введите ваш email и решение.');
      handleSpeak('Пожалуйста, введите ваш email и решение.');
      return;
    }

    if (!validateEmail(studentEmail)) {
      alert('Пожалуйста, введите корректный email.');
      handleSpeak('Пожалуйста, введите корректный email.');
      return;
    }

    const task = tasks.find((t) => t._id === taskId);
    if (!task) return;

    if (task.studentEmail !== studentEmail) {
      alert('Это задание не предназначено для вашего email.');
      handleSpeak('Это задание не предназначено для вашего email.');
      return;
    }

    setIsSendingSolution(taskId);
    handleSpeak('Отправка решения...');

    const payload = {
      taskId,
      studentEmail,
      studentSolution,
    };

    try {
      const response = await fetch('http://localhost:5000/send-solution', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (response.ok) {
        setSubmissionStatus((prev) => ({
          ...prev,
          [taskId]: 'completed',
        }));
        setStudentSolution('');
        setStudentEmail('');
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
        alert('Ваше решение успешно отправлено учителю!');
        handleSpeak('Ваше решение успешно отправлено учителю!');
      } else {
        alert(`Ошибка при отправке решения: ${result.error || 'Попробуйте снова.'}`);
        handleSpeak('Ошибка при отправке решения. Попробуйте снова.');
      }
    } catch (error) {
      console.error('Ошибка отправки решения:', error);
      alert(`Произошла ошибка при отправке решения: ${error.message}`);
      handleSpeak('Произошла ошибка при отправке решения.');
    } finally {
      setIsSendingSolution(null);
    }
  };

  const TeacherView = () => {
    return (
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
          onMouseEnter={() => handleSpeak('Отправить индивидуальное задание')}
          onMouseLeave={stopSpeech}
          onTouchStart={() => handleSpeak('Отправить индивидуальное задание')}
          onTouchEnd={stopSpeech}
          onFocus={() => handleSpeak('Отправить индивидуальное задание')}
          onBlur={stopSpeech}
          tabIndex={0}
        >
          <EmailIcon sx={{ color: '#FF007A' }} /> Отправить индивидуальное задание
        </TaskTitle>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel sx={{ color: '#FFFFFF', textShadow: '0 0 5px rgba(255, 0, 122, 0.5)' }}>
            Выберите ученика
          </InputLabel>
          <Select
            value={selectedStudent || ''}
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
            onTouchStart={() => handleSpeak('Выберите ученика')}
            onTouchEnd={stopSpeech}
            onFocus={() => handleSpeak('Выберите ученика')}
            onBlur={stopSpeech}
            tabIndex={0}
          >
            {students.map((student) => (
              <MenuItem key={student.id} value={student.id}>
                {student.name} ({student.email})
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box sx={{ mb: 2 }}>
          <CustomLabel
            htmlFor="task-message"
            onMouseEnter={() => handleSpeak('Введите задание или сообщение')}
            onMouseLeave={stopSpeech}
            onTouchStart={() => handleSpeak('Введите задание или сообщение')}
            onTouchEnd={stopSpeech}
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
            aria-label="Задание или сообщение"
            tabIndex={0}
          />
        </Box>
        <SubmitButton
          onClick={sendTaskToStudent}
          disabled={isSendingTask}
          onMouseEnter={() => handleSpeak('Отправить задание')}
          onMouseLeave={stopSpeech}
          onTouchStart={() => handleSpeak('Отправить задание')}
          onTouchEnd={stopSpeech}
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
          onTouchStart={() => handleSpeak('Список отправленных заданий')}
          onTouchEnd={stopSpeech}
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
              textShadow: '0 0 5px rgba(255, 0, 122, 0.3)',
              fontFamily: "'Roboto', sans-serif",
            }}
            onMouseEnter={() => handleSpeak('Нет отправленных заданий')}
            onMouseLeave={stopSpeech}
            onTouchStart={() => handleSpeak('Нет отправленных заданий')}
            onTouchEnd={stopSpeech}
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
                  onTouchStart={() => handleSpeak(`Задание для ${task.studentName}`)}
                  onTouchEnd={stopSpeech}
                  onFocus={() => handleSpeak(`Задание для ${task.studentName}`)}
                  onBlur={stopSpeech}
                  tabIndex={0}
                >
                  Задание для {task.studentName}
                </TaskTitle>
                <TaskDescription
                  onMouseEnter={() => handleSpeak(`Текст задания: ${task.message}`)}
                  onMouseLeave={stopSpeech}
                  onTouchStart={() => handleSpeak(`Текст задания: ${task.message}`)}
                  onTouchEnd={stopSpeech}
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
                    textShadow: '0 0 5px rgba(255, 0, 122, 0.3)',
                    fontFamily: "'Roboto', sans-serif",
                  }}
                  onMouseEnter={() =>
                    handleSpeak(`Отправлено: ${new Date(task.createdAt).toLocaleDateString()}`)
                  }
                  onMouseLeave={stopSpeech}
                  onTouchStart={() =>
                    handleSpeak(`Отправлено: ${new Date(task.createdAt).toLocaleDateString()}`)
                  }
                  onTouchEnd={stopSpeech}
                  onFocus={() => handleSpeak(`Отправлено: ${new Date(task.createdAt).toLocaleDateString()}`)}
                  onBlur={stopSpeech}
                  tabIndex={0}
                >
                  Отправлено: {new Date(task.createdAt).toLocaleDateString()}
                </Typography>
                <StatusChip
                  label={submissionStatus[task._id] === 'completed' ? 'Выполнено' : 'Ожидает выполнения'}
                  status={submissionStatus[task._id]}
                  icon={
                    submissionStatus[task._id] === 'completed' ? (
                      <CheckCircleIcon sx={{ color: '#00FFDD' }} />
                    ) : null
                  }
                  onMouseEnter={() =>
                    handleSpeak(
                      submissionStatus[task._id] === 'completed' ? 'Задание выполнено' : 'Ожидает выполнения'
                    )
                  }
                  onMouseLeave={stopSpeech}
                  onTouchStart={() =>
                    handleSpeak(
                      submissionStatus[task._id] === 'completed' ? 'Задание выполнено' : 'Ожидает выполнения'
                    )
                  }
                  onTouchEnd={stopSpeech}
                  onFocus={() =>
                    handleSpeak(
                      submissionStatus[task._id] === 'completed' ? 'Задание выполнено' : 'Ожидает выполнения'
                    )
                  }
                  onBlur={stopSpeech}
                  tabIndex={0}
                />
              </CardContent>
            </TaskCard>
          ))
        )}
      </Box>
    );
  };

  const StudentView = () => {
    const filteredTasks = tasks.filter((task) => task.studentEmail === studentEmail);

    return (
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
          onMouseEnter={() => handleSpeak('Ваши задания')}
          onMouseLeave={stopSpeech}
          onTouchStart={() => handleSpeak('Ваши задания')}
          onTouchEnd={stopSpeech}
          onFocus={() => handleSpeak('Ваши задания')}
          onBlur={stopSpeech}
          tabIndex={0}
        >
          <EmailIcon sx={{ color: '#FF007A' }} /> Ваши задания
        </TaskTitle>
        <Box sx={{ mb: 2 }}>
          <CustomLabel
            htmlFor="student-email"
            onMouseEnter={() => handleSpeak('Введите ваш email, чтобы увидеть задания')}
            onMouseLeave={stopSpeech}
            onTouchStart={() => handleSpeak('Введите ваш email, чтобы увидеть задания')}
            onTouchEnd={stopSpeech}
          >
            Ваш email
          </CustomLabel>
          <CustomInput
            id="student-email"
            type="email"
            value={studentEmail}
            onChange={(e) => setStudentEmail(e.target.value)}
            placeholder="Введите ваш email..."
            onFocus={() => handleSpeak('Введите ваш email, чтобы увидеть задания')}
            onBlur={stopSpeech}
            aria-label="Ваш email"
            tabIndex={0}
          />
        </Box>
        {studentEmail && !validateEmail(studentEmail) && (
          <Typography
            sx={{
              color: '#FF5555',
              mb: 2,
              fontSize: '14px',
              textShadow: '0 0 5px rgba(255, 0, 122, 0.3)',
              fontFamily: "'Roboto', sans-serif",
            }}
          >
            Пожалуйста, введите корректный email.
          </Typography>
        )}
        {filteredTasks.length === 0 ? (
          <Typography
            sx={{
              color: '#FFFFFF',
              opacity: 0.7,
              textAlign: 'center',
              textShadow: '0 0 5px rgba(255, 0, 122, 0.3)',
              fontFamily: "'Roboto', sans-serif",
            }}
            onMouseEnter={() => handleSpeak('Нет заданий для вашего email')}
            onMouseLeave={stopSpeech}
            onTouchStart={() => handleSpeak('Нет заданий для вашего email')}
            onTouchEnd={stopSpeech}
            onFocus={() => handleSpeak('Нет заданий для вашего email')}
            onBlur={stopSpeech}
            tabIndex={0}
          >
            Нет заданий для вашего email
          </Typography>
        ) : (
          filteredTasks.map((task) => (
            <TaskCard key={task._id}>
              <CardContent>
                <TaskTitle
                  onMouseEnter={() => handleSpeak('Задание от учителя')}
                  onMouseLeave={stopSpeech}
                  onTouchStart={() => handleSpeak('Задание от учителя')}
                  onTouchEnd={stopSpeech}
                  onFocus={() => handleSpeak('Задание от учителя')}
                  onBlur={stopSpeech}
                  tabIndex={0}
                >
                  Задание от учителя
                </TaskTitle>
                <TaskDescription
                  onMouseEnter={() => handleSpeak(`Текст задания: ${task.message}`)}
                  onMouseLeave={stopSpeech}
                  onTouchStart={() => handleSpeak(`Текст задания: ${task.message}`)}
                  onTouchEnd={stopSpeech}
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
                    textShadow: '0 0 5px rgba(255, 0, 122, 0.3)',
                    fontFamily: "'Roboto', sans-serif",
                  }}
                  onMouseEnter={() =>
                    handleSpeak(`Отправлено: ${new Date(task.createdAt).toLocaleDateString()}`)
                  }
                  onMouseLeave={stopSpeech}
                  onTouchStart={() =>
                    handleSpeak(`Отправлено: ${new Date(task.createdAt).toLocaleDateString()}`)
                  }
                  onTouchEnd={stopSpeech}
                  onFocus={() => handleSpeak(`Отправлено: ${new Date(task.createdAt).toLocaleDateString()}`)}
                  onBlur={stopSpeech}
                  tabIndex={0}
                >
                  Отправлено: {new Date(task.createdAt).toLocaleDateString()}
                </Typography>
                {submissionStatus[task._id] !== 'completed' ? (
                  <>
                    <Box sx={{ mb: 2 }}>
                      <CustomLabel
                        htmlFor={`student-solution-${task._id}`}
                        onMouseEnter={() => handleSpeak('Введите ваше решение')}
                        onMouseLeave={stopSpeech}
                        onTouchStart={() => handleSpeak('Введите ваше решение')}
                        onTouchEnd={stopSpeech}
                      >
                        Ваше решение
                      </CustomLabel>
                      <CustomTextarea
                        id={`student-solution-${task._id}`}
                        value={studentSolution}
                        onChange={(e) => setStudentSolution(e.target.value)}
                        placeholder="Введите ваше решение..."
                        onFocus={() => handleSpeak('Введите ваше решение')}
                        onBlur={stopSpeech}
                        aria-label="Ваше решение"
                        tabIndex={0}
                      />
                    </Box>
                    <SubmitButton
                      onClick={() => submitSolution(task._id)}
                      disabled={isSendingSolution === task._id}
                      onMouseEnter={() => handleSpeak('Отправить решение')}
                      onMouseLeave={stopSpeech}
                      onTouchStart={() => handleSpeak('Отправить решение')}
                      onTouchEnd={stopSpeech}
                      onFocus={() => handleSpeak('Отправить решение')}
                      onBlur={stopSpeech}
                      tabIndex={0}
                    >
                      {isSendingSolution === task._id ? (
                        <CircularProgress size={20} sx={{ color: '#FFFFFF', mr: 1 }} />
                      ) : (
                        <SendIcon sx={{ mr: 1, color: '#FFFFFF' }} />
                      )}
                      {isSendingSolution === task._id ? 'Отправка...' : 'Отправить решение'}
                    </SubmitButton>
                  </>
                ) : (
                  <StatusChip
                    label="Выполнено"
                    status="completed"
                    icon={<CheckCircleIcon sx={{ color: '#00FFDD' }} />}
                    onMouseEnter={() => handleSpeak('Задание выполнено')}
                    onMouseLeave={stopSpeech}
                    onTouchStart={() => handleSpeak('Задание выполнено')}
                    onTouchEnd={stopSpeech}
                    onFocus={() => handleSpeak('Задание выполнено')}
                    onBlur={stopSpeech}
                    tabIndex={0}
                  />
                )}
              </CardContent>
            </TaskCard>
          ))
        )}
      </Box>
    );
  };

  return (
    <TaskContainer>
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
        }}
      >
        <Button
          onClick={() => setUserRole(userRole === 'teacher' ? 'student' : 'teacher')}
          sx={{
            background: 'linear-gradient(135deg, #FF007A, #00FFDD)',
            color: '#FFFFFF',
            borderRadius: '15px',
            padding: '8px 20px',
            textTransform: 'none',
            boxShadow: '0 5px 15px rgba(255, 0, 122, 0.5)',
            transition: 'all 0.3s ease',
            fontFamily: "'Orbitron', sans-serif",
            '&:hover': {
              background: 'linear-gradient(135deg, #00FFDD, #FF007A)',
              boxShadow: '0 10px 25px rgba(255, 0, 122, 0.8)',
              transform: 'translateY(-2px)',
            },
          }}
          onMouseEnter={() =>
            handleSpeak(`Сменить роль на ${userRole === 'teacher' ? 'ученика' : 'учителя'}`)
          }
          onMouseLeave={stopSpeech}
          onTouchStart={() =>
            handleSpeak(`Сменить роль на ${userRole === 'teacher' ? 'ученика' : 'учителя'}`)
          }
          onTouchEnd={stopSpeech}
          onFocus={() =>
            handleSpeak(`Сменить роль на ${userRole === 'teacher' ? 'ученика' : 'учителя'}`)
          }
          onBlur={stopSpeech}
          tabIndex={0}
        >
          Сменить роль: {userRole === 'teacher' ? 'Учитель' : 'Ученик'}
        </Button>
      </Box>
      {userRole === 'teacher' ? <TeacherView /> : <StudentView />}
    </TaskContainer>
  );
};

export default Task;