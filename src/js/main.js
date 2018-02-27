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

import { AppContainer } from './containers/app.container';
import { MainReducer } from './reducers/main.reducer'

export let store: Store = createStore(MainReducer)

render(
    <Provider store={store}>
        <AppContainer />
    </Provider>,
    document.getElementById('root')
);
