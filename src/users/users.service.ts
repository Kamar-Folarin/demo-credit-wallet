import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserProfilePublicDto } from './dto/user-profile-public.dto';
import { UserProfileDto } from './dto/user-profile.dto';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(createUserDto) {

    return this.userRepository.create(createUserDto);
  }

  async getUserById(id: string) {
    return this.userRepository.findOne(id);
  }


  async getUserData(payload: any) {
    return this.userRepository.getUserData(payload);
  }

  async getUserByUsername(username: string) {
    const user = await this.userRepository.findOneByUsername(username);

    return user;
  }

  async getUserByEmail(email: string) {
    if (email !== undefined) {
      return this.userRepository.findOneByEmail(email);
    }
    return undefined;
  }
}
