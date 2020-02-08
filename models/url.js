'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const NodeCache = require('node-cache');

const urlCache = new NodeCache();

// TODO: Add local vs prod config
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});

const URL = mongoose.model('URL', new Schema({
    shortened: String,
    full: String,
}, {
    collection: 'URL'
}));

/**
 * Gets the fullUrl from MongoDB.
 *
 * @param shortenedURL
 * @returns {Promise<String>}
 */
const getFullURLByShortenedURL = async (shortenedURL) => {
    let fullURL = urlCache.get(shortenedURL);
    if (fullURL === undefined) {
        try {
            const url = await getURLFromDB(shortenedURL);
            if (url) {
                fullURL = url.full;
                urlCache.set(shortenedURL, fullURL, 60);
            } else {
                return null;
            }
        } catch (e) {
            console.log(e);
            return null;
        }
    }
    return fullURL;
};

/**
 * Gets the URL instance from MongoDB.
 *
 * @param shortenedURL
 */
const getURLFromDB = (shortenedURL) => {
    return URL.findOne({shortened: shortenedURL});
};

module.exports = {
   getFullURLByShortenedURL,
};
