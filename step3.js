const axios = require('axios');
const fs = require('fs');

let outputPath;
let filePath = process.argv[2];

if (filePath === '--out') {
  outputPath = process.argv[3];
  filePath = process.argv[4];
  if (!filePath || !outputPath) {
    console.error('Missing required arguments for --out');
    process.exit(1);
  }
} else if (!filePath) {
  console.error('Please provide a file path or URL');
  process.exit(1);
}

async function output(content, outputPath) {
  if (outputPath) {
    try {
      fs.writeFileSync(outputPath, content);
    } catch (err) {
      console.error(`Couldn't write ${outputPath}:\n  ${err}`);
      process.exit(1);
    }
  } else {
    console.log(content);
  }
}

function cat(path, outputPath) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading ${path}:\n  ${err}`);
      process.exit(1);
    }
    output(data, outputPath);
  });
}

async function webCat(url, outputPath) {
  try {
    const res = await axios.get(url);
    output(res.data, outputPath);
  } catch (err) {
    console.error(`Error fetching ${url}:\n  ${err}`);
    process.exit(1);
  }
}

if (filePath.startsWith('http://') || filePath.startsWith('https://')) {
  webCat(filePath, outputPath);
} else {
  cat(filePath, outputPath);
}


