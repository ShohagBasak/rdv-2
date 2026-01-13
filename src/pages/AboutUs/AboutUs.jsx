import React from 'react';
import { Link } from 'react-router';
import eco from '../../assets/eco (1).svg'
import vc from '../../assets/vc (1).svg'
import bot from '../../assets/bot (1).svg'
import game from '../../assets/game (1).svg'

const AboutUs = () => {
    return (
        <section className="max-w-[1440px] pt-12 md:pt-24 mx-auto px-5 md:px-20 lg:px-32">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                <div className="lg:col-span-8">
                    {/* Header Section */}
                    <div className="mb-10">
                        <div className="badge badge-md mb-4 bg-blue-950 border-blue-700 text-gray-300 p-3 font-semibold">
                            What you get with us
                        </div>
                        <h2 className="text-3xl md:text-5xl text-gray-200 font-bold mb-6">
                            A positive community where,
                        </h2>
                        <p className="font-medium text-gray-400 max-w-xl">
                            we share game, anime, fun and valuable life experiences
                            with our members from all over the world.
                        </p>
                    </div>
                    {/* Collapse Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
                        
                        {/* Column 1 */}
                        <div className="flex flex-col gap-5">
                            <div tabIndex={0} className="collapse collapse-arrow bg-blue-950 border-2 border-blue-700">
                                <div className="collapse-title flex items-center gap-3 font-bold text-xl text-white">
                                    <img className="w-8 h-8" src={eco} alt="eco" /> Economy System
                                </div>
                                <div className="collapse-content text-gray-400">
                                    <p>Economy based color, sound board, text-to-speech, name change role access.</p>
                                </div>
                            </div>

                            <div tabIndex={0} className="collapse collapse-arrow bg-blue-950 border-2 border-blue-700">
                                <div className="collapse-title flex items-center gap-3 font-bold text-xl text-white">
                                    <img className="w-8 h-8" src={bot} alt="bot"/> Fun game bots
                                </div>
                                <div className="collapse-content text-gray-400">
                                    <p>Channels themed after many games and real life events.</p>
                                </div>
                            </div>
                        </div>

                        {/* Column 2 */}
                        <div className="flex flex-col gap-5">
                            <div tabIndex={0} className="collapse collapse-arrow bg-blue-950 border-2 border-blue-700">
                                <div className="collapse-title flex items-center gap-3 font-bold text-xl text-white">
                                    <img className="w-8 h-8" src={vc} alt="vc" /> 24/7 VC
                                </div>
                                <div className="collapse-content text-gray-400">
                                    <p>Main Voice Channels are locked behind activity role.</p>
                                </div>
                            </div>

                            <div tabIndex={0} className="collapse collapse-arrow bg-blue-950 border-2 border-blue-700">
                                <div className="collapse-title flex items-center gap-3 font-bold text-xl text-white">
                                    <img className="w-8 h-8" src={game} alt="game" /> Events & Games
                                </div>
                                <div className="collapse-content text-gray-400">
                                    <p>Co-op, party, single player games and streaming.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8">
                        <Link to="/feature">
                            <button className="btn rounded-full bg-blue-950 hover:bg-blue-800 text-white border-2 border-blue-700 font-extrabold px-8">
                                View Details
                            </button>
                        </Link>
                    </div>
                </div>

                {/* RIGHT SIDE: Discord Widget */}
                <div className='lg:col-span-4 flex justify-center items-start'>
                    <iframe
                        src="https://discord.com/widget?id=425965981324804096&theme=dark"
                        width="100%"
                        height="500"
                        allowTransparency="true"
                        frameBorder="0"
                        className="rounded-xl max-w-[350px] shadow-2xl border border-blue-700"
                        sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                    ></iframe>
                </div>

            </div>
        </section>
    );
};

export default AboutUs;