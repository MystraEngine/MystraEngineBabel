// Import createRequire to allow using CommonJS modules in an ES module context
import { createRequire } from "module";
// Create a require function scoped to this module
const require = createRequire(import.meta.url);

// Import the 'translate' package for language translation
import translate from "translate";

export var toVoice = 'Flo (English (US))';

// Sets the global toVoice variable to the selected voice's name and language
export function setToVoice(voiceName) {
    toVoice = voiceName['name'] + ' (' + voiceName['language'] + ')';
    console.log("Voice set to: " + toVoice);
}

export const supportedLangs = ['english', 'spanish', 'french', 'japanese'];

// Import 'jsonfile' for reading and writing JSON files
const jsonfile = require('jsonfile')


const supportedVoicesFile = 'supported_voices.json';
export var supportedVoices = [];
// Try to read the translation from the settings file
jsonfile.readFile(supportedVoicesFile)
.then(supportedVoice => supportedVoices = supportedVoice) // If found, print the cached translation
.catch(
    error => {
        console.log("Error reading supported voices file: " + error);
    }
)

export async function translateText(fromLang, toLang, fromPhrase) {
    // Import the 'crypto' module for hashing
    const crypto = require('crypto');

    // Create a SHA-256 hash object
    const hash = crypto.createHash('sha256');

    // Perform the translation asynchronously
    const translated = await translate(fromPhrase, { from: fromLang, to: toLang });
    // Output the original and translated phrases
    console.log(fromPhrase + " = " + translated);

    // Update the hash with the concatenated language codes and phrase
    hash.update(fromLang + toLang + fromPhrase)
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

    // automatically pick platform
    const say = require('say')

    // Use default system voice and speed
    say.speak(translated, toVoice, 1.0)

    // Export spoken audio to a WAV file
    say.export(translated, toVoice, 1.0, hexHash + '.wav', (err) => {
        if (err) {
            return console.error(err)
        }

        console.log('Text has been saved to hexHash.wav.')
    })

    return '{"text": "' + translated + '"}'
}


