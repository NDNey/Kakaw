const express = require('express')
const router = express.Router()
const {ensureAuth, ensureGuest} = require('../middleware/auth')

// @desc login/landing page
// @route Get /

router.get('/',ensureGuest, (req,res)=>{
    res.render('login')
})
// @desc login/landing page
// @route Get /dashboard

router.get('/dashboard',ensureAuth, (req,res)=>{
    res.render('dashboard',{
        name: req.user.firstName,
    })
})
module.exports = router