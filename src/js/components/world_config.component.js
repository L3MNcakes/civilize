/**
 * world_config.component.js
 *
 * @author <L3MNcakes@gmail.com>
 * @flow
 */

import React from 'react';

type Props = {
    currentState: any,
    changeHeight: (newHeight: number) => any,
    changeWidth: (newWidth: number) => any,
    changeTilesize: (newSize: number) => any,
    clickGenerateRegions: () => any,
    clickRefineNext: () => any,
};

const wrapperStyles = {
    border: '3px solid #333',
    padding: '5px',
    width: '200px',
    display: 'inline-block',
    margin: '0px 5px',
};

const inputStyles = {
    width: '25px',
    padding: '3px 2px',
};

export const WorldConfigComponent = ({
    currentState,
    changeHeight,
    changeWidth,
    changeTilesize,
    clickGenerateRegions,
    clickRefineNext,
    clickToggleRefine
}: Props) => (
    <div style={wrapperStyles}>
        <strong>World Options:</strong>
        <div>
            <label>Width:</label>
            <input
                type="text"
                style={inputStyles}
                onBlur={ (evt) => changeWidth(evt.target.value) }
                defaultValue={currentState.world.worldWidth}
            />
        </div>
        <div>
            <label>Height:</label>
            <input
                type="text"
                style={inputStyles}
                onBlur={ (evt) => changeHeight(evt.target.value) }
                defaultValue={currentState.world.worldHeight}
            />
        </div>
        <div>
            <label>Tile Size:</label>
            <input
                type="text"
                style={inputStyles}
                onBlur={ (evt) => changeTilesize(evt.target.value) }
                defaultValue={currentState.world.tileSize}
            />
        </div>
        <div>
            <input
                type="button"
                value="Generate New World"
                onClick={ (evt) => clickGenerateRegions() }
            />
        </div>
        <div>
            <input
                type="button"
                value="Next"
                onClick={ (evt) => clickRefineNext() }
            />
            <input
                type="button"
                value={currentState.world.isRefining ? 'Stop' : 'Start'}
                onClick={ (evt) => clickToggleRefine() }
            />
        </div>
    </div>
);
