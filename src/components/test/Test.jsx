import React, { useState } from 'react';
import { styled, keyframes } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import js from "../../assets/icons8-javascript-96.png";
import python from "../../assets/icons8-python-144.png";
import roboto from "../../assets/icons8-robot-94.png";
import react from "../../assets/icons8-react-100.png";

// Анимация волны для прогресс-бара
const waveAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Анимация взрыва хлопушки
const burstAnimation = keyframes`
  0% { transform: scale(0) rotate(0deg); opacity: 1; }
  50% { transform: scale(1.5) rotate(180deg); opacity: 0.8; }
  100% { transform: scale(0) rotate(360deg); opacity: 0; }
`;

// Анимация появления
const fadeIn = keyframes`
  0% { opacity: 0, transform: 'translateY(20px)' }
  100% { opacity: 1, transform: 'translateY(0)' }
`;

// Данные тестов
const subjectsData = {
  javascript: {
    title: 'JavaScript',
    icon: js,
    tests: [
      { id: 1, question: 'Какой метод добавляет элемент в конец массива?', options: { a: 'pop', b: 'push', c: 'shift' }, correctAnswer: 'b' },
      { id: 2, question: 'Что возвращает typeof null?', options: { a: 'null', b: 'object', c: 'undefined' }, correctAnswer: 'b' },
      { id: 3, question: 'Как объявить функцию?', options: { a: 'function myFunc()', b: 'let myFunc = ()', c: 'def myFunc()' }, correctAnswer: 'a' },
    ],
  },
  python: {
    title: 'Python',
    icon: python,
    tests: [
      { id: 1, question: 'Какой оператор возводит в степень?', options: { a: '//', b: '**', c: '^' }, correctAnswer: 'b' },
      { id: 2, question: 'Какой метод добавляет элемент в список?', options: { a: 'append', b: 'push', c: 'add' }, correctAnswer: 'a' },
      { id: 3, question: 'Что выведет print(2 + "2")?', options: { a: '4', b: '22', c: 'Ошибка' }, correctAnswer: 'c' },
    ],
  },
  robotics: {
    title: 'Робототехника',
    icon: roboto,
    tests: [
      { id: 1, question: 'Какой датчик измеряет расстояние?', options: { a: 'Инфракрасный', b: 'Ультразвуковой', c: 'Температурный' }, correctAnswer: 'b' },
      { id: 2, question: 'Какой язык часто используется в робототехнике?', options: { a: 'JavaScript', b: 'Python', c: 'HTML' }, correctAnswer: 'b' },
      { id: 3, question: 'Что делает робот при обнаружении препятствия?', options: { a: 'Останавливается', b: 'Ускоряется', c: 'Игнорирует' }, correctAnswer: 'a' },
    ],
  },
  react: {
    title: 'React',
    icon: react,
    tests: [
      { id: 1, question: 'Какой хук управляет состоянием?', options: { a: 'useEffect', b: 'useState', c: 'useContext' }, correctAnswer: 'b' },
      { id: 2, question: 'Что такое JSX?', options: { a: 'Язык', b: 'Синтаксический сахар', c: 'Библиотека' }, correctAnswer: 'b' },
      { id: 3, question: 'Как передать данные в компонент?', options: { a: 'Props', b: 'State', c: 'Hooks' }, correctAnswer: 'a' },
    ],
  },
};

// Стилизация
const TestContainer = styled(Box)(({ theme }) => ({
  background: '#000000', // Чёрный фон, как в Main
  minHeight: '80vh',
  borderRadius: '25px',

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.breakpoints.down('sm') ? '10px' : '20px',
  gap: '20px',
  position: 'relative',
  overflow: 'hidden',
  animation: `${fadeIn} 1s ease-in-out`,
}));

const SubjectsContainer = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  gap: '20px',
  maxWidth: '1000px',
  width: '100%',
});

const SubjectCard = styled(Card)(({ theme }) => ({
  background: '#1A1A1A', // Чуть светлее чёрный, как в Main
  borderRadius: '20px',
  padding: '15px',
  textAlign: 'center',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
  backdropFilter: 'blur(10px)',
  transition: 'all 0.4s cubic-bezier(0.1, 0.82, 0.25, 1)',
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '5px',
    background: 'linear-gradient(90deg, #FFFFFF, #FFFFFF)', // Чисто белый градиент
    borderRadius: '20px 20px 0 0',
    zIndex: 1,
  },
  '&:after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'radial-gradient(circle at top right, rgba(255, 255, 255, 0.05), transparent 70%)',
    zIndex: 0,
    opacity: 0.8,
  },
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.7)',
    '&:before': {
      height: '8px',
    },
  },
}));

const TestCard = styled(Card)(({ theme }) => ({
  background: '#1A1A1A', // Чуть светлее чёрный
  borderRadius: '25px',
  padding: theme.breakpoints.down('sm') ? '15px' : '25px',
  maxWidth: '600px',
  width: '100%',
  boxShadow: '0 12px 35px rgba(0, 0, 0, 0.5)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(8px)',
  position: 'relative',
  overflow: 'hidden',
  animation: `${fadeIn} 0.8s ease-in-out`,
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '0',
    width: '8px',
    height: '100%',
    background: 'linear-gradient(to bottom, #FFFFFF, #FFFFFF)', // Чисто белый градиент
    borderRadius: '4px',
  },
  '&:hover': {
    boxShadow: '0 15px 45px rgba(0, 0, 0, 0.7)',
  },
}));

const SubjectTitle = styled(Typography)(({ theme }) => ({
  fontSize: theme.breakpoints.down('sm') ? '20px' : '22px',
  fontWeight: 700,
  color: '#FFFFFF',
  textShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
  position: 'relative',
  zIndex: 1,
  marginBottom: '5px',
  '&:after': {
    content: '""',
    position: 'absolute',
    bottom: '-8px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '40px',
    height: '3px',
    background: 'linear-gradient(90deg, #FFFFFF, #FFFFFF)', // Чисто белый градиент
    borderRadius: '3px',
  },
}));

const TestQuestion = styled(Typography)(({ theme }) => ({
  fontSize: theme.breakpoints.down('sm') ? '18px' : '20px',
  fontWeight: 600,
  color: '#FFFFFF',
  marginBottom: '20px',
  textAlign: 'center',
  textShadow: '0 0 5px rgba(255, 255, 255, 0.3)',
}));

const OptionLabel = styled(FormControlLabel)(({ isCorrect, isSelected, theme }) => ({
  background: isSelected
    ? isCorrect
      ? 'rgba(255, 255, 255, 0.15)' // Светлее для правильного ответа
      : 'rgba(255, 255, 255, 0.05)' // Темнее для неправильного
    : 'rgba(255, 255, 255, 0.05)',
  borderRadius: '12px',
  padding: '12px',
  margin: '5px 0',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
  backdropFilter: 'blur(5px)',
  transition: 'all 0.3s ease',
  '& .MuiTypography-root': {
    color: isSelected
      ? isCorrect
        ? '#FFFFFF'
        : 'rgba(255, 255, 255, 0.7)'
      : '#FFFFFF',
    fontSize: theme.breakpoints.down('sm') ? '14px' : '16px',
    fontWeight: 500,
    opacity: isSelected && !isCorrect ? 0.7 : 1,
  },
  '& .MuiRadio-root': {
    color: '#FFFFFF',
  },
  '& .Mui-checked': {
    color: '#FFFFFF',
  },
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.1)',
    transform: 'scale(1.02)',
  },
}));

const ProgressContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '600px',
  padding: theme.breakpoints.down('sm') ? '10px' : '15px',
  background: 'rgba(255, 255, 255, 0.05)',
  borderRadius: '15px',
  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(5px)',
}));

const ProgressLine = styled(LinearProgress)({
  height: '12px',
  borderRadius: '6px',
  background: 'rgba(255, 255, 255, 0.1)',
  boxShadow: 'inset 0 2px 10px rgba(0, 0, 0, 0.3)',
  '& .MuiLinearProgress-bar': {
    background: 'linear-gradient(90deg, #FFFFFF, #FFFFFF80)',
    animation: `${waveAnimation} 2s ease-in-out infinite`,
  },
});

const ResultCard = styled(Card)(({ theme }) => ({
  background: '#1A1A1A',
  borderRadius: '25px',
  padding: theme.breakpoints.down('sm') ? '20px' : '30px',
  maxWidth: '700px',
  width: '100%',

  boxShadow: '0 12px 35px rgba(0, 0, 0, 0.5)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(8px)',
  position: 'relative',
  zIndex: 10,
  animation: `${fadeIn} 0.8s ease-in-out`,
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '0',
    width: '8px',
    height: '100%',
    background: 'linear-gradient(to bottom, #FFFFFF, #FFFFFF)',
    borderRadius: '4px',
    
  },
}));

const Confetti = styled(Box)(({ delay }) => ({
  position: 'absolute',
  width: '15px',
  height: '15px',
  background: 'linear-gradient(45deg, #FFFFFF, #FFFFFFcc)',
  borderRadius: '50%',
  animation: `${burstAnimation} 2s ease-out infinite`,
  animationDelay: `${delay}s`,
  transformOrigin: 'center',
  zIndex: 5,
}));

const Test = () => {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [currentTestIndex, setCurrentTestIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const totalTests = selectedSubject ? subjectsData[selectedSubject].tests.length : 0;
  const currentTest = selectedSubject ? subjectsData[selectedSubject].tests[currentTestIndex] : null;

  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject);
    setCurrentTestIndex(0);
    setCorrectAnswers(0);
    setUserAnswers({});
    setShowResult(false);
  };

  const handleAnswerChange = (value) => {
    const correctAnswer = currentTest.correctAnswer;
    const isCorrect = value === correctAnswer;

    setUserAnswers((prev) => ({
      ...prev,
      [`${selectedSubject}-${currentTest.id}`]: { selected: value, isCorrect },
    }));

    if (isCorrect) {
      setCorrectAnswers((prev) => prev + 1);
      setTimeout(() => {
        if (currentTestIndex < totalTests - 1) {
          setCurrentTestIndex((prev) => prev + 1);
        } else {
          setShowResult(true);
        }
      }, 500);
    }
  };

  const handleBackToSubjects = () => {
    setSelectedSubject(null);
    setShowResult(false);
    setCurrentTestIndex(0);
    setCorrectAnswers(0);
    setUserAnswers({});
  };

  return (
    <TestContainer>
      {/* Хлопушки при завершении */}
      {showResult && (
        <>
          {Array.from({ length: 50 }).map((_, i) => (
            <Confetti
              key={i}
              delay={i * 0.05}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </>
      )}

      {/* Выбор предметов */}
      {!selectedSubject && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
          <Typography
            variant="h4"
            sx={{
              color: '#FFFFFF',
              fontWeight: 800,
              textShadow: '0 0 15px rgba(255, 255, 255, 0.3)',
              position: 'relative',
              animation: `${fadeIn} 1.2s ease-in-out`,
              '&:after': {
                content: '""',
                position: 'absolute',
                bottom: '-10px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '80px',
                height: '4px',
                background: 'linear-gradient(90deg, #FFFFFF, #FFFFFF)',
                borderRadius: '2px',
              },
            }}
          >
            Выберите тест
          </Typography>
          <SubjectsContainer>
            {Object.keys(subjectsData).map((subject) => (
              <SubjectCard key={subject} onClick={() => handleSubjectSelect(subject)}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                  <Box
                    sx={{
                      width: '60px',
                      height: '60px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '15px',
                      padding: '5px',
                      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3), inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(5px)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.1) rotate(5deg)',
                        boxShadow: '0 12px 25px rgba(255, 255, 255, 0.2)',
                      },
                    }}
                  >
                    <img src={subjectsData[subject].icon} alt={subjectsData[subject].title} style={{ width: '40px', height: '40px' }} />
                  </Box>
                  <SubjectTitle>{subjectsData[subject].title}</SubjectTitle>
                </CardContent>
              </SubjectCard>
            ))}
          </SubjectsContainer>
        </Box>
      )}

      {/* Тесты */}
      {selectedSubject && !showResult && (
        <>
          <TestCard>
            <CardContent>
              <SubjectTitle>
                {subjectsData[selectedSubject].title} - Тест {currentTestIndex + 1}/{totalTests}
              </SubjectTitle>
              <TestQuestion>{currentTest.question}</TestQuestion>
              <RadioGroup
                value={userAnswers[`${selectedSubject}-${currentTest.id}`]?.selected || ''}
                onChange={(e) => handleAnswerChange(e.target.value)}
                sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
              >
                {Object.entries(currentTest.options).map(([key, option]) => (
                  <OptionLabel
                    key={key}
                    value={key}
                    control={<Radio />}
                    label={`${key.toUpperCase()}. ${option}`}
                    isCorrect={key === currentTest.correctAnswer}
                    isSelected={userAnswers[`${selectedSubject}-${currentTest.id}`]?.selected === key}
                  />
                ))}
              </RadioGroup>
              {userAnswers[`${selectedSubject}-${currentTest.id}`] && (
                <Typography
                  sx={{
                    color: '#FFFFFF',
                    fontSize: '16px',
                    fontWeight: 500,
                    textAlign: 'center',
                    marginTop: '15px',
                    textShadow: '0 0 5px rgba(255, 255, 255, 0.3)',
                    opacity: userAnswers[`${selectedSubject}-${currentTest.id}`].isCorrect ? 1 : 0.7,
                  }}
                >
                  {userAnswers[`${selectedSubject}-${currentTest.id}`].isCorrect
                    ? 'Правильно! Готовимся к следующему...'
                    : 'Ой, неверно. Попробуй ещё раз!'}
                </Typography>
              )}
            </CardContent>
          </TestCard>
          <ProgressContainer>
            <Typography sx={{ color: '#FFFFFF', fontSize: '16px', fontWeight: 500, opacity: 0.8 }}>
              Прогресс: {correctAnswers}/{totalTests}
            </Typography>
            <ProgressLine variant="determinate" value={(correctAnswers / totalTests) * 100} />
          </ProgressContainer>
        </>
      )}

      {/* Результат */}
      {showResult && (
        <ResultCard>
          <Typography
            variant="h4"
            sx={{
              color: '#FFFFFF',
              fontWeight: 700,
              textShadow: '0 0 15px rgba(255, 255, 255, 0.3)',
              marginBottom: '20px',
              textAlign: 'center',
            }}
          >
            Поздравляем!
          </Typography>
          <Typography
            sx={{
              color: '#FFFFFF',
              fontSize: '24px',
              fontWeight: 500,
              marginBottom: '20px',
              textAlign: 'center',
              opacity: 0.9,
            }}
          >
            Вы набрали: {correctAnswers}/{totalTests}
          </Typography>
          <Button
            onClick={handleBackToSubjects}
            sx={{
              background: 'linear-gradient(135deg, #FFFFFF, #FFFFFF)',
              color: '#000000',
              padding: '10px 25px',
              borderRadius: '15px',
              textTransform: 'none',
              fontSize: '16px',
              fontWeight: 600,
              boxShadow: '0 8px 25px rgba(255, 255, 255, 0.2)',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              width: '100%',
              '&:before': {
                content: '""',
                position: 'absolute',
                top: '-50%',
                left: '-50%',
                width: '200%',
                height: '200%',
                background: 'linear-gradient(45deg, transparent, rgba(0, 0, 0, 0.2), transparent)',
                transform: 'rotate(45deg)',
                transition: 'all 0.5s ease',
                opacity: 0,
              },
              '&:hover': {
                background: 'linear-gradient(135deg, #FFFFFF, #FFFFFF)',
                boxShadow: '0 12px 30px rgba(255, 255, 255, 0.4)',
                transform: 'translateY(-3px) scale(1.05)',
                '&:before': {
                  left: '150%',
                  opacity: 1,
                },
              },
              '&:active': {
                transform: 'translateY(1px)',
                boxShadow: '0 5px 15px rgba(255, 255, 255, 0.2)',
              },
            }}
          >
            Вернуться к тестам
          </Button>
        </ResultCard>
      )}
    </TestContainer>
  );
};

export default Test;