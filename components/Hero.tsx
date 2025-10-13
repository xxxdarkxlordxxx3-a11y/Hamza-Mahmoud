import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { BrainIcon } from './IconComponents';

interface HeroProps {
    onSetView: (view: 'quizSelection' | 'riskQuiz' | 'financialTools') => void;
}


const Hero: React.FC<HeroProps> = ({ onSetView }) => {
    const { t } = useLanguage();

    return (
        <section className="w-full min-h-screen flex flex-col items-center justify-center text-center p-4 relative z-10">
            <motion.div 
                 initial={{ opacity: 0, y: -20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.8, ease: 'easeInOut' }}
                 className="flex items-center gap-3 mb-6"
            >
                <BrainIcon />
                <span className="text-3xl sm:text-4xl font-bold text-light-text dark:text-dark-text">{t('appLogoName')}</span>
            </motion.div>
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.1 }}
                className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-sky-400 dark:to-indigo-400"
            >
                {t('appTitle')}
            </motion.h1>
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: 'easeInOut' }}
                className="mt-4 text-lg sm:text-xl text-light-text/80 dark:text-dark-text/80 max-w-2xl mx-auto"
            >
                {t('subtitle')}
            </motion.p>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: 'easeInOut' }}
                className="mt-10 flex flex-col sm:flex-row gap-4 items-center"
            >
                <button
                    onClick={() => onSetView('quizSelection')}
                    className="px-8 py-4 bg-light-primary hover:bg-light-primary-hover dark:bg-dark-primary dark:hover-dark-primary-hover text-light-primary-text dark:text-dark-primary-text font-bold rounded-full text-lg shadow-lg shadow-blue-500/30 dark:shadow-sky-500/30 transform transition-all duration-300 hover:scale-105"
                >
                    {t('takeTheQuiz')}
                </button>
                 <button
                    onClick={() => onSetView('financialTools')}
                    className="px-6 py-3 bg-light-card/50 dark:bg-dark-card/50 border border-light-border dark:border-dark-border text-light-text dark:text-dark-text font-semibold rounded-full text-md shadow-sm hover:bg-light-card/80 dark:hover:bg-dark-card/80 transform transition-all duration-300 hover:scale-105"
                >
                    {t('financialTools')}
                </button>
            </motion.div>
        </section>
    );
};

export default Hero;