/**
 * world.container.js
 *
 * @author <L3MNcakes@gmail.com>
 * @flow
 */

import type { Region } from '../classes/Region.class'

import { connect } from 'react-redux'

import WorldComponent from '../components/world.component'
import {
    WORLD_ACTION_UPDATE_WIDTH,
    WORLD_ACTION_UPDATE_HEIGHT,
    WORLD_ACTION_UPDATE_TILESIZE,
    WORLD_ACTION_GENERATE_REGIONS,
    WORLD_ACTION_REFINE_NEXT,
    WORLD_ACTION_TOGGLE_REFINING,
    WORLD_ACTION_SET_ACTIVE_REGION,
} from '../reducers/world.reducer';

const mapStateToProps = (state) => ({
    currentState: state
})

const mapDispatchToProps = {
    changeHeight: (newHeight: number) => ({
        type: WORLD_ACTION_UPDATE_HEIGHT,
        payload: parseInt(newHeight, 10)
    }),

    changeWidth: (newWidth: number) => ({
        type: WORLD_ACTION_UPDATE_WIDTH,
        payload: parseInt(newWidth, 10)
    }),

    changeTilesize: (newSize: number) => ({
        type: WORLD_ACTION_UPDATE_TILESIZE,
        payload: parseInt(newSize, 10)
    }),

    clickGenerateRegions: () => ({
        type: WORLD_ACTION_GENERATE_REGIONS,
        payload: {}
    }),

    clickRefineNext: () => ({
        type: WORLD_ACTION_REFINE_NEXT,
        payload: {}
    }),

    clickToggleRefine: () => ({
        type: WORLD_ACTION_TOGGLE_REFINING,
        payload: {}
    }),

    clickRegion: (region: Region) => ({
        type: WORLD_ACTION_SET_ACTIVE_REGION,
        payload: region
    })
};

const WorldContainer = connect(mapStateToProps, mapDispatchToProps)(WorldComponent)

export default WorldContainer
