// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

// Ensure environment variables are read.
require('../config/env');

const path = require('path');
const express = require('express');
const app = express();

app.use(express.static(path.resolve(__dirname, '../build')));

app.listen(parseInt(process.env.PORT, 10) || 3000);
