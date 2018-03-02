/**
 * region.component.js
 *
 * @author <L3MNcakes@gmail.com>
 * @flow
 */
import * as React from 'react';

import type { RegionTerrain } from '../classes/Region.class';
import { Region, RegionTerrainTypes } from '../classes/Region.class';
import { MapModes } from '../reducers/app.reducer';

type Props = {
    region: Region,
    tileSize: number,
    mapMode: string,
    clickRegion: (region: Region) => any
}

const getTerrainColor = (terrain: RegionTerrain): string => {
    switch(terrain) {
        case RegionTerrainTypes.GRASS:
            return 'green';
        case RegionTerrainTypes.DESERT:
            return 'tan';
        case RegionTerrainTypes.MOUNTAIN:
            return 'saddlebrown';
        case RegionTerrainTypes.WATER:
            return 'blue';
        default:
            return 'white';
    }
};

const calcBackgroundColor = (region: Region, mapMode: string) => {
    if (region.isActive) {
        return '#F00';
    }

    if (mapMode === MapModes.MAP_MODE_TERRAIN || region.terrain === RegionTerrainTypes.WATER) {
        return getTerrainColor(region.terrain);
    }

    if (mapMode === MapModes.MAP_MODE_REALMS) {
        return region.realm.color;
    }
};

const calcStyles = (region: Region, tileSize: number, mapMode: string) => {
    let size = tileSize + 'px',
        left = region.x * (tileSize + 1) + 1,
        top = region.y * (tileSize + 1) + 1,
        backgroundColor = calcBackgroundColor(region, mapMode);

    return {
        width: size,
        height: size,
        position: 'absolute',
        left,
        top,
        backgroundColor,
    };
};

export const RegionComponent = ({region, tileSize, mapMode, clickRegion}: Props) => (
    <div
        style={calcStyles(region,tileSize,mapMode)}
        onClick={() => clickRegion(region)}
    ></div>
);
