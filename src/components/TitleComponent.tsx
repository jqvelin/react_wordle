import React, { FC, memo } from 'react';

interface TitleComponentProps {
    title: string
    bottomBorder?: boolean
}

const TitleComponent: FC<TitleComponentProps> = ({title, bottomBorder}) => {
    return (
        <div>
            <h1 className={['title', bottomBorder ? 'bottom-border' : ''].join(' ')}>{title}</h1>
        </div>
    );
};

export default memo(TitleComponent);