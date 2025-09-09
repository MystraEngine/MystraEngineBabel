# MystraEngine's Babel

MystraEngine's Babel is a Node.js translation and text-to-speech engine with both CLI and web API support. It translates phrases between languages, caches results, and can speak translations using system voices.

Example running on macOS:  
https://bsky.app/profile/thefaithofficial.bsky.social/post/3lyfhhb4xds27

---

## Features

- **CLI translation:** Prompt-based translation from the terminal.
- **Web API:** HTTP translation endpoint via Express.js (`/translate`).
- **Automatic language detection:** Attempts to auto-detect the input language.
- **Voice selection:** Auto-selects a voice for the target language (see `supported_voices.json`).
- **Text-to-speech:** Speaks translations and exports audio as `.wav` files.
- **Caching:** Translations are cached in JSON files named by a SHA-256 hash of the input.
- **Supports multiple languages:** Specify source and target languages.
- **Easy extensibility:** Add more voices or languages via `supported_voices.json`.

---

## Installation

1. Clone the repository and install dependencies:

    ```sh
    npm install
    ```

---

## Usage

### CLI

Run the CLI tool:

```sh
node index.js
```

You will be prompted for:
- The language you can read (e.g., `en`)
- The language you want to read (e.g., `es`)
- The phrase to translate

The translation will be displayed, spoken aloud, and cached for future use.

Example:
```
Language you can read: en
Language you want to read: es
Phrase to translate: bathroom
bathroom = baño
```

### Web API

Start the server:

```sh
node server.js
```

Translate using a browser or HTTP client:

```
http://localhost:3000/translate?from=en&to=es&phrase=bathroom
```

- `from` (optional): Source language (default: `en`)
- `to` (optional): Target language (default: `es`)
- `phrase` (required): The phrase to translate

The server will:
- Auto-detect the input language if possible
- Auto-select a system voice for the target language
- Speak the translation and export a `.wav` file
- Return the translation as a JSON string in the HTTP response

---

## File Structure

- `index.js` - Main CLI and translation logic (with caching and TTS)
- `server.js` - Express.js web server exposing `/translate` endpoint
- `supported_voices.json` - List of supported voices and locales
- `*.json` - Cached translation files
- `*.wav` - Exported audio files for spoken translations
- `package.json` - Project dependencies

---

## Example

**CLI:**
```
Language you can read: en
Language you want to read: es
Phrase to translate: bathroom
bathroom = baño
```

**Web API:**
```
GET http://localhost:3000/translate?to=fr&from=en&phrase=hello%20world
```
Returns:
```json
{"text": "Bonjour le monde"}
```
Also speaks the translation and saves a `.wav` file.

---

## License

MIT License

Copyright (c) 2025

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
