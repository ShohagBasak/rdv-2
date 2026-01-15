import React from 'react';
import { useLoaderData } from 'react-router';
import StaffCard from './StaffCard';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required modules
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';
import TeamCard from './TeamCard';

const StaffData = () => {
    const data = useLoaderData();
    // console.log(data);
    // const [isVisible, setIsVisible] = useState(false);
    return (
        <div className='w-11/12 mx-auto pt-30 pb-20 min-h-screen space-y-4'>
            <div className='text-center text-base-100 pb-6 '>
                <h2 className='text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-red-500 bg-clip-text text-transparent'>Our Team</h2>
            </div>
            <div className='w-full'>
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
                    {
                        data.map(singleStaff =>
                            <SwiperSlide key={singleStaff.serialNo} className='w-[260px] transition-all duration-300'>
                                <StaffCard singleStaff={singleStaff}></StaffCard>
                            </SwiperSlide>
                        )}
                </Swiper>
            </div>
            {/* <div>
                <div className='text-center pb-4'>
                    <button onClick={() => setIsVisible(!isVisible)} className='btn btn-primary rounded-full'>
                        View Details</button>
                </div>
                <div className={`${isVisible ? 'grid' : 'hidden'} grid-cols-1 md:grid-cols-3 gap-4 pt-4`}>
                    {
                        data
                            .slice()
                            .sort((a, b) => {
                                const cleanA = a.name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
                                const cleanB = b.name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
                                return cleanA.localeCompare(cleanB);
                            })
                            .map(teamData => (
                                <TeamCard
                                    key={teamData.serialNo}
                                    teamData={teamData}
                                />
                            ))
                    }
                </div>
            </div> */}
        </div>
    );
};

export default StaffData;