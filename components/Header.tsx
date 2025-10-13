import React from 'react';
import ThemeToggle from './ThemeToggle';
import { useLanguage } from '../context/LanguageContext';
import { BrainIcon } from './IconComponents';

const Header: React.FC = () => {
    const { language, setLanguage, t } = useLanguage();

    const toggleLanguage = () => {
        const newLang = language === 'en' ? 'ar' : 'en';
        setLanguage(newLang);
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-light-border dark:border-dark-border bg-light-bg/80 dark:bg-dark-bg/80 backdrop-blur-sm">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <a href="/" className="flex items-center gap-2" aria-label="Go to homepage">
                    <BrainIcon />
                    <span className="text-xl font-bold text-light-text dark:text-dark-text">{t('title').split(':')[0]}</span>
                </a>
                <div className="flex items-center gap-4">
                    <ThemeToggle />
                    <button
                        onClick={toggleLanguage}
                        className="bg-light-secondary dark:bg-dark-secondary hover:bg-light-border dark:hover:bg-dark-border/50 text-light-text dark:text-dark-text font-bold py-2 px-4 rounded-lg transition-colors duration-300"
                        aria-label="Toggle Language"
                    >
                        {language === 'en' ? 'العربية' : 'English'}
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
