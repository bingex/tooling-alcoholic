exports.up = function(knex, Promise) {
  return knex.schema.table('tools', function(table) {
    table.dropUnique('name');
  });
};

exports.down = function(knex, Promise) {};
