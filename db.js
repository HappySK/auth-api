import dotenv from 'dotenv'
import mysql from 'mysql'

dotenv.config()

const { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } = process.env

const connection = mysql.createConnection({
  host: DB_HOST,
	user: DB_USER,
	database: DB_NAME,
	password: DB_PASSWORD,
});

connection.connect((err) => {
  if (err) throw err.sqlMessage;
	console.log("MySQL server is connected");
});

export default connection