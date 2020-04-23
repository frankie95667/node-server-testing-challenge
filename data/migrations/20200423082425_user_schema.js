
exports.up = function(knex) {
  return knex.schema.createTable("users", tbl => {
      tbl.increments();
      tbl.string("name", 255).unique().notNullable();
      tbl.string("email", 255).unique().notNullable();
      tbl.string("gender", 128);
      tbl.string("ip_address", 128);
  })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("users");
};
