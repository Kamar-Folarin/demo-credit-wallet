/* eslint-disable @typescript-eslint/ban-types */
import { Inject, NotFoundException } from '@nestjs/common';
import { KNEX_CONNECTION } from '@nestjsplus/knex';
import { Knex } from 'knex';
import { InjectConnection } from 'nestjs-knex';
import {
  IWallet,
  IWalletQuery,
  IWalletUpdateQuery,
} from './types/wallet.types';
import { WalletSchemaName } from './wallet.schema';

export class WalletRepository {
  private model: Knex.QueryBuilder;
  constructor(@Inject(KNEX_CONNECTION) private readonly knex: Knex) {
    this.model = this.knex.table(WalletSchemaName);
  }

  async createWallet(createWalletDto: { userId: string }) {
    try {
      await this.model
        .insert({
          balance: 0,
          userId: createWalletDto.userId,
        })
        .into(WalletSchemaName)
        .returning('*');
      const wallet = await this.knex
        .select()
        .from(WalletSchemaName)
        .where(createWalletDto.userId);
      return wallet[0];
    } catch (err) {
      throw new NotFoundException(err);
    }
  }

  async getWallet(walletQuery: IWalletQuery) {
    try {
      const wallet: IWallet = await this.model
        .select()
        .from(WalletSchemaName)
        .where(walletQuery);

      return wallet;
    } catch (err) {
      throw new NotFoundException(err);
    }
  }

  async update(
    walletId: string,
    walletUpdateQuery: Partial<IWalletUpdateQuery>,
  ) {
    try {
      const wallet: IWallet = await this.model
        .where('id', walletId)
        .update(walletUpdateQuery);
      return wallet;
    } catch (err) {
      throw new NotFoundException(err);
    }
  }
}
