import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import type { QuizQuestion, UserAnswer } from '../types';

interface QuizProps {
  questions: QuizQuestion[];
  onSubmit: (answers: UserAnswer[]) => void;
}

// Fisher-Yates shuffle utility
const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

const Quiz: React.FC<QuizProps> = ({ questions, onSubmit }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [direction, setDirection] = useState(1);
  const { t } = useLanguage();
  const [shuffledOptions, setShuffledOptions] = useState<(typeof questions[0]['options'][0] & { originalIndex: number })[]>([]);

  useEffect(() => {
    if (questions.length > 0 && questions[currentQuestionIndex]) {
        const optionsWithOriginalIndex = questions[currentQuestionIndex].options.map((opt, index) => ({
            ...opt,
            originalIndex: index,
        }));
        setShuffledOptions(shuffleArray(optionsWithOriginalIndex));
    }
  }, [currentQuestionIndex, questions]);

  const handleSelectOption = (originalOptionIndex: number) => {
    const existingAnswerIndex = userAnswers.findIndex(a => a.questionIndex === currentQuestionIndex);
    let newAnswers = [...userAnswers];
    if (existingAnswerIndex > -1) {
      newAnswers[existingAnswerIndex] = { questionIndex: currentQuestionIndex, selectedOptionIndex: originalOptionIndex };
    } else {
      newAnswers.push({ questionIndex: currentQuestionIndex, selectedOptionIndex: originalOptionIndex });
    }
    setUserAnswers(newAnswers);

    // Auto-advance to next question
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setDirection(1);
        setCurrentQuestionIndex(prev => prev + 1);
      }
    }, 300);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setDirection(1);
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setDirection(-1);
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };
  
  const selectedOption = userAnswers.find(a => a.questionIndex === currentQuestionIndex)?.selectedOptionIndex;
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0
    })
  };

  return (
    <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-300 dark:border-slate-700 rounded-2xl p-6 sm:p-8 shadow-2xl w-full">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2 text-slate-600 dark:text-slate-300">
          <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">{t('quizTitle')}</h2>
          <p className="font-semibold">{t('question')} {currentQuestionIndex + 1} {t('of')} {questions.length}</p>
        </div>
        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
          <motion.div
            className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2.5 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
        </div>
      </div>

      <div className="relative h-48 sm:h-32 overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.h3
            key={currentQuestionIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute w-full text-lg sm:text-2xl font-semibold text-slate-800 dark:text-white text-center"
          >
            {questions[currentQuestionIndex].question}
          </motion.h3>
        </AnimatePresence>
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {shuffledOptions.map((option, index) => (
          <motion.button
            key={index}
            onClick={() => handleSelectOption(option.originalIndex)}
            className={`w-full p-4 rounded-lg text-left transition-all duration-200 border-2 text-slate-800 dark:text-white text-sm sm:text-base ${
              selectedOption === option.originalIndex
                ? 'bg-cyan-500 border-cyan-400 text-white font-bold shadow-lg'
                : 'bg-slate-200 dark:bg-slate-700 border-slate-300 dark:border-slate-600 hover:bg-slate-300/70 dark:hover:bg-slate-600 hover:border-slate-400 dark:hover:border-slate-500'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {option.text}
          </motion.button>
        ))}
      </div>

      <div className={`mt-8 flex ${currentQuestionIndex === 0 ? 'justify-end' : 'justify-between'}`}>
        {currentQuestionIndex > 0 && (
          <button
            onClick={handleBack}
            className="px-6 py-2 bg-slate-600 text-white font-bold rounded-lg hover:bg-slate-500 transition-colors"
          >
            {t('back')}
          </button>
        )}
        
        {currentQuestionIndex < questions.length - 1 ? (
          <button
            onClick={handleNext}
            disabled={selectedOption === undefined}
            className="px-6 py-2 bg-cyan-500 text-white font-bold rounded-lg hover:bg-cyan-400 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed"
          >
            {t('next')}
          </button>
        ) : (
          <button
            onClick={() => onSubmit(userAnswers)}
            disabled={userAnswers.length !== questions.length}
            className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg hover:opacity-90 transition-opacity disabled:bg-slate-600 disabled:from-slate-600 disabled:to-slate-600 disabled:cursor-not-allowed"
          >
            {t('finish')}
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;