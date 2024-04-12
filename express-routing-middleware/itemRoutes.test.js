process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require('./app');
const items = require('./fakeDb');

let item1 = {name: "pizza", price: 4.50};
let item2 = {name: "bananas", price: 1.25};

beforeEach(function() {
    items.push(item1);
});

afterEach(function(){
    items.length = 0;
});

describe(" GET / items", () => {
    test("view all items in shopping list", async () => {
        const res = await request(app).get("/items");

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([item1]);
    })
    
    describe(" GET / items / itemName", () => {
        test("view a single item", async () => {
            const res = await request(app)
            .get(`/items/${item1.name}`)

            expect(res.statusCode).toBe(200);
            expect(res.body).toEqual(item1)
        })
        test("trying to find item not in the list", async () => {
            const res = await request(app)
            .get("/items/pizzas")

            expect(res.statusCode).toBe(404);
            expect(res.body).toEqual({error: "Item not found"});
        })
    })
})

describe(" POST / items", () => {
    test("add new item to shopping list", async () => {
        const res = await request(app)
        .post("/items")
        .send(item2);

        expect(res.statusCode).toBe(201);
        expect(items.length).toBe(2);
        expect(res.body).toEqual({added: item2})
    })
})

describe(" PATCH / item", () => {
    test("update existing item in list", async() => {
        const res = await request(app)
        .patch(`/items/${item1.name}`)
        .send({name: "pizza", price: 8.50});

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({updated: item1})
    })
})

describe(" DELETE / item", () => {
    test(" delete item from list", async() => {
        const res = await request(app)
        .delete(`/items/${item1.name}`)
        
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({message: "Deleted"})
        expect(items.length).toBe(0)
    })
})

