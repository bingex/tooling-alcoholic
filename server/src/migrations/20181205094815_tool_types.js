exports.up = function(knex, Promise) {
  return knex.schema.createTable('tool_types', function(table) {
    table.increments();
    table
      .string('name')
      .notNullable()
      .unique();
    table.string('picture', 5000).notNullable();
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('tools');
};
