const router = require('express').Router();
const User = require('../model/user.model');
const auth = require('../middlewear/auth');

//  @route POST /register
//  @desc  Creates a new user
router.post('/users/register', async (req, res) => {
    try {
        const user = new User(req.body)
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
})

// @route POST /login
// @desc  User login
router.post('/users/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findByCredentials(email, password)

        if (!user) {
            return res.status(401).send({ error: 'Login failed! Check credentialsI ' })
        }

        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
})

// @route GET
// @desc  View logged in user
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

// @route POST
// @desc  Log current user out
router.post('/users/me/logout', auth, async (req, res) => {
    // Log user out of the application
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})

// @route POST
// @desc  Log current user out --global
router.post('/users/me/logoutall', auth, async(req, res) => {
    // Log user out of all devices
    try {
        req.user.tokens.splice(0, req.user.tokens.length)
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router;
