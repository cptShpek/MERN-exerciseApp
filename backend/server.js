const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const exercisesRouter = require('./routes/exercises');
const userRoutes = require('./routes/users');

require('dotenv').config();

// server creating

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// conection to mongoDB
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB connection is done')
})

// Routes

app.use('/exercises', exercisesRouter);
app.use('/users', userRoutes);


// Listening
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})