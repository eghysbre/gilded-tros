import {Item} from './item';
import {Description} from './description.enum';
import {MAX_QUALITY} from './gilded-tros.functions';

export class GildedTros {
    private _items: Array<Item> = new Array<Item>();

    constructor(items: Array<Item>) {
        this._items = items;
    }

    public updateQuality(): Item[] {
        for (const item of this._items) {
            if (item.name !== Description.GOOD_WINE && item.name !== Description.BACKSTAGE_PASSES_FOR_RE_FACTOR
                && item.name !== Description.BACKSTAGE_PASSES_FOR_HAXX) {
                if (item.quality > 0) {
                    if (item.name !== Description.B_DAWG_KEYCHAIN) {
                        item.quality = item.quality - 1;
                    }
                }
            } else {
                if (item.quality < MAX_QUALITY) {
                    item.quality = item.quality + 1;

                    if (item.name === Description.BACKSTAGE_PASSES_FOR_RE_FACTOR) {
                        if (item.sellIn < 11) {
                            if (item.quality < MAX_QUALITY) {
                                item.quality = item.quality + 1;
                            }
                        }

                        if (item.sellIn < 6) {
                            if (item.quality < MAX_QUALITY) {
                                item.quality = item.quality + 1;
                            }
                        }
                    }
                }
            }

            if (item.name !== Description.B_DAWG_KEYCHAIN) {
                item.sellIn = item.sellIn - 1;
            }

            if (item.sellIn < 0) {
                if (item.name !== Description.GOOD_WINE) {
                    if (item.name !== Description.BACKSTAGE_PASSES_FOR_RE_FACTOR && item.name !== Description.BACKSTAGE_PASSES_FOR_HAXX) {
                        if (item.quality > 0) {
                            if (item.name !== Description.B_DAWG_KEYCHAIN) {
                                item.quality = item.quality - 1;
                            }
                        }
                    } else {
                        item.quality = item.quality - item.quality;
                    }
                } else {
                    if (item.quality < MAX_QUALITY) {
                        item.quality = item.quality + 1;
                    }
                }
            }
        }
        return this._items;
    }

}

