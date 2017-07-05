/**
 * Region.class.js
 *
 * @author <L3MNcakes@gmail.com>
 * @flow
 */

import type { AppState } from '../reducers/main.reducer'
import type { RegionsMap } from '../reducers/regions.reducer'

import { store } from '../main'

export type RegionTerrain = (
    'REGION_TERRAIN_NONE' |
    'REGION_TERRAIN_GRASS' |
    'REGION_TERRAIN_DESERT' |
    'REGION_TERRAIN_MOUNTAIN' |
    'REGION_TERRAIN_WATER'
)

type RegionProps = {
    key?: string,
    x?: number,
    y?: number,
    isActive?: boolean,
    isHover?: boolean,
    terrain?: RegionTerrain,
}

export const REGION_TERRAIN_NONE = 'REGION_TERRAIN_NONE';
export const REGION_TERRAIN_GRASS = 'REGION_TERRAIN_GRASS';
export const REGION_TERRAIN_DESERT = 'REGION_TERRAIN_DESERT';
export const REGION_TERRAIN_MOUNTAIN = 'REGION_TERRAIN_MOUNTAIN';
export const REGION_TERRAIN_WATER = 'REGION_TERRAIN_WATER';

export class Region
{
    key: string;
    x: number;
    y: number;
    isActive: boolean;
    isHover: boolean;
    terrain: RegionTerrain;

    constructor(region: ?RegionProps) {
        if(region) {
            this.key = region.key !== undefined ? region.key : '';
            this.x = region.x !== undefined ? region.x : 0;
            this.y = region.y !== undefined ? region.y : 0;
            this.isActive = region.isActive !== undefined ? region.isActive : false;
            this.isHover = region.isHover !== undefined ? region.isHover : false;
            this.terrain = region.terrain !== undefined ? region.terrain : REGION_TERRAIN_NONE;
        }
    }

    static fetchRegion(key: string): ?Region {
        let state: AppState = store.getState();
        let region: Region = state.world.regions.get(key);

        return region;
    }

    copy(): Region {
        return new Region({
            key: this.key,
            x: this.x,
            y: this.y,
            isActive: this.isActive,
            isHover: this.isHover,
            terrain: this.terrain
        });
    }

    getNorth(): ?Region {
        let key: string = 'region-'+this.x+'-'+(this.y-1);

        return Region.fetchRegion(key);
    }

    getSouth(): ?Region {
        let key: string = 'region-'+this.x+'-'+(this.y+1);

        return Region.fetchRegion(key);
    }

    getWest(): ?Region {
        let key: string = 'region-'+(this.x-1)+'-'+this.y;

        return Region.fetchRegion(key);
    }

    getEast(): ?Region {
        let key: string = 'region-'+(this.x+1)+'-'+this.y;

        return Region.fetchRegion(key);
    }

    getNorthWest(): ?Region {
        let key: string = 'region-'+(this.x-1)+'-'+(this.y-1);

        return Region.fetchRegion(key);
    }

    getNorthEast(): ?Region {
        let key: string = 'region-'+(this.x+1)+'-'+(this.y-1);

        return Region.fetchRegion(key);
    }

    getSouthWest(): ?Region {
        let key: string = 'region-'+(this.x-1)+'-'+(this.y+1);

        return Region.fetchRegion(key);
    }

    getSouthEast(): ?Region {
        let key: string = 'region-'+(this.x+1)+'-'+(this.y+1);

        return Region.fetchRegion(key);
    }

    isGrass(): boolean {
        return this.terrain === REGION_TERRAIN_GRASS;
    }

    isWater(): boolean {
        return this.terrain === REGION_TERRAIN_WATER;
    }

    isMountain(): boolean {
        return this.terrain === REGION_TERRAIN_MOUNTAIN;
    }

    isDesert(): boolean {
        return this.terrain === REGION_TERRAIN_DESERT;
    }
}
