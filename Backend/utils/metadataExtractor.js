import { getDocument } from 'pdfjs-dist';
import epub from 'epub-metadata';
import fs from 'fs/promises';

// Extract metadata from ePub
export async function extractEpubMetadata(filePath) {
    try {
        const metadata = await epub(filePath);
        console.log('Extracted ePub metadata:', metadata); // Log metadata for debugging
        return {
            title: metadata.title || 'Unknown',
            author: metadata.creator || 'Unknown',
            series: null,
            genre: 'Unknown',
        };
    } catch (error) {
        console.error('Error extracting ePub metadata:', error.message);
        throw new Error('Failed to extract ePub metadata');
    }
}

// Extract metadata from PDF
export async function extractPdfMetadata(filePath) {
    try {
        const fileBuffer = await fs.readFile(filePath);

        // Convert Buffer to Uint8Array
        const pdfData = new Uint8Array(fileBuffer);

        // Load the PDF document
        const pdfDoc = await getDocument({ data: pdfData }).promise;

        // Extract metadata
        const metadata = await pdfDoc.getMetadata();
        return {
            title: metadata.info.Title || 'Unknown',
            author: metadata.info.Author || 'Unknown',
            subject: metadata.info.Subject || 'Unknown',
        };
    } catch (error) {
        console.error('Error extracting PDF metadata:', error.message);
        throw new Error('Failed to extract PDF metadata');
    }
}