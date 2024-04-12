const items = require("./fakeDb")

class Item{
    constructor(name, price){
        this.name = name;
        this.price = price;
    }

    static findAllItems(){
        return items;
    }

    static findOneItem(name){
        const item = items.find(i => i.name === name);
        if(item === undefined){
            throw { message: "Item not found", status: 404 }
          };
       return item;
    }

    static updateItem(name, data){
        const updateItem = items.find(i => i.name === name);
        updateItem.name = data.name;
        updateItem.price = data.price;
        return updateItem;
    }

    static deleteItem(name){
        const updateItem = items.findIndex(i => i.name === name);
        items.splice(updateItem, 1);
    }
}

module.exports = Item;