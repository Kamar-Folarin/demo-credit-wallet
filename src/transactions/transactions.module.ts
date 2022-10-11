import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { TransactionsController } from './transactions.controller';
import { TransactionsRepository } from './transactions.repository';
import { TransactionsService } from './transactions.service';

@Module({
  imports: [UsersModule],
  controllers: [TransactionsController],
  providers: [TransactionsRepository, TransactionsService]
})
export class TransactionsModule {}
