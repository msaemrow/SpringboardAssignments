process.env.NODE_ENV = "test";

const request = require('supertest');
const app = require('../app');
const db = require('../db');

let testUser;
beforeEach(async function() {
    let result = await db.query(`INSERT INTO users (name,type) VALUES ('Peanut', 'admin') RETURNING *`);
    testUser = result.rows[0];
});

afterEach(async function() {
    await db.query("DELETE FROM users");
})

afterAll(async function() {
    await db.end();
})


describe(" GET /users/all", function() {
    test("Gets all users", async () => {
        const res = await request(app).get('/users/all');
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({users: [testUser]})
    })
})

describe(" GET /users/:id", function() {
    test("Gets a single user", async () => {
        const res = await request(app).get(`/users/${testUser.id}`);
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({users: testUser})
    })
    test("Responds with 404 for invalid ID", async () => {
        const res = await request(app).get(`/users/0`);
        expect(res.statusCode).toBe(404)
    })
})

describe(" POST /users", function() {
    test("Add new user", async () => {
        const res = await request(app).post('/users').send({name:'BillyBob', type: 'staff'});
        expect(res.statusCode).toBe(201)
        expect(res.body).toEqual({
            users: {id: expect.any(Number) , name: 'BillyBob', type: 'staff'}
        })
    })
})

describe(" PATCH /users/:id", function() {
    test("Update user", async () => {
        const res = await request(app).patch(`/users/${testUser.id}`).send({name:'PatchedUser', type: 'staff'});
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({
            user: {id: testUser.id, name: 'PatchedUser', type: 'staff'}
        })
    })
    test("Throw error when trying to update user id that doesn't exist", async () => {
        const res = await request(app).patch(`/users/0`).send({name:'PatchedUser', type: 'staff'});
        expect(res.statusCode).toBe(404)
    })
})

describe(" DELETE /users/:id", function() {
    test("Delete user", async () => {
        const res = await request(app).delete(`/users/${testUser.id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({msg:"DELETED USER"})
    })
})