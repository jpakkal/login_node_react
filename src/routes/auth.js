const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password }).exec();
    if (!user) {
        return res.status(401).json()
    }

    const token = jwt.sign({ id: user._id }, 'secret', {
        expiresIn: '360000',
    });

    return res.json({
        token,
        type: 'ADMIN'
    });
});

module.exports = router;
