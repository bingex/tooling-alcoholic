exports.up = function(knex, Promise) {
  return knex.schema.alterTable('users', table => {
    table
      .integer('company_id')
      .nullable()
      .alter();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('users', table => {
    table
      .integer('company_id')
      .notNullable()
      .alter();
  });
};
