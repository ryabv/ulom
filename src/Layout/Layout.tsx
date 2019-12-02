import React, { FC } from 'react';
import './Layout.scss';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Timeline from '../Timeline/Timeline';

const Layout: FC = () => {
    return (
        <div className="Layout">
            <Header />
            <Main>
                <Timeline />
            </Main>
        </div>
    );
};

export default Layout;