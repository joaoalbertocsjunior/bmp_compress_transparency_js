'use strict';

const fs = require('fs');
const path = require('path');

function getFileList(directoryPath, callback) {
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            console.error(`Error reading directory ${directoryPath}: ${err}`);
            return callback(err, null);
        }

        const paths = files.map((file) => path.join(directoryPath, file));
        return callback(null, paths);
    });
};

module.exports = getFileList;