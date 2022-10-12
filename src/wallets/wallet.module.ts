import { forwardRef, Module } from '@nestjs/common';
import { TransactionsModule } from '../transactions/transactions.module';
import { WalletsController } from './wallet.controller';
import { WalletRepository } from './wallet.repository';
import { WalletSchema } from './wallet.schema';
import { WalletService } from './wallet.service';

@Module({
  imports: [],
  controllers: [WalletsController],
  providers: [WalletSchema, WalletService, WalletRepository],
  exports: [WalletService],
})
export class WalletModule {}
