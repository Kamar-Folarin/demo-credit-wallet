import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthUser } from '../common/decorators/user.decorator';
import { User } from '../users/interface/user.interface';
import { TransferFundsDto } from './dto/transfer.dto';
import { WithdrawFundsDto } from './dto/withdraw.dto';
import { TransactionsService } from './transactions.service';

@ApiTags('transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @Post('send-money')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Returns the response whether the money was sent or not',
  })
  async sendMoney(
    @AuthUser() user: User,
    @Body() transaction: TransferFundsDto,
  ) {
    return await this.transactionsService.sendMoney(user.id, transaction);
  }

  @Post('fund-account')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Funds the account of the given user',
  })
  async fundAccount(
    @AuthUser() user: User,
    @Body() transaction: TransferFundsDto,
  ) {
    return await this.transactionsService.fundAccount(
      user.id,
      transaction.fromAccount,
      transaction.amount,
    );
  }

  @Post('withdraw-money')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Withdraw funds from the given account',
  })
  async withdrawMoney(
    @AuthUser() user: User,
    @Body() transaction: WithdrawFundsDto,
  ) {
    return await this.transactionsService.withdrawFromAccount(
      user.id,
      transaction.fromAccount,
      transaction.amount || 0,
    );
  }
}
