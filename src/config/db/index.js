const mysql = require('mysql');


async function connect() {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123123',
    database: 'bandoan',
  });

  connection.connect((err) => {
    if (err) {
      console.log('connect failed:', err);
    } else {
      console.log('connect successfully');
    }
  });

  // You can perform database operations here using the "connection" object

  // let sql = "select * from NHANVIEN"

  // const selectDataQuery = 'SELECT * FROM users;';
  // connection.query(sql, (err, results) => {
  //   if (err) {
  //     console.log('Error querying data:', err);
  //   } else {
  //     console.log('Data retrieved:', results);
  //   }
  // });

  connection.end();
}

module.exports = { connect };