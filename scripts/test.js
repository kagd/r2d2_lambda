const fs = require('fs');
const path = require('path');

const filepath = path.join('../', 'dist', 'index.js');
const file = require(filepath);

function callback(err, success){
  console.log('err', err);
  console.log('success', success);
}

file.handler(null, null, callback);
