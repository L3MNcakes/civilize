/**
 * start.menu.component.js
 *
 * @author <L3MNcakes@gmail.com>
 * @flow
 */

import React from 'react';

type Props = {
    worldState: any,
    changeWorldSetting: any,
    generateNewWorld: any,
    refineWorld: any,
    finishWorldGeneration: any,
};

const wrapperStyles = {
    width: '30%',
    backgroundColor: '#EEE',
    margin: '100px auto',
    padding: '10px',
};

const titleStyles = {
    fontSize: '1.5em',
    fontWeight: 'bold',
    borderBottom: '1px solid #111',
    marginBottom: '10px',
};

const inputContainerStyles = {
    marginTop: '10px'
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

const buttonStyles = {
    width: '100%',
    marginTop: '10px',
    marginBottom: '0px',
    padding: '10px',
    backgroundColor: '#111133',
    fontSize: '1.3em',
    color: '#EEE',
    border: '0px none',
    cursor: 'pointer',
};

export const StartMenuComponent = ({
    worldState,
    changeWorldSetting,
    generateNewWorld,
    refineWorld,
    finishWorldGeneration
}: Props): React.Element => (
    <div style={wrapperStyles}>
        <div style={titleStyles}>World Settings</div>
        <div style={inputContainerStyles}>
            <div style={inputWrapperStyles}>
                <span style={labelStyles}>Width:</span>
                <input
                    type='number'
                    style={smallInputStyles}
                    defaultValue={worldState.settings.width}
                    onBlur={ (e) => changeWorldSetting('width', e.target.value) }
                />
            </div>
            <div style={inputWrapperStyles}>
                <span style={labelStyles}>Height:</span>
                <input
                    type='number'
                    style={smallInputStyles}
                    defaultValue={worldState.settings.height}
                    onBlur={ (e) => changeWorldSetting('height', e.target.value) }
                />
            </div>
            <div style={inputWrapperStyles}>
                <span style={labelStyles}>Tile Size:</span>
                <input
                    type='number'
                    style={smallInputStyles}
                    defaultValue={worldState.settings.tileSize}
                    onBlur={ (e) => changeWorldSetting('tileSize', e.target.value) }
                />
            </div>
            <div style={inputWrapperStyles}>
                <span style={labelStyles}>Cycles:</span>
                <input
                    type='number'
                    style={medInputStyles}
                    defaultValue={worldState.settings.cycles}
                    onBlur={ (e) => changeWorldSetting('cycles', e.target.value) }
                />
            </div>
        </div>
        <input
            type='button'
            style={buttonStyles}
            value='Generate World'
            onClick={ (e) => handleButtonClick(
                worldState,
                generateNewWorld,
                refineWorld,
                finishWorldGeneration
            )}
        />
    </div>
);

const handleButtonClick = (worldState, generateNewWorld, refineWorld, finishWorldGeneration) => {
    generateNewWorld();

    for (let i = 0; i < worldState.settings.cycles; i++) {
        refineWorld();
    }

    finishWorldGeneration();
};
