import {Item} from './item';
import {
    decreaseItemQuality,
    isBackstagePass,
    isBDawgKeychain,
    isGoodWine,
    isOverMinQuality,
    updateForBackstagePass,
    updateForBDawgKeychain,
    updateForGoodWine
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
                if (isOverMinQuality(item.quality)) {
                    decreaseItemQuality(item);
                }
                item.sellIn -= 1;

                if (item.sellIn < 0) {
                    if (isOverMinQuality(item.quality)) {
                        decreaseItemQuality(item);
                    }
                }
            }
        }
        return this._items;
    }

}

