import React, { FC, useEffect, useState } from 'react';
import DifficultySelectorComponent from './DifficultySelectorComponent';

interface IntroductionComponentProps {
    difficulty: number
    handleGameStart: () => void
    setDifficulty: (nextDifficulty: number) => void
}

const IntroductionComponent: FC<IntroductionComponentProps> = ({handleGameStart, setDifficulty, difficulty}) => {

    useEffect(() => {
        if (!localStorage.getItem('difficulty')) return
        setDifficulty(Number(localStorage.getItem('difficulty')))
    }, [])

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Добро пожаловать в Wordle!</h2>
                <p>В этой игре Вам предстоит отгадать слово по буквам, исходя из следующих подсказок:</p>
                <div className="letter-box-rule">
                    <div className="letter-box wrong">
                        A
                    </div>
                    <p>- буквы нет в загаданном слове</p>
                </div>
                <div className="letter-box-rule">
                    <div className="letter-box guessed">
                        B
                    </div>
                    <p>- буква не на своём месте</p>
                </div>
                <div className="letter-box-rule">
                    <div className="letter-box correct">
                        C
                    </div>
                    <p>- буква угадана верно!</p>
                </div>
                <p>Для начала игры выберите сложность:</p>
                <DifficultySelectorComponent difficulty={difficulty} setDifficulty={setDifficulty} />
                <button onClick={handleGameStart}>Играть</button>
            </div>
        </div>
    );
};

export default IntroductionComponent;