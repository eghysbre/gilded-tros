import {Item} from './item';
import {Description} from './description.enum';
import {MAX_QUALITY} from '@/gilded-tros.functions';

export class GildedTros {
    private _items: Array<Item> = new Array<Item>();

    constructor(items: Array<Item>) {
        this._items = items;
    }

    public updateQuality(): Item[] {
        for (let i = 0; i < this._items.length; i++) {
            if (this._items[i].name != Description.GOOD_WINE && this._items[i].name != Description.BACKSTAGE_PASSES_FOR_RE_FACTOR
                && this._items[i].name != Description.BACKSTAGE_PASSES_FOR_HAXX) {
                if (this._items[i].quality > 0) {
                    if (this._items[i].name != Description.B_DAWG_KEYCHAIN) {
                        this._items[i].quality = this._items[i].quality - 1;
                    }
                }
            } else {
                if (this._items[i].quality < MAX_QUALITY) {
                    this._items[i].quality = this._items[i].quality + 1;

                    if (this._items[i].name == Description.BACKSTAGE_PASSES_FOR_RE_FACTOR) {
                        if (this._items[i].sellIn < 11) {
                            if (this._items[i].quality < MAX_QUALITY) {
                                this._items[i].quality = this._items[i].quality + 1;
                            }
                        }

                        if (this._items[i].sellIn < 6) {
                            if (this._items[i].quality < MAX_QUALITY) {
                                this._items[i].quality = this._items[i].quality + 1;
                            }
                        }
                    }
                }
            }

            if (this._items[i].name != Description.B_DAWG_KEYCHAIN) {
                this._items[i].sellIn = this._items[i].sellIn - 1;
            }

            if (this._items[i].sellIn < 0) {
                if (this._items[i].name != Description.GOOD_WINE) {
                    if (this._items[i].name != Description.BACKSTAGE_PASSES_FOR_RE_FACTOR || this._items[i].name != Description.BACKSTAGE_PASSES_FOR_HAXX) {
                        if (this._items[i].quality > 0) {
                            if (this._items[i].name != Description.B_DAWG_KEYCHAIN) {
                                this._items[i].quality = this._items[i].quality - 1;
                            }
                        }
                    } else {
                        this._items[i].quality = this._items[i].quality - this._items[i].quality;
                    }
                } else {
                    if (this._items[i].quality < MAX_QUALITY) {
                        this._items[i].quality = this._items[i].quality + 1;
                    }
                }
            }
        }
        return this._items;
    }

}

