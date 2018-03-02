/**
 * world.component.js
 *
 * @author <L3MNcakes@gmail.com>
 * @flow
 */

// TYPES
import type { MainState } from '../reducers/main.reducer';
import type { Region } from '../classes/Region.class';

// IMPORTS
import * as React from 'react';
import { RegionComponent } from './region.component';

type Props = {
    currentState: MainState,
    clickRegion: (region: Region) => any,
}

const renderRegions = (currentState, clickRegion) => {
    let render = [];

    currentState.world.regions.forEach( (region, key) => {
        render.push(
            <RegionComponent
                key = {key}
                region = {region}
                tileSize = {currentState.world.settings.tileSize}
                mapMode = {currentState.app.mapMode}
                clickRegion = {clickRegion}
            />
        );
    });

    return render;
};

const calcStyles = (currentState: MainState) => {
    let width: number = currentState.world.settings.width * currentState.world.settings.tileSize + currentState.world.settings.width + 1;
    let height: number = currentState.world.settings.height * currentState.world.settings.tileSize + currentState.world.settings.height + 1;

    return {
        width: width + 'px',
        height: height + 'px',
        position: 'relative',
        border: '3px solid #333',
        margin: '100px auto',
        overflow: 'hidden'
    };
};

export const WorldComponent = ({currentState, clickRegion}: Props) => (
    <div>
        <div style={calcStyles(currentState)}>
            {renderRegions(currentState, clickRegion)}
        </div>
    </div>
);
