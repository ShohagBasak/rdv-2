import React from 'react';
import joining from '../../assets/joining.mp4';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';

const Games = () => {
    return (
        <div className='w-full px-4 md:w-11/12 mx-auto'>
            <Swiper
                spaceBetween={20}
                slidesPerView={1}
                loop={true}              
                speed={1200}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                breakpoints={{
                    640: { slidesPerView: 1, spaceBetween: 20 },
                    768: { slidesPerView: 2, spaceBetween: 30 },
                    1024: { slidesPerView: 3, spaceBetween: 40 },
                    1920: { slidesPerView: 3, spaceBetween: 40 }
                }}
                modules={[Autoplay]}
            >

                {/* Slide 1 */}
                <SwiperSlide>
                    <div className='grid grid-cols-1 md:grid-cols-12 rounded-3xl overflow-hidden border border-gray-800 bg-[#0a0a0a] shadow-2xl'>

                        {/* Text */}
                        <div className='p-6 md:col-span-6 space-y-4 text-center md:text-left flex flex-col justify-center'>
                            <h2 className='text-lg md:text-xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent'>
                                Party Games
                            </h2>
                            <p className='text-sm md:text-base text-gray-400'>
                                Lorem ipsum dolor sit amet consectetur.
                            </p>
                            <button className='inline-flex items-center justify-center gap-2 text-sm md:text-base text-white font-semibold group hover:gap-4 transition-all'>
                                Check Video
                                <FaArrowRight size={14} className='group-hover:translate-x-1 transition-transform' />
                            </button>
                        </div>

                        {/* Video */}
                        <div className='relative md:col-span-6 w-full h-[220px] sm:h-[260px] md:h-auto'>
                            <video
                                src={joining}
                                className='w-full h-full object-cover'
                                autoPlay
                                muted
                                loop
                                playsInline
                            />
                            <div className='absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-transparent'></div>
                        </div>
                    </div>
                </SwiperSlide>

                {/* Slide 2 */}
                <SwiperSlide>
                    <div className='grid grid-cols-1 md:grid-cols-12 rounded-3xl overflow-hidden border border-gray-800 bg-[#0a0a0a] shadow-2xl'>

                        {/* Video */}
                        <div className='relative md:col-span-6 w-full h-[220px] sm:h-[260px] md:h-auto'>
                            <video
                                src={joining}
                                className='w-full h-full object-cover'
                                autoPlay
                                muted
                                loop
                                playsInline
                            />
                            <div className='absolute inset-0 bg-gradient-to-l from-[#0a0a0a] via-transparent to-transparent'></div>
                        </div>

                        {/* Text */}
                        <div className='p-6 md:col-span-6 space-y-4 text-center md:text-left flex flex-col justify-center'>
                            <h2 className='text-lg md:text-xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent'>
                                Party Games
                            </h2>
                            <p className='text-sm md:text-base text-gray-400'>
                                Lorem ipsum dolor sit amet consectetur.
                            </p>
                            <button className='inline-flex items-center justify-center gap-2 text-sm md:text-base text-white font-semibold group hover:gap-4 transition-all'>
                                <FaArrowLeft size={14} className='group-hover:-translate-x-1 transition-transform' />
                                Check Video
                            </button>
                        </div>
                    </div>
                </SwiperSlide>
                {/* Slide 1 */}
                <SwiperSlide>
                    <div className='grid grid-cols-1 md:grid-cols-12 rounded-3xl overflow-hidden border border-gray-800 bg-[#0a0a0a] shadow-2xl'>

                        {/* Text */}
                        <div className='p-6 md:col-span-6 space-y-4 text-center md:text-left flex flex-col justify-center'>
                            <h2 className='text-lg md:text-xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent'>
                                Party Games
                            </h2>
                            <p className='text-sm md:text-base text-gray-400'>
                                Lorem ipsum dolor sit amet consectetur.
                            </p>
                            <button className='inline-flex items-center justify-center gap-2 text-sm md:text-base text-white font-semibold group hover:gap-4 transition-all'>
                                Check Video
                                <FaArrowRight size={14} className='group-hover:translate-x-1 transition-transform' />
                            </button>
                        </div>

                        {/* Video */}
                        <div className='relative md:col-span-6 w-full h-[220px] sm:h-[260px] md:h-auto'>
                            <video
                                src={joining}
                                className='w-full h-full object-cover'
                                autoPlay
                                muted
                                loop
                                playsInline
                            />
                            <div className='absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-transparent'></div>
                        </div>
                    </div>
                </SwiperSlide>

                {/* Slide 2 */}
                <SwiperSlide>
                    <div className='grid grid-cols-1 md:grid-cols-12 rounded-3xl overflow-hidden border border-gray-800 bg-[#0a0a0a] shadow-2xl'>

                        {/* Video */}
                        <div className='relative md:col-span-6 w-full h-[220px] sm:h-[260px] md:h-auto'>
                            <video
                                src={joining}
                                className='w-full h-full object-cover'
                                autoPlay
                                muted
                                loop
                                playsInline
                            />
                            <div className='absolute inset-0 bg-gradient-to-l from-[#0a0a0a] via-transparent to-transparent'></div>
                        </div>

                        {/* Text */}
                        <div className='p-6 md:col-span-6 space-y-4 text-center md:text-left flex flex-col justify-center'>
                            <h2 className='text-lg md:text-xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent'>
                                Party Games
                            </h2>
                            <p className='text-sm md:text-base text-gray-400'>
                                Lorem ipsum dolor sit amet consectetur.
                            </p>
                            <button className='inline-flex items-center justify-center gap-2 text-sm md:text-base text-white font-semibold group hover:gap-4 transition-all'>
                                <FaArrowLeft size={14} className='group-hover:-translate-x-1 transition-transform' />
                                Check Video
                            </button>
                        </div>
                    </div>
                </SwiperSlide>
                {/* Slide 1 */}
                <SwiperSlide>
                    <div className='grid grid-cols-1 md:grid-cols-12 rounded-3xl overflow-hidden border border-gray-800 bg-[#0a0a0a] shadow-2xl'>

                        {/* Text */}
                        <div className='p-6 md:col-span-6 space-y-4 text-center md:text-left flex flex-col justify-center'>
                            <h2 className='text-lg md:text-xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent'>
                                Party Games
                            </h2>
                            <p className='text-sm md:text-base text-gray-400'>
                                Lorem ipsum dolor sit amet consectetur.
                            </p>
                            <button className='inline-flex items-center justify-center gap-2 text-sm md:text-base text-white font-semibold group hover:gap-4 transition-all'>
                                Check Video
                                <FaArrowRight size={14} className='group-hover:translate-x-1 transition-transform' />
                            </button>
                        </div>

                        {/* Video */}
                        <div className='relative md:col-span-6 w-full h-[220px] sm:h-[260px] md:h-auto'>
                            <video
                                src={joining}
                                className='w-full h-full object-cover'
                                autoPlay
                                muted
                                loop
                                playsInline
                            />
                            <div className='absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-transparent'></div>
                        </div>
                    </div>
                </SwiperSlide>

                {/* Slide 2 */}
                <SwiperSlide>
                    <div className='grid grid-cols-1 md:grid-cols-12 rounded-3xl overflow-hidden border border-gray-800 bg-[#0a0a0a] shadow-2xl'>

                        {/* Video */}
                        <div className='relative md:col-span-6 w-full h-[220px] sm:h-[260px] md:h-auto'>
                            <video
                                src={joining}
                                className='w-full h-full object-cover'
                                autoPlay
                                muted
                                loop
                                playsInline
                            />
                            <div className='absolute inset-0 bg-gradient-to-l from-[#0a0a0a] via-transparent to-transparent'></div>
                        </div>

                        {/* Text */}
                        <div className='p-6 md:col-span-6 space-y-4 text-center md:text-left flex flex-col justify-center'>
                            <h2 className='text-lg md:text-xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent'>
                                Party Games
                            </h2>
                            <p className='text-sm md:text-base text-gray-400'>
                                Lorem ipsum dolor sit amet consectetur.
                            </p>
                            <button className='inline-flex items-center justify-center gap-2 text-sm md:text-base text-white font-semibold group hover:gap-4 transition-all'>
                                <FaArrowLeft size={14} className='group-hover:-translate-x-1 transition-transform' />
                                Check Video
                            </button>
                        </div>
                    </div>
                </SwiperSlide>
                {/* Slide 1 */}
                <SwiperSlide>
                    <div className='grid grid-cols-1 md:grid-cols-12 rounded-3xl overflow-hidden border border-gray-800 bg-[#0a0a0a] shadow-2xl'>

                        {/* Text */}
                        <div className='p-6 md:col-span-6 space-y-4 text-center md:text-left flex flex-col justify-center'>
                            <h2 className='text-lg md:text-xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent'>
                                Party Games
                            </h2>
                            <p className='text-sm md:text-base text-gray-400'>
                                Lorem ipsum dolor sit amet consectetur.
                            </p>
                            <button className='inline-flex items-center justify-center gap-2 text-sm md:text-base text-white font-semibold group hover:gap-4 transition-all'>
                                Check Video
                                <FaArrowRight size={14} className='group-hover:translate-x-1 transition-transform' />
                            </button>
                        </div>

                        {/* Video */}
                        <div className='relative md:col-span-6 w-full h-[220px] sm:h-[260px] md:h-auto'>
                            <video
                                src={joining}
                                className='w-full h-full object-cover'
                                autoPlay
                                muted
                                loop
                                playsInline
                            />
                            <div className='absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-transparent'></div>
                        </div>
                    </div>
                </SwiperSlide>

                {/* Slide 2 */}
                <SwiperSlide>
                    <div className='grid grid-cols-1 md:grid-cols-12 rounded-3xl overflow-hidden border border-gray-800 bg-[#0a0a0a] shadow-2xl'>

                        {/* Video */}
                        <div className='relative md:col-span-6 w-full h-[220px] sm:h-[260px] md:h-auto'>
                            <video
                                src={joining}
                                className='w-full h-full object-cover'
                                autoPlay
                                muted
                                loop
                                playsInline
                            />
                            <div className='absolute inset-0 bg-gradient-to-l from-[#0a0a0a] via-transparent to-transparent'></div>
                        </div>

                        {/* Text */}
                        <div className='p-6 md:col-span-6 space-y-4 text-center md:text-left flex flex-col justify-center'>
                            <h2 className='text-lg md:text-xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent'>
                                Party Games
                            </h2>
                            <p className='text-sm md:text-base text-gray-400'>
                                Lorem ipsum dolor sit amet consectetur.
                            </p>
                            <button className='inline-flex items-center justify-center gap-2 text-sm md:text-base text-white font-semibold group hover:gap-4 transition-all'>
                                <FaArrowLeft size={14} className='group-hover:-translate-x-1 transition-transform' />
                                Check Video
                            </button>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Games;
