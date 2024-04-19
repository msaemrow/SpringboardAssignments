const express = require("express");
const router = express.Router();
const db = require("../db");
const ExpressError = require("../expressError")




//GET OR VIEW ROUTE
router.get('/all',async function (req, res, next) {
    try{
        const results = await db.query(`SELECT * FROM users`);
        return res.json({users: results.rows});
    } catch (e) {
        return next(e);
    }
})


router.get('/:id', async (req, res, next) => {
    try{
        const { id } = req.params;
        const results = await db.query('SELECT * FROM users WHERE id = $1', [id])
        if(results.rows.length === 0){
            throw new ExpressError(`Cant find user with ID of ${id}`, 404)
        }
        return res.send({users: results.rows[0]})
    } catch(e){
        return next(e);
    }
})

//POST OR ADD ROUTE
router.post('/', async (req, res, next) => {
    try{
        const {name , type}=  req.body;
        const results = await db.query('INSERT INTO users (name, type) VALUES ($1, $2) RETURNING *', [name, type]);
        return res.status(201).json({users: results.rows[0]});
    } catch(e){
        return next(e);
    }
})


//UPDATE OR PATCH ROUTE
router.patch('/:id', async (req, res, next) => {
    try{
        const {id} = req.params;
        const {name, type} = req.body;
        const results = await db.query('UPDATE users SET name=$1, type=$2 WHERE id=$3 RETURNING *', [name, type, id])
        if(results.rows.length === 0){
            throw new ExpressError(`Cant find user with ID of ${id}`, 404)
        }
        return res.send({ user: results.rows[0] })
    } catch(e){
        return next(e)
    }
})

//DELETE ROUTE
router.delete('/:id', async (req, res, next) => {
    try{
        const {id} = req.params;
        const results = await db.query('DELETE FROM users WHERE id=$1 RETURNING *', [id])
        return res.send({msg: "DELETED USER"})
    } catch(e){
        return next(e)
    }
})

module.exports = router;