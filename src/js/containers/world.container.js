/**
 * world.container.js
 *
 * @author <L3MNcakes@gmail.com>
 * @flow
 */

import type { Region } from '../classes/Region.class'

import { connect } from 'react-redux'

import WorldComponent from '../components/world.component'
import { WorldActionTypes } from '../reducers/world.reducer';

const mapStateToProps = (state) => ({
    currentState: state
})

const mapDispatchToProps = {
    changeHeight: (newHeight: number) => ({
        type: WorldActionTypes.UPDATE_HEIGHT,
        payload: parseInt(newHeight, 10)
    }),

    changeWidth: (newWidth: number) => ({
        type: WorldActionTypes.UPDATE_WIDTH,
        payload: parseInt(newWidth, 10)
    }),

    changeTilesize: (newSize: number) => ({
        type: WorldActionTypes.UPDATE_TILESIZE,
        payload: parseInt(newSize, 10)
    }),

    clickGenerateRegions: () => ({
        type: WorldActionTypes.GENERATE_REGIONS,
        payload: {}
    }),

    clickRefineNext: () => ({
        type: WorldActionTypes.REFINE_NEXT,
        payload: {}
    }),

    clickToggleRefine: () => ({
        type: WorldActionTypes.TOGGLE_REFINE,
        payload: {}
    }),

    clickRegion: (region: Region) => ({
        type: WorldActionTypes.SET_ACTIVE_REGION,
        payload: region
    })
};

const WorldContainer = connect(mapStateToProps, mapDispatchToProps)(WorldComponent)

export default WorldContainer
