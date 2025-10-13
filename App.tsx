import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ChatWindow from './components/ChatWindow';
import { ChatIcon, NewspaperIcon, CheckCircleIcon } from './components/IconComponents';
import { useLanguage } from './context/LanguageContext';
import { translations } from './localization/translations';
import Hero from './components/Hero';
import QuizSection from './components/QuizSection';
import FinancialToolsSection from './components/FinancialToolsSection';
import EducationalContentSection from './components/EducationalContentSection';
import FloatingControls from './components/FloatingControls';
import RiskAnalysisSection from './components/RiskAnalysisSection';
import InspirationSection from './components/InspirationSection';
import Footer from './components/Footer';
import Modal from './components/Modal';
import { getFinancialNews } from './services/geminiService';
import { LoadingIcon } from './components/IconComponents';
import type { NewsData, SuccessStory } from './types';
import EasterEggPage from './components/EasterEggPage';
import { logUserAction } from './utils/logger';
import QuizSelection from './components/QuizSelection';

const App: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { language, t } = useLanguage();
  const [view, setView] = useState<'home' | 'quizSelection' | 'mindsetQuiz' | 'riskQuiz' | 'financialTools' | 'easterEgg'>('home');
  const [quizType, setQuizType] = useState<'mindset' | 'budgeting' | 'investment' | null>(null);

  const [newsData, setNewsData] = useState<NewsData | null>(null);
  const [isNewsLoading, setIsNewsLoading] = useState(false);
  const [newsError, setNewsError] = useState<string | null>(null);

  const [selectedStory, setSelectedStory] = useState<SuccessStory | null>(null);

  const handleSetView = (newView: typeof view) => {
    logUserAction('View Changed', { from: view, to: newView });
     if (newView === 'home') {
        setQuizType(null);
    }
    setView(newView);
  };

  const handleStartQuiz = (type: 'mindset' | 'budgeting' | 'investment' | 'risk') => {
    logUserAction('Quiz Started', { type });
    if (type === 'risk') {
      setView('riskQuiz');
    } else {
      setQuizType(type);
      setView('mindsetQuiz');
    }
  };

  const handleToggleChat = () => {
    logUserAction(isChatOpen ? 'Chat Closed' : 'Chat Opened');
    setIsChatOpen(!isChatOpen);
  };
  
  const handleSelectStory = (story: SuccessStory) => {
    logUserAction('Story Selected', { name: story.name });
    setSelectedStory(story);
  }

  const handleFetchNews = async () => {
    logUserAction('News Fetch Started');
    setIsNewsLoading(true);
    setNewsError(null);
    setNewsData(null);
    try {
        const response = await getFinancialNews(language);
        const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
        setNewsData({
            text: response.text,
            sources: sources,
        });
        logUserAction('News Fetch Succeeded');
    } catch (error) {
        console.error("Error fetching news:", error);
        setNewsError(t('errorOccurred'));
        logUserAction('News Fetch Failed', { error });
    } finally {
        setIsNewsLoading(false);
    }
  };

  const handleTriggerEasterEgg = () => {
    logUserAction('Easter Egg Triggered', { investor: selectedStory?.name });
    setSelectedStory(null); // Close modal before changing view
    handleSetView('easterEgg');
  }

  // Render full-page views for quizzes and tools for a consistent UX
  if (view !== 'home') {
     return (
        <div className="w-full min-h-screen text-light-text dark:text-dark-text overflow-x-hidden relative" dir={language === 'ar' ? 'rtl' : 'ltr'}>
             <div className="absolute inset-0 -z-10 h-full w-full bg-light-bg dark:bg-dark-bg">
                <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#a8bbf755,transparent)] dark:bg-[radial-gradient(circle_500px_at_50%_200px,#3b82f633,transparent)]"></div>
            </div>
            <FloatingControls />
            
            {view === 'quizSelection' && <QuizSelection onStartQuiz={handleStartQuiz} onDone={() => handleSetView('home')} />}
            {view === 'mindsetQuiz' && quizType && <QuizSection onDone={() => handleSetView('home')} quizType={quizType} />}
            {view === 'riskQuiz' && <RiskAnalysisSection onDone={() => handleSetView('home')} />}
            {view === 'financialTools' && <FinancialToolsSection onDone={() => handleSetView('home')} onSetView={handleSetView} />}
            {view === 'easterEgg' && <EasterEggPage onDone={() => handleSetView('home')} />}
            
             <div className="fixed bottom-8 ltr:right-8 rtl:left-8 z-50">
                <button
                onClick={handleToggleChat}
                className="bg-light-primary/30 hover:bg-light-primary/50 dark:bg-dark-primary/30 dark:hover:dark-primary/50 backdrop-blur-xl border-2 border-white/20 dark:border-sky-400/20 text-light-primary-text dark:text-dark-primary-text rounded-full p-4 shadow-lg shadow-blue-500/30 dark:shadow-sky-500/30 transform transition-transform duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-sky-700"
                aria-label="Open AI Chat"
                >
                <ChatIcon />
                </button>
            </div>
            <ChatWindow isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
        </div>
    );
  }

  // Render home view
  return (
    <div className="w-full min-h-screen text-light-text dark:text-dark-text overflow-x-hidden relative" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="absolute inset-0 -z-10 h-full w-full bg-light-bg dark:bg-dark-bg">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#a8bbf755,transparent)] dark:bg-[radial-gradient(circle_500px_at_50%_200px,#3b82f633,transparent)]"></div>
      </div>
      
      <FloatingControls />
      
      <main>
        <Hero onSetView={handleSetView} />
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="overflow-hidden"
        >
            <section id="news" className="py-20 px-4 bg-light-secondary/50 dark:bg-dark-secondary/50">
                <div className="container mx-auto">
                    <div className="text-center mb-12">
                        <div className="flex justify-center items-center gap-4 mb-4 text-light-text dark:text-dark-text">
                            <NewspaperIcon className="h-8 w-8 text-cyan-500" />
                            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-light-text dark:text-dark-text">{t('financialNewsTitle')}</h2>
                        </div>
                        <p className="text-lg text-light-text/80 dark:text-dark-text/80 max-w-3xl mx-auto">{t('financialNewsSubtitle')}</p>
                        <button
                            onClick={handleFetchNews}
                            disabled={isNewsLoading}
                            className="mt-8 px-8 py-3 bg-light-primary hover:bg-light-primary-hover dark:bg-dark-primary dark:hover:dark-primary-hover text-light-primary-text dark:text-dark-primary-text font-bold rounded-full text-lg shadow-lg shadow-blue-500/30 dark:shadow-sky-500/30 transform transition-all duration-300 hover:scale-105 disabled:opacity-50 flex items-center justify-center mx-auto"
                        >
                            {isNewsLoading ? <LoadingIcon /> : t('getLatestNews')}
                        </button>
                    </div>

                    {isNewsLoading && (
                         <div className="text-center flex flex-col items-center justify-center min-h-[200px]">
                            <LoadingIcon />
                         </div>
                    )}
                    {newsError && <p className="text-center text-red-500">{newsError}</p>}
                    {newsData && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="max-w-4xl mx-auto bg-light-card/30 dark:bg-dark-card/30 backdrop-blur-xl border border-light-border/50 dark:border-dark-border/50 rounded-2xl p-6 sm:p-8 shadow-xl"
                        >
                            <div className="prose prose-lg dark:prose-invert max-w-none whitespace-pre-wrap text-light-text dark:text-dark-text">
                                {newsData.text}
                            </div>
                            {newsData.sources.length > 0 && (
                                <div className="mt-6 border-t border-light-border dark:border-dark-border pt-4">
                                    <h4 className="text-md font-bold mb-2 text-light-text/80 dark:text-dark-text/80">{t('newsSources')}</h4>
                                    <ul className="list-disc list-inside space-y-1">
                                        {newsData.sources.map((source, index) => (
                                            <li key={index} className="text-sm">
                                                <a href={source.web.uri} target="_blank" rel="noopener noreferrer" className="text-cyan-600 dark:text-cyan-400 hover:underline">
                                                    {source.web.title || source.web.uri}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </motion.div>
                    )}
                </div>
            </section>

            <EducationalContentSection />
            <InspirationSection onSelectStory={handleSelectStory} />
            <Footer />
        </motion.div>
      </main>

      <div className="fixed bottom-8 ltr:right-8 rtl:left-8 z-50">
          <button
          onClick={handleToggleChat}
          className="bg-light-primary/30 hover:bg-light-primary/50 dark:bg-dark-primary/30 dark:hover:dark-primary/50 backdrop-blur-xl border-2 border-white/20 dark:border-sky-400/20 text-light-primary-text dark:text-dark-primary-text rounded-full p-4 shadow-lg shadow-blue-500/30 dark:shadow-sky-500/30 transform transition-transform duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-sky-700"
          aria-label="Open AI Chat"
          >
          <ChatIcon />
          </button>
      </div>
      <ChatWindow isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      <Modal isOpen={!!selectedStory} onClose={() => setSelectedStory(null)} title={selectedStory?.name}>
        {selectedStory && (
            <div className="space-y-6 text-light-text/90 dark:text-dark-text/90">
                <div>
                    <h4 className="font-bold text-xl text-light-text dark:text-dark-text mb-2">Biography</h4>
                    <p className="whitespace-pre-wrap leading-relaxed">{selectedStory.story}</p>
                </div>

                <div className="p-4 rounded-lg bg-light-secondary dark:bg-dark-secondary border border-light-border dark:border-dark-border">
                    <h4 className="font-bold text-xl text-light-text dark:text-dark-text mb-3">Key Facts</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                        <div>
                            <p className="font-semibold text-light-text/70 dark:text-dark-text/70">{t('netWorth')}</p>
                            <p className="font-bold text-lg text-light-text dark:text-dark-text">{selectedStory.netWorth}</p>
                        </div>
                        <div onClick={handleTriggerEasterEgg} className="cursor-pointer group">
                            <div className="inline-flex items-baseline bg-light-card dark:bg-dark-secondary px-4 py-2 rounded-lg group-hover:bg-teal-500/10 dark:hover:bg-teal-500/20 border border-transparent group-hover:border-teal-500/30 transition-all duration-200">
                                <span className="font-semibold text-light-text/80 dark:text-dark-text/80 text-sm">{t('age')}:&nbsp;</span>
                                <span className="font-bold text-lg text-light-text dark:text-dark-text">{selectedStory.age}</span>
                            </div>
                        </div>
                        <div>
                            <p className="font-semibold text-light-text/70 dark:text-dark-text/70">{t('careerStart')}</p>
                            <p className="font-bold text-lg text-light-text dark:text-dark-text">{selectedStory.startYear}</p>
                        </div>
                        <div>
                            <p className="font-semibold text-light-text/70 dark:text-dark-text/70">Time to Wealth</p>
                            <p className="font-bold text-lg text-light-text dark:text-dark-text">{selectedStory.timeToWealth}</p>
                        </div>
                    </div>
                </div>
                
                <div>
                      <h4 className="font-bold text-xl text-light-text dark:text-dark-text mb-2">{t('timeline')}</h4>
                      <p className="text-sm">{selectedStory.timeline}</p>
                </div>

                <div>
                    <h4 className="font-bold text-xl text-light-text dark:text-dark-text mb-3">{t('lessons')}</h4>
                    <ul className="space-y-2">
                        {selectedStory.lessons.map((lesson, index) => (
                            <li key={index} className="flex items-start gap-3">
                                <CheckCircleIcon className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                                <span>{lesson}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )}
      </Modal>

    </div>
  );
};

export default App;