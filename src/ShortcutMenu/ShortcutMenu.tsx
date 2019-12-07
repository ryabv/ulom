import React, { FC } from 'react';
import { cn } from '@bem-react/classname';
import './ShortcutMenu.scss';

const cnShortcutMenu = cn('ShortcutMenu');

interface ShortcutMenuProps {
    visible: boolean,
    x: number,
    y: number
}

const ShortcutMenu: FC<ShortcutMenuProps> = ({ visible, x, y }) => {
    const style = {
        left: `${x}px`,
        top: `${y}px`,
    };

    return (
        <div 
            className={visible ? cnShortcutMenu({ visible: true }) : cnShortcutMenu()}
            style={style}
        >

        </div>
    );
};

export default ShortcutMenu;