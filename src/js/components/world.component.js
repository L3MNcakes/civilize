/**
 * world.component.js
 *
 * @author <L3MNcakes@gmail.com>
 * @flow
 */

// TYPES
import type { MainState } from '../reducers/main.reducer';
import type { Region } from '../classes/Region.class';

// IMPORTS
import React, { Component } from 'react';
import { RegionComponent } from './region.component';
import { WorldConfigComponent } from './world_config.component';
import { TileDetailsComponent } from './tile_details.component';

type Props = {
    currentState: MainState,
    clickGenerateRegions: () => any,
    clickRefineNext: () => any,
    clickRegion: (region: Region) => any,
}

const renderRegions = (currentState, clickRegion) => {
    let render = []

    currentState.world.regions.forEach( (region, key) => {
        render.push(
            <RegionComponent
                key = {key}
                region = {region}
                tileSize = {currentState.world.settings.tileSize}
                clickRegion = {clickRegion}
            />
        )
    })

    return render
}

const calcStyles = (currentState: MainState) => {
    let width: number = currentState.world.settings.width * currentState.world.settings.tileSize + currentState.world.settings.width + 1
    let height: number = currentState.world.settings.height * currentState.world.settings.tileSize + currentState.world.settings.height + 1

    return {
        width: width + "px",
        height: height + "px",
        position: "relative",
        border: "3px solid #333",
        margin: "0px auto",
        overflow: "hidden"
    }
}

export default class WorldComponent extends Component
{

    refineInterval: any;

    constructor(props: Props) {
        super(props);

        this.refineInterval = null;
    }

    componentWillUpdate(nextProps: Props, nextState: any) {
        if (nextProps.currentState.world.isRefining && !this.refineInterval) {
            this.refineInterval = setInterval( () => nextProps.clickRefineNext(), 100 );
        } else if (!nextProps.currentState.world.isRefining && this.refineInterval) {
            clearInterval(this.refineInterval);
            this.refineInterval = null;
        }
    }

    render() {
        return (
            <div>
                <div style={calcStyles(this.props.currentState)}>
                    {renderRegions(this.props.currentState, this.props.clickRegion)}
                </div>
            </div>
        );
    }
}
