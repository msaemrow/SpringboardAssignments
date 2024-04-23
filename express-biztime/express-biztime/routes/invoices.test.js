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
    let companyRes = company.rows[0]
    console.log(testInvoice);
    console.log(companyRes);
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
})

describe(" GET /company/:code", function() {
    test("Gets a single invoice", async () => {
        const res = await request(app).get('/invoices/apple');
        expect(res.statusCode).toBe(200);
        testInvoice.add_date = testInvoice.add_date.toISOString();
        expect(res.body).toEqual({invoice: [testInvoice]});
    })
})

