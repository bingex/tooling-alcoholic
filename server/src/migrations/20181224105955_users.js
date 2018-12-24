exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
    table.increments();
    table
      .string('username')
      .notNullable()
      .unique();
    table
      .string('email')
      .notNullable()
      .unique();
    table
      .integer('company_id')
      .unsigned()
      .notNullable();
    table
      .foreign('company_id')
      .references('id')
      .inTable('companies');
    table.string('password_digest').notNullable();
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
