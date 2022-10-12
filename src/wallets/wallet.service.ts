import { Injectable, NotFoundException } from '@nestjs/common';
import { TransactionsService } from '../transactions/transactions.service';
import { IWallet } from './types/wallet.types';
import { WalletRepository } from './wallet.repository';

@Injectable()
export class WalletService {
  constructor(private readonly walletRepository: WalletRepository) {}

  async debitWallet(
    userId: string,
    walletRequest: { walletId: string; amount: number },
  ): Promise<IWallet> {
    const wallet: IWallet = await this.walletRepository.getWallet({
      id: walletRequest.walletId,
      userId: userId,
    });

    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }
    if (wallet.balance < walletRequest.amount) {
      throw new Error('Insufficient funds');
    }
    if (wallet.PNC) {
      throw new Error('PNC Wallet cannot be debited');
    }

    const transactionDto = {
      balance: wallet.balance - walletRequest.amount,
    };

    return this.walletRepository.update(walletRequest.walletId, transactionDto);
    
  }

  async creditWallet(
    userId: string,
    walletRequest: { walletId: string; amount: number },
  ): Promise<IWallet> {
    const wallet: IWallet = await this.walletRepository.getWallet({
      id: walletRequest.walletId,
      userId: userId,
    });

    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }
    if (wallet.PNC) {
      throw new Error('PNC Wallet cannot be credited');
    }

    const transactionDto = {
      balance: wallet.balance + walletRequest.amount,
    };

    return this.walletRepository.update(walletRequest.walletId, transactionDto);
  }

  async getWalletBalance(
    userId: string,
    walletRequest: { walletId: string },
  ): Promise<IWallet> {
    const wallet: IWallet = await this.walletRepository.getWallet({
      id: walletRequest.walletId,
      userId: userId,
    });

    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }
    return wallet;
  }

  async createWallet(userId: string, name: string): Promise<IWallet> {
    const wallet: IWallet = await this.walletRepository.createWallet({
      userId: userId,
      name: name
    });
    console.log(wallet);
    return wallet;
  }

  async togglePNCWallet(
    userId: string,
    walletRequest: { walletId: string },
  ): Promise<IWallet> {
    const wallet: IWallet = await this.walletRepository.getWallet({
      id: walletRequest.walletId,
      userId: userId,
    });

    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }
    return this.walletRepository.update(wallet.id, {
      PNC: !wallet.PNC,
    });
  }

  async togglePNDWallet(
    userId: string,
    walletRequest: { walletId: string },
  ): Promise<IWallet> {
    const wallet: IWallet = await this.walletRepository.getWallet({
      id: walletRequest.walletId,
      userId: userId,
    });

    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }
    return this.walletRepository.update(wallet.id, {
      PND: !wallet.PND,
    });
  }
}
