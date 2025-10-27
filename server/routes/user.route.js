
const express = require('express');
const UserModel = require('../model/user.model');

const userRouter = express.Router();

// signup user
userRouter.post('/sign-up', async (req, res) => {
    const {email, password}  = req.body;

    try {

        await UserModel.create(req.body)

        res.status(201).json({msg : `${email} successfully register`})

    } catch (err) {

        res.status(500).json({ msg: `Internal server error on signup route : ${err.message}` })

    }
})



module.exports = userRouter;