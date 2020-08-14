import * as c from "../../utils/config";

module.exports = {
  username: c.dbUsername(),
  password: c.dbPassword(),
  host: c.dbHost(),
  database: c.dbDatabase(),
  logging: c.dbTestLogSql() === "true",
  port: c.dbPort(),
  dialect: "postgres"
};
