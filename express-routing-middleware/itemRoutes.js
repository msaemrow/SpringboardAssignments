const express = require('express');
const router = new express.Router();
const items = require('./fakeDb')
const Item = require('./item')



router.get('/', (req, res, next) => {
    try{
        return res.json(Item.findAllItems());
    } catch(e){
        return next(e);
    }
})

router.get('/:name', (req, res, next) => {
    try{
        const item = Item.findOneItem(req.params.name);
        return res.json(item);
    } catch(e){
        return next(e)
    }
});

router.post('/', (req, res, next) => {
    try{
        const newItem = new Item(req.body.name, req.body.price);
        items.push(newItem);
        return res.status(201).json({ added: newItem});
    }catch(e){
        return next(e);
    }
});

router.patch('/:name', (req, res, next) => {
    try{
        const updateItem = Item.updateItem(req.body.name, req.body);
        return res.json({updated: updateItem});
    }catch(e){
        return next(e);
    }
});

router.delete('/:name', (req, res, next) => {
    try{
        Item.deleteItem(req.params.name)
        return res.json({message: "Deleted"});
    }catch(e){
        return next(e);
    }
});



module.exports = router;