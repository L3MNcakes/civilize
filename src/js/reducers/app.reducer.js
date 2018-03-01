/**
 * app.reducer.js
 *
 * @author <L3MNcakes@gmail.com>
 * @flow
 */

import type { Reducer } from 'react-redux';

export type AppState = {};

export type AppAction = {
    type: string,
    payload: any
};

export const AppActionTypes = {};

const defaultState = {};

export const AppReducer: Reducer<AppState, AppAction> = (state = defaultState, action) => {
    let currentState = Object.assign({}, state);

    switch (action.type) {
        default:
    }

    return currentState;
};
