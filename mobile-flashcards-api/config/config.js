const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : 'izm96dhhnwr2ieg0.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
  user     : 'fpfy5uv5syqx0j40',
  password : 'hdgumosy5pd94zz5',
  database : 'yk80vlqhwf1ech98'
});

module.exports = connection