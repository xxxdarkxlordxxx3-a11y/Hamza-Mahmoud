
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
