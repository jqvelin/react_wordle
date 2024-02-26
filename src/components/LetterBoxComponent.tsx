import React, { FC } from 'react';
import { LetterBoxStatuses } from '../models/statuses/LetterBoxStatuses';

interface LetterBoxComponentProps {
    letter: string | null
    status: LetterBoxStatuses
}

const LetterBoxComponent: FC<LetterBoxComponentProps> = ({letter, status}) => {
    return (
        <div className={['letter-box', status].join(' ')}>
            {letter}
        </div>
    );
};

export default LetterBoxComponent;