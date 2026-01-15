import React from 'react';
import Banner from '../Banner/Banner';
import AboutUs from '../AboutUs/AboutUs';
import Games from '../Games/Games';
import StaffData from '../Staff/StaffData';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            {/* <Games></Games> */}
            <AboutUs></AboutUs>
            <StaffData></StaffData>
        </div>
    );
};

export default Home;