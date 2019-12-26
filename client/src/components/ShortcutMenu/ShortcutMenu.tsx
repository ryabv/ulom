import React, { FC } from 'react';
import { cn } from '@bem-react/classname';
import './ShortcutMenu.scss';

const cnShortcutMenu = cn('ShortcutMenu');

interface ShortcutMenuProps {
    visible: boolean,
    x: number,
    y: number,
    isMobile: boolean,
    casesCategories: any
}

const ShortcutMenu: FC<ShortcutMenuProps> = ({ visible, x, y, isMobile, casesCategories }) => {
    const style = {
        left: isMobile ? '50%' : `${x}px`,
        top: `${y}px`,
    };

    function drawMenu() {
        if (casesCategories) {
            const cats = [];

            for(let cat of casesCategories) {
                if (cat.id !== 0) {
                    cats.push(
                        <div
                            key={cat.id}
                            id={`cat-${cat.id}`}
                            style={{background: cat.color}}
                            className={cnShortcutMenu('Color', { [cat.name]: true })}>
                        </div>
                    );
                }
            }

            cats.push(
                <div
                    key={0}
                    id={'cat-0'}
                    style={{background: ''}}
                    className={cnShortcutMenu('Color', { default: true })}>
                </div>
            );

            return cats;
        }
    }

    return (
        <div
            className={visible ? cnShortcutMenu({ visible: true }) : cnShortcutMenu()}
            style={style}
        >
            {drawMenu()}
        </div>
    );
};

export default ShortcutMenu;