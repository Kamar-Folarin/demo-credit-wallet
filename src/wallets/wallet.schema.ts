import { Inject, Injectable } from '@nestjs/common';
import { KNEX_CONNECTION } from '@nestjsplus/knex';
import { InjectConnection, Knex } from 'nestjs-knex';

export const WalletSchemaName = 'wallet';

@Injectable()
export class WalletSchema {
  constructor(@Inject(KNEX_CONNECTION) private knex: Knex) {
    this.createWalletSchema();
  }

  async createWalletSchema() {
    if (!(await this.knex.schema.hasTable(WalletSchemaName))) {
      await this.knex.schema.createTable(WalletSchemaName, (table) => {
        table.uuid('id').primary();
        table.string('userId').notNullable();
        table.string('name');
        table.double('balance').unsigned().defaultTo(0);
        table.boolean('PND').defaultTo(false);
        table.boolean('PNC').defaultTo(false);
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
