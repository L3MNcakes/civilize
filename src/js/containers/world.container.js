/**
 * world.container.js
 *
 * @author <L3MNcakes@gmail.com>
 * @flow
 */

import type { Region } from '../classes/Region.class';

import { connect } from 'react-redux';

import { WorldComponent } from '../components/world.component';
import { WorldActionTypes } from '../reducers/world.reducer';

const mapStateToProps = (state) => ({
    currentState: state
});

const mapDispatchToProps = {
    clickRegion: (region: Region) => ({
        type: WorldActionTypes.SET_ACTIVE_REGION,
        payload: region
    })
};

export const WorldContainer = connect(mapStateToProps, mapDispatchToProps)(WorldComponent);
