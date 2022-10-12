import { Inject, Injectable } from '@nestjs/common';
import { KNEX_CONNECTION } from '@nestjsplus/knex';
import { InjectKnex, Knex } from 'nestjs-knex';

export const TransactionSchemaName = 'transactions';
@Injectable()
export class TransactionSchema {
  constructor(@Inject(KNEX_CONNECTION) private readonly knex: Knex) {
    this.createTransactionSchema();
  }

  async createTransactionSchema() {
    if (!(await this.knex.schema.hasTable(TransactionSchemaName))) {
      await this.knex.schema.createTable(TransactionSchemaName, (table) => {
        table.uuid('id').primary();
        table.string('amount');
        table.string('title', 255).notNullable();
        table.string('fromAccount', 255).notNullable();
        table.string('toAccount', 255).notNullable();
        table.string('userId', 255).notNullable();
        table.string('receiverId', 255).notNullable();
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
