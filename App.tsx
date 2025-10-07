import React, { useState } from 'react';
import ConceptCard from './components/ConceptCard';
import ChatWindow from './components/ChatWindow';
import { ChatIcon } from './components/IconComponents';
import { useLanguage } from './context/LanguageContext';
import { translations } from './localization/translations';
import Hero from './components/Hero';
import { motion } from 'framer-motion';
import QuizSection from './components/QuizSection';
import ThemeToggle from './components/ThemeToggle';

const App: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'ar' : 'en';
    setLanguage(newLang);
    document.documentElement.lang = newLang;
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
  };
  
  const concepts = translations[language].concepts;

  return (
    <div className="w-full min-h-screen bg-gray-100 dark:bg-slate-900 text-slate-800 dark:text-white overflow-x-hidden relative transition-colors duration-500" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="absolute inset-0 -z-10 h-full w-full bg-gray-100 dark:bg-slate-900 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] overflow-hidden">
        <motion.div 
          animate={{ y: [0, -20, 0], x: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          className="absolute top-0 left-0 -z-10 m-auto h-[410px] w-[410px] rounded-full bg-fuchsia-500 opacity-20 blur-[120px]">
        </motion.div>
        <motion.div 
          animate={{ y: [0, 20, 0], x: [0, -30, 0] }}
          transition={{ duration: 25, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          className="absolute bottom-0 right-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-cyan-500 opacity-20 blur-[100px]">
        </motion.div>
         <motion.div 
          animate={{ y: [0, -15, 0], x: [0, -25, 0] }}
          transition={{ duration: 30, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          className="absolute bottom-1/2 right-1/2 -z-10 m-auto h-[350px] w-[350px] rounded-full bg-indigo-500 opacity-15 blur-[110px]">
        </motion.div>
      </div>
      
      <div className="fixed top-4 ltr:right-4 rtl:left-4 z-50 flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={toggleLanguage}
            className="bg-slate-200/50 dark:bg-slate-700/50 backdrop-blur-sm border border-slate-300 dark:border-slate-600 hover:bg-slate-300/70 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
            aria-label="Toggle Language"
          >
            {language === 'en' ? 'العربية' : 'English'}
          </button>
      </div>

      <Hero />

      <QuizSection />

      <main id="concepts" className="py-20 px-4">
        <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-800 dark:text-white">{t('coreConcepts')}</h2>
        </div>
        <div className="relative max-w-5xl mx-auto">
          {/* Vertical line for the timeline - hidden on mobile */}
          <div className="absolute ltr:left-1/2 rtl:right-1/2 top-0 h-full w-1 bg-slate-300 dark:bg-slate-700 ltr:-translate-x-1/2 rtl:translate-x-1/2 hidden md:block"></div>

          <div className="space-y-16 md:space-y-0">
            {concepts.map((concept, index) => (
              <div key={index} className="relative md:grid md:grid-cols-2 md:gap-12 items-center md:mb-16">
                
                {/* The Mission Card */}
                <div className={`
                  ${index % 2 === 0 ? 'md:col-start-1 md:col-end-2' : 'md:col-start-2 md:col-end-3'}
                `}>
                   <ConceptCard {...concept} index={index} />
                </div>
                
                {/* The Timeline Dot in the center - hidden on mobile */}
                <div className="absolute ltr:left-1/2 rtl:right-1/2 top-1/2 -translate-y-1/2 ltr:-translate-x-1/2 rtl:translate-x-1/2 w-5 h-5 rounded-full bg-cyan-400 border-4 border-gray-100 dark:border-slate-900 hidden md:block"></div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <div className="fixed bottom-8 ltr:right-8 rtl:left-8 z-50">
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white rounded-full p-4 shadow-lg transform transition-transform duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-cyan-300"
          aria-label="Open AI Chat"
        >
          <ChatIcon />
        </button>
      </div>

      <ChatWindow isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
};

export default App;