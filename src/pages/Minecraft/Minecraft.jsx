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
                        animate={{ y: [0, 20, 0] }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                    {/* Shadow */}
                    <motion.img
                        src={mcShadow}
                        alt=""
                        className="select-none w-[88px] sm:w-[99px] md:w-[110px] -mt-6"
                        animate={{
                            y: [0, -5, 0],
                            opacity: [0.45, 0.15, 0.45],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                </div>

                {/* RIGHT */}
                <div className='mb-5'>
                    <h1
                        className="text-2xl md:text-4xl font-extrabold mb-4 bg-linear-to-r from-blue-400 via-purple-500 to-red-500 bg-clip-text text-transparent gradient-animate-text"
                    >
                        Survival Minecraft Server
                    </h1>

                    <p className="text-base-200 max-w-[500px] mb-6">
                        A friendly survival Minecraft server with QoL, Bedrock crossplay,
                        minigames, and <span className='font-extrabold text-xl text-yellow-400'>economy</span> synced with our Discord server.
                    </p>
                </div>
            </div>

            <div className='flex justify-center my-5'>
                <MinecraftStatus />
            </div>

            {/* VOTE */}
            <div className='text-center'>
                <h2 className='text-4xl font-bold text-base-200 mb-3'>Vote Links</h2>
                <p className='text-base-200 mb-5'>
                    Support the server by voting and earn rewards 🎁
                </p>

                <div className='flex flex-wrap gap-3 justify-center mb-0 md:mb-5'>
                    {[1, 2, 3, 4, 5].map(v => (
                        <motion.div key={v} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
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
            </div>
        </div>
    );
};

export default Minecraft;