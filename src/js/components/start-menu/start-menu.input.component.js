/**
 * start-menu.input.component.js
 *
 * @author <L3MNcakes@gmail.com>
 * @flow
 */
import * as React from 'react';

type Props = {
    label: string,
    size: string,
    inputType: string,
    defaultValue: any,
    settingName: string,
    settingFn: Function
};

export const InputSizes = {
    SMALL: 'SMALL',
    MEDIUM: 'MEDIUM'
};

const inputWrapperStyles = {
    display: 'inline-block',
    marginRight: '10px',
    padding: '5px 0',
};

const labelStyles = {
    fontWeight: 'bold',
    fontSize: '.9em',
};

const smallInputStyles = {
    width: '35px',
    padding: '3px',
    border: '1px solid #111',
    marginLeft: '5px',
};

const medInputStyles = {
    width: '50px',
    padding: '3px',
    border: '1px solid #111',
    marginLeft: '5px',
};

const getInputStyle = (size: string) => {
    switch(size) {
        case InputSizes.SMALL:
            return smallInputStyles;
        case InputSizes.MEDIUM:
            return medInputStyles;
        default:
            console.warn('Could not find size `' + size + '` for <StartMenuInputComponent>');
            return;
    }
};

export const StartMenuInputComponent = ({
    label,
    size,
    inputType,
    defaultValue,
    settingName,
    settingFn
}: Props): React.Element<'div'> => (
    <div style={inputWrapperStyles}>
        <span style={labelStyles}>{label}:</span>
        <input
            type={inputType}
            style={getInputStyle(size)}
            defaultValue={defaultValue}
            onBlur={ (e) => settingFn(settingName, e.target.value) }
        />
    </div>
);
