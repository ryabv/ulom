import React, { FC } from 'react';
import './Layout.scss';
import Header from '../Header/Header';
import Main from '../Main/Main';
import TimelineContainer from '../Timeline/TimelineContainer';

const Layout: FC = () => {
    return (
        <div className="Layout">
            <Header />
            <Main>
                <TimelineContainer />
            </Main>
        </div>
    );
};

export default Layout;