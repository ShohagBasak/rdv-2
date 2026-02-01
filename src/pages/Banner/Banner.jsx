import React from 'react';
import bannerImg from '../../assets/banner_rimels_discord_website_2.png'


const Banner = () => {
    return (
        <section class="md:container mx-auto py-10">
            <div class="flex justify-center">
                <img className='z-10' src={bannerImg} alt="" />
            </div>
            <div class="w-3/4 mx-auto text-center overflow-hidden z-50 -mt-10 lg:-mt-28">
                <h1
                    class="text-3xl mb-5 md:text-6xl font-extrabold bg-gradient-to-r from-blue-400 to-red-500 bg-clip-text text-transparent">
                    Uniting players through joy, magic, and adventure.</h1>
                <p class="text-base font-medium mb-10 text-gray-300">A friendly gaming community. Come watch anime, play games, or talk about anime and games with us. Whatever it is, as long as you don't get all political and rude, this will be the perfect community to join!
                    Besides actual video games, we also have some Discord chat-based games for you to enjoy and gain perks from.
                </p>
            </div>
        </section>
    );
};

export default Banner;