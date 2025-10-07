import React from 'react';
import type { ChatMessage } from '../types';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

interface ChatBubbleProps {
  message: ChatMessage;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const { language } = useLanguage();
  const isUser = message.role === 'user';

  const userBubbleClasses = language === 'ar' 
    ? 'rounded-e-xl rounded-es-xl' 
    : 'rounded-s-xl rounded-ee-xl';
  const modelBubbleClasses = language === 'ar' 
    ? 'rounded-s-xl rounded-ee-xl' 
    : 'rounded-e-xl rounded-es-xl';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex items-start gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`flex flex-col w-full max-w-[320px] leading-1.5 p-3 border-gray-200 ${
          isUser
            ? `bg-gradient-to-br from-sky-500 to-blue-600 text-white ${userBubbleClasses}`
            : `bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white ${modelBubbleClasses}`
        }`}
      >
        <p className={`text-sm font-normal whitespace-pre-wrap ${language === 'ar' ? 'text-right' : 'text-left'}`}>{message.text}</p>
      </div>
    </motion.div>
  );
};

export default ChatBubble;