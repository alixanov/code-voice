// AccessibilityContext.js
import React, { createContext, useState, useEffect } from 'react';

export const AccessibilityContext = createContext();

export const AccessibilityProvider = ({ children }) => {
  const [isAccessibilityMode, setIsAccessibilityMode] = useState(false);
  const [currentUtterance, setCurrentUtterance] = useState(null);

  // Функция для озвучивания текста
  const speakText = (text) => {
    if (!isAccessibilityMode) return;

    if (currentUtterance) {
      window.speechSynthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ru-RU';
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    setCurrentUtterance(utterance);
    window.speechSynthesis.speak(utterance);
  };

  // Функция для остановки речи
  const stopSpeech = () => {
    if (currentUtterance) {
      window.speechSynthesis.cancel();
      setCurrentUtterance(null);
    }
  };

  // Очистка при размонтировании
  useEffect(() => {
    return () => {
      stopSpeech();
    };
  }, []);

  return (
    <AccessibilityContext.Provider
      value={{
        isAccessibilityMode,
        setIsAccessibilityMode,
        speakText,
        stopSpeech,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};