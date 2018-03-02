/**
 * map_mode.component.js
 *
 * @author <L3MNcakes@gmail.com>
 * @flow
 */
import * as React from 'react';
import { MapModes } from '../reducers/app.reducer';

type Props = {
    setMapMode: any
};

const wrapperStyles = {
    position: 'fixed',
    top: '10px',
    left: '10px',
    backgroundColor: '#EEE',
    padding: '5px'
};

export const MapModeComponent = ({
    setMapMode
}: Props): React.Element<'div'> => (
    <div style={wrapperStyles}>
        <h2>Map Modes</h2>
        <input
            type='button'
            value='Terrain'
            onClick={() => setMapMode(MapModes.MAP_MODE_TERRAIN)}
        />
        <input
            type='button'
            value='Realms'
            onClick={() => setMapMode(MapModes.MAP_MODE_REALMS)}
        />
    </div>
);
