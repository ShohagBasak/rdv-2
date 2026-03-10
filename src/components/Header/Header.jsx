import React from 'react';
import { Link, NavLink } from 'react-router';
import { motion } from 'framer-motion';
import logo from '../../assets/dp_discord_500p.png';
import { FaDiscord } from 'react-icons/fa';

const Header = () => {
    const closeDropdown = () => document.activeElement?.blur();

    const links1 = <>
        <li className='hover:bg-transparent hover:text-gray-400 text-white text-[16px]'><NavLink to={'/minecraft'} onClick={closeDropdown}>Minecraft Server</NavLink></li>
        <li className='hover:bg-transparent hover:text-gray-400 text-white text-[16px]'><NavLink to={'/minecraftBuildPlanner'} onClick={closeDropdown}>Build Planner</NavLink></li>
    </>

    const links = <>
        <li className='hover:bg-transparent hover:text-gray-400 text-white text-[16px]'><NavLink to={'/'}>Home</NavLink></li>
        <li className='hover:bg-transparent hover:text-gray-400 text-white text-[16px]'><NavLink to={'/feature'}>Features</NavLink></li>
        <li className="dropdown dropdown-hover">
            <div tabIndex={0} role="button" className="hover:bg-transparent hover:text-gray-400 text-white text-[16px] px-4 py-2 cursor-pointer">Minecraft</div>
            <ul tabIndex="-1" className="dropdown-content menu bg-black/90 rounded-box z-50 w-52 mt-0 pt-2 shadow-sm">
                {links1}
            </ul>
        </li>
        <li className='hover:bg-transparent hover:text-gray-400 text-white text-[16px]'><NavLink to={'/staff'}>Staff</NavLink></li>
        <li className='text-[16px] font-bold text-transparent! bg-clip-text bg-gradient-to-r from-red-700 to-red-600 hover:bg-transparent hover:text-gray-400 glow-text'><a href='https://dyno.gg/form/5db81043' target='_blank'>Ban Appeal</a></li>
    </>

    return (
        <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur bg-black/60">
            <div className="md:container mx-auto">
                <div className="navbar">
                    <div className="navbar-start">
                        <Link
                            to="/"
                            className="inline-flex items-center text-sm md:text-xl font-bold text-gray-100 hover:bg-transparent"
                        >
                            <img className="h-10" src={logo} alt="" />
                            ⚡Rimel's Discord⚡
                        </Link>
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1">
                            {links}
                        </ul>
                    </div>
                    <div className="navbar-end hidden md:flex">
                        <motion.a
                            href="https://discord.gg/bHxmdn7wQg"
                            target="_blank"
                            className="btn rounded-full bg-blue-950 text-white border-2 border-blue-700 font-extrabold capitalize flex items-center gap-2"
                            animate={{
                                boxShadow: [
                                    '0 0 6px rgba(96,165,250,0.2), 0 0 12px rgba(96,165,250,0.1)',
                                    '0 0 14px rgba(96,165,250,0.5), 0 0 30px rgba(96,165,250,0.2)',
                                    '0 0 6px rgba(96,165,250,0.2), 0 0 12px rgba(96,165,250,0.1)',
                                ],
                            }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                            whileHover={{
                                scale: 1.06,
                                backgroundColor: '#1e3a8a',
                                boxShadow: '0 0 20px rgba(96,165,250,0.6), 0 0 50px rgba(96,165,250,0.25)',
                                transition: { duration: 0.15 }
                            }}
                            whileTap={{ scale: 0.96 }}
                        >
                            Join Us
                            <motion.span
                                animate={{ y: [0, -3, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                            >
                                <FaDiscord size={20} />
                            </motion.span>
                        </motion.a>
                    </div>
                    <div className="navbar-end md:hidden">
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-base-100"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            </label>
                            <ul
                                tabIndex={0}
                                onClick={closeDropdown}
                                className="menu menu-sm dropdown-content mt-3 w-52 bg-black/90 rounded-box shadow z-[999]"
                            >
                                {links}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;