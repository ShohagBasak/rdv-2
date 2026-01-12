import React from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import joining from '../../assets/joining.mp4';
import connect from '../../assets/Connect.mp4';
import food from '../../assets/Food_Habits.mp4';
import count from '../../assets/Count.mp4';
import pokemon from '../../assets/catch_em_all.mp4';

const Features = () => {
    return (
        <div className='w-11/12 mx-auto min-h-screen space-y-4 py-30  text-white'>
            <h2 className='text-4xl text-center mb-16 bg-gradient-to-r from-blue-400 to-red-500 bg-clip-text text-transparent font-extrabold'>
                Our Server Features
            </h2>

            {/* Card 1 */}
            <div className='grid grid-cols-1 md:grid-cols-12 gap-0 overflow-hidden rounded-3xl border border-gray-800 bg-[#0a0a0a] shadow-2xl items-stretch'>
                {/* Text Content */}
                <div className='md:col-span-7 p-8 md:p-16 flex flex-col justify-center space-y-6'>
                    <h2 className='text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent'>
                        Joining Guide
                    </h2>

                    <p className='text-gray-400 text-lg leading-relaxed max-w-lg'>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta nam recusandae expedita vel dolorum tenetur iusto accusantium, voluptas ullam possimus?
                    </p>

                    <button className='flex items-center gap-2 text-white font-semibold hover:gap-4 transition-all duration-300 group'>
                        Check Out Our Video
                        <span className='group-hover:translate-x-1 transition-transform'>
                            <FaArrowRight size={14} />
                        </span>
                    </button>
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
                    <h2 className='text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent'>
                        Connect Guide
                    </h2>

                    <p className='text-gray-400 text-lg leading-relaxed max-w-lg'>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta nam recusandae expedita vel dolorum tenetur iusto accusantium, voluptas ullam possimus?
                    </p>

                    <button className='flex items-center gap-2 text-white font-semibold hover:gap-4 transition-all duration-300 group'>
                        <span className='group-hover:-translate-x-1 transition-transform'>
                            <FaArrowLeft size={14} />
                        </span>
                        Check Out Our Video
                    </button>
                </div>
            </div>
            {/* card 3 */}
            <div className='grid grid-cols-1 md:grid-cols-12 gap-0 overflow-hidden rounded-3xl border border-gray-800 bg-[#0a0a0a] shadow-2xl items-stretch'>
                {/* Text Content */}
                <div className='md:col-span-7 p-8 md:p-16 flex flex-col justify-center space-y-6'>
                    <h2 className='text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent'>
                        Food Corner
                    </h2>
                    <p className='text-gray-400 text-lg leading-relaxed max-w-lg'>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta nam recusandae expedita vel dolorum tenetur iusto accusantium, voluptas ullam possimus?
                    </p>
                    <button className='flex items-center gap-2 text-white font-semibold hover:gap-4 transition-all duration-300 group'>
                        Check Out Our Video
                        <span className='group-hover:translate-x-1 transition-transform'>
                            <FaArrowRight size={14} />
                        </span>
                    </button>
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
                    <h2 className='text-3xl md:text-4xl font-bold bg-gradient-to-r from-teal-500 via-blue-500 to-red-500 bg-clip-text text-transparent'>
                        Count Together
                    </h2>

                    <p className='text-gray-400 text-lg leading-relaxed max-w-lg'>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta nam recusandae expedita vel dolorum tenetur iusto accusantium, voluptas ullam possimus?
                    </p>

                    <button className='flex items-center gap-2 text-white font-semibold hover:gap-4 transition-all duration-300 group'>
                        <span className='group-hover:-translate-x-1 transition-transform'>
                            <FaArrowLeft size={14} />
                        </span>
                        Check Out Our Video
                    </button>
                </div>
            </div>
             {/* card 5 */}
            <div className='grid grid-cols-1 md:grid-cols-12 gap-0 overflow-hidden rounded-3xl border border-gray-800 bg-[#0a0a0a] shadow-2xl items-stretch'>
                {/* Text Content */}
                <div className='md:col-span-7 p-8 md:p-16 flex flex-col justify-center space-y-6'>
                    <h2 className='text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent'>
                        Gotta Catch 'em All
                    </h2>
                    <p className='text-gray-400 text-lg leading-relaxed max-w-lg'>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta nam recusandae expedita vel dolorum tenetur iusto accusantium, voluptas ullam possimus?
                    </p>
                    <button className='flex items-center gap-2 text-white font-semibold hover:gap-4 transition-all duration-300 group'>
                        Check Out Our Video
                        <span className='group-hover:translate-x-1 transition-transform'>
                            <FaArrowRight size={14} />
                        </span>
                    </button>
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