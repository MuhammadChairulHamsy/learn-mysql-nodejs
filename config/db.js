import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: "localhost",
  database: "db_mahasiswa",
  user: "root",
  password: "",
});

export default db;