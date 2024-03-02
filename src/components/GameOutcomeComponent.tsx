import React, { FC } from 'react';
import { GameStatuses } from '../models/statuses/GameStatuses';
import { MainGameBoard } from '../models/MainGameBoard';
import LetterBoxComponent from './LetterBoxComponent';
import { LetterBoxStatuses } from '../models/statuses/LetterBoxStatuses';

interface GameOutcomeComponentProps {
    gameBoard: MainGameBoard
    gameStatus: GameStatuses
    setGameStatus: (nextStatus: GameStatuses) => void
    restartGame: () => void
}

const GameOutcomeComponent: FC<GameOutcomeComponentProps> = ({gameBoard, gameStatus, setGameStatus, restartGame}) => {
    function playAgain(){
        restartGame()
        setGameStatus(GameStatuses.GAME_RUNNING)
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>{gameStatus === GameStatuses.GAME_WON ? 'Вы угадали слово!' : 'Игра окончена!'}</h2>
                <div className="letter-boxes-row">
                    {gameBoard.riddledWord.split('').map(
                        (letter, index) => <LetterBoxComponent key={index} letter={letter} status={gameStatus === GameStatuses.GAME_WON ? LetterBoxStatuses.CORRECT : LetterBoxStatuses.UNKNOWN}/>
                    )}
                </div>
                <button onClick={playAgain}>Новая игра</button>
            </div>
        </div>
    );
};

export default GameOutcomeComponent;