const express = require('express');
const app = express();
const port = 3429;
let i = 0; 

app.get('*', (req, res) => {
    console.log(++i);
  res.status(429).send('Too Many Requests');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});