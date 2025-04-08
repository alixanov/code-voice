// Main.js
import React, { useState, useContext } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import js from "../../assets/icons8-javascript-96.png";
import python from "../../assets/icons8-python-144.png";
import roboto from "../../assets/icons8-robot-94.png";
import react from "../../assets/icons8-react-100.png";
import { AccessibilityContext } from '../voice/AccessibilityContext'; // Импортируем контекст

// Данные курсов (без изменений)
const coursesData = {
  javascript: {
    title: 'Основы JavaScript',
    icon: js,
    description: 'Погрузитесь в мир веб-разработки с JavaScript!',
    lastUpdated: '15 марта 2025',
    difficulty: 'Начинающий',
    duration: '6 недель',
    lessons: [
      {
        id: 1,
        title: 'Переменные и типы данных',
        date: '12 апреля 2025',
        content: `В JavaScript переменные объявляются с помощью let, const или var. Они могут содержать строки, числа, булевы значения и другие типы данных. Пример:\n
javascript\nlet name = "Алексей";\nconst age = 25;\nlet isStudent = true;\nconsole.log(\`Имя: \${name}, Возраст: \${age}, Студент: \${isStudent}\`);\n
`,
        testCode: 'let name = "Алексей";\nconst age = 25;\nlet isStudent = true;\nconsole.log(`Имя: ${name}, Возраст: ${age}, Студент: ${isStudent}`);',
        expectedOutput: 'Имя: Алексей, Возраст: 25, Студент: true',
        funFact: 'JavaScript был создан всего за 10 дней в мае 1995 года Бренданом Эйхом!',
      },
      {
        id: 2,
        title: 'Функции и условия',
        date: '19 апреля 2025',
        content: `Функции в JavaScript позволяют создавать переиспользуемый код. Условия (if) управляют логикой. Пример игры "Угадай число":\n
javascript\nfunction guessNumber(num) {\n  const secret = 42;\n  if (num === secret) return "Угадал!";\n  return num > secret ? "Слишком много" : "Слишком мало";\n}\nconsole.log(guessNumber(42));\n
`,
        testCode: 'function guessNumber(num) {\n  const secret = 42;\n  if (num === secret) return "Угадал!";\n  return num > secret ? "Слишком много" : "Слишком мало";\n}\nconsole.log(guessNumber(42));',
        expectedOutput: 'Угадал!',
        funFact: 'Число 42 в примере — отсылка к книге "Автостопом по галактике", где это "ответ на главный вопрос жизни, вселенной и всего такого".',
      },
      {
        id: 3,
        title: 'Массивы и циклы',
        date: '26 апреля 2025',
        content: `Массивы хранят списки данных, а циклы (for) позволяют их обрабатывать. Пример подсчета очков:\n
javascript\nconst scores = [85, 92, 78, 95];\nlet total = 0;\nfor (let i = 0; i < scores.length; i++) {\n  total += scores[i];\n}\nconsole.log(\`Средний балл: \${total / scores.length}\`);\n
`,
        testCode: 'const scores = [85, 92, 78, 95];\nlet total = 0;\nfor (let i = 0; i < scores.length; i++) {\n  total += scores[i];\n}\nconsole.log(`Средний балл: ${total / scores.length}`);',
        expectedOutput: 'Средний балл: 87.5',
        funFact: 'Современные браузеры обрабатывают миллионы операций JavaScript в секунду!',
      },
      {
        id: 4,
        title: 'Объекты и методы',
        date: '3 мая 2025',
        content: `Объекты в JavaScript — это коллекции данных. Пример:\n
javascript\nconst user = { name: "Анна", age: 30, greet() { return \`Привет, я \${this.name}!\`; } };\nconsole.log(user.greet());\n
`,
        testCode: 'const user = { name: "Анна", age: 30, greet() { return `Привет, я ${this.name}!`; } };\nconsole.log(user.greet());',
        expectedOutput: 'Привет, я Анна!',
        funFact: 'Объекты в JavaScript — это основа для создания сложных приложений!',
      },
    ],
  },
  python: {
    title: 'Python для начинающих',
    icon: python,
    description: 'Освойте мощный и простой язык программирования!',
    lastUpdated: '28 февраля 2025',
    difficulty: 'Начинающий',
    duration: '8 недель',
    lessons: [
      {
        id: 1,
        title: 'Переменные и ввод данных',
        date: '10 апреля 2025',
        content: `В Python переменные не требуют типов, а input() позволяет взаимодействовать с пользователем. Пример:\n
python\nname = input("Введите ваше имя: ")\nage = int(input("Введите ваш возраст: "))\nprint(f"Привет, {name}! Через 5 лет тебе будет {age + 5} лет.")\n
`,
        testCode: 'name = "Иван"\nage = 22\nprint(f"Привет, {name}! Через 5 лет тебе будет {age + 5} лет.")',
        expectedOutput: 'Привет, Иван! Через 5 лет тебе будет 27 лет.',
        funFact: 'Название Python происходит не от змеи, а от комедийного шоу "Монти Пайтон"!',
      },
      {
        id: 2,
        title: 'Списки и циклы',
        date: '17 апреля 2025',
        content: `Списки и цикл for идеальны для обработки данных. Пример списка покупок:\n
python\nitems = ["хлеб", "молоко", "яйца"]\nfor item in items:\n  print(f"Купить: {item}")\n
`,
        testCode: 'items = ["хлеб", "молоко", "яйца"]\nfor item in items:\n  print(f"Купить: {item}")',
        expectedOutput: 'Купить: хлеб\nКупить: молоко\nКупить: яйца',
        funFact: 'Python используется NASA для обработки изображений с космических телескопов!',
      },
      {
        id: 3,
        title: 'Словари и работа с данными',
        date: '24 апреля 2025',
        content: `Словари хранят данные в формате ключ-значение. Пример учета расходов:\n
python\nexpenses = {"еда": 500, "транспорт": 200, "развлечения": 300}\ntotal = sum(expenses.values())\nprint(f"Общие расходы: {total} руб.")\n
`,
        testCode: 'expenses = {"еда": 500, "транспорт": 200, "развлечения": 300}\ntotal = sum(expenses.values())\nprint(f"Общие расходы: {total} руб.")',
        expectedOutput: 'Общие расходы: 1000 руб.',
        funFact: 'Python входит в тройку самых популярных языков программирования в мире!',
      },
      {
        id: 4,
        title: 'Функции и модули',
        date: '1 мая 2025',
        content: `Функции позволяют организовать код. Пример:\n
python\ndef calculate_area(length, width):\n  return length * width\narea = calculate_area(5, 3)\nprint(f"Площадь: {area} кв.м")\n
`,
        testCode: 'def calculate_area(length, width):\n  return length * width\narea = calculate_area(5, 3)\nprint(f"Площадь: {area} кв.м")',
        expectedOutput: 'Площадь: 15 кв.м',
        funFact: 'Python часто используется для машинного обучения и анализа данных!',
      },
    ],
  },
  robotics: {
    title: 'Введение в робототехнику',
    icon: roboto,
    description: 'Научитесь управлять роботами с помощью кода!',
    lastUpdated: '5 апреля 2025',
    difficulty: 'Средний',
    duration: '10 недель',
    lessons: [
      {
        id: 1,
        title: 'Программирование движения робота',
        date: '15 апреля 2025',
        content: `Робототехника использует классы для моделирования поведения. Пример:\n
python\nclass Robot:\n  def move_forward(self):\n    return "Робот движется вперед"\n  def turn_left(self):\n    return "Робот поворачивает налево"\nrobot = Robot()\nprint(robot.move_forward())\n
`,
        testCode: 'class Robot:\n  def move_forward(self):\n    return "Робот движется вперед"\nrobot = Robot()\nprint(robot.move_forward())',
        expectedOutput: 'Робот движется вперед',
        funFact: 'Слово "робот" впервые было использовано в пьесе чешского писателя Карела Чапека в 1920 году!',
      },
      {
        id: 2,
        title: 'Датчики и логика',
        date: '22 апреля 2025',
        content: `Роботы используют датчики для принятия решений. Пример:\n
python\nclass Robot:\n  def detect_obstacle(self, distance):\n    if distance < 10:\n      return "Остановка: препятствие"\n    return "Движение вперед"\nrobot = Robot()\nprint(robot.detect_obstacle(5))\n
`,
        testCode: 'class Robot:\n  def detect_obstacle(self, distance):\n    if distance < 10:\n      return "Остановка: препятствие"\n    return "Движение вперед"\nrobot = Robot()\nprint(robot.detect_obstacle(5))',
        expectedOutput: 'Остановка: препятствие',
        funFact: 'Современные роботы могут иметь более 100 различных датчиков!',
      },
      {
        id: 3,
        title: 'Управление моторами',
        date: '29 апреля 2025',
        content: `Моторы управляются через команды. Пример:\n
python\nclass Robot:\n  def set_speed(self, speed):\n    return f"Скорость установлена на {speed}%\nrobot = Robot()\nprint(robot.set_speed(75))\n
`,
        testCode: 'class Robot:\n  def set_speed(self, speed):\n    return f"Скорость установлена на {speed}%"\nrobot = Robot()\nprint(robot.set_speed(75))',
        expectedOutput: 'Скорость установлена на 75%',
        funFact: 'Роботы на заводах могут двигаться со скоростью до 10 м/с!',
      },
    ],
  },
  react: {
    title: 'React для начинающих',
    icon: react,
    description: 'Создавайте современные веб-приложения с React!',
    lastUpdated: '10 апреля 2025',
    difficulty: 'Средний',
    duration: '8 недель',
    lessons: [
      {
        id: 1,
        title: 'Компоненты и JSX',
        date: '13 апреля 2025',
        content: `React использует компоненты для создания интерфейсов. Пример:\n
jsx\nfunction Greeting() {\n  return <h1>Привет, мир!</h1>;\n}\n
`,
        testCode: 'function Greeting() {\n  return <h1>Привет, мир!</h1>;\n}',
        expectedOutput: 'Привет, мир!',
        funFact: 'React был создан в Facebook и впервые использован в 2013 году!',
      },
      {
        id: 2,
        title: 'Состояние и хуки',
        date: '20 апреля 2025',
        content: `Хук useState управляет состоянием. Пример счётчика:\n
jsx\nimport React, { useState } from "react";\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  return (\n    <div>\n      <p>Счётчик: {count}</p>\n      <button onClick={() => setCount(count + 1)}>Увеличить</button>\n    </div>\n  );\n}\n
`,
        testCode: 'import React, { useState } from "react";\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  return (\n    <div>\n      <p>Счётчик: {count}</p>\n      <button onClick={() => setCount(count + 1)}>Увеличить</button>\n    </div>\n  );\n}',
        expectedOutput: 'Счётчик: 0',
        funFact: 'Хуки были введены в React 16.8 в 2019 году!',
      },
      {
        id: 3,
        title: 'События и обработчики',
        date: '27 апреля 2025',
        content: `Обработчики событий в React используют атрибуты, такие как onClick. Пример:\n
jsx\nfunction Button() {\n  const handleClick = () => alert("Кнопка нажата!");\n  return <button onClick={handleClick}>Нажми меня</button>;\n}\n
`,
        testCode: 'function Button() {\n  const handleClick = () => alert("Кнопка нажата!");\n  return <button onClick={handleClick}>Нажми меня</button>;\n}',
        expectedOutput: 'Кнопка нажата!',
        funFact: 'React позволяет легко управлять событиями без прямого доступа к DOM!',
      },
    ],
  },
};

// Стили (без изменений)
const ScrollContainer = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #000000 10%,rgb(18, 18, 18) 90%)',
  maxHeight: 'calc(100vh - 145px)',
  overflowY: 'auto',
  padding: theme.breakpoints.down('sm') ? '8px' : '15px',
  margin: theme.breakpoints.down('sm') ? '0' : '10px',
  marginTop: theme.breakpoints.down('sm') ? '0' : '10px',
  borderRadius: '25px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  scrollbarWidth: 'none',
  '-ms-overflow-style': 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  animation: 'fadeIn 1s ease-in-out',
  '@keyframes fadeIn': {
    '0%': { opacity: 0, transform: 'translateY(20px)' },
    '100%': { opacity: 1, transform: 'translateY(0)' },
  },
}));

const CourseSection = styled(Box)({
  width: '100%',
  maxWidth: '1300px',
  transition: 'all 0.5s ease',
});

const CourseCard = styled(Box)(({ theme }) => ({
  background: '#1A1A1A',
  borderRadius: '25px',
  padding: theme.breakpoints.down('sm') ? '8px' : '15px',
  margin: theme.breakpoints.down('sm') ? '8px 0' : '15px',
  width: '100%',
  cursor: 'pointer',
  transition: 'all 0.4s cubic-bezier(0.1, 0.82, 0.25, 1)',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
  position: 'relative',
  overflow: 'hidden',
  backdropFilter: 'blur(10px)',
  animation: 'cardFadeIn 0.8s ease-in-out',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '5px',
    background: 'linear-gradient(90deg, #FFFFFF, #FFFFFF)',
    borderRadius: '25px 25px 0 0',
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
  '@keyframes cardFadeIn': {
    '0%': { opacity: 0, transform: 'scale(0.95)' },
    '100%': { opacity: 1, transform: 'scale(1)' },
  },
}));

const CourseHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.breakpoints.down('sm') ? '10px' : '20px',
  position: 'relative',
  zIndex: 1,
}));

const IconWrapper = styled(Box)({
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
});

const CourseInfo = styled(Box)(({ theme }) => ({
  marginTop: '10px',
  display: 'flex',
  gap: '8px',
  flexWrap: 'wrap',
  position: 'relative',
  zIndex: 1,
  padding: theme.breakpoints.down('sm') ? '0 5px' : '0',
}));

const CourseTitle = styled(Typography)(({ theme }) => ({
  fontSize: theme.breakpoints.down('sm') ? '20px' : '28px',
  fontWeight: 800,
  color: '#FFFFFF',
  textShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
  position: 'relative',
  marginBottom: '5px',
  '&:after': {
    content: '""',
    position: 'absolute',
    bottom: '-8px',
    left: '0',
    width: '40px',
    height: '3px',
    background: 'linear-gradient(90deg, #FFFFFF, #FFFFFF)',
    borderRadius: '3px',
  },
}));

const CourseDescription = styled(Typography)(({ theme }) => ({
  fontSize: theme.breakpoints.down('sm') ? '12px' : '16px',
  color: '#FFFFFF',
  marginTop: '8px',
  position: 'relative',
  zIndex: 1,
  lineHeight: 1.5,
  opacity: 0.8,
}));

const LessonCard = styled(Box)(({ theme }) => ({
  background: '#1A1A1A',
  borderRadius: '25px',
  padding: theme.breakpoints.down('sm') ? '8px' : '15px',
  margin: theme.breakpoints.down('sm') ? '8px 0' : '15px',
  boxShadow: '0 12px 35px rgba(0, 0, 0, 0.5)',
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.4s ease',
  backdropFilter: 'blur(8px)',
  animation: 'cardFadeIn 0.8s ease-in-out',
  '&:hover': {
    boxShadow: '0 15px 45px rgba(0, 0, 0, 0.7)',
  },
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
  '@keyframes cardFadeIn': {
    '0%': { opacity: 0, transform: 'scale(0.95)' },
    '100%': { opacity: 1, transform: 'scale(1)' },
  },
}));

const LessonTitle = styled(Typography)(({ theme }) => ({
  fontSize: theme.breakpoints.down('sm') ? '18px' : '24px',
  fontWeight: 700,
  color: '#FFFFFF',
  marginBottom: '5px',
  textShadow: '0 0 8px rgba(255, 255, 255, 0.3)',
  paddingLeft: '15px',
}));

const LessonDate = styled(Typography)(({ theme }) => ({
  fontSize: theme.breakpoints.down('sm') ? '10px' : '12px',
  color: '#FFFFFF',
  marginBottom: '10px',
  display: 'flex',
  alignItems: 'center',
  paddingLeft: '15px',
  opacity: 0.7,
  '&:before': {
    content: '"📅"',
    marginRight: '8px',
  },
}));

const ContentArea = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.breakpoints.down('sm') ? '10px' : '20px',
  width: '100%',
  flexDirection: { xs: 'column', md: 'row' },
}));

const LessonContent = styled(Typography)(({ theme }) => ({
  fontSize: theme.breakpoints.down('sm') ? '14px' : '16px',
  color: '#FFFFFF',
  whiteSpace: 'pre-wrap',
  background: 'rgba(255, 255, 255, 0.05)',
  padding: theme.breakpoints.down('sm') ? '10px' : '15px',
  borderRadius: '15px',
  flex: 1,
  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3), inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
  lineHeight: 1.6,
  opacity: 0.9,
}));

const FunFactBox = styled(Box)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.05)',
  padding: theme.breakpoints.down('sm') ? '10px' : '15px',
  borderRadius: '15px',
  marginTop: '10px',
  position: 'relative',
  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3), inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(5px)',
  '&:before': {
    content: '"💡"',
    position: 'absolute',
    top: '-15px',
    left: '15px',
    background: 'rgba(255, 255, 255, 0.05)',
    padding: '8px',
    borderRadius: '50%',
    fontSize: '16px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3), inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
  },
}));

const FunFactText = styled(Typography)(({ theme }) => ({
  fontSize: theme.breakpoints.down('sm') ? '12px' : '14px',
  color: '#FFFFFF',
  paddingLeft: '10px',
  lineHeight: '1.5',
  fontStyle: 'italic',
  opacity: 0.8,
}));

const CodeEditor = styled(TextField)(({ theme }) => ({
  width: '100%',
  flex: 1,
  '& .MuiInputBase-root': {
    background: '#1A1A1A',
    borderRadius: '15px',
    fontFamily: '"Fira Code", monospace',
    fontSize: theme.breakpoints.down('sm') ? '12px' : '14px',
    color: '#FFFFFF',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: 'inset 0 2px 10px rgba(0, 0, 0, 0.3)',
    backdropFilter: 'blur(5px)',
  },
  '& .MuiInputLabel-root': {
    color: '#FFFFFF',
    fontFamily: '"Fira Code", monospace',
    fontSize: theme.breakpoints.down('sm') ? '12px' : '14px',
    opacity: 0.7,
  },
  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#FFFFFF',
      borderWidth: '2px',
    },
  },
}));

const Output = styled(Typography)(({ success, theme }) => {
  const bgColor = success ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)';

  return {
    fontSize: theme.breakpoints.down('sm') ? '12px' : '14px',
    color: '#FFFFFF',
    fontFamily: '"Fira Code", monospace',
    background: bgColor,
    padding: theme.breakpoints.down('sm') ? '10px' : '15px',
    borderRadius: '15px',
    marginTop: '10px',
    position: 'relative',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3), inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(5px)',
    '&:before': {
      content: '"Output"',
      position: 'absolute',
      top: '-12px',
      left: '15px',
      background: '#1A1A1A',
      padding: '4px 12px',
      borderRadius: '10px',
      fontSize: '12px',
      fontWeight: 600,
      border: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
      color: '#FFFFFF',
    },
  };
});

const TryButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(135deg, #FFFFFF, #FFFFFF)',
  color: '#000000',
  padding: theme.breakpoints.down('sm') ? '8px 15px' : '10px 25px',
  borderRadius: '15px',
  textTransform: 'none',
  fontSize: theme.breakpoints.down('sm') ? '12px' : '14px',
  fontWeight: 600,
  boxShadow: '0 8px 25px rgba(255, 255, 255, 0.2)',
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
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
    transform: 'translateY(-1px)',
    '&:before': {
      left: '150%',
      opacity: 1,
    },
  },
  '&:active': {
    transform: 'translateY(1px)',
    boxShadow: '0 5px 15px rgba(255, 255, 255, 0.2)',
  },
}));

const CourseHeaderTitle = styled(Typography)(({ theme }) => ({
  fontSize: theme.breakpoints.down('sm') ? '26px' : '36px',
  fontWeight: 800,
  textAlign: 'center',
  color: '#FFFFFF',
  marginBottom: '20px',
  position: 'relative',
  textShadow: '0 0 15px rgba(255, 255, 255, 0.3)',
  animation: 'titleFadeIn 1.2s ease-in-out',
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
  '@keyframes titleFadeIn': {
    '0%': { opacity: 0, transform: 'translateY(-20px)' },
    '100%': { opacity: 1, transform: 'translateY(0)' },
  },
}));

const CurrentDate = styled(Typography)(({ theme }) => ({
  fontSize: theme.breakpoints.down('sm') ? '12px' : '14px',
  color: '#FFFFFF',
  textAlign: 'center',
  marginBottom: '20px',
  fontStyle: 'italic',
  position: 'relative',
  padding: '6px 15px',
  background: 'rgba(255, 255, 255, 0.05)',
  borderRadius: '15px',
  display: 'inline-block',
  boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
  opacity: 0.7,
  animation: 'titleFadeIn 1.2s ease-in-out',
}));

const HeaderContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: '15px',
  position: 'relative',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '200px',
    height: '200px',
    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 70%)',
    zIndex: 0,
  },
});

const ChipStyled = styled(Chip)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.05)',
  color: '#FFFFFF',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(3px)',
  fontWeight: 500,
  fontSize: theme.breakpoints.down('sm') ? '10px' : '12px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
  transition: 'all 0.3s ease',
  opacity: 0.8,
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.1)',
    transform: 'scale(1.05)',
    opacity: 1,
  },
}));

// Main Component
const Main = () => {
  const [expandedCourses, setExpandedCourses] = useState({});
  const [codeInputs, setCodeInputs] = useState({});
  const [outputs, setOutputs] = useState({});
  const { speakText, stopSpeech } = useContext(AccessibilityContext);

  const handleToggleCourse = (courseKey) => {
    setExpandedCourses((prev) => ({
      ...prev,
      [courseKey]: !prev[courseKey],
    }));
  };

  const handleCodeChange = (courseKey, lessonId, value) => {
    setCodeInputs((prev) => ({
      ...prev,
      [`${courseKey}-${lessonId}`]: value,
    }));
  };

  const executeCode = (courseKey, lessonId) => {
    const lesson = coursesData[courseKey].lessons.find((l) => l.id === lessonId);
    const userCode = codeInputs[`${courseKey}-${lessonId}`] || lesson.testCode;

    try {
      const expectedOutput = lesson.expectedOutput;
      const simulatedOutput = userCode.trim() === lesson.testCode.trim() ? expectedOutput : "Ошибка: код не соответствует ожидаемому";

      setOutputs((prev) => ({
        ...prev,
        [`${courseKey}-${lessonId}`]: {
          result: simulatedOutput,
          success: simulatedOutput === expectedOutput,
        },
      }));
    } catch (error) {
      setOutputs((prev) => ({
        ...prev,
        [`${courseKey}-${lessonId}`]: {
          result: `Ошибка выполнения: ${error.message}`,
          success: false,
        },
      }));
    }
  };

  const currentDate = new Date().toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <ScrollContainer>
      <HeaderContainer>
        <CourseHeaderTitle
          onMouseEnter={() => speakText('Курсы программирования')}
          onMouseLeave={stopSpeech}
          onTouchStart={() => speakText('Курсы программирования')}
          onTouchEnd={stopSpeech}
          onFocus={() => speakText('Курсы программирования')}
          onBlur={stopSpeech}
          tabIndex={0}
        >
          Курсы программирования
        </CourseHeaderTitle>
        <CurrentDate
          onMouseEnter={() => speakText(`Сегодня: ${currentDate}`)}
          onMouseLeave={stopSpeech}
          onTouchStart={() => speakText(`Сегодня: ${currentDate}`)}
          onTouchEnd={stopSpeech}
          onFocus={() => speakText(`Сегодня: ${currentDate}`)}
          onBlur={stopSpeech}
          tabIndex={0}
        >
          Сегодня: {currentDate}
        </CurrentDate>
      </HeaderContainer>

      {Object.keys(coursesData).map((courseKey) => {
        const course = coursesData[courseKey];
        const isExpanded = expandedCourses[courseKey] || false;

        return (
          <CourseSection key={courseKey}>
            <CourseCard onClick={() => handleToggleCourse(courseKey)}>
              <CourseHeader>
                <IconWrapper>
                  <img src={course.icon} alt={`${course.title} icon`} style={{ width: '40px', height: '40px' }} />
                </IconWrapper>
                <Box>
                  <CourseTitle
                    onMouseEnter={() => speakText(course.title)}
                    onMouseLeave={stopSpeech}
                    onTouchStart={() => speakText(course.title)}
                    onTouchEnd={stopSpeech}
                    onFocus={() => speakText(course.title)}
                    onBlur={stopSpeech}
                    tabIndex={0}
                  >
                    {course.title}
                  </CourseTitle>
                  <CourseDescription
                    onMouseEnter={() => speakText(course.description)}
                    onMouseLeave={stopSpeech}
                    onTouchStart={() => speakText(course.description)}
                    onTouchEnd={stopSpeech}
                    onFocus={() => speakText(course.description)}
                    onBlur={stopSpeech}
                    tabIndex={0}
                  >
                    {course.description}
                  </CourseDescription>
                </Box>
              </CourseHeader>
              <CourseInfo>
                <ChipStyled
                  label={`Последнее обновление: ${course.lastUpdated}`}
                  onMouseEnter={() => speakText(`Последнее обновление: ${course.lastUpdated}`)}
                  onMouseLeave={stopSpeech}
                  onTouchStart={() => speakText(`Последнее обновление: ${course.lastUpdated}`)}
                  onTouchEnd={stopSpeech}
                  onFocus={() => speakText(`Последнее обновление: ${course.lastUpdated}`)}
                  onBlur={stopSpeech}
                  tabIndex={0}
                />
                <ChipStyled
                  label={`Сложность: ${course.difficulty}`}
                  onMouseEnter={() => speakText(`Сложность: ${course.difficulty}`)}
                  onMouseLeave={stopSpeech}
                  onTouchStart={() => speakText(`Сложность: ${course.difficulty}`)}
                  onTouchEnd={stopSpeech}
                  onFocus={() => speakText(`Сложность: ${course.difficulty}`)}
                  onBlur={stopSpeech}
                  tabIndex={0}
                />
                <ChipStyled
                  label={`Длительность: ${course.duration}`}
                  onMouseEnter={() => speakText(`Длительность: ${course.duration}`)}
                  onMouseLeave={stopSpeech}
                  onTouchStart={() => speakText(`Длительность: ${course.duration}`)}
                  onTouchEnd={stopSpeech}
                  onFocus={() => speakText(`Длительность: ${course.duration}`)}
                  onBlur={stopSpeech}
                  tabIndex={0}
                />
              </CourseInfo>
            </CourseCard>

            {isExpanded && (
              <Box>
                {course.lessons.map((lesson) => (
                  <LessonCard key={lesson.id}>
                    <LessonTitle
                      onMouseEnter={() => speakText(lesson.title)}
                      onMouseLeave={stopSpeech}
                      onTouchStart={() => speakText(lesson.title)}
                      onTouchEnd={stopSpeech}
                      onFocus={() => speakText(lesson.title)}
                      onBlur={stopSpeech}
                      tabIndex={0}
                    >
                      {lesson.title}
                    </LessonTitle>
                    <LessonDate
                      onMouseEnter={() => speakText(lesson.date)}
                      onMouseLeave={stopSpeech}
                      onTouchStart={() => speakText(lesson.date)}
                      onTouchEnd={stopSpeech}
                      onFocus={() => speakText(lesson.date)}
                      onBlur={stopSpeech}
                      tabIndex={0}
                    >
                      {lesson.date}
                    </LessonDate>
                    <ContentArea>
                      <LessonContent
                        onMouseEnter={() => speakText(lesson.content)}
                        onMouseLeave={stopSpeech}
                        onTouchStart={() => speakText(lesson.content)}
                        onTouchEnd={stopSpeech}
                        onFocus={() => speakText(lesson.content)}
                        onBlur={stopSpeech}
                        tabIndex={0}
                      >
                        {lesson.content}
                      </LessonContent>
                      <Box sx={{ flex: 1 }}>
                        <CodeEditor
                          label="Попробуйте код"
                          multiline
                          rows={6}
                          value={codeInputs[`${courseKey}-${lesson.id}`] || lesson.testCode}
                          onChange={(e) => handleCodeChange(courseKey, lesson.id, e.target.value)}
                          variant="outlined"
                          inputProps={{
                            'aria-label': 'Поле для ввода кода',
                          }}
                        />
                        <TryButton
                          onClick={() => executeCode(courseKey, lesson.id)}
                          sx={{ mt: 1.5, width: '100%' }}
                          onMouseEnter={() => speakText('Выполнить')}
                          onMouseLeave={stopSpeech}
                          onTouchStart={() => speakText('Выполнить')}
                          onTouchEnd={stopSpeech}
                          onFocus={() => speakText('Выполнить')}
                          onBlur={stopSpeech}
                          tabIndex={0}
                        >
                          Выполнить
                        </TryButton>
                        {outputs[`${courseKey}-${lesson.id}`] && (
                          <Output
                            success={outputs[`${courseKey}-${lesson.id}`].success}
                            onMouseEnter={() =>
                              speakText(`Результат: ${outputs[`${courseKey}-${lesson.id}`].result}`)
                            }
                            onMouseLeave={stopSpeech}
                            onTouchStart={() =>
                              speakText(`Результат: ${outputs[`${courseKey}-${lesson.id}`].result}`)
                            }
                            onTouchEnd={stopSpeech}
                            onFocus={() =>
                              speakText(`Результат: ${outputs[`${courseKey}-${lesson.id}`].result}`)
                            }
                            onBlur={stopSpeech}
                            tabIndex={0}
                          >
                            {outputs[`${courseKey}-${lesson.id}`].result}
                          </Output>
                        )}
                      </Box>
                    </ContentArea>
                    <FunFactBox>
                      <FunFactText
                        onMouseEnter={() => speakText(`Интересный факт: ${lesson.funFact}`)}
                        onMouseLeave={stopSpeech}
                        onTouchStart={() => speakText(`Интересный факт: ${lesson.funFact}`)}
                        onTouchEnd={stopSpeech}
                        onFocus={() => speakText(`Интересный факт: ${lesson.funFact}`)}
                        onBlur={stopSpeech}
                        tabIndex={0}
                      >
                        {lesson.funFact}
                      </FunFactText>
                    </FunFactBox>
                  </LessonCard>
                ))}
              </Box>
            )}
          </CourseSection>
        );
      })}
    </ScrollContainer>
  );
};

export default Main;