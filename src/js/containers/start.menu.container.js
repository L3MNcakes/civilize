/**
 * start.menu.component.js
 *
 * @author <L3MNcakes@gmail.com>
 * @flow
 */

import { connect } from 'react-redux';
import { StartMenuComponent } from '../components/start-menu/start.menu.component';
import { WorldActionTypes } from '../reducers/world.reducer';

const mapStateToProps = (state) => ({
    worldState: state.world
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
        type: WorldActionTypes.GENERATE_NEW_WORLD
    }),

    refineWorld: () => ({
        type: WorldActionTypes.REFINE_WORLD
    }),
};

export const StartMenuContainer = connect(mapStateToProps, mapDispatchToProps)(StartMenuComponent);
