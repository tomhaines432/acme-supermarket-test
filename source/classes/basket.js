export class Basket {

    constructor(priceRules = {}){
        this.items = []
        this.priceRules = priceRules
    }

    total() {
        let total = 0.0
        this.items.forEach((item) => total += item.price)
        return total
    }

    add(item){
        this.items.push(item)
    }
}