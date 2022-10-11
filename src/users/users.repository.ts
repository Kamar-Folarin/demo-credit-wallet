import { HttpException, HttpStatus, NotFoundException } from "@nestjs/common";
import { Knex } from "knex";
import { InjectModel } from "nest-knexjs";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./interface/user.interface";

export class UserRepository {
    constructor(@InjectModel() private readonly knex: Knex) {}

    async create(createUserDto: CreateUserDto) {
        try {
          const users: User = await this.knex.table('users').insert({
            firstName: createUserDto.firstName,
            lastName: createUserDto.lastName,
            email: createUserDto.email,
            password: createUserDto.password,
            username: createUserDto.username
          }).into('users');
    
          return { users };
        } catch (err) {
          throw new NotFoundException(err);
        }
      }

      async getUserData(payload: any) {
        const user: User  = await this.knex.table('users').select('+hash +salt').where(payload);
        return user;
      }

      async findOne(id: number): Promise<User> {
        if (!id) {
          throw new NotFoundException(`User ${id} does not exist`);
        }
        const users: User = await this.knex.table('users').where('id', id);
        return { users };
      }
    
      async update(id: number, updateUserDto: UpdateUserDto) {
        try {
          const users: User = await this.knex.table('users').where('id', id).update({
            firstName: updateUserDto.firstName,
            lastName: updateUserDto.lastName,
            email: updateUserDto.email,
            username: updateUserDto.username
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
        const users: User = await this.knex.table('users').where({ username });

        return { users };
    }

    async findOneByEmail(email: string) {
        const users: User = await this.knex.table('users').where({ email });

        return { users };
    }

    async updateBalance(id: number, newBalance: string) {
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

