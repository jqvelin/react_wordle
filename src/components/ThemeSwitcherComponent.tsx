import React, { FC } from 'react';
import { ThemeStatuses } from '../models/statuses/ThemeStatuses';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { useRef } from 'react';

interface ThemeSwitcherComponentProps {
    theme: ThemeStatuses,
    setTheme: (nextTheme: ThemeStatuses) => void
}

const ThemeSwitcherComponent: FC<ThemeSwitcherComponentProps> = ({theme, setTheme}) => {

    function handleChangeTheme(){
        const nextTheme = theme === ThemeStatuses.LIGHT ? ThemeStatuses.DARK : ThemeStatuses.LIGHT
        document.documentElement.setAttribute('data-theme', nextTheme)
        setTheme(nextTheme)
    }

    return (
        <div className="theme-switcher" onClick={handleChangeTheme}>
            <p>{theme === ThemeStatuses.LIGHT ? 'Light' : 'Dark'}</p>
            <div className="theme-switcher__controls">
                <FontAwesomeIcon className="sun-icon" icon={faCloudSun} />
                <FontAwesomeIcon className="moon-icon" icon={faMoon} />
                <input type="checkbox" onChange={handleChangeTheme}/>
            </div>
        </div>
    );
};

export default ThemeSwitcherComponent;