exports.up = function(knex, Promise) {
  return knex.schema.table('tools', function(table) {
    table
      .integer('user_id')
      .unsigned()
      .notNullable();
    table
      .foreign('user_id')
      .references('id')
      .inTable('users');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('tools', function(table) {
    table.dropColumn('user_id');
  });
};
