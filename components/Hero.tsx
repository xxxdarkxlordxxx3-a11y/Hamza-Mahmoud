import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const Hero: React.FC = () => {
    const { t } = useLanguage();

    const handleScroll = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="w-full min-h-screen flex flex-col items-center justify-center text-center p-4 relative z-10">
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
            >
                {t('title')}
            </motion.h1>
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: 'easeInOut' }}
                className="mt-4 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto"
            >
                {t('subtitle')}
            </motion.p>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: 'easeInOut' }}
                className="mt-10 flex flex-col sm:flex-row gap-4 items-center"
            >
                <button
                    onClick={() => handleScroll('quiz')}
                    className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-full text-lg shadow-lg hover:shadow-cyan-500/50 transform transition-all duration-300 hover:scale-105"
                >
                    {t('takeTheQuiz')}
                </button>
                 <button
                    onClick={() => handleScroll('concepts')}
                    className="px-6 py-3 bg-white/50 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold rounded-full text-md shadow-sm hover:bg-white/80 dark:hover:bg-slate-700 transform transition-all duration-300 hover:scale-105"
                >
                    {t('exploreConcepts')}
                </button>
            </motion.div>
             <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10"
            >
                <div className="w-6 h-10 border-2 border-slate-500 dark:border-slate-400 rounded-full flex justify-center items-start p-1">
                    <motion.div
                        className="w-1 h-2 bg-slate-500 dark:bg-slate-400 rounded-full"
                        animate={{ y: [0, 12, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;