import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepository } from './users.repository';
import { AuthModule } from '../auth/auth.module';
import { UserSchema } from './user.schema';

@Module({
  imports: [AuthModule],
  controllers: [UsersController],
  providers: [UserSchema, UserRepository, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
