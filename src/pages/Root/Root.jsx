import React from 'react';
import Header from '../../components/Header/Header';
import { Outlet, useNavigation } from 'react-router';
import Footer from '../../components/Footer/Footer';
import TitleManager from '../../components/TitleManager/TitleManger';
import Error from '../Error/Error';
import Loading from '../Loading';

const Root = () => {
    const navigation = useNavigation();

    const isLoading = navigation.state === "loading";

    return (
        <div>
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
        </div>
    );
};

export default Root;