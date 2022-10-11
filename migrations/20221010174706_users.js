/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {

    return knex.schema
    .createTable('users', function (table) {
      table.increments('id').primary;
      table.string('firstName', 255).notNullable();
      table.string('lastName', 255).notNullable();
      table.string('email', 255).unique().notNullable();
      table.string('password', 255).notNullable();
      table.float('balance',255).notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
    .createTable('transactions', function (table) {
            
        table.increments('id').primary;
        table.foreign('userId').references('users.id');
        table.date('date')
        table.string('type',255).notNullable();
        table.float('transaction_value',255).notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
    })

};

exports.down = function (knex) {
  return knex.schema.dropTable('users').dropTable('transactions');
  
};
