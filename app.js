const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const app = express();

app.use(express.json({extended: true}));
app.use('/api/auth', require('./routes/auth.routes'));

const PORT = config.get('port') || 5000;


async function start() {
    try{
        await mongoose.connect(config.get('mongoUri'), {
            
        })
        app.listen(PORT, () => {
            console.log(`App has been started on port ${PORT}!`);
        })
    } catch(err) {
        console.log('Server error', err.message);
        process.exit(1);
    }
}

start();

