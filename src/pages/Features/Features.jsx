import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import joining from '../../assets/joining.mp4';
import connect from '../../assets/Connect.mp4';
import food from '../../assets/Food_Habits.mp4';
import count from '../../assets/Count.mp4';
import pokemon from '../../assets/catch_em_all.mp4';

const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: 'easeOut', delay }
    }
});

const fadeLeft = (delay = 0) => ({
    hidden: { opacity: 0, x: -50 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.7, ease: 'easeOut', delay }
    }
});

const fadeRight = (delay = 0) => ({
    hidden: { opacity: 0, x: 50 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.7, ease: 'easeOut', delay }
    }
});

const cards = [
    {
        id: 1,
        title: 'Joining',
        gradientStyle: 'linear-gradient(90deg, #3b82f6, #a855f7, #3b82f6)',
        direction: 'right',
        video: joining,
        arrow: 'right',
        content: <>Click <a className='underline text-blue-500 font-bold' href="https://discord.gg/bHxmdn7wQg" target='_blank'>join</a> or use the invite link. Once your join application is approved or you are on the server, select the roles for special access, such as the samp section or game roles, and giveaway roles for event-based pings.</>,
    },
    {
        id: 2,
        title: 'Connect',
        gradientStyle: 'linear-gradient(90deg, #10b981, #14b8a6, #06b6d4, #10b981)',
        direction: 'left',
        video: connect,
        arrow: 'left',
        content: "You'll find people welcoming you left and right whenever they see your join notification. Grab this opportunity to introduce yourself and make new friends.",
    },
    {
        id: 3,
        title: 'Food Habits',
        gradientStyle: 'linear-gradient(90deg, #f59e0b, #f97316, #ef4444, #f59e0b)',
        direction: 'right',
        video: food,
        arrow: 'right',
        content: "Like sharing or finding out about food culture from all over the world? Share yours or check out what others have shared in our Food Corner channel so far. Food conversations tend to get you hungry sometimes.",
    },
    {
        id: 4,
        title: 'Count Together',
        gradientStyle: 'linear-gradient(90deg, #14b8a6, #3b82f6, #ef4444, #14b8a6)',
        direction: 'left',
        video: count,
        arrow: 'left',
        content: "Count numbers with your friend in sequence. Mistakes are temporarily mentioned and later deleted.",
    },
    {
        id: 5,
        title: "Gotta Catch 'em All",
        gradientStyle: 'linear-gradient(90deg, #3b82f6, #f97316, #eab308, #3b82f6)',
        direction: 'right',
        video: pokemon,
        arrow: 'right',
        content: "A Poké fan? Catch random pokémons that spawn in our dedicated pokémon channel by guessing their name. Have fun battles or trade your pokémon with other members of the community. Most of us are the collector type rather than the battle type.",
    },
];

const Features = () => {
    return (
        <>
        <div className='w-11/12 mx-auto min-h-screen space-y-4 py-30 text-white'>
            {cards.map((card, i) => {
                const isRight = card.direction === 'right';
                const textVariant = isRight ? fadeLeft(0) : fadeRight(0);
                const videoVariant = isRight ? fadeRight(0.15) : fadeLeft(0.15);

                const textContent = (
                    <motion.div
                        variants={textVariant}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className='md:col-span-7 p-8 md:p-16 flex flex-col justify-center space-y-6'
                    >
                        <h2
                            className='text-3xl cursor-progress inline-flex items-center gap-5 group md:text-4xl font-bold bg-clip-text text-transparent'
                            style={{
                                backgroundImage: card.gradientStyle,
                                backgroundSize: '300% 100%',
                                animation: 'gradientShift 4s ease infinite',
                            }}
                        >
                            {card.arrow === 'left' && (
                                <span className='text-white group-hover:-translate-x-1 transition-transform'>
                                    <FaArrowLeftLong size={20} />
                                </span>
                            )}
                            {card.title}
                            {card.arrow === 'right' && (
                                <span className='text-white group-hover:translate-x-1 transition-transform'>
                                    <FaArrowRightLong size={20} />
                                </span>
                            )}
                        </h2>
                        <p className='text-gray-400 text-lg leading-relaxed max-w-lg'>
                            {card.content}
                        </p>
                    </motion.div>
                );

                const videoContent = (
                    <motion.div
                        variants={videoVariant}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className='md:col-span-5 relative h-[350px] md:h-auto'
                    >
                        <video
                            src={card.video}
                            className='w-full h-full object-cover'
                            autoPlay
                            muted
                            loop
                            playsInline
                            onMouseEnter={e => e.target.pause()}
                            onMouseLeave={e => e.target.play()}
                        >
                            Your browser does not support the video tag.
                        </video>
                        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-[#0a0a0a] pointer-events-none"></div>
                    </motion.div>
                );

                return (
                    <motion.div
                        key={card.id}
                        variants={fadeUp(0)}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.15 }}
                        whileHover={{
                            borderColor: 'rgba(255,255,255,0.12)',
                            boxShadow: '0 0 30px rgba(96, 165, 250, 0.1), 0 0 80px rgba(96, 165, 250, 0.05)',
                            y: -3,
                        }}
                        transition={{ duration: 0.12 }}
                        className='grid grid-cols-1 md:grid-cols-12 gap-0 overflow-hidden rounded-3xl border border-gray-800 bg-[#0a0a0a] items-stretch'
                        style={{ boxShadow: 'none' }}
                    >
                        {isRight ? <>{textContent}{videoContent}</> : <>{videoContent}{textContent}</>}
                    </motion.div>
                );
            })}
        </div>

        <style>{`
            @keyframes gradientShift {
                0%   { background-position: 0% 50%; }
                50%  { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
        `}</style>
        </>
    );
};

export default Features;