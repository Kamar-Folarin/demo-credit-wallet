import { Injectable, NotFoundException } from '@nestjs/common';
import { WalletService } from '../wallets/wallet.service';
import { UsersService } from '../users/users.service';
import { CreateTransactionsDto } from './dto/create-transaction.dto';
import { TransferFundsDto } from './dto/transfer.dto';
import { ICreateTransaction, ITransactions } from './interface/transactions.interface';
import { TransactionsRepository } from './transactions.repository';
@Injectable()
export class TransactionsService {
  constructor(
    private userService: UsersService,
    private transactionsRepository: TransactionsRepository,
    private walletService: WalletService,
  ) {}

  async sendMoney(userId: string, dto: TransferFundsDto)  {
    // Get the user
    const [sender, senderWallet, receiverWallet] = await Promise.all([
      await this.userService.getUserById(userId),
      await this.walletService.getWalletBalance(userId,{walletId: dto.fromAccount}),
      await this.walletService.getWalletBalance(dto.receiverId,{walletId: dto.toAccount})
    ]);

    // Find the amount the sender wants to send
    const senderNewBalance = senderWallet.balance - dto.amount;

    // Check if the sender has enough funds
    if (senderNewBalance < 0) {
      throw new NotFoundException('Insufficient funds');
    }

    // Find the amount
    const receiverNewBalance = receiverWallet.balance + dto.amount;

    // Update the Wallet balances
    await Promise.all([
      this.walletService.debitWallet(userId, {walletId: dto.fromAccount, amount: dto.amount,}),
      this.walletService.creditWallet(userId, {walletId: dto.toAccount, amount: dto.amount,}),
    ]);

    const transactionDto = {
      fromAccount: dto.fromAccount,
      toAccount: dto.toAccount,
      amount: dto.amount,
      title: 'send-money',
    };

    this.transactionsRepository.create(transactionDto);
  }


  async fundAccount(userId: string,account:string, amount: number)  {
    const user = await this.walletService.getWalletBalance(userId,{walletId: account});
    const newBalance = user.balance + amount;

    if (newBalance) {
      this.walletService.creditWallet(userId, {walletId: account, amount: amount});
    }

    const transactionDto = {
      fromAccount: userId,
      toAccount: userId,
      amount: amount,
      title: 'fund your account',
    };

    await this.transactionsRepository.create(transactionDto);
  }

  async withdrawFromAccount(userId: string,fromAccount: string, amount: number) {
    const wallet = await this.walletService.getWalletBalance(userId,{walletId: fromAccount});
    const newBalance = wallet.balance - amount;

    if (newBalance < 0) {
      throw new NotFoundException('Insufficient funds');
    }

    this.walletService.debitWallet(userId, {walletId: fromAccount, amount: amount});

    const transactionDto = {
      fromAccount: fromAccount,
      toAccount: null,
      amount: amount,
      title: 'Withdraw from account',
    };

    await this.transactionsRepository.create(transactionDto);
  }
}
