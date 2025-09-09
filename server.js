// Import createRequire to allow using CommonJS modules in an ES module context
import { createRequire } from "module";
// Create a require function scoped to this module
const require = createRequire(import.meta.url);

const http = require('http');

const path = require('path');

import { translateText, supportedLangs, supportedVoices, toVoice, setToVoice } from './index.js';

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
        // If the detected language is supported, set fromLang to its 2-letter code
        fromLang = langGuess[0][0].substring(0,2);
        console.log("Auto-detected language: " + fromLang);
    }

    // Loop through all supported voices to see if we can auto-detect the language
    for (var i = 0; i < supportedVoices.length; i++) {
      if ( supportedVoices[i].locale.startsWith(toLang) ) {
        setToVoice(supportedVoices[i]);
        console.log("Auto-detected voice: " + toVoice);
        break;
      }
    }

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end(await translateText(fromLang, toLang, searchTerm));
});

app.get('/download-wav', (req, res) => {
  const filePath = 'f6a0032dbc3abf160a143fe1218bda26820d11ea41d50d468b45c3825823c467.wav'; // Replace 'audio.wav' with your file name
  res.download(filePath, 'my_audio.wav', (err) => {
    if (err) {
      console.error('Error downloading file:', err);
      res.status(500).send('Error downloading file');
    }
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
