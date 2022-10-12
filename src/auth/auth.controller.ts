import { Controller, Post, Body, HttpCode, UseGuards, Request, } from '@nestjs/common';
import { AuthUser } from '../common/decorators/user.decorator';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

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


}
