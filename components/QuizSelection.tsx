import React from 'react';
import { motion, Variants } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { HomeIcon, BrainIcon, ShieldCheckIcon, CalculatorIcon, AssetIcon } from './IconComponents';

type QuizType = 'mindset' | 'risk' | 'budgeting' | 'investment';

interface QuizSelectionProps {
  onStartQuiz: (quizType: QuizType) => void;
  onDone: () => void;
}

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.1,
            duration: 0.5,
            ease: "easeOut"
        }
    })
};


const QuizCard: React.FC<{icon: React.ReactNode, title: string, desc: string, onClick: () => void, index: number}> = ({icon, title, desc, onClick, index}) => {
    const { t } = useLanguage();
    return (
        <motion.div 
            className="bg-light-card/30 dark:bg-dark-card/30 backdrop-blur-xl border border-light-border/50 dark:border-dark-border/50 rounded-2xl p-6 text-center flex flex-col items-center hover:shadow-2xl hover:border-cyan-500/50 transition-all duration-300 cursor-pointer group"
            onClick={onClick}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={index}
            whileHover={{ y: -5 }}
        >
            <div className="mb-4 text-cyan-500">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-light-text dark:text-dark-text mb-2">{title}</h3>
            <p className="text-light-text/80 dark:text-dark-text/80 text-sm mb-6 flex-grow">{desc}</p>
            <button className="mt-auto w-full px-4 py-2 bg-light-primary/10 dark:bg-dark-primary/10 border border-light-primary/20 dark:border-dark-primary/20 text-light-primary dark:text-dark-primary font-bold rounded-full group-hover:bg-light-primary dark:group-hover:bg-dark-primary group-hover:text-light-primary-text dark:group-hover:text-dark-primary-text transition-colors duration-300">
                {t('startTest')}
            </button>
        </motion.div>
    );
}

const QuizSelection: React.FC<QuizSelectionProps> = ({ onStartQuiz, onDone }) => {
    const { t } = useLanguage();

    const quizzes = [
        { type: 'mindset', title: t('mindsetQuizTitle'), desc: t('mindsetQuizDesc'), icon: <BrainIcon /> },
        { type: 'risk', title: t('riskAnalysisTitle'), desc: t('riskAnalysisSubtitle'), icon: <ShieldCheckIcon className="w-10 h-10 text-red-400" /> },
        { type: 'budgeting', title: t('budgetingQuizTitle'), desc: t('budgetingQuizDesc'), icon: <CalculatorIcon className="w-10 h-10 text-blue-400" /> },
        { type: 'investment', title: t('investmentQuizTitle'), desc: t('investmentQuizDesc'), icon: <AssetIcon /> },
    ];
    
    return (
        <section className="min-h-screen py-20 px-4 flex items-center justify-center">
            <div className="container mx-auto max-w-4xl text-center">
                 <motion.h2 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl sm:text-4xl font-extrabold tracking-tight text-light-text dark:text-dark-text mb-4"
                >
                    {t('quizSelectionTitle')}
                </motion.h2>
                <motion.p
                     initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-lg text-light-text/80 dark:text-dark-text/80"
                >
                    Select a test to begin your journey to financial wisdom.
                </motion.p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                   {quizzes.map((quiz, index) => (
                       <QuizCard 
                           key={quiz.type}
                           icon={React.cloneElement(quiz.icon, { className: "w-12 h-12" })}
                           title={quiz.title}
                           desc={quiz.desc}
                           onClick={() => onStartQuiz(quiz.type as QuizType)}
                           index={index}
                       />
                   ))}
                </div>
                
                 <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                 >
                    <button onClick={onDone} className="mt-12 px-6 py-3 inline-flex items-center justify-center gap-2 bg-light-secondary dark:bg-dark-secondary text-light-text dark:text-dark-text font-bold rounded-full text-lg transform transition-all duration-300 hover:-translate-y-1">
                        <HomeIcon className="w-5 h-5" />
                        {t('goBackHome')}
                    </button>
                 </motion.div>
            </div>
        </section>
    );
};

export default QuizSelection;