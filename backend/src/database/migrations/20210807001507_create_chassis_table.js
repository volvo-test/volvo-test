exports.up = function (knex) {
  return knex.schema.createTable("chassis", (table) => {
    table.string("series").primary();
    table.integer("number").unsigned().notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("chassis");
};
