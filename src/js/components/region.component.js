/**
 * region.component.js
 *
 * @author <L3MNcakes@gmail.com>
 * @flow
 */

import type { RegionTerrain } from '../classes/Region.class'

import React from 'react'
import { Region, RegionTerrainTypes } from '../classes/Region.class';

type Props = {
    region: Region,
    tileSize: number,
    clickRegion: (region: Region) => any
}

const getTerrainColor = (terrain: RegionTerrain): string => {
    switch(terrain) {
        case RegionTerrainTypes.GRASS:
            return 'green'
        case RegionTerrainTypes.DESERT:
            return 'tan'
        case RegionTerrainTypes.MOUNTAIN:
            return 'saddlebrown'
        case RegionTerrainTypes.WATER:
            return 'blue'
        default:
            return 'white'
    }
}

const calcStyles = (region: Region, tileSize: number) => {
    let size = tileSize + "px",
        left = region.x * (tileSize + 1) + 1,
        top = region.y * (tileSize + 1) + 1,
        backgroundColor = getTerrainColor(region.terrain),
        border = region.isActive ? '1px solid black' : '0px none';

    return {
        width: size,
        height: size,
        position: 'absolute',
        left,
        top,
        backgroundColor,
        border,
    }
}

export const RegionComponent = ({region, tileSize, clickRegion} : Props) => (
    <div
        style={calcStyles(region,tileSize)}
        onClick={(evt) => clickRegion(region)}
    ></div>
)
