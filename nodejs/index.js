const mysql = require('mysql');
const express = require('express');
const nconf = require('nconf');
const moment = require('moment');

nconf.argv().env().file({ file: './env/config.json' });

let opts = {
  host: nconf.get('MYSQL_HOST') || 'mysql',
  user: nconf.get('MYSQL_USER'),
  password: nconf.get('MYSQL_PASSWORD'),
  database: nconf.get('MYSQL_DATABASE'),
  multipleStatements: true
};

let conn = mysql.createConnection(opts);

const PORT = nconf.get('PORT') || 8080;

const app = express();

app.get('/', (req, res) => {
  res.send('TODO: Render HTML page with ajax get API');
});

app.get('/api/tztest', (req, res) => {
  let sql = 'SELECT * FROM test_tz;';
  conn.query(sql, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send(result);
  });
});

// Init app
let createQuery = `DROP TABLE IF EXISTS test_tz;
CREATE TABLE test_tz(
  name VARCHAR(255),
  tz VARCHAR(255),
  createdAt DATETIME
);
INSERT INTO test_tz(name, tz, createdAt) VALUES ('MySQL Date', TIMEDIFF(NOW(), UTC_TIMESTAMP), NOW());
INSERT INTO test_tz(name, tz, createdAt) VALUES ('NodeJS App Date', ?, ?);`;

let currentDate = new Date();

conn.connect();
conn.query(createQuery, [moment().format('Z'), new Date()], (err) => {
  if (err) {
    console.error('DB Init error', err);
    process.exit();
  }

  app.listen(PORT, function() {
    console.log(`App listening on port ${PORT}!`);
  });
});

process.on('exit', (code) => {
  console.log(`About to exit with code: ${code}`);
  conn.end();
});
