/**
 * tile_details.component.js
 *
 * @author <L3MNcakes@gmail.com>
 * @flow
 */
import * as React from 'react';

import { Region } from '../classes/Region.class';

type Props = {
    region: Region
};

const wrapperStyles = {
    border: '3px solid #333',
    width: '400px',
    display: 'inline-block',
    margin: '0px 5px',
    padding: '5px',
    backgroundColor: '#EEE',
};

export const TileDetailsComponent = ({ region }: Props) => (
    <div style={wrapperStyles}>
        <div>
            <strong>Key: </strong>
            {region ? region.key : ''}
        </div>
        <div>
            <strong>X: </strong>
            {region ? region.x : ''}
        </div>
        <div>
            <strong>Y: </strong>
            {region ? region.y : ''}
        </div>
        <div>
            <strong>Terrain: </strong>
            {region ? region.terrain : ''}
        </div>
        <div>
            <strong>Realm: </strong>
            {region && region.realm ? region.realm.name : ''}
        </div>
    </div>
);
