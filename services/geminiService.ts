import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import type { QuizQuestion, RiskQuestion, UserRiskAnswer, RiskProfile, SuccessStory, BudgetItem, InvestmentPlan, BudgetAnalysis } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function* streamChatResponse(prompt: string, language: 'en' | 'ar'): AsyncGenerator<string> {
    const chatPrompt = `You are a helpful financial assistant for the "Rich Mindset" app. The user is asking a question in ${language}. Provide a concise, helpful, and encouraging answer. User's question: "${prompt}"`;

    const stream = await ai.models.generateContentStream({
        model: 'gemini-2.5-flash',
        contents: chatPrompt,
        config: {
            thinkingConfig: { thinkingBudget: 0 }
        }
    });

    for await (const chunk of stream) {
        yield chunk.text;
    }
}

const quizQuestionSchema = {
    type: Type.ARRAY,
    items: {
        type: Type.OBJECT,
        properties: {
            question: { type: Type.STRING },
            options: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        text: { type: Type.STRING },
                        mindset: { type: Type.STRING, enum: ['rich', 'poor', 'balanced'] }
                    },
                    required: ['text', 'mindset']
                }
            },
            feedback: { type: Type.STRING }
        },
        required: ['question', 'options', 'feedback']
    }
};


export async function generateQuizQuestions(language: 'en' | 'ar'): Promise<QuizQuestion[]> {
    const prompt = `Generate 20 multiple-choice quiz questions for a financial mindset quiz in ${language}. The topic is distinguishing between a 'rich mindset' and a 'poor mindset' based on Robert Kiyosaki's "Rich Dad Poor Dad".
    Each question should have 4 options: one representing a 'rich' mindset, one a 'poor' mindset, and two distinct 'balanced' options.
    For each question, provide a brief 'feedback' explaining the 'rich mindset' principle.
    The output must be a valid JSON array of objects with the structure: { question: string, options: { text: string, mindset: 'rich'|'poor'|'balanced' }[], feedback: string }. Do not include any markdown formatting.`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: quizQuestionSchema,
        }
    });

    return JSON.parse(response.text);
}

export async function generateBudgetingQuizQuestions(language: 'en' | 'ar'): Promise<QuizQuestion[]> {
    const prompt = `Generate 20 multiple-choice quiz questions for a budgeting and saving habits quiz in ${language}. The questions should assess a user's practical skills and mindset regarding daily money management, savings strategies, and debt control. Each question should have 4 options: one representing a 'rich' (effective) habit, one a 'poor' (ineffective) habit, and two distinct 'balanced' (average) options. For each question, provide a brief 'feedback' explaining the principle behind the effective habit. The output must be a valid JSON array of objects with the structure: { question: string, options: { text: string, mindset: 'rich'|'poor'|'balanced' }[], feedback: string }. Do not include any markdown formatting.`;
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: quizQuestionSchema,
        }
    });

    return JSON.parse(response.text);
}

export async function generateInvestmentQuizQuestions(language: 'en' | 'ar'): Promise<QuizQuestion[]> {
    const prompt = `Generate 20 multiple-choice quiz questions to test basic investment knowledge in ${language}. Topics should include stocks, bonds, mutual funds, diversification, risk, compound interest, and market basics. Each question should have 4 options: one representing a 'rich' (correct/knowledgeable) answer, one a 'poor' (incorrect) answer, and two distinct 'balanced' options (e.g., partially correct or common misconceptions). For each question, provide a brief 'feedback' explaining the correct concept. The output must be a valid JSON array of objects with the structure: { question: string, options: { text: string, mindset: 'rich'|'poor'|'balanced' }[], feedback: string }. Do not include any markdown formatting.`;
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: quizQuestionSchema,
        }
    });

    return JSON.parse(response.text);
}


export async function generateRiskQuestions(language: 'en' | 'ar'): Promise<RiskQuestion[]> {
    const numQuestions = Math.floor(Math.random() * 6) + 10; // Generate a random number of questions between 10 and 15.
    const prompt = `Generate ${numQuestions} multiple-choice questions in ${language} to assess a user's financial profile. Include a mix of questions to determine general risk tolerance AND questions to specifically measure loss aversion (framing choices in terms of potential gains vs. potential losses). Each question should have 4 distinct options representing different levels of risk-taking. The options should be varied.
    The output must be a valid JSON array of objects with the structure: { question: string, options: string[] }. Do not include any markdown formatting.`;

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

    return JSON.parse(response.text);
}

export async function analyzeRiskProfile(answers: UserRiskAnswer[], age: number, language: 'en' | 'ar'): Promise<RiskProfile> {
    const prompt = `Analyze the following user's answers to a risk tolerance and loss aversion questionnaire to determine their investor profile. The user is ${age} years old and their answers are in ${language}.
    Answers: ${JSON.stringify(answers)}
    
    Based on the answers and age, provide a detailed risk profile. The output must be a single valid JSON object with the following structure:
    {
      "profile": "string (e.g., Conservative, Moderate, Aggressive)",
      "description": "string (a short paragraph describing the profile)",
      "allocation": { "stocks": number, "bonds": number },
      "assetComfort": { "stocks": number (0-100), "bonds": number (0-100), "realEstate": number (0-100), "commodities": number (0-100) },
      "explanation": "string (Explain the '100 minus age' rule for asset allocation and how you adapted it for this user)",
      "overallRiskPercentage": number (0-100, where 100 is highest risk),
      "lossAversionPercentage": number (0-100, where 100 means very high loss aversion),
      "lossAversionExplanation": "string (Explain what loss aversion is and what the user's score means)"
    }
    The sum of "stocks" and "bonds" in allocation must be 100. Do not include any markdown formatting.`;
    
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
                            stocks: { type: Type.NUMBER },
                            bonds: { type: Type.NUMBER }
                        },
                        required: ['stocks', 'bonds']
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
                    lossAversionExplanation: { type: Type.STRING }
                },
                required: ['profile', 'description', 'allocation', 'assetComfort', 'explanation', 'overallRiskPercentage', 'lossAversionPercentage', 'lossAversionExplanation']
            }
        }
    });

    return JSON.parse(response.text);
}

export async function getBudgetSuggestions(income: number, expenses: BudgetItem[], language: 'en' | 'ar'): Promise<string[]> {
    const prompt = `A user speaking ${language} has a monthly income of ${income} and the following expenses: ${JSON.stringify(expenses)}.
    Analyze their budget and provide 3-5 actionable and personalized suggestions for saving money or optimizing their spending.
    Crucially, your advice should also consider financial resilience. Suggest adjustments they could make to their budget to better prepare for unexpected financial events, such as a personal crisis or economic downturn.
    The output must be a valid JSON array of strings. Do not include any markdown formatting.`;
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
            }
        }
    });
    
    return JSON.parse(response.text);
}

export async function getFixedVariableAnalysis(items: BudgetItem[], language: 'en' | 'ar'): Promise<BudgetAnalysis> {
    const prompt = `Analyze the user's budget which is in ${language}.
User's budget items: ${JSON.stringify(items)}
Each item is marked as 'fixed' or 'variable'.

First, provide a clear, general explanation of the difference between fixed and variable expenses.
Second, analyze the user's provided list and create a brief summary of their spending habits based on the fixed vs. variable ratio.
Third, provide 2-3 actionable strategies for managing these expenses, especially focusing on how to control variable costs and plan for changes in fixed costs (like rent increases). The advice should be encouraging.

The output must be a single valid JSON object with the structure:
{
  "explanation": "string (The general definition of fixed vs variable expenses)",
  "analysis": "string (The summary of the user's specific budget)",
  "strategies": "string[] (An array of actionable tips)"
}
Do not include any markdown formatting.`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    explanation: { type: Type.STRING },
                    analysis: { type: Type.STRING },
                    strategies: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING }
                    }
                },
                required: ['explanation', 'analysis', 'strategies']
            }
        }
    });
    
    return JSON.parse(response.text);
}

export async function createInvestmentPlan(details: { goal: string, target: number, timeline: number, initial: number, monthly: number, risk: string }, language: 'en' | 'ar'): Promise<InvestmentPlan> {
    const prompt = `Create a personalized investment plan for a user speaking ${language}.
    User's details:
    - Goal: ${details.goal}
    - Target Amount: ${details.target}
    - Timeline (years): ${details.timeline}
    - Initial Investment: ${details.initial}
    - Monthly Contribution: ${details.monthly}
    - Risk Tolerance: ${details.risk}

    The output must be a single valid JSON object with the following structure:
    {
      "planName": "string",
      "summary": "string",
      "assetAllocation": { [key: string]: number },
      "strategies": "string[]",
      "disclaimer": "string"
    }
    The values in assetAllocation must sum to 100. Do not include any markdown formatting.`;

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
                        additionalProperties: { type: Type.NUMBER }
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
    
    return JSON.parse(response.text);
}

export async function getFinancialNews(language: 'en' | 'ar'): Promise<GenerateContentResponse> {
    const prompt = `In ${language}, provide the top 5 latest financial news headlines. For each headline, write a brief one-sentence summary. Format the entire response as a single block of text, with each news item separated by a newline.`;

    const response = await ai.models.generateContent({
       model: "gemini-2.5-flash",
       contents: prompt,
       config: {
         tools: [{googleSearch: {}}],
       },
    });

    return response;
}