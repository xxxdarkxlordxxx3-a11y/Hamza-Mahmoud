
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import type { QuizQuestion, RiskQuestion, UserRiskAnswer, RiskProfile, BudgetItem, InvestmentPlan, BudgetAnalysis, UserContext, Book, CashFlowStatement, CashFlowItem, UserAnswer, QuizAnalysis, GeneratedContent, AgentInterpretation } from '../types';

// Schema for standard MC/TF quizzes (Mindset, Budgeting)
const standardQuizQuestionSchema = {
    type: Type.ARRAY,
    items: {
        type: Type.OBJECT,
        properties: {
            type: { type: Type.STRING, enum: ['mc'] },
            question: { type: Type.STRING },
            options: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        text: { type: Type.STRING },
                        mindset: { type: Type.STRING }
                    },
                    required: ['text', 'mindset']
                }
            },
            feedback: { type: Type.STRING }
        },
        required: ['type', 'question', 'options', 'feedback']
    }
};

// Schema for the mixed Investment Quiz
const investmentQuizQuestionSchema = {
    type: Type.ARRAY,
    items: {
        type: Type.OBJECT,
        properties: {
            type: { type: Type.STRING, enum: ['mc', 'tf', 'input', 'matching'] },
            question: { type: Type.STRING },
            options: { // For MC and TF
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        text: { type: Type.STRING },
                        mindset: { type: Type.STRING } 
                    },
                    required: ['text']
                }
            },
            pairs: { // For Matching
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        left: { type: Type.STRING },
                        right: { type: Type.STRING }
                    },
                    required: ['left', 'right']
                }
            },
            correctAnswerLabel: { type: Type.STRING }, // For Input reference
            feedback: { type: Type.STRING }
        },
        required: ['type', 'question', 'feedback']
    }
};

export async function generateQuizQuestions(language: 'en' | 'ar', userContext: UserContext): Promise<QuizQuestion[]> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `Generate exactly 20 multiple-choice quiz questions for a financial mindset quiz in ${language}. 
    The questions must focus strictly on the core philosophical and psychological differences between a 'rich mindset' and a 'poor mindset'.
    Each question must have 4 options.
    The output must be a valid JSON array.`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: standardQuizQuestionSchema,
        }
    });

    if (!response.text) throw new Error("No response from AI");
    return JSON.parse(response.text);
}

export async function generateBudgetingQuizQuestions(language: 'en' | 'ar', userContext: UserContext): Promise<QuizQuestion[]> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `Generate exactly 20 multiple-choice quiz questions for a practical budgeting and saving habits quiz in ${language}.
    Each question must have 4 options.
    The output must be a valid JSON array.`;
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: standardQuizQuestionSchema,
        }
    });

    if (!response.text) throw new Error("No response from AI");
    return JSON.parse(response.text);
}

export async function generateInvestmentQuizQuestions(language: 'en' | 'ar', userContext: UserContext): Promise<QuizQuestion[]> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const topics = ['Stocks', 'Bonds', 'Mutual Funds', 'ETFs', 'Real Estate', 'Compound Interest', 'Inflation', 'Risk Management', 'Diversification', 'Market Caps'];
    const randomTopic = topics[Math.floor(Math.random() * topics.length)];
    const timestamp = Date.now();

    const prompt = `Generate exactly 20 mixed-format quiz questions to test foundational investment knowledge in ${language}.
    Focus heavily on: ${randomTopic} and general principles. Random Seed: ${timestamp}.
    
    The 20 questions MUST be split exactly as follows:
    1. **5 Multiple Choice Questions ('mc')**: Standard 4 options.
    2. **5 True/False Questions ('tf')**: Options should be "True" and "False" (translated).
    3. **5 Short Answer Questions ('input')**: The user must type the answer. Provide a 'correctAnswerLabel' for grading reference.
    4. **5 Matching Questions ('matching')**: Provide 4 pairs of terms and definitions in the 'pairs' array.
    
    The output must be a valid JSON array of objects matching the specified schema.`;
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: investmentQuizQuestionSchema,
        }
    });

    if (!response.text) throw new Error("No response from AI");
    return JSON.parse(response.text);
}

export async function analyzeQuizAnswers(questions: QuizQuestion[], userAnswers: UserAnswer[], language: 'en' | 'ar'): Promise<QuizAnalysis> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const processedAnswers = userAnswers.map(answer => {
        const question = questions[answer.questionIndex];
        let userAnswerText = '';
        
        if (question.type === 'mc' || question.type === 'tf') {
            const idx = answer.answerContent as number;
            userAnswerText = question.options ? question.options[idx]?.text : 'Unknown';
        } else if (question.type === 'input') {
            userAnswerText = answer.answerContent as string;
        } else if (question.type === 'matching') {
            userAnswerText = JSON.stringify(answer.answerContent);
        }

        return {
            question: question.question,
            type: question.type,
            userAnswer: userAnswerText,
            correctRef: question.correctAnswerLabel || (question.pairs ? JSON.stringify(question.pairs) : 'See options mindset'),
        };
    });

    const prompt = `You are an expert financial coach. Analyze the user's answers for a financial quiz in ${language}.
    
    For 'mc' and 'tf' types: correct answers are usually marked with specific mindset/correctness flags, but here infer based on financial wisdom.
    For 'input' types: Compare the user's text to the 'correctRef'. Be lenient with spelling.
    For 'matching' types: Check if the user correctly paired the items.
    
    Quiz Data & User Answers: ${JSON.stringify(processedAnswers)}

    Provide a detailed analysis as a single valid JSON object.
    1. 'scorePercentage': 0-100 based on correctness.
    2. 'overallFeedback': A summary paragraph in ${language}.
    3. 'growthOpportunities': For incorrect answers, provide the question, what they answered, what was correct, and an explanation.`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: prompt,
        config: {
            responseMimeType: 'application/json',
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    scorePercentage: { type: Type.NUMBER },
                    overallFeedback: { type: Type.STRING },
                    growthOpportunities: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                question: { type: Type.STRING },
                                yourAnswer: { type: Type.STRING },
                                richMindsetAnswer: { type: Type.STRING },
                                explanation: { type: Type.STRING }
                            },
                            required: ['question', 'yourAnswer', 'richMindsetAnswer', 'explanation']
                        }
                    }
                },
                required: ['scorePercentage', 'overallFeedback', 'growthOpportunities']
            }
        }
    });

    if (!response.text) throw new Error("No response from AI");
    return JSON.parse(response.text);
}

export async function generateRiskQuestions(language: 'en' | 'ar', userContext: UserContext): Promise<RiskQuestion[]> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `Generate 15 multiple-choice questions in ${language} to assess a user's financial risk profile.
    Scenario-based questions.
    The output must be a valid JSON array of objects.`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        question: { type: Type.STRING },
                        options: {
                            type: Type.ARRAY,
                            items: { type: Type.STRING }
                        }
                    },
                    required: ['question', 'options']
                }
            }
        }
    });

    if (!response.text) throw new Error("No response from AI");
    return JSON.parse(response.text);
}

export async function analyzeRiskProfile(answers: UserRiskAnswer[], age: number, language: 'en' | 'ar', userContext: UserContext): Promise<RiskProfile> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `Analyze risk profile for user age ${age}. Language: ${language}.
    Answers: ${JSON.stringify(answers)}
    
    Output JSON strictly following the schema.`;
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    profile: { type: Type.STRING },
                    description: { type: Type.STRING },
                    allocation: {
                        type: Type.OBJECT,
                        properties: {
                            highRisk: { type: Type.NUMBER },
                            lowRisk: { type: Type.NUMBER }
                        },
                        required: ['highRisk', 'lowRisk']
                    },
                    assetComfort: {
                        type: Type.OBJECT,
                        properties: {
                            stocks: { type: Type.NUMBER },
                            bonds: { type: Type.NUMBER },
                            realEstate: { type: Type.NUMBER },
                            commodities: { type: Type.NUMBER }
                        },
                        required: ['stocks', 'bonds', 'realEstate', 'commodities']
                    },
                    explanation: { type: Type.STRING },
                    overallRiskPercentage: { type: Type.NUMBER },
                    lossAversionPercentage: { type: Type.NUMBER },
                    lossAversionExplanation: { type: Type.STRING },
                    investmentHorizon: { type: Type.STRING, enum: ['short-term', 'medium-term', 'long-term'] },
                    investmentHorizonDescription: { type: Type.STRING },
                    definitions: {
                        type: Type.OBJECT,
                        properties: {
                            shortTerm: { type: Type.STRING },
                            mediumTerm: { type: Type.STRING },
                            longTerm: { type: Type.STRING },
                        },
                        required: ['shortTerm', 'mediumTerm', 'longTerm']
                    }
                },
                required: ['profile', 'description', 'allocation', 'assetComfort', 'explanation', 'overallRiskPercentage', 'lossAversionPercentage', 'lossAversionExplanation', 'investmentHorizon', 'investmentHorizonDescription', 'definitions']
            }
        }
    });

    if (!response.text) throw new Error("No response from AI");
    return JSON.parse(response.text);
}

export async function getBudgetSuggestions(income: number, expenses: BudgetItem[], currency: string, language: 'en' | 'ar', userContext: UserContext): Promise<BudgetAnalysis> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const prompt = `
    Act as a financial advisor. Analyze this budget in ${language}.
    Income: ${income} ${currency}
    Expenses: ${JSON.stringify(expenses)}
    
    Calculate metrics, breakdown by Fixed vs Variable, and provide suggestions.
    Return strictly JSON.
    `;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { 
            responseMimeType: "application/json", 
            responseSchema: { 
                type: Type.OBJECT, 
                properties: { 
                    summary: {type: Type.STRING}, 
                    keyMetrics: {
                        type:Type.OBJECT, 
                        properties:{
                            totalIncome:{type:Type.NUMBER},
                            totalExpenses:{type:Type.NUMBER},
                            netSavings:{type:Type.NUMBER},
                            savingsRate:{type:Type.NUMBER}
                        }, 
                        required:['totalIncome', 'totalExpenses', 'netSavings', 'savingsRate']
                    }, 
                    expenseBreakdown: {
                        type:Type.OBJECT, 
                        properties: {
                            fixed:{
                                type:Type.ARRAY, 
                                items:{
                                    type:Type.OBJECT, 
                                    properties:{
                                        category:{type:Type.STRING},
                                        amount:{type:Type.NUMBER},
                                        percentage:{type:Type.NUMBER}
                                    },
                                    required: ['category', 'amount', 'percentage']
                                }
                            },
                            variable:{
                                type:Type.ARRAY, 
                                items:{
                                    type:Type.OBJECT, 
                                    properties:{
                                        category:{type:Type.STRING},
                                        amount:{type:Type.NUMBER},
                                        percentage:{type:Type.NUMBER}
                                    },
                                    required: ['category', 'amount', 'percentage']
                                }
                            },
                            totalFixed:{type:Type.NUMBER},
                            totalVariable:{type:Type.NUMBER}
                        }, 
                        required:['fixed', 'variable', 'totalFixed', 'totalVariable']
                    }, 
                    positivePoints:{
                        type:Type.ARRAY, 
                        items:{type:Type.STRING}
                    }, 
                    areasForImprovement:{
                        type:Type.ARRAY, 
                        items:{
                            type:Type.OBJECT, 
                            properties:{
                                area:{type:Type.STRING},
                                suggestion:{type:Type.STRING}
                            },
                            required: ['area', 'suggestion']
                        }
                    }
                },
                required: ['summary', 'keyMetrics', 'expenseBreakdown', 'positivePoints', 'areasForImprovement']
            } 
        }
    });
    
    if (!response.text) throw new Error("No response from AI");
    return JSON.parse(response.text);
}

export async function createInvestmentPlan(details: any, language: 'en' | 'ar', userContext: UserContext): Promise<InvestmentPlan> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const prompt = `You are an expert financial advisor. Create a personalized investment plan.
    
    User Profile:
    - Goal: ${details.goal}
    - Target Amount: ${details.target}
    - Timeline: ${details.timeline} years
    - Initial Investment: ${details.initial}
    - Monthly Contribution: ${details.monthly}
    - Risk Tolerance: ${details.risk}
    
    Output Language: ${language}
    
    Provide a JSON response with:
    1. planName: Creative title.
    2. summary: Strategic overview.
    3. assetAllocation: Object where keys are asset classes (e.g., 'Stocks', 'Bonds', 'RealEstate', 'Gold', 'Cash') and values are integers representing percentage (0-100). Total must equal 100.
    4. strategies: List of investment strategies (e.g. DCA, diversification).
    5. disclaimer: Financial disclaimer.
    `;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { 
            responseMimeType: "application/json", 
            responseSchema: { 
                type: Type.OBJECT, 
                properties: { 
                    planName: { type: Type.STRING }, 
                    summary: { type: Type.STRING }, 
                    assetAllocation: { 
                        type: Type.OBJECT, 
                        properties: {
                            Stocks: { type: Type.NUMBER },
                            Bonds: { type: Type.NUMBER },
                            RealEstate: { type: Type.NUMBER },
                            Gold: { type: Type.NUMBER },
                            Cash: { type: Type.NUMBER },
                            Crypto: { type: Type.NUMBER },
                            Other: { type: Type.NUMBER },
                            ETFs: { type: Type.NUMBER }
                        }
                    }, 
                    strategies: { 
                        type: Type.ARRAY, 
                        items: { type: Type.STRING } 
                    }, 
                    disclaimer: { type: Type.STRING } 
                },
                required: ['planName', 'summary', 'assetAllocation', 'strategies', 'disclaimer']
            } 
        }
    });

    if (!response.text) throw new Error("No response from AI");
    return JSON.parse(response.text);
}

export async function generateCashFlowStatement(data: any, language: 'en' | 'ar', userContext: UserContext): Promise<CashFlowStatement> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const prompt = `
    Generate a cash flow statement based on the following data in ${language}.
    Data: ${JSON.stringify(data)}
    
    Ensure you calculate the net flows correctly.
    Provide a brief analysis at the end.
    `;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { 
            responseMimeType: 'application/json', 
            responseSchema: { 
                type: Type.OBJECT, 
                properties: { 
                    operatingActivities: {
                        type:Type.OBJECT, 
                        properties:{
                            inflows:{type:Type.ARRAY, items:{type:Type.OBJECT, properties:{item:{type:Type.STRING},amount:{type:Type.NUMBER}}}}, 
                            outflows:{type:Type.ARRAY, items:{type:Type.OBJECT, properties:{item:{type:Type.STRING},amount:{type:Type.NUMBER}}}}, 
                            netCashFlow:{type:Type.NUMBER}
                        },
                        required: ['inflows', 'outflows', 'netCashFlow']
                    }, 
                    investingActivities: {
                        type:Type.OBJECT, 
                        properties:{
                            inflows:{type:Type.ARRAY, items:{type:Type.OBJECT, properties:{item:{type:Type.STRING},amount:{type:Type.NUMBER}}}}, 
                            outflows:{type:Type.ARRAY, items:{type:Type.OBJECT, properties:{item:{type:Type.STRING},amount:{type:Type.NUMBER}}}}, 
                            netCashFlow:{type:Type.NUMBER}
                        },
                        required: ['inflows', 'outflows', 'netCashFlow']
                    }, 
                    financingActivities: {
                        type:Type.OBJECT, 
                        properties:{
                            inflows:{type:Type.ARRAY, items:{type:Type.OBJECT, properties:{item:{type:Type.STRING},amount:{type:Type.NUMBER}}}}, 
                            outflows:{type:Type.ARRAY, items:{type:Type.OBJECT, properties:{item:{type:Type.STRING},amount:{type:Type.NUMBER}}}}, 
                            netCashFlow:{type:Type.NUMBER}
                        },
                        required: ['inflows', 'outflows', 'netCashFlow']
                    }, 
                    summary: {
                        type:Type.OBJECT, 
                        properties:{
                            netIncreaseInCash:{type:Type.NUMBER},
                            beginningCashBalance:{type:Type.NUMBER},
                            endingCashBalance:{type:Type.NUMBER}
                        },
                        required: ['netIncreaseInCash', 'beginningCashBalance', 'endingCashBalance']
                    }, 
                    analysis: {type:Type.STRING} 
                },
                required: ['operatingActivities', 'investingActivities', 'financingActivities', 'summary', 'analysis']
            } 
        }
    });

    if (!response.text) throw new Error("No response from AI");
    return JSON.parse(response.text);
}

export async function interpretAgentRequest(query: string, userContext: UserContext, language: 'en' | 'ar'): Promise<AgentInterpretation> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const prompt = `Interpret the following user query in the context of a financial education app.
    Query: "${query}"
    Current Activity: ${userContext.activity}
    Language: ${language}
    
    Determine the best command.
    Commands:
    - generate_content: Explain a concept.
    - fetch_news: Get news (params: news_category).
    - recommend_books: Get book list.
    - suggest_ideas: Feature suggestions.
    - show_component: Launch a specific tool (params: component_name).
    - show_help: General help.
    `;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: prompt,
        config: { 
            responseMimeType: "application/json", 
            responseSchema: { 
                type: Type.OBJECT, 
                properties: { 
                    command: {type:Type.STRING}, 
                    content_topic: {type:Type.STRING, nullable: true}, 
                    news_category: {type:Type.STRING, nullable: true}, 
                    component_name: {type:Type.STRING, nullable: true}, 
                    component_props: {
                        type:Type.OBJECT, 
                        properties:{
                            quizType:{type:Type.STRING, nullable: true}
                        },
                        nullable: true
                    }, 
                    response_to_user: {type:Type.STRING} 
                },
                required: ['command', 'response_to_user']
            } 
        }
    });
    
    if (!response.text) throw new Error("No response from AI");
    return JSON.parse(response.text);
}

export async function generateContentForTopic(topic: string, language: 'en' | 'ar', userContext: UserContext): Promise<GeneratedContent> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Explain "${topic}" in ${language}. Keep it simple and educational.`,
        config: { 
            responseMimeType: "application/json", 
            responseSchema: { 
                type: Type.OBJECT, 
                properties: { 
                    title: {type:Type.STRING}, 
                    explanation: {type:Type.STRING}, 
                    example: {type:Type.STRING}, 
                    keyPoints: {type:Type.ARRAY, items:{type:Type.STRING}} 
                },
                required: ['title', 'explanation', 'keyPoints']
            } 
        }
    });
    
    if (!response.text) throw new Error("No response from AI");
    return JSON.parse(response.text);
}

export async function generateBookRecommendations(language: 'en' | 'ar', userContext: UserContext): Promise<Book[]> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Recommend 5 best-selling financial books in ${language}. Return JSON.`,
        config: { 
            responseMimeType: "application/json", 
            responseSchema: { 
                type: Type.ARRAY, 
                items: { 
                    type: Type.OBJECT, 
                    properties: { 
                        title: {type:Type.STRING}, 
                        author: {type:Type.STRING}, 
                        summary: {type:Type.STRING}, 
                        coverImage: {type:Type.STRING}, 
                        url: {type:Type.STRING} 
                    },
                    required: ['title', 'author', 'summary', 'url']
                } 
            } 
        }
    });

    if (!response.text) throw new Error("No response from AI");
    return JSON.parse(response.text);
}

export async function generateWebsiteIdeas(language: 'en' | 'ar', userContext: UserContext): Promise<string[]> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Suggest 3 innovative feature ideas for this financial education website in ${language}.`,
        config: { 
            responseMimeType: "application/json", 
            responseSchema: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING } 
            } 
        }
    });

    if (!response.text) throw new Error("No response from AI");
    return JSON.parse(response.text);
}

export async function getFinancialNews(language: 'en' | 'ar', category: string, userContext: UserContext): Promise<GenerateContentResponse> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Latest financial news for category: "${category}". Language: ${language}. Summarize key events.`,
        config: { tools: [{ googleSearch: {} }] },
    });
    return response;
}
