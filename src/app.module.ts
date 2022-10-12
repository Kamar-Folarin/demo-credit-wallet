// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TransactionsModule } from './transactions/transactions.module';
import { WalletModule } from './wallets/wallet.module';
import { KnexModule } from '@nestjsplus/knex';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    KnexModule.register({
      client: 'mysql',
      useNullAsDefault: true,
      connection: {
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        port: Number(process.env.PORT),
      },
    }),
    UsersModule,
    PassportModule,
    AuthModule,
    TransactionsModule,
    WalletModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
