'use strict';

const express = require('express');
const router = express.Router();

const {getFullURLByShortenedURL} = require('../models/url');

router.get('/:shortenedURL([a-zA-Z0-9]+)', async (req, res) => {
    const {shortenedURL} = req.params;
    const fullURL = await getFullURLByShortenedURL(shortenedURL);
    if (fullURL) {
        res.redirect(fullURL);
    } else {
        res.set('Content-Type', 'text/html');
        res.send(`
          Cannot find this URL.
          If you believe this is an error, contact <a href="mailto:zxq001zxq001@gmail.com">zxqdx</a>.
        `);
    }
});

module.exports = router;
