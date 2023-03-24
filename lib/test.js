const fs = require('fs');

const readJsonFile = (filePath) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) throw err;
    return JSON.parse(data);
  });
};

const data = readJsonFile('data.json');
console.log(data);