/* eslint-disable @typescript-eslint/no-var-requires */
const { DataSource } = require("typeorm");

module.exports = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "postgres",
  synchronize: true,
});
