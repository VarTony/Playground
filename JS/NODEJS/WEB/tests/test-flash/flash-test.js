
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const app = express();

app.use(cookieParser('secret'));
app.use(session({cookie: { maxAge: 60000 }}));
app.use(flash());

app.all('/', (req, res) => {
  req.flash('test', 'it worked');
  res.redirect('/test')
});

app.all('/test', (req, res) => {
  res.send(JSON.stringify(req.flash('test')));
});

app.listen(3000);

//module.exports = app;
