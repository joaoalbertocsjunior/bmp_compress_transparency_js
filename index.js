'use strict';

const base = './modules/';

const path = require('path');

const getFileList = require(`${base}getFileList.js`);
const extractPixelData = require(`${base}extractPixelData.js`);
const { compress } = require(`${base}compress.js`);

const dir = path.join(__dirname, 'sprites');

getFileList(dir, (err, value) => {
    if (err) {
        console.error('Error:', err);
    } else {
        let data = [];
        const promises = value.map(element => extractPixelData(element));

        Promise.all(promises)
            .then(results => {
                // 'results' is an array containing the resolved values from all promises
                const compressed = [];
                const result = results.map((val) => compress(val));
                Promise.all(result).then((chunks) => {
                    fs.writeFile(path.join(__dirname, 'out.json'), chunks, 'utf8', (err) => {
                        if (err) {
                            console.error('Error writing to JSON file:', err);
                        } else {
                            console.log('Data has been written to JSON file successfully!');
                        }
                    });
                }).catch((err) => {
                    console.log(err);
                });
            })
            .catch(err => {
                console.log('Error:', err);
            });
    }
});
