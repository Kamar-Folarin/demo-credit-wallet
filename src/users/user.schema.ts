import { Inject, Injectable } from '@nestjs/common';
import { KNEX_CONNECTION } from '@nestjsplus/knex';
import { Knex } from 'nestjs-knex';

export const UserSchemaName = 'users';
@Injectable()
export class UserSchema {
  constructor(@Inject(KNEX_CONNECTION) private readonly knex: Knex) {
    this.createUserSchema();
  }

  async createUserSchema() {
    if (!(await this.knex.schema.hasTable(UserSchemaName))) {
      await this.knex.schema.createTable(UserSchemaName, (table) => {
        table.uuid('id').primary();
        table.string('firstName', 255).notNullable();
        table.string('lastName', 255).notNullable();
        table.string('email', 255).unique().notNullable();
        table.string('username', 255).unique().notNullable();
        table.string('hash', 255).notNullable();
        table.string('salt', 255).notNullable();
        table
          .dateTime('createdAt')
          .notNullable()
          .defaultTo(this.knex.raw('CURRENT_TIMESTAMP'));
        table
          .dateTime('updatedAt')
          .notNullable()
          .defaultTo(
            this.knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
          );
      });
    }
  }
}
