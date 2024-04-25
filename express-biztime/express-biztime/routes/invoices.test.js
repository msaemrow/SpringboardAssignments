process.env.NODE_ENV = "test";

const request = require('supertest');
const app = require('../app');
const db = require('../db');
const ExpressError = require('../expressError')


let testInvoice;
beforeEach(async function() {
    const company = await db.query('INSERT INTO companies (code, name, description) VALUES ($1, $2, $3) RETURNING *', ['apple', 'Apple Computer', 'Maker of OSX.']);
    const result = await db.query('INSERT INTO invoices (comp_code, amt, paid, paid_date) VALUES ($1, $2, $3, $4) RETURNING *' , ['apple', 100, false, null]);
    testInvoice = result.rows[0];
});

afterEach(async function() {
    await db.query("DELETE FROM invoices");
    await db.query('DELETE FROM companies');

})

afterAll(async function() {
    await db.end();
})

describe(" GET /invoices", function() {
    test("Gets all invoices", async () => {
        const res = await request(app).get('/invoices');
        expect(res.statusCode).toBe(200);
        testInvoice.add_date = testInvoice.add_date.toISOString();
        expect(res.body).toEqual({invoices: [testInvoice]});
    })
})

describe(" GET /invoices/:id", function() {
    test("Gets a single invoice", async () => {
        const res = await request(app).get(`/invoices/${testInvoice.id}`);
        expect(res.statusCode).toBe(200);
        testInvoice.add_date = testInvoice.add_date.toISOString();
        expect(res.body).toEqual({invoice: testInvoice});
    })
    test("Respond with 404 error if invalid ID is entered", async () => {
        const res = await request(app).get(`/invoices/0`);
        expect(res.statusCode).toBe(404);
    })
})

describe(" POST /invoices", function() {
    test("Creates a new invoice", async () => {
        const res = await request(app).post('/invoices').send({comp_code:'apple', amt: 10000});
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({
            invoice: {id: expect.any(Number),
                        comp_code: 'apple',
                        amt: 10000,
                        paid: false,
                        add_date: expect.any(String),
                        paid_date: null
            }});
    })
})

describe("PATCH /invoices/:id", function() {
    test("Update an existing invoice", async () => {
        const res = await request(app).patch(`/invoices/${testInvoice.id}`).send({amt: 2000});
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
            invoice: {id: expect.any(Number),
                comp_code: 'apple',
                amt: 2000,
                paid: false,
                add_date: expect.any(String),
                paid_date: null
            }});
    });
    test("Respond with 404 error if invalid ID is entered", async () => {
        const res = await request(app).patch(`/invoices/0`).send({amt: 2000});
        expect(res.statusCode).toBe(404);
    });
})

describe("DELETE /invoices/:id", function() {
    test("Delete and invoice by entering the id", async () => {
        const res = await request(app).delete(`/invoices/${testInvoice.id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({msg: "DELETED INVOICE"})
    })
})
