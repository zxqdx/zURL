'use strict';

const express = require('express');

const app = express();

let urlRoutes = require('./routes/url');

app.use(urlRoutes);

app.listen(80, () => console.log("App started..."));
