import Lottie from 'lottie-react';
import React from 'react';
import pnf from '../../assets/lottie asstes/Page Not Found 404.json'

const Error = () => {
    return (
        <div className='flex items-center justify-center min-h-screen'>
            <Lottie animationData={pnf} loop:true></Lottie>
        </div>
    );
};

export default Error;