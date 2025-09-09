// Import createRequire to allow using CommonJS modules in an ES module context
import { createRequire } from "module";
// Create a require function scoped to this module
const require = createRequire(import.meta.url);

const http = require('http');
const path = require('path');

// Example using Express.js
const express = require('express');
const app = express();

import { getWordsList, translateText, supportedLangs, supportedVoices, toVoice, setToVoice, toSpeechFile, jsonfile } from './index.js';


const bibleJSONFile = 'asv.json';
export var bible = [];
// Try to read the translation from the settings file
jsonfile.readFile(bibleJSONFile)
.then(
    result => {
        bible = result;
        console.log("Bible loaded with " + bible.length + " verses.");
    }
) // If found, print the cached translation
.catch(
    error => {
        console.log("Error reading supported voices file: " + error);
    }
)


export function getBibleVerse(verse) {
    if ( verse < 1 || verse > bible.length ) {
        var bibleVerseAll = '';
        for (var i = 0; i < bible.length; i++) {
            bibleVerseAll += '<div><b>' + (i+1) + '</b>' + ": " + bible[i] + "</div>";
        }
        return bibleVerseAll;
    }
    return bible[verse - 1];
}

// Get bible verses
app.get('/bible', (req, res) => {
    const verse = req.query.verse || 1; // Default to '1 John 4:8' if not provided
    console.log("Retrieving verse: " + verse);

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end(getBibleVerse(verse - 1));
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
