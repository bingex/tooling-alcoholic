exports.up = function(knex, Promise) {
  return knex.schema.table('tools', function(table) {
    table.string('picture', 5000);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('tools', function(table) {
    table.dropColumn('picture');
  });
};
