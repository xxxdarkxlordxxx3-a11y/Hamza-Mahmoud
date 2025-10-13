import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export interface PortfolioItemData {
    titleKey: string;
    descKey: string;
    percentage: number;
    color: string;
}

interface InvestmentPortfolioProps {
    data: PortfolioItemData[];
    onHover: (item: PortfolioItemData | null) => void;
}

const PortfolioBlock: React.FC<{ item: PortfolioItemData, onHover: (item: PortfolioItemData | null) => void }> = ({ item, onHover }) => {
    const { t } = useLanguage();
    return (
        <motion.div
            className={`relative flex items-center justify-center p-2 text-white font-bold text-lg cursor-pointer overflow-hidden w-full h-full ${item.color}`}
            onHoverStart={() => onHover(item)}
            onHoverEnd={() => onHover(null)}
            whileHover={{ scale: 1.05, zIndex: 10 }}
            transition={{ type: 'spring', stiffness: 300 }}
        >
            <div className="text-center">
                <p>{t(item.titleKey)}</p>
                <p className="text-sm opacity-80">{item.percentage}%</p>
            </div>
        </motion.div>
    );
};

const InvestmentPortfolio: React.FC<InvestmentPortfolioProps> = ({ data, onHover }) => {
    const [needs, wants, savings] = data; // 50, 30, 20

    return (
        <div 
            className="w-full max-w-sm h-72 sm:h-80 mx-auto bg-light-card/60 dark:bg-dark-card/60 p-2 rounded-2xl shadow-lg border border-light-border dark:border-dark-border"
        >
            <div className="flex w-full h-full rounded-lg overflow-hidden">
                {/* Left side: 50% */}
                <div className="flex" style={{ flexBasis: '50%' }}>
                   <PortfolioBlock item={needs} onHover={onHover} />
                </div>
                {/* Right side: 50% container for 30% and 20% */}
                <div className="flex flex-col" style={{ flexBasis: '50%' }}>
                    {/* Wants: 30% of total area = 60% of this container's height */}
                    <div className="flex" style={{ flexBasis: '60%' }}>
                         <PortfolioBlock item={wants} onHover={onHover} />
                    </div>
                    {/* Savings: 20% of total area = 40% of this container's height */}
                    <div className="flex" style={{ flexBasis: '40%' }}>
                        <PortfolioBlock item={savings} onHover={onHover} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvestmentPortfolio;