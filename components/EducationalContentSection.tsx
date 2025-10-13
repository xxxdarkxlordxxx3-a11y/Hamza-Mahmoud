import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../localization/translations';
import { VideoCameraIcon } from './IconComponents';
import Modal from './Modal';

const EducationalContentSection: React.FC = () => {
    const { language, t } = useLanguage();
    const videos = translations[language].videos;
    const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);

    const cardVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1,
                duration: 0.5,
                ease: "easeOut"
            }
        })
    };
    
    return (
        <section id="education" className="py-20 px-4">
             <div className="container mx-auto">
                <div className="text-center mb-12">
                     <div className="flex justify-center items-center gap-4 mb-4 text-light-text dark:text-dark-text">
                        <VideoCameraIcon className="h-8 w-8 text-cyan-500" />
                        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-light-text dark:text-dark-text">{t('educationalContent')}</h2>
                    </div>
                    <p className="text-lg text-light-text/80 dark:text-dark-text/80 max-w-3xl mx-auto">{t('educationalContentSubtitle')}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {videos.map((video, index) => (
                        <motion.div
                            key={video.id}
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            custom={index}
                            onClick={() => setSelectedVideoId(video.id)}
                            className="group cursor-pointer"
                        >
                            <div className="relative overflow-hidden rounded-lg shadow-lg">
                                <img src={video.thumbnail} alt={video.title} className="w-full h-auto transition-transform duration-300 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                     <svg className="w-16 h-16 text-white/70 group-hover:text-white group-hover:scale-110 transition-all" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
             </div>

             <Modal isOpen={!!selectedVideoId} onClose={() => setSelectedVideoId(null)}>
                {selectedVideoId && (
                    <div className="aspect-video">
                        <iframe 
                            className="w-full h-full rounded-lg"
                            src={`https://www.youtube.com/embed/${selectedVideoId}?autoplay=1`}
                            title="YouTube video player" 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen>
                        </iframe>
                    </div>
                )}
             </Modal>
        </section>
    );
};

export default EducationalContentSection;