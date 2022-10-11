import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { TransferFundsDto } from './dto/transfer.dto';
import { TransactionsRepository } from './transactions.repository';
@Injectable()
export class TransactionsService {
  constructor(
    private userService: UsersService,
    private transactionsRepository: TransactionsRepository,
  ) {}
   
  async sendMoney(userId: number ,dto: TransferFundsDto) {
    // Get the user
    const [sender, receiver] = await Promise.all
    ([
      await this.userService.getUserById(userId),, 
      await this.userService.getUserById(dto.to) 
    ]);
 
    // Find the amount the sender wants to send
    const senderNewBalance = sender.user.balance - dto.amount;

    // Check if the sender has enough funds
    if(senderNewBalance < 0 ) {
      return "insufficient funds";
    }

    // Find the amount
    const receiverNewBalance = receiver.balance + dto.amount;

    // Update the balances
    await Promise.all
    ([
      this.userService.updateBalance(userId, senderNewBalance), 
      this.userService.updateBalance(dto.to, receiverNewBalance)
    ]);

    const transactionDto = {
      userId: sender.user.id,
      to: receiver.id,
      amount: dto.amount,
      title: 'send-money',
    }
 
    this.transactionsRepository.create(transactionDto);
  }



  async checkBalance(userId: number) {
    const user = await this.userService.getUserById(userId);
    return { amount: user.user.balance}
  }


  async fundAccount(userId: number, amount: number) {
    const user = await this.userService.getUserById(userId);
    const newBalance = user.user.balance + amount;

    if (newBalance){
      this.userService.updateBalance(userId, newBalance);
    }
 
    const transactionDto = {
      userId: userId,
      to: userId,
      amount: amount,
      title: 'fund account',
    }
 
    this.transactionsRepository.create(transactionDto);

  }

  async  withdrawFromAccount(userId: number, amount: number) {
    const user = await this.userService.getUserById(userId);
    const newBalance = user.user.balance - amount;

    if(newBalance < 0) {
      return "insufficient funds";
    }

  this.userService.updateBalance(userId, newBalance);
    
 
    const transactionDto = {
      userId: userId,
      to: userId,
      amount: amount,
      title: 'Withdraw from account',
    }
 
    this.transactionsRepository.create(transactionDto);
  }

}
