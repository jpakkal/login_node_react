const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', (req, res) => {
    return res.json({
        data: [],
    });
});

router.post('/', (req, res) => {
    const { name, email, password } = req.body;
  
    const newUser = new User({ name, email, password });
    newUser.save();

    return res.status(201).json();
});

module.exports = router;
