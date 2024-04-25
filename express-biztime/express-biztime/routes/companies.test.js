process.env.NODE_ENV = "test";

const request = require('supertest');
const app = require('../app');
const db = require('../db');

let testCompany;
beforeEach(async function() {
    const company = await db.query('INSERT INTO companies (code, name, description) VALUES ($1, $2, $3) RETURNING *', ['apple', 'Apple Computer', 'Maker of OSX.']);
    const invoice = await db.query('INSERT INTO invoices (comp_code, amt, paid, paid_date) VALUES ($1, $2, $3, $4) RETURNING *' , ['apple', 100, false, null]);
    testCompany = company.rows[0];
    console.log(testCompany)
});

afterEach(async function() {
    await db.query("DELETE FROM invoices");
    await db.query('DELETE FROM companies');

})

afterAll(async function() {
    await db.end();
})

describe("GET /companies", function(){
    test("Returns all companies in database", async () =>  {
        const res = await request(app).get('/companies')
        expect(res.statusCode).toBe(200);
        expect(res.body).toStrictEqual({companies: [testCompany]});
    })
})

describe("GET /companies/:code", function(){
    test("Returns details about a single company", async () => {
        const res = await request(app).get(`/companies/${testCompany.code}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("company")
        expect(res.body.company).toHaveProperty("invoices")
        expect(res.body.company).toHaveProperty("code", 'apple')
    })
    test("Respond with 404 error if invalid ID is entered", async () => {
        const res = await request(app).get(`/compaines/microsoft`);
        expect(res.statusCode).toBe(404);
    })
})

describe("POST /companies", function(){
    test("Create a new company", async () => {
        const res = await request(app).post('/companies').send({name:'TestCompany', description:"This is a test company"});
        expect(res.statusCode).toBe(201);
        expect(res.body).toStrictEqual({company: {
            'code': 'testco',
            'name': "TestCompany",
            'description': "This is a test company"
        }})
    })
})

describe("PATCH /companies/:code", function(){
    test("Update an existing company", async () => {
        const res = await request(app).patch(`/companies/${testCompany.code}`).send({name: "TestCompany2", description: "This is NOT a test company"});
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
            company: {code: 'apple',
                name: "TestCompany2",
                description: "This is NOT a test company"
            }});
    });
    test("Respond with 404 error if invalid ID is entered", async () => {
        const res = await request(app).patch(`/companies/microsoft`).send({name: "microsoft", description: "test description"});
        expect(res.statusCode).toBe(404);
    });
})

describe("DELETE /companies/:code", function() {
    test("Delete a company by entering the company code", async () => {
        const res = await request(app).delete(`/companies/${testCompany.code}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({msg: "DELETED COMPANY"})
    })
})