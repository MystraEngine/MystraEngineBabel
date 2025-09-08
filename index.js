// Import createRequire to allow using CommonJS modules in an ES module context
import { createRequire } from "module";
// Create a require function scoped to this module
const require = createRequire(import.meta.url);

// Import the 'translate' package for language translation
import translate from "translate";
// Import the 'crypto' module for hashing
const crypto = require('crypto');

// Import 'prompt-sync' for synchronous command-line input
const prompt = require('prompt-sync')();

// Prompt the user for the source language (default: 'en')
const fromLang = prompt('Language you can read: ', 'en');
// Prompt the user for the target language (default: 'es')
const toLang = prompt('Language you want to read: ', 'es');
// Prompt the user for the phrase to translate
const toPhase = prompt('Phrase to translate: ');

// Create a SHA-256 hash object
const hash = crypto.createHash('sha256');

// Perform the translation asynchronously
const translated = await translate(toPhase, { from: fromLang, to: toLang });
// Output the original and translated phrases
console.log(toPhase + " = " + translated);

// Import 'jsonfile' for reading and writing JSON files
const jsonfile = require('jsonfile')

// Update the hash with the concatenated language codes and phrase
hash.update(fromLang + toLang + toPhase)
// Get the hexadecimal representation of the hash
const hexHash = hash.digest('hex')

// Construct the filename based on the hash
const file = hexHash + '.json';

// Try to read the translation from the cache file
jsonfile.readFile(file)
  .then(obj => console.dir(obj)) // If found, print the cached translation
  .catch(
    error => {
        // If not found, create a new object with the translation
        var obj = {}
        obj['text'] = translated
        // Write the translation to the cache file
        jsonfile.writeFile(file, obj)
            .then(res => {
                console.log('Write complete')
            })
            .catch(error => console.error(error))
    }
)   