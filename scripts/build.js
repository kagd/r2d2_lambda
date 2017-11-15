const fs = require('fs');
const path = require('path');
const zip = new require('node-zip')();

zip.file('index.js', fs.readFileSync(path.join(__dirname, '../', 'dist', 'index.js')));
const data = zip.generate({base64:false,compression:'DEFLATE'});
fs.writeFileSync('lambda.zip', data, 'binary');