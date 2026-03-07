import React from 'react';
import { motion } from 'framer-motion';
import { useLoaderData } from 'react-router';
import StaffCard from './StaffCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';
import TeamCard from './TeamCard';

const StaffData = () => {
    const data = useLoaderData();

    return (
        <div className='w-11/12 mx-auto pt-30 pb-20 min-h-screen space-y-4'>
            <motion.div
                className='text-center text-base-100 pb-6'
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
            >
                <h2
                    className='text-5xl font-extrabold bg-clip-text text-transparent'
                    style={{
                        backgroundImage: 'linear-gradient(90deg, #60a5fa, #ef4444, #a855f7, #60a5fa)',
                        backgroundSize: '300% 100%',
                        animation: 'gradientShift 4s ease infinite',
                    }}
                >
                    Our Team
                </h2>

                <style>{`
                    @keyframes gradientShift {
                        0%   { background-position: 0% 50%;   filter: drop-shadow(0 0 18px rgba(96, 165, 250, 0.2)) drop-shadow(0 0 40px rgba(96, 165, 250, 0.1)); }
                        50%  { background-position: 100% 50%; filter: drop-shadow(0 0 18px rgba(239, 68, 68, 0.2))  drop-shadow(0 0 40px rgba(168, 85, 247, 0.1)); }
                        100% { background-position: 0% 50%;   filter: drop-shadow(0 0 18px rgba(96, 165, 250, 0.2)) drop-shadow(0 0 40px rgba(96, 165, 250, 0.1)); }
                    }
                `}</style>
            </motion.div>

            <motion.div
                className='w-full'
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
            >
                <Swiper
                    effect="coverflow"
                    grabCursor={true}
                    centeredSlides={true}
                    className="overflow-visible"
                    slidesPerView={3}
                    spaceBetween={-40}
                    loop={true}
                    speed={1000}
                    autoplay={{
                        delay: 1000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true
                    }}
                    coverflowEffect={{
                        rotate: 45,
                        stretch: 0,
                        depth: 200,
                        modifier: 1,
                        slideShadows: false,
                    }}
                    pagination={false}
                    modules={[EffectCoverflow, Pagination, Autoplay]}
                    breakpoints={{
                        320: { slidesPerView: 1 },
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 4 },
                    }}
                >
                    {data.map(singleStaff =>
                        <SwiperSlide key={singleStaff.serialNo} className='w-[260px] transition-all duration-300'>
                            <StaffCard singleStaff={singleStaff} />
                        </SwiperSlide>
                    )}
                </Swiper>
            </motion.div>
        </div>
    );
};

export default StaffData;