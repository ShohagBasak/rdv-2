import React from 'react';
import { Link } from 'react-router';
import eco from '../../assets/eco (1).svg'
import vc from '../../assets/vc (1).svg'
import bot from '../../assets/bot (1).svg'
import game from '../../assets/game (1).svg'

const AboutUs = () => {
    return (
        <section className="max-w-11/12 pt-24 mx-5 md:mx-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-5 items-start">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                    <div className="md:col-span-2">
                        <div className="badge badge-md mb-4 bg-blue-950 border-blue-700 text-gray-300 p-3 font-semibold">
                            What you get with us
                        </div>

                        <h2 className="text-2xl md:text-5xl text-gray-200 font-bold mb-6">
                            A positive community where,
                        </h2>

                        <p className="font-medium mb-6 text-gray-400">
                            we share game, anime, fun and valuable life experiences
                            with our members from all over the world.
                        </p>
                    </div>
                    <div tabIndex={0} className="collapse collapse-arrow bg-blue-950 border-2 border-blue-700">
                        <div className="collapse-title flex items-center gap-3 font-bold text-xl text-white">
                            <img src={eco} alt="" /> Economy System
                        </div>
                        <div className="collapse-content text-gray-400">
                            Economy based color, sound board, text-to-speech, name change role access.
                        </div>
                    </div>

                    <div tabIndex={0} className="collapse collapse-arrow bg-blue-950 border-2 border-blue-700">
                        <div className="collapse-title flex items-center gap-3 font-bold text-xl text-white">
                            <img src={vc} alt="" />
                             24/7 VC
                        </div>
                        <div className="collapse-content text-gray-400">
                            Main Voice Channels are locked behind activity role.
                        </div>
                    </div>

                    <div tabIndex={0} className="collapse collapse-arrow bg-blue-950 border-2 border-blue-700">
                        <div className="collapse-title flex items-center gap-3 font-bold text-xl text-white">
                            <img src={bot} alt="bot"/> Fun game bots
                        </div>
                        <div className="collapse-content text-gray-400">
                            Channels themed after many games and real life events.
                        </div>
                    </div>

                    <div tabIndex={0} className="collapse collapse-arrow bg-blue-950 border-2 border-blue-700">
                        <div className="collapse-title flex items-center gap-3 font-bold text-xl text-white">
                            <img className="w-14" src={game} alt="" /> Events & Games
                        </div>
                        <div className="collapse-content text-gray-400">
                            Co-op, party, single player games and streaming.
                        </div>
                    </div>

                    <div className="md:col-span-2 mt-4">
                        <Link to="/feature">
                            <button className="btn rounded-full bg-blue-950 hover:bg-blue-800 text-white border-2 border-blue-700 font-extrabold capitalize">
                                View Details
                            </button>
                        </Link>
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className='flex justify-center md:justify-end items-center'>
                    <iframe
                        src="https://discord.com/widget?id=425965981324804096&theme=dark"
                        width="350"
                        height="570"
                        allowTransparency="true"
                        frameBorder="0"
                        className="rounded-xl"
                        sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                    ></iframe>
                </div>

            </div>
        </section>

    );
};

export default AboutUs;