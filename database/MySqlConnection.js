const { Sequelize } = require("sequelize");
const mysql = require("mysql");
const sequelize = new Sequelize(
  "postgres://apirestuser:apirestuser@localhost:5432/apirest"
);
const bdmysql = mysql.createConnection({
  host: "localhost",
  user: "apirestuser",
  password: "apirestuser",
  database: "apirest",
  port: "5432",
  connectionLimit: 500,
});

bdmysql.connect();

module.exports = {
  bdmysql,
  sequelize,
};
