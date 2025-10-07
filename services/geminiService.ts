import { GoogleGenAI, Chat, Type } from "@google/genai";
import { systemInstructions, translations } from "../localization/translations";
import type { QuizQuestion } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable not set. Please set it in your environment. App will use fallback data.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const chats: { [key: string]: Chat } = {};

function getChat(lang: 'en' | 'ar'): Chat {
  if (!chats[lang]) {
    chats[lang] = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: systemInstructions[lang],
      },
    });
  }
  return chats[lang];
}

export async function* streamChatResponse(prompt: string, lang: 'en' | 'ar' = 'en') {
  if (!API_KEY) {
    yield "API Key not configured. Please check your environment variables.";
    return;
  }
  try {
    const chat = getChat(lang);
    const responseStream = await chat.sendMessageStream({ message: prompt });
    for await (const chunk of responseStream) {
      if (chunk.text) {
        yield chunk.text;
      }
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    yield "I'm sorry, but I've encountered an error. This might be due to an issue with the API configuration. Please try again later.";
  }
}

export async function generateQuizQuestions(lang: 'en' | 'ar' = 'en'): Promise<QuizQuestion[]> {
  if (!API_KEY) {
    console.error("API_KEY environment variable not set. Using fallback quiz data.");
    throw new Error("API Key not configured.");
  }

  const schema = {
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
              mindset: { type: Type.STRING, enum: ['rich', 'poor', 'balanced'] },
            },
            required: ['text', 'mindset'],
          },
        },
        feedback: { type: Type.STRING },
      },
      required: ['question', 'options', 'feedback'],
    },
  };

  const languagePrompt = lang === 'ar' 
    ? "The questions, options, and feedback must be in Arabic." 
    : "The questions, options, and feedback must be in English.";

  const prompt = `
    Generate 20 unique multiple-choice questions about financial literacy, based on the principles from the book 'Rich Dad Poor Dad'.
    ${languagePrompt}
    For each question:
    1.  Provide exactly four answer options.
    2.  One option must clearly represent a 'rich mindset'.
    3.  One option must clearly represent a 'poor mindset'.
    4.  The other two options must represent a 'balanced' or 'average' mindset, which might seem reasonable but isn't the optimal wealth-building choice.
    5.  Ensure the 'mindset' key for each option is correctly set to 'rich', 'poor', or 'balanced'.
    6.  Provide a brief 'feedback' explanation for each question, explaining why the 'rich mindset' answer is the most effective for building wealth.
    7.  The question should be a scenario or a choice a person has to make.
    Return the data as a JSON array of objects.
  `;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: 'application/json',
            responseSchema: schema,
        },
    });
    
    let jsonStr = response.text.trim();
    // In case the model wraps the JSON in markdown
    jsonStr = jsonStr.replace(/^```json\s*/, '').replace(/\s*```$/, '');

    const generatedQuestions = JSON.parse(jsonStr) as QuizQuestion[];

    if (!Array.isArray(generatedQuestions) || generatedQuestions.length === 0) {
      console.error('API returned invalid or empty data, using fallback.');
      throw new Error('Invalid response format from API.');
    }

    // Basic validation of the first question
    const firstQ = generatedQuestions[0];
    if (!firstQ.question || !firstQ.options || firstQ.options.length !== 4 || !firstQ.feedback) {
        console.error('API response structure is incorrect, using fallback.');
        throw new Error('Invalid response format from API.');
    }

    return generatedQuestions;
  } catch (error) {
    console.error("Error generating quiz questions:", error);
    // Re-throw the error so the component can catch it and use fallback data
    throw error;
  }
}