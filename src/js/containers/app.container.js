/**
 * app.container.js
 *
 * @author <L3MNcakes@gmail.com>
 * @flow
 */
import { connect } from 'react-redux';
import { AppComponent } from '../components/app.component';

const mapStateToProps = (state) => ({
    appState: state.app,
    worldState: state.world,
});

const mapDispatchToProps = {};

export const AppContainer = connect(mapStateToProps, mapDispatchToProps)(AppComponent);
