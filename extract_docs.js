const fs = require('fs');
const pdf = require('pdf-extraction');
const path = require('path');

const docsDir = path.join(__dirname, '_docs');

async function extractPdf(filename) {
    const filePath = path.join(docsDir, filename);
    if (!fs.existsSync(filePath)) {
        console.log(`File not found: ${filePath}`);
        return;
    }

    console.log(`--- Extracting: ${filename} ---`);
    const dataBuffer = fs.readFileSync(filePath);
    try {
        const data = await pdf(dataBuffer);
        console.log(data.text);
        console.log(`--- End of ${filename} ---\n`);
    } catch (e) {
        console.error(`Error extracting ${filename}:`, e);
    }
}

async function main() {
    const files = fs.readdirSync(docsDir).filter(f => f.endsWith('.pdf'));
    for (const file of files) {
        await extractPdf(file);
    }
}

main();
