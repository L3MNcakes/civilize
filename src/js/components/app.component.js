/**
 * app.component.js
 *
 * @author <L3MNcakes@gmail.com>
 * @flow
 */

import React, { Component } from 'react';
import { StartMenuComponent } from './start.menu.component';
import WorldContainer from '../containers/world.container';

type Props = {
    appState: any,
    worldState: any,
    changeWorldSetting: any,
    changeTerrainWeight: any,
    generateNewWorld: any,
    refineWorld: any,
    finishWorldGeneration: any,
};

const wrapperStyles = {
    width: '100%',
    height: '100%',
    backgroundColor: '#111',
    overflow: 'auto',
};

export class AppComponent extends Component {
    _renderStartMenu(): ?React.Element {
        return !this.props.appState.hasGeneratedWorld ? (
            <StartMenuComponent
                worldState={this.props.worldState}
                changeWorldSetting={this.props.changeWorldSetting}
                changeTerrainWeight={this.props.changeTerrainWeight}
                generateNewWorld={this.props.generateNewWorld}
                refineWorld={this.props.refineWorld}
                finishWorldGeneration={this.props.finishWorldGeneration}
            />
        ) : null;
    }

    _renderWorld(): ?React.Element {
        return this.props.appState.hasGeneratedWorld ? (
            <WorldContainer />
        ) : null;
    }

    render(): React.Element {
        return (
            <div style={wrapperStyles}>
                {this._renderStartMenu()}
                {this._renderWorld()}
            </div>
        );
    }
}
