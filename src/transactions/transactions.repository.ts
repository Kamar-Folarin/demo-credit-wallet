import { NotFoundException } from "@nestjs/common";
import { Knex } from "knex";
import { InjectModel } from "nest-knexjs";
import { CreateTransactionsDto } from "./dto/create-transaction.dto";
import { Transactions } from "./interface/transactions.interface";

export class TransactionsRepository {
constructor(@InjectModel() private readonly knex: Knex) {}

async create(createTransactionDto: CreateTransactionsDto) {
    try {
        const transactions: Transactions = await this.knex.table('transactions').insert({
            amount: createTransactionDto.amount,
            title: createTransactionDto.title,
            userId:  createTransactionDto.userId,
            to: createTransactionDto.to,
        }).into('transactions');

        return { transactions };
    } catch (err) {
        throw new NotFoundException(err);
    }
    }

}