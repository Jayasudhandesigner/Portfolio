const fs = require('fs');
const path = require('path');
const pdfLib = require('pdf-parse');
console.log('pdfLib inspection:', pdfLib);

const pdfPath = path.resolve(__dirname, '../Jayasudhan AI resume.pdf');

if (!fs.existsSync(pdfPath)) {
    console.error(`File not found: ${pdfPath}`);
    process.exit(1);
}

const dataBuffer = fs.readFileSync(pdfPath);

async function parsePdf() {
    try {
        let text = '';
        // Simple attempt based on common usage
        const data = await pdfLib(dataBuffer);
        text = data.text;

        console.log("RESUME_BEGIN");
        console.log(text);
        console.log("RESUME_END");

    } catch (err) {
        console.error("Fatal error parsing PDF:", err);
    }
}

parsePdf();
