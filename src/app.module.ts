import { Module } from '@nestjs/common';
import { KnexModule } from 'nest-knexjs';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TransactionsModule} from './transactions/transactions.module';

@Module({
  imports: [
    KnexModule.forRootAsync({
      useFactory: () => ({
        config: {
          client: 'mysql',
          useNullAsDefault: true,
          connection: {
            host: process.env.HOST,
            user: process.env.USER,
            password: process.env.PASSWORD,
            database: process.env.DATABASE,
            port: process.env.PORT,
          },
        },
      }),
    }),
    UsersModule,
    AuthModule,
    TransactionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
