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
    type: WORLD_ACTION_SET_REGIONS,
    payload: Map<string,region>
} | {
    type: WORLD_ACTION_ADD_REGION,
    payload: Region
} | {
    type: WORLD_ACTION_UPDATE_WIDTH,
    payload: number
} | {
    type: WORLD_ACTION_UPDATE_HEIGHT,
    payload: number
} | {
    type: WORLD_ACTION_UPDATE_TILESIZE,
    payload: number
} | {
    type: WORLD_ACTION_GENERATE_REGIONS,
    payload: any
} | {
    type: WORLD_ACTION_REFINE_NEXT,
    payload: any
} | {
    type: WORLD_ACTION_SET_ACTIVE_REGION,
    payload: Region
};

export const WORLD_ACTION_SET_REGIONS = 'WORLD_ACTION_SET_REGIONS';
export const WORLD_ACTION_ADD_REGION = 'WORLD_ACTION_ADD_REGION';
export const WORLD_ACTION_UPDATE_WIDTH = 'WORLD_ACTION_UPDATE_WIDTH';
export const WORLD_ACTION_UPDATE_HEIGHT = 'WORLD_ACTION_UPDATE_HEIGHT';
export const WORLD_ACTION_UPDATE_TILESIZE = 'WORLD_ACTION_UPDATE_TILESIZE';
export const WORLD_ACTION_GENERATE_REGIONS = ' WORLD_ACTION_GENERATE_REGIONS';
export const WORLD_ACTION_REFINE_NEXT = 'WORLD_ACTION_REFINE_NEXT';
export const WORLD_ACTION_TOGGLE_REFINING = 'WORLD_ACTION_TOGGLE_REFINING';
export const WORLD_ACTION_SET_ACTIVE_REGION = 'WORLD_ACTION_SET_ACTIVE_REGION';

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
        case WORLD_ACTION_SET_REGIONS:
            currentState.regions = action.payload;
            return currentState;
        case WORLD_ACTION_ADD_REGION:
            currentState.regions.set(action.payload);
            return currentState;
        case WORLD_ACTION_UPDATE_WIDTH:
            currentState.worldWidth = action.payload;
            return currentState;
        case WORLD_ACTION_UPDATE_HEIGHT:
            currentState.worldHeight = action.payload;
            return currentState;
        case WORLD_ACTION_UPDATE_TILESIZE:
            currentState.tileSize = action.payload;
            return currentState;
        case WORLD_ACTION_GENERATE_REGIONS:
            currentState.regions = generateRandomWorld(
                currentState.worldWidth,
                currentState.worldHeight
            );
            return currentState;
        case WORLD_ACTION_REFINE_NEXT:
            currentState.regions = refineWorld(currentState.regions);
            return currentState;
        case WORLD_ACTION_TOGGLE_REFINING:
            currentState.isRefining = !currentState.isRefining;
            return currentState;
        case WORLD_ACTION_SET_ACTIVE_REGION:
            action.payload.isActive = true;
            currentState.regions = currentState.regions.set(action.payload.key, action.payload);
            currentState.activeRegion = action.payload.copy();
            return currentState;
        default:
            return state;
    }
};

export default WorldReducer;
