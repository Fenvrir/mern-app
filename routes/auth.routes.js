const { Router } = require('express');
const User = require('../models/User.js')
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const router = Router();

// /api/auth/register
router.post(
    '/register',
    [
        check('email', 'Incorrect email').isEmail(),
        check('password', 'Min length must be 6 symbols').isLength({ min: 6 })
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    // array or toArray
                    errors: errors.toArray(),
                    message: 'Incorrect reg data'
                })
            }

            const { userName, email, password, date } = req.body;

            const candidateEmail = await User.findOne({ email });
            const candidateName = await User.findOne({ userName });

            if (candidateEmail) {
                return res.status(400).json({ message: 'Такой email уже занят.' });
            }
            if (candidateName) {
                return res.status(400).json({ message: 'Такое имя уже занято.' });
            }

            const hashPassword = await bcrypt.hash(password, 12);
            const user = new User({ userName, password: hashPassword, email, date });

            await user.save();

            res.status(201).json({ message: 'User is create' });
        
        } catch (err) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
        }
    })


// api/auth/login
router.post(
    '/login',
    [
        check('email', 'Incorrect email').normalizeEmail().isEmail(),
        check('password', 'Min length must be 6 symbols').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    // array or toArray
                    errors: errors.toArray(),
                    message: 'Incorrect login data'
                })
            }

            const { email, password } = req.body;

            const user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({ message: 'User not found' });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ message: 'Incorrect email or password' });
            }

            const token = jwt.sign(
                { iserId: user.id },
                config.get('jwtSecrete'),
                { expiresIn: '1h' },
            );

            res.json({ token, userId: user.id });

        } catch (err) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
        }
    })


module.exports = router;