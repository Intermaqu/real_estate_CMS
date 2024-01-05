require("dotenv").config();
const { Pool } = require("pg");

const db = new Pool({
  user: process.env.PGUSER || "postgres",
  host: process.env.PGHOST || "localhost",
  database: process.env.PGDATABASE || "postgres",
  password: process.env.PGPASSWORD || "admin",
  port: process.env.PGPORT || 5432,
});

module.exports = db;