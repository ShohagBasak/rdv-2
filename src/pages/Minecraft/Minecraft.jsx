import React from 'react';
import { motion, useScroll } from "motion/react";
import { Link } from 'react-router';
import mcBg from '../../assets/new_logo_400px.png';
import mcShadow from '../../assets/new_logo_400px_shadow.png';
import "./GTE/gradientText.css";
import MinecraftStatus from './MinecraftStatus';

const Minecraft = () => {
    const { scrollYProgress } = useScroll();

    return (
        <div className='max-w-11/12 pt-20 mx-auto pb-5 min-h-screen' style={{ scaleX: scrollYProgress }}>
            <div className="flex flex-col md:flex-row items-start md:items-end justify-center gap-5 p-5">
                {/* LEFT - Logo + Shadow */}
                <div className="mx-auto md:mx-0 w-fit flex flex-col items-center mt-0 md:mt-18 md:-translate-x-8">
                    {/* Main Logo */}
                    <motion.img
                        src={mcBg}
                        alt="Minecraft Banner"
                        className="rounded-2xl select-none w-[88px] sm:w-[99px] md:w-[110px] relative z-10"
                        animate={{
                            y: [0, -14, 0],
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                    {/* Shadow */}
                    <motion.img
                        src={mcShadow}
                        alt=""
                        className="select-none w-[88px] sm:w-[99px] md:w-[110px] -mt-10"
                        animate={{
                            y: [0, -5, 0],
                            scaleX: [1.1, 0.88, 1.1],
                            opacity: [0.6, 0.2, 0.6],
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        style={{ filter: 'blur(10px)' }}
                    />
                </div>

                {/* RIGHT */}
                <motion.div
                    className='mb-5'
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
                >
                    <h1 className="text-2xl md:text-4xl font-extrabold mb-4 bg-linear-to-r from-blue-400 via-purple-500 to-red-500 bg-clip-text text-transparent gradient-animate-text">
                        Survival Minecraft Server
                    </h1>
                    <motion.p
                        className="text-base-200 max-w-[500px] mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.5 }}
                    >
                        A friendly survival Minecraft server with QoL, Bedrock crossplay,
                        minigames, and <span className='font-extrabold text-xl text-yellow-400'>economy</span> synced with our Discord server.
                    </motion.p>
                </motion.div>
            </div>

            <motion.div
                className='flex justify-center my-5'
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
            >
                <MinecraftStatus />
            </motion.div>

            {/* VOTE */}
            <motion.div
                className='text-center'
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
            >
                <h2 className='text-4xl font-bold text-base-200 mb-3'>Vote Links</h2>
                <motion.p
                    className='text-base-200 mb-5'
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    Support the server by voting and earn rewards 🎁
                </motion.p>

                <div className='flex flex-wrap gap-3 justify-center mb-0 md:mb-5'>
                    {[1, 2, 3, 4, 5].map((v, i) => (
                        <motion.div
                            key={v}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, ease: 'easeOut', delay: i * 0.08 }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {v === 4 || v === 5 ? (
                                <button
                                    disabled
                                    className="btn rounded-full bg-gray-700 text-white border-2 border-gray-600 font-extrabold capitalize cursor-not-allowed opacity-60"
                                >
                                    TBA
                                </button>
                            ) : (
                                <Link
                                    to={`/minecraft/vote${v}`}
                                    target="_blank"
                                    className="btn rounded-full bg-blue-950 hover:bg-blue-800 text-white border-2 border-blue-700 font-extrabold capitalize"
                                >
                                    Vote {v}
                                </Link>
                            )}
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default Minecraft;