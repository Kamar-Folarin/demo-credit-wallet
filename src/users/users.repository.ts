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
import { ICreateUser, User } from './interface/user.interface';
import { UserSchemaName } from './user.schema';
import {v4 as uuidv4} from 'uuid';

export class UserRepository {
  private model: Knex.QueryBuilder;
  constructor(@Inject(KNEX_CONNECTION) private readonly knex: Knex) {
    this.model = this.knex.table(UserSchemaName);
  }

  async create(createUserDto: ICreateUser) {
    try {
      await this.model
        .insert({
          id: uuidv4(),
          username: createUserDto.username,
          email: createUserDto.email,
          firstName: createUserDto.firstName,
          lastName: createUserDto.lastName,
          hash: createUserDto.hash,
          salt: createUserDto.salt,
        });
      const user = await this.knex
        .select()
        .from(UserSchemaName)
        .where({username: createUserDto.username}).then((result: User[]) => result[0])
        return user;
      
    } catch (err) {
      throw new NotFoundException(err);
    }
  }

  async getUserData(payload: any) {
    const user: User = await this.model
      .select('hash', 'salt')
      .where(payload)
      .then((result: User[]) => result[0]);
    return user;
  }

  async findOne(id: string) {
    if (!id) {
      throw new NotFoundException(`User ${id} does not exist`);
    }
    try{
      const users: User = await this.model
      .select()
      .from(UserSchemaName)
      .where({ id })
      .then((result: User[]) => result[0]);
    return users;
    }catch(err){
      throw new NotFoundException(err);
    }
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

      return users;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    const users = await this.knex.table('users');

    return users;
  }

  async findOneByUsername(username: string) {
    try{
      const users: User = await this.model
      .select()
      .from(UserSchemaName)
      .where({ username })
      .then((result: User[]) => result[0]);
    return users;
    }catch(err){
      throw new NotFoundException(err);
    }
  }

  async findOneByEmail(email: string) {
    try{
      const users: User = await this.model
      .select()
      .from(UserSchemaName)
      .where({ email })
      .limit(1)
      .then((result: User[]) => result[0]);
    return  users ;
    }catch(err){
      throw new NotFoundException(err);
    }
  }


  async updateBalance(id: string, newBalance: string) {
    try {
      const res: User = await this.model
        .where({ id: id })
        .update({ balance: newBalance });

      return res;
    } catch (err) {
      throw err;
    }
  }
}
