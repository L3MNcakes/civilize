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

const mapDispatchToProps = {
    changeWorldSetting: (setting: string, value: number) => ({
        type: WorldActionTypes.SET_WORLD_SETTING,
        payload: {
            setting,
            value: parseInt(value, 10),
        }
    }),

    changeTerrainWeight: (terrainType: string, value: number) => ({
        type: WorldActionTypes.SET_TERRAIN_WEIGHT,
        payload: {
            terrainType,
            value: parseInt(value, 10),
        }
    }),

    generateNewWorld: () => ({
        type: WorldActionTypes.GENERATE_REGIONS
    }),

    refineWorld: () => ({
        type: WorldActionTypes.REFINE_NEXT
    }),

    finishWorldGeneration: () => ({
        type: AppActionTypes.SET_WORLD_GENERATED
    }),
};

export const AppContainer = connect(mapStateToProps, mapDispatchToProps)(AppComponent);
