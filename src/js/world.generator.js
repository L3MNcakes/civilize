/**
 * world.generator.js
 *
 * @author <L3MNcakes@gmail.com>
 * @flow
 */

// TYPES
import type { RegionTerrain } from './classes/Region.class';

// IMPORTS
import Random from 'random-js';
import { Map } from 'immutable';
import { Region, RegionTerrainTypes } from './classes/Region.class';

/**
 * An array of terrains which the world generator will randomly pick from
 * to decide the terrain of a newly created region.
 *
 * A single entry per terrain type will result in an even distribution of
 * regions with each terrain type. Multiple entries of the same terrain type
 * is a way to weight the distribution so that certain terrain types are more
 * likely to show up than others.
 *
 * @TODO Allow usable terrain types and weight values to be configurable through
 * the world generation settings UI.
 */
const useableTerrains: RegionTerrain[] = [
    RegionTerrainTypes.GRASS,
    RegionTerrainTypes.GRASS,
    RegionTerrainTypes.GRASS,
    RegionTerrainTypes.DESERT,
    RegionTerrainTypes.MOUNTAIN,
    RegionTerrainTypes.MOUNTAIN,
    RegionTerrainTypes.WATER,
];

/**
 * Will randomly generate a set of regions that conform to the passed in width
 * and height values.
 *
 * @param {number} worldWidth - The number of tiles that world will expand left to right
 * @param {number} worldHeight - The number of tiles that the world will expand top to bottom
 *
 * @return {Map<string,Region>} - An Immutable map of randomly generated regions.
 */
export const generateRandomWorld = (
    worldWidth: number,
    worldHeight: number
): Map<string,Region> => {
    let regions: Map<string,Region> = new Map();

    for (let y = 0; y < worldHeight; y++) {
        for (let x = 0; x < worldWidth; x++) {
            let key: string = `region-${x}-${y}`,
                terrain: RegionTerrain = Random.picker(useableTerrains)(Random.engines.nativeMath),
                region: Region = new Region({
                    key,
                    x,
                    y,
                    terrain,
                    isHover: false,
                    isActive: false,
                });

            regions = regions.set(key, region);
        }
    }


    return regions;
};

/**
 * Refines a current world state by randomly sampling regions and tweaking their neighbors so that
 * organic clusters of terrain will form.
 *
 * @param {Map<string,Region>} currentRegions - An Immutable map of the current regions
 *
 * @return {Map<string,Region} - A new map containing the refined regions
 */
export const refineWorld = (
    currentRegions: Map<string, Region>
): Map<string, Region> => {
    let shuffledKeys = Random.sample(
        Random.engines.nativeMath,
        currentRegions.keySeq().toArray(),
        5
    );

    for (let key of shuffledKeys) {
        let region = currentRegions.get(key);
        currentRegions = refineRegion(region, currentRegions);
    }

    return currentRegions;
};

/**
 * Refines a single region by randomly sampling neighboring regions and converting their terrain
 * to the passed in region's. This allows the terrain types to "spread" in an organic fashion.
 *
 * @param {Region} region - The region that will be refined
 * @param {Map<string,Region} currentRegions - The Immutable map of all current regions
 *
 * @return {Map<string,Region} - A new Immutable map containing the refined neighboring regions.
 */
const refineRegion = (region: Region, currentRegions: Map<string, Region>): Map<string, Region> => {
    let cardinalAreas: Region[] = region.getCardinalRegions();
    let diagonalAreas: Region[] = region.getDiagonalRegions();
    let randomDiagonals: Region[] = Random.sample(
        Random.engines.nativeMath,
        diagonalAreas,
        diagonalAreas.length / 2
    );

    cardinalAreas.forEach( (cardinalRegion: Region) => {
        cardinalRegion.terrain = region.terrain;
        currentRegions = currentRegions.set(cardinalRegion.key, cardinalRegion);
    });

    randomDiagonals.forEach( (diagonalRegion: Region) => {
        diagonalRegion.terrain = region.terrain;
        currentRegions = currentRegions.set(diagonalRegion.key, diagonalRegion);
    });

    return currentRegions;
}
