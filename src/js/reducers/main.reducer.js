/**
 * main.reducer.js
 *
 * @author <L3MNcakes@gmail.com>
 * @flow
 */

import type { WorldState } from './world.reducer';
import type { AppState } from './app.reducer';
import { combineReducers } from 'redux';
import WorldReducer from './world.reducer';
import { AppReducer } from './app.reducer';

export type MainState = {
    world: WorldState,
    app: AppState,
};

export const MainReducer = combineReducers({
    world: WorldReducer,
    app: AppReducer,
});
