/**
 * app.reducer.js
 *
 * @author <L3MNcakes@gmail.com>
 * @flow
 */

import type { Reducer } from 'react-redux';

export type AppState = {
    mapMode: string
};

export type AppAction = {
    type: string,
    payload: any
};

export const AppActionTypes = {
    SET_MAP_MODE: 'APP_ACTION_SET_MAP_MODE'
};

export const MapModes = {
    MAP_MODE_TERRAIN: 'MAP_MODE_TERRAIN',
    MAP_MODE_REALMS: 'MAP_MODE_REALMS',
};

const defaultState = {
    mapMode: MapModes.MAP_MODE_TERRAIN
};

export const AppReducer: Reducer<AppState, AppAction> = (state = defaultState, action) => {
    let currentState = Object.assign({}, state);

    switch (action.type) {
        case AppActionTypes.SET_MAP_MODE:
            if (action.payload.mapMode) {
                currentState.mapMode = action.payload.mapMode;
            }
            break;
        default:
    }

    return currentState;
};
