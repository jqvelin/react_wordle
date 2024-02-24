import React, { useState } from 'react';
import './sass/App.scss'
import TitleComponent from './components/TitleComponent';
import { GameStatuses } from './models/statuses/GameStatuses';
import IntroductionComponent from './components/IntroductionComponent';
import ThemeSwitcherComponent from './components/ThemeSwitcherComponent';
import FooterComponent from './components/FooterComponent';

const App = () => {
  const [gameStatus, setGameStatus] = useState<GameStatuses>(GameStatuses.FIRST_LAUNCH)
  return (
    <div className="main-layout">
      <TitleComponent title="Wordle" bottomBorder/>
      {gameStatus === GameStatuses.FIRST_LAUNCH && <IntroductionComponent/>}
      <FooterComponent>
        <ThemeSwitcherComponent/>
      </FooterComponent>
    </div>
  );
};

export default App;