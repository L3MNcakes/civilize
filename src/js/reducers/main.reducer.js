/**
 * main.reducer.js
 *
 * @author <L3MNcakes@gmail.com>
 * @flow
 */

import type { WorldState } from './world.reducer'
import { combineReducers } from 'redux'
import WorldReducer from './world.reducer'

export type AppState = {
    world: WorldState
}

const MainReducer = combineReducers({
    world: WorldReducer
})

export default MainReducer
