// Import createRequire to allow using CommonJS modules in an ES module context
import { createRequire } from "module";
// Create a require function scoped to this module
const require = createRequire(import.meta.url);

const http = require('http');

import { translateText, supportedLangs } from './index.js';

// Example using Express.js
const express = require('express');
const app = express();

const LanguageDetect = require('languagedetect');
const lngDetector = new LanguageDetect();

app.get('/translate', async (req, res) => {
    var fromLang = req.query.from || 'en'; // Default to 'en' if not provided
    const toLang = req.query.to || 'es'; // Default to 'es' if not provided
    const searchTerm = req.query.phrase; // Accessing the 'phrase' query parameter
    console.log(decodeURI(searchTerm));
    const langGuess = lngDetector.detect(decodeURI(searchTerm), 1);
    if ( langGuess.length > 0 &&
         supportedLangs.indexOf(langGuess[0][0]) >= 0 ) {
        fromLang = langGuess[0][0].substring(0,2);
        console.log("Auto-detected language: " + fromLang);
    }

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end(await translateText(fromLang, toLang, searchTerm));
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
