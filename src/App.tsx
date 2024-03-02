import React, { useEffect, useState } from 'react';
import './sass/App.scss'
import TitleComponent from './components/TitleComponent';
import { GameStatuses } from './models/statuses/GameStatuses';
import IntroductionComponent from './components/IntroductionComponent';
import ThemeSwitcherComponent from './components/ThemeSwitcherComponent';
import FooterComponent from './components/FooterComponent';
import DifficultySelectorComponent from './components/DifficultySelectorComponent';
import MainGameComponent from './components/MainGameComponent';
import { MainGameBoard } from './models/MainGameBoard';
import GameOutcomeComponent from './components/GameOutcomeComponent';

const App = () => {
  const [gameStatus, setGameStatus] = useState<GameStatuses>(GameStatuses.FIRST_LAUNCH)
  const [difficulty, setDifficulty] = useState(4)
  const [gameBoard, setGameBoard] = useState<MainGameBoard>(new MainGameBoard(difficulty))

  useEffect(() => {
    restartGame()
  }, [difficulty])

  function restartGame() {
    const nextGameBoard = new MainGameBoard(difficulty)
    nextGameBoard.initLetterBoxes()
    nextGameBoard.riddleWord()
    setGameBoard(nextGameBoard)
}

  function handleGameStart() {
    setGameStatus(GameStatuses.GAME_RUNNING)
  }

  return (
    <div className="main-layout">
      <TitleComponent title="Wordle" bottomBorder/>
      {gameStatus === GameStatuses.FIRST_LAUNCH && <IntroductionComponent handleGameStart={handleGameStart} difficulty={difficulty} setDifficulty={setDifficulty}/>}
      {gameStatus === GameStatuses.GAME_RUNNING && <MainGameComponent gameBoard={gameBoard} setGameBoard={setGameBoard} setGameStatus={setGameStatus}/>}
      {(gameStatus === GameStatuses.GAME_WON || gameStatus === GameStatuses.GAME_LOST) && <GameOutcomeComponent gameBoard={gameBoard} gameStatus={gameStatus} restartGame={restartGame} setGameStatus={setGameStatus}/>}
      <FooterComponent>
        <DifficultySelectorComponent difficulty={difficulty} setDifficulty={setDifficulty}/>
        <ThemeSwitcherComponent/>
      </FooterComponent>
    </div>
  );
};

export default App;