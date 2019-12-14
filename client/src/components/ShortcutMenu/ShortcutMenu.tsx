import React, { FC } from 'react';
import { cn } from '@bem-react/classname';
import './ShortcutMenu.scss';

const cnShortcutMenu = cn('ShortcutMenu');

interface ShortcutMenuProps {
    visible: boolean,
    x: number,
    y: number,
    isMobile: boolean
}

const ShortcutMenu: FC<ShortcutMenuProps> = ({ visible, x, y, isMobile }) => {
    const style = {
        left: isMobile ? '50%' : `${x}px`,
        top: `${y}px`,
    };

    return (
        <div 
            className={visible ? cnShortcutMenu({ visible: true }) : cnShortcutMenu()}
            style={style}
        >
            <div className={cnShortcutMenu('Color', { work: true })}></div>
            <div className={cnShortcutMenu('Color', { rest: true })}></div>
            <div className={cnShortcutMenu('Color', { gym: true })}></div>
            <div className={cnShortcutMenu('Color', { sleep: true })}></div>
        </div>
    );
};

export default ShortcutMenu;