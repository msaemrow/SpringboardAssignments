const express = require('express')

//in order to use express router, need to set up router in other file first, then import into main file
const userRoutes = require('./userRoutes')

const app = express();


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//sets route from userRoutes file. can change route prefix at any time
app.use('/users', userRoutes);

app.get('/', (req, res) => {
    res.send("<h1>HOME PAGE</h1>")
})

app.get('/dogs', (req, res) => {
    console.log("WOOF WOOF")
    res.send("<h1>WOOF WOOF</h1><h6>Dogs</h6>")
})

app.get('/greet/:country', (req, res) => {
    const country = req.params.country;
    res.send(`Greetings from ${country}`)
})

app.get('/search', (req, res) => {
    const {term, sort} = req.query;
    return res.send(`Search Page. Term is ${term}, sort is ${sort}`)
})

app.post('/chickens', (req, res) => {
    res.send("<h1>Chicken (GET request)</h1>")
})

//Option for a named function. Can also create a function outside of the route and pass it in.
app.get('/chickens', function createChicken(req, res){
    res.send("<h1>CREATED Chicken (not really)</h1>")
})

module.exports = app;
