const express = require('express');
const router = express.Router();
const db = require('../db');
const slugify = require('slugify');
const ExpressError = require('../expressError')



module.exports = router;

//GET ALL INDUSTRIES
router.get('/', async (req, res, next) => {
    try{
        const results = await db.query(`
        SELECT i.industry_code, i.industry, ARRAY_AGG(ci.comp_code) AS companies
        FROM industries AS i
        LEFT JOIN company_industries AS ci ON i.industry_code = ci.industry_code
        GROUP BY i.industry_code, i.industry`);
        return res.json({industries: results.rows})
    } catch(e){
        return next(e);
    }
})

//CREATE NEW INDUSTRY
router.post('/', async (req, res, next) => {
    try{
        const { industry_code, industry } = req.body;
        const results = await db.query('INSERT INTO industries (industry_code, industry) VALUES ($1, $2) RETURNING *', [industry_code, industry]);
        return res.status(201).json({industry: results.rows[0]})
    } catch(e){
        return next(e);
    }
})

//CREATE NEW COMPANY/INDUSTRY RELATIONSHIP
router.post('/:industry', async (req, res, next) => {
    try{
        const { industry } = req.params;
        const { company_code } = req.body;
        const results = await db.query('INSERT INTO company_industries (industry_code, comp_code) VALUES ($1, $2) RETURNING *', [industry, company_code]);
        return res.status(201).json({industry: results.rows[0]})
    } catch(e){
        return next(e);
    }
})
