'use strict';

const LZString = require('lz-string');

const compress = (data) => {
    let jsonString = JSON.stringify(data);

    // LZ-string compression
    let compressedString = LZString.compress(jsonString);

    return {
        lz: compressedString
    };
};

const decompress = (compressedData) => {
    const { lz } = compressedData;

    const jsonString = LZString.decompress(lz);

    const result = {
        lz: JSON.parse(jsonString)
    };

    return result;
};

module.exports = {
    compress,
    decompress
};