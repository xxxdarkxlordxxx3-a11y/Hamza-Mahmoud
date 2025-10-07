import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import type { QuizQuestion, UserAnswer } from '../types';
import { BrainIcon, CheckCircleIcon, XCircleIcon, InfoIcon } from './IconComponents';

interface QuizResultsProps {
    questions: QuizQuestion[];
    userAnswers: UserAnswer[];
    onRetake: () => void;
}

const QuizResults: React.FC<QuizResultsProps> = ({ questions, userAnswers, onRetake }) => {
    const { t } = useLanguage();

    const richMindsetScore = userAnswers.reduce((score, answer) => {
        const question = questions[answer.questionIndex];
        const selectedOption = question.options[answer.selectedOptionIndex];
        return selectedOption.mindset === 'rich' ? score + 1 : score;
    }, 0);

    const scorePercentage = (richMindsetScore / questions.length) * 100;

    let resultMessage, resultColorClass;
    if (scorePercentage >= 75) {
        resultMessage = t('richMindsetResult');
        resultColorClass = 'text-green-500 dark:text-green-400';
    } else if (scorePercentage >= 40) {
        resultMessage = t('balancedMindsetResult');
        resultColorClass = 'text-yellow-500 dark:text-yellow-400';
    } else {
        resultMessage = t('poorMindsetResult');
        resultColorClass = 'text-red-500 dark:text-red-400';
    }
    
    const growthAnswers = userAnswers.filter(answer => {
        const question = questions[answer.questionIndex];
        const mindset = question.options[answer.selectedOptionIndex].mindset;
        return mindset === 'poor' || mindset === 'balanced';
    });

    const getMindsetStyles = (mindset: 'rich' | 'poor' | 'balanced') => {
        switch (mindset) {
            case 'poor':
                return {
                    Icon: XCircleIcon,
                    textColor: 'text-red-500 dark:text-red-400',
                };
            case 'balanced':
                 return {
                    Icon: InfoIcon,
                    textColor: 'text-yellow-500 dark:text-yellow-400',
                };
            default:
                return {
                    Icon: CheckCircleIcon,
                    textColor: 'text-green-500 dark:text-green-400',
                };
        }
    };


    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-300 dark:border-slate-700 rounded-2xl p-6 sm:p-8 shadow-2xl w-full"
        >
            <div className="text-center">
                <div className="flex justify-center items-center gap-4 mb-4 text-slate-800 dark:text-white">
                    <BrainIcon />
                    <h2 className="text-3xl font-extrabold">{t('resultsTitle')}</h2>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-lg">{t('resultsIntro')} <span className={`font-bold ${resultColorClass}`}>{resultMessage}</span></p>
                
                <div className="my-8">
                    <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">{Math.round(scorePercentage)}%</div>
                    <p className="text-slate-500 dark:text-slate-400">{richMindsetScore} of {questions.length} answers aligned with the Rich Mindset.</p>
                </div>
            </div>

            {growthAnswers.length > 0 && (
                <div className="mt-10">
                    <h3 className="text-2xl font-bold text-center mb-2 text-slate-800 dark:text-white">{t('resultsSubtitle')}</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-center mb-6 max-w-2xl mx-auto">{t('resultsExplanation')}</p>
                    <div className="space-y-4">
                        {growthAnswers.map((answer, index) => {
                            const question = questions[answer.questionIndex];
                            const userAnswerOption = question.options[answer.selectedOptionIndex];
                            const richMindsetOption = question.options.find(o => o.mindset === 'rich');
                            const { Icon: UserIcon, textColor: userTextColor } = getMindsetStyles(userAnswerOption.mindset);
                            
                            return (
                                <motion.div
                                    key={answer.questionIndex}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="bg-slate-100 dark:bg-slate-900/70 p-4 rounded-lg border border-slate-300 dark:border-slate-700"
                                >
                                    <p className="font-semibold text-slate-700 dark:text-slate-300 mb-4">{question.question}</p>
                                    <div className="mb-3">
                                        <div className="flex items-start gap-2">
                                            <UserIcon className="h-5 w-5 mt-0.5" />
                                            <div>
                                                <p className={`font-semibold ${userTextColor} text-sm`}>{t('yourAnswer')}</p>
                                                <p className="text-slate-600 dark:text-slate-400 text-sm">{userAnswerOption.text}</p>
                                            </div>
                                        </div>
                                    </div>
                                    {richMindsetOption && (
                                        <div className="mb-4">
                                            <div className="flex items-start gap-2">
                                                <CheckCircleIcon />
                                                <div>
                                                    <p className="font-semibold text-green-500 dark:text-green-400 text-sm">{t('richDadAlternative')}</p>
                                                    <p className="text-slate-600 dark:text-slate-400 text-sm">{richMindsetOption.text}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div className="p-3 bg-slate-200 dark:bg-slate-800 rounded-md border border-slate-300 dark:border-slate-600">
                                        <div className="flex items-start gap-2">
                                            <InfoIcon className="h-5 w-5 text-cyan-500 dark:text-cyan-400 mt-0.5" />
                                            <p className="text-cyan-600 dark:text-cyan-200 text-sm">{question.feedback}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            )}

            <div className="mt-10 text-center">
                <button
                    onClick={onRetake}
                    className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-full text-lg shadow-lg hover:shadow-cyan-500/50 transform transition-all duration-300 hover:scale-105"
                >
                    {t('retakeQuiz')}
                </button>
            </div>
        </motion.div>
    );
};

export default QuizResults;
