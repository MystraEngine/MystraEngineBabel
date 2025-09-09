// Import createRequire to allow using CommonJS modules in an ES module context
import { createRequire } from "module";
// Create a require function scoped to this module
const require = createRequire(import.meta.url);

const http = require('http');

import { translateText } from './index.js';

// Example using Express.js
const express = require('express');
const app = express();

app.get('/translate', async (req, res) => {
    const fromLang = req.query.from || 'en'; // Default to 'en' if not provided
    const toLang = req.query.to || 'es'; // Default to 'es' if not provided
    const searchTerm = req.query.phrase; // Accessing the 'phrase' query parameter
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end(await translateText(fromLang, toLang, searchTerm));
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
