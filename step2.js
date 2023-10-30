const axios = require('axios');

async function webCat(url) {
  try {
    const res = await axios.get(url);
    console.log(res.data);
  } catch (err) {
    console.error(`Error fetching ${url}:\n  ${err}`);
    process.exit(1);
  }
}

const fs = require('fs');

function cat(path) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading ${path}:\n  ${err}`);
      process.exit(1);
    }
    console.log(data);
  });
}

const filePath = process.argv[2];
if (!filePath) {
  console.error('Please provide a file path or URL');
  process.exit(1);
}

if (filePath.startsWith('http://') || filePath.startsWith('https://')) {
  webCat(filePath);
} else {
  cat(filePath);
}
