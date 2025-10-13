import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { HomeIcon, CalculatorIcon, PlanIcon, LoadingIcon, CloseIcon, InfoIcon } from './IconComponents';
import type { BudgetItem, InvestmentPlan, BudgetAnalysis } from '../types';
import { getBudgetSuggestions, createInvestmentPlan, getFixedVariableAnalysis } from '../services/geminiService';
import InvestmentPortfolio, { PortfolioItemData } from './InvestmentPortfolio';
import { logUserAction } from '../utils/logger';

const containerVariants: Variants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: { 
        opacity: 1, 
        scale: 1,
        transition: { duration: 0.5, ease: 'easeInOut' }
    },
    exit: { opacity: 0, scale: 0.98, transition: { duration: 0.3, ease: 'easeInOut' } }
};

const BudgetCalculator: React.FC = () => {
    const { language, t } = useLanguage();
    const [income, setIncome] = useState<number | ''>('');
    const [expenses, setExpenses] = useState<BudgetItem[]>([{ id: Date.now().toString(), category: '', amount: '', type: 'variable' }]);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [analysis, setAnalysis] = useState<BudgetAnalysis | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleExpenseChange = (id: string, field: 'category' | 'amount' | 'type', value: string) => {
        setExpenses(expenses.map(exp => exp.id === id ? { ...exp, [field]: value } : exp));
    };

    const addExpense = () => {
        setExpenses([...expenses, { id: Date.now().toString(), category: '', amount: '', type: 'variable' }]);
    };
    
    const removeExpense = (id: string) => {
        setExpenses(expenses.filter(exp => exp.id !== id));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        logUserAction('Budget Analysis Requested', { income, numExpenses: expenses.length });
        setIsLoading(true);
        setError(null);
        setSuggestions([]);
        setAnalysis(null);
        const validExpenses = expenses
            .filter(e => e.category && parseFloat(e.amount as string) > 0)
            .map(e => ({...e, amount: parseFloat(e.amount as string)}));

        try {
            const [suggestionsResult, analysisResult] = await Promise.all([
                getBudgetSuggestions(income as number, validExpenses, language),
                getFixedVariableAnalysis(validExpenses, language)
            ]);
            setSuggestions(suggestionsResult);
            setAnalysis(analysisResult);
            logUserAction('Budget Analysis Succeeded');
        } catch (err) {
            setError(t('errorOccurred'));
            logUserAction('Budget Analysis Failed', { error: err });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="mt-6">
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-1">{t('monthlyIncome')}</label>
                        <input type="number" value={income} onChange={e => setIncome(Number(e.target.value))} placeholder="3000" className="w-full p-2 rounded-md bg-light-secondary dark:bg-dark-secondary border border-light-border dark:border-dark-border" required />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">{t('monthlyExpenses')}</label>
                        <div className="space-y-2">
                        {expenses.map((exp) => (
                            <div key={exp.id} className="grid grid-cols-[1fr_1fr_auto_auto] gap-2 items-center">
                                <input type="text" value={exp.category} onChange={e => handleExpenseChange(exp.id, 'category', e.target.value)} placeholder={t('expenseCategory')} className="w-full p-2 rounded-md bg-light-secondary dark:bg-dark-secondary border border-light-border dark:border-dark-border" required />
                                <input type="number" value={exp.amount} onChange={e => handleExpenseChange(exp.id, 'amount', e.target.value)} placeholder={t('amount')} className="w-full p-2 rounded-md bg-light-secondary dark:bg-dark-secondary border border-light-border dark:border-dark-border" required />
                                <select value={exp.type} onChange={e => handleExpenseChange(exp.id, 'type', e.target.value)} className="p-2 rounded-md bg-light-secondary dark:bg-dark-secondary border border-light-border dark:border-dark-border text-sm">
                                    <option value="variable">{t('variable')}</option>
                                    <option value="fixed">{t('fixed')}</option>
                                </select>
                                <button type="button" onClick={() => removeExpense(exp.id)} className="text-red-500 hover:text-red-700 disabled:opacity-50" disabled={expenses.length === 1}>
                                    <CloseIcon className="w-5 h-5" />
                                </button>
                            </div>
                        ))}
                        </div>
                        <button type="button" onClick={addExpense} className="mt-3 text-sm font-semibold text-cyan-600 hover:text-cyan-800">{t('addExpense')}</button>
                    </div>
                </div>
                <button type="submit" disabled={isLoading} className="mt-6 w-full flex justify-center items-center px-6 py-3 bg-light-primary hover:bg-light-primary-hover dark:bg-dark-primary dark:hover:dark-primary-hover text-light-primary-text dark:text-dark-primary-text font-bold rounded-full text-lg shadow-lg disabled:opacity-50">
                    {isLoading ? <LoadingIcon /> : t('getSuggestions')}
                </button>
            </form>
            {(suggestions.length > 0 || analysis || error) && (
                 <div className="mt-8">
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    {analysis && (
                        <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{delay: 0.2}} className="p-4 bg-light-secondary dark:bg-dark-secondary rounded-lg border border-light-border dark:border-dark-border mb-4">
                            <h3 className="text-xl font-bold mb-3 text-light-text dark:text-dark-text">{t('fixedVsVariableTitle')}</h3>
                            <p className="text-sm text-light-text/80 dark:text-dark-text/80 mb-2">{analysis.explanation}</p>
                            <p className="italic text-light-text/90 dark:text-dark-text/90 mb-3">{analysis.analysis}</p>
                            <ul className="space-y-2 list-disc list-inside text-light-text/90 dark:text-dark-text/90 text-sm">
                                {analysis.strategies.map((s,i) => <li key={i}>{s}</li>)}
                            </ul>
                        </motion.div>
                    )}
                    {suggestions.length > 0 && (
                        <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{delay: 0.4}} className="p-4 bg-light-secondary dark:bg-dark-secondary rounded-lg border border-light-border dark:border-dark-border">
                            <h3 className="text-xl font-bold mb-2 text-light-text dark:text-dark-text">{t('aiBudgetAnalysis')}</h3>
                            <ul className="space-y-2 list-disc list-inside text-light-text/90 dark:text-dark-text/90">
                                {suggestions.map((s, i) => <li key={i}>{s}</li>)}
                            </ul>
                        </motion.div>
                    )}
                </div>
            )}
        </div>
    );
};

const InvestmentPlanner: React.FC<{onSetView: (view: 'riskQuiz') => void}> = ({ onSetView }) => {
    const { language, t } = useLanguage();
    const [details, setDetails] = useState({ goal: '', target: '', timeline: '', initial: '', monthly: '', risk: 'Medium' });
    const [plan, setPlan] = useState<InvestmentPlan | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setDetails({ ...details, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        logUserAction('Investment Plan Requested', details);
        setIsLoading(true);
        setError(null);
        setPlan(null);
        try {
            const numericDetails = {
                goal: details.goal,
                target: Number(details.target),
                timeline: Number(details.timeline),
                initial: Number(details.initial),
                monthly: Number(details.monthly),
                risk: details.risk
            };
            const result = await createInvestmentPlan(numericDetails, language);
            setPlan(result);
            logUserAction('Investment Plan Succeeded');
        } catch (err) {
            setError(t('errorOccurred'));
            logUserAction('Investment Plan Failed', { error: err });
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="mt-6">
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input name="goal" value={details.goal} onChange={handleChange} placeholder={t('investmentGoal')} className="md:col-span-2 p-2 rounded-md bg-light-secondary dark:bg-dark-secondary border border-light-border dark:border-dark-border" required />
                    <input name="target" type="number" value={details.target} onChange={handleChange} placeholder={t('targetAmount')} className="p-2 rounded-md bg-light-secondary dark:bg-dark-secondary border border-light-border dark:border-dark-border" required />
                    <input name="timeline" type="number" value={details.timeline} onChange={handleChange} placeholder={t('investmentTimeline')} className="p-2 rounded-md bg-light-secondary dark:bg-dark-secondary border border-light-border dark:border-dark-border" required />
                    <input name="initial" type="number" value={details.initial} onChange={handleChange} placeholder={t('initialInvestment')} className="p-2 rounded-md bg-light-secondary dark:bg-dark-secondary border border-light-border dark:border-dark-border" required />
                    <input name="monthly" type="number" value={details.monthly} onChange={handleChange} placeholder={t('monthlyContribution')} className="p-2 rounded-md bg-light-secondary dark:bg-dark-secondary border border-light-border dark:border-dark-border" required />
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-1">{t('riskTolerance')}</label>
                        <select name="risk" value={details.risk} onChange={handleChange} className="w-full p-2 rounded-md bg-light-secondary dark:bg-dark-secondary border border-light-border dark:border-dark-border">
                            <option value="Low">{t('low')}</option>
                            <option value="Medium">{t('medium')}</option>
                            <option value="High">{t('high')}</option>
                        </select>
                        <p className="text-xs text-light-text/70 dark:text-dark-text/70 mt-2 text-center">
                            Not sure about your risk tolerance? <button type="button" onClick={() => onSetView('riskQuiz')} className="text-cyan-600 dark:text-cyan-400 font-semibold hover:underline">Take the investor profile quiz</button>
                        </p>
                    </div>
                </div>
                <button type="submit" disabled={isLoading} className="mt-6 w-full flex justify-center items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full text-lg shadow-lg disabled:opacity-50">
                     {isLoading ? <LoadingIcon /> : t('generatePlan')}
                </button>
            </form>
             {(plan || error) && (
                 <div className="mt-8 p-4 bg-light-secondary dark:bg-dark-secondary rounded-lg border border-light-border dark:border-dark-border">
                    <h3 className="text-xl font-bold mb-2 text-light-text dark:text-dark-text">{plan?.planName || t('yourInvestmentPlan')}</h3>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    {plan && <>
                    <p className="text-light-text/80 dark:text-dark-text/80 mb-4">{plan.summary}</p>
                    <h4 className="font-semibold mb-2 text-light-text dark:text-dark-text">{t('assetAllocation')}</h4>
                    <div className="w-full bg-light-border dark:bg-dark-border/50 rounded-full h-6 flex overflow-hidden mb-2">
                        {Object.keys(plan.assetAllocation).map((key, i) => {
                            const value = plan.assetAllocation[key];
                            return value > 0 ? (
                                <div key={key} className={`flex items-center justify-center text-white text-xs font-bold ${['bg-indigo-500', 'bg-blue-400', 'bg-teal-500', 'bg-amber-500'][i % 4]}`} style={{width: `${value}%`}}>
                                    {value > 10 ? `${value}%` : ''}
                                </div>
                            ) : null;
                        })}
                    </div>
                     <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-light-text/80 dark:text-dark-text/80 mb-4">
                         {Object.keys(plan.assetAllocation).map((key, i) => (
                              <div key={key} className="flex items-center gap-1.5"><span className={`w-2 h-2 rounded-full ${['bg-indigo-500', 'bg-blue-400', 'bg-teal-500', 'bg-amber-500'][i % 4]}`}></span>{key}</div>
                         ))}
                     </div>
                     <h4 className="font-semibold mb-2 text-light-text dark:text-dark-text">{t('strategies')}</h4>
                     <ul className="space-y-2 list-disc list-inside text-light-text/90 dark:text-dark-text/90 mb-4">
                        {plan.strategies.map((s, i) => <li key={i}>{s}</li>)}
                    </ul>
                    <p className="text-xs text-light-text/60 dark:text-dark-text/60"><strong>{t('disclaimer')}:</strong> {plan.disclaimer}</p>
                    </>}
                 </div>
            )}
        </div>
    );
};

const BudgetStrategy: React.FC = () => {
    const { t } = useLanguage();
    const [hoveredItem, setHoveredItem] = useState<PortfolioItemData | null>(null);

    const portfolioData: PortfolioItemData[] = [
        { titleKey: 'portfolioNeedsTitle', descKey: 'portfolioNeedsDesc', percentage: 50, color: 'bg-cyan-500' },
        { titleKey: 'portfolioWantsTitle', descKey: 'portfolioWantsDesc', percentage: 30, color: 'bg-blue-500' },
        { titleKey: 'portfolioSavingsTitle', descKey: 'portfolioSavingsDesc', percentage: 20, color: 'bg-indigo-500' },
    ];

    return (
        <div className="mt-6 text-center">
            <h3 className="text-2xl font-bold text-light-text dark:text-dark-text mb-2">{t('investmentStrategyTitle')}</h3>
            <p className="text-light-text/80 dark:text-dark-text/80 mb-8 max-w-2xl mx-auto">{t('investmentStrategySubtitle')}</p>
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
               <InvestmentPortfolio data={portfolioData} onHover={setHoveredItem} />
               <div className="w-full lg:w-1/3 text-left rtl:text-right min-h-[120px] flex flex-col items-center lg:items-start justify-center">
                    <AnimatePresence mode="wait">
                    <motion.div
                        key={hoveredItem ? hoveredItem.titleKey : 'initial'}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        {hoveredItem ? (
                            <div>
                                <h3 className={`text-2xl font-bold ${hoveredItem.color.replace('bg-', 'text-')}`}>{t(hoveredItem.titleKey)} ({hoveredItem.percentage}%)</h3>
                                <p className="text-light-text/80 dark:text-dark-text/80 mt-2">{t(hoveredItem.descKey)}</p>
                            </div>
                        ) : (
                             <p className="text-light-text/70 dark:text-dark-text/70">{t('investmentStrategySubtitle')}</p>
                        )}
                    </motion.div>
                   </AnimatePresence>
               </div>
            </div>
        </div>
    );
};

interface FinancialToolsSectionProps {
    onDone: () => void;
    onSetView: (view: 'riskQuiz') => void;
}

const FinancialToolsSection: React.FC<FinancialToolsSectionProps> = ({ onDone, onSetView }) => {
    const { t } = useLanguage();
    const [activeTool, setActiveTool] = useState<'budget' | 'investment' | 'strategy'>('budget');

    return (
        <section className="min-h-screen py-20 px-4 flex items-center justify-center">
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full max-w-4xl mx-auto bg-light-card/30 dark:bg-dark-card/30 backdrop-blur-xl border border-light-border/50 dark:border-dark-border/50 rounded-2xl p-6 sm:p-8 shadow-2xl relative"
            >
                <button onClick={onDone} className="absolute top-4 ltr:right-4 rtl:left-4 text-light-text/70 hover:text-light-text dark:text-dark-text/70 dark:hover:text-dark-text">
                    <HomeIcon />
                </button>
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-extrabold text-light-text dark:text-dark-text">{t('financialTools')}</h2>
                </div>
                
                <div className="flex justify-center border-b border-light-border dark:border-dark-border mb-4">
                    <TabButton 
                        title={t('budgetCalculator')} 
                        isActive={activeTool === 'budget'} 
                        onClick={() => setActiveTool('budget')}
                        icon={<CalculatorIcon className="w-5 h-5" />}
                    />
                    <TabButton 
                        title={t('investmentPlanner')}
                        isActive={activeTool === 'investment'} 
                        onClick={() => setActiveTool('investment')}
                        icon={<PlanIcon className="w-5 h-5" />}
                    />
                     <TabButton 
                        title={t('budgetStrategy')}
                        isActive={activeTool === 'strategy'} 
                        onClick={() => setActiveTool('strategy')}
                        icon={<InfoIcon className="w-5 h-5" />}
                    />
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTool}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        {activeTool === 'budget' && <BudgetCalculator />}
                        {activeTool === 'investment' && <InvestmentPlanner onSetView={onSetView} />}
                        {activeTool === 'strategy' && <BudgetStrategy />}
                    </motion.div>
                </AnimatePresence>

            </motion.div>
        </section>
    );
};

const TabButton = ({ title, isActive, onClick, icon }: { title: string, isActive: boolean, onClick: () => void, icon: React.ReactNode }) => (
    <button 
        onClick={onClick}
        className={`flex items-center gap-2 px-4 py-2 text-sm sm:text-base font-semibold transition-colors border-b-2 ${isActive ? 'border-cyan-500 text-cyan-500' : 'border-transparent text-light-text/60 dark:text-dark-text/60 hover:text-light-text dark:hover:text-dark-text'}`}
    >
        {icon}
        {title}
    </button>
);


export default FinancialToolsSection;