/**
 * app.component.js
 *
 * @author <L3MNcakes@gmail.com>
 * @flow
 */
import * as React from 'react';

import { StartMenuContainer } from '../containers/start.menu.container';
import { WorldContainer } from '../containers/world.container';

type Props = {
    appState: any,
    worldState: any
};

const wrapperStyles = {
    width: '100%',
    height: '100%',
    backgroundColor: '#111',
    overflow: 'auto',
};

export class AppComponent extends React.Component<Props> {
    _renderStartMenu(): ?React.Element<StartMenuContainer> {
        return !this.props.worldState.hasGeneratedWorld ? (
            <StartMenuContainer />
        ) : null;
    }

    _renderWorld(): ?React.Element<WorldContainer> {
        return this.props.worldState.hasGeneratedWorld ? (
            <WorldContainer />
        ) : null;
    }

    render(): React.Element<'div'> {
        return (
            <div style={wrapperStyles}>
                {this._renderStartMenu()}
                {this._renderWorld()}
            </div>
        );
    }
}
