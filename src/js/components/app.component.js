/**
 * app.component.js
 *
 * @author <L3MNcakes@gmail.com>
 * @flow
 */
import * as React from 'react';

import { StartMenuContainer } from '../containers/start.menu.container';
import { WorldContainer } from '../containers/world.container';
import { MapModeComponent } from './map_mode.component';

type Props = {
    appState: any,
    worldState: any,
    setMapMode: any,
};

const wrapperStyles = {
    width: '100%',
    height: '100%',
    backgroundColor: '#111',
    overflow: 'auto',
};

export class AppComponent extends React.Component<Props> {
    _renderStartMenu(): ?React.Element<typeof StartMenuContainer> {
        return !this.props.worldState.hasGeneratedWorld ? (
            <StartMenuContainer />
        ) : null;
    }

    _renderWorld(): ?React.Element<typeof WorldContainer> {
        return this.props.worldState.hasGeneratedWorld ? (
            <WorldContainer />
        ) : null;
    }

    _renderMapMode(): ?React.Element<typeof MapModeComponent> {
        return this.props.worldState.hasGeneratedWorld ? (
            <MapModeComponent
                setMapMode={this.props.setMapMode}
            />
        ) : null;
    }

    render(): React.Element<'div'> {
        return (
            <div style={wrapperStyles}>
                {this._renderStartMenu()}
                {this._renderWorld()}
                {this._renderMapMode()}
            </div>
        );
    }
}
