'use strict';

function compressPixelData(bmpData, bytesPerPixel) {
    const imageData = bmpData.data;
    const pixelData = [];

    for (let i = 0; i < imageData.length; i += bytesPerPixel) {
        const a = imageData[i];
        const b = imageData[i + 1];
        const g = imageData[i + 2];
        const r = imageData[i + 3];

        let result;

        const value = { r, g, b, a };
        const transparent = {
            r: 255,
            g: 0,
            b: 255,
            a: 255
        };

        if (JSON.stringify(value) === JSON.stringify(transparent)) {
            result = 0;
        } else {
            result = value;
        }

        pixelData.push(result);
    }

    let rgbaValues = [];
    let chunks, chunk, newChunk, chunkIndex, pixelCount;
    chunks = [];
    chunk = null;

    pixelData.forEach((value, index) => {
        const isTransparent = value === 0;
        if (isTransparent) {
            if (!newChunk) {
                newChunk = true;
                chunkIndex = index;
                pixelCount = 0;
                if (chunk) {
                    chunks.push(chunk);
                };
            };
        } else {
            if (newChunk) {
                newChunk = false;
            }
            rgbaValues = [...rgbaValues, value];
        }
        if (newChunk) {
            ++pixelCount;
            chunk = { index: chunkIndex, count: pixelCount };
        }
    });
    chunks.push(chunk);

    return {
        rgba: rgbaValues,
        transparency: chunks
    };
};

module.exports = compressPixelData;