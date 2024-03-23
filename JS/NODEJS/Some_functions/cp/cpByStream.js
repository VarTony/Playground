const fs = require('fs');
const { pipeline } = require('node:stream/promises');

const copyfile = process.argv[2];
const copyToPath = process.argv[3];

// Функция для копирования крупных файло, например для больших ISO образов
const cpByStream = async (from, to) => {
    await pipeline(
      fs.createReadStream(from),
      fs.createWriteStream(to),
    );
    console.log('Pipeline succeeded.');
}

cpByStream(copyfile, copyToPath).catch(console.error);
