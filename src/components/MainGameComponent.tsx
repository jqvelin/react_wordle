import React, { FC, useEffect, useRef} from 'react';
import { MainGameBoard } from '../models/MainGameBoard';
import LetterBoxComponent from './LetterBoxComponent';
import { LetterBoxStatuses } from '../models/statuses/LetterBoxStatuses';
import { GameStatuses } from '../models/statuses/GameStatuses';

interface MainGameComponentProps {
    gameBoard: MainGameBoard
    setGameBoard: (nextBoard: MainGameBoard) => void
    setGameStatus: (nextStatus: GameStatuses) => void
}

const MainGameComponent: FC<MainGameComponentProps> = ({gameBoard, setGameBoard, setGameStatus}) => {
    const currentLetter = useRef(0)
    const currentWord = useRef(0)

    useEffect(() => {
        currentLetter.current = 0
        currentWord.current = 0
    }, [gameBoard.riddledWord.length])
    
    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    })

    function updateBoard(){
        const nextBoard = gameBoard.getBoardCopy()
        setGameBoard(nextBoard)
    }

    function handleKeyDown(e: globalThis.KeyboardEvent){
        const inputLetter = e.key.toUpperCase()
        if(inputLetter === 'BACKSPACE'){
            if (currentLetter.current - 1 < 0) return
            const letterBox = gameBoard.getLetterBox(currentLetter.current - 1, currentWord.current)
            letterBox.letter = null
            currentLetter.current--
        } else if (inputLetter !== 'ENTER' && gameBoard.isAllowedLetter(inputLetter)){
            if (currentLetter.current >= gameBoard.riddledWord.length) return
            const letterBox = gameBoard.getLetterBox(currentLetter.current, currentWord.current)
            letterBox.letter = inputLetter
            currentLetter.current++
        } else if (inputLetter === 'ENTER'){
            if (currentLetter.current !== gameBoard.riddledWord.length) return
            calculateResult(currentWord.current)
            currentWord.current++
            currentLetter.current = 0
        }
        else return
        updateBoard()
    }

    
    function calculateResult(currentWord: number){
        for (let x = 0; x < gameBoard.riddledWord.length; x++){
            const currentLetterBox = gameBoard.getLetterBox(x, currentWord)
            const currentRiddledWordLetters = gameBoard.riddledWord.split('')
            if (currentLetterBox.letter === currentRiddledWordLetters[x]){
                currentLetterBox.status = LetterBoxStatuses.CORRECT
            } else if (currentRiddledWordLetters.find(letter => letter === currentLetterBox.letter)){
                currentLetterBox.status = LetterBoxStatuses.GUESSED
            } else {
                currentLetterBox.status = LetterBoxStatuses.WRONG
            }
        }
        if (gameBoard.letterBoxes[currentWord].filter(letterBox => letterBox.status === LetterBoxStatuses.CORRECT).length === gameBoard.riddledWord.length){
            setGameStatus(GameStatuses.GAME_WON)
        } else if (currentWord === 5){
            setGameStatus(GameStatuses.GAME_LOST)
        }
    }

    return (
        <>
        <main>
            {gameBoard.letterBoxes.map(row => 
                <div className="letter-boxes-row">
                    {row.map(letterBox =>
                        <LetterBoxComponent key={letterBox.y === 0 ? letterBox.x : Number(`${letterBox.y}${letterBox.x}`)} letter={letterBox.letter} status={letterBox.status}/>
                    )}
                </div>
            )}
        </main>
        </>
    );
};

export default MainGameComponent;