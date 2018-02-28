/**
 * main.js
 *
 * @author <L3MNcakes@gmail.com>
 * @flow
 */
import * as React from 'react';

import type { Store } from 'redux';
import type { MainState } from './reducers/main.reducer';

import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { AppContainer } from './containers/app.container';
import { MainReducer } from './reducers/main.reducer';

export let store: Store<MainState, any> = createStore(MainReducer);

let rootEl: ?HTMLElement = document.getElementById('root');

if (rootEl) {
    render(
        <Provider store={store}>
            <AppContainer />
        </Provider>,
        rootEl
    );
}
