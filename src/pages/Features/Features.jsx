import React from 'react';
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import joining from '../../assets/joining.mp4';
import connect from '../../assets/Connect.mp4';
import food from '../../assets/Food_Habits.mp4';
import count from '../../assets/Count.mp4';
import pokemon from '../../assets/catch_em_all.mp4';

const Features = () => {
    return (
        <div className='w-11/12 mx-auto min-h-screen space-y-4 py-30  text-white'>
            {/* <h2 className='text-4xl text-center mb-16 bg-gradient-to-r from-blue-400 to-red-500 bg-clip-text text-transparent font-extrabold'>
                Our Server Features
            </h2> */}
            {/* Card 1 */}
            <div className='grid grid-cols-1 md:grid-cols-12 gap-0 overflow-hidden rounded-3xl border border-gray-800 bg-[#0a0a0a] shadow-2xl items-stretch'>
                {/* Text Content */}
                <div className='md:col-span-7 p-8 md:p-16 flex flex-col justify-center space-y-6'>
                    <h2 className='text-3xl cursor-progress inline-flex items-center gap-5 transition-all duration-300 group md:text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent'>
                        Joining
                        <span className='text-white group-hover:translate-x-1 transition-transform'>
                            <FaArrowRightLong size={20} />
                        </span>
                    </h2>

                    <p className='text-gray-400 text-lg leading-relaxed max-w-lg'>
                        Click <a className='underline text-blue-500 font-bold' href="https://discord.gg/bHxmdn7wQg" target='_blank'>join</a> or use the invite link. Once your join application is approved or you are on the server, select the roles for special access, such as the samp section or game roles, and giveaway roles for event-based pings.
                    </p>
                </div>

                {/* Video Content Right Side */}
                <div className='md:col-span-5 relative h-[350px] md:h-auto'>
                    {/* Video Wrapper */}
                    <video
                        src={joining}
                        className='w-full h-full object-cover'
                        autoPlay
                        controls
                        muted
                        loop
                        playsInline
                    >
                        Your browser does not support the video tag.
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-transparent pointer-events-none"></div>
                </div>
            </div>
            {/* card 2 */}
            <div className='grid grid-cols-1 md:grid-cols-12 gap-0 overflow-hidden rounded-3xl border border-gray-800 bg-[#0a0a0a] shadow-2xl items-stretch'>
                {/* Video Content */}
                <div className='md:col-span-5 relative h-[350px] md:h-auto'>
                    {/* Video Wrapper */}
                    <video
                        src={connect}
                        className='w-full h-full object-cover'
                        autoPlay
                        controls
                        muted
                        loop
                        playsInline
                    >
                        Your browser does not support the video tag.
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-transparent pointer-events-none"></div>
                </div>
                {/* Text Content */}
                <div className='md:col-span-7 p-8 md:p-16 flex flex-col justify-center space-y-6'>
                    <h2 className='text-3xl inline-flex gap-5 cursor-progress items-center transition-all duration-300 group md:text-4xl font-bold bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent'>
                        <span className='text-white group-hover:-translate-x-1 transition-transform'>
                            <FaArrowLeftLong size={20} />
                        </span>
                        Connect 
                    </h2>

                    <p className='text-gray-400 text-lg leading-relaxed max-w-lg'>
                        You'll find people welcoming you left and right whenever they see your join notification. Grab this opportunity to introduce yourself and make new friends.
                    </p>
                </div>
            </div>
            {/* card 3 */}
            <div className='grid grid-cols-1 md:grid-cols-12 gap-0 overflow-hidden rounded-3xl border border-gray-800 bg-[#0a0a0a] shadow-2xl items-stretch'>
                {/* Text Content */}
                <div className='md:col-span-7 p-8 md:p-16 flex flex-col justify-center space-y-6'>
                    <h2 className='text-3xl cursor-progress inline-flex items-center gap-5 transition-all duration-300 group md:text-4xl font-bold bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent'>
                        Food Habits
                        <span className='text-white group-hover:translate-x-1 transition-transform'>
                            <FaArrowRightLong size={20} />
                        </span>
                    </h2>
                    <p className='text-gray-400 text-lg leading-relaxed max-w-lg'>
                        Like sharing or finding out about food culture from all over the world? Share yours or check out what others have shared in our Food Corner channel so far. Food conversations tend to get you hungry sometimes.
                    </p>
                </div>
                {/* Video Content */}
                <div className='md:col-span-5 relative h-[350px] md:h-auto'>
                    <video
                        src={food}
                        className='w-full h-full object-cover'
                        autoPlay
                        controls
                        muted
                        loop
                        playsInline
                    >
                        Your browser does not support the video tag.
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-transparent pointer-events-none"></div>
                </div>
            </div>
            {/* card 4 */}
            <div className='grid grid-cols-1 md:grid-cols-12 gap-0 overflow-hidden rounded-3xl border border-gray-800 bg-[#0a0a0a] shadow-2xl items-stretch'>
                {/* Video Content */}
                <div className='md:col-span-5 relative h-[350px] md:h-auto'>
                    {/* Video Wrapper */}
                    <video
                        src={count}
                        className='w-full h-full object-cover'
                        autoPlay
                        controls
                        muted
                        loop
                        playsInline
                    >
                        Your browser does not support the video tag.
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-transparent pointer-events-none"></div>
                </div>
                {/* Text Content */}
                <div className='md:col-span-7 p-8 md:p-16 flex flex-col justify-center space-y-6'>
                    <h2 className='text-3xl cursor-progress inline-flex items-center gap-5 transition-all duration-300 group md:text-4xl font-bold bg-gradient-to-r from-teal-500 via-blue-500 to-red-500 bg-clip-text text-transparent'>
                        <span className='text-white group-hover:-translate-x-1 transition-transform'>
                            <FaArrowLeftLong size={20} />
                        </span>
                        Count Together
                    </h2>
                    <p className='text-gray-400 text-lg leading-relaxed max-w-lg'>
                       Count numbers with your friend in sequence. Mistakes are temporarily mentioned and later deleted.
                    </p>
                </div>
            </div>
             {/* card 5 */}
            <div className='grid grid-cols-1 md:grid-cols-12 gap-0 overflow-hidden rounded-3xl border border-gray-800 bg-[#0a0a0a] shadow-2xl items-stretch'>
                {/* Text Content */}
                <div className='md:col-span-7 p-8 md:p-16 flex flex-col justify-center space-y-6'>
                    <h2 className='text-3xl cursor-progress inline-flex items-center gap-5 transition-all duration-300 group md:text-4xl font-bold bg-gradient-to-r from-blue-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent'>
                        Gotta Catch 'em All
                        <span className='text-white group-hover:translate-x-1 transition-transform'>
                            <FaArrowRightLong size={20} />
                        </span>
                    </h2>
                    <p className='text-gray-400 text-lg leading-relaxed max-w-lg'>
                        A Poké fan? Catch random pokémons that spawn in our dedicated pokémon channel by guessing their name. Have fun battles or trade your pokémon with other members of the community. Most of us are the collector type rather than the battle type. 
                    </p>
                </div>
                {/* Video Content */}
                <div className='md:col-span-5 relative h-[350px] md:h-auto'>
                    <video
                        src={pokemon}
                        className='w-full h-full object-cover'
                        autoPlay
                        controls
                        muted
                        loop
                        playsInline
                    >
                        Your browser does not support the video tag.
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-transparent pointer-events-none"></div>
                </div>
            </div>
        </div>
    );
};

export default Features;