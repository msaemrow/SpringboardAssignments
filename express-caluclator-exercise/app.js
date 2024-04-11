const express = require('express')
const Operations = require('./operations')
const ExpressError = require('./expressError')

const app = express();
const port = 3000;

app.use(express.json())
const operations = new Operations();

app.get('/mean', (req, res, next) => {
    operations.checkQueryString(req.query.nums)
    try{
        const nums = req.query.nums.split(',');
        const numsArr = nums.map(Number);
        if(numsArr.includes(NaN)){
            throw new ExpressError("Please input numbers only", 400);
        } else{
            let result = {
                operation: "mean",
                value: operations.mean(numsArr)
            }
            return res.json(result)
        }
    } catch(e){
        next(e);
        }
})

app.get('/median', (req, res, next) => {
    operations.checkQueryString(req.query.nums)
    try{
        const nums = req.query.nums.split(',');
        const numsArr = nums.map(Number);
        if(numsArr.includes(NaN)){
            throw new ExpressError("Please input numbers only", 400);
        } else{
            let result = {
                operation: "median",
                value: operations.median(numsArr)
            }
            return res.json(result)
        }
    } catch(e){
        next(e);
        }
})

app.get('/mode', (req, res, next) => {
    operations.checkQueryString(req.query.nums)
    try{
        const numsArr = operations.convertStringToIntArray(req.query.nums);
        if(numsArr.includes(NaN)){
            throw new ExpressError("Please input numbers only", 400);
        } else{
            let result = {
                operation: "mode",
                value: operations.mode(numsArr)
            }
            return res.json(result)
        }
    } catch(e){
        next(e);
        }
})

app.get('/all', (req, res, next) =>{
    operations.checkQueryString(req.query.nums);
    try{
        const numsArr = operations.convertStringToIntArray(req.query.nums);
        if(numsArr.includes(NaN)){
            throw new ExpressError("Please input numbers only", 400);
        } else{
            let result = {
                operation: "all",
                "mean": operations.mean(numsArr),
                "median": operations.median(numsArr),
                "mode": operations.mode(numsArr)
            }
            return res.json(result)
        } 
    } catch(e){
        next(e)
    }

})

app.use((error, req, res, next) => {
    let message = error.message;
    let status = error.status || 500;
    res.status(status).json({error: {message, status}});
})

app.listen(port, function(){
    console.log(`App on port ${port}`)
})