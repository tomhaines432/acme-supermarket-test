export class Basket {
    constructor(priceRules = {}) {
        this.items = [];
        this.priceRules = priceRules;
    }

    total() {
        let total = this.items.reduce((runningTotal, item) => {
            return runningTotal + this.calculateOffers(this.priceRules, item);
        }, 0.0);

        return Number(total.toFixed(2));
    }

    add(item) {
        if (this.items.includes(item)) {
            let index = this.items.indexOf(item);
            this.items[index].quantity++;
        } else {
            item.quantity = 1;
            this.items.push(item);
        }
    }

    calculateOffers(priceRules, item) {
        // TODO: Logic required to determine which offer takes precedence
        let price = item.price;
        const quantity = item.quantity;
        const priceRule = priceRules[item.id] || {};

        if (priceRule.buyOneGetOneFree) {
            price = this.calculateBogof(item);
            item.quantity = quantity;
        } else if (priceRule.buyInBulk) {
            price = this.calculateBulkPrice(item);
        } else {
            price = price * item.quantity;
        }
        return price;
    }

    calculateBogof(item) {
        let total = 0;
        while (item.quantity > 0) {
            if (item.quantity % 2 === 0) {
                total += item.price;
                item.quantity = item.quantity - 2;
            } else {
                total += item.price;
                item.quantity--;
            }
        }
        console.log("total:" + total);
        return total;
    }

    calculateBulkPrice(item) {
        let price = 0.0;
        if (item.quantity >= 3) {
            price = item.bulkPrice * item.quantity;
        } else {
            price = item.price * item.quantity;
        }
        return price;
    }
}
