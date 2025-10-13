import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import InvestmentPortfolio, { PortfolioItemData } from './InvestmentPortfolio';

interface InvestmentStrategySectionProps {
    onSetView: (view: 'riskQuiz') => void;
}

const InvestmentStrategySection: React.FC<InvestmentStrategySectionProps> = ({ onSetView }) => {
    const { t } = useLanguage();
    const [hoveredItem, setHoveredItem] = useState<PortfolioItemData | null>(null);

    const portfolioData: PortfolioItemData[] = [
        {
            titleKey: 'portfolioNeedsTitle',
            descKey: 'portfolioNeedsDesc',
            percentage: 50,
            color: 'bg-cyan-500',
        },
        {
            titleKey: 'portfolioWantsTitle',
            descKey: 'portfolioWantsDesc',
            percentage: 30,
            color: 'bg-blue-500',
        },
        {
            titleKey: 'portfolioSavingsTitle',
            descKey: 'portfolioSavingsDesc',
            percentage: 20,
            color: 'bg-indigo-500',
        },
    ];

    return (
        <section id="portfolio" className="py-20 px-4">
            <div className="container mx-auto text-center">
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-light-text dark:text-dark-text mb-4">{t('investmentStrategyTitle')}</h2>
                <p className="text-lg text-light-text/80 dark:text-dark-text/80 mb-12 max-w-2xl mx-auto">{t('investmentStrategySubtitle')}</p>
                
                <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
                   <InvestmentPortfolio data={portfolioData} onHover={setHoveredItem} />
                   <div className="w-full lg:w-1/3 text-left rtl:text-right min-h-[120px] flex flex-col items-center lg:items-start">
                        {hoveredItem ? (
                            <div>
                                <h3 className={`text-2xl font-bold ${hoveredItem.color.replace('bg-', 'text-')}`}>{t(hoveredItem.titleKey)} ({hoveredItem.percentage}%)</h3>
                                <p className="text-light-text/80 dark:text-dark-text/80 mt-2">{t(hoveredItem.descKey)}</p>
                            </div>
                        ) : (
                             <p className="text-light-text/70 dark:text-dark-text/70">{t('investmentStrategySubtitle')}</p>
                        )}
                   </div>
                </div>
                 <div className="mt-16">
                     <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-light-text dark:text-dark-text mb-4">{t('riskAnalysisTitle')}</h2>
                     <p className="text-lg text-light-text/80 dark:text-dark-text/80 mb-8 max-w-2xl mx-auto">{t('riskAnalysisSubtitle')}</p>
                     <button
                        onClick={() => onSetView('riskQuiz')}
                        className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold rounded-full text-lg shadow-lg shadow-indigo-500/30 transform transition-all duration-300 hover:scale-105"
                    >
                        {t('startRiskAnalysis')}
                    </button>
                 </div>
            </div>
        </section>
    );
};

export default InvestmentStrategySection;