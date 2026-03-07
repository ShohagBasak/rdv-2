import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import eco from '../../assets/eco (1).svg'
import vc from '../../assets/vc (1).svg'
import bot from '../../assets/bot (1).svg'
import game from '../../assets/game (1).svg'

const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.65, ease: 'easeOut', delay }
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
    { icon: eco, alt: 'eco', title: 'Economy System', content: 'Economy based color, sound board, text-to-speech, name change role access.' },
    { icon: vc,  alt: 'vc',  title: '24/7 VC',        content: 'Main Voice Channels are locked behind activity role.' },
    { icon: bot, alt: 'bot', title: 'Fun game bots',   content: 'Channels themed after many games and real life events.' },
    { icon: game,alt: 'game',title: 'Events & Games',  content: 'Co-op, party, single player games and streaming.' },
];

const AboutUs = () => {
    return (
        <section className="max-w-[1440px] pt-12 md:pt-24 mx-auto px-5 md:px-20 lg:px-32">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                <div className="lg:col-span-8">
                    {/* Header */}
                    <div className="mb-10">
                        <motion.div
                            variants={fadeUp(0)}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            className="badge badge-md mb-4 bg-blue-950 border-blue-700 text-gray-300 p-3 font-semibold"
                        >
                            What you get with us
                        </motion.div>

                        <motion.h2
                            variants={fadeUp(0.1)}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            className="text-3xl md:text-5xl text-gray-200 font-bold mb-6"
                        >
                            A positive community where,
                        </motion.h2>

                        <motion.p
                            variants={fadeUp(0.2)}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            className="font-medium text-gray-400 max-w-xl"
                        >
                            we share game, anime, fun and valuable life experiences
                            with our members from all over the world.
                        </motion.p>
                    </div>

                    {/* Collapse Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
                        <div className="flex flex-col gap-5">
                            {[cards[0], cards[1]].map((card, i) => (
                                <motion.div
                                    key={card.alt}
                                    variants={fadeUp(i * 0.12)}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 0.2 }}
                                    className="collapse collapse-arrow bg-blue-950 border-2 border-blue-700 transition-all duration-300 cursor-pointer"
                                    style={{ boxShadow: 'none' }}
                                    whileHover={{
                                        borderColor: 'rgba(96, 165, 250, 1)',
                                        boxShadow: '0 0 20px rgba(96, 165, 250, 0.45), 0 0 60px rgba(96, 165, 250, 0.2), 0 0 100px rgba(96, 165, 250, 0.08)',
                                        y: -5,
                                        scale: 1.02,
                                    }}
                                    transition={{ duration: 0.12 }}
                                >
                                    <input type="checkbox" />
                                    <div className="collapse-title flex items-center gap-3 font-bold text-xl text-white">
                                        <img className="w-8 h-8" src={card.icon} alt={card.alt} /> {card.title}
                                    </div>
                                    <div className="collapse-content text-gray-400">
                                        <p>{card.content}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="flex flex-col gap-5">
                            {[cards[2], cards[3]].map((card, i) => (
                                <motion.div
                                    key={card.alt}
                                    variants={fadeUp((i + 1) * 0.12)}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 0.2 }}
                                    className="collapse collapse-arrow bg-blue-950 border-2 border-blue-700 transition-all duration-300 cursor-pointer"
                                    style={{ boxShadow: 'none' }}
                                    whileHover={{
                                        borderColor: 'rgba(96, 165, 250, 1)',
                                        boxShadow: '0 0 20px rgba(96, 165, 250, 0.45), 0 0 60px rgba(96, 165, 250, 0.2), 0 0 100px rgba(96, 165, 250, 0.08)',
                                        y: -5,
                                        scale: 1.02,
                                    }}
                                    transition={{ duration: 0.12 }}
                                >
                                    <input type="checkbox" />
                                    <div className="collapse-title flex items-center gap-3 font-bold text-xl text-white">
                                        <img className="w-8 h-8" src={card.icon} alt={card.alt} /> {card.title}
                                    </div>
                                    <div className="collapse-content text-gray-400">
                                        <p>{card.content}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <motion.div
                        variants={fadeUp(0.3)}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        className="mt-8"
                    >
                        <Link to="/feature">
                            <button className="btn rounded-full bg-blue-950 hover:bg-blue-800 text-white border-2 border-blue-700 font-extrabold px-8">
                                View Details
                            </button>
                        </Link>
                    </motion.div>
                </div>

                {/* Discord Widget */}
                <motion.div
                    variants={fadeRight(0.2)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className='lg:col-span-4 flex justify-center items-start'
                >
                    <iframe
                        src="https://discord.com/widget?id=425965981324804096&theme=dark"
                        width="100%"
                        height="500"
                        allowTransparency="true"
                        frameBorder="0"
                        className="rounded-xl max-w-[350px] border border-blue-700"
                        style={{ boxShadow: '0 0 30px rgba(96, 165, 250, 0.15), 0 0 80px rgba(96, 165, 250, 0.07)' }}
                        sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                    ></iframe>
                </motion.div>
            </div>
        </section>
    );
};

export default AboutUs;