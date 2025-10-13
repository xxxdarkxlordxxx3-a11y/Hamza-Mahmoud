import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ChatMessage } from '../types';
import { GoogleGenAI, Modality, Blob, LiveServerMessage } from '@google/genai';
import type { LiveSession } from '@google/genai';
import { CloseIcon, LoadingIcon, MicrophoneIcon } from './IconComponents';
import ChatBubble from './ChatBubble';
import { useLanguage } from '../context/LanguageContext';

// --- Audio & Base64 Helper Functions ---
function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

function createBlob(data: Float32Array): Blob {
  const l = data.length;
  const int16 = new Int16Array(l);
  for (let i = 0; i < l; i++) {
    int16[i] = data[i] * 32768;
  }
  return {
    data: encode(new Uint8Array(int16.buffer)),
    mimeType: 'audio/pcm;rate=16000',
  };
}


interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [micPermission, setMicPermission] = useState<'prompt' | 'granted' | 'denied'>('prompt');
  const [connectionState, setConnectionState] = useState<'disconnected' | 'connecting' | 'connected' | 'error'>('disconnected');
  const [currentUserTranscription, setCurrentUserTranscription] = useState('');
  const [currentModelTranscription, setCurrentModelTranscription] = useState('');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { language, t } = useLanguage();
  
  // Refs for stable objects that should not cause re-renders or be stale in callbacks
  const sessionPromiseRef = useRef<Promise<LiveSession> | null>(null);
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const audioSourcesRef = useRef(new Set<AudioBufferSourceNode>());
  const nextStartTimeRef = useRef(0);
  
  // Refs to hold latest transcription state for use in callbacks
  const userTranscriptionRef = useRef('');
  const modelTranscriptionRef = useRef('');
  useEffect(() => { userTranscriptionRef.current = currentUserTranscription }, [currentUserTranscription]);
  useEffect(() => { modelTranscriptionRef.current = currentModelTranscription }, [currentModelTranscription]);


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(scrollToBottom, [messages, currentUserTranscription, currentModelTranscription]);

  const disconnect = useCallback(() => {
    streamRef.current?.getTracks().forEach(track => track.stop());
    inputAudioContextRef.current?.close();
    outputAudioContextRef.current?.close();
    processorRef.current?.disconnect();
    sessionPromiseRef.current?.then(session => session.close());

    streamRef.current = null;
    inputAudioContextRef.current = null;
    outputAudioContextRef.current = null;
    processorRef.current = null;
    sessionPromiseRef.current = null;
    
    setConnectionState('disconnected');
  }, []);
  
  const connect = useCallback(async () => {
    setConnectionState('connecting');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      setMicPermission('granted');

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

      // Fix for: Property 'webkitAudioContext' does not exist on type 'Window & typeof globalThis'.
      inputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      // Fix for: Property 'webkitAudioContext' does not exist on type 'Window & typeof globalThis'.
      outputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });

      sessionPromiseRef.current = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        callbacks: {
          onopen: () => {
            setConnectionState('connected');
            const source = inputAudioContextRef.current!.createMediaStreamSource(stream);
            processorRef.current = inputAudioContextRef.current!.createScriptProcessor(4096, 1, 1);
            processorRef.current.onaudioprocess = (audioProcessingEvent) => {
              const inputData = audioProcessingEvent.inputBuffer.getChannelData(0);
              const pcmBlob = createBlob(inputData);
              sessionPromiseRef.current?.then((session) => {
                session.sendRealtimeInput({ media: pcmBlob });
              });
            };
            source.connect(processorRef.current);
            processorRef.current.connect(inputAudioContextRef.current!.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            if (message.serverContent?.inputTranscription) {
              setCurrentUserTranscription(prev => prev + message.serverContent.inputTranscription.text);
            }
            if (message.serverContent?.outputTranscription) {
              setCurrentModelTranscription(prev => prev + message.serverContent.outputTranscription.text);
            }
            if (message.serverContent?.turnComplete) {
              const finalUser = userTranscriptionRef.current.trim();
              const finalModel = modelTranscriptionRef.current.trim();
              setMessages(prev => {
                const newMessages = [...prev];
                if (finalUser) newMessages.push({ id: `user-${Date.now()}`, role: 'user', text: finalUser });
                if (finalModel) newMessages.push({ id: `model-${Date.now()}`, role: 'model', text: finalModel });
                return newMessages;
              });
              setCurrentUserTranscription('');
              setCurrentModelTranscription('');
            }

            const base64EncodedAudioString = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64EncodedAudioString) {
              const outputCtx = outputAudioContextRef.current!;
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputCtx.currentTime);
              const audioBuffer = await decodeAudioData(decode(base64EncodedAudioString), outputCtx, 24000, 1);
              const source = outputCtx.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(outputCtx.destination);
              source.addEventListener('ended', () => audioSourcesRef.current.delete(source));
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              audioSourcesRef.current.add(source);
            }
          },
          onerror: (e: ErrorEvent) => {
            console.error('Live session error:', e);
            setConnectionState('error');
            disconnect();
          },
          onclose: () => {
            disconnect();
          },
        },
        config: {
          responseModalities: [Modality.AUDIO],
          inputAudioTranscription: {},
          outputAudioTranscription: {},
          systemInstruction: `You are a helpful and friendly financial assistant for the "Rich Mindset" app. The user is speaking ${language}. Provide concise, helpful, and encouraging answers.`
        },
      });

    } catch (error) {
        console.error("Mic permission or connection failed:", error);
        setMicPermission('denied');
        setConnectionState('error');
    }
  }, [language, disconnect]);

  useEffect(() => {
    if (isOpen) {
      setMessages([]);
      connect();
    } else {
      disconnect();
    }
    return () => disconnect();
  }, [isOpen, connect, disconnect]);

  const renderStatus = () => {
      if (micPermission === 'denied') return <p className="text-sm text-center text-red-500">{t('micPermissionDenied')}</p>;
      if (micPermission === 'prompt') return <p className="text-sm text-center">{t('micPermissionPrompt')}</p>;
      if (connectionState === 'connecting') return <p className="text-sm text-center flex items-center justify-center gap-2"><LoadingIcon/> {t('connecting')}</p>;
      if (connectionState === 'connected') return <p className="text-sm text-center font-semibold text-green-500">{t('listening')}</p>;
      if (connectionState === 'error') return <p className="text-sm text-center text-red-500">{t('errorOccurred')}</p>;
      return null;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="fixed inset-0 sm:inset-auto sm:bottom-24 ltr:sm:right-8 rtl:sm:left-8 w-full h-full sm:w-[400px] sm:h-[600px] bg-light-card/30 dark:bg-dark-card/30 backdrop-blur-xl border border-light-border/50 dark:border-dark-border/50 rounded-none sm:rounded-2xl shadow-2xl flex flex-col z-40"
        >
          <header className="flex items-center justify-between p-4 border-b border-light-border dark:border-dark-border rtl:flex-row-reverse">
            <h3 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400 dark:from-blue-400 dark:to-cyan-300">{t('chatTitle')}</h3>
            <button onClick={onClose} className="text-light-text/60 dark:text-dark-text/60 hover:text-light-text dark:hover:text-dark-text transition-colors">
              <CloseIcon />
            </button>
          </header>

          <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4">
              <ChatBubble message={{ id: 'initial', role: 'model', text: t('chatGreeting') }} />
              {messages.map(msg => <ChatBubble key={msg.id} message={msg} />)}
              {currentUserTranscription && <ChatBubble message={{ id: 'current-user', role: 'user', text: currentUserTranscription }} />}
              {currentModelTranscription && <ChatBubble message={{ id: 'current-model', role: 'model', text: currentModelTranscription }} />}
            </div>
            <div ref={messagesEndRef} />
          </div>
          
          <div className="p-4 border-t border-light-border dark:border-dark-border flex flex-col items-center justify-center h-28">
              {renderStatus()}
              {connectionState === 'connected' && (
                  <div className="mt-2 w-full max-w-[60px] h-1 bg-green-500 rounded-full animate-[pulse_1.5s_cubic-bezier(0.4,0,0.6,1)_infinite]"></div>
              )}
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChatWindow;