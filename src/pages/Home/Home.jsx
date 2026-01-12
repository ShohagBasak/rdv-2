import React from 'react';
import Banner from '../Banner/Banner';
import AboutUs from '../AboutUs/AboutUs';
import Games from '../Games/Games';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Games></Games>
            <AboutUs></AboutUs>
        </div>
    );
};

export default Home;