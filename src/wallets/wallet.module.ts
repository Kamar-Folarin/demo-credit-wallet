import { Module } from '@nestjs/common';
import { WalletsController } from './wallet.controller';
import { WalletRepository } from './wallet.repository';
import { WalletSchema } from './wallet.schema';
import { WalletService } from './wallet.service';

@Module({
  controllers: [WalletsController],
  providers: [WalletSchema, WalletService, WalletRepository],
})
export class WalletModule {}
