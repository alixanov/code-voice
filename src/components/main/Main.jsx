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

// Kurslar ma'lumotlari
const coursesData = {
  javascript: {
    title: 'JavaScript asoslari',
    icon: js,
    description: 'Veb-dasturlash olamiga JavaScript bilan sho\'ng\'ing!',
    lastUpdated: '15 mart 2025',
    difficulty: 'Boshlang\'ich',
    duration: '6 hafta',
    lessons: [
      {
        id: 1,
        title: 'O\'zgaruvchilar va ma\'lumot turlari',
        date: '12 aprel 2025',
        content: `JavaScript-da o\'zgaruvchilar let, const yoki var yordamida e\'lon qilinadi. Ular satrlar, raqamlar, mantiqiy qiymatlar va boshqa ma\'lumot turlarini saqlashi mumkin. Misol:\n
javascript\nlet ism = "Ali";\nconst yosh = 25;\nlet talaba = true;\nconsole.log(\`Ism: \${ism}, Yosh: \${yosh}, Talaba: \${talaba}\`);\n
`,
        testCode: 'let ism = "Ali";\nconst yosh = 25;\nlet talaba = true;\nconsole.log(`Ism: ${ism}, Yosh: ${yosh}, Talaba: ${talaba}`);',
        expectedOutput: 'Ism: Ali, Yosh: 25, Talaba: true',
        funFact: 'JavaScript 1995 yilning may oyida Brendan Eich tomonidan atigi 10 kun ichida yaratilgan!',
      },
      {
        id: 2,
        title: 'Funksiyalar va shartlar',
        date: '19 aprel 2025',
        content: `JavaScript-da funksiyalar qayta ishlatiladigan kodni yaratish imkonini beradi. Shartlar (if) mantiqni boshqaradi. "Raqamni taxmin qilish" o\'yini misoli:\n
javascript\nfunction taxminQil(raqam) {\n  const sirliRaqam = 42;\n  if (raqam === sirliRaqam) return "Topdingiz!";\n  return raqam > sirliRaqam ? "Juda ko\'p" : "Juda kam";\n}\nconsole.log(taxminQil(42));\n
`,
        testCode: 'function taxminQil(raqam) {\n  const sirliRaqam = 42;\n  if (raqam === sirliRaqam) return "Topdingiz!";\n  return raqam > sirliRaqam ? "Juda ko\'p" : "Juda kam";\n}\nconsole.log(taxminQil(42));',
        expectedOutput: 'Topdingiz!',
        funFact: 'Misolda ishlatilgan 42 raqami "Galaktika bo\'ylab sayohat" kitobiga ishora bo\'lib, u yerda bu "hayot, koinot va hamma narsaning asosiy savoliga javob" deb ataladi.',
      },
      {
        id: 3,
        title: 'Massivlar va sikllar',
        date: '26 aprel 2025',
        content: `Massivlar ma\'lumotlar ro\'yxatini saqlaydi, sikllar (for) esa ularni qayta ishlash imkonini beradi. Ballarni hisoblash misoli:\n
javascript\nconst ballar = [85, 92, 78, 95];\nlet jami = 0;\nfor (let i = 0; i < ballar.length; i++) {\n  jami += ballar[i];\n}\nconsole.log(\`O\'rtacha ball: \${jami / ballar.length}\`);\n
`,
        testCode: 'const ballar = [85, 92, 78, 95];\nlet jami = 0;\nfor (let i = 0; i < ballar.length; i++) {\n  jami += ballar[i];\n}\nconsole.log(`O\'rtacha ball: ${jami / ballar.length}`);',
        expectedOutput: 'O\'rtacha ball: 87.5',
        funFact: 'Zamonaviy brauzerlar sekundiga millionlab JavaScript operatsiyalarini bajaradi!',
      },
      {
        id: 4,
        title: 'Obyektlar va metodlar',
        date: '3 may 2025',
        content: `JavaScript-da obyektlar ma\'lumotlar to\'plamidir. Misol:\n
javascript\nconst foydalanuvchi = { ism: "Aziza", yosh: 30, salomlash() { return \`Salom, men \${this.ism}!\`; } };\nconsole.log(foydalanuvchi.salomlash());\n
`,
        testCode: 'const foydalanuvchi = { ism: "Aziza", yosh: 30, salomlash() { return `Salom, men ${this.ism}!`; } };\nconsole.log(foydalanuvchi.salomlash());',
        expectedOutput: 'Salom, men Aziza!',
        funFact: 'JavaScript-da obyektlar murakkab ilovalarni yaratishning asosidir!',
      },
    ],
  },
  python: {
    title: 'Boshlang\'ichlar uchun Python',
    icon: python,
    description: 'Kuchli va oson dasturlash tilini o\'rganing!',
    lastUpdated: '28 fevral 2025',
    difficulty: 'Boshlang\'ich',
    duration: '8 hafta',
    lessons: [
      {
        id: 1,
        title: 'O\'zgaruvchilar va ma\'lumot kiritish',
        date: '10 aprel 2025',
        content: `Python-da o\'zgaruvchilar turlarni talab qilmaydi, input() esa foydalanuvchi bilan muloqot qilish imkonini beradi. Misol:\n
python\nism = input("Ismingizni kiriting: ")\nyosh = int(input("Yoshingizni kiriting: "))\nprint(f"Salom, {ism}! 5 yildan keyin senga {yosh + 5} yosh bo\'ladi.")\n
`,
        testCode: 'ism = "Sardor"\nyosh = 22\nprint(f"Salom, {ism}! 5 yildan keyin senga {yosh + 5} yosh bo\'ladi.")',
        expectedOutput: 'Salom, Sardor! 5 yildan keyin senga 27 yosh bo\'ladi.',
        funFact: 'Python nomi ilondan emas, balki "Monti Payton" komediya shousidan olingan!',
      },
      {
        id: 2,
        title: 'Ro\'yxatlar va sikllar',
        date: '17 aprel 2025',
        content: `Ro\'yxatlar va for sikli ma\'lumotlarni qayta ishlash uchun juda mos. Xaridlar ro\'yxati misoli:\n
python\nnarsalar = ["non", "sut", "tuxum"]\nfor narsa in narsalar:\n  print(f"Sotib olish: {narsa}")\n
`,
        testCode: 'narsalar = ["non", "sut", "tuxum"]\nfor narsa in narsalar:\n  print(f"Sotib olish: {narsa}")',
        expectedOutput: 'Sotib olish: non\nSotib olish: sut\nSotib olish: tuxum',
        funFact: 'Python NASA tomonidan kosmik teleskoplardan olingan tasvirlarni qayta ishlash uchun ishlatiladi!',
      },
      {
        id: 3,
        title: 'Lug\'atlar va ma\'lumotlar bilan ishlash',
        date: '24 aprel 2025',
        content: `Lug\'atlar kalit-qiymat formatida ma\'lumot saqlaydi. Xarajatlarni hisoblash misoli:\n
python\nxarajatlar = {"ovqat": 500, "transport": 200, "ko\'ngilochar": 300}\njami = sum(xarajatlar.values())\nprint(f"Umumiy xarajatlar: {jami} so\'m")\n
`,
        testCode: 'xarajatlar = {"ovqat": 500, "transport": 200, "ko\'ngilochar": 300}\njami = sum(xarajatlar.values())\nprint(f"Umumiy xarajatlar: {jami} so\'m")',
        expectedOutput: 'Umumiy xarajatlar: 1000 so\'m',
        funFact: 'Python dunyodagi eng mashhur dasturlash tillarining uchtaligiga kiradi!',
      },
      {
        id: 4,
        title: 'Funksiyalar va modullar',
        date: '1 may 2025',
        content: `Funksiyalar kodni tartibga solish imkonini beradi. Misol:\n
python\ndef maydonniHisobla(uzunlik, kenglik):\n  return uzunlik * kenglik\nmaydon = maydonniHisobla(5, 3)\nprint(f"Maydon: {maydon} kv.m")\n
`,
        testCode: 'def maydonniHisobla(uzunlik, kenglik):\n  return uzunlik * kenglik\nmaydon = maydonniHisobla(5, 3)\nprint(f"Maydon: {maydon} kv.m")',
        expectedOutput: 'Maydon: 15 kv.m',
        funFact: 'Python ko\'pincha mashinaviy o\'qitish va ma\'lumotlar tahlili uchun ishlatiladi!',
      },
    ],
  },
  robotics: {
    title: 'Robototexnikaga kirish',
    icon: roboto,
    description: 'Kod yordamida robotlarni boshqarishni o\'rganing!',
    lastUpdated: '5 aprel 2025',
    difficulty: 'O\'rta',
    duration: '10 hafta',
    lessons: [
      {
        id: 1,
        title: 'Robot harakatini dasturlash',
        date: '15 aprel 2025',
        content: `Robototexnika robot xatti-harakatlarini modellashtirish uchun sinflardan foydalanadi. Misol:\n
python\nclass Robot:\n  def oldingaYur(self):\n    return "Robot oldinga yurmoqda"\n  def chapgaBuril(self):\n    return "Robot chapga burilmoqda"\nrobot = Robot()\nprint(robot.oldingaYur())\n
`,
        testCode: 'class Robot:\n  def oldingaYur(self):\n    return "Robot oldinga yurmoqda"\nrobot = Robot()\nprint(robot.oldingaYur())',
        expectedOutput: 'Robot oldinga yurmoqda',
        funFact: '"Robot" so\'zi birinchi marta 1920 yilda chex yozuvchisi Karel Čapekning pyesasida ishlatilgan!',
      },
      {
        id: 2,
        title: 'Sensorlar va mantiq',
        date: '22 aprel 2025',
        content: `Robotlar qaror qabul qilish uchun sensorlardan foydalanadi. Misol:\n
python\nclass Robot:\n  def to\'siqniAniqla(self, masofa):\n    if masofa < 10:\n      return "To\'xtash: to\'siq"\n    return "Oldinga yurish"\nrobot = Robot()\nprint(robot.to\'siqniAniqla(5))\n
`,
        testCode: 'class Robot:\n  def to\'siqniAniqla(self, masofa):\n    if masofa < 10:\n      return "To\'xtash: to\'siq"\n    return "Oldinga yurish"\nrobot = Robot()\nprint(robot.to\'siqniAniqla(5))',
        expectedOutput: 'To\'xtash: to\'siq',
        funFact: 'Zamonaviy robotlarda 100 dan ortiq turli sensorlar bo\'lishi mumkin!',
      },
      {
        id: 3,
        title: 'Motorlarni boshqarish',
        date: '29 aprel 2025',
        content: `Motorlar buyruqlar orqali boshqariladi. Misol:\n
python\nclass Robot:\n  def tezlikniBelgila(self, tezlik):\n    return f"Tezlik {tezlik}% ga o\'rnatildi"\nrobot = Robot()\nprint(robot.tezlikniBelgila(75))\n
`,
        testCode: 'class Robot:\n  def tezlikniBelgila(self, tezlik):\n    return f"Tezlik {tezlik}% ga o\'rnatildi"\nrobot = Robot()\nprint(robot.tezlikniBelgila(75))',
        expectedOutput: 'Tezlik 75% ga o\'rnatildi',
        funFact: 'Zavodlardagi robotlar sekundiga 10 metrgacha harakat qilishi mumkin!',
      },
    ],
  },
  react: {
    title: 'Boshlang\'ichlar uchun React',
    icon: react,
    description: 'React bilan zamonaviy veb-ilovalarni yarating!',
    lastUpdated: '10 aprel 2025',
    difficulty: 'O\'rta',
    duration: '8 hafta',
    lessons: [
      {
        id: 1,
        title: 'Komponentlar va JSX',
        date: '13 aprel 2025',
        content: `React interfeyslar yaratish uchun komponentlardan foydalanadi. Misol:\n
jsx\nfunction Salomlash() {\n  return <h1>Salom, dunyo!</h1>;\n}\n
`,
        testCode: 'function Salomlash() {\n  return <h1>Salom, dunyo!</h1>;\n}',
        expectedOutput: 'Salom, dunyo!',
        funFact: 'React Facebook tomonidan yaratilgan va birinchi marta 2013 yilda ishlatilgan!',
      },
      {
        id: 2,
        title: 'Holat va huklar',
        date: '20 aprel 2025',
        content: `useState huki holatni boshqaradi. Hisoblagich misoli:\n
jsx\nimport React, { useState } from "react";\nfunction Hisoblagich() {\n  const [son, setSon] = useState(0);\n  return (\n    <div>\n      <p>Hisoblagich: {son}</p>\n      <button onClick={() => setSon(son + 1)}>Oshirish</button>\n    </div>\n  );\n}\n
`,
        testCode: 'import React, { useState } from "react";\nfunction Hisoblagich() {\n  const [son, setSon] = useState(0);\n  return (\n    <div>\n      <p>Hisoblagich: {son}</p>\n      <button onClick={() => setSon(son + 1)}>Oshirish</button>\n    </div>\n  );\n}',
        expectedOutput: 'Hisoblagich: 0',
        funFact: 'Huklar React 16.8 versiyasida 2019 yilda joriy etilgan!',
      },
      {
        id: 3,
        title: 'Hodisalar va ishlovchilar',
        date: '27 aprel 2025',
        content: `React-da hodisa ishlovchilari onClick kabi atributlar orqali ishlatiladi. Misol:\n
jsx\nfunction Tugma() {\n  const bosishniBoshqarish = () => alert("Tugma bosildi!");\n  return <button onClick={bosishniBoshqarish}>Meni bos</button>;\n}\n
`,
        testCode: 'function Tugma() {\n  const bosishniBoshqarish = () => alert("Tugma bosildi!");\n  return <button onClick={bosishniBoshqarish}>Meni bos</button>;\n}',
        expectedOutput: 'Tugma bosildi!',
        funFact: 'React DOM ga bevosita kirishsiz hodisalarni oson boshqarish imkonini beradi!',
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
    outline: '2px solid  #FF007A',
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
    outline: '2px solid  #FF007A',
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
    outline: '2px solid  #FF007A',
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
    outline: '2px solid  #FF007A',
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
    outline: '2px solid  #FF007A',
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
    outline: '2px solid  #FF007A',
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
    outline: '2px solid  #FF007A',
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
    outline: '2px solid  #FF007A',
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
    outline: '2px solid  #FF007A',
    outlineOffset: '2px',
  },
}));

const ContentArea = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.breakpoints.down('sm') ? '10px' : '20px',
  width: '100%',
  flexDirection: { xs: 'column', md: 'row' },
  '&:focus-within': {
    outline: '2px solid  #FF007A',
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
    outline: '2px solid  #FF007A',
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
    outline: '2px solid  #FF007A',
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
    outline: '2px solid  #FF007A',
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
    outline: '2px solid  #FF007A',
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
      content: '"Natija"',
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
      outline: '2px solid  #FF007A',
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
    outline: '2px solid  #FF007A',
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
    outline: '2px solid  #FF007A',
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
    outline: '2px solid  #FF007A',
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
    outline: '2px solid  #FF007A',
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
    outline: '2px solid  #FF007A',
    outlineOffset: '2px',
  },
}));

// Asosiy komponent
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
      const simulatedOutput = userCode.trim() === lesson.testCode.trim() ? expectedOutput : "Xato: kod kutilgan natijaga mos kelmaydi";

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
          result: `Bajarishda xato: ${error.message}`,
          success: false,
        },
      }));
    }
  };

  const currentDate = new Date().toLocaleDateString('uz-UZ', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <ScrollContainer>
      <HeaderContainer>
        <CourseHeaderTitle
          onMouseEnter={() => speakText('Dasturlash kurslari')}
          onMouseLeave={stopSpeech}
          onTouchStart={() => speakText('Dasturlash kurslari')}
          onTouchEnd={stopSpeech}
          onFocus={() => speakText('Dasturlash kurslari')}
          onBlur={stopSpeech}
          tabIndex={0}
          role="heading"
          aria-level="1"
        >
          Dasturlash kurslari
        </CourseHeaderTitle>
        <CurrentDate
          onMouseEnter={() => speakText(`Bugun: ${currentDate}`)}
          onMouseLeave={stopSpeech}
          onTouchStart={() => speakText(`Bugun: ${currentDate}`)}
          onTouchEnd={stopSpeech}
          onFocus={() => speakText(`Bugun: ${currentDate}`)}
          onBlur={stopSpeech}
          tabIndex={0}
        >
          Bugun: {currentDate}
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
                  <img src={course.icon} alt={`${course.title} belgisi`} style={{ width: '40px', height: '40px' }} />
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
                  label={`Oxirgi yangilanish: ${course.lastUpdated}`}
                  onMouseEnter={() => speakText(`Oxirgi yangilanish: ${course.lastUpdated}`)}
                  onMouseLeave={stopSpeech}
                  onTouchStart={() => speakText(`Oxirgi yangilanish: ${course.lastUpdated}`)}
                  onTouchEnd={stopSpeech}
                  onFocus={() => speakText(`Oxirgi yangilanish: ${course.lastUpdated}`)}
                  onBlur={stopSpeech}
                  tabIndex={0}
                  aria-label={`Oxirgi yangilanish: ${course.lastUpdated}`}
                />
                <ChipStyled
                  label={`Qiyinlik: ${course.difficulty}`}
                  onMouseEnter={() => speakText(`Qiyinlik: ${course.difficulty}`)}
                  onMouseLeave={stopSpeech}
                  onTouchStart={() => speakText(`Qiyinlik: ${course.difficulty}`)}
                  onTouchEnd={stopSpeech}
                  onFocus={() => speakText(`Qiyinlik: ${course.difficulty}`)}
                  onBlur={stopSpeech}
                  tabIndex={0}
                  aria-label={`Qiyinlik: ${course.difficulty}`}
                />
                <ChipStyled
                  label={`Davomiylik: ${course.duration}`}
                  onMouseEnter={() => speakText(`Davomiylik: ${course.duration}`)}
                  onMouseLeave={stopSpeech}
                  onTouchStart={() => speakText(`Davomiylik: ${course.duration}`)}
                  onTouchEnd={stopSpeech}
                  onFocus={() => speakText(`Davomiylik: ${course.duration}`)}
                  onBlur={stopSpeech}
                  tabIndex={0}
                  aria-label={`Davomiylik: ${course.duration}`}
                />
              </CourseInfo>
            </CourseCard>

            {isExpanded && (
              <Box>
                {course.lessons.map((lesson) => (
                  <LessonCard key={lesson.id} tabIndex={0}>
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
                          label="Kodni sinab ko\'ring"
                          multiline
                          rows={6}
                          value={codeInputs[`${courseKey}-${lesson.id}`] || lesson.testCode}
                          onChange={(e) => handleCodeChange(courseKey, lesson.id, e.target.value)}
                          variant="outlined"
                          inputProps={{
                            'aria-label': 'Kod kiritish maydoni',
                          }}
                          onFocus={() => speakText('Kodni sinab ko\'ring')}
                          onBlur={stopSpeech}
                        />
                        <TryButton
                          onClick={() => executeCode(courseKey, lesson.id)}
                          sx={{ mt: 1.5, width: '100%' }}
                          onMouseEnter={() => speakText('Bajarish')}
                          onMouseLeave={stopSpeech}
                          onTouchStart={() => speakText('Bajarish')}
                          onTouchEnd={stopSpeech}
                          onFocus={() => speakText('Bajarish')}
                          onBlur={stopSpeech}
                          tabIndex={0}
                          aria-label="Bajarish"
                        >
                          Bajarish
                        </TryButton>
                        {outputs[`${courseKey}-${lesson.id}`] && (
                          <Output
                            success={outputs[`${courseKey}-${lesson.id}`].success}
                            onMouseEnter={() =>
                              speakText(`Natija: ${outputs[`${courseKey}-${lesson.id}`].result}`)
                            }
                            onMouseLeave={stopSpeech}
                            onTouchStart={() =>
                              speakText(`Natija: ${outputs[`${courseKey}-${lesson.id}`].result}`)
                            }
                            onTouchEnd={stopSpeech}
                            onFocus={() =>
                              speakText(`Natija: ${outputs[`${courseKey}-${lesson.id}`].result}`)
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
                        onMouseEnter={() => speakText(`Qiziqarli fakt: ${lesson.funFact}`)}
                        onMouseLeave={stopSpeech}
                        onTouchStart={() => speakText(`Qiziqarli fakt: ${lesson.funFact}`)}
                        onTouchEnd={stopSpeech}
                        onFocus={() => speakText(`Qiziqarli fakt: ${lesson.funFact}`)}
                        onBlur={stopSpeech}
                        tabIndex={0}
                      >
                        Qiziqarli fakt: {lesson.funFact}
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