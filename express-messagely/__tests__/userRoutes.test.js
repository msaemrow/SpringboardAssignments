process.env.NODE_ENV = "test";

const request = require("supertest");
const jwt = require("jsonwebtoken");

const app = require("../app");
const db = require("../db");
const User = require("../models/user");
const { SECRET_KEY } = require("../config");
const ExpressError = require("../expressError");

let username;
let testUserToken;


describe("User Routes Test", function () {

    beforeEach(async function () {
      await db.query("DELETE FROM messages");
      await db.query("DELETE FROM users");
  
      u1 = await User.register({
        username: "test1",
        password: "password",
        first_name: "Test1",
        last_name: "Testy1",
        phone: "+14155550000",
      });
      testUserToken = jwt.sign({username: u1.username}, SECRET_KEY);
      username = "test1"
    });

    describe("GET /users", () => {
        test("Return list of all users", async () =>{
            let response = await request(app).get("/users").send({_token: testUserToken})
            expect(response.status).toBe(200);
            expect(response.body.users.length).toBe(1);
        })
        test("Return 401 if no valid token", async () =>{
            let response = await request(app)
            .get("/users")
            .send({_token: "BadToken"})
            expect(response.status).toBe(401);
        })
    })

    describe("GET /users/username", () => {
        test("Return details of user", async () =>{
            let response = await request(app)
            .get(`/users/${username}`)
            .send({_token: testUserToken});
            console.log(response.status);
            expect(response.body.user.username).toBe(username);
        })
        test("Return 401 if incorrect token", async () =>{
            let response = await request(app)
            .get(`/users/${username}`)
            .send({_token: "bad token"});
            expect(response.status).toBe(401);
        })
    test("Return 401 if different username than route", async () =>{
        let response = await request(app)
        .get(`/users/test2`)
        .send({_token: testUserToken});
        expect(response.status).toBe(401);
        });
    });

    describe("GET /users/username/to", () => {
        test("Return message sent to a user", async () =>{
            let response = await request(app)
            .get(`/users/${username}/to`)
            .send({_token: testUserToken});
            console.log(response.status);
            expect(response.status).toBe(200);
        })
        test("Return 401 if incorrect token", async () =>{
            let response = await request(app)
            .get(`/users/${username}/to`)
            .send({_token: "bad token"});
            expect(response.status).toBe(401);
        })
    test("Return 401 if different username than route", async () =>{
        let response = await request(app)
        .get(`/users/test2/to`)
        .send({_token: testUserToken});
        expect(response.status).toBe(401);
        });
    });

    describe("GET /users/username/from", () => {
        test("Return messages sent from a user", async () =>{
            let response = await request(app)
            .get(`/users/${username}/from`)
            .send({_token: testUserToken});
            console.log(response.status);
            expect(response.status).toBe(200);
        })
        test("Return 401 if incorrect token", async () =>{
            let response = await request(app)
            .get(`/users/${username}/from`)
            .send({_token: "bad token"});
            expect(response.status).toBe(401);
        })
    test("Return 401 if different username than route", async () =>{
        let response = await request(app)
        .get(`/users/test2/from`)
        .send({_token: testUserToken});
        expect(response.status).toBe(401);
        });
    });

});

afterAll(async function () {
    await db.end();
  });
