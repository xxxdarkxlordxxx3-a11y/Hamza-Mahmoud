import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { HomeIcon, TurtleIcon } from './IconComponents';

interface EasterEggPageProps {
    onDone: () => void;
}

const EasterEggPage: React.FC<EasterEggPageProps> = ({ onDone }) => {
    const { t } = useLanguage();
    return (
        <section className="min-h-screen py-20 px-4 flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="w-full max-w-3xl mx-auto bg-light-card/30 dark:bg-dark-card/30 backdrop-blur-xl border border-light-border/50 dark:border-dark-border/50 rounded-2xl p-8 shadow-2xl text-center"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 260, damping: 20 }}
                    className="flex justify-center mb-6"
                >
                    <TurtleIcon className="w-20 h-20 text-teal-500" />
                </motion.div>
                
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-light-text dark:text-dark-text mb-4 bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-cyan-500">
                    {t('easterEggTitle')}
                </h2>
                
                <div className="space-y-6 text-lg text-light-text/80 dark:text-dark-text/80 leading-relaxed">
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                    >
                        {t('easterEggContent1')}
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                    >
                        {t('easterEggContent2')}
                    </motion.p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                >
                    <button onClick={onDone} className="mt-10 px-6 py-3 inline-flex items-center justify-center gap-2 bg-light-primary hover:bg-light-primary-hover dark:bg-dark-primary dark:hover:dark-primary-hover text-light-primary-text dark:text-dark-primary-text font-bold rounded-full text-lg shadow-lg transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                        <HomeIcon className="w-5 h-5" />
                        {t('goBackHome')}
                    </button>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default EasterEggPage;