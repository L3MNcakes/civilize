/**
 * world.reducer.js
 *
 * @author <L3MNcakes@gmail.com>
 * @flow
 */

// TYPES
import type { Reducer, Action } from 'redux';

// IMPORTS
import { Map } from 'immutable';
import { Region } from '../classes/Region.class';
import { generateRandomWorld, refineWorld } from '../world.generator';

export type WorldState = {
    worldWidth: number,
    worldHeight: number,
    tileSize: number,
    regions: Map<string,Region>,
    isRefining: boolean,
    activeRegion: ?Region
};

export type WorldAction = {
    type: WorldActionTypes.SET_REGIONS,
    payload: Map<string,region>
} | {
    type: WorldActionTypes.ADD_REGION,
    payload: Region
} | {
    type: WorldActionTypes.UPDATE_WIDTH,
    payload: number
} | {
    type: WorldActionTypes.UPDATE_HEIGHT,
    payload: number
} | {
    type: WorldActionTypes.UPDATE_TILESIZE,
    payload: number
} | {
    type: WorldActionTypes.GENERATE_REGIONS,
    payload: any
} | {
    type: WorldActionTypes.REFINE_NEXT,
    payload: any
} | {
    type: WorldActionTypes.TOGGLE_REFINE,
    payload: any
} | {
    type: WorldActionTypes.SET_ACTIVE_REGION,
    payload: Region
};

export const WorldActionTypes = {
    SET_REGIONS: 'WORLD_ACTION_SET_REGIONS',
    ADD_REGION: 'WORLD_ACTION_SET_REGION',
    UPDATE_WIDTH: 'WORLD_ACTION_UPDATE_WIDTH',
    UPDATE_HEIGHT: 'WORLD_ACTION_UPDATE_HEIGHT',
    UPDATE_TILESIZE: 'WORLD_ACTION_UPDATE_TILESIZE',
    GENERATE_REGIONS: 'WORLD_ACTION_GENERATE_REGIONS',
    REFINE_NEXT: 'WORLD_ACTION_REFINE_NEXT',
    TOGGLE_REFINE: 'WORLD_ACTION_TOGGLE_REFINE',
    SET_ACTIVE_REGION: 'WORLD_ACTION_SET_ACTIVE_REGION',
};

const defaultState = {
    worldWidth: 25,     // Width of the world in number of tiles
    worldHeight: 25,    // Height of the world in number of tiles
    tileSize: 15,       // Size of the tiles in pixels (width/height)
    regions: new Map(), // Map of all current regions
    isRefining: false,  // Whether or not the world regions are currently being refined
    activeRegion: null, // The region that is currently active
};

const WorldReducer : Reducer<WorldState, WorldAction> = (state = defaultState, action) => {
    let currentState: WorldState = Object.assign({}, state);

    switch(action.type) {
        case WorldActionTypes.SET_REGIONS:
            currentState.regions = action.payload;
            return currentState;
        case WorldActionTypes.ADD_REGION:
            currentState.regions.set(action.payload);
            return currentState;
        case WorldActionTypes.UPDATE_WIDTH:
            currentState.worldWidth = action.payload;
            return currentState;
        case WorldActionTypes.UPDATE_HEIGHT:
            currentState.worldHeight = action.payload;
            return currentState;
        case WorldActionTypes.UPDATE_TILESIZE:
            currentState.tileSize = action.payload;
            return currentState;
        case WorldActionTypes.GENERATE_REGIONS:
            currentState.regions = generateRandomWorld(
                currentState.worldWidth,
                currentState.worldHeight
            );
            return currentState;
        case WorldActionTypes.REFINE_NEXT:
            currentState.regions = refineWorld(currentState.regions);
            return currentState;
        case WorldActionTypes.TOGGLE_REFINE:
            currentState.isRefining = !currentState.isRefining;
            return currentState;
        case WorldActionTypes.SET_ACTIVE_REGION:
            return setActiveRegion(action.payload, currentState);
        default:
            return state;
    }
};

const setActiveRegion = (region: Region, currentState: WorldState): WorldState => {
    if (currentState.activeRegion) {
        currentState.activeRegion.isActive = false;
        currentState.regions = currentState.regions.set(currentState.activeRegion.key, currentState.activeRegion);
    }

    if (region !== currentState.activeRegion) {
        region.isActive = true;
        currentState.regions = currentState.regions.set(region.key, region);
        currentState.activeRegion = region;
    } else {
        currentState.activeRegion = null;
    }

    return currentState;
}

export default WorldReducer;
