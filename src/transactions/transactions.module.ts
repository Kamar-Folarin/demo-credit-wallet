import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { WalletModule } from '../wallets/wallet.module';
import { WalletRepository } from '../wallets/wallet.repository';
import { WalletService } from '../wallets/wallet.service';
import { TransactionSchema } from './transaction.schema';
import { TransactionsController } from './transactions.controller';
import { TransactionsRepository } from './transactions.repository';
import { TransactionsService } from './transactions.service';

@Module({
  imports: [ WalletModule,UsersModule,],
  controllers: [TransactionsController],
  providers: [
    TransactionSchema, TransactionsRepository, 
    TransactionsService, WalletService, WalletRepository
  ],
  exports: [TransactionsService]
})
export class TransactionsModule {}
