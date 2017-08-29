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
    settings: {
        width: number,
        height: number,
        tileSize: number,
        cycles: number,
    },
    regions: Map<string,Region>,
    isRefining: boolean,
    activeRegion: ?Region
};

export type WorldSettingsPayload = {
    setting: string,
    value: number
};

export type WorldAction = {
    type: string,
    payload: Map<string,Region> | Region | number | WorldSettingsPayload | null
};

export const WorldActionTypes = {
    SET_REGIONS: 'WORLD_ACTION_SET_REGIONS',
    ADD_REGION: 'WORLD_ACTION_SET_REGION',
    GENERATE_REGIONS: 'WORLD_ACTION_GENERATE_REGIONS',
    REFINE_NEXT: 'WORLD_ACTION_REFINE_NEXT',
    TOGGLE_REFINE: 'WORLD_ACTION_TOGGLE_REFINE',
    SET_ACTIVE_REGION: 'WORLD_ACTION_SET_ACTIVE_REGION',
    SET_WORLD_SETTING: 'WORLD_ACTION_SET_WORLD_SETTINGS',
};

const defaultState = {
    settings: {
        width: 25,
        height: 25,
        tileSize: 15,
        cycles: 200,
    },
    regions: new Map(), // Map of all current regions
    isRefining: false,  // Whether or not the world regions are currently being refined
    activeRegion: null, // The region that is currently active
};

const WorldReducer : Reducer<WorldState, WorldAction> = (state = defaultState, action) => {
    let currentState: WorldState = Object.assign({}, state);

    switch(action.type) {
        case WorldActionTypes.SET_REGIONS:
            if (action.payload instanceof Map) {
                currentState.regions = action.payload;
            }
            return currentState;
        case WorldActionTypes.ADD_REGION:
            currentState.regions.set(action.payload);
            return currentState;
        case WorldActionTypes.GENERATE_REGIONS:
            currentState.regions = generateRandomWorld(
                currentState.settings.width,
                currentState.settings.height
            );
            return currentState;
        case WorldActionTypes.REFINE_NEXT:
            currentState.regions = refineWorld(currentState.regions);
            return currentState;
        case WorldActionTypes.TOGGLE_REFINE:
            currentState.isRefining = !currentState.isRefining;
            return currentState;
        case WorldActionTypes.SET_ACTIVE_REGION:
            if (action.payload instanceof Region) {
                currentState = setActiveRegion(action.payload, currentState);
            }
            return currentState;
        case WorldActionTypes.SET_WORLD_SETTING:
            if (action.payload && action.payload.setting && action.payload.value) {
                currentState.settings[action.payload.setting] = action.payload.value;
            }
            return currentState;
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
