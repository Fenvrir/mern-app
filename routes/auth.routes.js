const { Router } = require('express');
const User = require('../models/User.js')
const router = Router();

// /api/auth/register
router.post('/register', async (req, res) => {
    try{
        const {email, password} = req.body;

        const candidate = await User.findOne(email);

        if(candidate) {
            return res.status(400).json({message: 'Такой email уже занят.'});
        }

    }catch(err) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'});
    }
})

// api/auth/login

router.post('/login', async (req, res) => {

})


module.exports = router;