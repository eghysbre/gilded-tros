import {Item} from './item';

export const MAX_QUALITY = 50;
export const MIN_QUALITY = 0;
export const LEGENDARY_QUALITY = 80;

export const updateForBDawgKeychain = (item: Item): void => {
    item.quality = LEGENDARY_QUALITY;
    item.sellIn = 0;
}

export const updateForGoodWine = (item: Item): void => {
    increaseItemQuality(item, 1)
    decreaseSellin(item)
}

export const updateForBackstagePass = (item: Item): void => {
    if (item.sellIn < 0) {
        item.quality = 0;
    } else if (item.sellIn <= 5) {
        increaseItemQuality(item, 3)
    } else if (item.sellIn <= 10) {
        increaseItemQuality(item, 2)
    }
    decreaseSellin(item)
}

export const updateForSmellyItems = (item: Item): void => {
    updateItem(item, 2);
}
export const updateForStandardFlow = (item: Item): void => {
    updateItem(item, 1);
}

const updateItem = (item: Item, decreaseBaseValue: number): void => {
    if (item.sellIn < 0) {
        decreaseItemQuality(item, decreaseBaseValue * 2);
    } else {
        decreaseItemQuality(item, decreaseBaseValue);
    }
    decreaseSellin(item)
}

const decreaseItemQuality = (item: Item, decreaseValue: number): void => {
    const quality = item.quality - decreaseValue;
    item.quality = isOverMinQuality(quality) ? quality : MIN_QUALITY;
}

const increaseItemQuality = (item: Item, increaseValue: number): void => {
    const quality = item.quality + increaseValue;
    item.quality = isUnderMaxQuality(quality) ? quality : MAX_QUALITY;
}

const isOverMinQuality = (quality: number): boolean => {
    return quality > MIN_QUALITY
}

const isUnderMaxQuality = (quality: number): boolean => {
    return quality < MAX_QUALITY
}

const decreaseSellin = (item: Item): void => {
    item.sellIn -= 1
}
