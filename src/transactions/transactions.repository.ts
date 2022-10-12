import { Inject, NotFoundException } from '@nestjs/common';
import { KNEX_CONNECTION } from '@nestjsplus/knex';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { CreateTransactionsDto } from './dto/create-transaction.dto';
import { ICreateTransaction, Transactions } from './interface/transactions.interface';
import { TransactionSchemaName } from './transaction.schema';
import {v4 as uuidv4} from 'uuid';

export class TransactionsRepository {
  private model: Knex.QueryBuilder;
  constructor(@Inject(KNEX_CONNECTION) private readonly knex: Knex) {
    this.model = this.knex.table(TransactionSchemaName);
  }

  async create(createtransactionDto: ICreateTransaction) {
    try {
      await this.model
        .insert({
          id: uuidv4(),
          amount: createtransactionDto.amount,
          title: createtransactionDto.title,
          toAccount: createtransactionDto.toAccount,
          fromAccount: createtransactionDto.fromAccount,
        });
      const Transaction = await this.knex
        .select()
        .from(TransactionSchemaName)
        .where({Transactionname: createtransactionDto.title}).then((result: Transactions[]) => result[0])
        return Transaction;
      
    } catch (err) {
      throw new NotFoundException(err);
    }
  }

  async findOne(id: string) {
    if (!id) {
      throw new NotFoundException(`Transaction ${id} does not exist`);
    }
    try{
      const Transactions: Transactions = await this.model
      .select()
      .from(TransactionSchemaName)
      .where({ id })
      .then((result: Transactions[]) => result[0]);
    return Transactions;
    }catch(err){
      throw new NotFoundException(err);
    }
  }
}
