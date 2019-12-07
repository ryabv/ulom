import React, { FC } from 'react';
import './Main.scss';

const Main: FC = ({children}) => {
    const makeTimeUnitsUnselected = () => {
        const selectedTimeUnits = document.getElementsByClassName('TimeUnit_selected');
        const shortcutMenu = document.getElementsByClassName('ShortcutMenu')[0];
        shortcutMenu.classList.remove('ShortcutMenu_visible');

        while (selectedTimeUnits.length) {
            selectedTimeUnits[selectedTimeUnits.length - 1].classList.remove('TimeUnit_selected');
        }
    };

    const handleClick = (e: any) => {
        if (e.target.classList.contains('Main')) {
            makeTimeUnitsUnselected();
        }
    };

    return (
        <main 
            onClick={handleClick}
            className="Main"
        >
            {children}
        </main>
    );
};

export default Main;