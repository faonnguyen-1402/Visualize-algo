// src/contexts/LanguageContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'vi';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('vi');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'vi' : 'en');
  };

  // Từ điển dịch (có thể mở rộng sau)
  const translations: Record<Language, Record<string, string>> = {
    en: {
      'nav.home': 'Home',
      'nav.algo': 'Algorithms',
      'nav.practice': 'Practice',
      'nav.login': 'Login',
      'nav.logout': 'Sign out',
      'nav.profile': 'Profile',
      'search_placeholder': 'Search algorithms, practices...',
    },
    vi: {
      'nav.home': 'Trang chủ',
      'nav.algo': 'Thuật toán',
      'nav.practice': 'Luyện tập',
      'nav.login': 'Đăng nhập',
      'nav.logout': 'Đăng xuất',
      'nav.profile': 'Hồ sơ cá nhân',
      'search_placeholder': 'Tìm kiếm thuật toán, bài luyện tập...',
    }
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};