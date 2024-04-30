const express = require("express");
const router = new express.Router();
const { ensureLoggedIn, ensureCorrectUser } = require("../middleware/auth");
const Message = require("../models/message");
const ExpressError = require("../expressError");

/** GET /:id - get detail of message.
 *
 * => {message: {id,
 *               body,
 *               sent_at,
 *               read_at,
 *               from_user: {username, first_name, last_name, phone},
 *               to_user: {username, first_name, last_name, phone}}
 *
 * Make sure that the currently-logged-in users is either the to or from user.
 *
 **/
router.get("/:id", ensureLoggedIn, async(req, res, next)=>{
    try{
        const message = await Message.get(req.params.id);
        const to_user = message.to_user.username;
        const from_user = message["from_user"]["username"];
        if(req.user.username === to_user || req.user.username === from_user){
            return res.json(message)
        }
        throw new ExpressError("Unauthorized", 404)

    } catch(e){
        return next(e);
    }
})

/** POST / - post message.
 *
 * {to_username, body} =>
 *   {message: {id, from_username, to_username, body, sent_at}}
 *
 **/
router.post("/", ensureLoggedIn, async(req, res, next)=>{
    const {to_username, from_username, body} = req.body;
    const message = await Message.create({to_username, from_username, body});
    return res.json({message});
})

/** POST/:id/read - mark message as read:
 *
 *  => {message: {id, read_at}}
 *
 * Make sure that the only the intended recipient can mark as read.
 *
 **/
router.post("/:id/read", ensureLoggedIn, async (req, res, next)=>{
    try {
        const message = await Message.get(req.params.id);
        const username = message["to_user"]["username"];
        if(req.user.username === username){
            const message = await Message.markRead(req.params.id);
            return res.json({ message });
        }
        throw new ExpressError("Unauthorized", 404)
    } catch (error) {
        return next(error); // Forward the error to the error-handling middleware
    }
})
module.exports = router;

