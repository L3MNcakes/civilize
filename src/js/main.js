/**
 * main.js
 *
 * @author <L3MNcakes@gmail.com>
 * @flow
 */

import type { Store } from 'redux'

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import WorldContainer from './containers/world.container'
import MainReducer from './reducers/main.reducer'

export let store: Store = createStore(MainReducer)

render(
    <Provider store={store}>
        <WorldContainer />
    </Provider>,
    document.getElementById('root')
);
