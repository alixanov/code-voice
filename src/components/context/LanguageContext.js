import React, { createContext, useState, useEffect, useContext } from 'react';

// Create the Language Context
const LanguageContext = createContext();

// Language Provider Component
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'uz'); // Default language is Uzbek, persisted in localStorage

  useEffect(() => {
    localStorage.setItem('language', language); // Save language to localStorage on change
  }, [language]);

  const translations = {
    uz: {
      // Existing translations for Login
      loginTitle: 'Tizimga kirish',
      registerTitle: 'Ro‘yxatdan o‘tish',
      roleLabel: 'Rol',
      teacher: 'O‘qituvchi',
      student: 'O‘quvchi',
      firstNameLabel: 'Ism',
      firstNamePlaceholder: 'Ismingizni kiriting...',
      lastNameLabel: 'Familiya',
      lastNamePlaceholder: 'Familiyangizni kiriting...',
      loginLabel: 'Login',
      loginPlaceholder: 'Loginingizni kiriting...',
      passwordLabel: 'Parol',
      passwordPlaceholder: 'Parolingizni kiriting...',
      registerButton: 'Ro‘yxatdan o‘tish',
      loginButton: 'Kirish',
      toggleToLogin: 'Akkauntingiz bormi? Kirish',
      toggleToRegister: 'Akkauntingiz yo‘qmi? Ro‘yxatdan o‘ting',
      errorFillAllFields: 'Iltimos, barcha maydonlarni to‘ldiring',
      errorLoginFields: 'Iltimos, login, parol va rolni kiriting',
      successRegister: (role) => `${role === 'teacher' ? 'O‘qituvchi' : 'O‘quvchi'} muvaffaqiyatli ro‘yxatdan o‘tdi! Endi tizimga kiring.`,
      successLogin: 'Avtorizatsiya muvaffaqiyatli! Shaxsiy kabinetingizga xush kelibsiz.',
      errorRegister: 'Ro‘yxatdan o‘tishda xatolik',
      errorLogin: 'Avtorizatsiyada xatolik',
      errorGeneric: (message) => `Xatolik yuz berdi: ${message}`,
      accessibilityOn: 'Maxsus imkoniyatlar yoqildi',
      accessibilityOff: 'Maxsus imkoniyatlar o‘chirildi',
      accessibilityLabel: 'Maxsus imkoniyatlar',
      toggleLanguage: 'Сменить язык на русский',
      toggleAccessibility: 'Переключить режим доступности',

      // New translations for Test component
      selectTest: 'Testni tanlang',
      testProgress: (correct, total) => `Jarayon: ${correct} / ${total}`,
      correctAnswerFeedback: 'To\'g\'ri! Keyingisiga tayyorlanamiz...',
      incorrectAnswerFeedback: 'Afsus, noto\'g\'ri. Yana urinib ko\'ring!',
      congratulations: 'Tabriklaymiz!',
      yourScore: (correct, total) => `Siz to\'plagan ball: ${correct} / ${total}`,
      backToTests: 'Testlarga qaytish',

      // Subjects and Questions (Uzbek)
      subjects: {
        javascript: {
          title: 'JavaScript',
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
      },
    },
    ru: {
      // Existing translations for Login
      loginTitle: 'Вход в систему',
      registerTitle: 'Регистрация',
      roleLabel: 'Роль',
      teacher: 'Учитель',
      student: 'Ученик',
      firstNameLabel: 'Имя',
      firstNamePlaceholder: 'Введите ваше имя...',
      lastNameLabel: 'Фамилия',
      lastNamePlaceholder: 'Введите вашу фамилию...',
      loginLabel: 'Логин',
      loginPlaceholder: 'Введите ваш логин...',
      passwordLabel: 'Пароль',
      passwordPlaceholder: 'Введите ваш пароль...',
      registerButton: 'Зарегистрироваться',
      loginButton: 'Войти',
      toggleToLogin: 'Уже есть аккаунт? Войти',
      toggleToRegister: 'Нет аккаунта? Зарегистрируйтесь',
      errorFillAllFields: 'Пожалуйста, заполните все поля',
      errorLoginFields: 'Пожалуйста, введите логин, пароль и роль',
      successRegister: (role) => `${role === 'teacher' ? 'Учитель' : 'Ученик'} успешно зарегистрирован! Теперь войдите в систему.`,
      successLogin: 'Авторизация успешна! Добро пожаловать в ваш личный кабинет.',
      errorRegister: 'Ошибка при регистрации',
      errorLogin: 'Ошибка при авторизации',
      errorGeneric: (message) => `Произошла ошибка: ${message}`,
      accessibilityOn: 'Специальные возможности включены',
      accessibilityOff: 'Специальные возможности отключены',
      accessibilityLabel: 'Специальные возможности',
      toggleLanguage: 'Сменить язык на узбекский',
      toggleAccessibility: 'Переключить режим специальных возможностей',

      // New translations for Test component
      selectTest: 'Выберите тест',
      testProgress: (correct, total) => `Прогресс: ${correct} / ${total}`,
      correctAnswerFeedback: 'Правильно! Готовимся к следующему...',
      incorrectAnswerFeedback: 'К сожалению, неправильно. Попробуйте снова!',
      congratulations: 'Поздравляем!',
      yourScore: (correct, total) => `Ваш результат: ${correct} / ${total}`,
      backToTests: 'Вернуться к тестам',

      // Subjects and Questions (Russian)
      subjects: {
        javascript: {
          title: 'JavaScript',
          tests: [
            { id: 1, question: 'Какой метод используется для добавления элемента в конец массива?', options: { a: 'pop', b: 'push', c: 'shift' }, correctAnswer: 'b' },
            { id: 2, question: 'Что возвращает typeof null?', options: { a: 'null', b: 'object', c: 'undefined' }, correctAnswer: 'b' },
            { id: 3, question: 'Как объявить функцию?', options: { a: 'function myFunc()', b: 'let myFunc = ()', c: 'def myFunc()' }, correctAnswer: 'a' },
            { id: 4, question: 'Что делает метод Array.prototype.map()?', options: { a: 'Удаляет элементы', b: 'Создает новый массив', c: 'Сортирует массив' }, correctAnswer: 'b' },
            { id: 5, question: 'Какой оператор используется для строгого равенства?', options: { a: '==', b: '===', c: '=' }, correctAnswer: 'b' },
            { id: 6, question: 'Что такое замыкание (closure)?', options: { a: 'Функция внутри другой функции', b: 'Метод массива', c: 'Тип данных' }, correctAnswer: 'a' },
            { id: 7, question: 'Какой метод используется для удаления последнего элемента массива?', options: { a: 'shift', b: 'pop', c: 'splice' }, correctAnswer: 'b' },
            { id: 8, question: 'Что выведет console.log(0 == "0")?', options: { a: 'true', b: 'false', c: 'undefined' }, correctAnswer: 'a' },
            { id: 9, question: 'Какой метод используется для асинхронного выполнения?', options: { a: 'setTimeout', b: 'forEach', c: 'filter' }, correctAnswer: 'a' },
            { id: 10, question: 'Что такое Promise?', options: { a: 'Тип данных', b: 'Объект для асинхронных операций', c: 'Метод массива' }, correctAnswer: 'b' },
          ],
        },
        python: {
          title: 'Python',
          tests: [
            { id: 1, question: 'Какой оператор используется для возведения в степень?', options: { a: '//', b: '**', c: '^' }, correctAnswer: 'b' },
            { id: 2, question: 'Какой метод используется для добавления элемента в список?', options: { a: 'append', b: 'push', c: 'add' }, correctAnswer: 'a' },
            { id: 3, question: 'Что выведет print(2 + "2")?', options: { a: '4', b: '22', c: 'Ошибка' }, correctAnswer: 'c' },
            { id: 4, question: 'Как объявить словарь?', options: { a: '[]', b: '{}', c: '()' }, correctAnswer: 'b' },
            { id: 5, question: 'Что делает функция len()?', options: { a: 'Возвращает длину объекта', b: 'Сортирует список', c: 'Удаляет элемент' }, correctAnswer: 'a' },
            { id: 6, question: 'Какой цикл используется для перебора элементов?', options: { a: 'while', b: 'for', c: 'do-while' }, correctAnswer: 'b' },
            { id: 7, question: 'Что делает метод list.pop()?', options: { a: 'Добавляет элемент', b: 'Удаляет последний элемент', c: 'Сортирует список' }, correctAnswer: 'b' },
            { id: 8, question: 'Какой модуль используется для работы с датами?', options: { a: 'math', b: 'datetime', c: 'random' }, correctAnswer: 'b' },
            { id: 9, question: 'Что такое генератор списка?', options: { a: 'Функция', b: 'Синтаксис для создания списка', c: 'Тип данных' }, correctAnswer: 'b' },
            { id: 10, question: 'Какой оператор используется для проверки принадлежности?', options: { a: 'is', b: 'in', c: '==' }, correctAnswer: 'b' },
          ],
        },
        robotics: {
          title: 'Робототехника',
          tests: [
            { id: 1, question: 'Какой датчик используется для измерения расстояния?', options: { a: 'Инфракрасный', b: 'Ультразвуковой', c: 'Температурный' }, correctAnswer: 'b' },
            { id: 2, question: 'Какой язык чаще всего используется в робототехнике?', options: { a: 'JavaScript', b: 'Python', c: 'HTML' }, correctAnswer: 'b' },
            { id: 3, question: 'Что делает робот, обнаружив препятствие?', options: { a: 'Останавливается', b: 'Ускоряется', c: 'Игнорирует' }, correctAnswer: 'a' },
            { id: 4, question: 'Какой тип двигателя чаще всего используется в роботах?', options: { a: 'Шаговый', b: 'Линейный', c: 'Турбинный' }, correctAnswer: 'a' },
            { id: 5, question: 'Что такое Arduino?', options: { a: 'Программируемая плата', b: 'Датчик', c: 'Язык программирования' }, correctAnswer: 'a' },
            { id: 6, question: 'Какой датчик используется для обнаружения света?', options: { a: 'Фоторезистор', b: 'Гироскоп', c: 'Акселерометр' }, correctAnswer: 'a' },
            { id: 7, question: 'Что такое сервопривод?', options: { a: 'Датчик', b: 'Механизм управления углом', c: 'Источник питания' }, correctAnswer: 'b' },
            { id: 8, question: 'Какой протокол чаще всего используется для связи?', options: { a: 'HTTP', b: 'I2C', c: 'FTP' }, correctAnswer: 'b' },
            { id: 9, question: 'Что измеряет гироскоп?', options: { a: 'Температуру', b: 'Ускорение', c: 'Ориентацию' }, correctAnswer: 'c' },
            { id: 10, question: 'Что такое ROS?', options: { a: 'Операционная система', b: 'Фреймворк для робототехники', c: 'Язык программирования' }, correctAnswer: 'b' },
          ],
        },
        react: {
          title: 'React',
          tests: [
            { id: 1, question: 'Какой хук используется для управления состоянием?', options: { a: 'useEffect', b: 'useState', c: 'useContext' }, correctAnswer: 'b' },
            { id: 2, question: 'Что такое JSX?', options: { a: 'Язык', b: 'Синтаксический сахар', c: 'Библиотека' }, correctAnswer: 'b' },
            { id: 3, question: 'Как можно передать данные в компонент?', options: { a: 'Props', b: 'State', c: 'Хуки' }, correctAnswer: 'a' },
            { id: 4, question: 'Что делает useEffect?', options: { a: 'Управляет состоянием', b: 'Обрабатывает побочные эффекты', c: 'Передает данные' }, correctAnswer: 'b' },
            { id: 5, question: 'Какой метод жизненного цикла заменяет useEffect?', options: { a: 'componentDidMount', b: 'render', c: 'setState' }, correctAnswer: 'a' },
            { id: 6, question: 'Что такое React.Fragment?', options: { a: 'Компонент', b: 'Обертка без DOM-элементов', c: 'Хук' }, correctAnswer: 'b' },
            { id: 7, question: 'Какой хук используется для доступа к контексту?', options: { a: 'useState', b: 'useContext', c: 'useReducer' }, correctAnswer: 'b' },
            { id: 8, question: 'Что такое Virtual DOM?', options: { a: 'Копия реального DOM', b: 'Библиотека', c: 'Компонент' }, correctAnswer: 'a' },
            { id: 9, question: 'Как обновить состояние в React?', options: { a: 'Прямым изменением', b: 'Через setState/useState', c: 'Через props' }, correctAnswer: 'b' },
            { id: 10, question: 'Что такое React Router?', options: { a: 'Библиотека для маршрутизации', b: 'Хук', c: 'Компонент' }, correctAnswer: 'a' },
          ],
        },
      },
    },
  };

  const t = (key, ...args) => {
    const translation = translations[language][key];
    if (typeof translation === 'function') {
      return translation(...args);
    }
    return translation || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, subjects: translations[language].subjects }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook to use the Language Context
export const useLanguage = () => useContext(LanguageContext);