import React from 'react';

const IntroductionComponent = () => {
    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Добро пожаловать в Wordle!</h2>
                <p>В этой игре Вам предстоит отгадать слово по буквам, исходя из следующих подсказок:</p>
                <div className="letter-box-rule">
                    <div className="letter-box">
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
                <div className="select-difficulty">
                    <p>Для начала игры выберите сложность:</p>
                </div>
            </div>
        </div>
    );
};

export default IntroductionComponent;