process.env.NODE_ENV = "test";

const request = require("supertest");
const Book = require("../models/book");
const app = require("../app");
const db = require("../db");

describe("Book Routes Test", () =>{
    beforeEach(async () => {
        await db.query("DELETE FROM books");

        let book = await Book.create({
			"isbn": "123456799",
			"amazon_url": "http://a.com/eobPtX223",
			"author": "Matthew Lane",
			"language": "english",
			"pages": 250,
			"publisher": "Amazon",
			"title": "Harry Plopper",
			"year": 1998
		});
    });

    /** GET /books => book object */
    describe("GET /books", () => {
        test("return all books", async () => {
            let response = await request(app).get("/books");
            expect(response.status).toBe(200);
            expect(response.body.books.length).toBe(1);
        });
    });

    describe("POST /books", () => {
        test("create a new book object", async () => {
            let response = await request(app)
            .post("/books")
            .send({
                "isbn": "123456789",
                "amazon_url": "http://a.com/eobPtX2",
                "author": "Matthew Lane",
                "language": "english",
                "pages": 1000,
                "publisher": "Amazon",
                "title": "Power-Up",
                "year": 2020
                });
            expect(response.status).toBe(201);
            expect(response.body).toEqual({ book:{
                "isbn": "123456789",
                "amazon_url": "http://a.com/eobPtX2",
                "author": "Matthew Lane",
                "language": "english",
                "pages": 1000,
                "publisher": "Amazon",
                "title": "Power-Up",
                "year": 2020
                }
            });
        });
        test("throw 400 error and return error object if missing piece of book object", async () => {
            let response = await request(app)
            .post("/books")
            .send({
                "isbn": "123456789",
                "amazon_url": "http://a.com/eobPtX2",
                "author": "Matthew Lane",
                "language": "english",
                "pages": 1000,
                "publisher": "Amazon",
                "title": "Power-Up",
                });
            expect(response.status).toBe(400);  
            expect(response.body).toHaveProperty("error");
            expect(response.body.error).toHaveProperty("message");
        })
    });
})


afterAll(async function () {
    await db.end();
  });