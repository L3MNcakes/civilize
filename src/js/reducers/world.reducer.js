/**
 * world.reducer.js
 *
 * @author <L3MNcakes@gmail.com>
 * @flow
 */

// TYPES
import type { Reducer } from 'redux';

// IMPORTS
import { Map, Set } from 'immutable';
import { Region } from '../classes/Region.class';
import { Realm } from '../classes/Realm.class';
import {
    generateRandomWorld,
    refineWorld,
    generateRealms,
    assignRealms
} from '../world.generator';

export type WorldSettings = {
    width: number,
    height: number,
    tileSize: number,
    cycles: number,
    numRealms: number,
    terrainWeights: {
        grass: number,
        desert: number,
        mountain: number,
        water: number,
    }
};

export type WorldState = {
    settings: WorldSettings,
    regions: Map<string,Region>,
    realms: Set<Realm>,
    activeRegion: ?Region,
    hasGeneratedWorld: boolean,
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
    GENERATE_NEW_WORLD: 'WORLD_ACTION_GENERATE_NEW_WORLD',
    REFINE_WORLD: 'WORLD_ACTION_REFINE_WORLD',
    SET_ACTIVE_REGION: 'WORLD_ACTION_SET_ACTIVE_REGION',
    SET_WORLD_SETTING: 'WORLD_ACTION_SET_WORLD_SETTINGS',
    SET_TERRAIN_WEIGHT: 'WORLD_ACTION_SET_TERRAIN_WEIGHT',
};

const defaultState = {
    settings: {
        width: 25,
        height: 25,
        tileSize: 15,
        cycles: 200,
        numRealms: 5,
        terrainWeights: {
            grass: 1,
            desert: 1,
            mountain: 1,
            water: 1,
        }
    },
    regions: new Map(), // Map of all current regions
    realms: new Set(),
    activeRegion: null, // The region that is currently active
    hasGeneratedWorld: false
};

const WorldReducer : Reducer<WorldState, WorldAction> = (state = defaultState, action) => {
    let currentState: WorldState = Object.assign({}, state);

    switch(action.type) {
        case WorldActionTypes.GENERATE_NEW_WORLD:
            currentState.regions = generateRandomWorld(
                currentState.settings.width,
                currentState.settings.height,
                currentState.settings.terrainWeights
            );
            return currentState;
        case WorldActionTypes.REFINE_WORLD:
            for (let i = 0; i < currentState.settings.cycles; i++) {
                currentState.regions = refineWorld(currentState.regions);
            }
            currentState.realms = generateRealms(currentState.settings.numRealms);
            currentState.regions = assignRealms(currentState.realms, currentState.regions, currentState.realms.size);
            currentState.hasGeneratedWorld = true;
            return currentState;
        case WorldActionTypes.SET_ACTIVE_REGION:
            if (action.payload instanceof Region) {
                currentState = setActiveRegion(action.payload, currentState);
            }
            return currentState;
        case WorldActionTypes.SET_WORLD_SETTING:
            if (
                action.payload &&
                typeof action.payload.setting === 'string' &&
                action.payload.value !== undefined
            ) {
                currentState.settings[action.payload.setting] = action.payload.value;
            }
            return currentState;
        case WorldActionTypes.SET_TERRAIN_WEIGHT:
            if (
                action.payload &&
                typeof action.payload.terrainType === 'string' &&
                action.payload.value !== undefined
            ) {
                currentState.settings.terrainWeights[action.payload.terrainType] = action.payload.value;
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
};

export default WorldReducer;
