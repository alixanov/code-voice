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

// API базавий URL
const API_BASE_URL = 'http://localhost:5000';

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
  minHeight: '300px', // Минимальная высота для секции
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
  animation: (status === 'completed' || status === 'checked') ? `${pulseAnimation} 1.5s ease-in-out infinite` : 'none',
  margin: theme.spacing(0.5),
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
  fontFamily: "'Roboto', sans-serif",
  boxShadow: (status === 'completed' || status === 'checked') ? '0 0 10px rgba(0, 255, 0, 0.5)' : 'none',
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
  },
  '& .MuiSelect-root': {
    color: '#FFFFFF',
    background: 'rgba(255, 255, 255, 0.03)',
    borderRadius: '15px',
    border: '1px solid rgba(255, 0, 122, 0.3)',
  },
  '& .MuiSvgIcon-root': {
    color: '#FF007A',
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

    // O‘quvchilarni yuklash
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/students`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStudents(response.data);
      } catch (error) {
        console.error('O‘quvchilarni yuklashda xatolik:', error);
        handleSpeak('O‘quvchilarni yuklashda xatolik yuz berdi');
      }
    };

    // Topshiriqlarni yuklash
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/tasks`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(response.data);
      } catch (error) {
        console.error('Topshiriqlarni yuklashda xatolik:', error);
        handleSpeak('Topshiriqlarni yuklashda xatolik yuz berdi');
      }
    };

    // Yechimlarni yuklash
    const fetchSolutions = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/solutions`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSolutions(response.data);
      } catch (error) {
        console.error('Yechimlarni yuklashda xatolik:', error);
        handleSpeak('Yechimlarni yuklashda xatolik yuz berdi');
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
    handleSpeak('Siz tizimdan chiqdingiz');
  };

  const sendTaskToStudent = async () => {
    if (!selectedStudent || !taskMessage.trim()) {
      alert('Iltimos, o‘quvchini tanlang va topshiriqni kiriting.');
      handleSpeak('Iltimos, o‘quvchini tanlang va topshiriqni kiriting.');
      return;
    }

    const student = students.find((s) => s._id === selectedStudent);
    if (!student) return;

    setIsSendingTask(true);
    handleSpeak('Topshiriq yuborilmoqda...');

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
      alert('Topshiriq o‘quvchiga muvaffaqiyatli yuborildi!');
      handleSpeak(`Topshiriq o‘quvchi ${student.firstName} ${student.lastName} ga muvaffaqiyatli yuborildi`);
    } catch (error) {
      console.error('Topshiriq yuborishda xatolik:', error);
      alert('Topshiriq yuborishda xatolik');
      handleSpeak('Topshiriq yuborishda xatolik');
    } finally {
      setIsSendingTask(false);
    }
  };

  const checkSolution = async (solutionId) => {
    setIsCheckingSolution(solutionId);
    handleSpeak('Yechim tekshirilmoqda...');

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
      alert('Yechim tekshirildi deb belgilandi!');
      handleSpeak('Yechim tekshirildi deb belgilandi');
    } catch (error) {
      console.error('Yechimni tekshirishda xatolik:', error);
      alert('Yechimni tekshirishda xatolik');
      handleSpeak('Yechimni tekshirishda xatolik');
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
          onMouseEnter={() => handleSpeak(`Xush kelibsiz, ${user.firstName} ${user.lastName}`)}
          onMouseLeave={stopSpeech}
          onTouchStart={() => handleSpeak(`Xush kelibsiz, ${user.firstName} ${user.lastName}`)}
          onTouchEnd={stopSpeech}
          onFocus={() => handleSpeak(`Xush kelibsiz, ${user.firstName} ${user.lastName}`)}
          onBlur={stopSpeech}
          tabIndex={0}
          role="heading"
          aria-level="1"
        >
          Xush kelibsiz, {user.firstName} {user.lastName}
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
          onMouseEnter={() => handleSpeak('Chiqish')}
          onMouseLeave={stopSpeech}
          onTouchStart={() => handleSpeak('Chiqish')}
          onTouchEnd={stopSpeech}
          onFocus={() => handleSpeak('Chiqish')}
          onBlur={stopSpeech}
          tabIndex={0}
          aria-label="Chiqish"
        >
          Chiqish
        </Button>
      </Box>

      <ContentWrapper>
        {/* Chap qism: Uy vazifasini yuborish */}
        <Section>
          <TaskTitle
            onMouseEnter={() => handleSpeak('Shaxsiy topshiriq yuborish')}
            onMouseLeave={stopSpeech}
            onTouchStart={() => handleSpeak('Shaxsiy topshiriq yuborish')}
            onTouchEnd={stopSpeech}
            onFocus={() => handleSpeak('Shaxsiy topshiriq yuborish')}
            onBlur={stopSpeech}
            tabIndex={0}
            role="heading"
            aria-level="2"
          >
            <EmailIcon sx={{ color: '#FF007A' }} /> Shaxsiy topshiriq yuborish
          </TaskTitle>
          <CustomFormControl>
            <InputLabel
              onMouseEnter={() => handleSpeak('O‘quvchini tanlang')}
              onMouseLeave={stopSpeech}
              onTouchStart={() => handleSpeak('O‘quvchini tanlang')}
              onTouchEnd={stopSpeech}
              onFocus={() => handleSpeak('O‘quvchini tanlang')}
              onBlur={stopSpeech}
            >
              O‘quvchini tanlang
            </InputLabel>
            <Select
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
              onMouseEnter={() => handleSpeak('O‘quvchini tanlang')}
              onMouseLeave={stopSpeech}
              onTouchStart={() => handleSpeak('O‘quvchini tanlang')}
              onTouchEnd={stopSpeech}
              onFocus={() => handleSpeak('O‘quvchini tanlang')}
              onBlur={stopSpeech}
              tabIndex={0}
              aria-label="O‘quvchini tanlang"
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
              onMouseEnter={() => handleSpeak('Topshiriq yoki xabar kiriting')}
              onMouseLeave={stopSpeech}
              onTouchStart={() => handleSpeak('Topshiriq yoki xabar kiriting')}
              onTouchEnd={stopSpeech}
              onFocus={() => handleSpeak('Topshiriq yoki xabar kiriting')}
              onBlur={stopSpeech}
            >
              Topshiriq yoki xabar
            </CustomLabel>
            <CustomTextarea
              id="task-message"
              value={taskMessage}
              onChange={(e) => setTaskMessage(e.target.value)}
              placeholder="Topshiriq yoki xabar kiriting..."
              onFocus={() => handleSpeak('Topshiriq yoki xabar kiriting')}
              onBlur={stopSpeech}
              aria-label="Topshiriq yoki xabar kiriting"
              tabIndex={0}
            />
          </Box>
          <SubmitButton
            onClick={sendTaskToStudent}
            disabled={isSendingTask}
            onMouseEnter={() => handleSpeak('Topshiriq yuborish')}
            onMouseLeave={stopSpeech}
            onTouchStart={() => handleSpeak('Topshiriq yuborish')}
            onTouchEnd={stopSpeech}
            onFocus={() => handleSpeak('Topshiriq yuborish')}
            onBlur={stopSpeech}
            tabIndex={0}
            aria-label="Topshiriq yuborish"
          >
            {isSendingTask ? (
              <CircularProgress size={20} sx={{ color: '#FFFFFF', mr: 1 }} />
            ) : (
              <SendIcon sx={{ mr: 1, color: '#FFFFFF' }} />
            )}
            {isSendingTask ? 'Yuborilmoqda...' : 'Topshiriq yuborish'}
          </SubmitButton>

          <TaskTitle
            sx={{ mt: 4 }}
            onMouseEnter={() => handleSpeak('Yuborilgan topshiriqlar ro‘yxati')}
            onMouseLeave={stopSpeech}
            onTouchStart={() => handleSpeak('Yuborilgan topshiriqlar ro‘yxati')}
            onTouchEnd={stopSpeech}
            onFocus={() => handleSpeak('Yuborilgan topshiriqlar ro‘yxati')}
            onBlur={stopSpeech}
            tabIndex={0}
            role="heading"
            aria-level="2"
          >
            <EmailIcon sx={{ color: '#FF007A' }} /> Yuborilgan topshiriqlar ro‘yxati
          </TaskTitle>
          {tasks.length === 0 ? (
            <Typography
              sx={{
                color: '#FFFFFF',
                opacity: 0.7,
                textAlign: 'center',
                fontFamily: "'Roboto', sans-serif",
              }}
              onMouseEnter={() => handleSpeak('Yuborilgan topshiriqlar yo‘q')}
              onMouseLeave={stopSpeech}
              onTouchStart={() => handleSpeak('Yuborilgan topshiriqlar yo‘q')}
              onTouchEnd={stopSpeech}
              onFocus={() => handleSpeak('Yuborilgan topshiriqlar yo‘q')}
              onBlur={stopSpeech}
              tabIndex={0}
            >
              Yuborilgan topshiriqlar yo‘q
            </Typography>
          ) : (
            tasks.map((task) => (
              <TaskCard key={task._id}>
                <CardContent>
                  <TaskTitle
                    onMouseEnter={() => handleSpeak(`${task.studentName} uchun topshiriq`)}
                    onMouseLeave={stopSpeech}
                    onTouchStart={() => handleSpeak(`${task.studentName} uchun topshiriq`)}
                    onTouchEnd={stopSpeech}
                    onFocus={() => handleSpeak(`${task.studentName} uchun topshiriq`)}
                    onBlur={stopSpeech}
                    tabIndex={0}
                  >
                    {task.studentName} uchun topshiriq
                  </TaskTitle>
                  <TaskDescription
                    onMouseEnter={() => handleSpeak(`Topshiriq matni: ${task.message}`)}
                    onMouseLeave={stopSpeech}
                    onTouchStart={() => handleSpeak(`Topshiriq matni: ${task.message}`)}
                    onTouchEnd={stopSpeech}
                    onFocus={() => handleSpeak(`Topshiriq matni: ${task.message}`)}
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
                    onMouseEnter={() => handleSpeak(`Yuborilgan: ${new Date(task.createdAt).toLocaleDateString('uz-UZ')}`)}
                    onMouseLeave={stopSpeech}
                    onTouchStart={() => handleSpeak(`Yuborilgan: ${new Date(task.createdAt).toLocaleDateString('uz-UZ')}`)}
                    onTouchEnd={stopSpeech}
                    onFocus={() => handleSpeak(`Yuborilgan: ${new Date(task.createdAt).toLocaleDateString('uz-UZ')}`)}
                    onBlur={stopSpeech}
                    tabIndex={0}
                  >
                    Yuborilgan: {new Date(task.createdAt).toLocaleDateString('uz-UZ')}
                  </Typography>
                  <StatusChip
                    label={task.status === 'completed' ? 'Bajarildi' : 'Bajarilishi kutilmoqda'}
                    status={task.status}
                    icon={task.status === 'completed' ? <CheckCircleIcon sx={{ color: '#00FFDD' }} /> : null}
                    onMouseEnter={() => handleSpeak(task.status === 'completed' ? 'Topshiriq bajarildi' : 'Bajarilishi kutilmoqda')}
                    onMouseLeave={stopSpeech}
                    onTouchStart={() => handleSpeak(task.status === 'completed' ? 'Topshiriq bajarildi' : 'Bajarilishi kutilmoqda')}
                    onTouchEnd={stopSpeech}
                    onFocus={() => handleSpeak(task.status === 'completed' ? 'Topshiriq bajarildi' : 'Bajarilishi kutilmoqda')}
                    onBlur={stopSpeech}
                    tabIndex={0}
                    aria-label={task.status === 'completed' ? 'Topshiriq bajarildi' : 'Bajarilishi kutilmoqda'}
                  />
                </CardContent>
              </TaskCard>
            ))
          )}
        </Section>

        {/* O‘ng qism: Uy vazifalarini tekshirish */}
        <Section>
          <TaskTitle
            onMouseEnter={() => handleSpeak('Uy vazifalarini tekshirish')}
            onMouseLeave={stopSpeech}
            onTouchStart={() => handleSpeak('Uy vazifalarini tekshirish')}
            onTouchEnd={stopSpeech}
            onFocus={() => handleSpeak('Uy vazifalarini tekshirish')}
            onBlur={stopSpeech}
            tabIndex={0}
            role="heading"
            aria-level="2"
          >
            <EmailIcon sx={{ color: '#FF007A' }} /> Uy vazifalarini tekshirish
          </TaskTitle>
          {solutions.length === 0 ? (
            <Typography
              sx={{
                color: '#FFFFFF',
                opacity: 0.7,
                textAlign: 'center',
                fontFamily: "'Roboto', sans-serif",
              }}
              onMouseEnter={() => handleSpeak('O‘quvchilardan yechimlar yo‘q')}
              onMouseLeave={stopSpeech}
              onTouchStart={() => handleSpeak('O‘quvchilardan yechimlar yo‘q')}
              onTouchEnd={stopSpeech}
              onFocus={() => handleSpeak('O‘quvchilardan yechimlar yo‘q')}
              onBlur={stopSpeech}
              tabIndex={0}
            >
              O‘quvchilardan yechimlar yo‘q
            </Typography>
          ) : (
            solutions.map((solution) => (
              <TaskCard key={solution._id}>
                <CardContent>
                  <TaskTitle
                    onMouseEnter={() => handleSpeak(`${solution.studentName} dan yechim`)}
                    onMouseLeave={stopSpeech}
                    onTouchStart={() => handleSpeak(`${solution.studentName} dan yechim`)}
                    onTouchEnd={stopSpeech}
                    onFocus={() => handleSpeak(`${solution.studentName} dan yechim`)}
                    onBlur={stopSpeech}
                    tabIndex={0}
                  >
                    {solution.studentName} dan yechim
                  </TaskTitle>
                  <TaskDescription
                    onMouseEnter={() => handleSpeak(`Yechim: ${solution.solution}`)}
                    onMouseLeave={stopSpeech}
                    onTouchStart={() => handleSpeak(`Yechim: ${solution.solution}`)}
                    onTouchEnd={stopSpeech}
                    onFocus={() => handleSpeak(`Yechim: ${solution.solution}`)}
                    onBlur={stopSpeech}
                    tabIndex={0}
                  >
                    Yechim: {solution.solution}
                  </TaskDescription>
                  <Typography
                    sx={{
                      color: '#FFFFFF',
                      mb: 2,
                      opacity: 0.8,
                      fontFamily: "'Roboto', sans-serif",
                    }}
                    onMouseEnter={() => handleSpeak(`Yuborilgan: ${new Date(solution.createdAt).toLocaleDateString('uz-UZ')}`)}
                    onMouseLeave={stopSpeech}
                    onTouchStart={() => handleSpeak(`Yuborilgan: ${new Date(solution.createdAt).toLocaleDateString('uz-UZ')}`)}
                    onTouchEnd={stopSpeech}
                    onFocus={() => handleSpeak(`Yuborilgan: ${new Date(solution.createdAt).toLocaleDateString('uz-UZ')}`)}
                    onBlur={stopSpeech}
                    tabIndex={0}
                  >
                    Yuborilgan: {new Date(solution.createdAt).toLocaleDateString('uz-UZ')}
                  </Typography>
                  {solution.status === 'pending' ? (
                    <SubmitButton
                      onClick={() => checkSolution(solution._id)}
                      disabled={isCheckingSolution === solution._id}
                      onMouseEnter={() => handleSpeak('Tekshirildi deb belgilash')}
                      onMouseLeave={stopSpeech}
                      onTouchStart={() => handleSpeak('Tekshirildi deb belgilash')}
                      onTouchEnd={stopSpeech}
                      onFocus={() => handleSpeak('Tekshirildi deb belgilash')}
                      onBlur={stopSpeech}
                      tabIndex={0}
                      aria-label="Tekshirildi deb belgilash"
                    >
                      {isCheckingSolution === solution._id ? (
                        <CircularProgress size={20} sx={{ color: '#FFFFFF', mr: 1 }} />
                      ) : (
                        <CheckCircleIcon sx={{ mr: 1, color: '#FFFFFF' }} />
                      )}
                      {isCheckingSolution === solution._id ? 'Tekshirilmoqda...' : 'Tekshirildi deb belgilash'}
                    </SubmitButton>
                  ) : (
                    <StatusChip
                      label="Tekshirildi"
                      status="checked"
                      icon={<CheckCircleIcon sx={{ color: '#00FFDD' }} />}
                      onMouseEnter={() => handleSpeak('Yechim tekshirildi')}
                      onMouseLeave={stopSpeech}
                      onTouchStart={() => handleSpeak('Yechim tekshirildi')}
                      onTouchEnd={stopSpeech}
                      onFocus={() => handleSpeak('Yechim tekshirildi')}
                      onBlur={stopSpeech}
                      tabIndex={0}
                      aria-label="Yechim tekshirildi"
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