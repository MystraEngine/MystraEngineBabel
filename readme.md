# MystraEngine

A simple Node.js CLI tool for translating phrases between languages with caching.

## Features

- Prompts user for source language, target language, and phrase to translate
- Uses the [translate](https://www.npmjs.com/package/translate) package for translations
- Caches translations in JSON files named by a SHA-256 hash of the input
- Reads from cache if translation already exists

## Usage

1. Install dependencies:

    ```sh
    npm install
    ```

2. Run the program:

    ```sh
    node index.js
    ```

3. Follow the prompts:

    - Enter the language you can read (e.g., `en`)
    - Enter the language you want to read (e.g., `es`)
    - Enter the phrase to translate

4. The translation will be displayed and cached for future use.

## File Structure

- `index.js` - Main CLI script
- `*.json` - Cached translation files
- `package.json` - Project dependencies

## Example

```
Language you can read: en
Language you want to read: es
Phrase to translate: bathroom
bathroom = baño
```

## License