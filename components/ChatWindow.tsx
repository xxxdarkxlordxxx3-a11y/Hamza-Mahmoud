import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ChatMessage } from '../types';
import { streamChatResponse } from '../services/geminiService';
import { SendIcon, CloseIcon } from './IconComponents';
import ChatBubble from './ChatBubble';
import { useLanguage } from '../context/LanguageContext';

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { language, t } = useLanguage();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSendMessage = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { id: Date.now().toString(), role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const modelMessageId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, { id: modelMessageId, role: 'model', text: '' }]);

    try {
      const stream = streamChatResponse(input, language);
      for await (const chunk of stream) {
        setMessages(prev =>
          prev.map(msg =>
            msg.id === modelMessageId ? { ...msg, text: msg.text + chunk } : msg
          )
        );
      }
    } catch (error) {
      console.error("Error streaming response:", error);
      setMessages(prev =>
        prev.map(msg =>
          msg.id === modelMessageId ? { ...msg, text: "Sorry, I couldn't get a response. Please check your API key and try again." } : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, language]);


  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="fixed inset-0 sm:inset-auto sm:bottom-24 ltr:sm:right-8 rtl:sm:left-8 w-full h-full sm:w-[400px] sm:h-[600px] bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-slate-300 dark:border-slate-700 rounded-none sm:rounded-2xl shadow-2xl flex flex-col z-40"
        >
          <header className="flex items-center justify-between p-4 border-b border-slate-300 dark:border-slate-700 rtl:flex-row-reverse">
            <h3 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">{t('chatTitle')}</h3>
            <button onClick={onClose} className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors">
              <CloseIcon />
            </button>
          </header>

          <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4">
              <ChatBubble message={{ id: 'initial', role: 'model', text: t('chatGreeting') }} />
              {messages.map(msg => (
                <ChatBubble key={msg.id} message={msg} />
              ))}
              {isLoading && messages[messages.length - 1]?.role === 'model' && (
                  <div className="flex justify-start">
                    <div className="bg-slate-300 dark:bg-slate-700 rounded-lg p-2 animate-pulse">
                        <div className="h-2 w-4 bg-slate-400 dark:bg-slate-500 rounded-full"></div>
                    </div>
                  </div>
              )}
            </div>
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-300 dark:border-slate-700">
            <div className="flex items-center bg-slate-100 dark:bg-slate-900 rounded-lg p-2 rtl:flex-row-reverse">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder={t('chatPlaceholder')}
                className="flex-1 bg-transparent text-slate-800 dark:text-white placeholder-slate-500 focus:outline-none rtl:text-right"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-cyan-500 rounded-md p-2 ltr:ml-2 rtl:mr-2 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors"
              >
                <SendIcon />
              </button>
            </div>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChatWindow;