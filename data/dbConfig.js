const knex = require('knex');
const knexConfig = require("../knexfile");
const DB_ENV = process.env.DB_ENV || "development";

const db = knex(knexConfig[DB_ENV])

module.exports = db;