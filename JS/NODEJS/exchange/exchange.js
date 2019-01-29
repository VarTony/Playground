const fs = require('promise-fs');
const filepath1 = process.argv[2];
const filepath2 = process.argv[3];


const exchange = async (filepath1, filepath2) => {
  const dataFrom1 = await fs.readFile(filepath1, 'utf-8');
  const dataFrom2 = await fs.readFile(filepath2, 'utf-8');

  const [dataFor1, dataFor2] = await Promise.all([dataFrom2, dataFrom1]);

  await fs.writeFile(filepath1, dataFor1);
  await fs.writeFile(filepath2, dataFor2);

}

exchange(filepath1, filepath2);

