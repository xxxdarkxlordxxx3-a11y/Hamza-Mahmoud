import React from 'react';
import { motion, Variants } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

interface ConceptCardProps {
  icon: React.ReactNode;
  title: string;
  poorMindset: string;
  richMindset: string;
  index: number;
}

const cardVariants: Variants = {
  hidden: (i: number) => {
    const isMobile = window.innerWidth < 768;
    const isRTL = document.documentElement.dir === 'rtl';

    let x = 0;
    if (!isMobile) {
      if(isRTL) {
        x = i % 2 === 0 ? 100 : -100;
      } else {
        x = i % 2 === 0 ? -100 : 100;
      }
    }
    
    return {
      opacity: 0,
      y: isMobile ? 50 : 0,
      x: x,
    };
  },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const ConceptCard: React.FC<ConceptCardProps> = ({ icon, title, poorMindset, richMindset, index }) => {
  const { t } = useLanguage();
  const missionNumber = (index + 1).toString().padStart(2, '0');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <motion.div
      className="w-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-300 dark:border-slate-700 rounded-2xl p-6 sm:p-8 shadow-lg relative overflow-hidden group"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      custom={index}
      whileHover={{ scale: 1.03, boxShadow: '0 0 25px rgba(0, 255, 255, 0.2)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
      onMouseMove={handleMouseMove}
    >
        <div 
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: 'radial-gradient(400px at var(--mouse-x) var(--mouse-y), rgba(0, 255, 255, 0.1), transparent 80%)'
          }}
        />

        <div className="absolute -top-10 ltr:-left-10 rtl:-right-10 text-8xl font-black text-slate-200 dark:text-slate-700/50 opacity-50 z-0 select-none">
            {missionNumber}
        </div>
        <div className="relative z-10">
            <div className="flex items-center mb-6 rtl:flex-row-reverse">
                <div className="bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 p-3 rounded-lg ltr:mr-4 rtl:ml-4">{icon}</div>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white">{title}</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 rounded-lg bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 rtl:text-right">
                <h4 className="font-semibold text-red-600 dark:text-red-300 mb-2 text-lg">{t('poorMindset')}</h4>
                <p className="text-slate-700 dark:text-slate-300 ">{poorMindset}</p>
                </div>
                <div className="p-4 rounded-lg bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-500/30 rtl:text-right">
                <h4 className="font-semibold text-green-600 dark:text-green-300 mb-2 text-lg">{t('richMindset')}</h4>
                <p className="text-slate-700 dark:text-slate-300 ">{richMindset}</p>
                </div>
            </div>
        </div>
    </motion.div>
  );
};

export default ConceptCard;