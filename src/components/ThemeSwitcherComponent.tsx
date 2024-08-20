import { memo, useEffect, useState } from 'react';
import { ThemeStatuses } from '../models/statuses/ThemeStatuses';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudSun, faMoon } from '@fortawesome/free-solid-svg-icons';

const ThemeSwitcherComponent = () => {
    const [theme, setTheme] = useState<ThemeStatuses>(ThemeStatuses.LIGHT)

    useEffect(() => {
        if(!localStorage.getItem('theme')) return
        document.documentElement.setAttribute('data-theme', localStorage.getItem('theme') as ThemeStatuses)
        setTheme(localStorage.getItem('theme') as ThemeStatuses)
    }, [])

    function handleChangeTheme(){
        const nextTheme = theme === ThemeStatuses.LIGHT ? ThemeStatuses.DARK : ThemeStatuses.LIGHT
        document.documentElement.setAttribute('data-theme', nextTheme)
        localStorage.setItem('theme', nextTheme)
        setTheme(nextTheme)
    }

    return (
        <div className="theme-switcher" onClick={handleChangeTheme}>
            <p>{theme === ThemeStatuses.LIGHT ? 'Light' : 'Dark'}</p>
            <div className="theme-switcher__controls">
                <FontAwesomeIcon className={`sun-icon ${theme === ThemeStatuses.LIGHT ? 'icon-up' : 'icon-hidden'}`} icon={faCloudSun} />
                <FontAwesomeIcon className={`moon-icon ${theme === ThemeStatuses.DARK ? 'icon-up' : 'icon-hidden'}`} icon={faMoon} />
            </div>
        </div>
    );
};

export default memo(ThemeSwitcherComponent);