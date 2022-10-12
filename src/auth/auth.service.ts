import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import validator from 'validator';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { appConstant } from '../common/constants/app.constants';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async saltPassword(
    password: string,
  ): Promise<{ salt: string; hash: string }> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    return { salt, hash };
  }

  async validateUser(email: string, password: string): Promise<any> {
    const isEmail = validator.isEmail(email);

    const payload = {};

    payload['email'] = email;

    const user = await this.usersService.getUserData(payload);
    if (user) {
      // Check if account was registered with social
      if (user?.hash === undefined) {
        return null;
      }
      // decrypt password
      const isMatch = await bcrypt.compare(
        password.toString(),
        user.hash.toString(),
      );
      if (isMatch) {
        return user;
      }
      return null;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      sub: user.id,
      email: user.email,
      username: user.username,
      general: user.general || {},
    };

    // Make refresh token
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: appConstant.TOKENS.REFRESH.JWT_DURATION,
    });
    return {
      access_token: this.jwtService.sign(payload),
      }
    }


}
