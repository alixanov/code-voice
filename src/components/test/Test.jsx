import React, { useState, useEffect, useContext } from 'react';
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
import succesfuly from "../../audio/succesful.mp3";
import error from "../../audio/error.mp3";
import victor from "../../audio/victory.mp3";
import { AccessibilityContext } from '../voice/AccessibilityContext';

// Анимации
const waveAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const burstAnimation = keyframes`
  0% { transform: scale(0) rotate(0deg); opacity: 1; }
  50% { transform: scale(1.5) rotate(180deg); opacity: 0.7; }
  100% { transform: scale(0) rotate(360deg); opacity: 0; }
`;

const glowAnimation = keyframes`
  0% { box-shadow: 0 0 5px rgba(255, 255, 255, 0.3); }
  50% { box-shadow: 0 0 20px rgba(255, 255, 255, 0.5); }
  100% { box-shadow: 0 0 5px rgba(255, 255, 255, 0.3); }
`;

const fadeIn = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const scaleIn = keyframes`
  0% { transform: scale(0.9); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
`;

const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Обновленные данные тестов с 10 вопросами для каждого предмета
const subjectsData = {
  javascript: {
    title: 'JavaScript',
    icon: js,
    tests: [
      { id: 1, question: 'Massiv oxiriga element qo\'shish uchun qaysi metod ishlatiladi?', options: { a: 'pop', b: 'push', c: 'shift' }, correctAnswer: 'b' },
      { id: 2, question: 'typeof null nima qaytaradi?', options: { a: 'null', b: 'object', c: 'undefined' }, correctAnswer: 'b' },
      { id: 3, question: 'Funksiyani qanday e\'lon qilish kerak?', options: { a: 'function myFunc()', b: 'let myFunc = ()', c: 'def myFunc()' }, correctAnswer: 'a' },
      { id: 4, question: 'Array.prototype.map() metodi nima qiladi?', options: { a: 'Elementlarni o\'chiradi', b: 'Yangi massiv yaratadi', c: 'Massivni tartiblaydi' }, correctAnswer: 'b' },
      { id: 5, question: 'Qattiq tenglik uchun qaysi operator ishlatiladi?', options: { a: '==', b: '===', c: '=' }, correctAnswer: 'b' },
      { id: 6, question: 'Yopilish (closure) nima?', options: { a: 'Boshqa funksiya ichidagi funksiya', b: 'Massiv metodi', c: 'Ma\'lumot turi' }, correctAnswer: 'a' },
      { id: 7, question: 'Massivning oxirgi elementini o\'chirish uchun qaysi metod ishlatiladi?', options: { a: 'shift', b: 'pop', c: 'splice' }, correctAnswer: 'b' },
      { id: 8, question: 'console.log(0 == "0") nima chiqaradi?', options: { a: 'true', b: 'false', c: 'undefined' }, correctAnswer: 'a' },
      { id: 9, question: 'Asinxron bajarish uchun qaysi metod ishlatiladi?', options: { a: 'setTimeout', b: 'forEach', c: 'filter' }, correctAnswer: 'a' },
      { id: 10, question: 'Promise nima?', options: { a: 'Ma\'lumot turi', b: 'Asinxron operatsiyalar uchun obyekt', c: 'Massiv metodi' }, correctAnswer: 'b' },
    ],
  },
  python: {
    title: 'Python',
    icon: python,
    tests: [
      { id: 1, question: 'Darajaga ko\'tarish uchun qaysi operator ishlatiladi?', options: { a: '//', b: '**', c: '^' }, correctAnswer: 'b' },
      { id: 2, question: 'Ro\'yxatga element qo\'shish uchun qaysi metod ishlatiladi?', options: { a: 'append', b: 'push', c: 'add' }, correctAnswer: 'a' },
      { id: 3, question: 'print(2 + "2") nima chiqaradi?', options: { a: '4', b: '22', c: 'Xato' }, correctAnswer: 'c' },
      { id: 4, question: 'Lug\'atni qanday e\'lon qilish kerak?', options: { a: '[]', b: '{}', c: '()' }, correctAnswer: 'b' },
      { id: 5, question: 'len() funksiyasi nima qiladi?', options: { a: 'Obyekt uzunligini qaytaradi', b: 'Ro\'yxatni tartiblaydi', c: 'Elementni o\'chiradi' }, correctAnswer: 'a' },
      { id: 6, question: 'Elementlarni aylanib o\'tish uchun qaysi sikl ishlatiladi?', options: { a: 'while', b: 'for', c: 'do-while' }, correctAnswer: 'b' },
      { id: 7, question: 'list.pop() metodi nima qiladi?', options: { a: 'Element qo\'shadi', b: 'Oxirgi elementni o\'chiradi', c: 'Ro\'yxatni tartiblaydi' }, correctAnswer: 'b' },
      { id: 8, question: 'Sana bilan ishlash uchun qaysi modul ishlatiladi?', options: { a: 'math', b: 'datetime', c: 'random' }, correctAnswer: 'b' },
      { id: 9, question: 'Ro\'yxat generatori nima?', options: { a: 'Funksiya', b: 'Ro\'yxat yaratish uchun sintaksis', c: 'Ma\'lumot turi' }, correctAnswer: 'b' },
      { id: 10, question: 'Tegishliligini tekshirish uchun qaysi operator ishlatiladi?', options: { a: 'is', b: 'in', c: '==' }, correctAnswer: 'b' },
    ],
  },
  robotics: {
    title: 'Robototexnika',
    icon: roboto,
    tests: [
      { id: 1, question: 'Masofani o\'lchash uchun qaysi sensor ishlatiladi?', options: { a: 'Infraqizil', b: 'Ultratovush', c: 'Harorat' }, correctAnswer: 'b' },
      { id: 2, question: 'Robototexnikada qaysi til ko\'p ishlatiladi?', options: { a: 'JavaScript', b: 'Python', c: 'HTML' }, correctAnswer: 'b' },
      { id: 3, question: 'Robot to\'siqni aniqlaganda nima qiladi?', options: { a: 'To\'xtaydi', b: 'Tezlashadi', c: 'E\'tiborsiz qoldiradi' }, correctAnswer: 'a' },
      { id: 4, question: 'Robotlarda qaysi turdagi dvigatel ko\'p ishlatiladi?', options: { a: 'Qadamli', b: 'Chiziqli', c: 'Turbinli' }, correctAnswer: 'a' },
      { id: 5, question: 'Arduino nima?', options: { a: 'Dasturlashtiriladigan plata', b: 'Sensor', c: 'Dasturlash tili' }, correctAnswer: 'a' },
      { id: 6, question: 'Yorug\'likni aniqlash uchun qaysi sensor ishlatiladi?', options: { a: 'Fotorezistor', b: 'Giroskop', c: 'Akselerometr' }, correctAnswer: 'a' },
      { id: 7, question: 'Servoprivod nima?', options: { a: 'Sensor', b: 'Burchakni boshqarish mexanizmi', c: 'Quvvat manbai' }, correctAnswer: 'b' },
      { id: 8, question: 'Aloqa uchun qaysi protokol ko\'p ishlatiladi?', options: { a: 'HTTP', b: 'I2C', c: 'FTP' }, correctAnswer: 'b' },
      { id: 9, question: 'Giroskop nima o\'lchaydi?', options: { a: 'Haroratni', b: 'Tezlanishni', c: 'Yo\'nalishni' }, correctAnswer: 'c' },
      { id: 10, question: 'ROS nima?', options: { a: 'Operatsion tizim', b: 'Robototexnika uchun freymvork', c: 'Dasturlash tili' }, correctAnswer: 'b' },
    ],
  },
  react: {
    title: 'React',
    icon: react,
    tests: [
      { id: 1, question: 'Holatni boshqarish uchun qaysi huk ishlatiladi?', options: { a: 'useEffect', b: 'useState', c: 'useContext' }, correctAnswer: 'b' },
      { id: 2, question: 'JSX nima?', options: { a: 'Til', b: 'Sintaksik shakar', c: 'Kutubxona' }, correctAnswer: 'b' },
      { id: 3, question: 'Komponentga ma\'lumotni qanday uzatish mumkin?', options: { a: 'Props', b: 'State', c: 'Huklar' }, correctAnswer: 'a' },
      { id: 4, question: 'useEffect nima qiladi?', options: { a: 'Holatni boshqaradi', b: 'Yon ta\'sirlarni qayta ishlaydi', c: 'Ma\'lumot uzatadi' }, correctAnswer: 'b' },
      { id: 5, question: 'useEffect qaysi hayot sikli metodini almashtiradi?', options: { a: 'componentDidMount', b: 'render', c: 'setState' }, correctAnswer: 'a' },
      { id: 6, question: 'React.Fragment nima?', options: { a: 'Komponent', b: 'DOM elementsiz o\'rov', c: 'Huk' }, correctAnswer: 'b' },
      { id: 7, question: 'Kontekstga kirish uchun qaysi huk ishlatiladi?', options: { a: 'useState', b: 'useContext', c: 'useReducer' }, correctAnswer: 'b' },
      { id: 8, question: 'Virtual DOM nima?', options: { a: 'Haqiqiy DOM nusxasi', b: 'Kutubxona', c: 'Komponent' }, correctAnswer: 'a' },
      { id: 9, question: 'React-da holatni qanday yangilash kerak?', options: { a: 'To\'g\'ridan-to\'g\'ri o\'zgartirish orqali', b: 'setState/useState orqali', c: 'props orqali' }, correctAnswer: 'b' },
      { id: 10, question: 'React Router nima?', options: { a: 'Marshrutlash uchun kutubxona', b: 'Huk', c: 'Komponent' }, correctAnswer: 'a' },
    ],
  },
};

// Стилизация (без изменений)
const TestContainer = styled(Box)(({ theme }) => ({
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

const CenteredContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  flexGrow: 1,
  width: '100%',
  gap: theme.breakpoints.down('sm') ? '10px' : '20px',
  padding: theme.breakpoints.down('sm') ? '10px 0' : '20px 0',
  minHeight: 'calc(100vh - 127px)',
}));

const SubjectsContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: theme.breakpoints.down('sm')
    ? 'repeat(auto-fit, minmax(140px, 1fr))'
    : 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: theme.breakpoints.down('sm') ? '8px' : '15px',
  maxWidth: '1000px',
  width: '100%',
  zIndex: 1,
}));

const SubjectCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.05)',
  borderRadius: '20px',
  padding: theme.breakpoints.down('sm') ? '8px' : '12px',
  textAlign: 'center',
  border: '1px solid rgba(255, 255, 255, 0.15)',
  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.5)',
  backdropFilter: 'blur(12px)',
  transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',
  animation: `${scaleIn} 0.5s ease-in-out`,
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(90deg, #FFFFFF, #FFFFFF80)',
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
    background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
    zIndex: 0,
    opacity: 0.7,
  },
  '&:hover': {
    transform: 'translateY(-5px) scale(1.02)',
    boxShadow: '0 15px 40px rgba(0, 0, 0, 0.6), 0 0 20px rgba(255, 255, 255, 0.2)',
    '&:before': {
      height: '6px',
    },
  },
  [theme.breakpoints.down('sm')]: {
    padding: '6px',
    borderRadius: '15px',
  },
}));

const TestCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.05)',
  borderRadius: '25px',
  padding: theme.breakpoints.down('sm') ? '10px' : '15px',
  maxWidth: '650px',
  width: '100%',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5), 0 0 15px rgba(255, 255, 255, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.15)',
  backdropFilter: 'blur(15px)',
  position: 'relative',
  overflow: 'hidden',
  animation: `${scaleIn} 0.6s ease-in-out`,
  zIndex: 1,
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '0',
    width: '6px',
    height: '100%',
    background: 'linear-gradient(to bottom, #FFFFFF, #FFFFFF80)',
    borderRadius: '4px',
  },
  '&:hover': {
    boxShadow: '0 15px 45px rgba(0, 0, 0, 0.6), 0 0 25px rgba(255, 255, 255, 0.2)',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '8px',
    borderRadius: '20px',
  },
}));

const SubjectTitle = styled(Typography)(({ theme }) => ({
  fontSize: theme.breakpoints.down('sm') ? '14px' : '18px',
  fontWeight: 700,
  color: '#FFFFFF',
  textShadow: '0 0 10px rgba(255, 255, 255, 0.4)',
  position: 'relative',
  zIndex: 1,
  marginBottom: '5px',
  fontFamily: '"Orbitron", sans-serif',
  letterSpacing: '1px',
  '&:after': {
    content: '""',
    position: 'absolute',
    bottom: '-6px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '25px',
    height: '2px',
    background: 'linear-gradient(90deg, #FFFFFF, #FFFFFF80)',
    borderRadius: '2px',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '12px',
    '&:after': {
      width: '20px',
      height: '1.5px',
    },
  },
}));

const TestQuestion = styled(Typography)(({ theme }) => ({
  fontSize: theme.breakpoints.down('sm') ? '14px' : '18px',
  fontWeight: 600,
  color: '#FFFFFF',
  marginBottom: '15px',
  textAlign: 'center',
  textShadow: '0 0 6px rgba(255, 255, 255, 0.4)',
  lineHeight: 1.4,
  fontFamily: '"Orbitron", sans-serif',
  letterSpacing: '0.5px',
  animation: `${fadeIn} 0.5s ease-in-out`,
  [theme.breakpoints.down('sm')]: {
    fontSize: '13px',
    marginBottom: '10px',
  },
}));

const OptionLabel = styled(FormControlLabel)(({ isCorrect, isSelected, theme }) => ({
  background: isSelected
    ? isCorrect
      ? 'rgba(255, 255, 255, 0.2)'
      : 'rgba(255, 255, 255, 0.05)'
    : 'rgba(255, 255, 255, 0.05)',
  borderRadius: '12px',
  padding: theme.breakpoints.down('sm') ? '6px 10px' : '8px 15px',
  margin: '4px 0',
  border: '1px solid rgba(255, 255, 255, 0.15)',
  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
  backdropFilter: 'blur(8px)',
  transition: 'all 0.3s ease',
  animation: isSelected ? `${pulseAnimation} 0.5s ease-in-out` : 'none',
  '& .MuiTypography-root': {
    color: isSelected
      ? isCorrect
        ? '#FFFFFF'
        : 'rgba(255, 255, 255, 0.6)'
      : '#FFFFFF',
    fontSize: theme.breakpoints.down('sm') ? '11px' : '13px',
    fontWeight: 500,
    fontFamily: '"Roboto Mono", monospace',
    opacity: isSelected && !isCorrect ? 0.6 : 1,
  },
  '& .MuiRadio-root': {
    color: '#FFFFFF',
    padding: theme.breakpoints.down('sm') ? '5px' : '8px',
  },
  '& .Mui-checked': {
    color: '#FFFFFF',
  },
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.15)',
    transform: 'scale(1.03)',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.4), 0 0 10px rgba(255, 255, 255, 0.2)',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '5px 8px',
    borderRadius: '10px',
  },
}));

const ProgressContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '650px',
  padding: theme.breakpoints.down('sm') ? '6px' : '10px',
  background: 'rgba(255, 255, 255, 0.05)',
  borderRadius: '15px',
  boxShadow: '0 6px 20px rgba(0, 0, 0, 0.4), 0 0 10px rgba(255, 255, 255, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.15)',
  backdropFilter: 'blur(10px)',
  animation: `${fadeIn} 0.5s ease-in-out`,
  [theme.breakpoints.down('sm')]: {
    padding: '5px',
    borderRadius: '12px',
  },
}));

const ProgressLine = styled(LinearProgress)(({ theme }) => ({
  height: '12px',
  borderRadius: '6px',
  background: 'rgba(255, 255, 255, 0.1)',
  boxShadow: 'inset 0 2px 10px rgba(0, 0, 0, 0.3)',
  '& .MuiLinearProgress-bar': {
    background: 'linear-gradient(90deg, #FFFFFF, #FFFFFF80)',
    animation: `${waveAnimation} 2s ease-in-out infinite`,
    boxShadow: '0 0 15px rgba(255, 255, 255, 0.5)',
  },
  [theme.breakpoints.down('sm')]: {
    height: '10px',
    borderRadius: '5px',
  },
}));

const ResultCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.05)',
  borderRadius: '30px',
  padding: theme.breakpoints.down('sm') ? '12px' : '20px',
  maxWidth: '700px',
  width: '100%',
  boxShadow: '0 15px 40px rgba(0, 0, 0, 0.6), 0 0 30px rgba(255, 255, 255, 0.2)',
  border: '1px solid rgba(255, 255, 255, 0.15)',
  backdropFilter: 'blur(15px)',
  position: 'relative',
  zIndex: 10,
  animation: `${scaleIn} 0.8s ease-in-out`,
  overflow: 'hidden',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '0',
    width: '100%',
    height: '100%',
    background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
    zIndex: 0,
  },
  [theme.breakpoints.down('sm')]: {
    padding: '10px',
    borderRadius: '25px',
  },
}));

const Confetti = styled(Box)(({ delay, theme }) => ({
  position: 'absolute',
  width: '15px',
  height: '15px',
  background: 'linear-gradient(45deg, #FFFFFF, #FFFFFF80)',
  borderRadius: '50%',
  animation: `${burstAnimation} 2s ease-out infinite`,
  animationDelay: `${delay}s`,
  transformOrigin: 'center',
  zIndex: 5,
  boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
  [theme.breakpoints.down('sm')]: {
    width: '12px',
    height: '12px',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(135deg, #FFFFFF, #FFFFFF80)',
  color: '#000000',
  padding: theme.breakpoints.down('sm') ? '6px 15px' : '8px 20px',
  borderRadius: '15px',
  textTransform: 'none',
  fontSize: theme.breakpoints.down('sm') ? '11px' : '13px',
  fontWeight: 600,
  fontFamily: '"Orbitron", sans-serif',
  boxShadow: '0 8px 25px rgba(255, 255, 255, 0.3)',
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.4s ease',
  width: '100%',
  animation: `${glowAnimation} 2s ease-in-out infinite`,
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
    boxShadow: '0 12px 30px rgba(255, 255, 255, 0.4), 0 0 20px rgba(255, 255, 255, 0.5)',
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
  [theme.breakpoints.down('sm')]: {
    padding: '5px 12px',
    fontSize: '10px',
  },
}));

const ResultTitle = styled(Typography)(({ theme }) => ({
  fontSize: theme.breakpoints.down('sm') ? '22px' : '28px',
  fontWeight: 800,
  color: '#FFFFFF',
  textShadow: '0 0 15px rgba(255, 255, 255, 0.5)',
  marginBottom: '15px',
  textAlign: 'center',
  fontFamily: '"Orbitron", sans-serif',
  letterSpacing: '2px',
  animation: `${pulseAnimation} 1.5s ease-in-out infinite`,
  [theme.breakpoints.down('sm')]: {
    fontSize: '20px',
  },
}));

const ResultScore = styled(Typography)(({ theme }) => ({
  fontSize: theme.breakpoints.down('sm') ? '16px' : '20px',
  fontWeight: 500,
  color: '#FFFFFF',
  marginBottom: '20px',
  textAlign: 'center',
  fontFamily: '"Roboto Mono", monospace',
  opacity: 0.9,
  animation: `${fadeIn} 0.5s ease-in-out`,
  [theme.breakpoints.down('sm')]: {
    fontSize: '14px',
    marginBottom: '15px',
  },
}));

const TestHeader = styled(Typography)(({ theme }) => ({
  fontSize: theme.breakpoints.down('sm') ? '20px' : '26px',
  fontWeight: 800,
  color: '#FFFFFF',
  textShadow: '0 0 12px rgba(255, 255, 255, 0.4)',
  position: 'relative',
  animation: `${fadeIn} 1s ease-in-out`,
  fontFamily: '"Orbitron", sans-serif',
  letterSpacing: '1px',
  marginBottom: '15px',
  textAlign: 'center',
  '&:after': {
    content: '""',
    position: 'absolute',
    bottom: '-8px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '50px',
    height: '3px',
    background: 'linear-gradient(90deg, #FFFFFF, #FFFFFF80)',
    borderRadius: '2px',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '18px',
    '&:after': {
      width: '40px',
      height: '2px',
    },
  },
}));

const FeedbackMessage = styled(Typography)(({ isCorrect, theme }) => ({
  color: '#FFFFFF',
  fontSize: theme.breakpoints.down('sm') ? '11px' : '13px',
  fontWeight: 500,
  textAlign: 'center',
  marginTop: '10px',
  textShadow: '0 0 4px rgba(255, 255, 255, 0.4)',
  opacity: isCorrect ? 1 : 0.7,
  fontFamily: '"Roboto Mono", monospace',
  animation: `${fadeIn} 0.5s ease-in-out`,
  [theme.breakpoints.down('sm')]: {
    fontSize: '10px',
    marginTop: '8px',
  },
}));

// Компонент теста
const Test = () => {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [currentTestIndex, setCurrentTestIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const { speakText, stopSpeech } = useContext(AccessibilityContext);

  const successSound = new Audio(succesfuly);
  const errorSound = new Audio(error);
  const victorySound = new Audio(victor);

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
      [selectedSubject + '-' + currentTest.id]: { selected: value, isCorrect },
    }));

    if (isCorrect) {
      setCorrectAnswers((prev) => prev + 1);
      successSound.play().catch((err) => console.error("Tovushni ijro etishda xato:", err));
      setTimeout(() => {
        if (currentTestIndex < totalTests - 1) {
          setCurrentTestIndex((prev) => prev + 1);
        } else {
          setShowResult(true);
        }
      }, 500);
    } else {
      errorSound.play().catch((err) => console.error("Tovushni ijro etishda xato:", err));
    }
  };

  const handleBackToSubjects = () => {
    setSelectedSubject(null);
    setShowResult(false);
    setCurrentTestIndex(0);
    setCorrectAnswers(0);
    setUserAnswers({});
  };

  useEffect(() => {
    if (showResult) {
      victorySound.play().catch((err) => console.error("Tovushni ijro etishda xato:", err));
    }
  }, [showResult]);

  return (
    <TestContainer>
      {showResult && (
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
      {!selectedSubject && (
        <CenteredContainer sx={{ marginTop: -30 }}>
          <TestHeader
            onMouseEnter={() => speakText('Testni tanlang')}
            onMouseLeave={stopSpeech}
            onTouchStart={() => speakText('Testni tanlang')}
            onTouchEnd={stopSpeech}
            onFocus={() => speakText('Testni tanlang')}
            onBlur={stopSpeech}
            tabIndex={0}
          >
            Testni tanlang
          </TestHeader>
          <SubjectsContainer>
            {Object.keys(subjectsData).map((subject) => (
              <SubjectCard
                key={subject}
                onClick={() => handleSubjectSelect(subject)}
                onMouseEnter={() => speakText(subjectsData[subject].title)}
                onMouseLeave={stopSpeech}
                onTouchStart={() => speakText(subjectsData[subject].title)}
                onTouchEnd={stopSpeech}
                onFocus={() => speakText(subjectsData[subject].title)}
                onBlur={stopSpeech}
                tabIndex={0}
              >
                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                  <Box
                    sx={{
                      width: { xs: '45px', sm: '55px' },
                      height: { xs: '45px', sm: '55px' },
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      background: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '15px',
                      padding: '5px',
                      boxShadow: '0 6px 15px rgba(0, 0, 0, 0.4), inset 0 0 0 1px rgba(255, 255, 255, 0.15)',
                      backdropFilter: 'blur(8px)',
                      transition: 'all 0.4s ease',
                      '&:hover': {
                        transform: 'scale(1.1) rotate(5deg)',
                        boxShadow: '0 10px 25px rgba(255, 255, 255, 0.3)',
                      },
                    }}
                  >
                    <img
                      src={subjectsData[subject].icon}
                      alt={subjectsData[subject].title}
                      style={{ width: '30px', height: '30px' }}
                    />
                  </Box>
                  <SubjectTitle>{subjectsData[subject].title}</SubjectTitle>
                </CardContent>
              </SubjectCard>
            ))}
          </SubjectsContainer>
        </CenteredContainer>
      )}

      {selectedSubject && !showResult && (
        <CenteredContainer>
          <TestCard>
            <CardContent>
              <SubjectTitle
                onMouseEnter={() =>
                  speakText(`${subjectsData[selectedSubject].title} - Test ${currentTestIndex + 1} / ${totalTests}`)
                }
                onMouseLeave={stopSpeech}
                onTouchStart={() =>
                  speakText(`${subjectsData[selectedSubject].title} - Test ${currentTestIndex + 1} / ${totalTests}`)
                }
                onTouchEnd={stopSpeech}
                onFocus={() =>
                  speakText(`${subjectsData[selectedSubject].title} - Test ${currentTestIndex + 1} / ${totalTests}`)
                }
                onBlur={stopSpeech}
                tabIndex={0}
              >
                {subjectsData[selectedSubject].title} - Test {currentTestIndex + 1}/{totalTests}
              </SubjectTitle>
              <TestQuestion
                onMouseEnter={() => speakText(currentTest.question)}
                onMouseLeave={stopSpeech}
                onTouchStart={() => speakText(currentTest.question)}
                onTouchEnd={stopSpeech}
                onFocus={() => speakText(currentTest.question)}
                onBlur={stopSpeech}
                tabIndex={0}
              >
                {currentTest.question}
              </TestQuestion>
              <RadioGroup
                value={userAnswers[selectedSubject + '-' + currentTest.id]?.selected || ''}
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
                    isSelected={userAnswers[selectedSubject + '-' + currentTest.id]?.selected === key}
                    onMouseEnter={() => speakText(`${key.toUpperCase()}. ${option}`)}
                    onMouseLeave={stopSpeech}
                    onTouchStart={() => speakText(`${key.toUpperCase()}. ${option}`)}
                    onTouchEnd={stopSpeech}
                    onFocus={() => speakText(`${key.toUpperCase()}. ${option}`)}
                    onBlur={stopSpeech}
                    tabIndex={0}
                  />
                ))}
              </RadioGroup>
              {userAnswers[selectedSubject + '-' + currentTest.id] && (
                <FeedbackMessage
                  isCorrect={userAnswers[selectedSubject + '-' + currentTest.id].isCorrect}
                  onMouseEnter={() =>
                    speakText(
                      userAnswers[selectedSubject + '-' + currentTest.id].isCorrect
                        ? 'To\'g\'ri! Keyingisiga tayyorlanamiz...'
                        : 'Afsus, noto\'g\'ri. Yana urinib ko\'ring!'
                    )
                  }
                  onMouseLeave={stopSpeech}
                  onTouchStart={() =>
                    speakText(
                      userAnswers[selectedSubject + '-' + currentTest.id].isCorrect
                        ? 'To\'g\'ri! Keyingisiga tayyorlanamiz...'
                        : 'Afsus, noto\'g\'ri. Yana urinib ko\'ring!'
                    )
                  }
                  onTouchEnd={stopSpeech}
                  onFocus={() =>
                    speakText(
                      userAnswers[selectedSubject + '-' + currentTest.id].isCorrect
                        ? 'To\'g\'ri! Keyingisiga tayyorlanamiz...'
                        : 'Afsus, noto\'g\'ri. Yana urinib ko\'ring!'
                    )
                  }
                  onBlur={stopSpeech}
                  tabIndex={0}
                >
                  {userAnswers[selectedSubject + '-' + currentTest.id].isCorrect
                    ? 'To\'g\'ri! Keyingisiga tayyorlanamiz...'
                    : 'Afsus, noto\'g\'ri. Yana urinib ko\'ring!'}
                </FeedbackMessage>
              )}
            </CardContent>
          </TestCard>
          <ProgressContainer>
            <Typography
              sx={{
                color: '#FFFFFF',
                fontSize: { xs: '11px', sm: '13px' },
                fontWeight: 500,
                opacity: 0.8,
                fontFamily: '"Roboto Mono", monospace',
              }}
              onMouseEnter={() => speakText(`Jarayon: ${correctAnswers} / ${totalTests}`)}
              onMouseLeave={stopSpeech}
              onTouchStart={() => speakText(`Jarayon: ${correctAnswers} / ${totalTests}`)}
              onTouchEnd={stopSpeech}
              onFocus={() => speakText(`Jarayon: ${correctAnswers} / ${totalTests}`)}
              onBlur={stopSpeech}
              tabIndex={0}
            >
              Jarayon: {correctAnswers}/{totalTests}
            </Typography>
            <ProgressLine variant="determinate" value={(correctAnswers / totalTests) * 100} />
          </ProgressContainer>
        </CenteredContainer>
      )}
      {showResult && (
        <CenteredContainer>
          <ResultCard>
            <ResultTitle
              onMouseEnter={() => speakText('Tabriklaymiz!')}
              onMouseLeave={stopSpeech}
              onTouchStart={() => speakText('Tabriklaymiz!')}
              onTouchEnd={stopSpeech}
              onFocus={() => speakText('Tabriklaymiz!')}
              onBlur={stopSpeech}
              tabIndex={0}
            >
              Tabriklaymiz!
            </ResultTitle>
            <ResultScore
              onMouseEnter={() => speakText(`Siz to\'plagan ball: ${correctAnswers} / ${totalTests}`)}
              onMouseLeave={stopSpeech}
              onTouchStart={() => speakText(`Siz to\'plagan ball: ${correctAnswers} / ${totalTests}`)}
              onTouchEnd={stopSpeech}
              onFocus={() => speakText(`Siz to\'plagan ball: ${correctAnswers} / ${totalTests}`)}
              onBlur={stopSpeech}
              tabIndex={0}
            >
              Siz to\'plagan ball: {correctAnswers}/{totalTests}
            </ResultScore>
            <StyledButton
              onClick={handleBackToSubjects}
              onMouseEnter={() => speakText('Testlarga qaytish')}
              onMouseLeave={stopSpeech}
              onTouchStart={() => speakText('Testlarga qaytish')}
              onTouchEnd={stopSpeech}
              onFocus={() => speakText('Testlarga qaytish')}
              onBlur={stopSpeech}
              tabIndex={0}
            >
              Testlarga qaytish
            </StyledButton>
          </ResultCard>
        </CenteredContainer>
      )}
    </TestContainer>
  );
};

export default Test;