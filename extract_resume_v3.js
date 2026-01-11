import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pdf from 'pdf-parse';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pdfPath = path.resolve(__dirname, '../Jayasudhan AI resume.pdf');

if (!fs.existsSync(pdfPath)) {
    console.error(`File not found: ${pdfPath}`);
    process.exit(1);
}

const dataBuffer = fs.readFileSync(pdfPath);

console.log('Imported pdf:', pdf);

try {
    const data = await pdf(dataBuffer);
    console.log("RESUME_TEXT_START");
    console.log(data.text);
    console.log("RESUME_TEXT_END");
} catch (error) {
    console.error("Error:", error);
}
