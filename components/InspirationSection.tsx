import React, { useState, useMemo } from 'react';
import { motion, Variants } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import type { SuccessStory } from '../types';
import { UsersIcon } from './IconComponents';
import { translations } from '../localization/translations';

interface InspirationSectionProps {
    onSelectStory: (story: SuccessStory) => void;
}

const parseWealth = (netWorth: string): number => {
    const value = parseFloat(netWorth.replace(/[^0-9.]/g, ''));
    if (netWorth.toLowerCase().includes('billion')) {
        return value * 1000; // Store as millions for consistent comparison
    }
    if (netWorth.toLowerCase().includes('million')) {
        return value;
    }
    return value;
};


const InspirationSection: React.FC<InspirationSectionProps> = ({ onSelectStory }) => {
    const { language, t } = useLanguage();
    const stories = useMemo(() => translations[language].successStories, [language]);
    const [sortBy, setSortBy] = useState<'wealth' | 'experience'>('wealth');

    const sortedStories = useMemo(() => {
        const storiesToSort = [...stories];
        if (sortBy === 'wealth') {
            return storiesToSort.sort((a, b) => parseWealth(b.netWorth) - parseWealth(a.netWorth));
        }
        if (sortBy === 'experience') {
            return storiesToSort.sort((a, b) => a.startYear - b.startYear);
        }
        return storiesToSort;
    }, [stories, sortBy]);

    const cardVariants: Variants = {
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

    return (
        <section id="inspiration" className="py-20 px-4 bg-light-secondary/50 dark:bg-dark-secondary/50">
            <div className="container mx-auto">
                <div className="text-center mb-12">
                     <div className="flex justify-center items-center gap-4 mb-4 text-light-text dark:text-dark-text">
                        <UsersIcon className="h-8 w-8 text-indigo-500" />
                        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-light-text dark:text-dark-text">{t('inspirationTitle')}</h2>
                    </div>
                    <p className="text-lg text-light-text/80 dark:text-dark-text/80 max-w-3xl mx-auto">{t('inspirationSubtitle')}</p>
                </div>
                
                <div className="flex justify-center items-center gap-4 mb-10">
                    <button 
                        onClick={() => setSortBy('wealth')}
                        className={`px-6 py-2 rounded-full font-semibold transition-colors ${sortBy === 'wealth' ? 'bg-light-primary text-light-primary-text dark:bg-dark-primary dark:text-dark-primary-text' : 'bg-light-card/20 dark:bg-dark-card/20 backdrop-blur-xl border border-light-border/30 dark:border-dark-border/30 hover:bg-light-card/30 dark:hover:bg-dark-card/30'}`}
                    >
                        {t('sortByWealth')}
                    </button>
                    <button 
                        onClick={() => setSortBy('experience')}
                        className={`px-6 py-2 rounded-full font-semibold transition-colors ${sortBy === 'experience' ? 'bg-light-primary text-light-primary-text dark:bg-dark-primary dark:text-dark-primary-text' : 'bg-light-card/20 dark:bg-dark-card/20 backdrop-blur-xl border border-light-border/30 dark:border-dark-border/30 hover:bg-light-card/30 dark:hover:bg-dark-card/30'}`}
                    >
                        {t('sortByExperience')}
                    </button>
                </div>


                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {sortedStories.map((story, index) => (
                        <motion.div
                            key={`${story.name}-${language}`}
                            className="bg-light-card/30 dark:bg-dark-card/30 backdrop-blur-xl border border-light-border/50 dark:border-dark-border/50 rounded-2xl shadow-lg flex flex-col overflow-hidden"
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.1 }}
                            custom={index}
                            layout
                        >
                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-bold text-light-text dark:text-dark-text">{story.name}</h3>
                                    <span className="text-xs font-semibold bg-light-secondary/20 dark:bg-dark-secondary/20 backdrop-blur-xl border border-light-border/20 dark:border-dark-border/20 px-2 py-1 rounded-full flex-shrink-0 ml-2">{t('age')}: {story.age}</span>
                                </div>
                                <p className="text-indigo-500 text-sm font-semibold mb-2">{story.sourceOfWealth}</p>
                                <div className="text-sm text-light-text/70 dark:text-dark-text/70 mb-3">
                                    <p><span className="font-semibold">{t('netWorth')}:</span> {story.netWorth}</p>
                                </div>
                                <p className="text-light-text/80 dark:text-dark-text/80 text-sm flex-grow mb-4">{story.bio}</p>
                                <button
                                    onClick={() => onSelectStory(story)}
                                    className="mt-auto w-full text-center px-4 py-2 bg-light-secondary/20 dark:bg-dark-secondary/20 backdrop-blur-xl border border-light-border/20 dark:border-dark-border/20 text-light-text dark:text-dark-text font-bold rounded-lg hover:bg-light-border/40 dark:hover:bg-dark-border/40 transition-colors"
                                >
                                    {t('readStory')}
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default InspirationSection;