/**
 * world.component.js
 *
 * @author <L3MNcakes@gmail.com>
 * @flow
 */

// TYPES
import type { AppState } from '../reducers/main.reducer';
import type { Region } from '../classes/Region.class';

// IMPORTS
import React, { Component } from 'react';
import { RegionComponent } from './region.component';
import { WorldConfigComponent } from './world_config.component';
import { TileDetailsComponent } from './tile_details.component';

type Props = {
    currentState: AppState,
    changeHeight: (newHeight: number) => any,
    changeWidth: (newWidth: number) => any,
    changeTilesize: (newSize: number) => any,
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
                tileSize = {currentState.world.tileSize}
                clickRegion = {clickRegion}
            />
        )
    })

    return render
}

const calcStyles = (currentState: AppState) => {
    let width: number = currentState.world.worldWidth * currentState.world.tileSize + currentState.world.worldWidth + 1
    let height: number = currentState.world.worldHeight * currentState.world.tileSize + currentState.world.worldHeight + 1

    return {
        width: width + "px",
        height: height + "px",
        position: "relative",
        border: "3px solid #333",
        margin: "0px auto",
        overflow: "hidden"
    }
}

const detailsStyles = {
    margin: '5px auto',
    width: '700px',
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
                <div style={detailsStyles}>
                    <WorldConfigComponent
                        currentState={this.props.currentState}
                        changeHeight={this.props.changeHeight}
                        changeWidth={this.props.changeWidth}
                        changeTilesize={this.props.changeTilesize}
                        clickGenerateRegions={this.props.clickGenerateRegions}
                        clickRefineNext={this.props.clickRefineNext}
                        clickToggleRefine={this.props.clickToggleRefine}
                    />
                    <TileDetailsComponent
                        region={this.props.currentState.world.activeRegion}
                    />
                </div>
            </div>
        );
    }
}
