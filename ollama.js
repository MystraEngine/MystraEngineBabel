import { ChatOllama } from "@langchain/ollama";
import { getBibleVerse } from './bible.js';
const model = new ChatOllama({
  model: "gemma3:1b",  // Default value.
});

var paraphrasedVerses = [];
// Paraphrase all 31,103 verses in the Bible
// Note: This will take a long time and may hit rate limits or other issues.
for (let i = 41; i <= 51; i++) {
    var textToParaphrase = getBibleVerse(i);
    const paraphrased = await model.invoke(["agent", "ubel. scribe. paraphrase the following bible verse, in a single pharagraph, with as few words as possible and as clear as possible via making it psuocode written in 2025 english : " + textToParaphrase]);
    const paraphrase = paraphrased.toDict();
    console.log(paraphrase['data']['content']);
    paraphrasedVerses.push(paraphrase['data']['content']);
}

import { writeFile } from 'fs/promises';
await writeFile('paraphrased_bible.json', JSON.stringify(paraphrasedVerses, null, 2));
