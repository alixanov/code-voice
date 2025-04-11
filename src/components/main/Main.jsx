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
import { AccessibilityContext } from '../voice/AccessibilityContext';
import { useLanguage } from '../context/LanguageContext';

// Kurslar ma'lumotlari (Courses Data with Translations)
const coursesData = {
  javascript: {
    title: { uz: 'JavaScript asoslari', ru: 'Основы JavaScript' },
    icon: js,
    description: { uz: 'Veb-dasturlash olamiga JavaScript bilan sho\'ng\'ing!', ru: 'Погрузитесь в мир веб-программирования с JavaScript!' },
    lastUpdated: '15 mart 2025',
    difficulty: { uz: 'Boshlang\'ich', ru: 'Начальный' },
    duration: { uz: '6 hafta', ru: '6 недель' },
    lessons: [
      {
        id: 1,
        title: { uz: 'O\'zgaruvchilar va ma\'lumot turlari', ru: 'Переменные и типы данных' },
        date: '12 aprel 2025',
        content: {
          uz: `JavaScript-da o'zgaruvchilar let, const yoki var yordamida e'lon qilinadi. Ular satrlar, raqamlar, mantiqiy qiymatlar va boshqa ma'lumot turlarini saqlashi mumkin. Misol:\n
javascript\nlet ism = "Ali";\nconst yosh = 25;\nlet talaba = true;\nconsole.log(\`Ism: \${ism}, Yosh: \${yosh}, Talaba: \${talaba}\`);\n`,
          ru: `В JavaScript переменные объявляются с помощью let, const или var. Они могут хранить строки, числа, логические значения и другие типы данных. Пример:\n
javascript\nlet ism = "Ali";\nconst yosh = 25;\nlet talaba = true;\nconsole.log(\`Имя: \${ism}, Возраст: \${yosh}, Студент: \${talaba}\`);\n`,
        },
        testCode: 'let ism = "Ali";\nconst yosh = 25;\nlet talaba = true;\nconsole.log(`Ism: ${ism}, Yosh: ${yosh}, Talaba: ${talaba}`);',
        expectedOutput: { uz: 'Ism: Ali, Yosh: 25, Talaba: true', ru: 'Имя: Ali, Возраст: 25, Студент: true' },
        funFact: { uz: 'JavaScript 1995 yilning may oyida Brendan Eich tomonidan atigi 10 kun ichida yaratilgan!', ru: 'JavaScript был создан Бренданом Эйхом в мае 1995 года всего за 10 дней!' },
      },
      {
        id: 2,
        title: { uz: 'Funksiyalar va shartlar', ru: 'Функции и условия' },
        date: '19 aprel 2025',
        content: {
          uz: `JavaScript-da funksiyalar qayta ishlatiladigan kodni yaratish imkonini beradi. Shartlar (if) mantiqni boshqaradi. "Raqamni taxmin qilish" o'yini misoli:\n
javascript\nfunction taxminQil(raqam) {\n  const sirliRaqam = 42;\n  if (raqam === sirliRaqam) return "Topdingiz!";\n  return raqam > sirliRaqam ? "Juda ko'p" : "Juda kam";\n}\nconsole.log(taxminQil(42));\n`,
          ru: `В JavaScript функции позволяют создавать повторно используемый код. Условия (if) управляют логикой. Пример игры "Угадай число":\n
javascript\nfunction taxminQil(raqam) {\n  const sirliRaqam = 42;\n  if (raqam === sirliRaqam) return "Угадали!";\n  return raqam > sirliRaqam ? "Слишком много" : "Слишком мало";\n}\nconsole.log(taxminQil(42));\n`,
        },
        testCode: 'function taxminQil(raqam) {\n  const sirliRaqam = 42;\n  if (raqam === sirliRaqam) return "Topdingiz!";\n  return raqam > sirliRaqam ? "Juda ko\'p" : "Juda kam";\n}\nconsole.log(taxminQil(42));',
        expectedOutput: { uz: 'Topdingiz!', ru: 'Угадали!' },
        funFact: { uz: 'Misolda ishlatilgan 42 raqami "Galaktika bo\'ylab sayohat" kitobiga ishora bo\'lib, u yerda bu "hayot, koinot va hamma narsaning asosiy savoliga javob" deb ataladi.', ru: 'Число 42 в примере — отсылка к книге "Автостопом по галактике", где это "ответ на главный вопрос жизни, вселенной и всего остального".' },
      },
      {
        id: 3,
        title: { uz: 'Massivlar va sikllar', ru: 'Массивы и циклы' },
        date: '26 aprel 2025',
        content: {
          uz: `Massivlar ma'lumotlar ro'yxatini saqlaydi, sikllar (for) esa ularni qayta ishlash imkonini beradi. Ballarni hisoblash misoli:\n
javascript\nconst ballar = [85, 92, 78, 95];\nlet jami = 0;\nfor (let i = 0; i < ballar.length; i++) {\n  jami += ballar[i];\n}\nconsole.log(\`O'rtacha ball: \${jami / ballar.length}\`);\n`,
          ru: `Массивы хранят списки данных, а циклы (for) позволяют их обрабатывать. Пример расчета баллов:\n
javascript\nconst ballar = [85, 92, 78, 95];\nlet jami = 0;\nfor (let i = 0; i < ballar.length; i++) {\n  jami += ballar[i];\n}\nconsole.log(\`Средний балл: \${jami / ballar.length}\`);\n`,
        },
        testCode: 'const ballar = [85, 92, 78, 95];\nlet jami = 0;\nfor (let i = 0; i < ballar.length; i++) {\n  jami += ballar[i];\n}\nconsole.log(`O\'rtacha ball: ${jami / ballar.length}`);',
        expectedOutput: { uz: 'O\'rtacha ball: 87.5', ru: 'Средний балл: 87.5' },
        funFact: { uz: 'Zamonaviy brauzerlar sekundiga millionlab JavaScript operatsiyalarini bajaradi!', ru: 'Современные браузеры выполняют миллионы операций JavaScript в секунду!' },
      },
      {
        id: 4,
        title: { uz: 'Obyektlar va metodlar', ru: 'Объекты и методы' },
        date: '3 may 2025',
        content: {
          uz: `JavaScript-da obyektlar ma'lumotlar to'plamidir. Misol:\n
javascript\nconst foydalanuvchi = { ism: "Aziza", yosh: 30, salomlash() { return \`Salom, men \${this.ism}!\`; } };\nconsole.log(foydalanuvchi.salomlash());\n`,
          ru: `В JavaScript объекты представляют собой наборы данных. Пример:\n
javascript\nconst foydalanuvchi = { ism: "Aziza", yosh: 30, salomlash() { return \`Привет, я \${this.ism}!\`; } };\nconsole.log(foydalanuvchi.salomlash());\n`,
        },
        testCode: 'const foydalanuvchi = { ism: "Aziza", yosh: 30, salomlash() { return `Salom, men ${this.ism}!`; } };\nconsole.log(foydalanuvchi.salomlash());',
        expectedOutput: { uz: 'Salom, men Aziza!', ru: 'Привет, я Aziza!' },
        funFact: { uz: 'JavaScript-da obyektlar murakkab ilovalarni yaratishning asosidir!', ru: 'Объекты в JavaScript — основа для создания сложных приложений!' },
      },
    ],
  },
  python: {
    title: { uz: 'Boshlang\'ichlar uchun Python', ru: 'Python для начинающих' },
    icon: python,
    description: { uz: 'Kuchli va oson dasturlash tilini o\'rganing!', ru: 'Изучите мощный и простой язык программирования!' },
    lastUpdated: '28 fevral 2025',
    difficulty: { uz: 'Boshlang\'ich', ru: 'Начальный' },
    duration: { uz: '8 hafta', ru: '8 недель' },
    lessons: [
      {
        id: 1,
        title: { uz: 'O\'zgaruvchilar va ma\'lumot kiritish', ru: 'Переменные и ввод данных' },
        date: '10 aprel 2025',
        content: {
          uz: `Python-da o'zgaruvchilar turlarni talab qilmaydi, input() esa foydalanuvchi bilan muloqot qilish imkonini beradi. Misol:\n
python\nism = input("Ismingizni kiriting: ")\nyosh = int(input("Yoshingizni kiriting: "))\nprint(f"Salom, {ism}! 5 yildan keyin senga {yosh + 5} yosh bo'ladi.")\n`,
          ru: `В Python переменные не требуют указания типов, а input() позволяет взаимодействовать с пользователем. Пример:\n
python\nism = input("Введите ваше имя: ")\nyosh = int(input("Введите ваш возраст: "))\nprint(f"Привет, {ism}! Через 5 лет тебе будет {yosh + 5} лет.")\n`,
        },
        testCode: 'ism = "Sardor"\nyosh = 22\nprint(f"Salom, {ism}! 5 yildan keyin senga {yosh + 5} yosh bo\'ladi.")',
        expectedOutput: { uz: 'Salom, Sardor! 5 yildan keyin senga 27 yosh bo\'ladi.', ru: 'Привет, Sardor! Через 5 лет тебе будет 27 лет.' },
        funFact: { uz: 'Python nomi ilondan emas, balki "Monti Payton" komediya shousidan olingan!', ru: 'Название Python происходит не от змеи, а от комедийного шоу "Монти Пайтон"!' },
      },
      {
        id: 2,
        title: { uz: 'Ro\'yxatlar va sikllar', ru: 'Списки и циклы' },
        date: '17 aprel 2025',
        content: {
          uz: `Ro'yxatlar va for sikli ma'lumotlarni qayta ishlash uchun juda mos. Xaridlar ro'yxati misoli:\n
python\nnarsalar = ["non", "sut", "tuxum"]\nfor narsa in narsalar:\n  print(f"Sotib olish: {narsa}")\n`,
          ru: `Списки и цикл for идеально подходят для обработки данных. Пример списка покупок:\n
python\nnarsalar = ["хлеб", "молоко", "яйца"]\nfor narsa in narsalar:\n  print(f"Купить: {narsa}")\n`,
        },
        testCode: 'narsalar = ["non", "sut", "tuxum"]\nfor narsa in narsalar:\n  print(f"Sotib olish: {narsa}")',
        expectedOutput: { uz: 'Sotib olish: non\nSotib olish: sut\nSotib olish: tuxum', ru: 'Купить: хлеб\nКупить: молоко\nКупить: яйца' },
        funFact: { uz: 'Python NASA tomonidan kosmik teleskoplardan olingan tasvirlarni qayta ishlash uchun ishlatiladi!', ru: 'Python используется NASA для обработки изображений с космических телескопов!' },
      },
      {
        id: 3,
        title: { uz: 'Lug\'atlar va ma\'lumotlar bilan ishlash', ru: 'Словари и работа с данными' },
        date: '24 aprel 2025',
        content: {
          uz: `Lug'atlar kalit-qiymat formatida ma'lumot saqlaydi. Xarajatlarni hisoblash misoli:\n
python\nxarajatlar = {"ovqat": 500, "-transport": 200, "ko'ngilochar": 300}\njami = sum(xarajatlar.values())\nprint(f"Umumiy xarajatlar: {jami} so'm")\n`,
          ru: `Словари хранят данные в формате ключ-значение. Пример расчета расходов:\n
python\nxarajatlar = {"еда": 500, "транспорт": 200, "развлечения": 300}\njami = sum(xarajatlar.values())\nprint(f"Общие расходы: {jami} сум")\n`,
        },
        testCode: 'xarajatlar = {"ovqat": 500, "transport": 200, "ko\'ngilochar": 300}\njami = sum(xarajatlar.values())\nprint(f"Umumiy xarajatlar: {jami} so\'m")',
        expectedOutput: { uz: 'Umumiy xarajatlar: 1000 so\'m', ru: 'Общие расходы: 1000 сум' },
        funFact: { uz: 'Python dunyodagi eng mashhur dasturlash tillarining uchtaligiga kiradi!', ru: 'Python входит в тройку самых популярных языков программирования в мире!' },
      },
      {
        id: 4,
        title: { uz: 'Funksiyalar va modullar', ru: 'Функции и модули' },
        date: '1 may 2025',
        content: {
          uz: `Funksiyalar kodni tartibga solish imkonini beradi. Misol:\n
python\ndef maydonniHisobla(uzunlik, kenglik):\n  return uzunlik * kenglik\nmaydon = maydonniHisobla(5, 3)\nprint(f"Maydon: {maydon} kv.m")\n`,
          ru: `Функции позволяют организовать код. Пример:\n
python\ndef maydonniHisobla(uzunlik, kenglik):\n  return uzunlik * kenglik\nmaydon = maydonniHisobla(5, 3)\nprint(f"Площадь: {maydon} кв.м")\n`,
        },
        testCode: 'def maydonniHisobla(uzunlik, kenglik):\n  return uzunlik * kenglik\nmaydon = maydonniHisobla(5, 3)\nprint(f"Maydon: {maydon} kv.m")',
        expectedOutput: { uz: 'Maydon: 15 kv.m', ru: 'Площадь: 15 кв.м' },
        funFact: { uz: 'Python ko\'pincha mashinaviy o\'qitish va ma\'lumotlar tahlili uchun ishlatiladi!', ru: 'Python часто используется для машинного обучения и анализа данных!' },
      },
    ],
  },
  robotics: {
    title: { uz: 'Robototexnikaga kirish', ru: 'Введение в робототехнику' },
    icon: roboto,
    description: { uz: 'Kod yordamida robotlarni boshqarishni o\'rganing!', ru: 'Научитесь управлять роботами с помощью кода!' },
    lastUpdated: '5 aprel 2025',
    difficulty: { uz: 'O\'rta', ru: 'Средний' },
    duration: { uz: '10 hafta', ru: '10 недель' },
    lessons: [
      {
        id: 1,
        title: { uz: 'Robot harakatini dasturlash', ru: 'Программирование движения робота' },
        date: '15 aprel 2025',
        content: {
          uz: `Robototexnika robot xatti-harakatlarini modellashtirish uchun sinflardan foydalanadi. Misol:\n
python\nclass Robot:\n  def oldingaYur(self):\n    return "Robot oldinga yurmoqda"\n  def chapgaBuril(self):\n    return "Robot chapga burilmoqda"\nrobot = Robot()\nprint(robot.oldingaYur())\n`,
          ru: `Робототехника использует классы для моделирования поведения робота. Пример:\n
python\nclass Robot:\n  def oldingaYur(self):\n    return "Робот движется вперед"\n  def chapgaBuril(self):\n    return "Робот поворачивает налево"\nrobot = Robot()\nprint(robot.oldingaYur())\n`,
        },
        testCode: 'class Robot:\n  def oldingaYur(self):\n    return "Robot oldinga yurmoqda"\nrobot = Robot()\nprint(robot.oldingaYur())',
        expectedOutput: { uz: 'Robot oldinga yurmoqda', ru: 'Робот движется вперед' },
        funFact: { uz: '"Robot" so\'zi birinchi marta 1920 yilda chex yozuvchisi Karel Čapekning pyesasida ishlatilgan!', ru: 'Слово "робот" впервые было использовано в 1920 году в пьесе чешского писателя Карела Чапека!' },
      },
      {
        id: 2,
        title: { uz: 'Sensorlar va mantiq', ru: 'Сенсоры и логика' },
        date: '22 aprel 2025',
        content: {
          uz: `Robotlar qaror qabul qilish uchun sensorlardan foydalanadi. Misol:\n
python\nclass Robot:\n  def to'siqniAniqla(self, masofa):\n    if masofa < 10:\n      return "To'xtash: to'siq"\n    return "Oldinga yurish"\nrobot = Robot()\nprint(robot.to'siqniAniqla(5))\n`,
          ru: `Роботы используют сенсоры для принятия решений. Пример:\n
python\nclass Robot:\n  def to'siqniAniqla(self, masofa):\n    if masofa < 10:\n      return "Остановка: препятствие"\n    return "Движение вперед"\nrobot = Robot()\nprint(robot.to'siqniAniqla(5))\n`,
        },
        testCode: 'class Robot:\n  def to\'siqniAniqla(self, masofa):\n    if masofa < 10:\n      return "To\'xtash: to\'siq"\n    return "Oldinga yurish"\nrobot = Robot()\nprint(robot.to\'siqniAniqla(5))',
        expectedOutput: { uz: 'To\'xtash: to\'siq', ru: 'Остановка: препятствие' },
        funFact: { uz: 'Zamonaviy robotlarda 100 dan ortiq turli sensorlar bo\'lishi mumkin!', ru: 'Современные роботы могут иметь более 100 различных сенсоров!' },
      },
      {
        id: 3,
        title: { uz: 'Motorlarni boshqarish', ru: 'Управление моторами' },
        date: '29 aprel 2025',
        content: {
          uz: `Motorlar buyruqlar orqali boshqariladi. Misol:\n
python\nclass Robot:\n  def tezlikniBelgila(self, tezlik):\n    return f"Tezlik {tezlik}% ga o'rnatildi"\nrobot = Robot()\nprint(robot.tezlikniBelgila(75))\n`,
          ru: `Моторы управляются командами. Пример:\n
python\nclass Robot:\n  def tezlikniBelgila(self, tezlik):\n    return f"Скорость установлена на {tezlik}%"\nrobot = Robot()\nprint(robot.tezlikniBelgila(75))\n`,
        },
        testCode: 'class Robot:\n  def tezlikniBelgila(self, tezlik):\n    return f"Tezlik {tezlik}% ga o\'rnatildi"\nrobot = Robot()\nprint(robot.tezlikniBelgila(75))',
        expectedOutput: { uz: 'Tezlik 75% ga o\'rnatildi', ru: 'Скорость установлена на 75%' },
        funFact: { uz: 'Zavodlardagi robotlar sekundiga 10 metrgacha harakat qilishi mumkin!', ru: 'Роботы на заводах могут двигаться со скоростью до 10 метров в секунду!' },
      },
    ],
  },
  react: {
    title: { uz: 'Boshlang\'ichlar uchun React', ru: 'React для начинающих' },
    icon: react,
    description: { uz: 'React bilan zamonaviy veb-ilovalarni yarating!', ru: 'Создавайте современные веб-приложения с React!' },
    lastUpdated: '10 aprel 2025',
    difficulty: { uz: 'O\'rta', ru: 'Средний' },
    duration: { uz: '8 hafta', ru: '8 недель' },
    lessons: [
      {
        id: 1,
        title: { uz: 'Komponentlar va JSX', ru: 'Компоненты и JSX' },
        date: '13 aprel 2025',
        content: {
          uz: `React interfeyslar yaratish uchun komponentlardan foydalanadi. Misol:\n
jsx\nfunction Salomlash() {\n  return <h1>Salom, dunyo!</h1>;\n}\n`,
          ru: `React использует компоненты для создания интерфейсов. Пример:\n
jsx\nfunction Salomlash() {\n  return <h1>Привет, мир!</h1>;\n}\n`,
        },
        testCode: 'function Salomlash() {\n  return <h1>Salom, dunyo!</h1>;\n}',
        expectedOutput: { uz: 'Salom, dunyo!', ru: 'Привет, мир!' },
        funFact: { uz: 'React Facebook tomonidan yaratilgan va birinchi marta 2013 yilda ishlatilgan!', ru: 'React был создан Facebook и впервые использован в 2013 году!' },
      },
      {
        id: 2,
        title: { uz: 'Holat va huklar', ru: 'Состояние и хуки' },
        date: '20 aprel 2025',
        content: {
          uz: `useState huki holatni boshqaradi. Hisoblagich misoli:\n
jsx\nimport React, { useState } from "react";\nfunction Hisoblagich() {\n  const [son, setSon] = useState(0);\n  return (\n    <div>\n      <p>Hisoblagich: {son}</p>\n      <button onClick={() => setSon(son + 1)}>Oshirish</button>\n    </div>\n  );\n}\n`,
          ru: `Хук useState управляет состоянием. Пример счетчика:\n
jsx\nimport React, { useState } from "react";\nfunction Hisoblagich() {\n  const [son, setSon] = useState(0);\n  return (\n    <div>\n      <p>Счетчик: {son}</p>\n      <button onClick={() => setSon(son + 1)}>Увеличить</button>\n    </div>\n  );\n}\n`,
        },
        testCode: 'import React, { useState } from "react";\nfunction Hisoblagich() {\n  const [son, setSon] = useState(0);\n  return (\n    <div>\n      <p>Hisoblagich: {son}</p>\n      <button onClick={() => setSon(son + 1)}>Oshirish</button>\n    </div>\n  );\n}',
        expectedOutput: { uz: 'Hisoblagich: 0', ru: 'Счетчик: 0' },
        funFact: { uz: 'Huklar React 16.8 versiyasida 2019 yilda joriy etilgan!', ru: 'Хуки были введены в React 16.8 в 2019 году!' },
      },
      {
        id: 3,
        title: { uz: 'Hodisalar va ishlovchilar', ru: 'События и обработчики' },
        date: '27 aprel 2025',
        content: {
          uz: `React-da hodisa ishlovchilari onClick kabi atributlar orqali ishlatiladi. Misol:\n
jsx\nfunction Tugma() {\n  const bosishniBoshqarish = () => alert("Tugma bosildi!");\n  return <button onClick={bosishniBoshqarish}>Meni bos</button>;\n}\n`,
          ru: `В React обработчики событий используются через атрибуты, такие как onClick. Пример:\n
jsx\nfunction Tugma() {\n  const bosishniBoshqarish = () => alert("Кнопка нажата!");\n  return <button onClick={bosishniBoshqarish}>Нажми меня</button>;\n}\n`,
        },
        testCode: 'function Tugma() {\n  const bosishniBoshqarish = () => alert("Tugma bosildi!");\n  return <button onClick={bosishniBoshqarish}>Meni bos</button>;\n}',
        expectedOutput: { uz: 'Tugma bosildi!', ru: 'Кнопка нажата!' },
        funFact: { uz: 'React DOM ga bevosita kirishsiz hodisalarni oson boshqarish imkonini beradi!', ru: 'React позволяет легко управлять событиями без прямого доступа к DOM!' },
      },
    ],
  },
};

// Услублар (Стили)
const ScrollContainer = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #000000 10%, rgb(18, 18, 18) 90%)',
  maxHeight: 'calc(100vh - 145px)',
  overflowY: 'auto',
  padding: theme.breakpoints.down('sm') ? '8px' : '15px',
  margin: theme.breakpoints.down('sm') ? '0' : '10px',
  marginTop: theme.breakpoints.down('sm') ? '0' : '10px',
  borderRadius: '25px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  scrollbarWidth: 'thin',
  scrollbarColor: 'rgba(255, 255, 255, 0.3) rgba(255, 255, 255, 0.1)',
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '10px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'rgba(255, 255, 255, 0.3)',
    borderRadius: '10px',
  },
  animation: 'fadeIn 1s ease-in-out',
  '@keyframes fadeIn': {
    '0%': { opacity: 0, transform: 'translateY(20px)' },
    '100%': { opacity: 1, transform: 'translateY(0)' },
  },
  [theme.breakpoints.down('sm')]: {
    maxHeight: '100vh',
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
  '&:focus-within': {
    outline: '2px solid #FF007A',
    outlineOffset: '2px',
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
  '&:focus-within': {
    outline: '2px solid #FF007A',
    outlineOffset: '2px',
  },
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
  '&:focus-within': {
    outline: '2px solid #FF007A',
    outlineOffset: '2px',
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
  '&:focus-within': {
    outline: '2px solid #FF007A',
    outlineOffset: '2px',
  },
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
  '&:focus-within': {
    outline: '2px solid #FF007A',
    outlineOffset: '2px',
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
  '&:focus-within': {
    outline: '2px solid #FF007A',
    outlineOffset: '2px',
  },
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
  '&:focus-within': {
    outline: '2px solid #FF007A',
    outlineOffset: '2px',
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
  '&:focus-within': {
    outline: '2px solid #FF007A',
    outlineOffset: '2px',
  },
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
  '&:focus-within': {
    outline: '2px solid #FF007A',
    outlineOffset: '2px',
  },
}));

const ContentArea = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.breakpoints.down('sm') ? '10px' : '20px',
  width: '100%',
  flexDirection: { xs: 'column', md: 'row' },
  '&:focus-within': {
    outline: '2px solid #FF007A',
    outlineOffset: '2px',
  },
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
  '&:focus-within': {
    outline: '2px solid #FF007A',
    outlineOffset: '2px',
  },
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
  '&:focus-within': {
    outline: '2px solid #FF007A',
    outlineOffset: '2px',
  },
}));

const FunFactText = styled(Typography)(({ theme }) => ({
  fontSize: theme.breakpoints.down('sm') ? '12px' : '14px',
  color: '#FFFFFF',
  paddingLeft: '10px',
  lineHeight: '1.5',
  fontStyle: 'italic',
  opacity: 0.8,
  '&:focus-within': {
    outline: '2px solid #FF007A',
    outlineOffset: '2px',
  },
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
  '&:focus-within': {
    outline: '2px solid #FF007A',
    outlineOffset: '2px',
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
      content: '""',
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
    '&:focus-within': {
      outline: '2px solid #FF007A',
      outlineOffset: '2px',
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
  '&:focus-within': {
    outline: '2px solid #FF007A',
    outlineOffset: '2px',
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
  '&:focus-within': {
    outline: '2px solid #FF007A',
    outlineOffset: '2px',
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
  '&:focus-within': {
    outline: '2px solid #FF007A',
    outlineOffset: '2px',
  },
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
  '&:focus-within': {
    outline: '2px solid #FF007A',
    outlineOffset: '2px',
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
  '&:focus-within': {
    outline: '2px solid #FF007A',
    outlineOffset: '2px',
  },
}));

// Asosiy komponent
const Main = () => {
  const [expandedCourses, setExpandedCourses] = useState({});
  const [codeInputs, setCodeInputs] = useState({});
  const [outputs, setOutputs] = useState({});
  const { speakText, stopSpeech } = useContext(AccessibilityContext);
  const { t, language } = useLanguage();

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
      const expectedOutput = lesson.expectedOutput[language];
      const simulatedOutput = userCode.trim() === lesson.testCode.trim() ? expectedOutput : t('codeError');

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
          result: `${t('executionError')}: ${error.message}`,
          success: false,
        },
      }));
    }
  };

  const currentDate = new Date().toLocaleDateString(language === 'uz' ? 'uz-UZ' : 'ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <ScrollContainer>
      <HeaderContainer>
        <CourseHeaderTitle
          onMouseEnter={() => speakText(t('programmingCourses'))}
          onMouseLeave={stopSpeech}
          onTouchStart={() => speakText(t('programmingCourses'))}
          onTouchEnd={stopSpeech}
          onFocus={() => speakText(t('programmingCourses'))}
          onBlur={stopSpeech}
          tabIndex={0}
          role="heading"
          aria-level="1"
        >
          {t('programmingCourses')}
        </CourseHeaderTitle>
        <CurrentDate
          onMouseEnter={() => speakText(`${t('today')}: ${currentDate}`)}
          onMouseLeave={stopSpeech}
          onTouchStart={() => speakText(`${t('today')}: ${currentDate}`)}
          onTouchEnd={stopSpeech}
          onFocus={() => speakText(`${t('today')}: ${currentDate}`)}
          onBlur={stopSpeech}
          tabIndex={0}
        >
          {t('today')}: {currentDate}
        </CurrentDate>
      </HeaderContainer>

      {Object.keys(coursesData).map((courseKey) => {
        const course = coursesData[courseKey];
        const isExpanded = expandedCourses[courseKey] || false;

        return (
          <CourseSection key={courseKey}>
            <CourseCard onClick={() => handleToggleCourse(courseKey)} tabIndex={0}>
              <CourseHeader>
                <IconWrapper tabIndex={0}>
                  <img src={course.icon} alt={t('courseIcon', course.title[language])} style={{ width: '40px', height: '40px' }} />
                </IconWrapper>
                <Box>
                  <CourseTitle
                    onMouseEnter={() => speakText(course.title[language])}
                    onMouseLeave={stopSpeech}
                    onTouchStart={() => speakText(course.title[language])}
                    onTouchEnd={stopSpeech}
                    onFocus={() => speakText(course.title[language])}
                    onBlur={stopSpeech}
                    tabIndex={0}
                  >
                    {course.title[language]}
                  </CourseTitle>
                  <CourseDescription
                    onMouseEnter={() => speakText(course.description[language])}
                    onMouseLeave={stopSpeech}
                    onTouchStart={() => speakText(course.description[language])}
                    onTouchEnd={stopSpeech}
                    onFocus={() => speakText(course.description[language])}
                    onBlur={stopSpeech}
                    tabIndex={0}
                  >
                    {course.description[language]}
                  </CourseDescription>
                </Box>
              </CourseHeader>
              <CourseInfo>
                <ChipStyled
                  label={`${t('lastUpdated')}: ${course.lastUpdated}`}
                  onMouseEnter={() => speakText(`${t('lastUpdated')}: ${course.lastUpdated}`)}
                  onMouseLeave={stopSpeech}
                  onTouchStart={() => speakText(`${t('lastUpdated')}: ${course.lastUpdated}`)}
                  onTouchEnd={stopSpeech}
                  onFocus={() => speakText(`${t('lastUpdated')}: ${course.lastUpdated}`)}
                  onBlur={stopSpeech}
                  tabIndex={0}
                  aria-label={`${t('lastUpdated')}: ${course.lastUpdated}`}
                />
                <ChipStyled
                  label={`${t('difficulty')}: ${course.difficulty[language]}`}
                  onMouseEnter={() => speakText(`${t('difficulty')}: ${course.difficulty[language]}`)}
                  onMouseLeave={stopSpeech}
                  onTouchStart={() => speakText(`${t('difficulty')}: ${course.difficulty[language]}`)}
                  onTouchEnd={stopSpeech}
                  onFocus={() => speakText(`${t('difficulty')}: ${course.difficulty[language]}`)}
                  onBlur={stopSpeech}
                  tabIndex={0}
                  aria-label={`${t('difficulty')}: ${course.difficulty[language]}`}
                />
                <ChipStyled
                  label={`${t('duration')}: ${course.duration[language]}`}
                  onMouseEnter={() => speakText(`${t('duration')}: ${course.duration[language]}`)}
                  onMouseLeave={stopSpeech}
                  onTouchStart={() => speakText(`${t('duration')}: ${course.duration[language]}`)}
                  onTouchEnd={stopSpeech}
                  onFocus={() => speakText(`${t('duration')}: ${course.duration[language]}`)}
                  onBlur={stopSpeech}
                  tabIndex={0}
                  aria-label={`${t('duration')}: ${course.duration[language]}`}
                />
              </CourseInfo>
            </CourseCard>

            {isExpanded && (
              <Box>
                {course.lessons.map((lesson) => (
                  <LessonCard key={lesson.id} tabIndex={0}>
                    <LessonTitle
                      onMouseEnter={() => speakText(lesson.title[language])}
                      onMouseLeave={stopSpeech}
                      onTouchStart={() => speakText(lesson.title[language])}
                      onTouchEnd={stopSpeech}
                      onFocus={() => speakText(lesson.title[language])}
                      onBlur={stopSpeech}
                      tabIndex={0}
                    >
                      {lesson.title[language]}
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
                        onMouseEnter={() => speakText(lesson.content[language])}
                        onMouseLeave={stopSpeech}
                        onTouchStart={() => speakText(lesson.content[language])}
                        onTouchEnd={stopSpeech}
                        onFocus={() => speakText(lesson.content[language])}
                        onBlur={stopSpeech}
                        tabIndex={0}
                      >
                        {lesson.content[language]}
                      </LessonContent>
                      <Box sx={{ flex: 1 }}>
                        <CodeEditor
                          label={t('tryCode')}
                          multiline
                          rows={6}
                          value={codeInputs[`${courseKey}-${lesson.id}`] || lesson.testCode}
                          onChange={(e) => handleCodeChange(courseKey, lesson.id, e.target.value)}
                          variant="outlined"
                          inputProps={{
                            'aria-label': t('codeInputArea'),
                          }}
                          onFocus={() => speakText(t('tryCode'))}
                          onBlur={stopSpeech}
                        />
                        <TryButton
                          onClick={() => executeCode(courseKey, lesson.id)}
                          sx={{ mt: 1.5, width: '100%' }}
                          onMouseEnter={() => speakText(t('execute'))}
                          onMouseLeave={stopSpeech}
                          onTouchStart={() => speakText(t('execute'))}
                          onTouchEnd={stopSpeech}
                          onFocus={() => speakText(t('execute'))}
                          onBlur={stopSpeech}
                          tabIndex={0}
                          aria-label={t('execute')}
                        >
                          {t('execute')}
                        </TryButton>
                        {outputs[`${courseKey}-${lesson.id}`] && (
                          <Output
                            success={outputs[`${courseKey}-${lesson.id}`].success}
                            onMouseEnter={() =>
                              speakText(`${t('result')}: ${outputs[`${courseKey}-${lesson.id}`].result}`)
                            }
                            onMouseLeave={stopSpeech}
                            onTouchStart={() =>
                              speakText(`${t('result')}: ${outputs[`${courseKey}-${lesson.id}`].result}`)
                            }
                            onTouchEnd={stopSpeech}
                            onFocus={() =>
                              speakText(`${t('result')}: ${outputs[`${courseKey}-${lesson.id}`].result}`)
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
                        onMouseEnter={() => speakText(`${t('funFact')}: ${lesson.funFact[language]}`)}
                        onMouseLeave={stopSpeech}
                        onTouchStart={() => speakText(`${t('funFact')}: ${lesson.funFact[language]}`)}
                        onTouchEnd={stopSpeech}
                        onFocus={() => speakText(`${t('funFact')}: ${lesson.funFact[language]}`)}
                        onBlur={stopSpeech}
                        tabIndex={0}
                      >
                        {t('funFact')}: {lesson.funFact[language]}
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