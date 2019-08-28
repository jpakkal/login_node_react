const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors');

// Routers
const UserRouter = require('./routes/users');
const AuthRouter = require('./routes/auth');

mongoose.connect('mongodb://localhost:27017/demo-db', { useNewUrlParser: true });

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
    return res.json({
        message: 'Welcome to my API',
    });
});

app.use('/api/auth', AuthRouter);

// Middleware
app.use(async (req, res, next) => {
    const token = req.headers.authorization;
    console.log(token);
    if (!token) {
        return res.status(401).json()
    }

    try {
        const decoded = await jwt.verify(token, 'secret');
        console.log(decoded);
        next();
    } catch(err) {
        return res.status(401).json();
    }
});

app.use('/api/users', UserRouter);

app.listen(PORT, () => {
    console.log(`Express API is listening on port ${PORT}`);
});
