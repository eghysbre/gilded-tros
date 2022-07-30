import {
    decreaseItemQuality,
    increaseItemQuality,
    increaseItemQualityByOne,
    isBackstagePass,
    isBDawgKeychain,
    isGoodWine,
    isOverMinQuality,
    isUnderMaxQuality,
    LEGENDARY_QUALITY,
    MAX_QUALITY,
    MIN_QUALITY,
    updateForBDawgKeychain,
    updateForGoodWine
} from '../src/gilded-tros.functions';
import {Item} from '../src/item';
import {Description} from '../src/description.enum';

describe('GildedTrosFunctionsTest', () => {
    it('should decrease quality by 1', () => {
        //given
        const item: Item = new Item(Description.RING_OF_CLEANSENING_CODE, 5, 5);
        //when
        decreaseItemQuality(item);
        //then
        expect(item.quality).toEqual(4)
    });
    it('should increase quality by 1', () => {
        //given
        const item: Item = new Item(Description.RING_OF_CLEANSENING_CODE, 5, 5);
        //when
        increaseItemQualityByOne(item);
        //then
        expect(item.quality).toEqual(6)
    });
    it('should increase quality by increase value', () => {
        //given
        const item: Item = new Item(Description.RING_OF_CLEANSENING_CODE, 5, 5);
        //when
        increaseItemQuality(item, 3);
        //then
        expect(item.quality).toEqual(8)
    });
    it('should be true for backstage, false for not backstage', () => {
        //given
        const notBackstageItem: Item = new Item(Description.RING_OF_CLEANSENING_CODE, 5, 5);
        const backstageItem: Item = new Item(Description.BACKSTAGE_PASSES_FOR_HAXX, 5, 5);
        //when
        //then
        expect(isBackstagePass(notBackstageItem)).toBe(false)
        expect(isBackstagePass(backstageItem)).toBe(true)
    });
    it('should be true for good wine false for everything else', () => {
        //given
        const notGoodWineItem: Item = new Item(Description.RING_OF_CLEANSENING_CODE, 5, 5);
        const goodWineItem: Item = new Item(Description.GOOD_WINE, 5, 5);
        //when
        //then
        expect(isGoodWine(notGoodWineItem)).toBe(false)
        expect(isGoodWine(goodWineItem)).toBe(true)
    });
    it('should be true for B-Dawg Keychain, false for everything else', () => {
        //given
        const notBDawgItem: Item = new Item(Description.RING_OF_CLEANSENING_CODE, 5, 5);
        const bDawgItem: Item = new Item(Description.B_DAWG_KEYCHAIN, 5, 5);
        //when
        //then
        expect(isBDawgKeychain(notBDawgItem)).toBe(false)
        expect(isBDawgKeychain(bDawgItem)).toBe(true)
    });
    it('should be true if quality over minimum, false if under', () => {
        expect(isOverMinQuality(MIN_QUALITY-1)).toBe(false)
        expect(isOverMinQuality(MIN_QUALITY+1)).toBe(true)
    });
    it('should be true if quality under maximum, false if over', () => {
        expect(isUnderMaxQuality(MAX_QUALITY+1)).toBe(false)
        expect(isUnderMaxQuality(MAX_QUALITY-1)).toBe(true)
    });
    it('should set B-Dawg keychain sellIn to 0 and quality to legendary', () => {
        //given
        const item: Item = new Item(Description.B_DAWG_KEYCHAIN, 5, 5);
        //when
        updateForBDawgKeychain(item);
        //then
        expect(item.sellIn).toEqual(0)
        expect(item.quality).toEqual(LEGENDARY_QUALITY)
    });
    describe('updateForGoodWine', () => {
        it('should increase quality by 2 for every sellIn decrease', () => {
            //given
            const item: Item = new Item(Description.GOOD_WINE, 5, 5);
            //when
            updateForGoodWine(item);
            //then
            expect(item.sellIn).toEqual(4)
            expect(item.quality).toEqual(7)
        });
        it('should not increase quality when maximum', () => {
            //given
            const item: Item = new Item(Description.GOOD_WINE, 5, MAX_QUALITY);
            //when
            updateForGoodWine(item);
            //then
            expect(item.sellIn).toEqual(4)
            expect(item.quality).toEqual(MAX_QUALITY)
        });
    });
});
