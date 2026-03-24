import React from 'react';
import Header from '../../components/Header/Header';
import { Outlet, useNavigation } from 'react-router';
import Footer from '../../components/Footer/Footer';
import TitleManager from '../../components/TitleManager/TitleManger';
import Error from '../Error/Error';
import Loading from '../Loading';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import ChatBot from '../../components/ChatBot/ChatBot';

const CustomCursor = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 20, stiffness: 120, mass: 0.5 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    React.useEffect(() => {
        const moveCursor = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener('mousemove', moveCursor);
        return () => window.removeEventListener('mousemove', moveCursor);
    }, [mouseX, mouseY]);

    return (
        <>
            {/* Inner Dot */}
            <motion.div
                className="fixed top-0 left-0 w-2 h-2 bg-cyan-400 rounded-full pointer-events-none z-[99999]"
                style={{
                    x: mouseX,
                    y: mouseY,
                    marginLeft: '-4px',
                    marginTop: '-4px',
                    boxShadow: '0 0 15px #00ffff, 0 0 30px #00ffff'
                }}
            />
            {/* Outer Circle (Trailing) */}
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 border-2 border-cyan-400/50 rounded-full pointer-events-none z-[99998]"
                style={{
                    x: cursorX,
                    y: cursorY,
                    marginLeft: '-16px',
                    marginTop: '-16px',
                    boxShadow: '0 0 15px rgba(0, 255, 255, 0.2)'
                }}
            />
        </>
    );
};

const Root = () => {
    const navigation = useNavigation();
    const isLoading = navigation.state === "loading";

    return (
        <div className="relative">
            <CustomCursor />
            <header>
                <Header></Header>
            </header>
            <main>
                {
                    isLoading ? (
                        <Loading />
                    ) : (
                        <>
                            <TitleManager />
                            <Outlet></Outlet>
                        </>
                    )
                }
            </main>
            <footer>
                <Footer></Footer>
            </footer>
            <ChatBot />
        </div>
    );
};

export default Root;