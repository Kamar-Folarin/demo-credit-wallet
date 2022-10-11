import { Controller, Post, Body, UseGuards, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthUser } from '../common/decorators/user.decorator';
import { User } from '../users/interface/user.interface';
import { WalletService } from './wallet.service';

@ApiTags('wallet')
@Controller('wallet')
export class WalletsController {
  constructor(private walletService: WalletService) {}

  @Post('create-wallet')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Creates a wallet for a user',
  })
  async createWallet(@AuthUser() user: User) {
    return await this.walletService.createWallet(user.id);
  }

  @Post('freeze-wallet')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Freezes the user wallet for debit | PND',
  })
  async freezeUserWalletDebit(
    @AuthUser() user: User,
    @Param('walletId') walletId: string,
  ) {
    return await this.walletService.togglePNDWallet(user.id, {
      walletId: walletId,
    });
  }

  @Post('freeze-wallet')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Freezes the user wallet Credit | PNC',
  })
  async freezeUserWalletCredit(
    @AuthUser() user: User,
    @Param('walletId') walletId: string,
  ) {
    return await this.walletService.togglePNCWallet(user.id, {
      walletId: walletId,
    });
  }

  @Get('get-wallet/balance')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Returns the wallet details of the user',
  })
  async getUserWallet(
    @AuthUser() user: User,
    @Param('walletId') walletId: string,
  ) {
    return await this.walletService.getWalletBallance(user.id, {
      walletId: walletId,
    });
  }
}
