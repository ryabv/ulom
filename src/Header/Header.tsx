import React, { FC } from 'react';
import './Header.scss';
import Logo from './logo.svg';

const Header: FC = () => {
    return (
        <div className="Header">
            <a href="/">
                <img className="Header-Logo" src={Logo} alt=""/>
            </a>
        </div>
    );
};

export default Header;