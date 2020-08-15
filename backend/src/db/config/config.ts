import c from "../../utils/config";

interface configObj {
  username: string;
  password: string;
  host: string;
  database: string;
  logging: boolean;
  port: number | undefined;
  dialect: "postgres" | "mysql";
}

const co: configObj = {
  username: c.dbUsername(),
  password: c.dbPassword(),
  host: c.dbHost(),
  database: c.dbDatabase(),
  logging: c.dbTestLogSql() === "true",
  port: c.dbPort(),
  dialect: "postgres"
};

export default co;
