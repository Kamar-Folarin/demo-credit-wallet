import {
  HttpException,
  HttpStatus,
  Inject,
  NotFoundException,
} from '@nestjs/common';
import { KNEX_CONNECTION } from '@nestjsplus/knex';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './interface/user.interface';

export class UserRepository {
  constructor(@Inject(KNEX_CONNECTION) private readonly knex: Knex) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const users: User = await this.knex
        .table('users')
        .insert({
          createUserDto,
        })
        .into('users');

      return { users };
    } catch (err) {
      throw new NotFoundException(err);
    }
  }

  async getUserData(payload: any) {
    const user: User = await this.knex
      .table('users')
      .select('+hash +salt')
      .where(payload)
      .then((result: User[]) => result[0]);
    return user;
  }

  async findOne(id: string) {
    if (!id) {
      throw new NotFoundException(`User ${id} does not exist`);
    }
    const user = await this.knex
      .table('users')
      .where('id', id)
      .then((result: User[]) => result[0]);
    return { user };
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const users: User = await this.knex
        .table('users')
        .where('id', id)
        .update({
          firstName: updateUserDto.firstName,
          lastName: updateUserDto.lastName,
          email: updateUserDto.email,
          username: updateUserDto.username,
        });

      return { users };
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number) {
    if (!id) {
      throw new NotFoundException(`User ${id} does not exist`);
    }
    const users = await this.knex.table('users').where('id', id).del();
    return { users };
  }

  async findAll() {
    const users = await this.knex.table('users');

    return { users };
  }

  async findOneByUsername(username: string) {
    const users: User = await this.knex
      .table('users')
      .where({ username })
      .then((result: User[]) => result[0]);

    return { users };
  }

  async findOneByEmail(email: string) {
    const users: User = await this.knex
      .table('users')
      .where({ email })
      .then((result: User[]) => result[0]);

    return { users };
  }

  async updateBalance(id: string, newBalance: string) {
    try {
      const res: User = await this.knex('users')
        .where({ id: id })
        .update({ balance: newBalance });

      return res;
    } catch (err) {
      throw err;
    }
  }
}
