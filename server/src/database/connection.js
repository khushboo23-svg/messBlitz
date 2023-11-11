const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE);
mongoose.connection.on('connected', () => console.log('Connected'));
mongoose.connection.on('error', (err) => console.log('Connection failed with - ',err));
