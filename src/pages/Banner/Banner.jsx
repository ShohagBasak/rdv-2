import React from 'react';
import { motion } from 'framer-motion';
import bannerImg from '../../assets/banner_rimels_discord_website_2.png';

const Banner = () => {
    return (
        <section className="md:container mx-auto py-10">
            <motion.div
                className="flex justify-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
            >
                <img className='z-10' src={bannerImg} alt="" />
            </motion.div>

            <div className="w-3/4 mx-auto text-center overflow-hidden z-50 -mt-10 lg:-mt-28">
                <motion.h1
                    className="text-3xl mb-5 md:text-6xl font-extrabold bg-clip-text text-transparent"
                    style={{
                        backgroundImage: 'linear-gradient(90deg, #60a5fa, #ef4444, #a855f7, #60a5fa)',
                        backgroundSize: '300% 100%',
                        animation: 'gradientShift 4s ease infinite',
                    }}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
                >
                    Uniting players through joy, magic, and adventure.
                </motion.h1>

                <motion.p
                    className="text-base font-medium mb-10 text-gray-300"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.55 }}
                >
                    A friendly gaming community. Come watch anime, play games, or talk about anime and games with us. Whatever it is, as long as you don't get all political and rude, this will be the perfect community to join!
                    Besides actual video games, we also have some Discord chat-based games for you to enjoy and gain perks from.
                </motion.p>
            </div>

            <style>{`
                @keyframes gradientShift {
                    0%   { background-position: 0% 50%;   filter: drop-shadow(0 0 18px rgba(96, 165, 250, 0.2)) drop-shadow(0 0 40px rgba(96, 165, 250, 0.1)); }
                    50%  { background-position: 100% 50%; filter: drop-shadow(0 0 18px rgba(239, 68, 68, 0.2))  drop-shadow(0 0 40px rgba(168, 85, 247, 0.1)); }
                    100% { background-position: 0% 50%;   filter: drop-shadow(0 0 18px rgba(96, 165, 250, 0.2)) drop-shadow(0 0 40px rgba(96, 165, 250, 0.1)); }
                }
            `}</style>
        </section>
    );
};

export default Banner;