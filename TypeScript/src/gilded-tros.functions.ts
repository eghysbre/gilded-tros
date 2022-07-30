import {Item} from '@/item';
import {Description} from '@/description.enum';

export const MAX_QUALITY = 50;
export const MIN_QUALITY = 0;
export const LEGENDARY_QUALITY = 80;

export const decreaseItemQuality = (item: Item): void => {
    item.quality -= 1;
}
export const increaseItemQuality = (item: Item): void => {
    item.quality += 1;
}

export const isBackstagePass = (item: Item): boolean => {
    return item.name === Description.BACKSTAGE_PASSES_FOR_RE_FACTOR || item.name === Description.BACKSTAGE_PASSES_FOR_HAXX;
}

export const isGoodWine = (item: Item): boolean => {
    return item.name === Description.GOOD_WINE
}

export const isBDawgKeychain = (item: Item): boolean => {
    return item.name === Description.B_DAWG_KEYCHAIN
}

export const isOverMinQuality = (quality: number): boolean => {
    return quality > MIN_QUALITY
}
export const isUnderMaxQuality = (quality: number): boolean => {
    return quality < MAX_QUALITY
}
