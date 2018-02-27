/**
 * app.container.js
 *
 * @author <L3MNcakes@gmail.com>
 * @flow
 */

import { connect } from 'react-redux';
import { AppComponent } from '../components/app.component';
import { WorldActionTypes } from '../reducers/world.reducer';
import { AppActionTypes } from '../reducers/app.reducer';

const mapStateToProps = (state) => ({
    appState: state.app,
    worldState: state.world,
});

const mapDispatchToProps = {};

export const AppContainer = connect(mapStateToProps, mapDispatchToProps)(AppComponent);
