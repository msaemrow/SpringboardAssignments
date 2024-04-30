process.env.NODE_ENV = "test";

const request = require("supertest");
const jwt = require("jsonwebtoken");

const app = require("../app");
const db = require("../db");
const User = require("../models/user");
const { SECRET_KEY } = require("../config");
const Message = require("../models/message");

let user;
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
      u2 = await User.register({
        username: "test2",
        password: "password",
        first_name: "Test2",
        last_name: "Testy2",
        phone: "+14155550001",
      });
      m1 = await Message.create({
        from_username: "test1",
        to_username: "test2",
        body:"let's play basketball"
      }); 
      testUserToken = jwt.sign({username: u1.username}, SECRET_KEY);
      testUser2Token = jwt.sign({username: u2.username}, SECRET_KEY);
      username = "test1";
      username2 = "test2";
    });

    describe("GET /messages/:id", () => {
        test("Return message", async () =>{
            let response = await request(app).get(`/messages/${m1.id}`).send({_token: testUserToken})
            expect(response.status).toBe(200);
            expect(response.body.body).toEqual(m1.body);
            expect(response.body.from_user.username).toEqual(u1.username);
            expect(response.body.to_user.username).toEqual(u2.username);
        })
        test("Return 401 if no valid token", async () =>{
            let response = await request(app)
            .get("/users")
            .send({_token: "BadToken"})
            expect(response.status).toBe(401);
        })
    })

    describe("POST /messages", () => {
        test("Create message and return message", async () =>{
            let response = await request(app)
            .post("/messages")
            .send({from_username: `${username}`,
                    to_username: `${username2}`,
                    body:"let's play baseball",
                    _token: testUserToken});
            console.log(response.body);
            expect(response.body).toEqual({message:{
            id: expect.any(Number),
            from_username: "test1",
            to_username: "test2",
            body:"let's play baseball",
            sent_at: expect.any(String)
            }});
        })
        test("Return 401 if incorrect token", async () =>{
            let response = await request(app)
            .post("/messages")
            .send({_token: "bad token"});
            expect(response.status).toBe(401);
        })
    });

    describe("POST /messages/:id/read", () => {
        test("Correctly updates message to read if to_user reads message", async () =>{
            let response = await request(app).post(`/messages/${m1.id}/read`).send({_token: testUser2Token})
            expect(response.status).toBe(200);
        })
        test("Return 404 if a user other than to_user reads message", async () =>{
            let response = await request(app).post(`/messages/${m1.id}/read`).send({_token: testUserToken})
            expect(response.status).toBe(404);
        })
    })
});

afterAll(async function () {
    await db.end();
  });
