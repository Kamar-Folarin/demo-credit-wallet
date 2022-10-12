import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards, Res, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../auth/auth.service';
import { appConstant } from '../common/constants/app.constants';
import { UserProfilePublicDto } from './dto/user-profile-public.dto';
import { UserProfileDto } from './dto/user-profile.dto';
import { AuthUser } from '../common/decorators/user.decorator';
import { Response } from 'express';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    ) {}

  @Post('user')
  async signUp(
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response,
  ): Promise<any> {
    const { email, password, firstName, lastName, username } = createUserDto;

    const user = await this.usersService.getUserByEmail(email);
    if (user) {
      return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        message: 'Account already exists',
      });
    }

    // Check if username exist
    // if (username) {
    //   const user = await this.usersService.getUserByUsername(username);
    //   if (user) {
    //     return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
    //       message: 'Username already exists',
    //     });
    //   }
    // }

    const { salt, hash } = await this.authService.saltPassword(password);
    // Verify password policy
    // Atleast one uppercase character, atleast one lowercase character, at least one number, at least one special character and minimum 8 character
    // Regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!"#$%&'()+,-.:;<=>?@[\]^_`{|}~*])(?=.{8,})
    const regularExpression = appConstant.REGEX.PASSWORD;

    if (!regularExpression.test(password)) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message:
          'Invalid password format, password should contain atleast one uppercase character, atleast one lowercase character, at least one number, at least one special character and minimum 8 character',
      });
    }

    const userData = {
      email,
      salt,
      hash,
      username,
      firstName,
      lastName,
    };

    const createdUser = await this.usersService.createUser(userData);
    const loginPayload = {
      id: createdUser.id,
      email,
      firstName: createdUser.firstName,
      lastName: createdUser.lastName,
    };

    return res
      .status(HttpStatus.CREATED)
      .send(await this.authService.login(loginPayload));
  }
}
