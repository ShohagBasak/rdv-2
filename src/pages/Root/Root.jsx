import React from 'react';
import Header from '../../components/Header/Header';
import { Outlet } from 'react-router';
import Footer from '../../components/Footer/Footer';
import TitleManager from '../../components/TitleManager/TitleManger';
import Error from '../Error/Error';

const Root = () => {

    return (
        <div>
            <header>
                <Header></Header>
            </header>
            <main>
                <TitleManager />
                <Outlet></Outlet>
            </main>
            <footer>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default Root;