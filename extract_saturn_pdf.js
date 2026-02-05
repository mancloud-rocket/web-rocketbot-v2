const fs = require('fs');
const pdf = require('pdf-extraction');
const path = require('path');

const pdfPath = path.join(__dirname, '_docs', 'PPT Agentic - revisada RF (1).pdf');

async function extract() {
    try {
        const dataBuffer = fs.readFileSync(pdfPath);
        const data = await pdf(dataBuffer);
        console.log(data.text);
    } catch (e) {
        console.error(e);
    }
}

extract();
