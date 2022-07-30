import {Item} from './item';
import {
    updateForBackstagePass,
    updateForBDawgKeychain,
    updateForGoodWine,
    updateForStandardFlow
} from './gilded-tros.functions';
import {Description} from '@/description.enum';

export class GildedTros {
    private _items: Array<Item> = new Array<Item>();

    constructor(items: Array<Item>) {
        this._items = items;
    }

    public updateQuality(): Item[] {
        for (const item of this._items) {
            switch (item.name) {
                case Description.B_DAWG_KEYCHAIN:
                    updateForBDawgKeychain(item)
                    break;
                case Description.GOOD_WINE:
                    updateForGoodWine(item)
                    break;
                case Description.BACKSTAGE_PASSES_FOR_RE_FACTOR:
                case Description.BACKSTAGE_PASSES_FOR_HAXX:
                    updateForBackstagePass(item)
                    break;
                default:
                    updateForStandardFlow(item)
                    break;
            }
        }
        return this._items;
    }

}

