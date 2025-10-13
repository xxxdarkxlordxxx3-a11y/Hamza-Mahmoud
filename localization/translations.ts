import React from 'react';
import { AssetIcon, WorkIcon, LearnIcon, CashflowIcon, RiskIcon, TaxIcon } from '../components/IconComponents';
import type { QuizQuestion, RiskQuestion, SuccessStory, VideoData } from '../types';

interface Concept {
  icon: React.ReactNode;
  title: string;
  poorMindset: string;
  richMindset: string;
}

interface Translations {
  [key: string]: {
    ui: { [key: string]: string };
    concepts: Concept[];
    quiz: QuizQuestion[];
    riskQuiz: RiskQuestion[];
    successStories: SuccessStory[];
    videos: VideoData[];
  };
}

export const translations: Translations = {
  en: {
    ui: {
      appLogoName: 'Rich Mindset',
      appTitle: 'Rich Mindset: Financial Freedom',
      subtitle: 'Master the principles of wealth creation and build your path to financial independence. Inspired by "Rich Dad Poor Dad".',
      takeTheQuiz: 'Test Your Financial IQ',
      exploreFeatures: 'Explore Features',
      hideFeatures: 'Hide Features',
      coreConcepts: 'Core Concepts of Financial Literacy',
      poorMindset: 'Poor Mindset',
      richMindset: 'Rich Mindset',
      chatTitle: 'AI Financial Assistant',
      chatPlaceholder: 'Voice input is active...',
      chatGreeting: "Hello! I'm your voice-enabled AI financial assistant. When you're ready, just start speaking. I'm listening.",
      endConversation: "End Conversation",
      listening: "Listening...",
      connecting: "Connecting...",
      micPermissionDenied: "Microphone access is required for voice chat. Please enable it in your browser settings.",
      micPermissionPrompt: "Please allow microphone access to begin.",
      quizTitle: 'What\'s Your Financial Mindset?',
      quizIntro: 'Discover if you think like the rich. This short quiz will reveal your core beliefs about money and wealth.',
      question: 'Question',
      of: 'of',
      next: 'Next',
      back: 'Back',
      finish: 'Finish Quiz',
      resultsTitle: 'Your Mindset Analysis',
      resultsIntro: 'Your score indicates a mindset that is:',
      richMindsetResult: 'Primarily a Rich Mindset',
      balancedMindsetResult: 'A Balanced Mindset',
      poorMindsetResult: 'Primarily a Poor Mindset',
      resultsSubtitle: 'Opportunities for Growth',
      resultsExplanation: 'Here are the areas where your thinking differs from the "rich mindset." Understanding these is the first step toward change.',
      yourAnswer: 'Your Answer',
      richDadAlternative: 'Rich Mindset Alternative',
      retakeQuiz: 'Retake Quiz',
      goBackHome: 'Back to Home',
      quizGenerationError: 'Could not generate new questions. Using fallback quiz.',
      generatingQuiz: 'Generating your personalized quiz...',
      investmentStrategyTitle: 'The 50/30/20 Budget Rule',
      investmentStrategySubtitle: 'A simple, effective strategy for managing your money. Hover over the blocks to learn more.',
      portfolioNeedsTitle: 'Needs',
      portfolioNeedsDesc: '50% of your income for essentials like housing, food, and utilities.',
      portfolioWantsTitle: 'Wants',
      portfolioWantsDesc: '30% of your income for lifestyle choices like dining out, hobbies, and entertainment.',
      portfolioSavingsTitle: 'Savings & Investments',
      portfolioSavingsDesc: '20% of your income for building wealth, paying off debt, and securing your future.',
      riskAnalysisTitle: 'Understand Your Investor Profile',
      riskAnalysisSubtitle: 'Your risk tolerance is key to building a successful investment portfolio. Let\'s find yours.',
      startRiskAnalysis: 'Start Risk Analysis',
      enterYourAge: 'First, please enter your age',
      age: 'Age',
      continue: 'Continue',
      analyzingResults: 'Analyzing your profile...',
      riskProfileTitle: 'Your Investor Profile',
      overallRiskProfile: 'Overall Risk Score',
      assetAllocation: 'Suggested Asset Allocation',
      stocks: 'Stocks',
      bonds: 'Bonds',
      realEstate: 'Real Estate',
      commodities: 'Commodities',
      riskToleranceByAsset: 'Risk Tolerance by Asset',
      whatIsAgeRule: 'What is the "100 - Age" Rule?',
      errorOccurred: 'An error occurred. Please try again.',
      financialTools: 'Financial Tools',
      budgetCalculator: 'Budget Calculator',
      investmentPlanner: 'Investment Planner',
      budgetStrategy: 'Budget Strategy',
      monthlyIncome: 'Monthly Income (after tax)',
      monthlyExpenses: 'Monthly Expenses',
      expenseCategory: 'e.g., Rent, Groceries',
      amount: 'Amount',
      addExpense: '+ Add Expense',
      getSuggestions: 'Get AI Budget Analysis',
      aiBudgetAnalysis: 'AI Budget Analysis',
      lossAversionAnalysis: 'Loss Aversion Analysis',
      fixed: 'Fixed',
      variable: 'Variable',
      fixedVsVariableTitle: 'Fixed vs. Variable Expense Analysis',
      investmentGoal: 'Investment Goal (e.g., Buy a house, Retirement)',
      targetAmount: 'Target Amount ($)',
      investmentTimeline: 'Timeline (in years)',
      initialInvestment: 'Initial Investment ($)',
      monthlyContribution: 'Monthly Contribution ($)',
      riskTolerance: 'Risk Tolerance',
      low: 'Low',
      medium: 'Medium',
      high: 'High',
      generatePlan: 'Generate Investment Plan',
      yourInvestmentPlan: 'Your Investment Plan',
      strategies: 'Recommended Strategies',
      disclaimer: 'Disclaimer',
      educationalContent: 'Educational Content',
      educationalContentSubtitle: 'Deepen your financial knowledge with curated videos from leading experts.',
      inspirationTitle: 'Inspiring Journeys',
      inspirationSubtitle: 'Learn from the titans of industry. Real stories from entrepreneurs who achieved extraordinary financial success.',
      sortByWealth: 'Sort by Wealth',
      sortByExperience: 'Sort by Experience',
      netWorth: 'Net Worth',
      readStory: 'Read Full Story',
      careerStart: 'Career Start',
      timeline: 'Timeline',
      lessons: 'Key Lessons',
      financialNewsTitle: 'Latest Financial News',
      financialNewsSubtitle: 'Stay updated with the latest news from the financial world, powered by Google Search.',
      getLatestNews: 'Get Latest News',
      newsSources: 'Sources',
      foundersPage: "Founder's Page",
      easterEggTitle: 'The Eighth Wonder of the World',
      easterEggContent1: 'Albert Einstein reportedly called compound interest the eighth wonder of the world. "He who understands it," he said, "earns it... he who doesn\'t... pays it."',
      easterEggContent2: 'You noticed that many of these inspiring figures took decades to build their immense wealth. True financial success isn\'t about getting rich quick; it\'s about patience, consistency, and the magic of long-term, compound growth. The best time to plant a tree was 20 years ago. The second best time is now.',
      quizSelectionTitle: 'Choose Your Challenge',
      mindsetQuizTitle: 'Financial Mindset Quiz',
      mindsetQuizDesc: "Discover if you think like the wealthy. Based on principles from 'Rich Dad Poor Dad'.",
      budgetingQuizTitle: 'Budgeting Habits Quiz',
      budgetingQuizDesc: 'Evaluate your daily spending and saving habits to find opportunities for growth.',
      investmentQuizTitle: 'Investment Knowledge Quiz',
      investmentQuizDesc: 'Test your understanding of core investment concepts like stocks, bonds, and diversification.',
      startTest: 'Start Test',
    },
    concepts: [
      {
        icon: React.createElement(AssetIcon),
        title: 'Assets vs. Liabilities',
        poorMindset: 'Buys liabilities they think are assets, like expensive cars or gadgets, which take money out of their pocket.',
        richMindset: 'Focuses on acquiring income-generating assets, like real estate or stocks, that put money into their pocket.',
      },
      {
        icon: React.createElement(WorkIcon),
        title: 'Working for Money vs. Money Working for You',
        poorMindset: 'Trades time for money (a salary). If they stop working, their income stops.',
        richMindset: 'Builds systems and investments where their money works for them, generating passive income 24/7.',
      },
      {
        icon: React.createElement(LearnIcon),
        title: 'Financial Education',
        poorMindset: 'Believes formal education is enough. Stops learning about money after school.',
        richMindset: 'Commits to lifelong financial learning, constantly seeking knowledge about investing, markets, and money management.',
      },
      {
        icon: React.createElement(CashflowIcon),
        title: 'Understanding Cashflow',
        poorMindset: 'Focuses on their salary (income) and bills (expenses), often living paycheck to paycheck.',
        richMindset: 'Understands the full cashflow pattern: how assets generate income to cover expenses and fund more asset purchases.',
      },
      {
        icon: React.createElement(RiskIcon),
        title: 'Managing Risk',
        poorMindset: 'Views investing as too risky and avoids it, preferring the "safety" of a savings account where money loses value to inflation.',
        richMindset: 'Learns to manage and leverage risk through knowledge and calculated decisions, understanding that not investing is the biggest risk.',
      },
      {
          icon: React.createElement(TaxIcon),
          title: 'Tax Efficiency',
          poorMindset: 'Earns, pays taxes, then spends. Has little control over their tax burden.',
          richMindset: 'Structures their finances (often through corporations) to earn, spend, and then pay taxes, legally minimizing their tax liability.',
      }
    ],
    quiz: [
      {
        question: 'When you receive an unexpected bonus at work, what is your first thought?',
        options: [
          { text: 'Look for an asset to invest it in, like stocks or real estate.', mindset: 'rich' },
          { text: 'Plan a vacation or buy a new gadget I\'ve been wanting.', mindset: 'poor' },
          { text: 'Put half in savings and use the other half for something fun.', mindset: 'balanced' },
          { text: 'Use it to pay off some high-interest debt.', mindset: 'balanced' },
        ],
        feedback: 'The rich mindset immediately seeks to turn earned income into passive income by acquiring assets.',
      },
       {
        question: 'What does the word "risk" mean to you in a financial context?',
        options: [
          { text: 'Something to be avoided at all costs. It\'s better to be safe.', mindset: 'poor' },
          { text: 'A necessary component of wealth-building that can be managed with knowledge.', mindset: 'rich' },
          { text: 'I\'m okay with some risk, but I prefer safer, more guaranteed returns.', mindset: 'balanced' },
          { text: 'It depends on the specific investment and my understanding of it.', mindset: 'balanced' },
        ],
        feedback: 'The wealthy don\'t avoid risk, they learn to manage it. They understand that financial ignorance, not risk, is the real problem.',
      },
      {
        question: 'How do you view your primary home?',
        options: [
            { text: 'It\'s my biggest asset.', mindset: 'poor' },
            { text: 'It\'s a liability because it takes money out of my pocket every month.', mindset: 'rich' },
            { text: 'It\'s a place to live, but I hope its value increases over time.', mindset: 'balanced' },
            { text: 'It\'s a form of forced savings that builds equity.', mindset: 'balanced' },
        ],
        feedback: 'The rich mindset clearly distinguishes between assets (put money in your pocket) and liabilities (take money out). A primary home is a liability.',
       },
       {
        question: 'When it comes to financial knowledge:',
        options: [
            { text: 'I rely on my financial advisor or bank to handle things for me.', mindset: 'poor' },
            { text: 'I\'m committed to continuously learning about money, investing, and markets.', mindset: 'rich' },
            { text: 'I read occasional articles but don\'t actively study finance.', mindset: 'balanced' },
            { text: 'I ask financially successful friends for their opinions.', mindset: 'balanced' },
        ],
        feedback: 'Financial freedom requires financial education. The rich make it a priority to be financially literate.',
       },
       {
        question: 'Your company offers a new training program. You think:',
        options: [
            { text: '"How can this new skill increase my income and help me acquire more assets?"', mindset: 'rich' },
            { text: '"Is this required? I\'m busy enough with my current work."', mindset: 'poor' },
            { text: '"It might be useful for my career progression and a potential raise."', mindset: 'balanced' },
            { text: '"I\'ll consider it if it aligns with my personal interests."', mindset: 'balanced' },
        ],
        feedback: 'The rich see learning as a tool for creating more income and opportunities, not just for job security or a simple pay raise.',
       }
    ],
    riskQuiz: [
        {
            question: "You're given $10,000. What do you do with it?",
            options: ["Put it in a high-yield savings account.", "Invest in a diversified mix of blue-chip stocks and bonds.", "Invest in a promising but volatile tech startup.", "Use it to start your own business venture."]
        },
        {
            question: "An investment you made has dropped 20% in a month. What's your reaction?",
            options: ["Sell immediately to cut my losses.", "Hold and wait for it to recover.", "Buy more, as it's now on sale.", "Re-evaluate the company's fundamentals before making a decision."]
        },
        {
            question: "Which statement best describes your investment goal?",
            options: ["Preserve my capital with minimal risk.", "Achieve steady growth over the long term, accepting some market fluctuations.", "Maximize my returns, even if it means taking on significant risk.", "Generate a regular income stream from my investments."]
        },
        {
            question: "How comfortable are you with complex financial products like options or cryptocurrencies?",
            options: ["Not comfortable at all, I avoid them.", "I'm curious but would need a lot of guidance.", "I'm willing to allocate a small portion of my portfolio to them.", "I actively trade or invest in them."]
        },
        {
            question: "Imagine you're planning for retirement. What is your primary concern?",
            options: ["Not losing the money I've saved.", "Ensuring my savings outpace inflation.", "Having enough money to live a luxurious lifestyle.", "Creating a legacy to pass on to my heirs."]
        },
        {
            question: "What is your preferred time horizon for seeing returns on an investment?",
            options: ["Less than a year.", "1-3 years.", "3-5 years.", "More than 5 years."]
        },
        {
            question: "If you had to choose between two investments, which would you pick?",
            options: ["One with a lower potential return but very low chance of losing money.", "One with a moderate potential return and a moderate chance of losing money.", "One with a high potential return but a high chance of losing money.", "One that is completely new and unproven but could have a massive payoff."]
        },
        {
            question: "How much of your portfolio would you be comfortable putting into a single, high-potential investment?",
            options: ["None, I prefer maximum diversification.", "Less than 5%.", "Between 5% and 15%.", "More than 15%."]
        },
        {
            question: "The stock market is experiencing extreme volatility. You are most likely to:",
            options: ["Move all my investments to cash until things calm down.", "Stay the course with my current long-term strategy.", "Look for buying opportunities in beaten-down stocks.", "Try to time the market by selling at peaks and buying at dips."]
        },
        {
            question: "When thinking about your income, you are more focused on:",
            options: ["The stability and security of a fixed salary.", "A salary with a small, predictable bonus.", "A lower base salary with a high potential for commission or performance bonuses.", "Forgoing a salary to build equity in a new company."]
        }
    ],
    successStories: [
        {
            name: 'Bernard Arnault & family',
            age: 77,
            netWorth: '$177 Billion',
            sourceOfWealth: 'LVMH',
            bio: 'Chairman and CEO of LVMH Moët Hennessy Louis Vuitton, the world\'s leading luxury products group.',
            story: 'Bernard Arnault, an engineering graduate, began his career in his family\'s construction business. In 1984, he acquired a bankrupt textile group that owned Christian Dior, which served as his entry into the luxury market. Through a series of brilliant acquisitions, he built LVMH, an empire of 75 distinguished brands including Louis Vuitton, Tiffany & Co., and Sephora. Known as the "wolf in cashmere," his strategic vision and aggressive business tactics transformed the luxury industry.',
            startYear: 1984,
            timeToWealth: '40 years',
            timeline: '1984: Acquired Boussac, owner of Dior. 1989: Became majority shareholder of LVMH. 2017: Gained full control of Christian Dior. 2021: Completed acquisition of Tiffany & Co.',
            lessons: [
                'Build a portfolio of strong, timeless brands.',
                'Combine creative vision with rigorous financial management.',
                'Decentralize brands to foster creativity and autonomy.',
                'A long-term perspective is essential in luxury.'
            ]
        },
        {
            name: 'Jeff Bezos',
            age: 62,
            netWorth: '$240 Billion',
            sourceOfWealth: 'Amazon',
            bio: 'Founder of Amazon, who turned an online bookstore into the world\'s largest e-commerce and cloud computing company.',
            story: 'In 1994, Jeff Bezos left his lucrative job at a New York hedge fund to start an online bookstore from his garage in Seattle. This was the beginning of Amazon.com. With a relentless focus on customer satisfaction and long-term vision, he expanded Amazon into a vast "everything store," pioneered cloud services with AWS, and ventured into streaming media and AI. He stepped down as CEO in 2021 to focus on other ventures like Blue Origin.',
            startYear: 1994,
            timeToWealth: '30 years',
            timeline: '1994: Founded Amazon. 1997: Amazon goes public. 2005: Launched Amazon Prime. 2006: Launched AWS. 2021: Stepped down as CEO.',
            lessons: [
                'Be customer-obsessed.',
                'It\'s always Day 1; avoid complacency.',
                'Focus on the long-term, even at the expense of short-term profits.',
                'Experiment patiently, accept failures, but double down when you see customer delight.'
            ]
        },
        {
            name: 'Elon Musk',
            age: 54,
            netWorth: '$437 Billion',
            sourceOfWealth: 'Tesla, SpaceX, X',
            bio: 'A visionary entrepreneur revolutionizing transportation, space exploration, and artificial intelligence.',
            story: 'Elon Musk co-founded Zip2, a web software company, which was acquired in 1999. He then founded X.com, which merged to form PayPal and was bought by eBay in 2002. Musk used his fortune to found SpaceX in 2002 and became CEO of Tesla in 2008. His ambitious projects also include Neuralink, The Boring Company, and xAI, aiming to reshape humanity\'s future.',
            startYear: 1995,
            timeToWealth: '29 years',
            timeline: '1995: Co-founded Zip2. 1999: Co-founded X.com (PayPal). 2002: Founded SpaceX. 2008: Became Tesla CEO. 2022: Acquired Twitter (now X).',
            lessons: [
                'Think from first principles, not by analogy.',
                'Work with a sense of extreme urgency.',
                'Embrace ambitious, world-changing goals.',
                'Reinvest your successes into new ventures.'
            ]
        },
        {
            name: 'Mark Zuckerberg',
            age: 42,
            netWorth: '$248 Billion',
            sourceOfWealth: 'Meta (Facebook)',
            bio: 'Co-founder and CEO of Meta Platforms, who built the world\'s largest social network from his Harvard dorm room.',
            story: 'Mark Zuckerberg launched "The Facebook" in 2004 as a way for Harvard students to connect. The platform\'s popularity exploded, and he dropped out of college to run the company. He grew Facebook into a global giant, acquiring Instagram (2012) and WhatsApp (2014). He is now leading the company\'s pivot towards the metaverse, believing it to be the next frontier of digital interaction.',
            startYear: 2004,
            timeToWealth: '20 years',
            timeline: '2004: Launched Facebook. 2012: Acquired Instagram & IPO. 2014: Acquired WhatsApp. 2021: Rebranded company to Meta.',
            lessons: [
                'Move fast and break things.',
                'Focus on building a community, not just a product.',
                'Be willing to make big, long-term bets on the future.',
                'Don\'t be afraid to acquire competitors to consolidate your market position.'
            ]
        },
        {
            name: 'Larry Page',
            age: 53,
            netWorth: '$209 Billion',
            sourceOfWealth: 'Google (Alphabet)',
            bio: 'Co-founder of Google, who created the PageRank algorithm that powered its revolutionary search engine.',
            story: 'While a Ph.D. student at Stanford, Larry Page, along with Sergey Brin, developed a new way to rank search results based on the linking structure of the web. They launched Google in 1998 from a garage. As CEO, Page led Google\'s acquisition of Android and YouTube. In 2015, he became the CEO of Google\'s new parent company, Alphabet, to focus on "moonshot" projects and new technologies, before stepping down in 2019.',
            startYear: 1998,
            timeToWealth: '26 years',
            timeline: '1998: Co-founded Google. 2004: Google IPO. 2006: Acquired YouTube. 2015: Became CEO of Alphabet.',
            lessons: [
                'Focus on the user and all else will follow.',
                'It\'s best to do one thing really, really well.',
                'Don\'t be afraid to pursue ambitious, "10x" ideas.',
                'Organize your company to allow for innovation beyond the core business.'
            ]
        },
        {
            name: 'Bill Gates',
            age: 70,
            netWorth: '$120 Billion',
            sourceOfWealth: 'Microsoft, Investments',
            bio: 'Co-founder of Microsoft, whose vision of "a computer on every desk and in every home" revolutionized personal computing.',
            story: 'Bill Gates dropped out of Harvard to start Microsoft with Paul Allen in 1975. They developed software for the early personal computers, and their big break came with the contract to provide the operating system (MS-DOS) for IBM\'s first PC. Windows went on to become the dominant OS worldwide. Since transitioning from Microsoft, he has dedicated his time and wealth to global health and development through the Bill & Melinda Gates Foundation.',
            startYear: 1975,
            timeToWealth: '49 years',
            timeline: '1975: Co-founded Microsoft. 1985: Released Windows 1.0. 2000: Stepped down as CEO. 2008: Left his full-time role at Microsoft.',
            lessons: [
                'Focus on creating a platform, not just a single product.',
                'Intellectual property is more valuable than physical assets.',
                'Hire very smart people and give them the freedom to work.',
                'Success is a lousy teacher. It seduces smart people into thinking they can\'t lose.'
            ]
        },
        {
            name: 'Sergey Brin',
            age: 52,
            netWorth: '$195 Billion',
            sourceOfWealth: 'Google (Alphabet)',
            bio: 'Co-founder of Google, who was instrumental in its technological development and later led its experimental projects division.',
            story: 'Sergey Brin met Larry Page at Stanford and collaborated on the research project that became Google. As President of Technology, Brin focused on the engineering side of the company and led special projects, including Google Glass and self-driving cars (now Waymo). After the formation of Alphabet, he served as its president, focusing on pioneering new technologies before stepping back from day-to-day operations with Page in 2019.',
            startYear: 1998,
            timeToWealth: '26 years',
            timeline: '1998: Co-founded Google. 2004: Google IPO. 2012: Unveiled Google Glass. 2015: Became President of Alphabet.',
            lessons: [
                'Solving a complex technical problem can create immense value.',
                'Foster a culture of innovation and allow employees to pursue side projects.',
                'Information should be universally accessible and useful.',
                'Don\'t be evil (a core early principle).'
            ]
        },
        {
            name: 'Steve Ballmer',
            age: 70,
            netWorth: '$176 Billion',
            sourceOfWealth: 'Microsoft',
            bio: 'Former CEO of Microsoft, who led the company through its transition from the PC era to the cloud and enterprise era.',
            story: 'Steve Ballmer dropped out of Stanford\'s MBA program in 1980 to join his Harvard friend Bill Gates at Microsoft as its 30th employee. Known for his energetic and passionate leadership style, he succeeded Gates as CEO in 2000. During his tenure, he tripled Microsoft\'s sales and doubled its profits, overseeing the launch of Xbox and the expansion into enterprise software and cloud services with Azure. After retiring, he purchased the LA Clippers NBA team.',
            startYear: 1980,
            timeToWealth: '44 years',
            timeline: '1980: Joined Microsoft. 2000: Became CEO. 2001: Launched Xbox. 2014: Retired from Microsoft and bought the LA Clippers.',
            lessons: [
                'Passion and enthusiasm are critical for leadership.',
                'Persistence is key, even when facing skepticism.',
                'Focus on enterprise customers for stable, long-term revenue.',
                'Know when it\'s time to transition leadership.'
            ]
        },
        {
            name: 'Warren Buffett',
            age: 95,
            netWorth: '$147 Billion',
            sourceOfWealth: 'Berkshire Hathaway',
            bio: 'Known as the "Oracle of Omaha," one of the most successful investors of all time, leading the conglomerate Berkshire Hathaway.',
            story: 'Warren Buffett showed an interest in business and investing at a young age. He studied under Benjamin Graham, the father of value investing. In 1965, he took control of a struggling textile company, Berkshire Hathaway, and transformed it into a massive holding company for his investments. His strategy involves buying stakes in undervalued companies with strong fundamentals and holding them for the long term.',
            startYear: 1956,
            timeToWealth: '68 years',
            timeline: '1956: Started his first investment partnership. 1965: Took control of Berkshire Hathaway. 1988: First invested in Coca-Cola. 2006: Pledged to give away his fortune.',
            lessons: [
                'Rule No. 1: Never lose money. Rule No. 2: Never forget Rule No. 1.',
                'Be fearful when others are greedy and greedy when others are fearful.',
                'It\'s far better to buy a wonderful company at a fair price than a fair company at a wonderful price.',
                'Someone\'s sitting in the shade today because someone planted a tree a long time ago.'
            ]
        },
        {
            name: 'Larry Ellison',
            age: 81,
            netWorth: '$351 Billion',
            sourceOfWealth: 'Oracle',
            bio: 'Co-founder, CTO, and former CEO of Oracle, a software giant that dominated the database market.',
            story: 'Larry Ellison, a college dropout, co-founded Software Development Laboratories in 1977 with a $2,000 investment. They won a contract to build a relational database for the CIA, which they named Oracle. Ellison foresaw the importance of commercial database software and aggressively marketed Oracle to corporations, growing it into a dominant force in enterprise software. He served as CEO for 37 years before stepping into the CTO role.',
            startYear: 1977,
            timeToWealth: '47 years',
            timeline: '1977: Co-founded SDL (later Oracle). 1986: Oracle IPO. 2009: Acquired Sun Microsystems. 2014: Stepped down as CEO.',
            lessons: [
                'It\'s not enough to be the best; you must be the only one.',
                'Focus on sales and marketing as much as engineering.',
                'Growth through acquisition can be a powerful strategy.',
                'Adapt to technological shifts or become obsolete.'
            ]
        },
        {
            name: 'Mukesh Ambani',
            age: 69,
            netWorth: '$97.5 Billion',
            sourceOfWealth: 'Reliance Industries',
            bio: 'Chairman of Reliance Industries, a massive conglomerate with interests in petrochemicals, oil and gas, retail, and telecom.',
            story: 'Mukesh Ambani inherited his father\'s business, Reliance, and has since overseen its massive expansion. He led the construction of the world\'s largest grassroots petroleum refinery. His most disruptive move was launching the 4G phone and broadband service Jio in 2016, which offered free calls and cheap data, fundamentally changing India\'s digital landscape and onboarding hundreds of millions of new internet users.',
            startYear: 1981,
            timeToWealth: '43 years',
            timeline: '1981: Joined Reliance. 2002: Became Chairman. 2005: Formally split assets with his brother. 2016: Launched Jio Infocomm.',
            lessons: [
                'Think big and execute at a massive scale.',
                'Disrupt entire industries by leveraging technology and aggressive pricing.',
                'Vertical integration can create powerful moats.',
                'Identify and invest in the future needs of a massive population.'
            ]
        },
         {
            name: 'Michael Dell',
            age: 61,
            netWorth: '$151 Billion',
            sourceOfWealth: 'Dell Technologies',
            bio: 'Founder of Dell, who pioneered the direct-to-consumer model for selling personal computers.',
            story: 'As a pre-med student at the University of Texas in 1984, Michael Dell started a business upgrading PCs from his dorm room. He dropped out to form Dell Computer Corp., with the revolutionary idea of selling custom-built computers directly to customers, cutting out retailers. This model allowed for lower prices and better inventory management. In 2013, he took Dell private in a massive buyout to restructure the company for the cloud era, later acquiring EMC in 2016 to create Dell Technologies.',
            startYear: 1984,
            timeToWealth: '40 years',
            timeline: '1984: Founded Dell from his dorm room. 1988: Dell IPO. 2013: Took Dell private. 2016: Acquired EMC for $67 billion.',
            lessons: [
                'Innovate the business model, not just the product.',
                'Listen directly to your customers to understand their needs.',
                'An efficient supply chain is a powerful competitive weapon.',
                'Be willing to make bold, transformative moves to stay relevant.'
            ]
        },
        {
            name: 'Jensen Huang',
            age: 63,
            netWorth: '$159 Billion',
            sourceOfWealth: 'Nvidia',
            bio: 'Co-founder and CEO of Nvidia, the company at the heart of the artificial intelligence revolution with its powerful GPUs.',
            story: 'Jensen Huang co-founded Nvidia in 1993 with a vision that GPUs would be essential for more than just video games. He led the company to dominate the gaming graphics card market and then strategically pivoted to make Nvidia\'s chips the go-to hardware for high-performance computing and AI. This foresight positioned Nvidia as a critical player in the AI boom, causing its value to skyrocket.',
            startYear: 1993,
            timeToWealth: '31 years',
            timeline: '1993: Co-founded Nvidia. 1999: Invented the GPU & IPO. 2006: Launched CUDA programming model. 2022: Became a key player in the AI revolution.',
            lessons: [
                'Identify and invest in long-term technology shifts.',
                'Create not just hardware, but an entire ecosystem (like CUDA).',
                'Corporate culture and vision are paramount.',
                'Bet on a market that doesn\'t exist yet.'
            ]
        }
    ],
    videos: [
        { id: '4Jnh5WLqhrY', title: 'Rich Dad Poor Dad (Animated Book Review)', thumbnail: 'https://i.ytimg.com/vi/4Jnh5WLqhrY/hq720.jpg' },
        { id: '4dvXFCUaTG0', title: 'I Will Teach You to Be Rich by Ramit Sethi', thumbnail: 'https://i.ytimg.com/vi/4dvXFCUaTG0/hq720.jpg' },
        { id: '1o5XLZI-IeM', title: 'The Psychology of Money by Morgan Housel', thumbnail: 'https://i.ytimg.com/vi/1o5XLZI-IeM/hq720.jpg' },
        { id: 'oraIrNCTBBA', title: 'The Intelligent Investor by Benjamin Graham', thumbnail: 'https://i.ytimg.com/vi/oraIrNCTBBA/hq720.jpg' },
    ],
  },
  ar: {
    ui: {
      appLogoName: 'عقلية الثري',
      appTitle: 'عقلية الثري: الحرية المالية',
      subtitle: 'أتقن مبادئ تكوين الثروة وابنِ طريقك نحو الاستقلال المالي. مستوحى من كتاب "الأب الغني والأب الفقير".',
      takeTheQuiz: 'اختبر ذكاءك المالي',
      exploreFeatures: 'اكتشف الميزات',
      hideFeatures: 'إخفاء الميزات',
      coreConcepts: 'المفاهيم الأساسية للثقافة المالية',
      poorMindset: 'عقلية الفقير',
      richMindset: 'عقلية الثري',
      chatTitle: 'المساعد المالي الذكي',
      chatPlaceholder: 'الإدخال الصوتي نشط...',
      chatGreeting: 'أهلاً بك! أنا مساعدك المالي الصوتي. عندما تكون مستعداً، ابدأ بالحديث. أنا أستمع.',
      endConversation: "إنهاء المحادثة",
      listening: "أستمع...",
      connecting: "جاري الاتصال...",
      micPermissionDenied: "الوصول إلى الميكروفون مطلوب للمحادثة الصوتية. يرجى تمكينه في إعدادات المتصفح.",
      micPermissionPrompt: "يرجى السماح بالوصول إلى الميكروفون للبدء.",
      quizTitle: 'ما هي عقليتك المالية؟',
      quizIntro: 'اكتشف ما إذا كنت تفكر مثل الأثرياء. هذا الاختبار القصير سيكشف عن معتقداتك الأساسية حول المال والثروة.',
      question: 'سؤال',
      of: 'من',
      next: 'التالي',
      back: 'السابق',
      finish: 'إنهاء الاختبار',
      resultsTitle: 'تحليل عقليتك',
      resultsIntro: 'نتيجتك تشير إلى عقلية:',
      richMindsetResult: 'عقلية ثري في المقام الأول',
      balancedMindsetResult: 'عقلية متوازنة',
      poorMindsetResult: 'عقلية فقير في المقام الأول',
      resultsSubtitle: 'فرص للنمو',
      resultsExplanation: 'هذه هي الجوانب التي يختلف فيها تفكيرك عن "عقلية الثري". فهم هذه النقاط هو الخطوة الأولى نحو التغيير.',
      yourAnswer: 'إجابتك',
      richDadAlternative: 'البديل بعقلية الثري',
      retakeQuiz: 'أعد الاختبار',
      goBackHome: 'العودة للرئيسية',
      quizGenerationError: 'لم نتمكن من إنشاء أسئلة جديدة. سيتم استخدام الاختبار الافتراضي.',
      generatingQuiz: 'جاري إنشاء اختبارك المخصص...',
      investmentStrategyTitle: 'قاعدة الميزانية 50/30/20',
      investmentStrategySubtitle: 'استراتيجية بسيطة وفعالة لإدارة أموالك. مرر الفأرة فوق الأقسام لمعرفة المزيد.',
      portfolioNeedsTitle: 'الاحتياجات',
      portfolioNeedsDesc: '50% من دخلك للأساسيات مثل السكن، الطعام، والفواتير.',
      portfolioWantsTitle: 'الرغبات',
      portfolioWantsDesc: '30% من دخلك لخيارات نمط الحياة مثل المطاعم، الهوايات، والترفيه.',
      portfolioSavingsTitle: 'الادخار والاستثمار',
      portfolioSavingsDesc: '20% من دخلك لبناء الثروة، سداد الديون، وتأمين مستقبلك.',
      riskAnalysisTitle: 'افهم ملفك الاستثماري',
      riskAnalysisSubtitle: 'قدرتك على تحمل المخاطر هي مفتاح بناء محفظة استثمارية ناجحة. دعنا نكتشفها.',
      startRiskAnalysis: 'ابدأ تحليل المخاطر',
      enterYourAge: 'أولاً، الرجاء إدخال عمرك',
      age: 'العمر',
      continue: 'متابعة',
      analyzingResults: 'جاري تحليل ملفك...',
      riskProfileTitle: 'ملفك الاستثماري',
      overallRiskProfile: 'درجة المخاطرة الإجمالية',
      assetAllocation: 'توزيع الأصول المقترح',
      stocks: 'الأسهم',
      bonds: 'السندات',
      realEstate: 'العقارات',
      commodities: 'السلع',
      riskToleranceByAsset: 'تحمل المخاطر حسب الأصل',
      whatIsAgeRule: 'ما هي قاعدة "100 - العمر"؟',
      errorOccurred: 'حدث خطأ. الرجاء المحاولة مرة أخرى.',
      financialTools: 'أدوات مالية',
      budgetCalculator: 'حاسبة الميزانية',
      investmentPlanner: 'مخطط الاستثمار',
      budgetStrategy: 'استراتيجية الميزانية',
      monthlyIncome: 'الدخل الشهري (بعد الضريبة)',
      monthlyExpenses: 'المصروفات الشهرية',
      expenseCategory: 'مثال: إيجار، بقالة',
      amount: 'المبلغ',
      addExpense: '+ إضافة مصروف',
      getSuggestions: 'احصل على تحليل الميزانية',
      aiBudgetAnalysis: 'تحليل الميزانية بالذكاء الاصطناعي',
      lossAversionAnalysis: 'تحليل تجنب الخسارة',
      fixed: 'ثابت',
      variable: 'متغير',
      fixedVsVariableTitle: 'تحليل النفقات الثابتة والمتغيرة',
      investmentGoal: 'الهدف الاستثماري (مثال: شراء منزل، تقاعد)',
      targetAmount: 'المبلغ المستهدف ($)',
      investmentTimeline: 'الجدول الزمني (بالسنوات)',
      initialInvestment: 'الاستثمار المبدئي ($)',
      monthlyContribution: 'المساهمة الشهرية ($)',
      riskTolerance: 'تحمل المخاطر',
      low: 'منخفض',
      medium: 'متوسط',
      high: 'مرتفع',
      generatePlan: 'إنشاء خطة استثمارية',
      yourInvestmentPlan: 'خطتك الاستثمارية',
      strategies: 'الاستراتيجيات الموصى بها',
      disclaimer: 'إخلاء مسؤولية',
      educationalContent: 'محتوى تعليمي',
      educationalContentSubtitle: 'عمّق معرفتك المالية مع فيديوهات منتقاة من أبرز الخبراء.',
      inspirationTitle: 'رحلات ملهمة',
      inspirationSubtitle: 'تعلم من عمالقة الصناعة. قصص حقيقية من رواد أعمال حققوا نجاحًا ماليًا استثنائيًا.',
      sortByWealth: 'ترتيب حسب الثروة',
      sortByExperience: 'ترتيب حسب الخبرة',
      netWorth: 'صافي الثروة',
      readStory: 'اقرأ القصة كاملة',
      careerStart: 'بداية المسيرة',
      timeline: 'الجدول الزمني',
      lessons: 'دروس أساسية',
      financialNewsTitle: 'آخر الأخبار المالية',
      financialNewsSubtitle: 'ابق على اطلاع بآخر الأخبار من العالم المالي، مدعوم من بحث Google.',
      getLatestNews: 'احصل على آخر الأخبار',
      newsSources: 'المصادر',
      foundersPage: 'صفحة المؤسس',
      easterEggTitle: 'أعجوبة الدنيا الثامنة',
      easterEggContent1: 'يقال إن ألبرت أينشتاين وصف الفائدة المركبة بأنها أعجوبة الدنيا الثامنة. وقال: "من يفهمها يكسبها... ومن لا يفهمها... يدفعها".',
      easterEggContent2: 'لقد لاحظت أن العديد من هذه الشخصيات الملهمة استغرقوا عقودًا لبناء ثرواتهم الهائلة. النجاح المالي الحقيقي لا يتعلق بالثراء السريع؛ إنه يتعلق بالصبر، والاستمرارية، وسحر النمو المركب طويل الأجل. أفضل وقت لزراعة شجرة كان قبل 20 عامًا. ثاني أفضل وقت هو الآن.',
      quizSelectionTitle: 'اختر تحديك',
      mindsetQuizTitle: 'اختبار العقلية المالية',
      mindsetQuizDesc: 'اكتشف ما إذا كنت تفكر مثل الأثرياء. يعتمد على مبادئ من كتاب "الأب الغني والأب الفقير".',
      budgetingQuizTitle: 'اختبار عادات الميزانية',
      budgetingQuizDesc: 'قيّم عاداتك اليومية في الإنفاق والادخار لإيجاد فرص للنمو.',
      investmentQuizTitle: 'اختبار المعرفة الاستثمارية',
      investmentQuizDesc: 'اختبر فهمك لمفاهيم الاستثمار الأساسية مثل الأسهم والسندات والتنويع.',
      startTest: 'ابدأ الاختبار',
    },
    concepts: [
      {
        icon: React.createElement(AssetIcon),
        title: 'الأصول مقابل الخصوم',
        poorMindset: 'يشتري خصومًا يعتقد أنها أصول، مثل السيارات الفاخرة، والتي تخرج المال من جيبه.',
        richMindset: 'يركز على اقتناء أصول تدر دخلاً، مثل العقارات أو الأسهم، والتي تضع المال في جيبه.',
      },
      {
        icon: React.createElement(WorkIcon),
        title: 'العمل من أجل المال مقابل المال يعمل من أجلك',
        poorMindset: 'يبادل وقته بالمال (راتب). إذا توقف عن العمل، يتوقف دخله.',
        richMindset: 'يبني أنظمة واستثمارات حيث يعمل ماله من أجله، مما يولد دخلاً سلبياً على مدار الساعة.',
      },
      {
        icon: React.createElement(LearnIcon),
        title: 'التعليم المالي',
        poorMindset: 'يعتقد أن التعليم الرسمي كافٍ. يتوقف عن تعلم المزيد عن المال بعد التخرج.',
        richMindset: 'يلتزم بالتعلم المالي مدى الحياة، ويبحث باستمرار عن المعرفة حول الاستثمار والأسواق وإدارة الأموال.',
      },
      {
        icon: React.createElement(CashflowIcon),
        title: 'فهم التدفق النقدي',
        poorMindset: 'يركز على راتبه (الدخل) وفواتيره (النفقات)، وغالبًا ما يعيش من راتب إلى راتب.',
        richMindset: 'يفهم نمط التدفق النقدي الكامل: كيف تولد الأصول دخلاً لتغطية النفقات وتمويل شراء المزيد من الأصول.',
      },
      {
        icon: React.createElement(RiskIcon),
        title: 'إدارة المخاطر',
        poorMindset: 'يرى الاستثمار محفوفًا بالمخاطر ويتجنبه، مفضلاً "أمان" حساب التوفير حيث يفقد المال قيمته بسبب التضخم.',
        richMindset: 'يتعلم إدارة المخاطر والاستفادة منها من خلال المعرفة والقرارات المدروسة، مدركًا أن عدم الاستثمار هو الخطر الأكبر.',
      },
      {
          icon: React.createElement(TaxIcon),
          title: 'الكفاءة الضريبية',
          poorMindset: 'يكسب، يدفع الضرائب، ثم ينفق. لديه القليل من السيطرة على عبئه الضريبي.',
          richMindset: 'ينظم شؤونه المالية (غالبًا من خلال الشركات) ليكسب، ينفق، ثم يدفع الضرائب، مما يقلل من التزاماته الضريبية بشكل قانوني.',
      }
    ],
    quiz: [
       {
        question: 'عندما تحصل على مكافأة غير متوقعة في العمل، ما هو أول ما تفكر فيه؟',
        options: [
          { text: 'أبحث عن أصل لاستثمارها فيه، مثل الأسهم أو العقارات.', mindset: 'rich' },
          { text: 'أخطط لقضاء إجازة أو شراء جهاز جديد كنت أرغب فيه.', mindset: 'poor' },
          { text: 'أضع نصفها في المدخرات وأستخدم النصف الآخر لشيء ممتع.', mindset: 'balanced' },
          { text: 'أستخدمها لسداد بعض الديون ذات الفائدة المرتفعة.', mindset: 'balanced' },
        ],
        feedback: 'عقلية الثري تسعى فورًا لتحويل الدخل المكتسب إلى دخل سلبي عن طريق حيازة الأصول.',
      },
       {
        question: 'ماذا تعني لك كلمة "مخاطرة" في سياق مالي؟',
        options: [
          { text: 'شيء يجب تجنبه بأي ثمن. من الأفضل أن تكون آمنًا.', mindset: 'poor' },
          { text: 'عنصر ضروري لبناء الثروة يمكن إدارته بالمعرفة.', mindset: 'rich' },
          { text: 'أنا على ما يرام مع بعض المخاطر، لكنني أفضل العوائد الأكثر أمانًا والمضمونة.', mindset: 'balanced' },
          { text: 'الأمر يعتمد على الاستثمار المحدد ومدى فهمي له.', mindset: 'balanced' },
        ],
        feedback: 'الأثرياء لا يتجنبون المخاطر، بل يتعلمون إدارتها. إنهم يفهمون أن الجهل المالي، وليس المخاطرة، هو المشكلة الحقيقية.',
      },
      {
        question: 'كيف تنظر إلى منزلك الأساسي؟',
        options: [
            { text: 'إنه أكبر أصولي.', mindset: 'poor' },
            { text: 'إنه التزام لأنه يخرج المال من جيبي كل شهر.', mindset: 'rich' },
            { text: 'إنه مكان للعيش، لكنني آمل أن تزيد قيمته بمرور الوقت.', mindset: 'balanced' },
            { text: 'إنه شكل من أشكال الادخار الإجباري الذي يبني حقوق الملكية.', mindset: 'balanced' },
        ],
        feedback: 'عقلية الثري تميز بوضوح بين الأصول (تضع المال في جيبك) والالتزامات (تخرج المال). المنزل الأساسي هو التزام.',
       },
       {
        question: 'عندما يتعلق الأمر بالمعرفة المالية:',
        options: [
            { text: 'أعتمد على مستشاري المالي أو البنك لإدارة الأمور نيابة عني.', mindset: 'poor' },
            { text: 'أنا ملتزم بالتعلم المستمر عن المال والاستثمار والأسواق.', mindset: 'rich' },
            { text: 'أقرأ مقالات من حين لآخر لكنني لا أدرس التمويل بنشاط.', mindset: 'balanced' },
            { text: 'أسأل أصدقائي الناجحين ماليًا عن آرائهم.', mindset: 'balanced' },
        ],
        feedback: 'الحرية المالية تتطلب ثقافة مالية. الأثرياء يجعلون من أولوياتهم أن يكونوا مثقفين ماليًا.',
       },
       {
        question: 'شركتك تقدم برنامجًا تدريبيًا جديدًا. أنت تفكر:',
        options: [
            { text: '"كيف يمكن لهذه المهارة الجديدة أن تزيد من دخلي وتساعدني في الحصول على المزيد من الأصول؟"', mindset: 'rich' },
            { text: '"هل هذا إلزامي؟ أنا مشغول بما فيه الكفاية بعملي الحالي."', mindset: 'poor' },
            { text: '"قد يكون مفيدًا لتقدمي الوظيفي وزيادة محتملة في الراتب."', mindset: 'balanced' },
            { text: '"سأفكر في الأمر إذا كان يتماشى مع اهتماماتي الشخصية."', mindset: 'balanced' },
        ],
        feedback: 'يرى الأثرياء التعلم كأداة لخلق المزيد من الدخل والفرص، وليس فقط من أجل الأمان الوظيفي أو زيادة بسيطة في الراتب.',
       }
    ],
    riskQuiz: [
        {
            question: "تم إعطاؤك 10,000 دولار. ماذا تفعل بها؟",
            options: ["أضعها في حساب توفير عالي العائد.", "أستثمر في مزيج متنوع من الأسهم القيادية والسندات.", "أستثمر في شركة ناشئة واعدة ولكنها متقلبة في مجال التكنولوجيا.", "أستخدمها لبدء مشروعي التجاري الخاص."]
        },
        {
            question: "انخفض استثمار قمت به بنسبة 20% في شهر واحد. ما هو رد فعلك؟",
            options: ["أبيع على الفور لتقليل خسائري.", "أحتفظ به وأنتظر حتى يتعافى.", "أشتري المزيد، لأنه معروض للبيع الآن.", "أعيد تقييم أساسيات الشركة قبل اتخاذ قرار."]
        },
        {
            question: "أي عبارة تصف هدفك الاستثماري بشكل أفضل؟",
            options: ["الحفاظ على رأس مالي بأقل قدر من المخاطر.", "تحقيق نمو مطرد على المدى الطويل، مع قبول بعض تقلبات السوق.", "تعظيم عوائدي، حتى لو كان ذلك يعني تحمل مخاطر كبيرة.", "توليد تدفق دخل منتظم من استثماراتي."]
        },
        {
            question: "ما مدى ارتياحك للمنتجات المالية المعقدة مثل الخيارات أو العملات المشفرة؟",
            options: ["لست مرتاحًا على الإطلاق، أتجنبها.", "أنا فضولي ولكن سأحتاج إلى الكثير من التوجيه.", "أنا على استعداد لتخصيص جزء صغير من محفظتي لها.", "أنا أتداول أو أستثمر فيها بنشاط."]
        },
        {
            question: "تخيل أنك تخطط للتقاعد. ما هو همك الأساسي؟",
            options: ["عدم خسارة الأموال التي ادخرتها.", "ضمان أن مدخراتي تتفوق على التضخم.", "امتلاك ما يكفي من المال لعيش نمط حياة فاخر.", "خلق إرث لورثتي."]
        },
        {
            question: "ما هو الأفق الزمني المفضل لديك لرؤية عوائد على استثمار؟",
            options: ["أقل من عام.", "1-3 سنوات.", "3-5 سنوات.", "أكثر من 5 سنوات."]
        },
        {
            question: "إذا كان عليك الاختيار بين استثمارين، أيهما ستختار؟",
            options: ["استثمار بعائد محتمل أقل ولكن فرصة ضئيلة جدًا لخسارة المال.", "استثمار بعائد محتمل معتدل وفرصة معتدلة لخسارة المال.", "استثمار بعائد محتمل مرتفع ولكن فرصة عالية لخسارة المال.", "استثمار جديد تمامًا وغير مثبت ولكنه قد يحقق عائدًا هائلاً."]
        },
        {
            question: "ما هي نسبة محفظتك التي تشعر بالراحة في وضعها في استثمار واحد عالي الإمكانات؟",
            options: ["لا شيء، أفضل التنويع الأقصى.", "أقل من 5%.", "بين 5% و 15%.", "أكثر من 15%."]
        },
        {
            question: "سوق الأسهم يشهد تقلبات حادة. على الأرجح ستقوم بـ:",
            options: ["نقل كل استثماراتي إلى النقد حتى تهدأ الأمور.", "الالتزام باستراتيجيتي طويلة الأجل الحالية.", "البحث عن فرص شراء في الأسهم التي انخفضت قيمتها.", "محاولة توقيت السوق بالبيع عند القمم والشراء عند الانخفاضات."]
        },
        {
            question: "عند التفكير في دخلك، تركز أكثر على:",
            options: ["استقرار وأمان الراتب الثابت.", "راتب مع مكافأة صغيرة ومتوقعة.", "راتب أساسي أقل مع إمكانية عالية للعمولة أو مكافآت الأداء.", "التخلي عن راتب لبناء حصة في شركة جديدة."]
        }
    ],
    successStories: [
        {
            name: 'برنار أرنو وعائلته',
            age: 77,
            netWorth: '177 مليار دولار',
            sourceOfWealth: 'LVMH',
            bio: 'رئيس مجلس الإدارة والرئيس التنفيذي لشركة LVMH Moët Hennessy Louis Vuitton، المجموعة الرائدة عالميًا في المنتجات الفاخرة.',
            story: 'بدأ برنار أرنو، خريج الهندسة، مسيرته المهنية في شركة البناء الخاصة بعائلته. في عام 1984، استحوذ على مجموعة نسيج مفلسة كانت تمتلك كريستيان ديور، مما كان بمثابة دخوله إلى سوق الرفاهية. من خلال سلسلة من عمليات الاستحواذ الرائعة، بنى LVMH، إمبراطورية تضم 75 علامة تجارية مميزة بما في ذلك Louis Vuitton و Tiffany & Co. و Sephora. رؤيته الاستراتيجية وتكتيكاته التجارية الجريئة غيرت صناعة الرفاهية.',
            startYear: 1984,
            timeToWealth: '40 عامًا',
            timeline: '1984: استحوذ على Boussac، مالكة Dior. 1989: أصبح المساهم الأكبر في LVMH. 2017: سيطر بالكامل على Christian Dior. 2021: أكمل الاستحواذ على Tiffany & Co.',
            lessons: [
                'ابنِ محفظة من العلامات التجارية القوية والخالدة.',
                'اجمع بين الرؤية الإبداعية والإدارة المالية الصارمة.',
                'طبق اللامركزية مع العلامات التجارية لتعزيز الإبداع والاستقلالية.',
                'المنظور طويل الأجل ضروري في عالم الرفاهية.'
            ]
        },
        {
            name: 'جيف بيزوس',
            age: 62,
            netWorth: '240 مليار دولار',
            sourceOfWealth: 'أمازون',
            bio: 'مؤسس أمازون، الذي حول مكتبة على الإنترنت إلى أكبر شركة للتجارة الإلكترونية والحوسبة السحابية في العالم.',
            story: 'في عام 1994، ترك جيف بيزوس وظيفته المربحة في صندوق تحوط بنيويورك ليبدأ متجرًا لبيع الكتب عبر الإنترنت من مرآب منزله في سياتل. كان هذا بداية Amazon.com. مع التركيز الدؤوب على رضا العملاء والرؤية طويلة المدى، وسع أمازون إلى "متجر كل شيء"، وكان رائدًا في الخدمات السحابية مع AWS. تنحى عن منصب الرئيس التنفيذي في عام 2021 للتركيز على مشاريع أخرى مثل Blue Origin.',
            startYear: 1994,
            timeToWealth: '30 عامًا',
            timeline: '1994: أسس أمازون. 1997: طرح أمازون للاكتتاب العام. 2005: أطلق أمازون برايم. 2006: أطلق AWS. 2021: تنحى عن منصب الرئيس التنفيذي.',
            lessons: [
                'كن مهووسًا بالعملاء.',
                'اعتبره دائمًا "اليوم الأول"؛ تجنب الرضا عن النفس.',
                'ركز على المدى الطويل، حتى على حساب الأرباح قصيرة الأجل.',
                'جرب بصبر، واقبل الفشل، ولكن ضاعف الجهد عندما ترى سعادة العملاء.'
            ]
        },
        {
            name: 'إيلون ماسك',
            age: 54,
            netWorth: '437 مليار دولار',
            sourceOfWealth: 'تيسلا، سبيس إكس، X',
            bio: 'رائد أعمال ذو رؤية يُحدث ثورة في النقل واستكشاف الفضاء والذكاء الاصطناعي.',
            story: 'شارك إيلون ماسك في تأسيس Zip2، شركة برمجيات ويب، والتي تم الاستحواذ عليها في عام 1999. ثم أسس X.com، التي اندمجت لتشكل PayPal واشترتها eBay في عام 2002. استخدم ماسك ثروته لتأسيس SpaceX في عام 2002 وأصبح الرئيس التنفيذي لشركة Tesla في عام 2008. تشمل مشاريعه الطموحة أيضًا Neuralink و The Boring Company و xAI، بهدف إعادة تشكيل مستقبل البشرية.',
            startYear: 1995,
            timeToWealth: '29 عامًا',
            timeline: '1995: شارك في تأسيس Zip2. 1999: شارك في تأسيس X.com (PayPal). 2002: أسس SpaceX. 2008: أصبح الرئيس التنفيذي لشركة Tesla. 2022: استحوذ على تويتر (الآن X).',
            lessons: [
                'فكر من المبادئ الأولى، وليس عن طريق القياس.',
                'اعمل بشعور من الإلحاح الشديد.',
                'تبنى أهدافًا طموحة تغير العالم.',
                'أعد استثمار نجاحاتك في مشاريع جديدة.'
            ]
        },
        {
            name: 'مارك زوكربيرج',
            age: 42,
            netWorth: '248 مليار دولار',
            sourceOfWealth: 'ميتا (فيسبوك)',
            bio: 'الشريك المؤسس والرئيس التنفيذي لشركة ميتا بلاتفورمز، الذي بنى أكبر شبكة اجتماعية في العالم من غرفة سكنه في جامعة هارفارد.',
            story: 'أطلق مارك زوكربيرج "The Facebook" في عام 2004 كوسيلة لطلاب جامعة هارفارد للتواصل. انفجرت شعبية المنصة، وترك الكلية لإدارة الشركة. قام بتنمية فيسبوك ليصبح عملاقًا عالميًا، واستحوذ على إنستغرام (2012) وواتساب (2014). وهو يقود الآن تحول الشركة نحو الميتافيرس، معتقدًا أنه الجبهة التالية للتفاعل الرقمي.',
            startYear: 2004,
            timeToWealth: '20 عامًا',
            timeline: '2004: أطلق فيسبوك. 2012: استحوذ على إنستغرام والاكتتاب العام. 2014: استحوذ على واتساب. 2021: أعاد تسمية الشركة إلى ميتا.',
            lessons: [
                'تحرك بسرعة واكسر الأشياء.',
                'ركز على بناء مجتمع، وليس مجرد منتج.',
                'كن على استعداد لاتخاذ رهانات كبيرة طويلة الأجل على المستقبل.',
                'لا تخف من الاستحواذ على المنافسين لتعزيز مكانتك في السوق.'
            ]
        },
        {
            name: 'لاري بيج',
            age: 53,
            netWorth: '209 مليار دولار',
            sourceOfWealth: 'جوجل (ألفابت)',
            bio: 'الشريك المؤسس لجوجل، الذي أنشأ خوارزمية PageRank التي دعمت محرك البحث الثوري الخاص بها.',
            story: 'أثناء دراسته للدكتوراه في جامعة ستانفورد، طور لاري بيج، مع سيرجي برين، طريقة جديدة لترتيب نتائج البحث بناءً على بنية الروابط على الويب. أطلقوا جوجل في عام 1998 من مرآب. كرئيس تنفيذي، قاد بيج استحواذ جوجل على أندرويد ويوتيوب. في عام 2015، أصبح الرئيس التنفيذي للشركة الأم الجديدة لجوجل، ألفابت، للتركيز على المشاريع "الجريئة" والتقنيات الجديدة، قبل التنحي في عام 2019.',
            startYear: 1998,
            timeToWealth: '26 عامًا',
            timeline: '1998: شارك في تأسيس جوجل. 2004: اكتتاب جوجل العام. 2006: استحوذ على يوتيوب. 2015: أصبح الرئيس التنفيذي لشركة ألفابت.',
            lessons: [
                'ركز على المستخدم وكل شيء آخر سيتبعه.',
                'من الأفضل أن تفعل شيئًا واحدًا بشكل جيد جدًا.',
                'لا تخف من متابعة الأفكار الطموحة التي تحقق "10 أضعاف" النتائج.',
                'نظم شركتك للسماح بالابتكار خارج نطاق العمل الأساسي.'
            ]
        },
        {
            name: 'بيل جيتس',
            age: 70,
            netWorth: '120 مليار دولار',
            sourceOfWealth: 'مايكروسوفت، استثمارات',
            bio: 'الشريك المؤسس لشركة مايكروسوفت، الذي أحدثت رؤيته "جهاز كمبيوتر على كل مكتب وفي كل منزل" ثورة في الحوسبة الشخصية.',
            story: 'ترك بيل جيتس جامعة هارفارد ليبدأ مايكروسوفت مع بول ألين في عام 1975. قاما بتطوير برامج لأجهزة الكمبيوتر الشخصية المبكرة، وجاءت فرصتهم الكبيرة مع عقد لتوفير نظام التشغيل (MS-DOS) لأول جهاز كمبيوتر شخصي من IBM. أصبح ويندوز نظام التشغيل المهيمن في جميع أنحاء العالم. منذ انتقاله من مايكروسوفت، كرس وقته وثروته للصحة العالمية والتنمية من خلال مؤسسة بيل وميليندا جيتس.',
            startYear: 1975,
            timeToWealth: '49 عامًا',
            timeline: '1975: شارك في تأسيس مايكروسوفت. 1985: أصدر ويندوز 1.0. 2000: تنحى عن منصب الرئيس التنفيذي. 2008: ترك دوره بدوام كامل في مايكروسوفت.',
            lessons: [
                'ركز على إنشاء منصة، وليس مجرد منتج واحد.',
                'الملكية الفكرية أكثر قيمة من الأصول المادية.',
                'وظف أشخاصًا أذكياء جدًا وامنحهم حرية العمل.',
                'النجاح معلم سيء. إنه يغري الأذكياء بالاعتقاد بأنهم لا يمكن أن يخسروا.'
            ]
        },
        {
            name: 'سيرجي برين',
            age: 52,
            netWorth: '195 مليار دولار',
            sourceOfWealth: 'جوجل (ألفابت)',
            bio: 'الشريك المؤسس لجوجل، الذي كان له دور فعال في تطويرها التكنولوجي وقاد لاحقًا قسم المشاريع التجريبية.',
            story: 'التقى سيرجي برين بلاري بيج في جامعة ستانفورد وتعاونا في المشروع البحثي الذي أصبح جوجل. كرئيس للتكنولوجيا، ركز برين على الجانب الهندسي للشركة وقاد المشاريع الخاصة، بما في ذلك نظارات جوجل والسيارات ذاتية القيادة (الآن Waymo). بعد تشكيل ألفابت، شغل منصب رئيسها، مع التركيز على ريادة التقنيات الجديدة قبل التراجع عن العمليات اليومية مع بيج في عام 2019.',
            startYear: 1998,
            timeToWealth: '26 عامًا',
            timeline: '1998: شارك في تأسيس جوجل. 2004: اكتتاب جوجل العام. 2012: كشف عن نظارات جوجل. 2015: أصبح رئيسًا لشركة ألفابت.',
            lessons: [
                'حل مشكلة تقنية معقدة يمكن أن يخلق قيمة هائلة.',
                'عزز ثقافة الابتكار واسمح للموظفين بمتابعة المشاريع الجانبية.',
                'يجب أن تكون المعلومات متاحة ومفيدة عالميًا.',
                'لا تكن شريرًا (مبدأ أساسي مبكر).'
            ]
        },
        {
            name: 'ستيف بالمر',
            age: 70,
            netWorth: '176 مليار دولار',
            sourceOfWealth: 'مايكروسوفت',
            bio: 'الرئيس التنفيذي السابق لشركة مايكروسوفت، الذي قاد الشركة خلال انتقالها من عصر الكمبيوتر الشخصي إلى عصر السحابة والمؤسسات.',
            story: 'ترك ستيف بالمر برنامج الماجستير في إدارة الأعمال بجامعة ستانفورد في عام 1980 للانضمام إلى صديقه من هارفارد بيل جيتس في مايكروسوفت كموظف رقم 30. عُرف بأسلوبه القيادي النشط والعاطفي، وخلف جيتس كرئيس تنفيذي في عام 2000. خلال فترة عمله، ضاعف مبيعات مايكروسوفت ثلاث مرات وضاعف أرباحها، وأشرف على إطلاق Xbox والتوسع في برامج المؤسسات والخدمات السحابية مع Azure. بعد تقاعده، اشترى فريق LA Clippers لكرة السلة.',
            startYear: 1980,
            timeToWealth: '44 عامًا',
            timeline: '1980: انضم إلى مايكروسوفت. 2000: أصبح الرئيس التنفيذي. 2001: أطلق Xbox. 2014: تقاعد من مايكروسوفت واشترى LA Clippers.',
            lessons: [
                'الشغف والحماس حاسمان للقيادة.',
                'المثابرة هي المفتاح، حتى عند مواجهة الشكوك.',
                'ركز على عملاء المؤسسات لتحقيق إيرادات مستقرة طويلة الأجل.',
                'اعرف متى يحين وقت انتقال القيادة.'
            ]
        },
        {
            name: 'وارن بافيت',
            age: 95,
            netWorth: '147 مليار دولار',
            sourceOfWealth: 'بيركشاير هاثاواي',
            bio: 'يُعرف باسم "حكيم أوماها"، وهو أحد أنجح المستثمرين في كل العصور، ويقود التكتل بيركشاير هاثاواي.',
            story: 'أظهر وارن بافيت اهتمامًا بالأعمال والاستثمار في سن مبكرة. درس تحت إشراف بنيامين جراهام، أبو الاستثمار القيمي. في عام 1965، سيطر على شركة نسيج متعثرة، بيركشاير هاثاواي، وحولها إلى شركة قابضة ضخمة لاستثماراته. تتضمن استراتيجيته شراء حصص في شركات مقومة بأقل من قيمتها الحقيقية ذات أساسيات قوية والاحتفاظ بها على المدى الطويل.',
            startYear: 1956,
            timeToWealth: '68 عامًا',
            timeline: '1956: بدأ أول شراكة استثمارية له. 1965: سيطر على بيركشاير هاثاواي. 1988: استثمر لأول مرة في كوكا كولا. 2006: تعهد بالتبرع بثروته.',
            lessons: [
                'القاعدة رقم 1: لا تخسر المال أبدًا. القاعدة رقم 2: لا تنس أبدًا القاعدة رقم 1.',
                'كن خائفًا عندما يكون الآخرون جشعين، وكن جشعًا عندما يكون الآخرون خائفين.',
                'من الأفضل بكثير شراء شركة رائعة بسعر عادل بدلاً من شراء شركة عادلة بسعر رائع.',
                'يجلس شخص ما في الظل اليوم لأن شخصًا ما زرع شجرة منذ وقت طويل.'
            ]
        },
        {
            name: 'لاري إليسون',
            age: 81,
            netWorth: '351 مليار دولار',
            sourceOfWealth: 'أوراكل',
            bio: 'الشريك المؤسس، المدير التقني، والرئيس التنفيذي السابق لشركة أوراكل، وهي شركة برمجيات عملاقة هيمنت على سوق قواعد البيانات.',
            story: 'شارك لاري إليسون، الذي ترك الكلية، في تأسيس مختبرات تطوير البرمجيات في عام 1977 باستثمار قدره 2000 دولار. فازوا بعقد لبناء قاعدة بيانات علائقية لوكالة المخابرات المركزية، والتي أطلقوا عليها اسم أوراكل. توقع إليسون أهمية برامج قواعد البيانات التجارية وسوق أوراكل بقوة للشركات، مما أدى إلى نموها لتصبح قوة مهيمنة في برامج المؤسسات. شغل منصب الرئيس التنفيذي لمدة 37 عامًا قبل أن ينتقل إلى منصب المدير التقني.',
            startYear: 1977,
            timeToWealth: '47 عامًا',
            timeline: '1977: شارك في تأسيس SDL (لاحقًا أوراكل). 1986: اكتتاب أوراكل العام. 2009: استحوذ على صن مايكروسيستمز. 2014: تنحى عن منصب الرئيس التنفيذي.',
            lessons: [
                'لا يكفي أن تكون الأفضل؛ يجب أن تكون الوحيد.',
                'ركز على المبيعات والتسويق بقدر تركيزك على الهندسة.',
                'النمو من خلال الاستحواذ يمكن أن يكون استراتيجية قوية.',
                'تكيف مع التحولات التكنولوجية أو ستصبح قديمًا.'
            ]
        },
        {
            name: 'موكيش أمباني',
            age: 69,
            netWorth: '97.5 مليار دولار',
            sourceOfWealth: 'ريلاينس إندستريز',
            bio: 'رئيس مجلس إدارة ريلاينس إندستريز، وهو تكتل ضخم له اهتمامات في البتروكيماويات والنفط والغاز وتجارة التجزئة والاتصالات.',
            story: 'ورث موكيش أمباني أعمال والده، ريلاينس، ومنذ ذلك الحين أشرف على توسعها الهائل. قاد بناء أكبر مصفاة بترول في العالم. كانت خطوته الأكثر إحداثًا للاضطراب هي إطلاق خدمة الهاتف والنطاق العريض 4G Jio في عام 2016، والتي قدمت مكالمات مجانية وبيانات رخيصة، مما غير بشكل أساسي المشهد الرقمي في الهند وجذب مئات الملايين من مستخدمي الإنترنت الجدد.',
            startYear: 1981,
            timeToWealth: '43 عامًا',
            timeline: '1981: انضم إلى ريلاينس. 2002: أصبح رئيس مجلس الإدارة. 2005: قسم الأصول رسميًا مع شقيقه. 2016: أطلق Jio Infocomm.',
            lessons: [
                'فكر بشكل كبير ونفذ على نطاق واسع.',
                'أحدث اضطرابًا في صناعات بأكملها من خلال الاستفادة من التكنولوجيا والتسعير القوي.',
                'التكامل الرأسي يمكن أن يخلق خنادق قوية.',
                'حدد الاحتياجات المستقبلية لعدد كبير من السكان واستثمر فيها.'
            ]
        },
         {
            name: 'مايكل ديل',
            age: 61,
            netWorth: '151 مليار دولار',
            sourceOfWealth: 'ديل تكنولوجيز',
            bio: 'مؤسس شركة ديل، الذي كان رائدًا في نموذج البيع المباشر للمستهلك لأجهزة الكمبيوتر الشخصية.',
            story: 'كطالب في مرحلة ما قبل الطب في جامعة تكساس عام 1984، بدأ مايكل ديل عملًا تجاريًا لترقية أجهزة الكمبيوتر من غرفة سكنه. ترك الكلية لتأسيس شركة ديل للكمبيوتر، مع فكرة ثورية لبيع أجهزة كمبيوتر مخصصة مباشرة للعملاء، متجاوزًا تجار التجزئة. سمح هذا النموذج بأسعار أقل وإدارة أفضل للمخزون. في عام 2013، جعل شركة ديل خاصة في عملية استحواذ ضخمة لإعادة هيكلة الشركة لعصر السحابة، واستحوذ لاحقًا على EMC في عام 2016 لإنشاء ديل تكنولوجيز.',
            startYear: 1984,
            timeToWealth: '40 عامًا',
            timeline: '1984: أسس ديل من غرفة سكنه. 1988: اكتتاب ديل العام. 2013: جعل شركة ديل خاصة. 2016: استحوذ على EMC مقابل 67 مليار دولار.',
            lessons: [
                'ابتكر في نموذج العمل، وليس فقط المنتج.',
                'استمع مباشرة إلى عملائك لفهم احتياجاتهم.',
                'سلسلة التوريد الفعالة هي سلاح تنافسي قوي.',
                'كن على استعداد لاتخاذ خطوات جريئة وتحويلية للبقاء على صلة.'
            ]
        },
        {
            name: 'جنسن هوانغ',
            age: 63,
            netWorth: '159 مليار دولار',
            sourceOfWealth: 'إنفيديا',
            bio: 'الشريك المؤسس والرئيس التنفيذي لشركة إنفيديا، الشركة التي تقع في قلب ثورة الذكاء الاصطناعي بوحدات معالجة الرسومات القوية الخاصة بها.',
            story: 'شارك جنسن هوانغ في تأسيس إنفيديا في عام 1993 برؤية أن وحدات معالجة الرسومات ستكون ضرورية لأكثر من مجرد ألعاب الفيديو. قاد الشركة للسيطرة على سوق بطاقات رسومات الألعاب ثم قام بتحول استراتيجي لجعل رقائق إنفيديا هي الأجهزة المفضلة للحوسبة عالية الأداء والذكاء الاصطناعي. هذا التبصر وضع إنفيديا كلاعب حاسم في طفرة الذكاء الاصطناعي، مما تسبب في ارتفاع قيمتها بشكل كبير.',
            startYear: 1993,
            timeToWealth: '31 عامًا',
            timeline: '1993: شارك في تأسيس إنفيديا. 1999: اخترع وحدة معالجة الرسومات والاكتتاب العام. 2006: أطلق نموذج البرمجة CUDA. 2022: أصبح لاعبًا رئيسيًا في ثورة الذكاء الاصطناعي.',
            lessons: [
                'حدد التحولات التكنولوجية طويلة الأجل واستثمر فيها.',
                'لا تنشئ أجهزة فقط، بل نظامًا بيئيًا كاملاً (مثل CUDA).',
                'ثقافة الشركة ورؤيتها أمران أساسيان.',
                'راهن على سوق غير موجود بعد.'
            ]
        }
    ],
    videos: [
        { id: '4Jnh5WLqhrY', title: 'الأب الغني والأب الفقير (مراجعة كتاب متحركة)', thumbnail: 'https://i.ytimg.com/vi/4Jnh5WLqhrY/hq720.jpg' },
        { id: '4dvXFCUaTG0', title: 'سأعلمك كيف تصبح غنيًا لراميت سيثي', thumbnail: 'https://i.ytimg.com/vi/4dvXFCUaTG0/hq720.jpg' },
        { id: '1o5XLZI-IeM', title: 'سيكولوجية المال لمورجان هاوسل', thumbnail: 'https://i.ytimg.com/vi/1o5XLZI-IeM/hq720.jpg' },
        { id: 'oraIrNCTBBA', title: 'المستثمر الذكي لبنيامين جراهام', thumbnail: 'https://i.ytimg.com/vi/oraIrNCTBBA/hq720.jpg' },
    ],
  },
};