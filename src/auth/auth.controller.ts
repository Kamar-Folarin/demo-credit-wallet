import { Controller, Post, Body, HttpCode, UseGuards, Request, } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthUser } from '../common/decorators/user.decorator';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RefreshAuthGuard } from './guards/refresh-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @Post('login')
  async login(@AuthUser() user, @Request() req, @Body() loginDto: LoginDto) {
    const result = await this.authService.login(req.user);
    
    return result;
  }

  @UseGuards(RefreshAuthGuard)
  @ApiBearerAuth()
  @Post('refresh')
  async refreshToken(@AuthUser() user, @Body() body: RefreshTokenDto) {
    const { refreshToken } = body;
    const result = await this.authService.refreshToken(user, refreshToken);
    return result;
  }

}
