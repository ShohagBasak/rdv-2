import React from 'react';
import { Link, NavLink } from 'react-router';
import logo from '../../assets/dp_discord_500p.png';
import { FaDiscord } from 'react-icons/fa';
const Header = () => {
    const links = <>
        <li className='hover:bg-transparent hover:text-gray-400 text-white text-[16px]'><NavLink to={'/'}>Home</NavLink></li>
        <li className='hover:bg-transparent hover:text-gray-400 text-white text-[16px]'><NavLink to={'/feature'}>Features</NavLink></li>
        <li className='hover:bg-transparent hover:text-gray-400 text-white text-[16px]'><NavLink to={'/Staff'}>Staff</NavLink></li>
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
                        <a
                            href="https://discord.gg/bHxmdn7wQg"
                            target="_blank"
                            className="btn rounded-full bg-blue-950 hover:bg-blue-800 text-white border-2 border-blue-700 font-extrabold capitalize"
                        >
                            Join Us <FaDiscord size={20} />
                        </a>
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