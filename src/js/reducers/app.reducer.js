/**
 * app.reducer.js
 *
 * @author <L3MNcakes@gmail.com>
 * @flow
 */

import type { Reducer } from 'react-redux';

export type AppState = {
    hasGeneratedWorld: boolean
};

export type AppAction = {
    type: string,
    payload: any
};

import { Map } from 'immutable';

export const AppActionTypes = {
    SET_WORLD_GENERATED: 'APP_ACTION_SET_WORLD_GENERATED',
};

const defaultState = {
    hasGeneratedWorld: false
};

export const AppReducer: Reducer<AppState, AppAction> = (state = defaultState, action) => {
    let currentState = Object.assign({}, state);

    switch (action.type) {
        case AppActionTypes.SET_WORLD_GENERATED:
            currentState.hasGeneratedWorld = true;
            break;
        default:
    }

    return currentState;
};
