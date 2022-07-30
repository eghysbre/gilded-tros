import {
    decreaseItemQuality,
    increaseItemQuality,
    isOverMinQuality,
    isUnderMaxQuality,
    LEGENDARY_QUALITY,
    MAX_QUALITY,
    MIN_QUALITY, updateForBackstagePass,
    updateForBDawgKeychain,
    updateForGoodWine, updateForStandardFlow
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
    describe('increaseItemQuality', () => {
        it('should increase quality by increase value', () => {
            //given
            const item: Item = new Item(Description.RING_OF_CLEANSENING_CODE, 5, 5);
            //when
            increaseItemQuality(item, 3);
            //then
            expect(item.quality).toEqual(8)
        });
        it('should set quality to maximum when the increase would go beyond', () => {
            //given
            const item: Item = new Item(Description.RING_OF_CLEANSENING_CODE, 5, 48);
            //when
            increaseItemQuality(item, 3);
            //then
            expect(item.quality).toEqual(MAX_QUALITY)
        });
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
            expect(item.quality).toEqual(6)
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
    describe('updateForBackstagePass', () => {
        it.each([
            //given
            {item: new Item(Description.BACKSTAGE_PASSES_FOR_RE_FACTOR, 11, 10), quality: 10},
            {item: new Item(Description.BACKSTAGE_PASSES_FOR_HAXX, 11, 10), quality: 10},
            {item: new Item(Description.BACKSTAGE_PASSES_FOR_RE_FACTOR, 10, 10), quality: 12},
            {item: new Item(Description.BACKSTAGE_PASSES_FOR_HAXX, 10, 10), quality: 12},
            {item: new Item(Description.BACKSTAGE_PASSES_FOR_RE_FACTOR, 5, 10), quality: 13},
            {item: new Item(Description.BACKSTAGE_PASSES_FOR_HAXX, 5, 10), quality: 13},
            {item: new Item(Description.BACKSTAGE_PASSES_FOR_RE_FACTOR, 5, 50), quality: 50},
            {item: new Item(Description.BACKSTAGE_PASSES_FOR_HAXX, 5, 48), quality: 50},
            {item: new Item(Description.BACKSTAGE_PASSES_FOR_RE_FACTOR, 0, 10), quality: 0},
            {item: new Item(Description.BACKSTAGE_PASSES_FOR_HAXX, 0, 10), quality: 0},
        ])(
            'should set quality to $quality for $item',
            ({item, quality}) => {

                //when
                updateForBackstagePass(item);

                //then
                expect(item.name).toEqual(item.name);
                expect(item.quality).toEqual(quality);
            },
        );
    });
    describe('updateForStandardFlow', () => {
        it('should decrease quality and sellIn by 1', () => {
            //given
            const item: Item = new Item(Description.RING_OF_CLEANSENING_CODE, 0, 10);
            //when
            updateForStandardFlow(item);
            //then
            expect(item.sellIn).toEqual(-1)
            expect(item.quality).toEqual(9)
        });
        it('should decrease quality twice is sellIn is below 0', () => {
            //given
            const item: Item = new Item(Description.RING_OF_CLEANSENING_CODE, -1, 10);
            //when
            updateForStandardFlow(item);
            //then
            expect(item.sellIn).toEqual(-2)
            expect(item.quality).toEqual(8)
        });
        it('should not decrease quality if quality already 0', () => {
            //given
            const item: Item = new Item(Description.RING_OF_CLEANSENING_CODE, 0, 0);
            //when
            updateForStandardFlow(item);
            //then
            expect(item.sellIn).toEqual(-1)
            expect(item.quality).toEqual(0)
        });
    });
});
