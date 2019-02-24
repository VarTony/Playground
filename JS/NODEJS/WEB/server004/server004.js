const express = require('express');
const app = express();
const bodyParser = reuire('body-parser');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/server004.db');

