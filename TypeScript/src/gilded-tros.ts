import {Item} from './item';
import {
    decreaseItemQuality,
    increaseItemQuality,
    isBackstagePass,
    isBDawgKeychain,
    isGoodWine,
    isOverMinQuality,
    isUnderMaxQuality, updateForBDawgKeychain
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
            } else {
                if (!isGoodWine(item) && !isBackstagePass(item)) {
                    if (isOverMinQuality(item.quality)) {
                            decreaseItemQuality(item);
                    }
                } else {
                    if (isUnderMaxQuality(item.quality)) {
                        increaseItemQuality(item);

                        if (isBackstagePass(item)) {
                            if (item.sellIn <= 10) {
                                if (isUnderMaxQuality(item.quality)) {
                                    increaseItemQuality(item);
                                }
                            }

                            if (item.sellIn <= 5) {
                                if (isUnderMaxQuality(item.quality)) {
                                    increaseItemQuality(item);
                                }
                            }
                        }
                    }
                }
                item.sellIn -= 1;


                if (item.sellIn < 0) {
                    if (!isGoodWine(item)) {
                        if (!isBackstagePass(item)) {
                            if (isOverMinQuality(item.quality)) {
                                    decreaseItemQuality(item);
                            }
                        } else {
                            item.quality = 0;
                        }
                    } else {
                        if (isUnderMaxQuality(item.quality)) {
                            increaseItemQuality(item);
                        }
                    }
                }
            }
        }
        return this._items;
    }

}

