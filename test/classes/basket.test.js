import { assert, expect } from "chai";

// SUT
import { Basket } from "../../source/classes/basket.js";
//

const items = [
    {
        price: 1.23,
        bulkPrice: 1.15,
        id: "FR1",
        name: "Fruit Tea"
    },
    {
        price: 7.89,
        bulkPrice: 4.50,
        id: "SR1",
        name: "Strawberries"
    },
    {
        price: 10.23,
        bulkPrice: 9.12,
        id: "CF1",
        name: "Coffee"
    }
];

const pricingRules = {
    FR1: {
        buyOneGetOneFree: true,
        buyInBulk: false
    },
    SR1: {
        buyOneGetOneFree: false,
        buyInBulk: true
    }
};

describe("Basket", () => {
    describe("Without Price Rules", () => {
        it("should create a basket instance", () => {
            const basket = new Basket();
            assert(basket instanceof Basket);
        });

        it("should have empty price rules when not passed", () => {
            const basket = new Basket();
            expect(basket.priceRules).to.be.an("object").that.is.empty;
        });

        it("should return the total value of £0.00 for a new basket instance", () => {
            const basket = new Basket();
            assert(basket.total() === 0.00);
        });

        it("should add a new item to the basket", () => {
            const basket = new Basket();

            basket.add(items[0]);

            assert(basket.items.length === 1);
        });

        it("should add multpiple new items to the basket", () => {
            const basket = new Basket();

            items.forEach(item => basket.add(item));

            assert(basket.items.length === 3);
        });

        it("should add increase the qualtity if item exists in basket", () => {
            const basket = new Basket();

            basket.add(items[0]);
            basket.add(items[0]);

            assert(basket.items.length === 1);
            assert(basket.items[0].quantity === 2);
        });

        it("should return the total for multpiple items", () => {
            const basket = new Basket();

            basket.add(items[1]);
            basket.add(items[1]);

            let expectedTotal = items[1].price * 2;

            assert(basket.total() === expectedTotal);
        });

        it("should have price rules when created", () => {
            const basket = new Basket(pricingRules);
            expect(basket.priceRules).to.be.an("object").that.is.not.empty;
            assert(
                Object.keys(basket.priceRules).length ===
                    Object.keys(pricingRules).length
            );
        });
    });

    describe("With BOGOF Price Rule", () => {
        it("should give BOGOF for two of the same item", () => {
            const basket = new Basket(pricingRules);
            basket.add(items[0]);
            basket.add(items[0]);
            assert(basket.total() === 1.23);
        });

        it("should give BOGOF for two of the same item and one at normal price", () => {
            const basket = new Basket(pricingRules);
            basket.add(items[0]);
            basket.add(items[0]);
            basket.add(items[0]);
            assert(basket.total() === 2.46);
        });

        it("should not give BOGOF for a product without the deal", () => {
            const basket = new Basket(pricingRules);
            basket.add(items[2]);
            basket.add(items[2]);
            assert(basket.total() === 20.46);
        });
    });

    describe("With Bulk Buy Price Rule", () => {
        it("should reduce the price when there are 3 items", () => {
            const basket = new Basket(pricingRules);
            basket.add(items[1]);
            basket.add(items[1]);
            basket.add(items[1]);
            assert(basket.total() === 13.50);
        });

        it("should reduce the price when there are more than 3 items", () => {
            const basket = new Basket(pricingRules);
            basket.add(items[1]);
            basket.add(items[1]);
            basket.add(items[1]);
            basket.add(items[1]);
            basket.add(items[1]);
            assert(basket.total() === 22.50);
        });

        it("should not reduce the price when there are less than 3 items", () => {
            const basket = new Basket(pricingRules);
            basket.add(items[1]);
            basket.add(items[1]);
            assert(basket.total() === 15.78);
        });

        it("should not affect a product without the deal", () => {
            const basket = new Basket(pricingRules);
            basket.add(items[2]);
            basket.add(items[2]);
            basket.add(items[2]);
            assert(basket.total() === 30.69);
        });
    });
});
