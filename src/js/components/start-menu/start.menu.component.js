/**
 * start.menu.component.js
 *
 * @author <L3MNcakes@gmail.com>
 * @flow
 */
import * as React from 'react';

import { StartMenuInputComponent, InputSizes } from './start-menu.input.component';

type Props = {
    worldState: any,
    changeWorldSetting: any,
    changeTerrainWeight: any,
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
    changeTerrainWeight,
    generateNewWorld,
    refineWorld,
    finishWorldGeneration
}: Props): React.Element<'div'> => (
    <div style={wrapperStyles}>
        <div style={titleStyles}>World Settings</div>
        <div style={inputContainerStyles}>
            <StartMenuInputComponent
                label='Width'
                size={InputSizes.SMALL}
                inputType='number'
                defaultValue={worldState.settings.width}
                settingName='width'
                settingFn={changeWorldSetting}
            />
            <StartMenuInputComponent
                label='Height'
                size={InputSizes.SMALL}
                inputType='number'
                defaultValue={worldState.settings.height}
                settingName='height'
                settingFn={changeWorldSetting}
            />
            <StartMenuInputComponent
                label='Tile Size'
                size={InputSizes.SMALL}
                inputType='number'
                defaultValue={worldState.settings.tileSize}
                settingName='tileSize'
                settingFn={changeWorldSetting}
            />
            <StartMenuInputComponent
                label='Cycles'
                size={InputSizes.SMALL}
                inputType='number'
                defaultValue={worldState.settings.cycles}
                settingName='cycles'
                settingFn={changeWorldSetting}
            />
        </div>
        <div style={titleStyles}>Terrain Weights</div>
        <div style={inputContainerStyles}>
            <StartMenuInputComponent
                label='Grass'
                size={InputSizes.SMALL}
                inputType='number'
                defaultValue={worldState.settings.terrainWeights.grass}
                settingName='grass'
                settingFn={changeTerrainWeight}
            />
            <StartMenuInputComponent
                label='Desert'
                size={InputSizes.SMALL}
                inputType='number'
                defaultValue={worldState.settings.terrainWeights.desert}
                settingName='desert'
                settingFn={changeTerrainWeight}
            />
            <StartMenuInputComponent
                label='Mountain'
                size={InputSizes.SMALL}
                inputType='number'
                defaultValue={worldState.settings.terrainWeights.mountain}
                settingName='mountain'
                settingFn={changeTerrainWeight}
            />
            <StartMenuInputComponent
                label='Water'
                size={InputSizes.SMALL}
                inputType='number'
                defaultValue={worldState.settings.terrainWeights.water}
                settingName='water'
                settingFn={changeTerrainWeight}
            />
        </div>
        <input
            type='button'
            style={buttonStyles}
            value='Generate World'
            onClick={ () => handleButtonClick(
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
