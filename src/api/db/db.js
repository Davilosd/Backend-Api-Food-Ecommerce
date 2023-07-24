const mysql = require('mysql');

function connect(sql1, sql2) {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '123123',
      database: 'bandoan',
    });

    connection.connect((err) => {
      if (err) {
        console.log('connect failed:', err);
        reject(err);
      } else {
        console.log('connect successfully');
      }
    });

    connection.query(sql1, (err, results) => {
      if (err) {
        console.log('Error querying data:', err);
        reject(err);
      } else {
        console.log('Data retrieved:', results);
        resolve(results);
      }
    });

    // connection.query(sql2, (err, results) => {
    //   if (err) {
    //     console.log('Error querying data:', err);
    //     reject(err);
    //   } else {
    //     console.log('Data retrieved:', results);
    //     resolve(results);
    //   }
    // });
    connection.end();
  });
}

module.exports = { connect };