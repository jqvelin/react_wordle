import React, { FC, useEffect, useRef} from 'react';
import { MainGameBoard } from '../models/MainGameBoard';
import LetterBoxComponent from './LetterBoxComponent';
import { allowedKeys } from '../models/db/AllowedKeys';
import { LetterBoxStatuses } from '../models/statuses/LetterBoxStatuses';

interface MainGameComponentProps {
    gameBoard: MainGameBoard,
    setGameBoard: (nextBoard: MainGameBoard) => void
}

const MainGameComponent: FC<MainGameComponentProps> = ({gameBoard, setGameBoard}) => {
    const currentLetter = useRef(0)
    const currentWord = useRef(0)

    useEffect(() => {
        currentLetter.current = 0
        currentWord.current = 0
    }, [gameBoard.riddledWord.length])
    
    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress)
    }, [])

    function updateBoard(){
        const nextBoard = gameBoard.getBoardCopy()
        setGameBoard(nextBoard)
    }

    function isAllowedLetter(letter: string) {
        if (allowedKeys.includes(letter)) return true
        return false
    }

    function handleKeyPress(e: globalThis.KeyboardEvent){
        const inputLetter = e.key.toUpperCase()
        if(inputLetter === 'BACKSPACE'){
            if (currentLetter.current - 1 < 0) return
            const letterBox = gameBoard.getLetterBox(currentLetter.current - 1, currentWord.current)
            letterBox.letter = null
            currentLetter.current--
        } else if (inputLetter !== 'ENTER' && isAllowedLetter(inputLetter)){
            if (currentLetter.current >= gameBoard.riddledWord.length) return
            const letterBox = gameBoard.getLetterBox(currentLetter.current, currentWord.current)
            letterBox.letter = inputLetter
            currentLetter.current++
        } else if (inputLetter === 'ENTER'){
            if (currentLetter.current !== gameBoard.riddledWord.length) return
            calculateResult(gameBoard.riddledWord)
            currentWord.current++
            currentLetter.current = 0
        }
        else return
        updateBoard()
    }

    function calculateResult(answer: string){
        for (let x = 0; x < answer.length; x++){
            const currentLetterBox = gameBoard.getLetterBox(x, currentWord.current)
            const matchesIndices = getAllIndices(answer.split(''), currentLetterBox.letter)
            if (matchesIndices.length === 0) return
            let matchesCounter = 0
            
            matchesIndices.forEach(index => {
                if (matchesCounter === matchesIndices.length) return
                if (x === index) {
                    currentLetterBox.status = LetterBoxStatuses.CORRECT
                } else if (matchesIndices.length > matchesCounter){
                    currentLetterBox.status = LetterBoxStatuses.GUESSED
                }
                matchesCounter++
            })
        }
    }

    function getAllIndices(arr: any[], val: any) {
        let indices = [], i = -1;
        while ((i = arr.indexOf(val, i+1)) != -1){
            indices.push(i);
        }
        return indices;
    }

    return (
        <>
        <main>
            {gameBoard.letterBoxes.map(row => 
                <div key={gameBoard.letterBoxes.indexOf(row)} className="letter-boxes-row">
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