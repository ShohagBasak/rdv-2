import React from 'react';
import { NavLink } from 'react-router';
import logo from '../../assets/dp_discord_500p.png';
const Footer = () => {
    return (
        <footer className="footer footer-horizontal gap-2 footer-center bg-black text-base-100 rounded py-16 md:py-4 p-4 md:p-10">
            <div className='flex gap-1 justify-center items-center'>
                <div>
                    <a className="hover:bg-transparent hover:border-transparent hover:border-b-transparent 
                                order-1 md:order-none active:bg-transparent focus:bg-transparent shadow-none">
                        <img className='h-10' src={logo} alt="" /></a>
                </div>
                <nav>
                    <div className="grid grid-flow-col gap-4">
                        <NavLink className={'text-[16px]'} to={'/'}>Home</NavLink>
                        <NavLink className={'text-[16px]'} to={'/feature'}>Features</NavLink>
                        <NavLink className={'text-[16px]'} to={'/minecraft'}>Minecraft</NavLink>
                        <NavLink className={'text-[16px]'} to={'/Staff'}>Staff</NavLink>
                    </div>
                </nav>
                <div>
                    <a className="hover:bg-transparent hover:border-transparent hover:border-b-transparent 
                                order-1 md:order-none active:bg-transparent focus:bg-transparent shadow-none">
                        <img className='h-10' src={logo} alt="" /></a>
                </div>
            </div>
            <aside>
                <p className='text-gray-400'>Copyright © From 2018 to {new Date().getFullYear()} - Developed by <span className='text-blue-400'>Shohag</span></p>
            </aside>
        </footer>
    );
};

export default Footer;