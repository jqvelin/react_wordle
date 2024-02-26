import React, { FC } from 'react';

interface DifficultySelectorComponentProps {
    difficulty: number
    setDifficulty: (difficulty: number) => void
}

const DifficultySelectorComponent: FC<DifficultySelectorComponentProps> = ({difficulty, setDifficulty}) => {
    function handleChangeDifficulty(e: React.MouseEvent<Element, MouseEvent>){
        if (!e.target) return
        const target = e.target as HTMLElement
        const nextDifficulty = target.textContent
        if (!target || !nextDifficulty || !target.classList.contains('difficulty')) return
        localStorage.setItem('difficulty',  nextDifficulty)
        setDifficulty(Number(nextDifficulty))
    }

    return (
        <div>
            <div className="select-difficulty">
                    <div className="select-difficulty__row" onClick={e => handleChangeDifficulty(e)}>
                        <div className={['difficulty', difficulty === 4 ? 'selected' : ''].join(' ')}>4</div>
                        <div className={['difficulty', difficulty === 5 ? 'selected' : ''].join(' ')}>5</div>
                        <div className={['difficulty', difficulty === 6 ? 'selected' : ''].join(' ')}>6</div>
                    </div>
            </div>
        </div>
    );
};

export default DifficultySelectorComponent;