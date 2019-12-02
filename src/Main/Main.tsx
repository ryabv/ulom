import React, { FC } from 'react';
import './Main.scss';

const Main: FC = ({children}) => {
    return (
        <main className="Main">
            {children}
        </main>
    );
};

export default Main;