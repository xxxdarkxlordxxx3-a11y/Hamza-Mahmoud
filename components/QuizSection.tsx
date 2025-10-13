import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import type { UserAnswer, QuizQuestion } from '../types';
import { translations } from '../localization/translations';
import Quiz from './Quiz';
import QuizResults from './QuizResults';
import { generateQuizQuestions, generateBudgetingQuizQuestions, generateInvestmentQuizQuestions } from '../services/geminiService';
import { LoadingIcon } from './IconComponents';

interface QuizSectionProps {
    onDone: () => void;
    quizType: 'mindset' | 'budgeting' | 'investment';
}

const QuizSection: React.FC<QuizSectionProps> = ({ onDone, quizType }) => {
    const [quizState, setQuizState] = useState<'idle' | 'active' | 'finished'>('idle');
    const [answers, setAnswers] = useState<UserAnswer[]>([]);
    const { language, t } = useLanguage();
    const [questions, setQuestions] = useState<QuizQuestion[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const quizDetails = {
        mindset: {
            title: t('mindsetQuizTitle'),
            intro: t('mindsetQuizDesc'),
            generator: () => generateQuizQuestions(language)
        },
        budgeting: {
            title: t('budgetingQuizTitle'),
            intro: t('budgetingQuizDesc'),
            generator: () => generateBudgetingQuizQuestions(language)
        },
        investment: {
            title: t('investmentQuizTitle'),
            intro: t('investmentQuizDesc'),
            generator: () => generateInvestmentQuizQuestions(language)
        }
    }[quizType];


    const handleStart = async () => {
        setIsLoading(true);
        setError(null);
        setAnswers([]);

        try {
            const generatedQuestions = await quizDetails.generator();
            setQuestions(generatedQuestions);
        } catch (e) {
            console.error(e);
            setError(t('quizGenerationError'));
            // Use fallback questions if API fails - only for mindset quiz for now
            if (quizType === 'mindset') {
                setQuestions(translations[language].quiz);
            }
        } finally {
            setIsLoading(false);
            setQuizState('active');
        }
    };

    const handleSubmit = (finalAnswers: UserAnswer[]) => {
        setAnswers(finalAnswers);
        setQuizState('finished');
    };

    const handleRetake = () => {
        setAnswers([]);
        setQuestions([]);
        setError(null);
        setQuizState('idle');
    };

    return (
        <section id="quiz" className="py-20 px-4 min-h-screen flex items-center justify-center">
            <div className="container mx-auto max-w-4xl">
                {quizState === 'idle' && !isLoading && (
                    <div className="text-center">
                        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-light-text dark:text-dark-text mb-4">{quizDetails.title}</h2>
                        <p className="text-lg text-light-text/80 dark:text-dark-text/80 mb-8 max-w-2xl mx-auto">{quizDetails.intro}</p>
                        <button
                            onClick={handleStart}
                            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full text-lg shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transform transition-all duration-300 hover:-translate-y-1"
                        >
                            {t('startTest')}
                        </button>
                    </div>
                )}
                {isLoading && (
                    <div className="text-center flex flex-col items-center justify-center min-h-[200px]">
                        <LoadingIcon />
                        <p className="text-light-text/80 dark:text-dark-text/80 mt-4 text-lg">{t('generatingQuiz')}</p>
                    </div>
                )}
                {quizState === 'active' && !isLoading && (
                   <>
                    {error && <p className="text-center text-red-500 mb-4">{error}</p>}
                    <Quiz questions={questions} onSubmit={handleSubmit} title={quizDetails.title} />
                   </>
                )}
                {quizState === 'finished' && (
                    <QuizResults questions={questions} userAnswers={answers} onRetake={handleRetake} onDone={onDone} />
                )}
            </div>
        </section>
    );
};

export default QuizSection;