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
 * A map of the setting strings to the actual terrain type.
 * @TODO Find a way to make this not necessary
 */
const mapSettingToTerrainType: { [key: string]: RegionTerrain } = {
    grass: RegionTerrainTypes.GRASS,
    desert: RegionTerrainTypes.DESERT,
    mountain: RegionTerrainTypes.MOUNTAIN,
    water: RegionTerrainTypes.WATER,
};

/**
 * Calculates the cumulative weights of the terrain types.
 */
const getCumulativeTerrainWeights = (terrainWeights: {[key: string]: number}): {[key: string]: number}=> {
    let cumulativeValue = 0,
        cumulativeWeights = {};

    for (let [key, value] of Object.entries(terrainWeights)) {
        if (typeof value === 'number' && value > 0) {
            cumulativeValue += value;
            cumulativeWeights[key] = cumulativeValue;
        }
    }

    return cumulativeWeights;
};

/**
 * Performs a binary search for a value within a certain interval.
 * Used to randomly select terrain types based on weight values.
 */
const intervalBinarySearch = (searchArr: number[], start: number, end: number, searchValue: number): number => {
    // Sanity check input values
    if (
        end >= searchArr.length ||
        start >=searchArr.length ||
        start < 0 ||
        start > end ||
        searchArr[end] < searchValue
    ) {
        throw new RangeError('intervalBinarySearch() : Search paramters are out of range of searchArr.');
    }

    // Find mid indices
    let mid = parseInt((start + end)/2, 10),
        mid2 = mid - 1;

    // searchValue will always be within the first provided interval, otherwise
    // check if searchValue is within interval (mid2, mid].
    if (
        mid == 0 ||
        (searchValue <= searchArr[mid] &&
         searchValue > searchArr[mid2])
    ) {
        return mid;
    }

    // If searchValue is greater than mid, recurse right half
    if (searchValue > searchArr[mid]) {
        return intervalBinarySearch(searchArr, mid+1, end, searchValue);
    }

    // If searchValue is less than mid2, recurse left half
    if (searchValue < searchArr[mid]) {
        return intervalBinarySearch(searchArr, start, mid2, searchValue);
    }

    // Shouldn't ever happen, but just in case
    return -1;
};

/**
 * Returns a randomly selected terrain type based on the passed in weight
 * values.
 */
const pickRandomTerrain = (terrainWeights: {[key: string]: number}): RegionTerrain => {
    let cumulativeWeights = getCumulativeTerrainWeights(terrainWeights),
        // $FlowFixMe - Suppress Object.values returning Array<mixed> type when we know we'll have Array<number>
        searchArr: number[] = Object.values(cumulativeWeights),
        keyArr = Object.keys(cumulativeWeights),
        searchValue = Random.real(0, searchArr[searchArr.length-1], false)(Random.engines.nativeMath),
        randomIndex = intervalBinarySearch(searchArr, 0, searchArr.length - 1, searchValue);

    return mapSettingToTerrainType[keyArr[randomIndex]];
};

/**
 * Will randomly generate a set of regions that conform to the passed in width
 * and height values.
 *
 * @param {number} worldWidth - The number of tiles that world will expand left to right
 * @param {number} worldHeight - The number of tiles that the world will expand top to bottom
 * @param {
 *
 * @return {Map<string,Region>} - An Immutable map of randomly generated regions.
 */
export const generateRandomWorld = (
    worldWidth: number,
    worldHeight: number,
    terrainWeights: any
): Map<string,Region> => {
    let regions: Map<string,Region> = new Map();

    for (let y = 0; y < worldHeight; y++) {
        for (let x = 0; x < worldWidth; x++) {
            let key: string = `region-${x}-${y}`,
                terrain: RegionTerrain = pickRandomTerrain(terrainWeights),
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
};
