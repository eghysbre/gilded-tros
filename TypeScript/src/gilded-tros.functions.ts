import {Item} from './item';

export const MAX_QUALITY = 50;
export const MIN_QUALITY = 0;
export const LEGENDARY_QUALITY = 80;

export const decreaseItemQuality = (item: Item): void => {
    item.quality = isOverMinQuality(item.quality) ? item.quality -= 1 : item.quality;
}

export const increaseItemQuality = (item: Item, increase: number): void => {
    const quality = item.quality + increase;
    item.quality = isUnderMaxQuality(quality) ? quality : MAX_QUALITY;
}

export const isOverMinQuality = (quality: number): boolean => {
    return quality > MIN_QUALITY
}

export const isUnderMaxQuality = (quality: number): boolean => {
    return quality < MAX_QUALITY
}

export const updateForBDawgKeychain = (item: Item): void => {
    item.quality = LEGENDARY_QUALITY;
    item.sellIn = 0;
}

export const updateForGoodWine = (item: Item): void => {
    item.sellIn -= 1;
    increaseItemQuality(item, 1)
}
export const updateForBackstagePass = (item: Item): void => {
    if (item.sellIn <= 0) {
        item.quality = 0;
    } else if (item.sellIn <= 5) {
        increaseItemQuality(item, 3)
    } else if (item.sellIn <= 10) {
        increaseItemQuality(item, 2)
    }
    item.sellIn -= 1;
}
export const updateForStandardFlow = (item: Item): void => {
    decreaseItemQuality(item);
    if (item.sellIn < 0) {
        decreaseItemQuality(item);
    }
    item.sellIn -= 1;
}
