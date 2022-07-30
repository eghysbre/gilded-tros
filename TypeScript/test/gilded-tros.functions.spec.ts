import {
    decreaseItemQuality,
    increaseItemQuality, increaseItemQualityByOne,
    isBackstagePass,
    isBDawgKeychain,
    isGoodWine, isOverMinQuality, isUnderMaxQuality, LEGENDARY_QUALITY, MAX_QUALITY, MIN_QUALITY, updateForBDawgKeychain
} from '../src/gilded-tros.functions';
import {Item} from '../src/item';
import {Description} from '../src/description.enum';

describe('GildedTrosFunctionsTest', () => {
    it('decreaseItemQuality', () => {
        //given
        const item: Item = new Item(Description.RING_OF_CLEANSENING_CODE, 5, 5);
        //when
        decreaseItemQuality(item);
        //then
        expect(item.quality).toEqual(4)
    });
    it('increaseItemQualityByOne', () => {
        //given
        const item: Item = new Item(Description.RING_OF_CLEANSENING_CODE, 5, 5);
        //when
        increaseItemQualityByOne(item);
        //then
        expect(item.quality).toEqual(6)
    });
    it('increaseItemQuality by value', () => {
        //given
        const item: Item = new Item(Description.RING_OF_CLEANSENING_CODE, 5, 5);
        //when
        increaseItemQuality(item, 3);
        //then
        expect(item.quality).toEqual(8)
    });
    it('isBackstagePass', () => {
        //given
        const notBackstageItem: Item = new Item(Description.RING_OF_CLEANSENING_CODE, 5, 5);
        const backstageItem: Item = new Item(Description.BACKSTAGE_PASSES_FOR_HAXX, 5, 5);
        //when
        //then
        expect(isBackstagePass(notBackstageItem)).toBe(false)
        expect(isBackstagePass(backstageItem)).toBe(true)
    });
    it('isGoodWine', () => {
        //given
        const notGoodWineItem: Item = new Item(Description.RING_OF_CLEANSENING_CODE, 5, 5);
        const goodWineItem: Item = new Item(Description.GOOD_WINE, 5, 5);
        //when
        //then
        expect(isGoodWine(notGoodWineItem)).toBe(false)
        expect(isGoodWine(goodWineItem)).toBe(true)
    });
    it('isBDawgKeychain', () => {
        //given
        const notBDawgItem: Item = new Item(Description.RING_OF_CLEANSENING_CODE, 5, 5);
        const bDawgItem: Item = new Item(Description.B_DAWG_KEYCHAIN, 5, 5);
        //when
        //then
        expect(isBDawgKeychain(notBDawgItem)).toBe(false)
        expect(isBDawgKeychain(bDawgItem)).toBe(true)
    });
    it('isOverMinQuality', () => {
        expect(isOverMinQuality(MIN_QUALITY-1)).toBe(false)
        expect(isOverMinQuality(MIN_QUALITY+1)).toBe(true)
    });
    it('isUnderMaxQuality', () => {
        expect(isUnderMaxQuality(MAX_QUALITY+1)).toBe(false)
        expect(isUnderMaxQuality(MAX_QUALITY-1)).toBe(true)
    });
    it('updateForBDawgKeychain', () => {
        //given
        const item: Item = new Item(Description.B_DAWG_KEYCHAIN, 5, 5);
        //when
        updateForBDawgKeychain(item);
        //then
        expect(item.sellIn).toEqual(0)
        expect(item.quality).toEqual(LEGENDARY_QUALITY)
    });
});
