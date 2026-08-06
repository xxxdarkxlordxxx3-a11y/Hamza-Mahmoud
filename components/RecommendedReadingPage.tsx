
import React, { useEffect, useState } from 'react';
import { motion as framerMotion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../localization/translations';
import { LearnIcon, HomeIcon, HazardIcon } from './IconComponents';
import { db, RiskLevel } from '../services/storage';
import { Book } from '../types';

const motion = framerMotion as any;

interface RecommendedReadingPageProps {
    onDone: () => void;
}

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.05,
            duration: 0.5,
            ease: "easeOut"
        }
    })
};

const RecommendedReadingPage: React.FC<RecommendedReadingPageProps> = ({ onDone }) => {
    const { language, t } = useLanguage();
    const allBooks = translations[language].books;
    const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
    const [userRiskLevel, setUserRiskLevel] = useState<RiskLevel | null>(null);

    useEffect(() => {
        const riskLevel = db.getRiskLevel();
        setUserRiskLevel(riskLevel);

        if (!riskLevel) {
            // If user did not complete test, leave recommendations as they are (Show All)
            setFilteredBooks(allBooks);
        } else {
            // Filter based on levels
            // High result -> All recommendations (Low + Medium + High)
            // Medium result -> Remove items medium users cannot handle (Remove High) -> Show Low + Medium
            // Low result -> Remove items low users cannot handle (Remove Med + High) -> Show Low
            
            const allowed: RiskLevel[] = [];
            if (riskLevel === 'High') {
                allowed.push('Low', 'Medium', 'High');
            } else if (riskLevel === 'Medium') {
                allowed.push('Low', 'Medium');
            } else {
                // Low
                allowed.push('Low');
            }

            const filtered = allBooks.filter(book => allowed.includes(book.riskLevel));
            setFilteredBooks(filtered);
        }
    }, [allBooks]);

    const getBadgeColor = (level: string) => {
        switch(level) {
            case 'High': return 'bg-red-500/20 text-red-600 dark:text-red-400 border-red-500/20';
            case 'Medium': return 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border-yellow-500/20';
            default: return 'bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/20';
        }
    };

    return (
        <div className="w-full py-20 px-4 bg-light-secondary/30 dark:bg-dark-secondary/30">
            <div className="container mx-auto max-w-5xl text-center">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex justify-center items-center gap-4 mb-4 text-light-text dark:text-dark-text">
                        <LearnIcon className="h-8 w-8 text-indigo-500" />
                        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-light-text dark:text-dark-text">{t('bookRecommendationsTitle')}</h2>
                    </div>
                    <p className="text-lg text-light-text/80 dark:text-dark-text/80 max-w-3xl mx-auto">{t('bookRecommendationsSubtitle')}</p>
                    
                    {userRiskLevel && (
                        <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-full shadow-sm">
                            <span className="text-sm font-semibold text-light-text/70 dark:text-dark-text/70">{t('filteringRecommendations')}</span>
                            <span className={`text-sm font-bold px-2 py-0.5 rounded ${getBadgeColor(userRiskLevel)}`}>
                                {userRiskLevel === 'High' ? t('high') : userRiskLevel === 'Medium' ? t('medium') : t('low')} {t('riskTolerance')}
                            </span>
                        </div>
                    )}
                </motion.div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10 mt-12">
                    {filteredBooks.map((book, index) => (
                        <motion.a
                            key={book.url}
                            href={book.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block relative"
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            custom={index}
                            whileHover={{ y: -5 }}
                        >
                            <div 
                                className="relative overflow-hidden rounded-lg shadow-xl aspect-[2/3] bg-light-secondary dark:bg-dark-secondary bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                                style={{ backgroundImage: `url(${book.coverImage})` }}
                                aria-label={book.title}
                            >
                                <div className="absolute top-2 right-2">
                                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full border backdrop-blur-md ${getBadgeColor(book.riskLevel)}`}>
                                        {book.riskLevel}
                                    </span>
                                </div>
                            </div>
                            <h4 className="mt-3 text-sm font-semibold text-center text-light-text dark:text-dark-text group-hover:text-cyan-500 transition-colors">{book.title}</h4>
                            <p className="text-xs text-center text-light-text/70 dark:text-dark-text/70 mt-1">{book.author}</p>
                        </motion.a>
                    ))}
                </div>
                
                {filteredBooks.length === 0 && (
                    <div className="mt-12 text-center text-light-text/60 dark:text-dark-text/60">
                        No recommendations available for this risk level yet.
                    </div>
                )}

                 <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="text-center mt-16">
                    <button onClick={onDone} className="px-8 py-3 bg-light-card dark:bg-dark-card border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-full text-base hover:bg-light-secondary dark:hover:bg-dark-secondary transition-colors shadow-sm inline-flex items-center gap-2">
                        <HomeIcon className="w-5 h-5" />
                        {t('goBackHome')}
                    </button>
                </motion.div>
            </div>
        </div>
    );
};

export default RecommendedReadingPage;
