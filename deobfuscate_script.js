const fs = require('fs');
const vm = require('vm');

// Load obfuscated script
const obfuscatedCode = fs.readFileSync('edgypro.user.js', 'utf8');

// Extract the core deobfuscation functions (manual extraction needed)
const functionRegex = /function\s+(sBu2CR|TcSSGN_)\s*\(.*?\)\s*\{([\s\S]*?)\}/g;
let match;
let extractedFunctions = '';

while ((match = functionRegex.exec(obfuscatedCode)) !== null) {
    extractedFunctions += `function ${match[1]} ${match[2]}
`;
}

// Create a sandboxed context for execution
const sandbox = {};
vm.createContext(sandbox);

// Execute extracted deobfuscation functions
vm.runInContext(extractedFunctions, sandbox);

// Sample encoded strings (needs to be extracted dynamically from the script)
const encodedSamples = ["Zfoyz,]m^)8xAd2/&#jw=qe~!(FbStvL:76|3B>0D?"];

// Attempt to decode using extracted functions
const decodedResults = encodedSamples.map(s => sandbox.sBu2CR ? sandbox.sBu2CR(s) : 'Failed to decode');

// Save results to a file
fs.writeFileSync('decoded_output.txt', decodedResults.join('\n'), 'utf8');

console.log('Deobfuscation completed. Check decoded_output.txt');
