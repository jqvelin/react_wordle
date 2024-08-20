import React, { FC, memo, useEffect } from 'react';
import { keyboardKeys } from '../models/db/KeyboardKeys';

interface VirtualKeyboardComponentProps {
    handleVirtualKeyboard: (e: React.PointerEvent) => void
}

const VirtualKeyboardComponent: FC<VirtualKeyboardComponentProps> = ({handleVirtualKeyboard}) => {
    console.log('virtual keyboard rerender')
    return (
        <div className="virtual-keyboard" onPointerDown={e => handleVirtualKeyboard(e)}>
            {keyboardKeys.map((row, index) => 
                <div key={index} className="virtual-keyboard__row">
                    {row.map(button => 
                        <div key={button} className="virtual-keyboard__button">
                            {button}
                        </div>
                    )}
                    {index === keyboardKeys.length - 1 &&
                        <>
                            <div className="virtual-keyboard__button special" style={{fontSize: "16px"}}>
                            ⌫
                            </div>
                            <div className="virtual-keyboard__button special">
                            ⏎
                            </div>
                        </>
                    }
                    
                </div>
            )}
        </div>
    );
};

export default memo(VirtualKeyboardComponent);