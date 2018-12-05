exports.up = function(knex, Promise) {
  return knex.schema.createTable('tools', function(table) {
    table.increments();
    table
      .string('name')
      .notNullable()
      .unique();
    table
      .integer('user_id')
      .unsigned()
      .notNullable();
    table
      .foreign('user_id')
      .references('id')
      .inTable('users');
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('tools');
};
