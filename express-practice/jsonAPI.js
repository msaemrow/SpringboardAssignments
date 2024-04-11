const express = require('express')

const app = express();
const port = 3000;

app.use(express.json())

const CANDIES = [
    {name: 'snickers', qty: 43, price: 1.50},
    {name: 'skittles', qty: 26, price: 0.99}
]

app.get('/candies', (req, res) => {
    res.json(CANDIES)
})
app.post('/candies', (req, res) => {
    CANDIES.push(req.body);
    res.status(201).json(CANDIES);
})

app.listen(port, function(){
    console.log(`App on port ${port}`)
})

