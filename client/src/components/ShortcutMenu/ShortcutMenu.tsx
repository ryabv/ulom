import React, { FC, useEffect, useState } from 'react';
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
    const [categories, setCategories] = useState([]);
    const style = {
        left: isMobile ? '50%' : `${x}px`,
        top: `${y}px`,
    };

    useEffect(
        () => {
            const cats: any = [];

            fetch('http://localhost:3001?user=username&date=2019-12-26')
            .then(res => {
                return res.json();
            })
            .then(data => {

                for(let id in data.cases_categories) {
                    const cat = data.cases_categories[id];
                    cats.push(
                        <div
                            key={cat.id}
                            id={`cat-${cat.id}`}
                            style={{background: cat.color}}
                            className={cnShortcutMenu('Color', { [cat.name]: true })}>
                        </div>
                    );
                }

                cats.push(
                    <div
                        key={0}
                        id={'cat-0'}
                        style={{background: ''}}
                        className={cnShortcutMenu('Color', { default: true })}>
                    </div>
                );
            })
            .then(() => {
                setCategories(cats);
            });
        }, []
    );

    return (
        <div 
            className={visible ? cnShortcutMenu({ visible: true }) : cnShortcutMenu()}
            style={style}
        >
            {categories}
        </div>
    );
};

export default ShortcutMenu;