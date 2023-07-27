'use strict';

const fs = require('fs');
const bmp = require('bmp-js');
const compressPixelData = require('./compressPixelData.js');

const extractPixelData = async (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.error('Error reading the file:', err);
                reject(err);
                return;
            }

            const bmpData = bmp.decode(data);

            // Get the number of bytes per pixel based on color depth
            const bytesPerPixel = bmpData.width * bmpData.height === bmpData.data.length / 4 ? 4 : 3;

            // Check supported BMP formats
            if (![3, 4].includes(bytesPerPixel)) {
                console.error('Unsupported BMP format. Only 32-bit (RGBA) and 24-bit (RGB) BMPs are supported.');
                reject(new Error('Unsupported BMP format.'));
                return;
            }

            resolve(compressPixelData(bmpData, bytesPerPixel));
        });
    });
};

module.exports = extractPixelData;
