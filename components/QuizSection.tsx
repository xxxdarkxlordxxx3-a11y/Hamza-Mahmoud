import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import type { UserAnswer, QuizQuestion } from '../types';
import { translations } from '../localization/translations';
import Quiz from './Quiz';
import QuizResults from './QuizResults';
import { generateQuizQuestions } from '../services/geminiService';
import { LoadingIcon } from './IconComponents';

const QuizSection: React.FC = () => {
    const [quizState, setQuizState] = useState<'idle' | 'active' | 'finished'>('idle');
    const [answers, setAnswers] = useState<UserAnswer[]>([]);
    const { language, t } = useLanguage();
    const [questions, setQuestions] = useState<QuizQuestion[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleStart = async () => {
        setIsLoading(true);
        setError(null);
        setAnswers([]);

        try {
            const generatedQuestions = await generateQuizQuestions(language);
            setQuestions(generatedQuestions);
        } catch (e) {
            console.error(e);
            setError(t('quizGenerationError'));
            // Use fallback questions if API fails
            setQuestions(translations[language].quiz);
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
        document.getElementById('quiz')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="quiz" className="py-20 px-4">
            <div className="max-w-4xl mx-auto">
                {quizState === 'idle' && !isLoading && (
                    <div className="text-center">
                        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-800 dark:text-white mb-4">{t('quizTitle')}</h2>
                        <p className="text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">{t('quizIntro')}</p>
                        <button
                            onClick={handleStart}
                            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full text-lg shadow-lg hover:shadow-purple-500/50 transform transition-all duration-300 hover:scale-105"
                        >
                            {t('takeTheQuiz')}
                        </button>
                    </div>
                )}
                {isLoading && (
                    <div className="text-center flex flex-col items-center justify-center min-h-[200px]">
                        <LoadingIcon />
                        <p className="text-slate-600 dark:text-slate-300 mt-4 text-lg">{t('generatingQuiz')}</p>
                    </div>
                )}
                {quizState === 'active' && !isLoading && (
                   <>
                    {error && <p className="text-center text-red-500 mb-4">{error}</p>}
                    <Quiz questions={questions} onSubmit={handleSubmit} />
                   </>
                )}
                {quizState === 'finished' && (
                    <QuizResults questions={questions} userAnswers={answers} onRetake={handleRetake} />
                )}
            </div>
        </section>
    );
};

export default QuizSection;
