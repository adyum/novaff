var mysql = require('mysql');
var pool  = mysql.createPool({
  host: "143.95.32.203",
  user: "cranford_novaff",
  password: "bGEg5p41!",
  database: "cranford_dyansty"
});

pool.getConnection(function(err, connection) {
  // connected! (unless `err` is set)
  connection.release();
});

module.exports = pool;