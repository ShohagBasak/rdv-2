import React, { useEffect, useState } from "react";
import mcbg from "../../assets/minecraft/mcbg21.jpg";
import jsmc from '../../assets/minecraft/grass_400px.png';
import bdmc from '../../assets/minecraft/bedrock_400px.png';
import { motion } from "motion/react";
import { FaArrowRight } from "react-icons/fa";

const MinecraftStatus = () => {
    const [java, setJava] = useState(null);
    const [bedrock, setBedrock] = useState(null);
    const [copied, setCopied] = useState("");
    const MotionArrow = motion(FaArrowRight);
    const copyText = async (text) => {
        await navigator.clipboard.writeText(text);
        setCopied(text);
        setTimeout(() => setCopied(""), 1500);
    };

    useEffect(() => {
        Promise.all([
            fetch("https://api.mcsrvstat.us/2/tiger.qbitnode.com:5400").then(r => r.json()),
            fetch("https://api.mcsrvstat.us/bedrock/2/tiger.qbitnode.com:5533").then(r => r.json())
        ])
            .then(([javaData, bedrockData]) => {
                setJava(javaData);
                setBedrock(bedrockData);
            })
            .catch(console.log);
    }, []);

    return (
        <div
            className="w-full max-w-3xl mx-auto border-4 border-black"
            style={{
                backgroundImage: `url(${mcbg})`,
                backgroundRepeat: "repeat",
            }}
        >
            <div className="bg-black/60 p-4 text-center minecraft-font text-xs md:text-sm">
                <div className="minecraft-font flex flex-col md:flex-row justify-center gap-2 md:gap-5 text-xs md:text-sm text-center space-y-1">
                    <div>
                        <p>
                            <span className="text-red-400">Rimel&apos;s</span>
                            <span className="text-white"> » </span>
                            <span className="text-cyan-400">Discord</span>
                            <span className="text-white"> | </span>
                            <span className="text-green-400">Survival</span>
                            <span className="text-white"> | </span>
                            <span className="text-yellow-300">Bedrock</span>
                        </p>
                        <p>
                            <span className="text-yellow-400">Friendly</span>
                            <span className="text-white"> | </span>
                            <span className="text-yellow-400">QoL</span>
                            <span className="text-white"> | </span>
                            <span className="text-yellow-400">Minigames</span>
                            <span className="text-white"> | </span>
                            <span className="text-yellow-500">Economy!</span>
                        </p>
                    </div>
                    <div className="text-base-100">
                        <h3>Version: {java?.version}</h3>
                        <p className="text-base-100 font-medium">Location: Bangladesh</p>
                    </div>
                    {/* Online Count */}
                    <div className="mt-2 flex justify-center gap-6 mb-3 md:mb-0">
                        <p className={java?.online ? "text-green-400 text-xl font-bold" : "text-red-400"}>
                            {java?.online ? "🟢" : "🔴"} Online:{" "}
                            {java?.online ? java.players.online : 0}
                        </p>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-center gap-2">
                    <h2 className="font-medium text-base-100">Click the IP to copy :</h2>
                    <div className='shadow-2xl rounded-2xl'>
                        {/* JAVA */}
                        <div
                            onClick={() => copyText("tiger.qbitnode.com:5400")}
                            className='cursor-pointer p-1 rounded-xl'
                        >
                            <div>
                                <p className='flex items-center gap-1 text-base-200 font-mono'>
                                    <span className='text-green-400 font-bold'>
                                        Java
                                    </span>
                                    <span>
                                        <MotionArrow
                                            animate={{ x: 5 }}
                                            transition={{ repeat: Infinity, duration: 0.6, repeatType: "reverse" }}
                                        />
                                    </span>
                                    <br />
                                    <span className='text-cyan-400'>
                                        tiger.qbitnode.com:5400
                                    </span>
                                </p>
                                {copied === "tiger.qbitnode.com:5400" && (
                                        <span className="ml-2 text-green-400 text-sm">IP was successfully copied!</span>
                                    )}
                            </div>
                        </div>
                    </div>
                    <div className='shadow-2xl text-start rounded-2xl'>
                        {/* BEDROCK */}
                        <div
                            onClick={() => copyText("tiger.qbitnode.com:5533")}
                            className='p-1 cursor-pointer rounded-xl'
                        >
                            <p className='flex items-center gap-1 text-base-200 font-mono'>
                                <span className='text-[14px] text-yellow-300 font-bold'>
                                    Bedrock
                                </span>
                                <span className="">
                                    <MotionArrow
                                        animate={{ x: 5 }}
                                        transition={{ repeat: Infinity, duration: 0.6, repeatType: "reverse" }}
                                    />
                                </span>
                                <br />
                                <span className='text-purple-400'>
                                    tiger.qbitnode.com:5533
                                </span>
                                <br />
                            </p>
                             {copied === "tiger.qbitnode.com:5533" && (
                                    <span className="ml-2 text-green-400 text-sm">IP was successfully copied!</span>
                                )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MinecraftStatus;
