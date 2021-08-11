exports.up = function (knex) {
  return knex.schema.createTable("vehicles", (table) => {
    table.increments("vehicle_id").primary();
    table.string("color").notNullable();
    table.integer("number_passengers").notNullable();
    table.enu("type", ["bus", "truck", "car"]).notNullable();

    table.string("chassi_id").notNullable();
    table
      .foreign("chassi_id")
      .references("series")
      .inTable("chassis")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("vehicles");
};
