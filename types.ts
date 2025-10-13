

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
}

export interface QuizQuestion {
  question: string;
  options: {
    text: string;
    mindset: 'rich' | 'poor' | 'balanced';
  }[];
  feedback: string;
}

export interface UserAnswer {
  questionIndex: number;
  selectedOptionIndex: number;
}

export interface RiskQuestion {
  question: string;
  options: string[];
}

export interface UserRiskAnswer {
  question: string;
  answer: string;
}

export interface RiskProfile {
  profile: string; 
  description: string;
  allocation: {
    stocks: number;
    bonds: number;
  };
  assetComfort: {
    stocks: number;
    bonds: number;
    realEstate: number;
    commodities: number;
  };
  explanation: string;
  overallRiskPercentage: number;
  lossAversionPercentage: number;
  lossAversionExplanation: string;
}

export interface BudgetItem {
  id: string;
  category: string;
  amount: number | string;
  type: 'fixed' | 'variable';
}

export interface BudgetAnalysis {
    explanation: string;
    analysis: string;
    strategies: string[];
}

export interface InvestmentPlan {
  planName: string;
  summary: string;
  assetAllocation: {
    [key: string]: number;
  };
  strategies: string[];
  disclaimer: string;
}

export interface SuccessStory {
  name: string;
  age: number;
  netWorth: string;
  sourceOfWealth: string;
  bio: string;
  story: string;
  startYear: number;
  timeToWealth: string;
  timeline: string;
  lessons: string[];
}

export interface VideoData {
    id: string;
    title: string;
    thumbnail: string;
}

export interface GroundingSource {
    web: {
        uri: string;
        title: string;
    }
}

export interface NewsData {
    text: string;
    sources: GroundingSource[];
}