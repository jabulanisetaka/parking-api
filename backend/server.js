const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
const { errorHandler } = require('../backend/middleware/errorMiddleware');
const connectDB = require('./config/db');

const port = process.env.PORT || 3000;
const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/parkinglots', require('./routes/parkinglotRoute'));
app.use('/api/parkinglots/cars', require('./routes/carRoutes'));
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
