import {Item} from './item';
import {
    isBackstagePass,
    isBDawgKeychain,
    isGoodWine,
    updateForBackstagePass,
    updateForBDawgKeychain,
    updateForGoodWine,
    updateForStandardFlow
} from './gilded-tros.functions';

export class GildedTros {
    private _items: Array<Item> = new Array<Item>();

    constructor(items: Array<Item>) {
        this._items = items;
    }

    public updateQuality(): Item[] {
        for (const item of this._items) {
            if (isBDawgKeychain(item)) {
                updateForBDawgKeychain(item)
            } else if (isGoodWine(item)) {
                updateForGoodWine(item);
            } else if (isBackstagePass(item)) {
                updateForBackstagePass(item)
            } else {
                updateForStandardFlow(item)
            }
        }
        return this._items;
    }

}

