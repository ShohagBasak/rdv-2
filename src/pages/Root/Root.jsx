import React from 'react';
import Header from '../../components/Header/Header';
import { Outlet } from 'react-router';
import Footer from '../../components/Footer/Footer';

const Root = () => {
    return (
        <div>
            <header>
                <Header></Header>
            </header>
            <main>
                <Outlet></Outlet>
            </main>
            <footer>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default Root;