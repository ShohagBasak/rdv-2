import React, { useState } from 'react';
import { motion, useScroll } from "motion/react";
import { Link } from 'react-router';
import jsmc from '../../assets/minecraft/Java.png';
import bdmc from '../../assets/minecraft/bedrock.png';
import mcBg from '../../assets/minecraft/logo_1.png';

const Minecraft = () => {
    const [copied, setCopied] = useState("");
    const { scrollYProgress } = useScroll()
    const copyText = async (text) => {
        await navigator.clipboard.writeText(text);
        setCopied(text);
        setTimeout(() => setCopied(""), 1500);
    };

    return (
        <div className='max-w-11/12 pt-10 mx-auto min-h-screen' style={{ scaleX: scrollYProgress }}>
            <div className="flex flex-col md:flex-row items-start md:items-end justify-center gap-10 p-5">
                {/* LEFT */}
                <div>
                    <img className='rounded-2xl mt-0 md:mt-18 mx-auto mb-5 w-[200px]' src={mcBg} alt="Minecraft Banner" />
                </div>
                {/* RIGHT */}
                <div className=' mb-5 '>
                    <motion.h1
                        animate={{
                            color: [
                                'oklch(70.7% 0.165 254.624)',
                                'oklch(62.7% 0.265 303.9)',
                                'oklch(63.7% 0.237 25.331)'
                            ],
                            transition: { duration: 4, repeat: Infinity }
                        }}
                        className="text-2xl md:text-4xl font-extrabold mb-4"
                    >
                        Survival Minecraft Server
                    </motion.h1>

                    <p className="text-base-200 max-w-[500px] mb-6">
                        A friendly survival Minecraft server with QoL, Bedrock crossplay,
                        minigames, and <span className='font-extrabold text-xl text-yellow-400'>economy</span> synced with our Discord server.
                    </p>

                    {/* <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="btn rounded-full bg-blue-950 hover:bg-blue-800 text-white border-2 border-blue-700 font-extrabold capitalize"
                    >
                        Get Started
                    </motion.button> */}
                </div>
            </div>
            <div className='flex items-center flex-col md:flex-row justify-center gap-4 max-w-4/12 mx-auto mb-10'>
                <div className='shadow-2xl rounded-2xl bg-black/100'>
                    {/* JAVA */}
                    <div
                        onClick={() => copyText("tiger.qbitnode.com:5400")}
                        className='flex items-center flex-col md:flex-row gap-3 cursor-pointer p-3 hover:bg-black/30 rounded-xl transition'
                    >
                        <motion.div whileHover={{ scale: 1.1 }} className='w-10 rounded-2xl'>
                            <img className='rounded-2xl w-[50px]' src={jsmc} alt="Java" />
                        </motion.div>

                        <div>
                            <p className='text-base-200 font-mono'>
                                <span className='font-bold bg-black/100'>
                                    Java IP (click to copy)
                                </span>
                                <br />
                                <span className='text-blue-500'>
                                tiger.qbitnode.com:5400
                                </span>
                                <br />
                                {copied === "tiger.qbitnode.com:5400" && (
                                    <span className="ml-2 text-green-400 text-sm">IP was successfully copied!</span>
                                )}
                            </p>
                        </div>
                    </div>
                </div>
                <div className='shadow-2xl text-start bg-black/100 rounded-2xl'>
                    {/* BEDROCK */}
                    <div
                        onClick={() => copyText("tiger.qbitnode.com:5533")}
                        className='flex items-center flex-col md:flex-row gap-3 p-3 cursor-pointer hover:bg-black/30 rounded-xl transition'
                    >
                        <motion.div whileHover={{ scale: 1.1 }} className='w-10 rounded-2xl'>
                            <img className='rounded-2xl w-[50px]' src={bdmc} alt="Bedrock" />
                        </motion.div>
                        <div>
                            <p className='text-base-200 font-mono'>
                                <span className='text-[14px] font-bold'>
                                    Bedrock IP (click to copy)
                                </span>
                                <br />
                                <span className='text-blue-500'>
                                    tiger.qbitnode.com:5533
                                </span>
                                <br />
                                {copied === "tiger.qbitnode.com:5533" && (
                                    <span className="ml-2 text-green-400 text-sm">IP was successfully copied!</span>
                                )}
                            </p>
                        </div>
                    </div>
                </div>
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
                            <Link
                                to={`/vote/${v}`}
                                target='_blank'
                                className="btn rounded-full bg-blue-950 hover:bg-blue-800 text-white border-2 border-blue-700 font-extrabold capitalize"
                            >
                                Vote {v}
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Minecraft;
