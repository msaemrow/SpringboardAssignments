const express = require('express');
const items = require('./fakeDb')
const itemRoutes = require('./itemRoutes');
const ExpressError = require("./expressError");

const app = express();

app.use(express.json())
app.use('/items', itemRoutes);

app.get('/', (req, res) => {
    res.send("<h1>HOME PAGE</h1>");
});

app.use(function (req, res, next) {
    return new ExpressError("Not Found", 404);
  });

app.use((err, req, res, next) => {
    res.status(err.status || 500);

    return res.json({
        error: err.message
    });
});

module.exports = app;