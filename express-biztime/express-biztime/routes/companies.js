const express = require('express');
const router = express.Router();
const db = require('../db');
const ExpressError = require('../expressError')

//GET ALL COMPANIES
router.get('/', async (req, res, next) => {
    try{
        const results = await db.query(`SELECT * FROM companies`);
        return res.json({companies: results.rows})
    } catch(e){
        return next(e);
    }
})

//GET ONE COMPANY
router.get('/:code', async (req, res, next) => {
    try{
        const { code } = req.params;
        const compResults = await db.query('SELECT code, name, description FROM companies WHERE code=$1', [code]);
        const invResults = await db.query('SELECT id FROM invoices WHERE comp_code=$1', [code])
        if (compResults.rows.length === 0){
            throw new ExpressError(`Cant find copmany with code: ${code}`, 404)            
        }
        const company = compResults.rows[0];
        const invoices = invResults.rows;
        company.invoices = invoices.map(i => i.id)
        return res.json({"company": company})
    } catch(e){
        return next(e);
    }
})

//CREATE NEW COMPANY
router.post('/', async (req, res, next) => {
    try{
        const { code , name, description } = req.body;
        const results = await db.query('INSERT INTO companies (code, name, description) VALUES ($1, $2, $3) RETURNING *', [code, name, description]);
        return res.status(201).json({company: results.rows[0]})
    } catch(e){
        return next(e);
    }
})

//UPDATE COMPANY
router.patch('/:code', async (req, res, next) => {
    try{
        const { code } = req.params;
        const { name, description } = req.body;
        const results = await db.query('UPDATE companies SET name=$1, description=$2 WHERE code=$3 RETURNING *', [name, description, code])
        if (results.rows.length === 0){
            throw new ExpressError(`Cant find copmany with code: ${code}`, 404);            
        }    
        return res.json({ company: results.rows[0]})
    } catch (e){
        return next(e);
    }
})

//DELETE COMPANY
router.delete('/:code', async (req, res, next) => {
    try{
        const {code} = req.params;
        const results = await db.query('DELETE FROM companies WHERE code=$1 RETURNING *', [code])
        return res.send({msg: "DELETED COMPANY"})
    } catch(e){
        return next(e)
    }
})


module.exports = router;