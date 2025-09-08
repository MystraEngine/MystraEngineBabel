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

    go to `localhost:3000/translate` and use the parameters:
    `from`, `to`, `phrase`

    ```http://localhost:3000/translate?to=es&from=en&phrase=bathroom%20please!```

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