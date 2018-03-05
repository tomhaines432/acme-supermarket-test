import { assert, expect } from 'chai';

//SUT
import { Basket } from '../../source/classes/basket.js';
// 

const items = [
    {
        price: 1.23,
        id: "FR1",
        name: "Fruit Tea"
    },
    {
        price: 1.23,
        id: "FR1",
        name: "Fruit Tea"        
    },
    {
        price: 7.89,
        id: "SR1",
        name: "Strawberries"        
    },
    {
        price: 10.23,
        id: "CF1",
        name: "Coffee"
    }
]

const pricingRules = {
    FR1:{
        buyOneGetOneFree: true,
        buyInBulk: false
    },
    SR1:{
        buyOneGetOneFree: false,
        buyInBulk: true
    }
};

describe('Basket', () => {
    describe('Without Price Rules', () => {
        it('should create a basket instance', () => {
            const basket = new Basket()
            assert(basket instanceof Basket)
        });

        it('should have empty price rules when not passed', () => {
            const basket = new Basket()
            expect(basket.priceRules).to.be.an('object').that.is.empty
        });

        it('should return the total value of £0.00 for a new basket instance', () => {
            const basket = new Basket()
            assert(basket.total()===0.0)
        });

        it('should add a new item to the basket', () => {
            const basket = new Basket()

            const newItem = {
                price: 1.23,
                id: "productId1"
            }

            basket.add(newItem)

            assert(basket.items.length===1)
        });

        it('should add multpiple new items to the basket', () => {
            const basket = new Basket()

            items.forEach((item) => basket.add(item)) 

            assert(basket.items.length===4)
        });

        it('should return the total for multpiple items', () => {
            const basket = new Basket()


            let expectedTotal = 0.00
            items.forEach((item) => {
                basket.add(item)
                expectedTotal += item.price
            }) 
            assert(basket.total()===expectedTotal)
        });
    });

    describe('With BOGOF Price Rule', () => {
        it('should have price rules when created', () => {
            const basket = new Basket(pricingRules)
            expect(basket.priceRules).to.be.an('object').that.is.not.empty
            assert(Object.keys(basket.priceRules).length===Object.keys(pricingRules).length)
        });

        it('should have price rules when created', () => {
            const basket = new Basket(pricingRules)
            expect(basket.priceRules).to.be.an('object').that.is.not.empty
            assert(Object.keys(basket.priceRules).length===Object.keys(pricingRules).length)
        });
    });

});