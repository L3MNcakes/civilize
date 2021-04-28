/**
 * Realm.class.js
 *
 * @author <L3MNcakes@gmail.com>
 * @flow
 */
import Random from 'random-js';
import { Set } from 'immutable';
import { Region } from './Region.class';

type RealmProps = {
    name?: string;
    color?: string;
    regions ?: Set<Region>;
};

const getRandomName = (): string => {
    let consonates = 'bcdfghjklmnpqrstvwxyz',
        vowels = 'aeiou',
        name = Random.string(consonates)(Random.engines.nativeMath, 2)
            + Random.string(vowels)(Random.engines.nativeMath, 1)
            + Random.string(consonates)(Random.engines.nativeMath, 1);

    return name.charAt(0).toUpperCase() + name.slice(1);
};

const getRandomColor = (): string => {
    return '#' + Random.hex()(Random.engines.nativeMath, 6);
};

export class Realm
{
    name: string;
    color: string;
    regions: Set<Region>;

    constructor(realm: ?RealmProps, initRandom: boolean = false) {
        if (initRandom) {
            this.name = getRandomName();
            this.color = getRandomColor();
        } else {
            this.name = realm && realm.name !== undefined ? realm.name : '';
            this.color = realm && realm.color !== undefined ? realm.color : '#333';
        }

        this.regions = new Set();
    }
}
