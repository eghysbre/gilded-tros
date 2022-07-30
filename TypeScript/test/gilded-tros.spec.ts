import {Item} from '../src/item';
import {Description} from '../src/description.enum';
import {LEGENDARY_QUALITY, MAX_QUALITY} from '../src/gilded-tros.functions';
import {GildedTros} from '../src/gilded-tros';

describe('GildedTrosTest', () => {
    it('should lower quality and sellIn by 1 at the end of each day', () => {
        //given
        const items: Item[] = [new Item(Description.RING_OF_CLEANSENING_CODE, 2, 2)];
        const app: GildedTros = new GildedTros(items);

        //when
        const result: Item[] = app.updateQuality();

        //then
        expect(result[0].name).toEqual(Description.RING_OF_CLEANSENING_CODE);
        expect(result[0].sellIn).toEqual(1);
        expect(result[0].quality).toEqual(1);
    });
    it('should degrade quality twice as fast when sell date passed', () => {
        //given
        const items: Item[] = [new Item(Description.RING_OF_CLEANSENING_CODE, -1, 20)];
        const app: GildedTros = new GildedTros(items);

        //when
        const result: Item[] = app.updateQuality();

        //then
        expect(result[0].name).toEqual(Description.RING_OF_CLEANSENING_CODE);
        expect(result[0].sellIn).toEqual(-2);
        expect(result[0].quality).toEqual(18);
    });
    it('should not make the quality of an item negative', () => {
        //given
        const items: Item[] = [new Item(Description.RING_OF_CLEANSENING_CODE, 0, 0)];
        const app: GildedTros = new GildedTros(items);

        //when
        const result: Item[] = app.updateQuality();

        //then
        expect(result[0].name).toEqual(Description.RING_OF_CLEANSENING_CODE);
        expect(result[0].sellIn).toEqual(-1);
        expect(result[0].quality).toEqual(0);
    });
    it('should increase the quality for Good Wine when sellIn decreases', () => {
        //given
        const items: Item[] = [new Item(Description.GOOD_WINE, 0, 10)];
        const app: GildedTros = new GildedTros(items);

        //when
        const result: Item[] = app.updateQuality();

        //then
        expect(result[0].name).toEqual(Description.GOOD_WINE);
        expect(result[0].sellIn).toEqual(-1);
        expect(result[0].quality).toEqual(11);
    });
    it('should never increase the quality of an item past MAX_QUALITY', () => {
        //given
        const items: Item[] = [new Item(Description.GOOD_WINE, 0, MAX_QUALITY)];
        const app: GildedTros = new GildedTros(items);

        //when
        const result: Item[] = app.updateQuality();

        //then
        expect(result[0].name).toEqual(Description.GOOD_WINE);
        expect(result[0].sellIn).toEqual(-1);
        expect(result[0].quality).toEqual(MAX_QUALITY);
    });
    it('should never decrease B-DAWG-KEYCHAIN and never be sold and hold the legendary quality which is above max quality', () => {
        //given
        const items: Item[] = [new Item(Description.B_DAWG_KEYCHAIN, 10, 10)];
        const app: GildedTros = new GildedTros(items);

        //when
        const result: Item[] = app.updateQuality();

        //then
        expect(result[0].name).toEqual(Description.B_DAWG_KEYCHAIN);
        expect(result[0].sellIn).toEqual(0);
        expect(result[0].quality).toEqual(LEGENDARY_QUALITY);
    });

    describe('Backstage passes', () => {
        it('should not decrease quality when sellIn >10 for backstage passes', () => {
            //given
            const items: Item[] = [
                new Item(Description.BACKSTAGE_PASSES_FOR_HAXX, 16, 30),
                new Item(Description.BACKSTAGE_PASSES_FOR_RE_FACTOR, 16, 30),
            ];
            const app: GildedTros = new GildedTros(items);

            //when
            const result: Item[] = app.updateQuality();

            //then
            expect(result[0].name).toEqual(Description.BACKSTAGE_PASSES_FOR_HAXX);
            expect(result[0].sellIn).toEqual(15);
            expect(result[0].quality).toEqual(30);
            expect(result[1].name).toEqual(Description.BACKSTAGE_PASSES_FOR_RE_FACTOR);
            expect(result[1].sellIn).toEqual(15);
            expect(result[1].quality).toEqual(30);
        });
        it('should increase quality by 2 when sellIn <=10 for backstage passes', () => {
            //given
            const items: Item[] = [
                new Item(Description.BACKSTAGE_PASSES_FOR_HAXX, 10, 30),
                new Item(Description.BACKSTAGE_PASSES_FOR_RE_FACTOR, 10, 30),
            ];
            const app: GildedTros = new GildedTros(items);

            //when
            const result: Item[] = app.updateQuality();

            //then
            expect(result[0].name).toEqual(Description.BACKSTAGE_PASSES_FOR_HAXX);
            expect(result[0].sellIn).toEqual(9);
            expect(result[0].quality).toEqual(32);
            expect(result[1].name).toEqual(Description.BACKSTAGE_PASSES_FOR_RE_FACTOR);
            expect(result[1].sellIn).toEqual(9);
            expect(result[1].quality).toEqual(32);
        });
        it('should increase quality by 3 when sellIn <=5 for backstage passes', () => {
            //given
            const items: Item[] = [
                new Item(Description.BACKSTAGE_PASSES_FOR_HAXX, 5, 30),
                new Item(Description.BACKSTAGE_PASSES_FOR_RE_FACTOR, 5, 30),
            ];
            const app: GildedTros = new GildedTros(items);

            //when
            const result: Item[] = app.updateQuality();

            //then
            expect(result[0].name).toEqual(Description.BACKSTAGE_PASSES_FOR_HAXX);
            expect(result[0].sellIn).toEqual(4);
            expect(result[0].quality).toEqual(33);
            expect(result[1].name).toEqual(Description.BACKSTAGE_PASSES_FOR_RE_FACTOR);
            expect(result[1].sellIn).toEqual(4);
            expect(result[1].quality).toEqual(33);
        });
        it('should decrease quality to 0 when sellIn <=-1 for backstage passes', () => {
            //given
            const items: Item[] = [
                new Item(Description.BACKSTAGE_PASSES_FOR_HAXX, -1, 30),
                new Item(Description.BACKSTAGE_PASSES_FOR_RE_FACTOR, -1, 30),
            ];
            const app: GildedTros = new GildedTros(items);

            //when
            const result: Item[] = app.updateQuality();

            //then
            expect(result[0].name).toEqual(Description.BACKSTAGE_PASSES_FOR_HAXX);
            expect(result[0].sellIn).toEqual(-2);
            expect(result[0].quality).toEqual(0);
            expect(result[1].name).toEqual(Description.BACKSTAGE_PASSES_FOR_RE_FACTOR);
            expect(result[1].sellIn).toEqual(-2);
            expect(result[1].quality).toEqual(0);
        });
    });
    describe('Smelly items', () => {
        it.each([
            //given
            {item: new Item(Description.DUPLICATE_CODE, 10, 10), expectedSellIn: 9, expectedQuality: 8},
            {item: new Item(Description.LONG_METHODS, 10, 10), expectedSellIn: 9, expectedQuality: 8},
            {item: new Item(Description.UGLY_VARIABLE_NAMES, 10, 10), expectedSellIn: 9, expectedQuality: 8},
            {item: new Item(Description.DUPLICATE_CODE, -1, 10), expectedSellIn: -2, expectedQuality: 6},
            {item: new Item(Description.LONG_METHODS, -1, 10), expectedSellIn: -2, expectedQuality: 6},
            {item: new Item(Description.UGLY_VARIABLE_NAMES, -1, 10), expectedSellIn: -2, expectedQuality: 6},
        ])(
            'should decrease quality twice as fast for $item',
            ({item, expectedSellIn, expectedQuality}) => {
                const app: GildedTros = new GildedTros([item]);

                //when
                const result: Item[] = app.updateQuality();

                //then
                expect(result[0].name).toEqual(item.name);
                expect(result[0].sellIn).toEqual(expectedSellIn);
                expect(result[0].quality).toEqual(expectedQuality);
            },
        );
    });
});
